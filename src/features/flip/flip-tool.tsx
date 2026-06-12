'use client'

import { ErrorBoundary } from '@/components/shared/error-boundary'
import { ImageDropzone } from '@/components/shared/image-dropzone'
import { DownloadButton } from '@/components/shared/download-button'
import { Button } from '@/components/ui/button'
import { flipImage } from '@/lib/image-utils'
import { useImageProcessor } from '@/hooks/use-image-processor'
import { Loader2, X, FlipHorizontal, FlipVertical } from 'lucide-react'

const DIRECTIONS: { label: string; horizontal: boolean; vertical: boolean; icon: React.ReactNode }[] = [
  { label: 'Horizontal', horizontal: true, vertical: false, icon: <FlipHorizontal className="h-4 w-4 mr-2" aria-hidden="true" /> },
  { label: 'Vertical', horizontal: false, vertical: true, icon: <FlipVertical className="h-4 w-4 mr-2" aria-hidden="true" /> },
  { label: 'Both', horizontal: true, vertical: true, icon: null },
]

function FlipToolInner() {
  const { source, result, processing, error, loadFile, run, reset } = useImageProcessor()

  const handleFlip = (h: boolean, v: boolean) =>
    run(() => flipImage(source!.file, h, v))

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

          <div className="rounded-2xl border border-border p-6 space-y-4">
            <fieldset>
              <legend className="text-sm font-medium mb-3">Flip Direction</legend>
              <div className="flex flex-wrap gap-3">
                {DIRECTIONS.map(({ label, horizontal, vertical, icon }) => (
                  <Button
                    key={label}
                    variant="outline"
                    className="rounded-xl flex-1 min-w-30 h-11"
                    onClick={() => handleFlip(horizontal, vertical)}
                    disabled={processing}
                    aria-label={`Flip ${label}`}
                  >
                    {processing
                      ? <Loader2 className="h-4 w-4 animate-spin mr-2" aria-hidden="true" />
                      : icon}
                    {label}
                  </Button>
                ))}
              </div>
            </fieldset>
          </div>

          {error && <p className="text-sm text-destructive" role="alert">{error}</p>}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="text-sm font-medium">Original</p>
              <img
                src={source.preview}
                alt={`Original: ${source.file.name}`}
                className="w-full rounded-2xl border border-border object-contain max-h-80 bg-muted/20"
                loading="lazy"
              />
            </div>
            {result && (
              <div className="space-y-3">
                <p className="text-sm font-medium">Flipped</p>
                <img
                  src={result.preview}
                  alt={`Flipped version of ${source.file.name}`}
                  className="w-full rounded-2xl border border-border object-contain max-h-80 bg-muted/20"
                  loading="lazy"
                />
                <DownloadButton
                  blob={result.blob}
                  filename={`flipped-${source.file.name}`}
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

export function FlipTool() {
  return (
    <ErrorBoundary>
      <FlipToolInner />
    </ErrorBoundary>
  )
}
