import { useEffect, useRef, useState } from 'react'

// If IntersectionObserver never fires for any reason (unsupported browser,
// an element that starts already off-screen in an odd layout, etc.), this
// guarantees content still becomes visible instead of staying hidden forever.
const FAILSAFE_DELAY_MS = 1200

export function useScrollReveal() {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      setIsVisible(true)
      return undefined
    }

    let settled = false
    const reveal = () => {
      if (settled) return
      settled = true
      setIsVisible(true)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal()
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    )

    observer.observe(node)
    const failsafe = window.setTimeout(reveal, FAILSAFE_DELAY_MS)

    return () => {
      observer.disconnect()
      window.clearTimeout(failsafe)
    }
  }, [])

  return { ref, isVisible }
}
