'use client'

import { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react'
import Link from 'next/link'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
          <div className="text-center max-w-md">
            <div className="mb-8">
              <AlertTriangle className="w-20 h-20 mx-auto text-destructive mb-4 animate-pulse" />
              <h1 className="text-4xl font-bold mb-4 gradient-text">
                Oops! Something went wrong
              </h1>
              <p className="text-muted-foreground mb-2">
                We encountered an unexpected error. Don't worry, our team has been notified.
              </p>
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-4 p-4 bg-secondary rounded-lg text-left">
                  <summary className="cursor-pointer text-sm font-medium mb-2">
                    Error Details
                  </summary>
                  <pre className="text-xs text-red-400 overflow-auto">
                    {this.state.error.message}
                  </pre>
                </details>
              )}
            </div>

            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => window.location.reload()}
                className="gap-2"
              >
                <RefreshCcw className="w-4 h-4" />
                Reload Page
              </Button>
              <Link href="/">
                <Button variant="outline" className="gap-2">
                  <Home className="w-4 h-4" />
                  Go Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
