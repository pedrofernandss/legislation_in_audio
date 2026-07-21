export function OrnamentalDivider() {
  return (
    <div className="flex items-center gap-5" aria-hidden="true">
      <span className="h-px flex-1 bg-surface-border/15" />
      <svg viewBox="0 0 48 48" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.1" className="text-accent/70">
        <path transform="rotate(0 24 24)" d="M24 24 C 19 18 19 12 24 7 C 29 12 29 18 24 24 Z" />
        <path transform="rotate(90 24 24)" d="M24 24 C 19 18 19 12 24 7 C 29 12 29 18 24 24 Z" />
        <path transform="rotate(180 24 24)" d="M24 24 C 19 18 19 12 24 7 C 29 12 29 18 24 24 Z" />
        <path transform="rotate(270 24 24)" d="M24 24 C 19 18 19 12 24 7 C 29 12 29 18 24 24 Z" />
        <circle cx="24" cy="24" r="2.4" fill="currentColor" stroke="none" className="text-amber" />
      </svg>
      <span className="h-px flex-1 bg-surface-border/15" />
    </div>
  )
}
