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

const CropTool = dynamic(
  () => import('@/features/crop/crop-tool').then((m) => m.CropTool),
  { loading: () => <ToolSkeleton /> },
)

export const metadata: Metadata = {
  title: 'Crop Image Online Free — Cut & Trim Photos with Any Aspect Ratio',
  description: 'Crop images online for free. Cut and trim photos with free or fixed aspect ratios (1:1, 4:3, 16:9). Browser-based, no upload required, instant results.',
  keywords: ['crop image online free', 'crop photo online', 'cut image online', 'image cropper', 'cắt ảnh online', 'cắt xén ảnh'],
  alternates: { canonical: `${SITE_URL}/crop-image` },
  openGraph: {
    title: 'Crop Image Online Free — Cut & Trim Photos with Any Aspect Ratio',
    description: 'Crop images online for free with free or fixed aspect ratios. Browser-based, instant results.',
    url: `${SITE_URL}/crop-image`,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

const STEPS = [
  { title: 'Upload your image', description: 'Drop your image onto the upload area or click to browse. JPG, PNG, WebP and other formats up to 50 MB are supported.' },
  { title: 'Select an aspect ratio', description: 'Choose Free (any shape), 1:1 (square), 4:3 (standard), 16:9 (widescreen), or 3:2 (classic photo). The crop box updates automatically.' },
  { title: 'Drag to position the crop area', description: 'Click and drag inside the crop box to reposition it. Use the zoom slider to scale the image within the crop frame.' },
  { title: 'Click "Crop Image"', description: 'The crop is applied instantly in your browser. A preview of the cropped result appears below the editor.' },
  { title: 'Download your cropped photo', description: 'Click Download to save the cropped image to your device. Nothing is uploaded or stored on any server.' },
]

const FAQS = [
  {
    question: 'How do I crop an image to a specific size?',
    answer: 'Select an aspect ratio (e.g. 1:1 for square) and drag the crop box over the area you want to keep. The crop tool maintains your chosen ratio automatically. Then click Crop Image and download the result.',
  },
  {
    question: 'Can I crop an image to a square (1:1)?',
    answer: 'Yes. Select the "1:1" aspect ratio button, drag the square crop box over your subject, and click Crop. This is the perfect setting for Instagram profile photos and product thumbnails.',
  },
  {
    question: 'Does cropping reduce image quality?',
    answer: 'No — cropping only removes pixels from the edges. It does not apply any compression or quality reduction to the remaining pixels. The cropped area maintains its original quality.',
  },
  {
    question: 'What is a 16:9 crop ratio used for?',
    answer: 'The 16:9 ratio is the standard widescreen format used for YouTube thumbnails, desktop wallpapers, presentation slides, and most video content.',
  },
  {
    question: 'Can I crop a PNG without losing transparency?',
    answer: 'Yes. When you crop a PNG, the transparent areas in the cropped region are preserved. The resulting file maintains its alpha channel.',
  },
]

export default function CropPage() {
  const pageUrl = `${SITE_URL}/crop-image`
  return (
    <ToolLayout
      title="Crop Image Online Free"
      description="Cut and trim your photos with free or fixed aspect ratios. Zoom, reposition, and crop with pinpoint accuracy — all in your browser, nothing uploaded."
      currentToolId="crop"
    >
      <JsonLd id="crop-tool" data={toolSchema({ name: 'PixelTools — Crop Image Online', description: 'Free online image cropper. Cut and trim photos with free or fixed aspect ratios. Browser-based, no upload.', url: pageUrl })} />
      <JsonLd id="crop-howto" data={howToSchema({ name: 'How to Crop an Image Online for Free', description: 'Cut and trim photos using PixelTools free online image cropper.', steps: STEPS.map(s => ({ name: s.title, text: s.description })) })} />
      <JsonLd id="crop-faq" data={faqSchema(FAQS)} />
      <JsonLd id="crop-breadcrumb" data={breadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'Crop Image', url: pageUrl }])} />

      <AdInContent />
      <CropTool />
      <AdInContent />

      <article className="mt-16 max-w-3xl space-y-10">
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">What Is an Online Image Cropper?</h2>
          <div className="text-muted-foreground space-y-3 leading-relaxed text-sm">
            <p>
              An image cropper removes unwanted areas from a photo by selecting a rectangular region
              to keep. When you <strong>crop images online</strong>, you can remove distracting
              backgrounds, focus on a subject, or format a photo to meet specific dimension
              requirements — without any software installation.
            </p>
            <p>
              PixelTools&apos; <strong>free crop image tool</strong> lets you choose fixed aspect
              ratios like 1:1, 4:3, 16:9 and 3:2, or crop freely to any shape. An interactive
              canvas lets you drag and zoom the crop box with precision. All processing happens
              in your browser — no files are uploaded.
            </p>
            <p>
              Cropping is non-destructive to pixel quality. The remaining area after a crop retains
              100% of its original sharpness and color depth.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">How to Crop an Image — Step by Step</h2>
          <HowToSteps steps={STEPS} />
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">Popular Crop Ratios & Their Uses</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: '1:1 — Square', desc: 'Instagram feed posts, profile photos, product thumbnails, and app icons.' },
              { title: '16:9 — Widescreen', desc: 'YouTube thumbnails, desktop wallpapers, presentation slides, and video cover images.' },
              { title: '4:3 — Standard', desc: 'Classic photography ratio, blog post images, and presentation backgrounds.' },
              { title: '3:2 — Classic Photo', desc: 'Standard DSLR photo format. Ideal for prints, photo albums, and editorial use.' },
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
              { label: 'Resize Image', href: '/resize-image' },
              { label: 'Compress Image', href: '/compress-image' },
              { label: 'Rotate Image', href: '/rotate-image' },
              { label: 'Convert Image', href: '/convert-image' },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="text-sm px-4 py-1.5 rounded-full border border-border hover:border-primary/50 hover:text-primary transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </section>
      </article>

      <FAQSection faqs={FAQS} title="Crop Image — FAQ" />
    </ToolLayout>
  )
}
