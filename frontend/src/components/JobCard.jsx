import { useJobPolling } from '../hooks/useJobPolling'
import { computeProgress } from '../constants/status'
import { JobStatusPanel } from './JobStatusPanel'
import { StatusBadge } from './StatusBadge'
import { ErrorMessage } from './ErrorMessage'
import { SegmentList } from './SegmentList'

export function JobCard({ jobId, fileName, onRemove }) {
  const { job, error: pollError } = useJobPolling(jobId)
  const progress = computeProgress(job)
  const segmentsReady = job?.result?.segments?.length ?? 0
  const totalSegments = job?.total_segments ?? null
  const error = pollError || (job?.status === 'failed' ? job.error : '')

  return (
    <article className="rounded-sm border border-surface-border/15 bg-surface p-6">
      <header className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="mb-1 text-[11px] uppercase tracking-[0.2em] text-muted/50">Arquivo</p>
          <h3 className="break-all font-serif text-lg text-ink">{fileName}</h3>
        </div>
        <div className="flex items-center gap-3">
          <StatusBadge status={job?.status ?? 'queued'} />
          <button
            type="button"
            onClick={() => onRemove(jobId)}
            aria-label="Remover da lista"
            title="Remover da lista"
            className="text-lg leading-none text-muted/40 transition-colors hover:text-accent"
          >
            ×
          </button>
        </div>
      </header>

      <div className="flex flex-col gap-4">
        <JobStatusPanel
          jobId={jobId}
          status={job?.status}
          progress={progress}
          segmentsReady={segmentsReady}
          totalSegments={totalSegments}
        />
        <ErrorMessage message={error} />
        <SegmentList segments={job?.result?.segments ?? []} />
      </div>
    </article>
  )
}
