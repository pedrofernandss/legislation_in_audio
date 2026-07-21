import { useEffect, useState } from 'react'
import { getJob } from '../lib/api'

export function useJobPolling(jobId) {
  const [job, setJob] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    setJob(null)
    setError('')

    if (!jobId) {
      return undefined
    }

    let cancelled = false
    let interval

    async function poll() {
      try {
        const data = await getJob(jobId)
        if (cancelled) return

        setJob(data)
        if (data.status === 'completed' || data.status === 'failed') {
          window.clearInterval(interval)
        }
      } catch (fetchError) {
        if (!cancelled) {
          setError(fetchError.message)
        }
      }
    }

    poll()
    interval = window.setInterval(poll, 2000)

    return () => {
      cancelled = true
      window.clearInterval(interval)
    }
  }, [jobId])

  return { job, error }
}
