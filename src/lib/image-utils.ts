import imageCompression from 'browser-image-compression'
import type { CompressionPreset, ImageFormat } from '@/types'

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`
}

export function getSavingsPercent(original: number, compressed: number): number {
  if (original === 0) return 0
  return Math.round(((original - compressed) / original) * 100)
}

const PRESET_QUALITY: Record<CompressionPreset, number> = {
  low: 0.3,
  medium: 0.6,
  high: 0.8,
  maximum: 0.95,
}

export async function compressImage(file: File, preset: CompressionPreset): Promise<File> {
  const quality = PRESET_QUALITY[preset]
  return imageCompression(file, {
    maxSizeMB: 50,
    initialQuality: quality,
    useWebWorker: true,
  })
}

export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

export async function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  const url = URL.createObjectURL(file)
  try {
    const img = await loadImage(url)
    return { width: img.naturalWidth, height: img.naturalHeight }
  } finally {
    URL.revokeObjectURL(url)
  }
}

export function canvasToBlob(canvas: HTMLCanvasElement, format: ImageFormat, quality = 0.9): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const mimeType = format === 'jpeg' ? 'image/jpeg' : format === 'png' ? 'image/png' : 'image/webp'
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob)
        else reject(new Error('Canvas toBlob failed'))
      },
      mimeType,
      quality,
    )
  })
}

export async function resizeImage(
  file: File,
  width: number,
  height: number,
  quality = 0.9,
): Promise<Blob> {
  const url = URL.createObjectURL(file)
  try {
    const img = await loadImage(url)
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')!
    ctx.drawImage(img, 0, 0, width, height)
    return canvasToBlob(canvas, 'jpeg', quality)
  } finally {
    URL.revokeObjectURL(url)
  }
}

export async function convertImage(file: File, format: ImageFormat, quality = 0.9): Promise<Blob> {
  const url = URL.createObjectURL(file)
  try {
    const img = await loadImage(url)
    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const ctx = canvas.getContext('2d')!
    if (format === 'jpeg') {
      ctx.fillStyle = '#FFFFFF'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }
    ctx.drawImage(img, 0, 0)
    return canvasToBlob(canvas, format, quality)
  } finally {
    URL.revokeObjectURL(url)
  }
}

export async function rotateImage(file: File, degrees: number): Promise<Blob> {
  const url = URL.createObjectURL(file)
  try {
    const img = await loadImage(url)
    const canvas = document.createElement('canvas')
    const rad = (degrees * Math.PI) / 180
    const sin = Math.abs(Math.sin(rad))
    const cos = Math.abs(Math.cos(rad))
    canvas.width = Math.floor(img.naturalWidth * cos + img.naturalHeight * sin)
    canvas.height = Math.floor(img.naturalWidth * sin + img.naturalHeight * cos)
    const ctx = canvas.getContext('2d')!
    ctx.translate(canvas.width / 2, canvas.height / 2)
    ctx.rotate(rad)
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2)
    return canvasToBlob(canvas, 'jpeg')
  } finally {
    URL.revokeObjectURL(url)
  }
}

export async function flipImage(file: File, horizontal: boolean, vertical: boolean): Promise<Blob> {
  const url = URL.createObjectURL(file)
  try {
    const img = await loadImage(url)
    const canvas = document.createElement('canvas')
    canvas.width = img.naturalWidth
    canvas.height = img.naturalHeight
    const ctx = canvas.getContext('2d')!
    ctx.translate(horizontal ? canvas.width : 0, vertical ? canvas.height : 0)
    ctx.scale(horizontal ? -1 : 1, vertical ? -1 : 1)
    ctx.drawImage(img, 0, 0)
    return canvasToBlob(canvas, 'jpeg')
  } finally {
    URL.revokeObjectURL(url)
  }
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(url), 100)
}

export function validateImageFile(file: File, maxSize: number): string | null {
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/bmp']
  if (!validTypes.includes(file.type)) return 'File type not supported. Please use JPG, PNG, WebP, GIF or BMP.'
  if (file.size > maxSize) return `File too large. Maximum size is ${formatBytes(maxSize)}.`
  return null
}
