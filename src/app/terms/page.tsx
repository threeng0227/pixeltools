import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'PixelTools Terms of Service',
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-2">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: June 12, 2026</p>

      <div className="space-y-8 text-muted-foreground leading-relaxed">
        {[
          { title: 'Acceptance', body: 'By using PixelTools you agree to these terms. If you do not agree, please stop using the service.' },
          { title: 'Service Description', body: 'PixelTools provides browser-based image editing tools free of charge. All processing occurs on your device. We do not store your images.' },
          { title: 'Acceptable Use', body: 'You may use PixelTools for personal and commercial purposes. You may not use automated tools to scrape or abuse the service, or upload illegal content.' },
          { title: 'Intellectual Property', body: 'You retain all rights to images you process. We claim no ownership over files you use with our tools.' },
          { title: 'Disclaimer', body: 'PixelTools is provided "as is" without warranty. We are not liable for any damages resulting from use of the service.' },
          { title: 'Changes', body: 'We may update these terms at any time. Continued use after changes constitutes acceptance.' },
          { title: 'Contact', body: 'Questions? Email hello@pixeltools.app' },
        ].map(({ title, body }) => (
          <section key={title}>
            <h2 className="text-xl font-semibold text-foreground mb-2">{title}</h2>
            <p>{body}</p>
          </section>
        ))}
      </div>
    </div>
  )
}
