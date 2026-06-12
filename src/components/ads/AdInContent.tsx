'use client'

import { useEffect } from 'react'
import { isAdsEnabled, adsConfig } from '@/lib/ads'

export function AdInContent() {
  useEffect(() => {
    if (!isAdsEnabled() || !adsConfig.slots.content) return
    try {
      ;(window.adsbygoogle = window.adsbygoogle ?? []).push({})
    } catch {}
  }, [])

  if (!isAdsEnabled() || !adsConfig.slots.content) return null

  return (
    <div className="my-8">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adsConfig.client}
        data-ad-slot={adsConfig.slots.content}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
