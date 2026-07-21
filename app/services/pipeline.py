from __future__ import annotations

import re
from pathlib import Path

from app.models import DocumentResult, SegmentResult
from app.services.audio import generate_tts
from app.services.clean_text import Text
from app.services.file_converter import FileConverter


class DocumentProcessingPipeline:
    def __init__(self, output_dir: str = "storage/jobs"):
        self.output_dir = Path(output_dir)
        self.output_dir.mkdir(parents=True, exist_ok=True)
        self.converter = FileConverter()
        self.cleaner = Text()

    def _slugify(self, value: str) -> str:
        slug = re.sub(r"[^a-zA-Z0-9]+", "-", value.lower()).strip("-")
        return slug or "segment"

    def _build_segments(self, cleaned_text: str) -> list[tuple[str | None, str]]:
        chapters = self.cleaner.split_text_by_chapters(cleaned_text)
        if chapters:
            return list(chapters.items())
        return [(None, chunk) for chunk in self.cleaner.chunk_text(cleaned_text)]

    def process(self, job_id: str, pdf_path: str, file_name: str) -> DocumentResult:
        markdown = self.converter.pdf_to_markdown(pdf_path)
        cleaned_text = self.cleaner.clean(markdown)
        segments = self._build_segments(cleaned_text)

        job_dir = self.output_dir / job_id
        audio_dir = job_dir / "audio"
        audio_dir.mkdir(parents=True, exist_ok=True)

        results: list[SegmentResult] = []
        for index, (title, segment_text) in enumerate(segments, start=1):
            label = self._slugify(title or f"segment-{index}")
            audio_file = audio_dir / f"{index:02d}-{label}.mp3"
            generate_tts(segment_text, output_path=str(audio_file), use_ssml=False)
            results.append(
                SegmentResult(
                    title=title,
                    text=segment_text,
                    audio_file=audio_file.name,
                    download_url=f"/api/jobs/{job_id}/audio/{audio_file.name}",
                )
            )

        return DocumentResult(markdown=markdown, cleaned_text=cleaned_text, segments=results)
