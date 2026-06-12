'use client'

import { useState } from 'react'
import { ErrorBoundary } from '@/components/shared/error-boundary'
import { ImageDropzone } from '@/components/shared/image-dropzone'
import { DownloadButton } from '@/components/shared/download-button'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { convertImage, formatBytes } from '@/lib/image-utils'
import { useImageProcessor } from '@/hooks/use-image-processor'
import type { ImageFormat } from '@/types'
import { Loader2, X } from 'lucide-react'

const FORMATS: { label: string; value: ImageFormat }[] = [
  { label: 'JPG', value: 'jpeg' },
  { label: 'PNG', value: 'png' },
  { label: 'WebP', value: 'webp' },
]

function ConvertToolInner() {
  const { source, result, processing, error, loadFile, run, reset } = useImageProcessor()
  const [format, setFormat] = useState<ImageFormat>('jpeg')

  const handleConvert = () =>
    run(() => convertImage(source!.file, format))

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
              <legend className="text-sm font-medium mb-3">Target Format</legend>
              <div className="flex gap-3">
                {FORMATS.map((f) => (
                  <Button
                    key={f.value}
                    variant={format === f.value ? 'default' : 'outline'}
                    size="sm"
                    className="rounded-xl px-5"
                    onClick={() => setFormat(f.value)}
                    aria-pressed={format === f.value}
                  >
                    {f.label}
                  </Button>
                ))}
              </div>
            </fieldset>

            <Button onClick={handleConvert} disabled={processing} className="w-full rounded-xl h-11">
              {processing ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" /> Converting…</>
              ) : `Convert to ${format.toUpperCase()}`}
            </Button>
          </div>

          {error && <p className="text-sm text-destructive" role="alert">{error}</p>}

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
                  <p className="text-sm font-medium">Converted ({format.toUpperCase()})</p>
                  <Badge variant="secondary">{formatBytes(result.blob.size)}</Badge>
                </div>
                <img
                  src={result.preview}
                  alt={`Converted ${format.toUpperCase()} version of ${source.file.name}`}
                  className="w-full rounded-2xl border border-border object-contain max-h-80 bg-muted/20"
                  loading="lazy"
                />
                <DownloadButton
                  blob={result.blob}
                  filename={`converted-${source.file.name.replace(/\.[^.]+$/, '')}.${format === 'jpeg' ? 'jpg' : format}`}
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

export function ConvertTool() {
  return (
    <ErrorBoundary>
      <ConvertToolInner />
    </ErrorBoundary>
  )
}
