import type { Metadata } from 'next'
import { ToolLayout } from '@/components/shared/tool-layout'
import { MetadataViewer } from '@/features/metadata/metadata-viewer'
import { FAQSection } from '@/components/shared/faq-section'

export const metadata: Metadata = {
  title: 'Image Metadata Viewer — View EXIF & File Info',
  description: 'View image metadata including file name, size, dimensions, format and color depth. 100% browser-based, no upload required.',
  keywords: ['image metadata viewer', 'exif viewer', 'image info', 'photo details', 'image dimensions'],
}

const FAQS = [
  { question: 'What metadata can I view?', answer: 'You can view file name, file size, pixel dimensions, megapixels, image format (JPG, PNG, WebP), color depth, and last modified date.' },
  { question: 'Is EXIF data shown?', answer: 'Basic file metadata is shown. Full EXIF data (GPS, camera model, etc.) requires a dedicated EXIF reader not currently supported.' },
  { question: 'Is my image uploaded anywhere?', answer: 'No. All metadata is read directly from the file in your browser. Nothing is uploaded to any server.' },
]

export default function MetadataViewerPage() {
  return (
    <ToolLayout
      title="Metadata Viewer"
      description="View detailed information about your image including dimensions, file size, format and color depth — all locally in your browser."
      currentToolId="metadata"
    >
      <MetadataViewer />
      <FAQSection faqs={FAQS} />
    </ToolLayout>
  )
}
