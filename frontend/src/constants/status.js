export const STATUS_LABELS = {
  queued: 'Na fila',
  processing: 'Processando',
  completed: 'Concluído',
  failed: 'Falhou',
}

export function formatStatus(status) {
  return STATUS_LABELS[status] ?? status
}

export function computeProgress(job) {
  if (!job) return 0

  const { status, total_segments: totalSegments, result } = job
  const segmentsReady = result?.segments?.length ?? 0

  if (status === 'completed' || status === 'failed') return 100
  if (status === 'queued') return 5

  // processing: scale within the [10, 95] range as segments complete, so the
  // bar reflects real work done instead of sitting at a fixed guess.
  if (totalSegments) {
    return Math.min(95, 10 + Math.round((segmentsReady / totalSegments) * 85))
  }

  return 15
}
