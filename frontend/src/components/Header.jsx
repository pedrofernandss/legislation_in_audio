import { navigate } from '../lib/router'
import { ThemeToggle } from './ThemeToggle'

export function Header({ center = null }) {
  return (
    <header className="sticky top-0 z-50 flex h-[68px] items-center justify-between border-b border-surface-border/15 bg-bg px-6 sm:px-10">
      <button
        type="button"
        onClick={() => navigate('/')}
        className="font-serif text-xl text-ink transition-opacity hover:opacity-80"
      >
        Audio Law
      </button>

      {center ? <nav className="hidden gap-9 sm:flex">{center}</nav> : null}

      <ThemeToggle />
    </header>
  )
}
