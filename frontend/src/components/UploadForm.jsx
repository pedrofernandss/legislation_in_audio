import { PrimaryButton } from './PrimaryButton'

export function UploadForm({ file, onFileChange, onSubmit, isSubmitting }) {
  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <label className="flex cursor-pointer flex-col gap-2 rounded-sm border border-dashed border-surface-border/25 bg-surface px-6 py-10 text-center transition-colors hover:border-accent/60">
        <input
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
        />
        <span className="font-serif text-lg text-ink">
          {file ? file.name : 'Escolher um arquivo PDF'}
        </span>
        <small className="text-sm font-light text-muted/60">
          O arquivo será lido, limpo e convertido em trechos de áudio.
        </small>
      </label>

      <PrimaryButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Gerar áudio'}
      </PrimaryButton>
    </form>
  )
}
