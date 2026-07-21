# Audio Law

Audio Law was developed to address the static and often dense nature of legal documentation. The project aims to make the legal system more dynamic by providing an audio-first platform where laws, decrees, and regulations are translated into clear, narrated content. This allows users to consume essential legal information during commutes, exercise, or as a primary accessibility tool.

## Run with Docker

The easiest way to run the PoC is inside Docker, with separate images for the backend and the frontend orchestrated by Compose:

```bash
docker compose up --build
```

Then open `http://localhost:8000` for the frontend. The backend API is available internally through the frontend proxy.

## Required environment variables

Set at least one Azure speech subscription variable plus a region or endpoint:

- `AZURE_SPEECH_KEY` or `AZURE_SPEECH_SKD_KEY`
- `AZURE_SPEECH_REGION` or `AZURE_ENDPOINT`
- Optional: `AZURE_SPEECH_VOICE`

## Local development

If you want to run it without Docker, you can still use the backend virtual environment and a separate frontend install once Node is available.