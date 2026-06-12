import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/constants/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const toolRoutes = [
    '/compress-image',
    '/resize-image',
    '/crop-image',
    '/convert-image',
    '/rotate-image',
    '/flip-image',
    '/watermark-image',
    '/metadata-viewer',
  ]
  const staticRoutes = ['/about', '/privacy-policy', '/terms', '/contact']

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    ...toolRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route}`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    })),
  ]
}
