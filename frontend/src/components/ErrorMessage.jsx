export function ErrorMessage({ message }) {
  if (!message) return null

  return (
    <div className="rounded-sm border border-amber/40 bg-amber/10 px-4 py-3 text-sm text-amber">
      {message}
    </div>
  )
}
