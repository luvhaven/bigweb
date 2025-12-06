import Image from 'next/image'
import { motion } from 'framer-motion'
import { useState } from 'react'

interface BrandLogoProps {
    className?: string
    variant?: 'full' | 'symbol'
    color?: string
}

export default function BrandLogo({ className = "", variant = 'full', color = "#FF6B35" }: BrandLogoProps) {
    // Using the user-provided SVG logo

    if (variant === 'symbol') {
        // For the symbol variant, we'll use the SVG Pulse W which matches the logo perfectly
        // This ensures crisp scaling for small icons
        return (
            <svg viewBox="0 0 80 60" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                    d="M 10 30 L 20 30 L 30 55 L 40 5 L 50 55 L 60 5 L 70 30 L 80 30"
                    stroke={color}
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                        filter: 'drop-shadow(0 0 8px rgba(255, 107, 53, 0.5))'
                    }}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                />
            </svg>
        )
    }

    return (
        <div className={`relative ${className}`}>
            <div className="flex items-center h-full">
                <Image
                    src="/logo.svg"
                    alt="BIGWEB"
                    width={500}
                    height={100}
                    className="h-full w-auto object-contain"
                    priority
                />
            </div>
        </div>
    )
}
