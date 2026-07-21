import { SegmentCard } from './SegmentCard'

export function SegmentList({ segments }) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-lg text-ink">Áudio gerado</h2>
        <span className="text-sm font-light text-muted/60">{segments.length} arquivos</span>
      </div>

      {segments.length ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {segments.map((segment, index) => (
            <SegmentCard key={`${segment.audio_file}-${index}`} segment={segment} index={index} />
          ))}
        </div>
      ) : (
        <div className="rounded-sm border border-dashed border-surface-border/20 px-6 py-10 text-center text-sm font-light text-muted/60">
          O áudio gerado aparecerá aqui quando o processamento terminar.
        </div>
      )}
    </section>
  )
}
