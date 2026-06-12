export interface ImageFile {
  file: File
  preview: string
  name: string
  size: number
  width?: number
  height?: number
  format?: string
}

export interface ProcessedImage {
  blob: Blob
  url: string
  name: string
  size: number
  width?: number
  height?: number
}

export type CompressionPreset = 'low' | 'medium' | 'high' | 'maximum'
export type ImageFormat = 'jpeg' | 'png' | 'webp'
export type FlipDirection = 'horizontal' | 'vertical' | 'both'
export type WatermarkPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'center-left'
  | 'center'
  | 'center-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'
