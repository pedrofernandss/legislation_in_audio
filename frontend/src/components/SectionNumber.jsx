const COLOR_CLASSES = {
  accent: 'text-accent',
  green: 'text-green',
  amber: 'text-amber',
}

export function SectionNumber({ children, color = 'amber' }) {
  return (
    <div className={`mb-4 font-serif italic text-xl ${COLOR_CLASSES[color] ?? COLOR_CLASSES.amber}`}>
      {children}
    </div>
  )
}
