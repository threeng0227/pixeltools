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

const ConvertTool = dynamic(
  () => import('@/features/convert/convert-tool').then((m) => m.ConvertTool),
  { loading: () => <ToolSkeleton /> },
)

export const metadata: Metadata = {
  title: 'Convert Image Online Free — JPG to PNG, PNG to WebP & More',
  description: 'Convert images between JPG, PNG and WebP formats online for free. Fast browser-based image converter with no quality loss. No upload, no account needed.',
  keywords: ['convert image online free', 'jpg to png converter', 'png to webp', 'image format converter', 'chuyển đổi định dạng ảnh', 'chuyển ảnh sang jpg png webp'],
  alternates: { canonical: `${SITE_URL}/convert-image` },
  openGraph: {
    title: 'Convert Image Online Free — JPG to PNG, PNG to WebP & More',
    description: 'Convert images between JPG, PNG and WebP formats online for free. Browser-based, no upload.',
    url: `${SITE_URL}/convert-image`,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

const STEPS = [
  { title: 'Upload your image', description: 'Drag and drop or select a JPG, PNG, or WebP image. Files up to 50 MB are accepted.' },
  { title: 'Select the target format', description: 'Choose JPG, PNG, or WebP as the output format. WebP is recommended for websites — it gives 25–35% smaller files than JPG at the same quality.' },
  { title: 'Click "Convert"', description: 'The conversion runs instantly in your browser. Original and converted previews appear side by side with file sizes shown.' },
  { title: 'Download the converted file', description: 'Click Download to save the converted image. Nothing is uploaded to any server.' },
]

const FAQS = [
  {
    question: 'How do I convert a JPG to PNG online?',
    answer: 'Upload your JPG file, select "PNG" as the target format, click Convert, and download the result. PNG is a lossless format — your converted image will have no quality degradation compared to the original JPG.',
  },
  {
    question: 'What is WebP and why should I use it?',
    answer: 'WebP is a modern image format developed by Google. It provides 25–35% smaller file sizes than JPEG at equivalent visual quality, and supports transparency like PNG. It is supported by all modern browsers and is recommended for website images to improve page speed.',
  },
  {
    question: 'Does converting PNG to JPG reduce quality?',
    answer: 'Converting PNG to JPG applies lossy compression, which slightly reduces quality. However, the difference is usually imperceptible. For images that require transparency, keep them as PNG — JPG does not support transparent backgrounds.',
  },
  {
    question: 'Can I convert JPG to PNG without losing quality?',
    answer: 'Yes. PNG is a lossless format. When you convert JPG to PNG using PixelTools, the output is a lossless copy of the JPG pixels — no additional quality is lost beyond what was already in the JPG.',
  },
  {
    question: 'What formats does the image converter support?',
    answer: 'The converter supports input and output in JPG (JPEG), PNG, and WebP formats. GIF and BMP can be uploaded and converted to JPG, PNG, or WebP.',
  },
]

export default function ConvertPage() {
  const pageUrl = `${SITE_URL}/convert-image`
  return (
    <ToolLayout
      title="Convert Image Online Free"
      description="Convert images between JPG, PNG and WebP formats in one click. Browser-based conversion with no quality loss — nothing is uploaded to any server."
      currentToolId="convert"
    >
      <JsonLd id="convert-tool" data={toolSchema({ name: 'PixelTools — Convert Image Online', description: 'Free online image converter. Convert JPG to PNG, PNG to WebP, and more. Browser-based, no upload.', url: pageUrl })} />
      <JsonLd id="convert-howto" data={howToSchema({ name: 'How to Convert an Image Format Online for Free', description: 'Convert images between JPG, PNG and WebP using PixelTools.', steps: STEPS.map(s => ({ name: s.title, text: s.description })) })} />
      <JsonLd id="convert-faq" data={faqSchema(FAQS)} />
      <JsonLd id="convert-breadcrumb" data={breadcrumbSchema([{ name: 'Home', url: SITE_URL }, { name: 'Convert Image', url: pageUrl }])} />

      <AdInContent />
      <ConvertTool />
      <AdInContent />

      <article className="mt-16 max-w-3xl space-y-10">
        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">JPG vs PNG vs WebP — Which Format Should You Use?</h2>
          <div className="text-muted-foreground space-y-3 leading-relaxed text-sm">
            <p>
              Choosing the right image format impacts file size, quality, and browser compatibility.
              When you <strong>convert images online</strong>, understanding the differences helps
              you pick the best format for your use case.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            {[
              { format: 'JPG / JPEG', best: 'Photos, social media', notes: 'Lossy compression. No transparency. Universal support. Smallest size for photos.' },
              { format: 'PNG', best: 'Logos, screenshots, icons', notes: 'Lossless compression. Supports transparency. Larger file size than JPG for photos.' },
              { format: 'WebP', best: 'Websites, web apps', notes: 'Best compression. Supports transparency. 25–35% smaller than JPG. All modern browsers.' },
            ].map(({ format, best, notes }) => (
              <div key={format} className="p-4 rounded-xl border border-border bg-muted/20">
                <h3 className="font-bold text-sm mb-1">{format}</h3>
                <p className="text-xs font-medium text-primary mb-1">Best for: {best}</p>
                <p className="text-xs text-muted-foreground leading-relaxed">{notes}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-4">How to Convert an Image — Step by Step</h2>
          <HowToSteps steps={STEPS} />
        </section>

        <section>
          <h2 className="text-2xl font-bold tracking-tight mb-3">Related Tools</h2>
          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Compress Image', href: '/compress-image' },
              { label: 'Resize Image', href: '/resize-image' },
              { label: 'Add Watermark', href: '/watermark-image' },
              { label: 'View Metadata', href: '/metadata-viewer' },
            ].map(({ label, href }) => (
              <Link key={href} href={href} className="text-sm px-4 py-1.5 rounded-full border border-border hover:border-primary/50 hover:text-primary transition-colors">
                {label}
              </Link>
            ))}
          </div>
        </section>
      </article>

      <FAQSection faqs={FAQS} title="Convert Image — FAQ" />
    </ToolLayout>
  )
}
