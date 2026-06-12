import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface FAQItem {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQItem[]
  title?: string
}

export function FAQSection({ faqs, title = 'Frequently Asked Questions' }: FAQSectionProps) {
  return (
    <section className="mt-20">
      <h2 className="text-2xl font-bold tracking-tight mb-8">{title}</h2>
      <Accordion className="space-y-3">
        {faqs.map((faq, i) => (
          <AccordionItem
            key={faq.question}
            value={i}
            className="rounded-2xl border border-border px-6"
          >
            <AccordionTrigger className="text-left font-medium hover:no-underline py-5">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
