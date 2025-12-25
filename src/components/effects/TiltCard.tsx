'use client'

import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

interface TiltCardProps {
    children: React.ReactNode
    className?: string
}

export const TiltCard: React.FC<TiltCardProps> = ({ children, className = '' }) => {
    const ref = useRef<HTMLDivElement>(null)

    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const mouseX = useSpring(x, { stiffness: 500, damping: 50 })
    const mouseY = useSpring(y, { stiffness: 500, damping: 50 })

    const rotateX = useTransform(mouseY, [-0.5, 0.5], ["15deg", "-15deg"])
    const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-15deg", "15deg"])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return

        const rect = ref.current.getBoundingClientRect()

        const width = rect.width
        const height = rect.height

        const mouseXFromCenter = e.clientX - rect.left - width / 2
        const mouseYFromCenter = e.clientY - rect.top - height / 2

        const wPct = mouseXFromCenter / width
        const hPct = mouseYFromCenter / height

        x.set(wPct)
        y.set(hPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={`relative transition-all duration-200 ease-out ${className}`}
        >
            <div style={{ transform: "translateZ(50px)" }}>
                {children}
            </div>
            {/* Glossy Overlay */}
            <motion.div
                style={{ x: mouseX, y: mouseY, opacity: useTransform(mouseX, [-0.5, 0.5], [0, 0.3]) }}
                className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 pointer-events-none rounded-xl z-20 mix-blend-overlay"
            />
        </motion.div>
    )
}
