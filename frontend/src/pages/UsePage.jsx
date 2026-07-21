import { useMemo, useState } from 'react'
import { navigate } from '../lib/router'
import { convertPdf } from '../lib/api'
import { useJobPolling } from '../hooks/useJobPolling'
import { STATUS_PROGRESS } from '../constants/status'
import { Header } from '../components/Header'
import { Eyebrow } from '../components/Eyebrow'
import { SectionNumber } from '../components/SectionNumber'
import { OrnamentalDivider } from '../components/OrnamentalDivider'
import { Reveal } from '../components/Reveal'
import { PrimaryButton } from '../components/PrimaryButton'
import { UploadForm } from '../components/UploadForm'
import { ErrorMessage } from '../components/ErrorMessage'
import { JobStatusPanel } from '../components/JobStatusPanel'
import { StatsGrid } from '../components/StatsGrid'
import { SegmentList } from '../components/SegmentList'

export function UsePage() {
  const [file, setFile] = useState(null)
  const [jobId, setJobId] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const { job, error: pollError } = useJobPolling(jobId)
  const error = submitError || pollError

  const progress = useMemo(() => {
    if (!job) return 0
    return STATUS_PROGRESS[job.status] ?? 0
  }, [job])

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitError('')

    if (!file) {
      setSubmitError('Escolha um arquivo PDF antes de continuar.')
      return
    }

    setIsSubmitting(true)
    try {
      const data = await convertPdf(file)
      setJobId(data.job_id)
    } catch (submitErr) {
      setSubmitError(submitErr.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalSegments = job?.result?.segments?.length ?? 0

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto w-full max-w-[1080px] px-5 sm:px-10">
        <section className="flex flex-col gap-8 py-[clamp(56px,9vh,88px)] sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-lg">
            <Eyebrow className="mb-5">Usar o sistema</Eyebrow>
            <h1 className="mb-5 font-serif text-[clamp(2.1rem,4.5vw,3rem)] font-normal leading-[1.12] text-ink">
              Envie um PDF e receba o áudio.
            </h1>
            <p className="font-light leading-[1.65] text-muted/60">
              Simples assim: envie o arquivo, aguarde o processamento e revise os trechos
              gerados.
            </p>
          </div>

          <PrimaryButton variant="secondary" type="button" onClick={() => navigate('/')}>
            Voltar para o início
          </PrimaryButton>
        </section>

        <OrnamentalDivider />

        <section className="py-[clamp(56px,9vh,96px)]">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
            <Reveal as="div" variant="fade">
              <SectionNumber>i.</SectionNumber>
              <Eyebrow className="mb-3.5">Enviar arquivo</Eyebrow>
              <div className="flex flex-col gap-4">
                <UploadForm
                  file={file}
                  onFileChange={setFile}
                  onSubmit={handleSubmit}
                  isSubmitting={isSubmitting}
                />
                <ErrorMessage message={error} />
              </div>
            </Reveal>

            <Reveal as="div" variant="fade" delay={1}>
              <SectionNumber>ii.</SectionNumber>
              <Eyebrow className="mb-3.5">Status</Eyebrow>
              <div className="flex flex-col gap-4">
                <JobStatusPanel jobId={jobId} status={job?.status} progress={progress} />
                <StatsGrid segmentCount={totalSegments} />
              </div>
            </Reveal>
          </div>
        </section>

        <hr className="border-t border-surface-border/15" />

        <section className="py-[clamp(56px,9vh,96px)]">
          <Reveal as="div" variant="focus" className="mb-8">
            <SectionNumber>iii.</SectionNumber>
            <Eyebrow>Resultados</Eyebrow>
          </Reveal>
          <SegmentList segments={job?.result?.segments ?? []} />
        </section>
      </main>

      <footer className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-surface-border/15 px-5 py-6 sm:px-10">
        <span className="font-serif text-sm text-ink">Audio Law</span>
        <p className="text-[10px] font-normal uppercase tracking-[0.2em] text-muted/40">
          © 2026 Audio Law
        </p>
      </footer>
    </div>
  )
}
