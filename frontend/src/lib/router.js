export function getPagePath() {
  return window.location.pathname.replace(/\/+$/, '') || '/'
}

export function navigate(path) {
  window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}
