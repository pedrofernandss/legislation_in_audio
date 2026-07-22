import { formatStatus } from '../constants/status'

function progressCaption(status, segmentsReady, totalSegments) {
  if (status === 'completed') return 'Áudio pronto para ouvir ou baixar.'
  if (status === 'failed') return 'O processamento falhou. Veja o erro abaixo.'
  if (totalSegments) return `${segmentsReady} de ${totalSegments} trechos prontos.`
  return 'Lendo e limpando o texto do PDF...'
}

export function JobStatusPanel({ jobId, status, progress, segmentsReady = 0, totalSegments = null }) {
  return (
    <div className="rounded-sm border border-surface-border/15 bg-surface p-6">
      <p className="text-[11px] font-normal uppercase tracking-[0.2em] text-muted/60">Status</p>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-muted/60">Trabalho</span>
        <strong className="font-normal text-ink">{jobId || 'Aguardando'}</strong>
      </div>
      <div className="mt-2 flex items-center justify-between text-sm">
        <span className="text-muted/60">Etapa</span>
        <strong className="font-normal text-ink">{formatStatus(status ?? 'queued')}</strong>
      </div>

      <div className="mt-4 h-[3px] overflow-hidden rounded-full bg-surface-border/15">
        <div
          className="h-full bg-accent transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-4 text-xs font-light text-muted/50">
        {progressCaption(status, segmentsReady, totalSegments)}
      </p>
    </div>
  )
}
