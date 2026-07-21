const CHAPTERS = ['Capítulo I', 'Capítulo II', 'Capítulo III']

export function ChaptersIcon() {
  return (
    <div className="flex w-full max-w-[220px] flex-col gap-2.5">
      {CHAPTERS.map((label, index) => (
        <div
          key={label}
          className="flex items-center gap-3 rounded-sm border border-surface-border/15 px-4 py-3"
          style={{ opacity: 1 - index * 0.16 }}
        >
          <span className="font-serif italic text-sm text-accent">{`${index + 1}.`}</span>
          <span className="text-xs uppercase tracking-[0.14em] text-muted/70">{label}</span>
        </div>
      ))}
    </div>
  )
}
