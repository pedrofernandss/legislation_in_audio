import { useEffect, useMemo, useState } from 'react'

const STATUS_LABELS = {
  queued: 'Queued',
  processing: 'Processing',
  completed: 'Completed',
  failed: 'Failed',
}

const STATUS_PROGRESS = {
  queued: 15,
  processing: 55,
  completed: 100,
  failed: 100,
}

function formatStatus(status) {
  return STATUS_LABELS[status] ?? status
}

function getPagePath() {
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

function navigate(path) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function LandingPage() {
  return (
    <main className="page page--landing">
      <header className="landing-header">
        <div>
          <p className="eyebrow">Audio Law</p>
          <h1>Turn legal PDFs into audio.</h1>
          <p className="lede">
            Upload a document, let the system clean the text, and receive audio segments you can play or download.
          </p>
        </div>

        <div className="landing-card">
          <p className="landing-card__label">Simple flow</p>
          <ol className="landing-steps">
            <li>Upload PDF</li>
            <li>Process text</li>
            <li>Generate audio</li>
          </ol>
        </div>
      </header>

      <section className="landing-actions">
        <button className="primary-button" type="button" onClick={() => navigate('/use')}>
          Start using the system
        </button>
        <p className="landing-note">Built for clear review, not for a crowded dashboard.</p>
      </section>
    </main>
  )
}

function UsePage() {
  const [file, setFile] = useState(null)
  const [jobId, setJobId] = useState('')
  const [job, setJob] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const progress = useMemo(() => {
    if (!job) return 0
    return STATUS_PROGRESS[job.status] ?? 0
  }, [job])

  useEffect(() => {
    if (!jobId || job?.status === 'completed' || job?.status === 'failed') {
      return undefined
    }

    const interval = window.setInterval(async () => {
      try {
        const response = await fetch(`/api/jobs/${jobId}`)
        if (!response.ok) {
          throw new Error('Failed to fetch job state')
        }

        const data = await response.json()
        setJob(data)
      } catch (fetchError) {
        setError(fetchError.message)
      }
    }, 2000)

    return () => window.clearInterval(interval)
  }, [jobId, job?.status])

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setJob(null)

    if (!file) {
      setError('Choose a PDF file first.')
      return
    }

    const formData = new FormData()
    formData.append('file', file)

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/convert', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.detail ?? 'Upload failed')
      }

      setJobId(data.job_id)
      setJob({ job_id: data.job_id, status: data.status })
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalSegments = job?.result?.segments?.length ?? 0

  return (
    <main className="page page--use">
      <header className="use-header">
        <div>
          <p className="eyebrow">Use the system</p>
          <h1>Upload one PDF and get audio back.</h1>
          <p className="lede">
            Keep it simple: send the file, wait for the job, then review the generated segments.
          </p>
        </div>

        <button className="secondary-button" type="button" onClick={() => navigate('/')}>
          Back to landing
        </button>
      </header>

      <section className="use-layout">
        <div className="use-panel">
          <form className="upload-form" onSubmit={handleSubmit}>
            <label className="upload-dropzone">
              <input
                type="file"
                accept="application/pdf"
                onChange={(event) => setFile(event.target.files?.[0] ?? null)}
              />
              <span>{file ? file.name : 'Choose a PDF file'}</span>
              <small>The file will be parsed, cleaned, and converted into audio segments.</small>
            </label>

            <button className="primary-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Generate audio'}
            </button>
          </form>

          {error ? <div className="message">{error}</div> : null}
        </div>

        <aside className="status-panel">
          <div className="status-card">
            <p className="status-card__label">Status</p>
            <div className="status-row">
              <span>Job</span>
              <strong>{jobId || 'Waiting'}</strong>
            </div>
            <div className="status-row">
              <span>Stage</span>
              <strong>{formatStatus(job?.status ?? 'queued')}</strong>
            </div>
            <div className="progress">
              <div className="progress__bar" style={{ width: `${progress}%` }} />
            </div>
            <p className="status-card__caption">
              The system returns a job ID and updates it until the audio is ready.
            </p>
          </div>

          <div className="mini-grid">
            <div className="mini-card mini-card--blue">
              <span>Segments</span>
              <strong>{totalSegments}</strong>
            </div>
            <div className="mini-card mini-card--green">
              <span>Source</span>
              <strong>PDF</strong>
            </div>
            <div className="mini-card mini-card--yellow">
              <span>Output</span>
              <strong>Audio</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="results-panel">
        <div className="results-header">
          <h2>Generated audio</h2>
          <span>{totalSegments} files</span>
        </div>

        <div className="segments">
          {job?.result?.segments?.length ? (
            job.result.segments.map((segment, index) => (
              <article className="segment" key={`${segment.audio_file}-${index}`}>
                <div className="segment__meta">
                  <strong>{segment.title ?? `Segment ${index + 1}`}</strong>
                  <a href={segment.download_url} target="_blank" rel="noreferrer">
                    Download
                  </a>
                </div>
                <p>{segment.text.slice(0, 220)}{segment.text.length > 220 ? '...' : ''}</p>
                <audio controls src={segment.download_url} />
              </article>
            ))
          ) : (
            <div className="empty-state">
              Generated audio will appear here after the job completes.
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default function App() {
  const [pathname, setPathname] = useState(getPagePath())

  useEffect(() => {
    const handlePopState = () => setPathname(getPagePath())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  if (pathname === '/use') {
    return <UsePage />
  }

  return <LandingPage />
}
