import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { ToolLayout } from '@/components/shared/tool-layout'
import { FAQSection } from '@/components/shared/faq-section'
import { AdInContent } from '@/components/ads/AdInContent'
import { ToolSkeleton } from '@/components/shared/tool-skeleton'
import { JsonLd } from '@/components/shared/json-ld'
import { faqSchema, breadcrumbSchema } from '@/lib/structured-data'
import { SITE_URL } from '@/constants/site'

const ResizeTool = dynamic(
  () => import('@/features/resize/resize-tool').then((m) => m.ResizeTool),
  { loading: () => <ToolSkeleton /> },
)

export const metadata: Metadata = {
  title: 'Resize Image Online — Free Image Resizer',
  description: 'Resize images online for free. Change dimensions, use social media presets for Instagram, Facebook, Twitter and YouTube. 100% browser-based.',
  keywords: ['image resizer', 'resize image online', 'change image size', 'instagram image size', 'photo resizer'],
  alternates: { canonical: `${SITE_URL}/resize-image` },
  openGraph: { images: [{ url: '/og-image.png', width: 1200, height: 630 }] },
}

const FAQS = [
  { question: 'Can I resize to exact pixel dimensions?', answer: 'Yes. Enter any width and height values in pixels. You can also lock the aspect ratio so the image scales proportionally.' },
  { question: 'What are the social media presets?', answer: 'We include presets for Instagram (1080×1080), Facebook (1200×628), Twitter/X (1200×675), and YouTube Thumbnail (1280×720).' },
  { question: 'Does resizing reduce image quality?', answer: 'Enlarging images may reduce sharpness. Reducing size generally maintains quality well.' },
  { question: 'What is aspect ratio lock?', answer: 'When locked, changing the width automatically adjusts the height (and vice versa) to maintain the original proportions.' },
]

export default function ResizePage() {
  return (
    <ToolLayout
      title="Resize Image"
      description="Change image dimensions with preset social media sizes or enter custom pixel values. Lock aspect ratio for proportional scaling."
      currentToolId="resize"
    >
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'Resize Image', url: `${SITE_URL}/resize-image` }])} />
      <AdInContent />
      <ResizeTool />
      <AdInContent />
      <FAQSection faqs={FAQS} />
    </ToolLayout>
  )
}
