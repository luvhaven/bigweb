'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'framer-motion'

interface LocalMouseRevealProps {
    children: React.ReactNode
    className?: string
    color?: string
    size?: number
}

export default function LocalMouseReveal({
    children,
    className = '',
    color = 'rgba(212, 168, 83, 0.08)',
    size = 400
}: LocalMouseRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    // Using useMotionValue avoids React state updates for every pixel of movement
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth physics
    const smoothX = useSpring(mouseX, { stiffness: 400, damping: 40, mass: 0.5 })
    const smoothY = useSpring(mouseY, { stiffness: 400, damping: 40, mass: 0.5 })

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return
        const rect = containerRef.current.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left)
        mouseY.set(e.clientY - rect.top)
    }

    // Dynamic gradient string using Framer template
    const maskImage = useMotionTemplate`radial-gradient(${size}px circle at ${smoothX}px ${smoothY}px, black 10%, transparent 80%)`
    const bgImage = useMotionTemplate`radial-gradient(${size}px circle at ${smoothX}px ${smoothY}px, ${color}, transparent 80%)`

    return (
        <div
            ref={containerRef}
            className={`relative group ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* The base children */}
            {children}

            {/* The precise glow layer (mix-blend-screen for highlight) */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-0 mix-blend-screen transition-opacity duration-700"
                style={{
                    background: bgImage,
                    opacity: isHovered ? 1 : 0
                }}
            />

            {/* The intricate texture/noise layer revealed only by cursor mask */}
            <motion.div
                className="pointer-events-none absolute inset-0 z-0 mix-blend-overlay transition-opacity duration-700 opacity-60"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 250 250' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    WebkitMaskImage: maskImage,
                    maskImage,
                    opacity: isHovered ? 1 : 0
                }}
            />
        </div>
    )
}
