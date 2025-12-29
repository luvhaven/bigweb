'use client'

import React, { useRef, useState, useEffect, useId } from 'react'
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
        // Global mouse move handler
        const handleGlobalMouseMove = (e: MouseEvent) => {
            if (!ref.current) return

            const rect = ref.current.getBoundingClientRect()

            // Check if mouse is near or inside the component (optional optimization, 
            // but for this specific "flashlight" effect we usually want it to track 
            // relative to the component even if outside, or clamp it. 
            // For now, we track exact relative position.)

            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            mouseX.set(x)
            mouseY.set(y)
        }

        // Initialize center position
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect()
            mouseX.set(rect.width / 2)
            mouseY.set(rect.height / 2)
        }

        window.addEventListener('mousemove', handleGlobalMouseMove)
        return () => window.removeEventListener('mousemove', handleGlobalMouseMove)
    }, [mouseX, mouseY])

    const maskImage = useMotionTemplate`radial-gradient(${revealSize}px at ${smoothX}px ${smoothY}px, black, transparent), radial-gradient(${revealSize * 0.6}px at ${smoothX}px ${smoothY}px, black, transparent)`

    return (
        <div
            ref={ref}
            className={`relative overflow-hidden ${className}`}
        // pointer-events-none is handled by parent, but we don't rely on onMouseMove here anymore
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

import { NeuralMind } from './reveal-patterns/NeuralMind'
import { AliveData } from './reveal-patterns/AliveData'
import { RevenueFlow } from './reveal-patterns/RevenueFlow'

export const RevealPatterns = {
    // Legacy/Simple Patterns
    Grid: () => (
        <div className="absolute inset-0 w-full h-full opacity-60">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808066_1px,transparent_1px),linear-gradient(to_bottom,#80808066_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
    ),
    Gradient: () => (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-emerald-500/10 via-purple-500/10 to-blue-500/10 animate-pulse mix-blend-screen" />
    ),
    Particles: () => <NeuralMind themeColor="#cbd5e1" />, // Default generic neural

    // New Sentient Patterns
    Circuit: () => <NeuralMind themeColor="#3b82f6" />, // Blue Neural for Tech
    Hexagon: () => <RevenueFlow themeColor="#f59e0b" />, // Gold Flow for Revenue
    Data: () => <AliveData themeColor="#10b981" />,      // Green Matrix for Data
    Waves: () => <NeuralMind themeColor="#8b5cf6" />,    // Purple Neural for Creative
    Plus: () => <RevenueFlow themeColor="#ec4899" />,    // Pink Flow for Mobile
    Stripes: () => <AliveData themeColor="#06b6d4" />,   // Cyan Matrix for SEO

    // Themed Patterns for Perfect Matching
    Creative: () => <NeuralMind themeColor="#22c55e" />, // Green Neural for UI/UX
    Mobile: () => <RevenueFlow themeColor="#a855f7" />,  // Purple Flow for Apps
    Insights: () => <AliveData themeColor="#6366f1" />,  // Indigo Matrix for Analytics

    // Direct Access (for explicit usage) - High-End Effects
    Neural: () => <NeuralMind themeColor="#10b981" />,    // Default: Emerald for AI
    Matrix: () => <AliveData themeColor="#10b981" />,      // Default: Emerald for Data
    Flow: () => <RevenueFlow themeColor="#f59e0b" />       // Default: Gold for Revenue
}
