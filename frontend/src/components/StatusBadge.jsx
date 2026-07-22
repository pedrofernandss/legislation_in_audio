import { formatStatus } from '../constants/status'

const DOT_CLASSES = {
  queued: 'bg-muted/40',
  processing: 'bg-accent animate-pulse',
  completed: 'bg-green',
  failed: 'bg-amber',
}

export function StatusBadge({ status }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-surface-border/15 px-3 py-1 text-xs uppercase tracking-[0.08em] text-muted/70">
      <span className={`h-1.5 w-1.5 rounded-full ${DOT_CLASSES[status] ?? DOT_CLASSES.queued}`} />
      {formatStatus(status ?? 'queued')}
    </span>
  )
}
