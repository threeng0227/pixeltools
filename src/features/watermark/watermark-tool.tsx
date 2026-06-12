'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { ErrorBoundary } from '@/components/shared/error-boundary'
import { ImageDropzone } from '@/components/shared/image-dropzone'
import { DownloadButton } from '@/components/shared/download-button'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useImageProcessor } from '@/hooks/use-image-processor'
import { canvasToBlob, loadImage } from '@/lib/image-utils'
import { trackToolUsage, GA_EVENTS } from '@/lib/analytics'
import type { WatermarkPosition } from '@/types'
import { X } from 'lucide-react'

const POSITIONS: { label: string; value: WatermarkPosition }[] = [
  { label: 'Top Left', value: 'top-left' },
  { label: 'Top Center', value: 'top-center' },
  { label: 'Top Right', value: 'top-right' },
  { label: 'Center Left', value: 'center-left' },
  { label: 'Center', value: 'center' },
  { label: 'Center Right', value: 'center-right' },
  { label: 'Bottom Left', value: 'bottom-left' },
  { label: 'Bottom Center', value: 'bottom-center' },
  { label: 'Bottom Right', value: 'bottom-right' },
]

function getTextCoords(
  canvas: HTMLCanvasElement,
  position: WatermarkPosition,
  fontSize: number,
  textWidth: number,
) {
  const pad = 20
  const map: Record<WatermarkPosition, { x: number; y: number }> = {
    'top-left': { x: pad, y: fontSize + pad },
    'top-center': { x: canvas.width / 2, y: fontSize + pad },
    'top-right': { x: canvas.width - textWidth - pad, y: fontSize + pad },
    'center-left': { x: pad, y: canvas.height / 2 },
    'center': { x: canvas.width / 2, y: canvas.height / 2 },
    'center-right': { x: canvas.width - textWidth - pad, y: canvas.height / 2 },
    'bottom-left': { x: pad, y: canvas.height - pad },
    'bottom-center': { x: canvas.width / 2, y: canvas.height - pad },
    'bottom-right': { x: canvas.width - textWidth - pad, y: canvas.height - pad },
  }
  return map[position]
}

function WatermarkToolInner() {
  const { source, result, processing, error, loadFile, run, reset } = useImageProcessor()
  const [text, setText] = useState('© PixelTools')
  const [fontSize, setFontSize] = useState(48)
  const [opacity, setOpacity] = useState(60)
  const [color, setColor] = useState('#ffffff')
  const [position, setPosition] = useState<WatermarkPosition>('bottom-right')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)

  const drawWatermark = useCallback(async (canvas: HTMLCanvasElement) => {
    if (!source) return
    const img = await loadImage(source.preview)
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, 0, 0)
    ctx.font = `bold ${fontSize}px Inter, sans-serif`
    ctx.fillStyle = color
    ctx.globalAlpha = opacity / 100
    const textWidth = ctx.measureText(text).width
    const { x, y } = getTextCoords(canvas, position, fontSize, textWidth)
    const centeredPositions: WatermarkPosition[] = ['top-center', 'center', 'bottom-center']
    ctx.textAlign = centeredPositions.includes(position) ? 'center' : 'left'
    ctx.fillText(text, x, y)
    ctx.globalAlpha = 1
  }, [source, text, fontSize, opacity, color, position])

  useEffect(() => {
    if (!source || !previewCanvasRef.current) return
    drawWatermark(previewCanvasRef.current)
  }, [drawWatermark, source])

  const handleApply = async () => {
    trackToolUsage(GA_EVENTS.WATERMARK_IMAGE)
    await run(async () => {
      const canvas = document.createElement('canvas')
      await drawWatermark(canvas)
      return canvasToBlob(canvas, 'jpeg')
    })
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-border p-6 space-y-5">
              <div>
                <Label htmlFor="wm-text" className="text-sm">Watermark Text</Label>
                <Input
                  id="wm-text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="mt-1.5 rounded-xl"
                  placeholder="Your watermark"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label id="wm-font-size-label" className="text-sm font-medium">Font Size</label>
                  <span className="text-sm text-muted-foreground" aria-live="polite">{fontSize}px</span>
                </div>
                <Slider
                  value={[fontSize]}
                  onValueChange={(v) => { const n = (v as number[])[0]; if (n !== undefined) setFontSize(n) }}
                  min={12} max={120} step={2}
                  aria-labelledby="wm-font-size-label"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label id="wm-opacity-label" className="text-sm font-medium">Opacity</label>
                  <span className="text-sm text-muted-foreground" aria-live="polite">{opacity}%</span>
                </div>
                <Slider
                  value={[opacity]}
                  onValueChange={(v) => { const n = (v as number[])[0]; if (n !== undefined) setOpacity(n) }}
                  min={5} max={100} step={5}
                  aria-labelledby="wm-opacity-label"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <Label htmlFor="wm-color" className="text-sm">Color</Label>
                  <input
                    id="wm-color"
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="mt-1.5 h-10 w-full rounded-xl border border-border cursor-pointer"
                    aria-label="Watermark color"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="wm-position" className="text-sm">Position</Label>
                  <Select value={position} onValueChange={(v) => setPosition(v as WatermarkPosition)}>
                    <SelectTrigger id="wm-position" className="mt-1.5 rounded-xl">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {POSITIONS.map((p) => (
                        <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
              <Button onClick={handleApply} disabled={processing} className="w-full rounded-xl h-11">
                Apply Watermark
              </Button>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">Live Preview</p>
              <canvas
                ref={previewCanvasRef}
                className="w-full rounded-2xl border border-border max-h-96 object-contain"
                aria-label={`Watermark preview for ${source.file.name}`}
              />
              {result && (
                <DownloadButton
                  blob={result.blob}
                  filename={`watermarked-${source.file.name}`}
                  toolName="watermark"
                  className="w-full rounded-xl"
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export function WatermarkTool() {
  return (
    <ErrorBoundary>
      <WatermarkToolInner />
    </ErrorBoundary>
  )
}
