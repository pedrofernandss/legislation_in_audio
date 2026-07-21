const VARIANT_CLASSES = {
  primary:
    'bg-accent text-bg border border-accent hover:bg-accent-hover hover:border-accent-hover disabled:opacity-55 disabled:cursor-not-allowed',
  secondary:
    'bg-transparent text-ink border border-surface-border/25 hover:border-accent/60 hover:text-accent',
}

export function PrimaryButton({ variant = 'primary', className = '', ...buttonProps }) {
  return (
    <button
      className={`inline-flex h-[50px] items-center justify-center gap-2 rounded-sm px-7 text-[13px] font-medium uppercase tracking-[0.14em] transition-colors duration-150 ${VARIANT_CLASSES[variant]} ${className}`}
      {...buttonProps}
    />
  )
}
