const BAR_HEIGHTS = [10, 22, 14, 30, 18, 36, 20, 28, 12, 24, 16, 32, 14, 20, 10]

export function WaveformIcon() {
  return (
    <div className="flex h-24 w-full max-w-[220px] items-center justify-center gap-1.5">
      {BAR_HEIGHTS.map((height, index) => (
        <span
          key={index}
          className="w-1.5 rounded-full bg-amber/70"
          style={{ height: `${height * 2}px` }}
        />
      ))}
    </div>
  )
}
