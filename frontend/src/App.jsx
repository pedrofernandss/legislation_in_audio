import { useEffect, useState } from 'react'
import { getPagePath } from './lib/router'
import { LandingPage } from './pages/LandingPage'
import { UsePage } from './pages/UsePage'

export default function App() {
  const [pathname, setPathname] = useState(getPagePath())

  useEffect(() => {
    const handlePopState = () => setPathname(getPagePath())
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  return pathname === '/use' ? <UsePage /> : <LandingPage />
}
