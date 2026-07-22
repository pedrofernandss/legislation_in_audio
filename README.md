# Lei em Voz

**Lei em Voz** ("Law in Voice") turns dense legal PDFs — laws, decrees, resolutions, regulations — into narrated audio you can listen to instead of reading. Upload a PDF, and the platform extracts the text, cleans it up for natural narration, splits it into listenable chapters or chunks, and converts each one into an MP3 file.

## Why

Legal documentation is text-heavy, formally written, and often published as static PDFs that are tedious to read end to end. Lei em Voz makes that content audio-first: something you can listen to during a commute, while exercising, or as an accessibility tool for people who find long blocks of dense legal text hard to process visually. The goal isn't to replace reading the law — it's to make it possible to *consume* it in more situations than "sitting at a desk with a PDF open."

## What is text-to-speech?

Text-to-speech (TTS) is the technology that converts written text into spoken audio using a synthetic voice, without a human ever recording anything. Modern TTS engines (like the one this project uses, Azure AI Speech) use neural networks trained on large amounts of recorded speech to produce narration that sounds natural — with realistic intonation, pacing, and pronunciation — rather than the robotic, monotone voices older TTS systems were known for. Lei em Voz relies entirely on TTS to generate its audio: no human narrator is involved, which is what makes it possible to convert an arbitrary legal PDF into audio in minutes.

## How it works

1. **Upload** — the user submits a PDF through the web app.
2. **Extraction** — the backend converts the PDF into Markdown text (via `pymupdf`/`pymupdf4llm`).
3. **Cleaning** — the text is normalized for narration: markdown artifacts are stripped, legal abbreviations are expanded (`art.` → "artigo", `§` → "parágrafo", etc.), and ordinal/roman numerals (`1º`, `I`, `II`, `III`...) are converted to spoken Portuguese ordinals ("primeiro", "segundo", "terceiro"...) so the TTS engine doesn't spell them out as letters.
4. **Segmentation** — the cleaned text is split by chapter (`CAPÍTULO I`, `CAPÍTULO II`, ...) when that structure is present; otherwise it falls back to paragraph-based chunking with a max size per chunk.
5. **Narration** — each segment is sent to Azure AI Speech and synthesized into its own MP3 file.
6. **Delivery** — the frontend polls the conversion job and displays each audio segment as soon as it's ready (not just when the whole document is done), with a player and a download link per segment.

A single PDF can produce multiple audio segments (one per chapter, or one per chunk), and the UI keeps conversions of different files visually separate so it's clear which audio belongs to which document.

## Tech stack

**Backend**
- [FastAPI](https://fastapi.tiangolo.com/) (Python 3.12) — HTTP API
- [Azure AI Speech SDK](https://learn.microsoft.com/azure/ai-services/speech-service/) — text-to-speech synthesis
- [PyMuPDF](https://pymupdf.readthedocs.io/) / `pymupdf4llm` — PDF-to-Markdown extraction
- [uv](https://docs.astral.sh/uv/) — Python dependency management
- In-memory job store (no database yet — see note below)

**Frontend**
- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) — styling, with a light/dark theme toggle
- No router library — routing is handled with a small `history.pushState`-based helper
- Plain `fetch` for API calls, polling for job status

**Infrastructure**
- Docker (separate images for backend and frontend, orchestrated with Docker Compose locally)
- nginx serves the built frontend and proxies `/api` to the backend in the Compose setup
- Deployed on [Railway](https://railway.app/) as two independent services (frontend calls the backend directly via an absolute URL in that setup, since they're on different domains)

> **Current limitation:** job state (conversion progress, results) and generated audio files are stored in memory / on local disk, not in a database or object storage. A backend restart or redeploy clears all in-flight and past conversions. This is fine for local use or small-scale testing, but would need a real datastore (e.g. Postgres) and object storage (e.g. S3/Azure Blob) before relying on it for anything long-lived.

## Project structure

```
app/                      FastAPI backend
├── api/pdf.py             HTTP routes (/api/convert, /api/jobs/{id}, ...)
├── services/
│   ├── file_converter.py  PDF -> Markdown
│   ├── clean_text.py      Text normalization (legal terms, ordinals, roman numerals)
│   ├── pipeline.py        Orchestrates extraction -> cleaning -> segmentation -> TTS
│   ├── audio.py           Azure Speech TTS wrapper
│   └── job_store.py       In-memory job tracking
└── models.py              Pydantic request/response models

frontend/                 React + Vite + Tailwind frontend
└── src/
    ├── pages/             LandingPage, UsePage
    ├── components/        Shared UI (upload form, job cards, status panel, ...)
    ├── hooks/             useJobPolling, useJobsList, useTheme, useScrollReveal
    ├── lib/                api.js (backend calls), router.js (pushState routing)
    └── context/            ThemeContext (dark/light mode)

samples/                  Example PDF for testing the pipeline
docker-compose.yml        Local orchestration (backend + frontend)
backend.Dockerfile        Backend image
frontend/Dockerfile       Frontend image (multi-stage: Vite build -> nginx)
```

## Running locally

### Option 1 — Docker Compose (recommended)

This is the simplest way to run the full stack; it matches production closely and doesn't require installing Python or Node locally.

1. Copy the environment template and fill in your Azure Speech credentials:

   ```bash
   cp .env.example .env
   ```

   Edit `.env`:
   ```
   AZURE_SPEECH_KEY=your-key-here
   AZURE_SPEECH_REGION=your-region-here   # e.g. brazilsouth, eastus2
   ```

   You'll need an Azure AI Speech resource to get these values (Azure offers a free tier). `AZURE_SPEECH_VOICE` is optional and defaults to `pt-BR-ThalitaMultilingualNeural`.

2. Build and start both services:

   ```bash
   docker compose up --build
   ```

3. Open `http://localhost:8000` — this is the frontend, served by nginx, which proxies API calls to the backend internally. The backend isn't exposed on the host directly.

A sample PDF is included at `samples/sample-lei-modelo.pdf` if you want something to test the upload flow with right away.

### Option 2 — Running backend and frontend separately (without Docker)

**Backend** (requires [uv](https://docs.astral.sh/uv/) and Python 3.12+):

```bash
uv sync
uv run uvicorn app.main:app --reload --port 8000
```

**Frontend** (requires Node 22+):

```bash
cd frontend
npm install
npm run dev
```

The Vite dev server runs on `http://localhost:5173` and proxies `/api` requests to `http://localhost:8000`, so make sure the backend is running first. The same `.env` (with `AZURE_SPEECH_KEY`/`AZURE_SPEECH_REGION`) is required — `python-dotenv` loads it automatically when the backend starts.

## API overview

All endpoints are prefixed with `/api`.

| Method | Path | Description |
|---|---|---|
| `POST` | `/convert` | Upload a PDF (`multipart/form-data`, field `file`). Returns `{ job_id, status }` and starts processing in the background. |
| `GET` | `/jobs/{job_id}` | Poll job status. Returns segments incrementally as they finish (not just once the whole job completes), plus `total_segments` so the frontend can show real progress. |
| `GET` | `/jobs/{job_id}/audio/{audio_file}` | Serves a generated MP3 segment. |

## Deployment

The app is deployed on Railway as two independent services from the same repository:

- **Backend** — root directory `/`, `backend.Dockerfile`, listens on port `8000`.
- **Frontend** — root directory `frontend/`, `Dockerfile`, listens on port `80`. Built with `VITE_API_BASE_URL` set to the backend's public URL, since the two services live on different domains and the frontend needs to call the backend directly (CORS is open on the backend for this reason).

Any push to `main` triggers a redeploy of both services.
