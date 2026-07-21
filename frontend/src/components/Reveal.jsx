import { useScrollReveal } from '../hooks/useScrollReveal'

const VARIANT_CLASSES = {
  fade: 'reveal',
  focus: 'reveal-focus',
  curtain: 'reveal-curtain',
}

export function Reveal({ as: Tag = 'div', variant = 'fade', delay, className = '', children, ...rest }) {
  const { ref, isVisible } = useScrollReveal()
  const delayClass = delay ? `delay-${delay}` : ''

  return (
    <Tag
      ref={ref}
      className={`${VARIANT_CLASSES[variant]} ${delayClass} ${isVisible ? 'is-visible' : ''} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
