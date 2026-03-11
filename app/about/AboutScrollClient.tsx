'use client'

import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'

// This client component exists solely to hold the scroll-driven
// parallax effect that requires useScroll (a client-only hook).
// The rest of the About page is a Server Component for SSR/ISR.
export default function AboutScrollClient() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll()
    const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0])
    const scale = useTransform(scrollYProgress, [0, 0.1], [1, 0.97])

    return (
        <motion.div
            ref={containerRef}
            style={{ opacity, scale }}
            className="pointer-events-none fixed inset-0 z-[-1]"
            aria-hidden="true"
        />
    )
}
