'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

/**
 * SmoothScroll — Lenis + GSAP ScrollTrigger integration.
 * Lenis provides buttery, physics-based smooth scroll that's GPU-accelerated
 * and works perfectly with GSAP ScrollTrigger.
 * Mount once in the root layout.
 */
export default function SmoothScroll({ children }: { children?: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease-out
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
      infinite: false,
    })

    // Sync Lenis with GSAP ticker for perfect ScrollTrigger integration
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    // Update ScrollTrigger on every Lenis scroll event
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  return <>{children}</>
}
