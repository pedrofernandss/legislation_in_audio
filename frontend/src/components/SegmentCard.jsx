const EXCERPT_LENGTH = 220

export function SegmentCard({ segment, index }) {
  const excerpt =
    segment.text.length > EXCERPT_LENGTH
      ? `${segment.text.slice(0, EXCERPT_LENGTH)}...`
      : segment.text

  return (
    <article className="flex flex-col gap-3 rounded-sm border border-surface-border/15 bg-surface p-5">
      <div className="flex items-center justify-between gap-4">
        <strong className="font-serif text-ink">{segment.title ?? `Trecho ${index + 1}`}</strong>
        <a
          href={segment.download_url}
          target="_blank"
          rel="noreferrer"
          className="text-sm text-accent underline underline-offset-4 hover:opacity-70"
        >
          Baixar
        </a>
      </div>
      <p className="text-sm font-light text-muted/60">{excerpt}</p>
      <audio controls src={segment.download_url} className="w-full" />
    </article>
  )
}
