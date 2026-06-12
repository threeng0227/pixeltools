interface Window {
  adsbygoogle: { push: (config: Record<string, unknown>) => void } & Array<Record<string, unknown>>
  dataLayer: unknown[]
  clarity: (command: string, ...args: unknown[]) => void
  gtag: (
    command: 'config' | 'event' | 'js' | 'set',
    targetId: string | Date,
    params?: Record<string, string | number | boolean | string[]>,
  ) => void
}
