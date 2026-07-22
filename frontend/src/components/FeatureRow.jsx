import { Reveal } from './Reveal'
import { Eyebrow } from './Eyebrow'
import { SectionNumber } from './SectionNumber'

export function FeatureRow({
  number,
  label,
  title,
  description,
  icon,
  reverse = false,
  variant = 'fade',
  color = 'amber',
}) {
  return (
    <Reveal
      as="div"
      variant={variant}
      className={`grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14 ${reverse ? 'md:[&>*:first-child]:order-2' : ''}`}
    >
      <div>
        <SectionNumber color={color}>{number}</SectionNumber>
        <Eyebrow className="mb-3.5">{label}</Eyebrow>
        <h3 className="mb-4 font-serif text-[clamp(1.7rem,3.5vw,2.3rem)] leading-[1.15] text-ink">
          {title}
        </h3>
        <p className="max-w-md font-light leading-[1.7] text-muted/60">{description}</p>
      </div>

      <div className="flex justify-center">{icon}</div>
    </Reveal>
  )
}
