export const STATUS_LABELS = {
  queued: 'Na fila',
  processing: 'Processando',
  completed: 'Concluído',
  failed: 'Falhou',
}

export const STATUS_PROGRESS = {
  queued: 15,
  processing: 55,
  completed: 100,
  failed: 100,
}

export function formatStatus(status) {
  return STATUS_LABELS[status] ?? status
}
