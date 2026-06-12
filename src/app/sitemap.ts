import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/constants/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '',
    '/compress-image',
    '/resize-image',
    '/crop-image',
    '/convert-image',
    '/rotate-image',
    '/flip-image',
    '/watermark-image',
    '/metadata-viewer',
    '/about',
    '/privacy-policy',
    '/terms',
    '/contact',
  ]

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }))
}
