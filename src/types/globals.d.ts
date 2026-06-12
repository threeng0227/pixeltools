interface Window {
  adsbygoogle: { push: (config: Record<string, unknown>) => void } & Array<Record<string, unknown>>
  dataLayer: unknown[]
  clarity: (command: string, ...args: unknown[]) => void
}
