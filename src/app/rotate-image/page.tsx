import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { ToolLayout } from '@/components/shared/tool-layout'
import { FAQSection } from '@/components/shared/faq-section'
import { AdInContent } from '@/components/ads/AdInContent'
import { ToolSkeleton } from '@/components/shared/tool-skeleton'
import { JsonLd } from '@/components/shared/json-ld'
import { faqSchema, breadcrumbSchema } from '@/lib/structured-data'
import { SITE_URL } from '@/constants/site'

const RotateTool = dynamic(
  () => import('@/features/rotate/rotate-tool').then((m) => m.RotateTool),
  { loading: () => <ToolSkeleton /> },
)

export const metadata: Metadata = {
  title: 'Rotate Image Online — Free Photo Rotator',
  description: 'Rotate images online by 90°, 180°, 270° or any custom angle. Free, no upload required, 100% browser-based.',
  keywords: ['rotate image online', 'rotate photo', 'flip image 90 degrees', 'image rotator free'],
  alternates: { canonical: `${SITE_URL}/rotate-image` },
  openGraph: { images: [{ url: '/og-image.png', width: 1200, height: 630 }] },
}

const FAQS = [
  { question: 'Can I rotate by a custom angle?', answer: 'Yes. Enter any angle between -360 and 360 degrees in the custom angle field and click Rotate.' },
  { question: 'What happens to the canvas size when rotating?', answer: 'The canvas automatically resizes to fit the rotated image without cropping.' },
]

export default function RotatePage() {
  return (
    <ToolLayout
      title="Rotate Image"
      description="Rotate images by 90°, 180°, 270° or any custom angle. Canvas resizes automatically to prevent cropping."
      currentToolId="rotate"
    >
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'Rotate Image', url: `${SITE_URL}/rotate-image` }])} />
      <AdInContent />
      <RotateTool />
      <FAQSection faqs={FAQS} />
    </ToolLayout>
  )
}
