'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

interface AdvancedParallaxProps {
    children: React.ReactNode
    className?: string
    speed?: number // Negative for slower/upward, positive for faster/downward
}

export default function AdvancedParallax({ children, className = '', speed = 1 }: AdvancedParallaxProps) {
    const ref = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start']
    })

    // Map scroll progress mapping to Y translation
    const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 20}%`, `${speed * 20}%`])

    return (
        <div ref={ref} className={`overflow-hidden ${className}`}>
            <motion.div style={{ y, height: '140%', width: '100%', position: 'relative', top: '-20%' }}>
                {children}
            </motion.div>
        </div>
    )
}
