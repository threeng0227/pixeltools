import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import { ToolLayout } from '@/components/shared/tool-layout'
import { FAQSection } from '@/components/shared/faq-section'
import { AdInContent } from '@/components/ads/AdInContent'
import { ToolSkeleton } from '@/components/shared/tool-skeleton'
import { JsonLd } from '@/components/shared/json-ld'
import { faqSchema, breadcrumbSchema } from '@/lib/structured-data'
import { SITE_URL } from '@/constants/site'

const CompressTool = dynamic(
  () => import('@/features/compress/compress-tool').then((m) => m.CompressTool),
  { loading: () => <ToolSkeleton /> },
)

export const metadata: Metadata = {
  title: 'Compress Image Online — Free Image Compressor',
  description: 'Compress images online for free. Reduce JPG, PNG and WebP file size without losing quality. 100% browser-based, no upload required.',
  keywords: ['image compressor', 'compress image online', 'reduce image size', 'jpg compressor', 'png compressor'],
  alternates: { canonical: `${SITE_URL}/compress-image` },
  openGraph: { images: [{ url: '/og-image.png', width: 1200, height: 630 }] },
}

const FAQS = [
  { question: 'How does image compression work?', answer: 'Our tool uses advanced algorithms to reduce redundant data in your image while maintaining visual quality. The result is a smaller file with nearly identical appearance.' },
  { question: 'Will compression reduce image quality?', answer: 'It depends on the preset. "High" and "Maximum" presets preserve most quality. "Low" and "Medium" sacrifice some quality for much smaller files.' },
  { question: 'What formats can I compress?', answer: 'You can compress JPG, PNG, WebP, GIF and BMP images.' },
  { question: 'Is there a file size limit?', answer: 'You can compress images up to 50MB.' },
  { question: 'Are my images sent to a server?', answer: 'No. All compression happens locally in your browser using JavaScript. Nothing is uploaded.' },
]

export default function CompressPage() {
  return (
    <ToolLayout
      title="Compress Image"
      description="Reduce image file size while maintaining quality. Choose a preset or adjust quality manually. No upload required — all processing is done in your browser."
      currentToolId="compress"
    >
      <JsonLd data={faqSchema(FAQS)} />
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'Compress Image', url: `${SITE_URL}/compress-image` }])} />
      <AdInContent />
      <CompressTool />
      <AdInContent />
      <FAQSection faqs={FAQS} />
    </ToolLayout>
  )
}
