'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface BrandLogoProps {
    className?: string
    variant?: 'full' | 'symbol' | 'pulse'
    color?: string
    logoUrl?: string | null
    showIcon?: boolean
}

export default function BrandLogo({ className = "", variant = 'full', color = "#FF6B35", logoUrl = null, showIcon = true }: BrandLogoProps) {
    // Neural Growth Animation
    const pathVariants: any = {
        initial: { pathLength: 0, opacity: 1 },
        animate: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop" as const,
                repeatDelay: 0
            }
        }
    }

    const symbolVariants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: {
            opacity: 1,
            scale: 1,
            transition: { duration: 1.5, ease: "easeOut" }
        }
    }

    const glowVariants = {
        initial: { opacity: 0.3 },
        animate: {
            opacity: [0.3, 0.6, 0.3],
            transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }
    }

    if (variant === 'pulse' || variant === 'symbol') {
        return (
            <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                    d="M 10 50 L 25 50 L 35 80 L 50 20 L 65 80 L 75 20 L 85 50 L 100 50"
                    stroke={color}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    variants={pathVariants}
                    initial="initial"
                    animate="animate"
                />
            </svg>
        )
    }

    return (
        <div className={`flex items-center gap-4 relative ${className} group cursor-pointer`}>
            {showIcon && (
                <div className="relative flex items-center">
                    <div className="relative w-10 h-10 flex items-center justify-center bg-zinc-950 border border-zinc-900 overflow-hidden group-hover:border-orange-600/50 transition-colors duration-500">
                        <motion.div
                            className="absolute inset-0 bg-orange-600/20 blur-xl"
                            animate={{ opacity: [0.2, 0.5, 0.2] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-orange-600 relative z-10">
                            <motion.path
                                d="M2 12H6L9 20L15 4L18 12H22"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="square"
                                strokeLinejoin="miter"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 1.5, ease: "circOut" }}
                            />
                        </svg>
                    </div>
                </div>
            )}

            <div className={`flex flex-col justify-center`}>
                <div className="flex items-center gap-0.5 leading-none relative overflow-hidden">
                    <span className="text-xl md:text-2xl font-black tracking-[-0.08em] uppercase text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-500 transition-all duration-300">
                        BIGWEB
                    </span>
                    <span className="text-xl md:text-2xl font-black tracking-[-0.08em] uppercase text-orange-600 relative">
                        DIGITAL
                        <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </span>
                </div>
                <div className="flex items-center mt-2">
                    <div className="h-[1px] w-4 bg-orange-600/50 mr-2 group-hover:w-8 transition-all duration-500" />
                    <span className="text-[9px] font-mono font-bold tracking-[0.4em] leading-none uppercase text-zinc-600 whitespace-nowrap group-hover:text-zinc-400 transition-colors">
                        CONVERSION LAB
                    </span>
                </div>
            </div>
        </div>
    )
}

