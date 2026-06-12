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

const ResizeTool = dynamic(
  () => import('@/features/resize/resize-tool').then((m) => m.ResizeTool),
  { loading: () => <ToolSkeleton /> },
)

export const metadata: Metadata = {
  title: 'Resize Image Online Free — Change Photo Dimensions Without Quality Loss',
  description: 'Resize images online for free. Change photo width and height, lock aspect ratio, use social media presets for Instagram, Facebook & YouTube. No upload needed.',
  keywords: ['resize image online', 'resize photo online free', 'change image dimensions', 'resize image without quality loss', 'resize ảnh online', 'thay đổi kích thước ảnh'],
  alternates: { canonical: `${SITE_URL}/resize-image` },
  openGraph: {
    title: 'Resize Image Online Free — Change Photo Dimensions Without Quality Loss',
    description: 'Resize images online for free. Change dimensions, lock aspect ratio, use social media presets.',
    url: `${SITE_URL}/resize-image`,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

const STEPS = [
  { title: 'Upload your image', description: 'Drag and drop or click to upload your image. JPG, PNG, WebP, GIF and BMP files up to 50 MB are supported.' },
  { title: 'Enter target dimensions', description: 'Type the desired width and height in pixels. The aspect ratio lock (chain icon) keeps proportions correct by default.' },
  { title: 'Or pick a social media preset', description: 'Choose from Instagram (1080×1080), Facebook (1200×628), Twitter/X (1200×675) or YouTube (1280×720) presets for instant sizing.' },
  { title: 'Click "Resize Image"', description: 'Your image is resized in-browser in under a second. A preview appears so you can verify the result before downloading.' },
  { title: 'Download the resized photo', description: 'Hit Download to save your resized image. The file is processed locally — nothing is uploaded to any server.' },
]

const FAQS = [
  {
    question: 'How do I resize an image without losing quality?',
    answer: 'To resize an image without quality loss, avoid enlarging beyond the original dimensions — upscaling always reduces sharpness. Downsizing (making smaller) preserves quality very well. Use our resize image tool and keep the aspect ratio locked for best results.',
  },
  {
    question: 'What are the recommended sizes for social media images?',
    answer: 'Common social media image sizes: Instagram square 1080×1080px, Instagram landscape 1080×566px, Facebook shared image 1200×628px, Twitter/X post 1200×675px, YouTube thumbnail 1280×720px. PixelTools includes presets for all of these.',
  },
  {
    question: 'Can I resize an image to exact pixels?',
    answer: 'Yes. Enter your exact pixel width and height in the input fields. Unlock the aspect ratio to set non-proportional dimensions. The tool preserves quality when resizing.',
  },
  {
    question: 'What happens to my image aspect ratio when resizing?',
    answer: 'By default the aspect ratio is locked (the chain icon is closed). This means changing width automatically adjusts height proportionally. Click the chain icon to unlock and set independent dimensions.',
  },
  {
    question: 'Can I resize a PNG image online?',
    answer: 'Yes. PixelTools supports resizing JPG, PNG, WebP, GIF and BMP images. PNG files resize without quality loss and transparency is preserved.',
  },
]

export default function ResizePage() {
  const pageUrl = `${SITE_URL}/resize-image`
  return (
    <ToolLayout
      title="Resize Image Online Free"
      description="Change image dimensions to any pixel size. Lock the aspect ratio to prevent distortion, or use social media presets for Instagram, Facebook, YouTube and more."
      currentToolId="resize"
    >
      <JsonLd id="resize-tool" data={toolSchema({ name: 'PixelTools — Resize Image Online', description: 'Free online image resizer. Change photo dimensions, lock aspect ratio, use social media presets. Browser-based, no upload.', url: pageUrl })} />
      <JsonLd id="resize-howto" data={howToSchema({ name: 'How to Resize an Image Online for Free', description: 'Change image dimensions using PixelTools free online image resizer.', steps: STEPS.map(s => ({ name: s.title, text: s.description })) })} />
      <JsonLd id="resize-faq" data={faqSchema(FAQS)} />
      <JsonLd id="resize-breadcrumb" data={breadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'Resize Image', url: pageUrl }])} />

      <AdInContent />
      <ResizeTool />
      <AdInContent />

      <article className="mt-16 max-w-3xl space-y-10">
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">What Is an Online Image Resizer?</h2>
          <div className="text-muted-foreground space-y-3 leading-relaxed text-sm">
            <p>
              An image resizer lets you change the width and height of a photo or graphic to match
              a specific size requirement. When you <strong>resize images online</strong>, you can
              prepare visuals for social media platforms, websites, print projects, or app interfaces
              — all without installing software.
            </p>
            <p>
              PixelTools&apos; <strong>free image resizer</strong> uses the browser Canvas API to
              scale your image in milliseconds. The aspect ratio lock ensures your photo doesn&apos;t
              get stretched or distorted. Social media presets eliminate guesswork for the most
              common platforms.
            </p>
            <p>
              All resizing happens locally in your browser — your original image is never uploaded
              to a server. This makes it safe for personal photos, confidential documents, and
              sensitive visuals.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">How to Resize an Image — Step by Step</h2>
          <HowToSteps steps={STEPS} />
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Common Use Cases for Resizing Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Social media posts', desc: 'Fit exact platform specs — 1080×1080 for Instagram, 1200×628 for Facebook, 1280×720 for YouTube thumbnails.' },
              { title: 'Website performance', desc: 'Serve correctly sized images to avoid the browser wasting time scaling them. Reduces page weight significantly.' },
              { title: 'Email newsletters', desc: 'Email clients display images at fixed widths. Resize to 600px wide to ensure they render correctly on all clients.' },
              { title: 'Print preparation', desc: 'Resize to exact mm or pixel dimensions before sending to a print service or design tool.' },
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
              { label: 'Crop Image', href: '/crop-image' },
              { label: 'Convert to WebP', href: '/convert-image' },
              { label: 'Add Watermark', href: '/watermark-image' },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="text-sm px-4 py-1.5 rounded-full border border-border hover:border-primary/50 hover:text-primary transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </section>
      </article>

      <FAQSection faqs={FAQS} title="Resize Image — FAQ" />
    </ToolLayout>
  )
}
