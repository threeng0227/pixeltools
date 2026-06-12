import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { ToolLayout } from '@/components/shared/tool-layout'
import { FAQSection } from '@/components/shared/faq-section'
import { AdInContent } from '@/components/ads/AdInContent'
import { ToolSkeleton } from '@/components/shared/tool-skeleton'
import { JsonLd } from '@/components/shared/json-ld'
import { faqSchema, breadcrumbSchema } from '@/lib/structured-data'
import { SITE_URL } from '@/constants/site'

const CropTool = dynamic(
  () => import('@/features/crop/crop-tool').then((m) => m.CropTool),
  { loading: () => <ToolSkeleton /> },
)

export const metadata: Metadata = {
  title: 'Crop Image Online — Free Image Cropper',
  description: 'Crop images online for free. Supports free crop, square, 1:1, 4:3, 16:9 and 9:16 aspect ratios. 100% browser-based.',
  keywords: ['image cropper', 'crop image online', 'crop photo', 'crop to square', 'free image crop'],
  alternates: { canonical: `${SITE_URL}/crop-image` },
  openGraph: { images: [{ url: '/og-image.png', width: 1200, height: 630 }] },
}

const FAQS = [
  { question: 'How do I crop to a specific aspect ratio?', answer: 'Select a preset ratio like 1:1, 4:3, or 16:9 before dragging the crop area. The crop box will be constrained to that ratio.' },
  { question: 'Can I crop freely without a fixed ratio?', answer: 'Yes. Select "Free" in the aspect ratio options to drag any shape crop area.' },
  { question: 'How do I zoom in while cropping?', answer: 'Use the Zoom slider to zoom into the image before adjusting your crop selection.' },
]

export default function CropPage() {
  return (
    <ToolLayout
      title="Crop Image"
      description="Crop images with free or constrained aspect ratios. Choose from presets like 1:1, 4:3, 16:9 or draw a custom crop area."
      currentToolId="crop"
    >
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'Crop Image', url: `${SITE_URL}/crop-image` }])} />
      <AdInContent />
      <CropTool />
      <AdInContent />
      <FAQSection faqs={FAQS} />
    </ToolLayout>
  )
}
