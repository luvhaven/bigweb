'use client'

import React, { useRef, useState, useCallback, useEffect } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

interface MagneticProps {
    children: React.ReactNode
    strength?: number
    className?: string
}

export default function Magnetic({ children, strength = 0.5, className = "" }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 }
    const mouseX = useSpring(0, springConfig)
    const mouseY = useSpring(0, springConfig)

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!ref.current) return
        const { clientX, clientY } = e
        const { left, top, width, height } = ref.current.getBoundingClientRect()

        const centerX = left + width / 2
        const centerY = top + height / 2

        const distX = (clientX - centerX) * strength
        const distY = (clientY - centerY) * strength

        setPosition({ x: distX, y: distY })
    }, [strength])

    const handleMouseLeave = useCallback(() => {
        setPosition({ x: 0, y: 0 })
    }, [])

    useEffect(() => {
        mouseX.set(position.x)
        mouseY.set(position.y)
    }, [position, mouseX, mouseY])

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                x: mouseX,
                y: mouseY,
            }}
            className={`magnetic-wrap ${className}`}
        >
            {children}
        </motion.div>
    )
}
