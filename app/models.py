from __future__ import annotations

from datetime import datetime
from enum import StrEnum

from pydantic import BaseModel, Field


class JobStatus(StrEnum):
    queued = "queued"
    processing = "processing"
    completed = "completed"
    failed = "failed"


class SegmentResult(BaseModel):
    title: str | None = None
    text: str
    audio_file: str
    download_url: str


class DocumentResult(BaseModel):
    markdown: str
    cleaned_text: str
    segments: list[SegmentResult] = Field(default_factory=list)


class JobRecord(BaseModel):
    job_id: str
    file_name: str
    status: JobStatus = JobStatus.queued
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)
    result: DocumentResult | None = None
    total_segments: int | None = None
    error: str | None = None


class JobResponse(BaseModel):
    job_id: str
    file_name: str
    status: JobStatus
    created_at: datetime
    updated_at: datetime
    result: DocumentResult | None = None
    total_segments: int | None = None
    error: str | None = None
