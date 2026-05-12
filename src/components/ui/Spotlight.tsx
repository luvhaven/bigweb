'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useSpring, useMotionTemplate, useMotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

interface SpotlightProps {
    className?: string
    fill?: string
    size?: number
}

export const Spotlight = ({
    className,
    fill = "white",
    size = 400
}: SpotlightProps) => {
    return (
        <div className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden", className)}>
            <SpotlightEffect fill={fill} size={size} />
        </div>
    )
}

function SpotlightEffect({ fill, size }: { fill: string; size: number }) {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    useEffect(() => {
        const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
            mouseX.set(clientX)
            mouseY.set(clientY)
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [mouseX, mouseY])

    return (
        <motion.div
            className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
                background: useMotionTemplate`
                    radial-gradient(
                        ${size}px circle at ${mouseX}px ${mouseY}px,
                        ${fill},
                        transparent 80%
                    )
                `
            }}
        />
    )
}

// Alternative: A spotlight that wraps content and tracks mouse relative to container
export const SpotlightCard = ({
    children,
    className = "",
    spotlightColor = "rgba(255, 255, 255, 0.25)"
}: {
    children: React.ReactNode
    className?: string
    spotlightColor?: string
}) => {
    const divRef = useRef<HTMLDivElement>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
        const { left, top } = currentTarget.getBoundingClientRect()
        mouseX.set(clientX - left)
        mouseY.set(clientY - top)
    }

    return (
        <div
            ref={divRef}
            onMouseMove={handleMouseMove}
            className={cn("group relative border border-neutral-800 bg-neutral-900 overflow-hidden", className)}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `
                }}
            />
            {children}
        </div>
    )
}
