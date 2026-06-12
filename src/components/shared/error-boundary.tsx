'use client'

import { Component, type ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  message: string
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, message: error.message }
  }

  reset = () => this.setState({ hasError: false, message: '' })

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="flex flex-col items-center gap-4 py-16 text-center rounded-2xl border border-destructive/30 bg-destructive/5">
          <AlertCircle className="h-10 w-10 text-destructive" aria-hidden="true" />
          <div>
            <p className="font-semibold text-destructive">Something went wrong</p>
            <p className="text-sm text-muted-foreground mt-1 max-w-sm">
              The image could not be processed. Try a different file or reload the page.
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={this.reset} className="rounded-xl">
            Try Again
          </Button>
        </div>
      )
    }
    return this.props.children
  }
}
