'use client'

import { useState, useEffect } from 'react'
import { ErrorBoundary } from '@/components/shared/error-boundary'
import { ImageDropzone } from '@/components/shared/image-dropzone'
import { DownloadButton } from '@/components/shared/download-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { resizeImage, getImageDimensions } from '@/lib/image-utils'
import { useImageProcessor } from '@/hooks/use-image-processor'
import { Loader2, Link2, Link2Off, X } from 'lucide-react'

const PRESETS = [
  { label: 'Instagram', width: 1080, height: 1080 },
  { label: 'Facebook', width: 1200, height: 628 },
  { label: 'Twitter/X', width: 1200, height: 675 },
  { label: 'YouTube', width: 1280, height: 720 },
]

function ResizeToolInner() {
  const { source, result, processing, error, loadFile, run, reset } = useImageProcessor()
  const [origDims, setOrigDims] = useState<{ w: number; h: number } | null>(null)
  const [width, setWidth] = useState('')
  const [height, setHeight] = useState('')
  const [locked, setLocked] = useState(true)

  useEffect(() => {
    if (!source) { setOrigDims(null); return }
    getImageDimensions(source.file).then(({ width: w, height: h }) => {
      setOrigDims({ w, h })
      setWidth(String(w))
      setHeight(String(h))
    })
  }, [source])

  const handleWidthChange = (v: string) => {
    setWidth(v)
    if (locked && origDims && Number(v) > 0) {
      setHeight(String(Math.round((Number(v) / origDims.w) * origDims.h)))
    }
  }

  const handleHeightChange = (v: string) => {
    setHeight(v)
    if (locked && origDims && Number(v) > 0) {
      setWidth(String(Math.round((Number(v) / origDims.h) * origDims.w)))
    }
  }

  const handleResize = () =>
    run(() => resizeImage(source!.file, Number(width), Number(height)))

  return (
    <div className="space-y-8">
      {!source ? (
        <ImageDropzone onFileAccepted={loadFile} />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground font-medium truncate mr-4">
              {source.file.name}{origDims ? ` — ${origDims.w}×${origDims.h}` : ''}
            </p>
            <Button variant="ghost" size="sm" onClick={reset} aria-label="Remove image">
              <X className="h-4 w-4 mr-1" aria-hidden="true" /> Remove
            </Button>
          </div>

          <div className="rounded-2xl border border-border p-6 space-y-6">
            <div>
              <p className="text-sm font-medium mb-3">Social Media Presets</p>
              <div className="flex flex-wrap gap-2">
                {PRESETS.map((p) => (
                  <Button
                    key={p.label}
                    variant="outline"
                    size="sm"
                    className="rounded-xl"
                    onClick={() => { setWidth(String(p.width)); setHeight(String(p.height)) }}
                  >
                    {p.label}
                    <span className="ml-1.5 text-muted-foreground text-xs">{p.width}×{p.height}</span>
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-end gap-3">
              <div className="flex-1">
                <Label htmlFor="resize-width" className="text-sm">Width (px)</Label>
                <Input
                  id="resize-width"
                  value={width}
                  onChange={(e) => handleWidthChange(e.target.value)}
                  type="number"
                  min={1}
                  className="mt-1.5 rounded-xl"
                  aria-label="Width in pixels"
                />
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setLocked(!locked)}
                className="mb-0.5 shrink-0"
                aria-label={locked ? 'Aspect ratio locked — click to unlock' : 'Aspect ratio unlocked — click to lock'}
                aria-pressed={locked}
              >
                {locked
                  ? <Link2 className="h-4 w-4 text-primary" aria-hidden="true" />
                  : <Link2Off className="h-4 w-4 text-muted-foreground" aria-hidden="true" />}
              </Button>
              <div className="flex-1">
                <Label htmlFor="resize-height" className="text-sm">Height (px)</Label>
                <Input
                  id="resize-height"
                  value={height}
                  onChange={(e) => handleHeightChange(e.target.value)}
                  type="number"
                  min={1}
                  className="mt-1.5 rounded-xl"
                  aria-label="Height in pixels"
                />
              </div>
            </div>

            <Button
              onClick={handleResize}
              disabled={processing || !width || !height}
              className="w-full rounded-xl h-11"
            >
              {processing ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> Resizing…</>
              ) : 'Resize Image'}
            </Button>
          </div>

          {error && <p className="text-sm text-destructive" role="alert">{error}</p>}

          {result && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Result — {width}×{height}px</p>
              </div>
              <img
                src={result.preview}
                alt={`Resized image at ${width}×${height} pixels`}
                className="w-full rounded-2xl border border-border object-contain max-h-96 bg-muted/20"
                loading="lazy"
              />
              <DownloadButton
                blob={result.blob}
                filename={`resized-${source.file.name}`}
                className="w-full rounded-xl"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function ResizeTool() {
  return (
    <ErrorBoundary>
      <ResizeToolInner />
    </ErrorBoundary>
  )
}
