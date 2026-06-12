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

const FlipTool = dynamic(
  () => import('@/features/flip/flip-tool').then((m) => m.FlipTool),
  { loading: () => <ToolSkeleton /> },
)

export const metadata: Metadata = {
  title: 'Flip Image Online Free — Mirror Photos Horizontally or Vertically',
  description: 'Flip images online for free. Mirror photos horizontally, vertically, or both directions instantly. Browser-based image flipper, no upload, no account needed.',
  keywords: ['flip image online free', 'mirror image online', 'flip photo horizontally', 'flip image vertically', 'lật ảnh online', 'lật ngược ảnh'],
  alternates: { canonical: `${SITE_URL}/flip-image` },
  openGraph: {
    title: 'Flip Image Online Free — Mirror Photos Horizontally or Vertically',
    description: 'Flip and mirror images online for free. Horizontal, vertical, or both. Browser-based, instant.',
    url: `${SITE_URL}/flip-image`,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

const STEPS = [
  { title: 'Upload your image', description: 'Click the upload area or drag a JPG, PNG, WebP or other image file onto the page. Files up to 50 MB are supported.' },
  { title: 'Choose a flip direction', description: 'Click "Horizontal" to create a left-right mirror image, "Vertical" to flip top-to-bottom, or "Both" to apply both reflections at once.' },
  { title: 'Preview the flipped image', description: 'The flipped result appears alongside the original so you can compare before downloading.' },
  { title: 'Download your image', description: 'Click Download to save the flipped image to your device. Nothing is stored on any server.' },
]

const FAQS = [
  {
    question: 'What does flipping an image horizontally do?',
    answer: 'A horizontal flip creates a mirror image — the left and right sides of the photo are swapped. This is useful for correcting selfie-style photos, creating symmetrical compositions, or producing a reflection effect.',
  },
  {
    question: 'What is the difference between flipping and rotating an image?',
    answer: 'Flipping creates a mirror reflection — the image is reversed along an axis. Rotating turns the image by a specified angle (90°, 180°, etc.) without reversing it. Use the Flip tool for mirroring and the Rotate tool for turning.',
  },
  {
    question: 'Can I flip a PNG without losing transparency?',
    answer: 'Yes. Flipping a PNG preserves all transparent areas. The alpha channel is maintained in the flipped output.',
  },
  {
    question: 'How do I create a mirror image of a photo?',
    answer: 'Upload your photo and click "Horizontal" to create a left-right mirror image. For a top-bottom reflection, click "Vertical". Click "Both" to apply both mirrors simultaneously.',
  },
  {
    question: 'Does flipping reduce image quality?',
    answer: 'No. Flipping is a lossless operation — pixels are repositioned without any compression or quality reduction. The flipped image is identical in quality to the original.',
  },
]

export default function FlipPage() {
  const pageUrl = `${SITE_URL}/flip-image`
  return (
    <ToolLayout
      title="Flip Image Online Free"
      description="Mirror photos horizontally or vertically with one click. Create reflections, fix selfie orientations, or produce symmetrical compositions — all in your browser."
      currentToolId="flip"
    >
      <JsonLd id="flip-tool" data={toolSchema({ name: 'PixelTools — Flip Image Online', description: 'Free online image flipper. Mirror photos horizontally, vertically or both. Browser-based, no upload.', url: pageUrl })} />
      <JsonLd id="flip-howto" data={howToSchema({ name: 'How to Flip an Image Online for Free', description: 'Mirror photos using PixelTools free online image flip tool.', steps: STEPS.map(s => ({ name: s.title, text: s.description })) })} />
      <JsonLd id="flip-faq" data={faqSchema(FAQS)} />
      <JsonLd id="flip-breadcrumb" data={breadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'Flip Image', url: pageUrl }])} />

      <AdInContent />
      <FlipTool />
      <AdInContent />

      <article className="mt-16 max-w-3xl space-y-10">
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Flip vs Mirror — What&apos;s the Difference?</h2>
          <div className="text-muted-foreground space-y-3 leading-relaxed text-sm">
            <p>
              &quot;Flipping&quot; and &quot;mirroring&quot; an image mean the same thing — the image
              is reflected along a horizontal or vertical axis. When you{' '}
              <strong>flip an image online</strong>, you reverse the pixel order along that axis
              so the result looks like a reflection in a mirror.
            </p>
            <p>
              A <strong>horizontal flip</strong> (left-right mirror) is commonly used to correct
              front-facing camera selfies that appear reversed, to create symmetrical product shots,
              or to generate creative reflections. A <strong>vertical flip</strong> (top-bottom
              mirror) creates upside-down reflections, useful for water reflections or artistic effects.
            </p>
            <p>
              Flipping is mathematically lossless — no compression is applied, so the output image
              maintains identical quality to the original.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">How to Flip an Image — Step by Step</h2>
          <HowToSteps steps={STEPS} />
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Rotate Image', href: '/rotate-image' },
              { label: 'Crop Image', href: '/crop-image' },
              { label: 'Resize Image', href: '/resize-image' },
              { label: 'Add Watermark', href: '/watermark-image' },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="text-sm px-4 py-1.5 rounded-full border border-border hover:border-primary/50 hover:text-primary transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </section>
      </article>

      <FAQSection faqs={FAQS} title="Flip Image — FAQ" />
    </ToolLayout>
  )
}
