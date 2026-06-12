import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { ToolLayout } from '@/components/shared/tool-layout'
import { FAQSection } from '@/components/shared/faq-section'
import { AdInContent } from '@/components/ads/AdInContent'
import { ToolSkeleton } from '@/components/shared/tool-skeleton'
import { JsonLd } from '@/components/shared/json-ld'
import { faqSchema, breadcrumbSchema } from '@/lib/structured-data'
import { SITE_URL } from '@/constants/site'

const FlipTool = dynamic(
  () => import('@/features/flip/flip-tool').then((m) => m.FlipTool),
  { loading: () => <ToolSkeleton /> },
)

export const metadata: Metadata = {
  title: 'Flip Image Online — Mirror Photo Horizontally or Vertically',
  description: 'Flip images horizontally, vertically or both online for free. Fast browser-based image mirror tool.',
  keywords: ['flip image online', 'mirror image', 'flip photo horizontally', 'flip image vertically'],
  alternates: { canonical: `${SITE_URL}/flip-image` },
  openGraph: { images: [{ url: '/og-image.png', width: 1200, height: 630 }] },
}

const FAQS = [
  { question: 'What is the difference between horizontal and vertical flip?', answer: 'Horizontal flip mirrors the image left-to-right (like a mirror). Vertical flip mirrors the image top-to-bottom (upside down).' },
  { question: 'Can I flip both directions at once?', answer: 'Yes, the "Both" option applies horizontal and vertical flipping simultaneously.' },
]

export default function FlipPage() {
  return (
    <ToolLayout
      title="Flip Image"
      description="Mirror images horizontally, vertically, or both directions at once. Instant browser-based processing."
      currentToolId="flip"
    >
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'Flip Image', url: `${SITE_URL}/flip-image` }])} />
      <AdInContent />
      <FlipTool />
      <FAQSection faqs={FAQS} />
    </ToolLayout>
  )
}
