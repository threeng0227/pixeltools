import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Shield, Zap, Lock, Infinity, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TOOLS } from '@/constants/tools'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/constants/site'
import { AdBanner } from '@/components/ads/AdBanner'
import { ToolCard } from '@/components/shared/tool-card'
import { FAQSection } from '@/components/shared/faq-section'
import { JsonLd } from '@/components/shared/json-ld'
import { websiteSchema, softwareAppSchema, faqSchema } from '@/lib/structured-data'

export const metadata: Metadata = {
  title: `${SITE_NAME} — Free Online Image Tools: Compress, Resize, Convert & More`,
  description: 'Free online image tools: compress, resize, crop, convert, rotate, flip and watermark images. 100% browser-based — no upload, no account, no limits.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: `${SITE_NAME} — Free Online Image Tools`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

const TRUST_ITEMS = [
  { icon: Shield, title: '100% Browser-Based', desc: 'All processing happens locally in your browser. Zero server uploads.' },
  { icon: Lock, title: 'No Account Required', desc: 'Use every free online image tool instantly without signing up.' },
  { icon: Zap, title: 'Privacy First', desc: 'Your images never leave your device. Completely private.' },
  { icon: Infinity, title: 'Unlimited Usage', desc: 'Free forever, no daily limits, no watermarks on output.' },
]

const USE_CASES = [
  {
    title: 'Social Media Creators',
    desc: 'Resize and compress images to fit Instagram, Facebook, Twitter and YouTube specs. Save bandwidth and post faster.',
  },
  {
    title: 'E-commerce Sellers',
    desc: 'Reduce product image sizes for faster page loads, convert to WebP for better Core Web Vitals, and watermark images with your brand.',
  },
  {
    title: 'Students & Bloggers',
    desc: 'Quickly compress images for presentations, crop screenshots, and convert formats when submitting assignments or writing blog posts.',
  },
  {
    title: 'Designers & Developers',
    desc: 'Convert JPG/PNG to WebP, batch-check image metadata, rotate assets, and flip icons without leaving the browser.',
  },
]

const HOME_FAQS = [
  {
    question: 'Are my images uploaded to a server?',
    answer: 'No. All image processing on PixelTools happens entirely in your browser using the JavaScript Canvas API. Your images never leave your device — guaranteed.',
  },
  {
    question: 'Is PixelTools completely free?',
    answer: 'Yes, completely free. There are no hidden fees, subscriptions, or premium tiers. All 8 image tools are available to everyone, forever, with no account required.',
  },
  {
    question: 'What image formats are supported?',
    answer: 'PixelTools supports JPG, JPEG, PNG, WebP, GIF, and BMP files up to 50 MB. You can also convert between JPG, PNG, and WebP formats with the Convert Image tool.',
  },
  {
    question: 'How do I compress an image without losing quality?',
    answer: 'Open the Compress Image tool, upload your file, and select the "High" or "Maximum" preset. These settings reduce file size by 40–70% while preserving most visual quality. For maximum compression with some quality loss, use "Low" or "Medium".',
  },
  {
    question: 'Can I resize an image to a specific pixel size?',
    answer: 'Yes. The Resize Image tool lets you enter exact pixel dimensions for width and height. You can lock the aspect ratio to prevent distortion, or unlock it for custom dimensions. Social media presets for Instagram, Facebook, Twitter and YouTube are also included.',
  },
  {
    question: 'How do I convert a PNG to WebP?',
    answer: 'Use the Convert Image tool. Upload your PNG, select "WebP" as the target format, and click Convert. WebP files are typically 25–35% smaller than equivalent PNGs, making them ideal for websites.',
  },
  {
    question: 'Can I use PixelTools on a smartphone?',
    answer: 'Yes. PixelTools is fully responsive and works on any modern smartphone or tablet browser — iOS Safari, Chrome for Android, and others.',
  },
  {
    question: 'What is the maximum file size?',
    answer: 'You can upload images up to 50 MB. For best browser performance, images under 20 MB are recommended.',
  },
]

export default function HomePage() {
  return (
    <div>
      <JsonLd id="website" data={websiteSchema()} />
      <JsonLd id="software-app" data={softwareAppSchema()} />
      <JsonLd id="faq" data={faqSchema(HOME_FAQS)} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-b from-blue-50/50 to-background dark:from-blue-950/20">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 text-center">
          <Badge variant="secondary" className="mb-6 rounded-full px-4 py-1.5 text-sm font-medium">
            100% Free & Private — No Account Needed
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Free Online Image Tools —{' '}
            <span className="bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Compress, Resize & Convert
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            8 powerful free image editor tools in one place. Compress, resize, crop, convert, rotate,
            flip, and watermark images directly in your browser — no upload, no account, no limits.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" render={<Link href="/compress-image" />} nativeButton={false} className="rounded-xl px-8 h-12 text-base font-semibold">
              Start for Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" render={<Link href="#tools" />} nativeButton={false} className="rounded-xl px-8 h-12 text-base">
              View All Tools
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            {['No Upload Required', 'Completely Private', 'Free Forever', 'Works on Mobile'].map((f) => (
              <span key={f} className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0" aria-hidden="true" />
                {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      <AdBanner className="mx-auto max-w-7xl px-6 my-6" />

      {/* Tools Grid */}
      <section id="tools" className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">All Free Image Tools</h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
            Everything you need to edit, optimize and convert images online — all in one place, completely free.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Trust */}
      <section aria-label="Why PixelTools is trustworthy" className="bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TRUST_ITEMS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                  <Icon className="h-6 w-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About / SEO Content */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-6">
            The Best Free Online Image Tools — Fast, Private & Easy
          </h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground space-y-4 leading-relaxed">
            <p>
              PixelTools is a free online image editor that gives you professional-grade image tools
              without software installation, registration, or payment. Whether you need to{' '}
              <Link href="/compress-image" className="text-primary underline underline-offset-4 hover:text-primary/80">
                compress images online
              </Link>{' '}
              for your website,{' '}
              <Link href="/resize-image" className="text-primary underline underline-offset-4 hover:text-primary/80">
                resize images
              </Link>{' '}
              for social media, or{' '}
              <Link href="/convert-image" className="text-primary underline underline-offset-4 hover:text-primary/80">
                convert images from JPG to WebP
              </Link>
              , PixelTools handles it all instantly in your browser.
            </p>
            <p>
              Unlike traditional desktop software or cloud-based tools, PixelTools processes every image
              locally using modern browser APIs. This means your photos never touch our servers —
              providing the highest level of privacy. There are no file upload limits from a privacy
              standpoint, and your images are never stored, tracked, or shared.
            </p>
            <p>
              Our tools are optimized for speed. Most operations complete in under 2 seconds, even for
              large images. Whether you're a photographer batch-preparing portfolio photos, a blogger
              optimizing images for Core Web Vitals, or a student quickly formatting a screenshot —
              PixelTools gets the job done without friction.
            </p>
          </div>
        </div>
      </section>

      <AdBanner className="mx-auto max-w-7xl px-6 my-2" />

      {/* Use Cases */}
      <section className="mx-auto max-w-7xl px-6 py-16 bg-muted/20 rounded-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Who Uses PixelTools?</h2>
          <p className="mt-3 text-muted-foreground">
            From social media creators to developers — free image tools for everyone.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {USE_CASES.map(({ title, desc }) => (
            <div key={title} className="p-6 rounded-2xl border border-border bg-background hover:border-primary/30 transition-all">
              <h3 className="font-semibold text-base mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why PixelTools */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Why Choose PixelTools?</h2>
          <p className="mt-3 text-muted-foreground">Built for speed, privacy, and simplicity — no compromises.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Lightning Fast Processing', desc: 'Canvas API and browser-native optimizations deliver results in under 2 seconds for most images.' },
            { title: 'Zero Privacy Risk', desc: 'No server, no cloud, no tracking. Files are processed entirely in your browser memory and deleted when you close the tab.' },
            { title: 'No Installation Needed', desc: 'Open a tool and start editing. Works on Chrome, Firefox, Safari and Edge. No plugins, no extensions, no downloads.' },
            { title: 'All Popular Formats', desc: 'Full support for JPG, JPEG, PNG, WebP, GIF and BMP. Convert between formats with one click.' },
            { title: 'Mobile Friendly', desc: 'Fully responsive design. Use every tool on your smartphone or tablet — crop a photo on the go.' },
            { title: 'Always Free', desc: 'No freemium, no paywalls, no watermarks on your output. Every feature is available to every user, always.' },
          ].map(({ title, desc }) => (
            <div key={title} className="p-6 rounded-2xl border border-border hover:border-primary/30 hover:bg-muted/30 transition-all">
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pb-16">
        <AdBanner className="mb-10" />
        <FAQSection faqs={HOME_FAQS} title="Frequently Asked Questions About PixelTools" />
      </div>
    </div>
  )
}
