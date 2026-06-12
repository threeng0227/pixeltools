import Link from 'next/link'
import { ArrowRight, Shield, Zap, Lock, Infinity } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { TOOLS } from '@/constants/tools'
import { AdBanner } from '@/components/ads/AdBanner'
import { ToolCard } from '@/components/shared/tool-card'
import { FAQSection } from '@/components/shared/faq-section'
import { websiteSchema, softwareAppSchema, faqSchema } from '@/lib/structured-data'

const TRUST_ITEMS = [
  { icon: Shield, title: '100% Browser-Based', desc: 'All processing happens locally in your browser.' },
  { icon: Lock, title: 'No Account Required', desc: 'Use every tool instantly without signing up.' },
  { icon: Zap, title: 'Privacy First', desc: 'Your images never leave your device.' },
  { icon: Infinity, title: 'Unlimited Usage', desc: 'Free forever, no limits, no watermarks.' },
]

const FEATURES = [
  { title: 'Lightning Fast', desc: 'Optimized WebAssembly and Canvas APIs deliver instant results.' },
  { title: 'Completely Private', desc: 'Zero server uploads. Files stay on your device at all times.' },
  { title: 'No Installation', desc: 'Works in any modern browser, no plugins needed.' },
  { title: 'All Formats', desc: 'Support for JPG, PNG, WebP, GIF and BMP images.' },
  { title: 'Mobile Ready', desc: 'Fully responsive design works on any device.' },
  { title: 'Free Forever', desc: 'All tools are free. No premium plans or paywalls.' },
]

const HOME_FAQS = [
  { question: 'Are my images uploaded to a server?', answer: 'No. All image processing happens entirely in your browser using JavaScript Canvas APIs. Your images never leave your device.' },
  { question: 'Is PixelTools free to use?', answer: 'Yes, completely free. There are no hidden fees, subscriptions, or premium tiers. All tools are available without any account.' },
  { question: 'What image formats are supported?', answer: 'PixelTools supports JPG, JPEG, PNG, WebP, GIF, and BMP files up to 50MB in size.' },
  { question: 'Do I need to create an account?', answer: 'No account is required. Open any tool, upload your image, and download the result immediately.' },
  { question: 'How does browser-based processing work?', answer: "Modern browsers expose powerful APIs like the Canvas API that let us manipulate images at the pixel level — no server needed." },
  { question: 'Can I use PixelTools on mobile?', answer: 'Yes. PixelTools is fully responsive and works on smartphones and tablets.' },
  { question: 'What is the maximum file size?', answer: 'You can upload images up to 50MB. For best performance we recommend files under 20MB.' },
  { question: 'How do I compress an image without losing quality?', answer: 'Use our Compress Image tool and choose the "High" preset to reduce file size while keeping most visual quality.' },
  { question: 'Can I convert a PNG to WebP?', answer: 'Yes. The Convert Image tool supports conversion between JPG, PNG, and WebP formats.' },
  { question: 'Is there a limit on how many images I can process?', answer: 'No limits at all. Process as many images as you need, completely free.' },
]

export default function HomePage() {
  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(HOME_FAQS)) }}
      />
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-b from-blue-50/50 to-background dark:from-blue-950/20">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32 text-center">
          <Badge variant="secondary" className="mb-6 rounded-full px-4 py-1.5 text-sm font-medium">
            100% Free & Private
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Optimize Images{' '}
            <span className="bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              in Seconds
            </span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Compress, resize, crop, convert and enhance images directly in your browser.
            No upload. No account. No limits.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" render={<Link href="/compress-image" />} nativeButton={false} className="rounded-xl px-8 h-12 text-base font-semibold">
              Start Editing <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" render={<Link href="#tools" />} nativeButton={false} className="rounded-xl px-8 h-12 text-base">
              Learn More
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            {['No Upload Required', 'Private Processing', 'Free Forever', 'Fast Downloads'].map((f) => (
              <span key={f} className="flex items-center gap-1.5">
                <span className="text-emerald-500 font-bold">✓</span> {f}
              </span>
            ))}
          </div>
        </div>
      </section>

      <AdBanner className="mx-auto max-w-7xl px-6 my-6" />

      {/* Tools Grid */}
      <section id="tools" className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">All Image Tools</h2>
          <p className="mt-3 text-muted-foreground">Everything you need to edit images — all in one place.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="bg-muted/30 border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {TRUST_ITEMS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdBanner className="mx-auto max-w-7xl px-6 my-6" />

      {/* Features */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Why PixelTools?</h2>
          <p className="mt-3 text-muted-foreground">Built for speed, privacy, and simplicity.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ title, desc }) => (
            <div key={title} className="p-6 rounded-2xl border border-border hover:border-primary/30 hover:bg-muted/30 transition-all">
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6">
        <AdBanner className="my-6" />
        <FAQSection faqs={HOME_FAQS} />
      </div>
    </div>
  )
}
