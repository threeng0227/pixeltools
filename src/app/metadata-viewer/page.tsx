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

const MetadataViewer = dynamic(
  () => import('@/features/metadata/metadata-viewer').then((m) => m.MetadataViewer),
  { loading: () => <ToolSkeleton /> },
)

export const metadata: Metadata = {
  title: 'Image Metadata Viewer Online Free — Check File Size, Dimensions & Format',
  description: 'View image metadata online for free. Check file name, size, dimensions, megapixels, format and color depth instantly in your browser. No upload, completely private.',
  keywords: ['image metadata viewer', 'check image dimensions online', 'view image info online', 'image file size checker', 'xem thông tin ảnh', 'kiểm tra kích thước ảnh'],
  alternates: { canonical: `${SITE_URL}/metadata-viewer` },
  openGraph: {
    title: 'Image Metadata Viewer Online Free — Check File Info Instantly',
    description: 'View image metadata online for free. Check dimensions, file size, format and more. Browser-based.',
    url: `${SITE_URL}/metadata-viewer`,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

const STEPS = [
  { title: 'Upload your image', description: 'Drag and drop or click to upload any image file — JPG, PNG, WebP, GIF, or BMP.' },
  { title: 'View metadata instantly', description: 'File name, size, pixel dimensions, megapixel count, format, color depth, and last modified date are displayed immediately.' },
  { title: 'Use the information', description: 'Copy dimensions for design work, verify file format before uploading to a platform, or check file size before attaching to an email.' },
]

const FAQS = [
  {
    question: 'What metadata can I see with this tool?',
    answer: 'PixelTools Metadata Viewer shows: file name, file size (in KB/MB), pixel dimensions (width × height), megapixel count, image format (JPG, PNG, WebP, etc.), color depth (bits per pixel), and last modified date.',
  },
  {
    question: 'Is this tool the same as viewing EXIF data?',
    answer: 'This tool reads basic file metadata available through the browser — dimensions, file size, format, and modification date. Full EXIF data (GPS coordinates, camera model, shutter speed, ISO) requires a dedicated EXIF reader as browsers restrict raw EXIF access for privacy.',
  },
  {
    question: 'How do I check the dimensions of an image?',
    answer: 'Upload your image to the Metadata Viewer. The width and height in pixels are displayed instantly under "Dimensions". You also see megapixel count for camera images.',
  },
  {
    question: 'Are my images uploaded when checking metadata?',
    answer: 'Never. The browser reads the file directly from your device using JavaScript APIs. No data is transmitted to any server. Your images remain completely private.',
  },
  {
    question: 'What is color depth in image metadata?',
    answer: 'Color depth (bits per pixel) indicates how many colors a pixel can represent. Standard photos have 24-bit depth (16 million colors). PNG files with transparency have 32-bit depth. Higher depth means richer color reproduction.',
  },
]

export default function MetadataViewerPage() {
  const pageUrl = `${SITE_URL}/metadata-viewer`
  return (
    <ToolLayout
      title="Image Metadata Viewer Online Free"
      description="Instantly check file name, size, pixel dimensions, megapixels, format, color depth and last modified date for any image — all in your browser, nothing uploaded."
      currentToolId="metadata"
    >
      <JsonLd id="metadata-tool" data={toolSchema({ name: 'PixelTools — Image Metadata Viewer Online', description: 'Free online image metadata viewer. Check file size, dimensions, format and color depth instantly. Browser-based, no upload.', url: pageUrl })} />
      <JsonLd id="metadata-howto" data={howToSchema({ name: 'How to View Image Metadata Online for Free', description: 'Check image file information using PixelTools free online metadata viewer.', steps: STEPS.map(s => ({ name: s.title, text: s.description })) })} />
      <JsonLd id="metadata-faq" data={faqSchema(FAQS)} />
      <JsonLd id="metadata-breadcrumb" data={breadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'Metadata Viewer', url: pageUrl }])} />

      <AdInContent />
      <MetadataViewer />
      <AdInContent />

      <article className="mt-16 max-w-3xl space-y-10">
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">What Is Image Metadata?</h2>
          <div className="text-muted-foreground space-y-3 leading-relaxed text-sm">
            <p>
              Image metadata is data about a file that describes its properties. When you{' '}
              <strong>view image metadata online</strong>, you can read details like dimensions,
              file size, format type, and modification date without opening a dedicated image editor.
            </p>
            <p>
              Metadata is essential for web developers checking image dimensions before coding
              CSS, photographers verifying camera output, e-commerce sellers confirming product
              image specs before uploading, and designers checking resolution before print.
            </p>
            <p>
              PixelTools reads metadata directly from your file in the browser using JavaScript —
              no server, no upload, no privacy risk. Results are available instantly.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">How to View Image Metadata — Step by Step</h2>
          <HowToSteps steps={STEPS} />
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">What Each Metadata Field Means</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Dimensions (W × H px)', desc: 'The width and height of the image in pixels. Essential for checking platform upload requirements.' },
              { title: 'File Size', desc: 'How many kilobytes or megabytes the file occupies. Use this to check if compression is needed.' },
              { title: 'Format', desc: 'The image type: JPG, PNG, WebP, GIF, or BMP. Determines compatibility and compression type.' },
              { title: 'Megapixels', desc: 'Width × Height ÷ 1,000,000. Higher MP means more detail — relevant for printing at large sizes.' },
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
              { label: 'Convert Image', href: '/convert-image' },
              { label: 'Crop Image', href: '/crop-image' },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="text-sm px-4 py-1.5 rounded-full border border-border hover:border-primary/50 hover:text-primary transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </section>
      </article>

      <FAQSection faqs={FAQS} title="Metadata Viewer — FAQ" />
    </ToolLayout>
  )
}
