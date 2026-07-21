export function Eyebrow({ children, className = '' }) {
  return (
    <p className={`text-[11px] font-normal uppercase tracking-[0.28em] text-muted/60 ${className}`}>
      {children}
    </p>
  )
}
