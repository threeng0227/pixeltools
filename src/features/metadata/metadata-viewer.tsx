'use client'

import { useState, useCallback } from 'react'
import { ImageDropzone } from '@/components/shared/image-dropzone'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { formatBytes } from '@/lib/image-utils'
import { MAX_FILE_SIZE } from '@/constants/site'
import { X, FileImage, Ruler, Palette, Clock, HardDrive } from 'lucide-react'

interface ImageMeta {
  name: string
  size: number
  type: string
  lastModified: number
  width: number
  height: number
  colorDepth: number
}

export function MetadataViewer() {
  const [meta, setMeta] = useState<ImageMeta | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleFile = useCallback((file: File) => {
    const url = URL.createObjectURL(file)
    const img = new Image()
    img.onload = () => {
      setMeta({
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        width: img.naturalWidth,
        height: img.naturalHeight,
        colorDepth: window.screen.colorDepth,
      })
      setPreview(url)
    }
    img.src = url
  }, [])

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview)
    setMeta(null)
    setPreview(null)
  }

  const rows = meta
    ? [
        { icon: FileImage, label: 'File Name', value: meta.name },
        { icon: HardDrive, label: 'File Size', value: formatBytes(meta.size) },
        {
          icon: Ruler,
          label: 'Dimensions',
          value: `${meta.width} × ${meta.height} px`,
          badge: `${(meta.width * meta.height / 1_000_000).toFixed(1)} MP`,
        },
        { icon: FileImage, label: 'Format', value: meta.type.replace('image/', '').toUpperCase() },
        { icon: Palette, label: 'Color Depth', value: `${meta.colorDepth}-bit` },
        {
          icon: Clock,
          label: 'Last Modified',
          value: new Date(meta.lastModified).toLocaleString(),
        },
      ]
    : []

  return (
    <div className="space-y-8">
      {!meta ? (
        <ImageDropzone onFileAccepted={handleFile} maxSize={MAX_FILE_SIZE} />
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground font-medium">{meta.name}</p>
            <Button variant="ghost" size="sm" onClick={reset}>
              <X className="h-4 w-4 mr-1" aria-hidden="true" /> Remove
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {preview && (
              <div className="space-y-3">
                <p className="text-sm font-medium">Preview</p>
                <img
                  src={preview}
                  alt={`Preview of ${meta.name}`}
                  className="w-full rounded-2xl border border-border object-contain max-h-80 bg-muted/20"
                />
              </div>
            )}
            <div className="space-y-3">
              <p className="text-sm font-medium">Image Details</p>
              <dl className="rounded-2xl border border-border overflow-hidden divide-y divide-border">
                {rows.map(({ icon: Icon, label, value, badge }) => (
                  <div key={label} className="flex items-center gap-3 px-4 py-3">
                    <Icon className="h-4 w-4 text-muted-foreground shrink-0" aria-hidden="true" />
                    <dt className="text-sm text-muted-foreground w-28 shrink-0">{label}</dt>
                    <dd className="text-sm font-medium flex items-center gap-2 min-w-0 truncate">
                      {value}
                      {badge && <Badge variant="secondary" className="text-xs">{badge}</Badge>}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
