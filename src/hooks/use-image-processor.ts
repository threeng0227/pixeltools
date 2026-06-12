'use client'

import { useState, useCallback } from 'react'
import { validateImageFile } from '@/lib/image-utils'
import { MAX_FILE_SIZE } from '@/constants/site'

export interface SourceImage {
  file: File
  preview: string
}

export interface ResultImage {
  blob: Blob
  preview: string
}

export function useImageProcessor() {
  const [source, setSource] = useState<SourceImage | null>(null)
  const [result, setResult] = useState<ResultImage | null>(null)
  const [processing, setProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadFile = useCallback((file: File) => {
    const err = validateImageFile(file, MAX_FILE_SIZE)
    if (err) {
      setError(err)
      return false
    }
    if (source) URL.revokeObjectURL(source.preview)
    if (result) URL.revokeObjectURL(result.preview)
    setError(null)
    setResult(null)
    setSource({ file, preview: URL.createObjectURL(file) })
    return true
  }, [source, result])

  const setProcessedResult = useCallback((blob: Blob) => {
    if (result) URL.revokeObjectURL(result.preview)
    setResult({ blob, preview: URL.createObjectURL(blob) })
  }, [result])

  const run = useCallback(async (fn: () => Promise<Blob>) => {
    setProcessing(true)
    setError(null)
    try {
      const blob = await fn()
      setProcessedResult(blob)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Processing failed. Please try again.')
    } finally {
      setProcessing(false)
    }
  }, [setProcessedResult])

  const reset = useCallback(() => {
    if (source) URL.revokeObjectURL(source.preview)
    if (result) URL.revokeObjectURL(result.preview)
    setSource(null)
    setResult(null)
    setError(null)
    setProcessing(false)
  }, [source, result])

  return { source, result, processing, error, loadFile, run, reset, setError }
}
