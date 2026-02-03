'use client'

import React, { useRef, useEffect } from 'react'
import { motion, useSpring, useMotionValue, useMotionTemplate, useTransform } from 'framer-motion'

interface PhysicsRevealProps {
    children: React.ReactNode
    cover?: React.ReactNode
    revealSize?: number
    className?: string
    dampening?: number
}

export const PhysicsReveal: React.FC<PhysicsRevealProps> = ({
    children,
    cover,
    revealSize = 300,
    className = "",
    dampening = 25
}) => {
    const ref = useRef<HTMLDivElement>(null)

    // Mouse coordinates (0-1 relative to element)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Physics-backed coordinates (pixels)
    const springConfig = { damping: dampening, stiffness: 150, mass: 0.8 }
    const x = useSpring(mouseX, springConfig)
    const y = useSpring(mouseY, springConfig)

    // Velocity-based deformation (optional advanced effect)
    // const velocityX = useVelocity(x)
    // const velocityY = useVelocity(y)
    // const scale = useTransform(velocityX, [-1000, 0, 1000], [1.2, 1, 1.2])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return
            const rect = ref.current.getBoundingClientRect()

            const relativeX = e.clientX - rect.left
            const relativeY = e.clientY - rect.top

            mouseX.set(relativeX)
            mouseY.set(relativeY)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY])

    // Create the fluid mask
    const maskImage = useMotionTemplate`radial-gradient(${revealSize}px circle at ${x}px ${y}px, black, transparent 95%)`

    // Create a turbulent "edge" mask for liquid feel
    const edgeMask = useMotionTemplate`radial-gradient(${revealSize + 20}px circle at ${x}px ${y}px, black, transparent 80%)`

    return (
        <div ref={ref} className={`relative overflow-hidden group ${className}`}>
            {/* The "Cover" Layer - Visible by default (e.g. Grayscale or "Hidden") */}
            <div className="relative z-10 w-full h-full transition-opacity duration-700">
                {cover || <div className="w-full h-full bg-black" />}
            </div>

            {/* The "Reveal" Layer - Revealed by mask (e.g. Color or "Found") */}
            <motion.div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                    maskImage,
                    WebkitMaskImage: maskImage,
                }}
            >
                {children}
            </motion.div>

            {/* Optional: Glossy/Liquid Overlay Ring */}
            <motion.div
                className="absolute inset-0 z-30 pointer-events-none mix-blend-overlay"
                style={{
                    background: useMotionTemplate`radial-gradient(${revealSize}px circle at ${x}px ${y}px, rgba(255,255,255,0.3) 0%, transparent 70%)`
                }}
            />

            {/* Industrial Crosshair Follower */}
            <motion.div
                className="absolute w-12 h-12 border border-orange-500/30 rounded-full z-40 pointer-events-none flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ x, y, left: -24, top: -24 }}
            >
                <div className="w-1 h-1 bg-orange-500 rounded-full" />
            </motion.div>
        </div>
    )
}
