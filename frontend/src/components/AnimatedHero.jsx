import { useScrollReveal } from '../hooks/useScrollReveal'

function buildChars(segments) {
  const chars = []
  segments.forEach((segment) => {
    for (const char of segment.text) {
      chars.push({ char, emphasis: Boolean(segment.emphasis) })
    }
  })
  return chars
}

function groupWords(chars) {
  const words = []
  let current = []
  chars.forEach((entry) => {
    if (entry.char === ' ') {
      if (current.length) words.push(current)
      words.push('space')
      current = []
    } else {
      current.push(entry)
    }
  })
  if (current.length) words.push(current)
  return words
}

const STAGGER_STEP = 0.018

export function AnimatedHero({ segments, as: Tag = 'h1', className = '' }) {
  const { ref, isVisible } = useScrollReveal()
  const words = groupWords(buildChars(segments))

  let letterIndex = 0

  return (
    <Tag ref={ref} className={`hero-armed ${isVisible ? 'is-visible' : ''} ${className}`}>
      <span className="sr-only">
        {segments.map((segment) => segment.text).join('')}
      </span>
      <span aria-hidden="true">
        {words.map((word, wordIndex) => {
          if (word === 'space') {
            return <span key={`space-${wordIndex}`}> </span>
          }
          return (
            <span key={`word-${wordIndex}`} className="inline-block whitespace-nowrap">
              {word.map((entry, charIndex) => {
                const delay = (letterIndex++ * STAGGER_STEP).toFixed(3)
                return (
                  <span
                    key={charIndex}
                    className={`hero-letter ${entry.emphasis ? 'text-accent italic' : ''}`}
                    style={{ '--ld': `${delay}s` }}
                  >
                    {entry.char}
                  </span>
                )
              })}
            </span>
          )
        })}
      </span>
    </Tag>
  )
}
