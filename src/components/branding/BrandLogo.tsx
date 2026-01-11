import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface BrandLogoProps {
    className?: string
    variant?: 'full' | 'symbol'
    color?: string
}

export default function BrandLogo({ className = "", variant = 'full', color = "#FF6B35" }: BrandLogoProps) {
    // Digital Pulse Animation on Load
    const pathVariants = {
        initial: { pathLength: 0, opacity: 0 },
        animate: {
            pathLength: 1,
            opacity: 1,
            transition: {
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop" as const,
                repeatDelay: 3
            } as any
        }
    }

    if (variant === 'symbol') {
        return (
            <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                    d="M 10 50 L 25 50 L 35 80 L 50 20 L 65 80 L 75 20 L 85 50 L 100 50"
                    stroke={color}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        filter: `drop-shadow(0 0 8px ${color}80)`
                    }}
                    variants={pathVariants}
                    initial="initial"
                    animate="animate"
                />
            </svg>
        )
    }

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <div className="shrink-0 relative">
                <svg viewBox="0 0 100 100" className="h-[2.8rem] w-auto transition-transform duration-500 group-hover:scale-105" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                        d="M 10 50 L 25 50 L 35 80 L 50 20 L 65 80 L 75 20 L 85 50 L 100 50"
                        stroke={color}
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        variants={pathVariants}
                        initial="initial"
                        animate="animate"
                    />
                </svg>
            </div>

            <div className="flex flex-col justify-center border-l-2 border-border/30 pl-3 py-1">
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-[800] tracking-[-0.04em] leading-[0.8] uppercase text-foreground">
                        BIGWEB
                    </span>
                    <span className="text-[1.1rem] font-medium tracking-[0.15em] leading-[0.8] uppercase opacity-90" style={{ color: color }}>
                        DIGITAL
                    </span>
                </div>
                <div className="text-[10px] font-bold tracking-[0.4em] leading-none uppercase text-muted-foreground mt-3 whitespace-nowrap opacity-60">
                    The Conversion Lab
                </div>
            </div>
        </div>
    )
}
