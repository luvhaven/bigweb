'use client'

import { useRef, ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * ELITE 3D CARD with magnetic hover
 * Award-winning interaction that follows cursor with perspective transform
 * Used for portfolio items, service cards, testimonials
 */

interface Elite3DCardProps {
    children: ReactNode
    className?: string
    intensity?: number // 1-10, how strong the tilt effect
    glowColor?: string
    enableGlow?: boolean
}

export default function Elite3DCard({
    children,
    className = '',
    intensity = 5,
    glowColor = 'rgba(16, 185, 129, 0.3)',
    enableGlow = true
}: Elite3DCardProps) {
    const cardRef = useRef<HTMLDivElement>(null)

    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Spring physics for smooth movement
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [intensity, -intensity]), {
        damping: 20,
        stiffness: 300
    })
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-intensity, intensity]), {
        damping: 20,
        stiffness: 300
    })

    // Glow effect follows cursor
    const glowX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%'])
    const glowY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%'])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return

        const rect = cardRef.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseXPos = e.clientX - rect.left
        const mouseYPos = e.clientY - rect.top

        const xPct = mouseXPos / width - 0.5
        const yPct = mouseYPos / height - 0.5

        mouseX.set(xPct)
        mouseY.set(yPct)
    }

    const handleMouseLeave = () => {
        mouseX.set(0)
        mouseY.set(0)
    }

    return (
        <motion.div
            ref={cardRef}
            className={`relative group ${className}`}
            style={{
                transformStyle: 'preserve-3d',
                perspective: 1000
            }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
            <motion.div
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: 'preserve-3d'
                }}
                className="relative w-full h-full"
            >
                {/* Content */}
                <div className="relative z-10" style={{ transform: 'translateZ(50px)' }}>
                    {children}
                </div>

                {/* Glow effect */}
                {enableGlow && (
                    <motion.div
                        className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                            background: `radial-gradient(circle at ${glowX} ${glowY}, ${glowColor} 0%, transparent 70%)`,
                            transform: 'translateZ(-10px)'
                        }}
                    />
                )}

                {/* Shine effect */}
                <motion.div
                    className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                        background: `linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)`,
                        backgroundSize: '200% 200%',
                        backgroundPosition: `${useTransform(mouseX, [-0.5, 0.5], ['0%', '100%'])} ${useTransform(mouseY, [-0.5, 0.5], ['0%', '100%'])}`
                    }}
                />
            </motion.div>
        </motion.div>
    )
}
