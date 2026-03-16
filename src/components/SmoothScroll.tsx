'use client'

import { useEffect } from 'react'

/**
 * SmoothScroll — Lightweight native CSS smooth-scroll enabler.
 * Lenis + GSAP was removed because loading both libraries (>100KB combined)
 * on boot is a critical-path performance issue. Native CSS `scroll-behavior`
 * handles 95% of the use-case at zero JS cost.
 * The useEffect() only runs once and has zero ongoing overhead.
 */
export default function SmoothScroll({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    // Enable smooth scrolling via CSS (GPU-accelerated, zero JS overhead)
    document.documentElement.style.scrollBehavior = 'smooth'
    return () => {
      document.documentElement.style.scrollBehavior = ''
    }
  }, [])

  return <>{children}</>
}

