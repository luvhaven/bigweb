'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion'

interface MouseRevealProps {
    children: React.ReactNode
    revealContent: React.ReactNode
    className?: string
    revealSize?: number
}

export const MouseReveal: React.FC<MouseRevealProps> = ({
    children,
    revealContent,
    className = "",
    revealSize = 300
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    // Smooth physics for the mouse movement
    const smoothX = useSpring(mouseX, { stiffness: 100, damping: 20, mass: 0.5 })
    const smoothY = useSpring(mouseY, { stiffness: 100, damping: 20, mass: 0.5 })

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!ref.current) return
            const rect = ref.current.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            mouseX.set(x)
            mouseY.set(y)
        }

        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [mouseX, mouseY])



    const maskImage = useMotionTemplate`radial-gradient(${revealSize}px at ${smoothX}px ${smoothY}px, black, transparent), radial-gradient(${revealSize * 0.6}px at ${smoothX}px ${smoothY}px, black, transparent)`

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden ${className}`}
        >
            {/* Base Layer (Always Visible) */}
            <div className="relative z-10 w-full h-full">
                {children}
            </div>

            {/* Pattern Reveal Layer (Masked) */}
            <motion.div
                className="absolute inset-0 z-20 pointer-events-none"
                style={{
                    maskImage,
                    WebkitMaskImage: maskImage
                }}
            >
                {revealContent}
            </motion.div>

            {/* Spotlight Glow Layer (Additive) - Uneven & Subtle */}
            <motion.div
                className="absolute inset-0 z-30 pointer-events-none mix-blend-screen"
                style={{
                    background: useMotionTemplate`
                        radial-gradient(${revealSize * 0.8}px circle at ${smoothX}px ${smoothY}px, rgba(255,255,255,0.07), transparent 70%),
                        radial-gradient(${revealSize * 0.4}px circle at ${smoothX}px ${smoothY}px, rgba(255,255,255,0.05), transparent 90%)
                    `
                }}
            />
        </div>
    )
}

export const RevealPatterns = {
    Grid: () => (
        <div className="absolute inset-0 w-full h-full opacity-30">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808066_1px,transparent_1px),linear-gradient(to_bottom,#80808066_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
    ),
    Gradient: () => (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-500/10 via-purple-500/10 to-blue-500/10 animate-pulse mix-blend-screen" />
    ),
    Particles: () => {
        return (
            <div className="absolute inset-0 w-full h-full opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] filter contrast-150 brightness-100 mix-blend-overlay" />
        )
    },
    Circuit: () => (
        <div className="absolute inset-0 w-full h-full opacity-20">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
                backgroundSize: '32px 32px'
            }} />
            <svg className="absolute inset-0 w-full h-full opacity-30" width="100%" height="100%">
                <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M10 10 L30 10 L30 30" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20" />
                    <path d="M70 70 L90 70 L90 90" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20" />
                    <circle cx="30" cy="30" r="2" fill="currentColor" className="text-white/30" />
                    <circle cx="70" cy="70" r="2" fill="currentColor" className="text-white/30" />
                </pattern>
                <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit-pattern)" />
            </svg>
        </div>
    ),
    Hexagon: () => (
        <div className="absolute inset-0 w-full h-full opacity-20">
            <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='40' viewBox='0 0 24 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40c5.523 0 10-4.477 10-10V10C10 4.477 5.523 0 0 0h24c-5.523 0-10 4.477-10 10v20c0 5.523 5.523 10 10 10H0z' fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            }} />
        </div>
    ),
    Plus: () => (
        <div className="absolute inset-0 w-full h-full opacity-30">
            <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
            }} />
            <div className="absolute inset-0" style={{
                backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                backgroundSize: '80px 80px'
            }} />
        </div>
    ),
    Data: () => (
        <div className="absolute inset-0 w-full h-full opacity-25 font-mono text-[10px] leading-3 overflow-hidden break-all text-emerald-500/20 select-none">
            {Array(2000).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join(' ')}
        </div>
    )
}
