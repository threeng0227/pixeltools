'use client'

import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { downloadBlob } from '@/lib/image-utils'

interface DownloadButtonProps {
  blob: Blob
  filename: string
  className?: string
}

export function DownloadButton({ blob, filename, className }: DownloadButtonProps) {
  return (
    <Button
      onClick={() => downloadBlob(blob, filename)}
      className={className}
      size="lg"
    >
      <Download className="mr-2 h-4 w-4" />
      Download
    </Button>
  )
}
