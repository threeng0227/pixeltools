'use client'

import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from '@/constants/site'

interface ImageDropzoneProps {
  onFileAccepted: (file: File) => void
  accept?: string[]
  maxSize?: number
  className?: string
}

export function ImageDropzone({
  onFileAccepted,
  accept = ACCEPTED_IMAGE_TYPES,
  maxSize = MAX_FILE_SIZE,
  className,
}: ImageDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) onFileAccepted(acceptedFiles[0])
    },
    [onFileAccepted],
  )

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize,
    multiple: false,
  })

  return (
    <div
      {...getRootProps()}
      className={cn(
        'group relative flex flex-col items-center justify-center gap-4 rounded-2xl border-2 border-dashed p-12 text-center transition-all cursor-pointer select-none outline-none',
        isDragActive && !isDragReject
          ? 'border-primary bg-primary/5 scale-[1.01]'
          : isDragReject
          ? 'border-destructive bg-destructive/5'
          : 'border-border hover:border-primary/50 hover:bg-muted/50',
        className,
      )}
    >
      <input {...getInputProps()} aria-label="Upload image" />
      <div className={cn(
        'flex h-16 w-16 items-center justify-center rounded-2xl transition-colors',
        isDragActive ? 'bg-primary/10' : 'bg-muted group-hover:bg-primary/5',
      )}>
        {isDragActive ? (
          <ImageIcon className="h-7 w-7 text-primary" />
        ) : (
          <Upload className="h-7 w-7 text-muted-foreground group-hover:text-primary transition-colors" />
        )}
      </div>
      <div>
        <p className="font-semibold text-base">
          {isDragActive ? 'Drop your image here' : 'Drop image or click to upload'}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          JPG, PNG, WebP, GIF, BMP up to 50MB
        </p>
      </div>
    </div>
  )
}
