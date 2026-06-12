export const adsConfig = {
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || '',
  slots: {
    top: process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP || '',
    content: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTENT || '',
    footer: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER || '',
  },
}

export function isAdsEnabled(): boolean {
  return Boolean(adsConfig.client && adsConfig.client.length > 0)
}
