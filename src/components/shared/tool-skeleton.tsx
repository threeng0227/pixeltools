export function ToolSkeleton() {
  return (
    <div className="space-y-6 animate-pulse" aria-busy="true" aria-label="Loading tool…">
      {/* Dropzone placeholder */}
      <div className="h-48 rounded-2xl bg-muted border-2 border-dashed border-border" />
      {/* Controls placeholder */}
      <div className="rounded-2xl border border-border p-6 space-y-4">
        <div className="h-4 w-32 rounded bg-muted" />
        <div className="flex gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-8 w-20 rounded-xl bg-muted" />
          ))}
        </div>
        <div className="h-2 rounded-full bg-muted" />
        <div className="h-11 rounded-xl bg-muted" />
      </div>
    </div>
  )
}
