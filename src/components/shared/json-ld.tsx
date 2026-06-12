import Script from 'next/script'

interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[]
  id: string
}

export function JsonLd({ data, id }: JsonLdProps) {
  return (
    <Script
      id={`jsonld-${id}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      strategy="afterInteractive"
    />
  )
}
