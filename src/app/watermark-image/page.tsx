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

const WatermarkTool = dynamic(
  () => import('@/features/watermark/watermark-tool').then((m) => m.WatermarkTool),
  { loading: () => <ToolSkeleton /> },
)

export const metadata: Metadata = {
  title: 'Add Watermark to Image Online Free — Custom Text Watermark Tool',
  description: 'Add text watermarks to images online for free. Customize font size, opacity, color and position with a live preview. 100% browser-based, no upload required.',
  keywords: ['add watermark to image online', 'image watermark tool', 'text watermark photo free', 'watermark image online', 'thêm watermark vào ảnh', 'đóng dấu ảnh online'],
  alternates: { canonical: `${SITE_URL}/watermark-image` },
  openGraph: {
    title: 'Add Watermark to Image Online Free — Custom Text Watermark Tool',
    description: 'Add custom text watermarks to images online for free. Live preview, 9 positions, no upload.',
    url: `${SITE_URL}/watermark-image`,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

const STEPS = [
  { title: 'Upload your image', description: 'Drop your image or click to browse. JPG, PNG, and WebP files up to 50 MB are supported.' },
  { title: 'Enter your watermark text', description: 'Type your name, brand, copyright notice (e.g. "© YourBrand 2025"), or any custom text in the Watermark Text field.' },
  { title: 'Customize the appearance', description: 'Adjust font size (12–120px), opacity (5–100%), and color using the controls. Use the color picker to match your brand colors.' },
  { title: 'Choose watermark position', description: 'Select from 9 positions: corners, edge midpoints, or center. The live canvas preview updates in real time as you change settings.' },
  { title: 'Apply and download', description: 'Click "Apply Watermark" then Download to save your watermarked image. Nothing is uploaded — all processing is in-browser.' },
]

const FAQS = [
  {
    question: 'How do I add a watermark to a photo online for free?',
    answer: 'Upload your photo, type your watermark text, customize the size/opacity/color/position using the controls, then click "Apply Watermark" and download. The whole process takes under 30 seconds.',
  },
  {
    question: 'Can I add a copyright watermark to my photos?',
    answer: 'Yes. Type "© YourName 2025" or similar copyright text in the watermark field. Adjust the position to bottom-right (the most common placement for copyright notices) and set opacity to about 60–70% for a professional look.',
  },
  {
    question: 'What positions can I place the watermark?',
    answer: 'PixelTools supports 9 watermark positions: Top Left, Top Center, Top Right, Center Left, Center, Center Right, Bottom Left, Bottom Center, and Bottom Right.',
  },
  {
    question: 'How do I make a watermark semi-transparent?',
    answer: 'Use the Opacity slider. A setting of 40–60% creates a professional semi-transparent watermark that is readable but does not obscure the image content.',
  },
  {
    question: 'Will the watermark be permanently embedded?',
    answer: 'Yes. Once you click "Apply Watermark" and download, the watermark is baked into the image pixels. The original file is untouched — only the downloaded copy has the watermark.',
  },
]

export default function WatermarkPage() {
  const pageUrl = `${SITE_URL}/watermark-image`
  return (
    <ToolLayout
      title="Add Watermark to Image Online Free"
      description="Protect your photos with a custom text watermark. Choose font size, opacity, color and one of 9 positions. Live preview updates instantly — no upload needed."
      currentToolId="watermark"
    >
      <JsonLd id="watermark-tool" data={toolSchema({ name: 'PixelTools — Add Watermark to Image Online', description: 'Free online watermark tool. Add custom text watermarks to images with live preview. Browser-based, no upload.', url: pageUrl })} />
      <JsonLd id="watermark-howto" data={howToSchema({ name: 'How to Add a Watermark to an Image Online for Free', description: 'Add text watermarks to photos using PixelTools free online watermark tool.', steps: STEPS.map(s => ({ name: s.title, text: s.description })) })} />
      <JsonLd id="watermark-faq" data={faqSchema(FAQS)} />
      <JsonLd id="watermark-breadcrumb" data={breadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'Watermark Image', url: pageUrl }])} />

      <AdInContent />
      <WatermarkTool />
      <AdInContent />

      <article className="mt-16 max-w-3xl space-y-10">
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Why Add a Watermark to Your Images?</h2>
          <div className="text-muted-foreground space-y-3 leading-relaxed text-sm">
            <p>
              A watermark is a text or logo overlay embedded into an image to identify its owner
              or source. When you <strong>add a watermark to images online</strong>, you protect
              your creative work from unauthorized use and establish brand presence across shared
              content.
            </p>
            <p>
              Photographers, designers, content creators, and e-commerce sellers use watermarks
              to prevent image theft, attribute photos on social media, and mark previews before
              delivering final files to clients. A well-placed watermark is subtle enough not to
              distract from the photo while still clearly identifying ownership.
            </p>
            <p>
              PixelTools&apos; <strong>free watermark tool</strong> renders watermarks using the
              browser Canvas API with a live preview — so you see exactly how the final image
              will look before downloading. No server processes your image at any point.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">How to Add a Watermark — Step by Step</h2>
          <HowToSteps steps={STEPS} />
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Watermark Best Practices</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Use 40–60% opacity', desc: 'Semi-transparent watermarks look professional and don\'t obscure the image subject. Full opacity feels heavy.' },
              { title: 'Bottom-right for copyright', desc: 'The bottom-right corner is the standard placement for copyright notices — subtle but visible.' },
              { title: 'Match font color to image', desc: 'Use white text on dark images and dark/grey text on light images for maximum readability.' },
              { title: 'Keep text concise', desc: 'Short watermarks like "© Brand 2025" or "@handle" are more effective than long sentences.' },
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
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Compress Image', href: '/compress-image' },
              { label: 'Resize Image', href: '/resize-image' },
              { label: 'Crop Image', href: '/crop-image' },
              { label: 'Convert Image', href: '/convert-image' },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="text-sm px-4 py-1.5 rounded-full border border-border hover:border-primary/50 hover:text-primary transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </section>
      </article>

      <FAQSection faqs={FAQS} title="Watermark Image — FAQ" />
    </ToolLayout>
  )
}
