'use client'

import { ErrorBoundary } from '@/components/shared/error-boundary'
import { ImageDropzone } from '@/components/shared/image-dropzone'
import { DownloadButton } from '@/components/shared/download-button'
import { Slider } from '@/components/ui/slider'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { compressImage, formatBytes, getSavingsPercent } from '@/lib/image-utils'
import { useImageProcessor } from '@/hooks/use-image-processor'
import { trackToolUsage, GA_EVENTS } from '@/lib/analytics'
import type { CompressionPreset } from '@/types'
import { Loader2, X } from 'lucide-react'
import { useState } from 'react'

const PRESETS: { label: string; value: CompressionPreset; quality: number }[] = [
  { label: 'Low', value: 'low', quality: 30 },
  { label: 'Medium', value: 'medium', quality: 60 },
  { label: 'High', value: 'high', quality: 80 },
  { label: 'Maximum', value: 'maximum', quality: 95 },
]

function CompressToolInner() {
  const { source, result, processing, error, loadFile, run, reset } = useImageProcessor()
  const [preset, setPreset] = useState<CompressionPreset>('high')
  const [quality, setQuality] = useState(80)

  const handleCompress = () => {
    trackToolUsage(GA_EVENTS.COMPRESS_IMAGE)
    run(() => compressImage(source!.file, preset))
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
              <legend className="text-sm font-medium mb-3">Compression Preset</legend>
              <div className="flex gap-2 flex-wrap">
                {PRESETS.map((p) => (
                  <Button
                    key={p.value}
                    variant={preset === p.value ? 'default' : 'outline'}
                    size="sm"
                    className="rounded-xl"
                    onClick={() => { setPreset(p.value); setQuality(p.quality) }}
                    aria-pressed={preset === p.value}
                  >
                    {p.label}
                  </Button>
                ))}
              </div>
            </fieldset>
            <div>
              <div className="flex justify-between mb-3">
                <label id="quality-label" className="text-sm font-medium">Quality</label>
                <span className="text-sm text-muted-foreground" aria-live="polite">{quality}%</span>
              </div>
              <Slider
                value={[quality]}
                onValueChange={(v) => { const n = (v as number[])[0]; if (n !== undefined) setQuality(n) }}
                min={1} max={99} step={1}
                aria-labelledby="quality-label"
                aria-valuenow={quality}
                aria-valuemin={1}
                aria-valuemax={99}
              />
            </div>
            <Button onClick={handleCompress} disabled={processing} className="w-full rounded-xl h-11">
              {processing ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> Compressing…</>
              ) : 'Compress Image'}
            </Button>
          </div>

          {error && (
            <p className="text-sm text-destructive" role="alert">{error}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium">Original</p>
                <Badge variant="secondary">{formatBytes(source.file.size)}</Badge>
              </div>
              <img
                src={source.preview}
                alt={`Original: ${source.file.name}`}
                className="w-full rounded-2xl border border-border object-contain max-h-80 bg-muted/20"
                loading="lazy"
              />
            </div>
            {result && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">Compressed</p>
                  <div className="flex gap-2">
                    <Badge variant="secondary">{formatBytes(result.blob.size)}</Badge>
                    <Badge className="bg-emerald-500 text-white">
                      -{getSavingsPercent(source.file.size, result.blob.size)}%
                    </Badge>
                  </div>
                </div>
                <img
                  src={result.preview}
                  alt={`Compressed version of ${source.file.name}`}
                  className="w-full rounded-2xl border border-border object-contain max-h-80 bg-muted/20"
                  loading="lazy"
                />
                <DownloadButton
                  blob={result.blob}
                  filename={`compressed-${source.file.name}`}
                  toolName="compress"
                  className="w-full rounded-xl"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function CompressTool() {
  return (
    <ErrorBoundary>
      <CompressToolInner />
    </ErrorBoundary>
  )
}
