'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { pageview, GA_ID } from '@/lib/analytics'

function NavigationTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!GA_ID) return
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : '')
    pageview(url)
  }, [pathname, searchParams])

  return null
}

export function AnalyticsProvider() {
  if (!GA_ID) return null

  return (
    <Suspense fallback={null}>
      <NavigationTracker />
    </Suspense>
  )
}
