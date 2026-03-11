'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'
import { usePathname } from 'next/navigation'

export default function GlobalMouseReveal() {
    const pathname = usePathname()

    // Exclude admin or highly interactive areas where a global overlay might visually conflict
    const isExcluded = pathname?.startsWith('/admin')

    // Track raw mouse position
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Apply strict spring physics for an incredibly smooth, fluid trailing effect
    const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30, mass: 0.5 })
    const smoothY = useSpring(mouseY, { stiffness: 300, damping: 30, mass: 0.5 })

    // Build highly-performant CSS string templates piped directly into the DOM
    const ambientGlow = useMotionTemplate`radial-gradient(circle 600px at ${smoothX}px ${smoothY}px, rgba(212, 168, 83, 0.06), transparent 80%)`
    const maskImage = useMotionTemplate`radial-gradient(circle 350px at ${smoothX}px ${smoothY}px, black 30%, transparent 80%)`
    const focalPoint = useMotionTemplate`radial-gradient(circle 120px at ${smoothX}px ${smoothY}px, rgba(255, 255, 255, 0.08), transparent 100%)`

    useEffect(() => {
        if (isExcluded) return

        const handleMouseMove = (e: MouseEvent) => {
            // Check if we are hovering over interactive elements (optional advanced interaction, e.g. snap to links)
            // But for a pure global reveal, we just track raw coordinates.
            mouseX.set(e.clientX)
            mouseY.set(e.clientY)
        }

        // Use `{ passive: true }` to guarantee it never blocks main thread scrolling
        window.addEventListener('mousemove', handleMouseMove, { passive: true })
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY, isExcluded])

    if (isExcluded) return null

    return (
        <div className="pointer-events-none fixed inset-0 z-[100] mix-blend-screen overflow-hidden">
            {/* Ambient large golden glow */}
            <motion.div
                className="absolute inset-0 transition-opacity duration-1000"
                style={{ background: ambientGlow }}
            />

            {/* The technical secret: A noise filter overlaid via a moving mask to reveal "texture" in the dark */}
            <motion.div
                className="absolute inset-0 opacity-60 mix-blend-color-dodge transition-opacity duration-1000"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    WebkitMaskImage: maskImage,
                    maskImage: maskImage,
                }}
            />

            {/* Inner intense focal point for precision tracking */}
            <motion.div
                className="absolute inset-0 transition-opacity duration-1000 mix-blend-overlay"
                style={{ background: focalPoint }}
            />
        </div>
    )
}
