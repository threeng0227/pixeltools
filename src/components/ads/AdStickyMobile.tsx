'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { isAdsEnabled, adsConfig } from '@/lib/ads'

export function AdStickyMobile() {
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (!isAdsEnabled() || !adsConfig.slots.footer) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle ?? []).push({})
    } catch {}
  }, [])

  if (!isAdsEnabled() || !adsConfig.slots.footer || dismissed) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background border-t border-border p-2">
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-2 top-2 p-1 rounded-full bg-muted"
        aria-label="Close ad"
      >
        <X className="h-3 w-3" />
      </button>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adsConfig.client}
        data-ad-slot={adsConfig.slots.footer}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
