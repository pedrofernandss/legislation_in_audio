const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export function resolveApiUrl(path) {
  return `${API_BASE_URL}${path}`
}

export async function convertPdf(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch(resolveApiUrl('/api/convert'), {
    method: 'POST',
    body: formData,
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.detail ?? 'Falha ao enviar o arquivo.')
  }

  return data
}

export async function getJob(jobId) {
  const response = await fetch(resolveApiUrl(`/api/jobs/${jobId}`))
  if (!response.ok) {
    throw new Error('Não foi possível obter o status do processamento.')
  }

  return response.json()
}
