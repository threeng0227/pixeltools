export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? ''

export const isAnalyticsEnabled = (): boolean =>
  typeof window !== 'undefined' && !!GA_ID

export function pageview(url: string): void {
  if (!isAnalyticsEnabled()) return
  window.gtag('config', GA_ID, { page_path: url })
}

export function event(
  action: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (!isAnalyticsEnabled()) return
  window.gtag('event', action, params)
}

export function trackToolUsage(toolName: string): void {
  event('tool_usage', { tool_name: toolName })
}

export function trackDownload(toolName: string, outputFormat: string): void {
  event('download_image', {
    tool_name: toolName,
    output_format: outputFormat,
  })
}

export const GA_EVENTS = {
  COMPRESS_IMAGE: 'compress_image',
  RESIZE_IMAGE: 'resize_image',
  CROP_IMAGE: 'crop_image',
  CONVERT_IMAGE: 'convert_image',
  ROTATE_IMAGE: 'rotate_image',
  FLIP_IMAGE: 'flip_image',
  WATERMARK_IMAGE: 'watermark_image',
} as const
