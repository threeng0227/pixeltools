import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'PixelTools Privacy Policy — we collect no image data. All processing is local.',
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: June 12, 2026</p>

      <div className="space-y-10 text-muted-foreground leading-relaxed">
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Summary</h2>
          <p className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-300 text-sm font-medium">
            Your images are never uploaded to any server. All image processing happens locally in your browser.
            We do not store, share, or have any access to your files.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Image Processing</h2>
          <p>All image processing on PixelTools is performed locally using browser APIs (Canvas API, File API). When you upload an image to any tool, the file is read by your browser directly and processed using JavaScript. No image data is transmitted to our servers.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Data We Collect</h2>
          <p>We may collect anonymous analytics data (page views, tool usage counts) via Google Analytics to help us improve the service. This data does not include any image content. No personally identifiable information is collected without your explicit consent.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Cookies</h2>
          <p>We use minimal cookies to remember your theme preference (light/dark mode). Analytics providers may use cookies to track anonymized usage. You can disable cookies in your browser settings.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Advertising</h2>
          <p>We display ads via Google AdSense to keep the service free. Google may use cookies to show relevant ads based on your interests. Please refer to Google's Privacy Policy for details.</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-foreground mb-3">Contact</h2>
          <p>If you have questions about this Privacy Policy, contact us at <a href="mailto:hello@pixeltools.app" className="text-primary underline">hello@pixeltools.app</a>.</p>
        </section>
      </div>
    </div>
  )
}
