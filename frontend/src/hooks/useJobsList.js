import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'audio-law-jobs'

function readStoredJobs() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch (error) {
    return []
  }
}

function writeStoredJobs(jobs) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
  } catch (error) {
    // localStorage indisponível — a lista some ao recarregar, sem quebrar o app
  }
}

export function useJobsList() {
  const [jobs, setJobs] = useState(readStoredJobs)

  useEffect(() => {
    writeStoredJobs(jobs)
  }, [jobs])

  const addJob = useCallback((jobId, fileName) => {
    setJobs((current) => [{ jobId, fileName }, ...current.filter((job) => job.jobId !== jobId)])
  }, [])

  const removeJob = useCallback((jobId) => {
    setJobs((current) => current.filter((job) => job.jobId !== jobId))
  }, [])

  return { jobs, addJob, removeJob }
}
