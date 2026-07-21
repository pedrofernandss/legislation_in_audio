const STATS = [
  { key: 'segments', label: 'Trechos', accent: 'text-accent' },
  { key: 'source', label: 'Origem', value: 'PDF', accent: 'text-green' },
  { key: 'output', label: 'Resultado', value: 'Áudio', accent: 'text-amber' },
]

export function StatsGrid({ segmentCount }) {
  return (
    <div className="grid grid-cols-3 gap-3">
      {STATS.map((stat) => (
        <div
          key={stat.key}
          className="flex flex-col gap-1 rounded-sm border border-surface-border/15 bg-surface px-4 py-3"
        >
          <span className="text-xs font-light text-muted/60">{stat.label}</span>
          <strong className={`font-serif text-lg ${stat.accent}`}>
            {stat.key === 'segments' ? segmentCount : stat.value}
          </strong>
        </div>
      ))}
    </div>
  )
}
