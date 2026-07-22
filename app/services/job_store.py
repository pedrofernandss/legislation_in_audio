from __future__ import annotations

from datetime import datetime
from threading import Lock

from app.models import DocumentResult, JobRecord, JobResponse, JobStatus, SegmentResult


class JobStore:
    def __init__(self):
        self._jobs: dict[str, JobRecord] = {}
        self._lock = Lock()

    def create(self, job_id: str, file_name: str) -> JobRecord:
        record = JobRecord(job_id=job_id, file_name=file_name)
        with self._lock:
            self._jobs[job_id] = record
        return record

    def get(self, job_id: str) -> JobRecord | None:
        with self._lock:
            return self._jobs.get(job_id)

    def update_status(self, job_id: str, status: JobStatus, error: str | None = None) -> JobRecord:
        with self._lock:
            record = self._jobs[job_id]
            record.status = status
            record.updated_at = datetime.utcnow()
            record.error = error
            self._jobs[job_id] = record
            return record

    def init_result(self, job_id: str, markdown: str, cleaned_text: str, total_segments: int) -> JobRecord:
        with self._lock:
            record = self._jobs[job_id]
            record.result = DocumentResult(markdown=markdown, cleaned_text=cleaned_text, segments=[])
            record.total_segments = total_segments
            record.updated_at = datetime.utcnow()
            self._jobs[job_id] = record
            return record

    def add_segment(self, job_id: str, segment: SegmentResult) -> JobRecord:
        with self._lock:
            record = self._jobs[job_id]
            record.result.segments.append(segment)
            record.updated_at = datetime.utcnow()
            self._jobs[job_id] = record
            return record

    def complete(self, job_id: str) -> JobRecord:
        with self._lock:
            record = self._jobs[job_id]
            record.status = JobStatus.completed
            record.updated_at = datetime.utcnow()
            record.error = None
            self._jobs[job_id] = record
            return record

    def fail(self, job_id: str, error: str) -> JobRecord:
        return self.update_status(job_id, JobStatus.failed, error=error)

    def to_response(self, job_id: str) -> JobResponse:
        record = self._jobs[job_id]
        return JobResponse(
            job_id=record.job_id,
            file_name=record.file_name,
            status=record.status,
            created_at=record.created_at,
            updated_at=record.updated_at,
            result=record.result,
            total_segments=record.total_segments,
            error=record.error,
        )
