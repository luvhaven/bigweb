'use client'

import { useEffect, useState, ReactNode } from 'react'

interface ClientOnlyProps {
  children: ReactNode
  fallback?: ReactNode
}

/**
 * Only renders children after client-side hydration is complete
 * Prevents hydration errors with scroll-based animations
 * 
 * Usage:
 * <ClientOnly>
 *   <ComponentWithScrollEffects />
 * </ClientOnly>
 */
export default function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
