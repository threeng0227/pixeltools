import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { ToolLayout } from '@/components/shared/tool-layout'
import { FAQSection } from '@/components/shared/faq-section'
import { AdInContent } from '@/components/ads/AdInContent'
import { ToolSkeleton } from '@/components/shared/tool-skeleton'
import { JsonLd } from '@/components/shared/json-ld'
import { faqSchema, breadcrumbSchema } from '@/lib/structured-data'
import { SITE_URL } from '@/constants/site'

const ConvertTool = dynamic(
  () => import('@/features/convert/convert-tool').then((m) => m.ConvertTool),
  { loading: () => <ToolSkeleton /> },
)

export const metadata: Metadata = {
  title: 'Convert Image Format Online — JPG PNG WebP Converter',
  description: 'Convert images between JPG, PNG, and WebP formats online for free. Fast, private, no upload required.',
  keywords: ['image converter', 'convert jpg to png', 'convert to webp', 'png to jpg online', 'image format converter'],
  alternates: { canonical: `${SITE_URL}/convert-image` },
  openGraph: { images: [{ url: '/og-image.png', width: 1200, height: 630 }] },
}

const FAQS = [
  { question: 'What formats can I convert between?', answer: 'You can convert between JPG, PNG, and WebP. Upload any of these formats and download in any target format.' },
  { question: 'Why convert to WebP?', answer: 'WebP offers superior compression compared to JPG and PNG, resulting in smaller file sizes with the same visual quality — ideal for web use.' },
  { question: 'Will PNG transparency be preserved?', answer: 'If you convert PNG to WebP, transparency is preserved. Converting to JPG will fill transparent areas with white.' },
]

export default function ConvertPage() {
  return (
    <ToolLayout
      title="Convert Image"
      description="Convert images between JPG, PNG and WebP formats instantly in your browser. No quality loss, no server upload."
      currentToolId="convert"
    >
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'Convert Image', url: `${SITE_URL}/convert-image` }])} />
      <AdInContent />
      <ConvertTool />
      <AdInContent />
      <FAQSection faqs={FAQS} />
    </ToolLayout>
  )
}
