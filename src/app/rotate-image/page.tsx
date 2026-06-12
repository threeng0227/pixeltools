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

const RotateTool = dynamic(
  () => import('@/features/rotate/rotate-tool').then((m) => m.RotateTool),
  { loading: () => <ToolSkeleton /> },
)

export const metadata: Metadata = {
  title: 'Rotate Image Online Free — Turn Photos 90°, 180°, 270° or Custom Angle',
  description: 'Rotate images online for free. Turn photos 90°, 180°, 270° clockwise or any custom angle. Browser-based, instant, no account required.',
  keywords: ['rotate image online free', 'rotate photo online', 'turn image 90 degrees', 'rotate image 180', 'xoay ảnh online', 'xoay hình ảnh'],
  alternates: { canonical: `${SITE_URL}/rotate-image` },
  openGraph: {
    title: 'Rotate Image Online Free — 90°, 180°, 270° or Custom Angle',
    description: 'Rotate images online for free. Turn photos to any angle instantly in your browser.',
    url: `${SITE_URL}/rotate-image`,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

const STEPS = [
  { title: 'Upload your image', description: 'Drag and drop or click to upload a JPG, PNG, WebP, or other image file up to 50 MB.' },
  { title: 'Choose a quick rotation', description: 'Click one of the quick-rotate buttons: 90° CW, 180°, 270° CW, or 90° CCW for instant one-click rotation.' },
  { title: 'Or enter a custom angle', description: 'Type any angle from -360° to 360° in the custom angle field. Negative values rotate counter-clockwise, positive values rotate clockwise.' },
  { title: 'Click "Rotate"', description: 'The rotation is applied instantly in your browser. A preview of the rotated image is shown below the controls.' },
  { title: 'Download the rotated image', description: 'Click Download to save your rotated photo. No files are uploaded to any server.' },
]

const FAQS = [
  {
    question: 'How do I rotate an image 90 degrees online?',
    answer: 'Upload your image, then click the "90° CW" button for a clockwise 90-degree rotation, or "90° CCW" for counter-clockwise. The result appears instantly. Click Download to save.',
  },
  {
    question: 'Can I rotate an image by a custom angle?',
    answer: 'Yes. Enter any angle between -360° and 360° in the custom angle input field and click Rotate. For example, enter -15 to tilt your image 15 degrees to the left.',
  },
  {
    question: 'Does rotating an image reduce its quality?',
    answer: 'Rotating by exactly 90°, 180°, or 270° does not reduce quality. Custom angles (like 45°) involve pixel interpolation, which may cause slight softening at the edges — this is inherent to all image rotation software.',
  },
  {
    question: 'How do I fix a photo that was taken sideways?',
    answer: 'Upload the sideways photo and click "90° CW" or "90° CCW" depending on which direction it needs to rotate. Most sideways photos from smartphones just need one 90° rotation.',
  },
  {
    question: 'Can I rotate a PNG image without losing transparency?',
    answer: 'Yes. When rotating a PNG, the transparent background is preserved. The output maintains the original alpha channel.',
  },
]

export default function RotatePage() {
  const pageUrl = `${SITE_URL}/rotate-image`
  return (
    <ToolLayout
      title="Rotate Image Online Free"
      description="Rotate photos 90°, 180°, 270° or any custom angle. Fix sideways smartphone photos or create artistic tilts — all in your browser, instantly."
      currentToolId="rotate"
    >
      <JsonLd id="rotate-tool" data={toolSchema({ name: 'PixelTools — Rotate Image Online', description: 'Free online image rotator. Rotate photos 90, 180, 270 degrees or any custom angle. Browser-based, no upload.', url: pageUrl })} />
      <JsonLd id="rotate-howto" data={howToSchema({ name: 'How to Rotate an Image Online for Free', description: 'Rotate photos using PixelTools free online image rotation tool.', steps: STEPS.map(s => ({ name: s.title, text: s.description })) })} />
      <JsonLd id="rotate-faq" data={faqSchema(FAQS)} />
      <JsonLd id="rotate-breadcrumb" data={breadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'Rotate Image', url: pageUrl }])} />

      <AdInContent />
      <RotateTool />
      <AdInContent />

      <article className="mt-16 max-w-3xl space-y-10">
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Why Rotate Images Online?</h2>
          <div className="text-muted-foreground space-y-3 leading-relaxed text-sm">
            <p>
              The most common reason to <strong>rotate images online</strong> is to fix photos
              taken sideways or upside down on a smartphone or camera. When a device&apos;s
              orientation sensor misreads the position, photos can appear rotated when viewed
              on a computer. A quick 90° rotation fixes this in seconds.
            </p>
            <p>
              Beyond corrections, rotation is also used creatively — tilting a product photo for
              a dynamic layout, rotating a scanned document for alignment, or preparing an image
              for a specific print orientation.
            </p>
            <p>
              PixelTools&apos; <strong>free image rotation tool</strong> supports both standard angles
              (90°, 180°, 270°) with one-click buttons, and any custom degree from -360° to 360°.
              All rotation is performed locally in your browser with no upload.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">How to Rotate an Image — Step by Step</h2>
          <HowToSteps steps={STEPS} />
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Flip Image', href: '/flip-image' },
              { label: 'Crop Image', href: '/crop-image' },
              { label: 'Resize Image', href: '/resize-image' },
              { label: 'Compress Image', href: '/compress-image' },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="text-sm px-4 py-1.5 rounded-full border border-border hover:border-primary/50 hover:text-primary transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </section>
      </article>

      <FAQSection faqs={FAQS} title="Rotate Image — FAQ" />
    </ToolLayout>
  )
}
