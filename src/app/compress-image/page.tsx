import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ToolLayout } from '@/components/shared/tool-layout'
import { FAQSection } from '@/components/shared/faq-section'
import { HowToSteps } from '@/components/shared/how-to-steps'
import { AdInContent } from '@/components/ads/AdInContent'
import { ToolSkeleton } from '@/components/shared/tool-skeleton'
import { JsonLd } from '@/components/shared/json-ld'
import { faqSchema, breadcrumbSchema, toolSchema, howToSchema } from '@/lib/structured-data'
import { SITE_URL } from '@/constants/site'

const CompressTool = dynamic(
  () => import('@/features/compress/compress-tool').then((m) => m.CompressTool),
  { loading: () => <ToolSkeleton /> },
)

export const metadata: Metadata = {
  title: 'Compress Image Online Free — Reduce JPG, PNG & WebP File Size',
  description: 'Compress images online for free without losing quality. Reduce JPG, PNG and WebP file size up to 90% instantly in your browser. No upload, no account needed.',
  keywords: ['compress image online free', 'image compressor', 'reduce image size', 'jpg compressor', 'png compressor', 'nén ảnh online', 'giảm dung lượng ảnh'],
  alternates: { canonical: `${SITE_URL}/compress-image` },
  openGraph: {
    title: 'Compress Image Online Free — Reduce JPG, PNG & WebP File Size',
    description: 'Compress images online for free without losing quality. Reduce file size up to 90% instantly.',
    url: `${SITE_URL}/compress-image`,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

const STEPS = [
  { title: 'Upload your image', description: 'Click the upload area or drag and drop your JPG, PNG, WebP, GIF or BMP file. Images up to 50 MB are supported.' },
  { title: 'Choose a compression preset', description: 'Select Low, Medium, High, or Maximum preset. "High" gives the best balance — typically 50–70% smaller with near-identical visual quality.' },
  { title: 'Adjust quality (optional)', description: 'Use the quality slider to fine-tune compression between 1% and 99%. Higher values preserve more detail; lower values create smaller files.' },
  { title: 'Click "Compress Image"', description: 'Processing takes less than 2 seconds in your browser. You\'ll see the original and compressed sizes side by side with a savings percentage.' },
  { title: 'Download your compressed file', description: 'Click Download to save the compressed image. Your original file is never uploaded — everything stays on your device.' },
]

const FAQS = [
  {
    question: 'How do I compress an image without losing quality?',
    answer: 'Use the "High" or "Maximum" preset in our compress image tool. These settings reduce file size by 40–70% while keeping visual quality nearly identical. The difference is undetectable to the human eye in most cases.',
  },
  {
    question: 'What is the best format for compressed images?',
    answer: 'WebP is the best format for compressed images — it delivers 25–35% smaller files than JPEG at the same quality. Use our Convert Image tool to switch to WebP after compressing.',
  },
  {
    question: 'How much can I reduce image file size?',
    answer: 'Typical compression results: JPG files shrink by 40–80%, PNG files by 20–60%, and WebP by 30–70%. Results vary depending on image content — photos compress more than flat graphics.',
  },
  {
    question: 'Is there a limit on how many images I can compress?',
    answer: 'No limits. Compress as many images as you need, completely free. Process one at a time using the tool above.',
  },
  {
    question: 'Are my images sent to a server when compressing?',
    answer: 'Never. All compression happens locally in your browser using the JavaScript Canvas API. Your images are never uploaded, stored, or shared with any server.',
  },
]

export default function CompressPage() {
  const pageUrl = `${SITE_URL}/compress-image`
  return (
    <ToolLayout
      title="Compress Image Online Free"
      description="Reduce image file size by up to 90% without losing quality. Choose a preset or adjust quality manually — all processing happens in your browser, nothing is uploaded."
      currentToolId="compress"
    >
      <JsonLd id="compress-tool" data={toolSchema({ name: 'PixelTools — Compress Image Online', description: 'Free online image compressor. Reduce JPG, PNG and WebP file size without losing quality. Browser-based, no upload.', url: pageUrl })} />
      <JsonLd id="compress-howto" data={howToSchema({ name: 'How to Compress an Image Online for Free', description: 'Reduce image file size using PixelTools free online image compressor.', steps: STEPS.map(s => ({ name: s.title, text: s.description })) })} />
      <JsonLd id="compress-faq" data={faqSchema(FAQS)} />
      <JsonLd id="compress-breadcrumb" data={breadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'Compress Image', url: pageUrl }])} />

      <AdInContent />
      <CompressTool />
      <AdInContent />

      {/* SEO Content */}
      <article className="mt-16 max-w-3xl space-y-10">
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">What Is an Image Compressor?</h2>
          <div className="text-muted-foreground space-y-3 leading-relaxed text-sm">
            <p>
              An image compressor reduces a photo or graphic&apos;s file size by removing redundant
              pixel data that the human eye doesn&apos;t detect. When you <strong>compress an image online</strong>,
              you make it load faster on websites, easier to share via email, and lighter to store
              — all without visible quality loss at normal viewing sizes.
            </p>
            <p>
              PixelTools uses <strong>lossy compression</strong> via the Canvas API, the same
              technology behind native browser rendering. This means compression runs entirely in
              your browser — fast, private, and free. No file is ever sent to a server.
            </p>
            <p>
              Typical results with our <strong>free image compressor</strong>: a 4 MB product photo
              compresses to under 500 KB at "High" quality — an 87% reduction with no visible
              difference. Ideal for e-commerce, blogs, and social media.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">How to Compress an Image Online — Step by Step</h2>
          <HowToSteps steps={STEPS} />
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Why Compress Images?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Faster website loading', desc: 'Google ranks fast pages higher. Smaller images directly improve Core Web Vitals (LCP) scores.' },
              { title: 'Lower storage costs', desc: 'Compressed images use less disk space on your device, CDN, and cloud storage.' },
              { title: 'Faster email attachments', desc: 'Compressed files send and receive faster. Most email providers have attachment size limits.' },
              { title: 'Better user experience', desc: 'Pages with optimized images load faster on mobile connections, reducing bounce rates.' },
            ].map(({ title, desc }) => (
              <div key={title} className="p-4 rounded-xl border border-border bg-muted/20">
                <h3 className="font-semibold text-sm mb-1">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-3">Related Tools</h2>
          <p className="text-sm text-muted-foreground mb-4">
            After compressing, you may want to further optimize your image:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Convert to WebP', href: '/convert-image' },
              { label: 'Resize Image', href: '/resize-image' },
              { label: 'Crop Image', href: '/crop-image' },
              { label: 'Add Watermark', href: '/watermark-image' },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="text-sm px-4 py-1.5 rounded-full border border-border hover:border-primary/50 hover:text-primary transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </section>
      </article>

      <FAQSection faqs={FAQS} title="Compress Image — FAQ" />
    </ToolLayout>
  )
}
