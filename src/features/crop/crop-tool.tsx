'use client'

import { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import type { Area } from 'react-easy-crop'
import { ErrorBoundary } from '@/components/shared/error-boundary'
import { ImageDropzone } from '@/components/shared/image-dropzone'
import { DownloadButton } from '@/components/shared/download-button'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useImageProcessor } from '@/hooks/use-image-processor'
import { canvasToBlob, loadImage } from '@/lib/image-utils'
import { trackToolUsage, GA_EVENTS } from '@/lib/analytics'
import { Loader2, X } from 'lucide-react'

const RATIOS = [
  { label: 'Free', value: null },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
  { label: '3:2', value: 3 / 2 },
]

async function cropImageBlob(imageSrc: string, pixelCrop: Area): Promise<Blob> {
  const img = await loadImage(imageSrc)
  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx = canvas.getContext('2d')!
  ctx.drawImage(img, pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height, 0, 0, pixelCrop.width, pixelCrop.height)
  return canvasToBlob(canvas, 'jpeg')
}

function CropToolInner() {
  const { source, result, processing, error, loadFile, run, reset } = useImageProcessor()
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [aspect, setAspect] = useState<number | undefined>(undefined)
  const [croppedArea, setCroppedArea] = useState<Area | null>(null)

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedArea(croppedPixels)
  }, [])

  const handleCrop = () => {
    if (!croppedArea || !source) return
    trackToolUsage(GA_EVENTS.CROP_IMAGE)
    run(() => cropImageBlob(source.preview, croppedArea))
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

          <div className="relative w-full rounded-2xl overflow-hidden border border-border bg-muted/20" style={{ height: 340 }}>
            <Cropper
              image={source.preview}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>

          <div className="rounded-2xl border border-border p-6 space-y-6">
            <fieldset>
              <legend className="text-sm font-medium mb-3">Aspect Ratio</legend>
              <div className="flex flex-wrap gap-2">
                {RATIOS.map((r) => (
                  <Button
                    key={r.label}
                    variant={aspect === r.value ? 'default' : 'outline'}
                    size="sm"
                    className="rounded-xl"
                    onClick={() => setAspect(r.value ?? undefined)}
                    aria-pressed={aspect === r.value}
                  >
                    {r.label}
                  </Button>
                ))}
              </div>
            </fieldset>

            <div>
              <div className="flex justify-between mb-3">
                <label id="zoom-label" className="text-sm font-medium">Zoom</label>
                <span className="text-sm text-muted-foreground" aria-live="polite">{zoom.toFixed(1)}×</span>
              </div>
              <Slider
                value={[zoom]}
                onValueChange={(v) => { const n = (v as number[])[0]; if (n !== undefined) setZoom(n) }}
                min={1} max={3} step={0.1}
                aria-labelledby="zoom-label"
              />
            </div>

            <Button onClick={handleCrop} disabled={processing || !croppedArea} className="w-full rounded-xl h-11">
              {processing ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> Cropping…</>
              ) : 'Crop Image'}
            </Button>
          </div>

          {error && <p className="text-sm text-destructive" role="alert">{error}</p>}

          {result && (
            <div className="space-y-3">
              <p className="text-sm font-medium">Cropped Result</p>
              <img
                src={result.preview}
                alt={`Cropped version of ${source.file.name}`}
                className="w-full rounded-2xl border border-border object-contain max-h-96 bg-muted/20"
                loading="lazy"
              />
              <DownloadButton
                blob={result.blob}
                filename={`cropped-${source.file.name}`}
                toolName="crop"
                className="w-full rounded-xl"
              />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export function CropTool() {
  return (
    <ErrorBoundary>
      <CropToolInner />
    </ErrorBoundary>
  )
}
