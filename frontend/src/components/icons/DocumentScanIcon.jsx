export function DocumentScanIcon() {
  return (
    <div className="relative h-[220px] w-[170px] overflow-hidden">
      <svg viewBox="0 0 170 220" fill="none" className="h-full w-full text-muted/40">
        <rect x="30" y="14" width="110" height="192" rx="6" stroke="currentColor" strokeWidth="1" />
        <line x1="48" y1="52" x2="122" y2="52" stroke="currentColor" strokeWidth="1" />
        <line x1="48" y1="70" x2="122" y2="70" stroke="currentColor" strokeWidth="1" />
        <line x1="48" y1="88" x2="104" y2="88" stroke="currentColor" strokeWidth="1" />
        <line x1="48" y1="118" x2="122" y2="118" stroke="currentColor" strokeWidth="1" />
        <line x1="48" y1="136" x2="122" y2="136" stroke="currentColor" strokeWidth="1" />
        <line x1="48" y1="154" x2="96" y2="154" stroke="currentColor" strokeWidth="1" />
      </svg>
      <div className="scan-line absolute left-[16%] right-[16%] top-6 h-px bg-gradient-to-r from-transparent via-green to-transparent" />
    </div>
  )
}
