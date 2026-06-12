'use client'

import { useState } from 'react'
import { ErrorBoundary } from '@/components/shared/error-boundary'
import { ImageDropzone } from '@/components/shared/image-dropzone'
import { DownloadButton } from '@/components/shared/download-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { rotateImage } from '@/lib/image-utils'
import { useImageProcessor } from '@/hooks/use-image-processor'
import { trackToolUsage, GA_EVENTS } from '@/lib/analytics'
import { Loader2, X, RotateCcw, RotateCw } from 'lucide-react'

const QUICK_ANGLES = [
  { label: '90° CW', angle: 90 },
  { label: '180°', angle: 180 },
  { label: '270° CW', angle: 270 },
  { label: '90° CCW', angle: -90 },
]

function RotateToolInner() {
  const { source, result, processing, error, loadFile, run, reset } = useImageProcessor()
  const [angle, setAngle] = useState(90)

  const handleRotate = (deg?: number) => {
    trackToolUsage(GA_EVENTS.ROTATE_IMAGE)
    run(() => rotateImage(source!.file, deg ?? angle))
  }

  return (
    <div className="space-y-8">
      {!source ? (
        <ImageDropzone onFileAccepted={loadFile} />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground font-medium truncate mr-4">{source.file.name}</p>
            <Button variant="ghost" size="sm" onClick={reset} aria-label="Remove image">
              <X className="h-4 w-4 mr-1" aria-hidden="true" /> Remove
            </Button>
          </div>

          <div className="rounded-2xl border border-border p-6 space-y-6">
            <fieldset>
              <legend className="text-sm font-medium mb-3">Quick Rotate</legend>
              <div className="flex flex-wrap gap-2">
                {QUICK_ANGLES.map(({ label, angle: a }) => (
                  <Button
                    key={label}
                    variant="outline"
                    size="sm"
                    className="rounded-xl"
                    onClick={() => handleRotate(a)}
                    disabled={processing}
                    aria-label={`Rotate ${label}`}
                  >
                    {a < 0
                      ? <RotateCcw className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />
                      : <RotateCw className="h-3.5 w-3.5 mr-1.5" aria-hidden="true" />}
                    {label}
                  </Button>
                ))}
              </div>
            </fieldset>

            <div className="flex items-end gap-3">
              <div className="flex-1">
                <Label htmlFor="rotate-angle" className="text-sm">Custom Angle (degrees)</Label>
                <Input
                  id="rotate-angle"
                  type="number"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  className="mt-1.5 rounded-xl"
                  min={-360} max={360}
                />
              </div>
              <Button
                onClick={() => handleRotate()}
                disabled={processing}
                className="rounded-xl h-10 px-5 shrink-0"
              >
                {processing ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : 'Rotate'}
              </Button>
            </div>
          </div>

          {error && <p className="text-sm text-destructive" role="alert">{error}</p>}

          {result && (
            <div className="space-y-3">
              <p className="text-sm font-medium">Result</p>
              <img
                src={result.preview}
                alt={`Rotated version of ${source.file.name}`}
                className="w-full rounded-2xl border border-border object-contain max-h-96 bg-muted/20"
                loading="lazy"
              />
              <DownloadButton
                blob={result.blob}
                filename={`rotated-${source.file.name}`}
                toolName="rotate"
                className="w-full rounded-xl"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function RotateTool() {
  return (
    <ErrorBoundary>
      <RotateToolInner />
    </ErrorBoundary>
  )
}
