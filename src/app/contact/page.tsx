import type { Metadata } from 'next'
import { ContactForm } from './contact-form'

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the PixelTools team. Questions, feedback, or feature requests — we read everything.',
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-4xl font-bold tracking-tight mb-2">Contact Us</h1>
      <p className="text-muted-foreground mb-4">Have a question or feedback? We&apos;d love to hear from you.</p>
      <p className="text-sm text-muted-foreground mb-10">
        Or email directly:{' '}
        <a href="mailto:threeng0227@gmail.com" className="text-primary underline underline-offset-4">
          threeng0227@gmail.com
        </a>
      </p>
      <ContactForm />
    </div>
  )
}
