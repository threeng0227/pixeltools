'use client'

import { Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { downloadBlob } from '@/lib/image-utils'
import { trackDownload } from '@/lib/analytics'

interface DownloadButtonProps {
  blob: Blob
  filename: string
  className?: string
  toolName?: string
}

export function DownloadButton({ blob, filename, className, toolName }: DownloadButtonProps) {
  const handleClick = () => {
    downloadBlob(blob, filename)
    const ext = filename.split('.').pop() ?? 'unknown'
    trackDownload(toolName ?? 'unknown', ext)
  }

  return (
    <Button onClick={handleClick} className={className} size="lg">
      <Download className="mr-2 h-4 w-4" aria-hidden="true" />
      Download
    </Button>
  )
}
