import { useState } from 'react'
import { navigate } from '../lib/router'
import { convertPdf } from '../lib/api'
import { useJobsList } from '../hooks/useJobsList'
import { Header } from '../components/Header'
import { Eyebrow } from '../components/Eyebrow'
import { SectionNumber } from '../components/SectionNumber'
import { Reveal } from '../components/Reveal'
import { PrimaryButton } from '../components/PrimaryButton'
import { UploadForm } from '../components/UploadForm'
import { ErrorMessage } from '../components/ErrorMessage'
import { JobCard } from '../components/JobCard'

export function UsePage() {
  const [file, setFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const { jobs, addJob, removeJob } = useJobsList()

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
      addJob(data.job_id, file.name)
      setFile(null)
    } catch (submitErr) {
      setSubmitError(submitErr.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto w-full max-w-[1080px] px-5 sm:px-10">
        <section className="flex flex-col gap-8 py-[clamp(40px,6vh,64px)] sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-lg">
            <Eyebrow className="mb-5">Usar o sistema</Eyebrow>
            <h1 className="mb-5 font-serif text-[clamp(2.1rem,4.5vw,3rem)] font-normal leading-[1.12] text-ink">
              Envie um PDF e receba o áudio.
            </h1>
            <p className="font-light leading-[1.65] text-muted/60">
              Simples assim: envie o arquivo, aguarde o processamento e revise os trechos
              gerados. Você pode enviar mais de um PDF — cada um aparece na sua própria lista
              abaixo.
            </p>
          </div>

          <PrimaryButton variant="secondary" type="button" onClick={() => navigate('/')}>
            Voltar para o início
          </PrimaryButton>
        </section>

        <hr className="border-t border-surface-border/15" />

        <section className="py-[clamp(32px,5vh,56px)]">
          <Reveal as="div" variant="fade" className="max-w-lg">
            <SectionNumber>i.</SectionNumber>
            <Eyebrow className="mb-3.5">Enviar arquivo</Eyebrow>
            <div className="flex flex-col gap-4">
              <UploadForm
                file={file}
                onFileChange={setFile}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
              />
              <ErrorMessage message={submitError} />
            </div>
          </Reveal>
        </section>

        <hr className="border-t border-surface-border/15" />

        <section className="py-[clamp(40px,6vh,72px)]">
          <Reveal as="div" variant="focus" className="mb-8">
            <SectionNumber>ii.</SectionNumber>
            <Eyebrow>Suas conversões</Eyebrow>
          </Reveal>

          {jobs.length ? (
            <div className="flex flex-col gap-6">
              {jobs.map((job) => (
                <JobCard
                  key={job.jobId}
                  jobId={job.jobId}
                  fileName={job.fileName}
                  onRemove={removeJob}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-sm border border-dashed border-surface-border/20 px-6 py-10 text-center text-sm font-light text-muted/60">
              Suas conversões vão aparecer aqui, uma abaixo da outra, assim que você enviar um
              PDF.
            </div>
          )}
        </section>
      </main>

      <footer className="mt-auto flex flex-wrap items-center justify-between gap-4 border-t border-surface-border/15 px-5 py-6 sm:px-10">
        <span className="font-serif text-sm text-ink">Lei em Voz</span>
        <p className="text-[10px] font-normal uppercase tracking-[0.2em] text-muted/40">
          © 2026 Lei em Voz
        </p>
      </footer>
    </div>
  )
}
