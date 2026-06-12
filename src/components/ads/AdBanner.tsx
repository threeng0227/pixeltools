'use client'

import { useEffect, useRef } from 'react'
import { isAdsEnabled, adsConfig } from '@/lib/ads'

interface AdBannerProps {
  slot?: string
  className?: string
}

export function AdBanner({ slot, className }: AdBannerProps) {
  const ref = useRef<HTMLDivElement>(null)
  const adSlot = slot || adsConfig.slots.top

  useEffect(() => {
    if (!isAdsEnabled() || !adSlot) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle ?? []).push({})
    } catch {}
  }, [adSlot])

  if (!isAdsEnabled() || !adSlot) return null

  return (
    <div ref={ref} className={className}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adsConfig.client}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
