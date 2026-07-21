from __future__ import annotations

from pathlib import Path

import pymupdf
import pymupdf4llm

class FileConverter:
    def __init__(self, temp_storage: str = "storage/temp"):
        self.temp_storage = Path(temp_storage)
        self.temp_storage.mkdir(parents=True, exist_ok=True)

    def pdf_to_markdown(self, pdf_path: str):
        doc = pymupdf.open(pdf_path)
        try:
            return pymupdf4llm.to_markdown(doc)
        finally:
            doc.close()