import os
import shutil

from pathlib import Path

from fastapi import APIRouter, BackgroundTasks, File, HTTPException, UploadFile
from fastapi.responses import FileResponse

from app.models import JobStatus
from app.services.job_store import JobStore
from app.services.pipeline import DocumentProcessingPipeline

legislation_router = APIRouter()
job_store = JobStore()
pipeline = DocumentProcessingPipeline()


def _job_paths(job_id: str) -> Path:
    job_dir = Path("storage/jobs") / job_id
    job_dir.mkdir(parents=True, exist_ok=True)
    return job_dir


def _run_pipeline(job_id: str, pdf_path: Path, file_name: str):
    try:
        job_store.update_status(job_id, JobStatus.processing)
        result = pipeline.process(job_id=job_id, pdf_path=str(pdf_path), file_name=file_name)
        job_store.complete(job_id, result)
    except Exception as exc:  # noqa: BLE001
        job_store.fail(job_id, str(exc))
    finally:
        if pdf_path.exists():
            pdf_path.unlink()

@legislation_router.post("/convert")
async def convert_pdf(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    file_name = Path(file.filename or "document.pdf").name
    if not file_name.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    job_id = f"{file_name.rsplit('.', 1)[0]}-{os.urandom(4).hex()}"
    job = job_store.create(job_id, file_name)
    job_dir = _job_paths(job_id)
    pdf_path = job_dir / file_name

    with pdf_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    background_tasks.add_task(_run_pipeline, job.job_id, pdf_path, file_name)

    return {"job_id": job.job_id, "status": job.status}


@legislation_router.get("/jobs/{job_id}")
async def get_job(job_id: str):
    job = job_store.get(job_id)
    if job is None:
        raise HTTPException(status_code=404, detail="Job not found.")
    return job_store.to_response(job_id)


@legislation_router.get("/jobs/{job_id}/audio/{audio_file}")
async def get_audio(job_id: str, audio_file: str):
    audio_path = Path("storage/jobs") / job_id / "audio" / audio_file
    if not audio_path.exists():
        raise HTTPException(status_code=404, detail="Audio file not found.")
    return FileResponse(path=str(audio_path), media_type="audio/mpeg", filename=audio_file)
