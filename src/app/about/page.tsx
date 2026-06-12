import type { Metadata } from 'next'
import { Shield, Zap, Lock, Code } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About PixelTools',
  description: 'Learn about PixelTools — a free, private, browser-based image toolkit built for speed and privacy.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-4">About PixelTools</h1>
      <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
        PixelTools is a free, browser-based image toolkit that puts privacy first.
        We believe image editing shouldn't require account creation, file uploads, or subscriptions.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {[
          { icon: Lock, title: 'Privacy First', desc: 'All image processing happens entirely in your browser. Your files never touch a server.' },
          { icon: Zap, title: 'Built for Speed', desc: 'We use Canvas APIs and modern JavaScript to process images instantly, even large files.' },
          { icon: Shield, title: 'No Account Needed', desc: 'Every tool is available immediately. No sign-up, no subscription, no paywalls.' },
          { icon: Code, title: 'Open Standards', desc: 'Built on Web APIs supported by every modern browser — no plugins or extensions required.' },
        ].map(({ icon: Icon, title, desc }) => (
          <div key={title} className="p-6 rounded-2xl border border-border">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 mb-4">
              <Icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-semibold mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>

      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          We set out to build the fastest and most polished browser-based image toolkit on the web.
          Tools like these shouldn't be locked behind accounts or limited to paid plans.
          PixelTools is, and always will be, free.
        </p>
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground leading-relaxed">
          Modern browsers expose powerful APIs — the HTML5 Canvas API, the File API, and Web Workers —
          that let us perform real image processing directly on your device.
          When you compress, resize, or crop an image, the computation runs in your browser tab.
          The result is downloaded directly to your device. No server ever sees your image.
        </p>
      </div>
    </div>
  )
}
