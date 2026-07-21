export async function convertPdf(file) {
  const formData = new FormData()
  formData.append('file', file)

  const response = await fetch('/api/convert', {
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
  const response = await fetch(`/api/jobs/${jobId}`)
  if (!response.ok) {
    throw new Error('Não foi possível obter o status do processamento.')
  }

  return response.json()
}
