import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { ToolLayout } from '@/components/shared/tool-layout'
import { FAQSection } from '@/components/shared/faq-section'
import { AdInContent } from '@/components/ads/AdInContent'
import { ToolSkeleton } from '@/components/shared/tool-skeleton'
import { JsonLd } from '@/components/shared/json-ld'
import { faqSchema, breadcrumbSchema } from '@/lib/structured-data'
import { SITE_URL } from '@/constants/site'

const WatermarkTool = dynamic(
  () => import('@/features/watermark/watermark-tool').then((m) => m.WatermarkTool),
  { loading: () => <ToolSkeleton /> },
)

export const metadata: Metadata = {
  title: 'Add Watermark to Image Online — Free Watermark Tool',
  description: 'Add text watermarks to images online. Customize font size, opacity, position and color. 100% browser-based, no server upload.',
  keywords: ['add watermark online', 'image watermark tool', 'text watermark photo', 'watermark image free'],
  alternates: { canonical: `${SITE_URL}/watermark-image` },
  openGraph: { images: [{ url: '/og-image.png', width: 1200, height: 630 }] },
}

const FAQS = [
  { question: 'Can I change the watermark position?', answer: 'Yes. Choose from 7 positions including corners, centers and edge midpoints.' },
  { question: 'Can I adjust the watermark opacity?', answer: 'Yes. Use the opacity slider to make the watermark more or less transparent.' },
  { question: 'What font is used for watermarks?', answer: 'Watermarks use the Inter font (bold) which renders cleanly at all sizes.' },
]

export default function WatermarkPage() {
  return (
    <ToolLayout
      title="Watermark Image"
      description="Add custom text watermarks to your images. Control font size, opacity, color, and position with a live preview."
      currentToolId="watermark"
    >
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'Watermark Image', url: `${SITE_URL}/watermark-image` }])} />
      <AdInContent />
      <WatermarkTool />
      <FAQSection faqs={FAQS} />
    </ToolLayout>
  )
}
