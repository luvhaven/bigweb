'use client'

import { motion } from 'framer-motion'

interface BrandLogoProps {
    className?: string
    variant?: 'full' | 'symbol' | 'pulse'
    color?: string
    logoUrl?: string | null
    showIcon?: boolean
    animate?: boolean
    size?: 'sm' | 'md' | 'lg'
}

export default function BrandLogo({
    className = '',
    variant = 'full',
    logoUrl,
    animate = true,
    size = 'md',
}: BrandLogoProps) {
    // If a custom logo image is uploaded, show it
    if (logoUrl) {
        return (
            <div className={`flex items-center ${className}`}>
                <img src={logoUrl} alt="BIGWEB" className="h-7 w-auto object-contain" />
            </div>
        )
    }

    // Symbol only — just the accent bar + B mark
    if (variant === 'symbol') {
        return (
            <div className={`flex items-center gap-1 ${className}`}>
                {/* Accent bar */}
                <motion.span
                    initial={animate ? { scaleY: 0 } : false}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="block w-[3px] h-5 rounded-full origin-bottom"
                    style={{ background: 'hsl(38 56% 52%)' }}
                />
                <span
                    className="font-black text-lg text-white tracking-[-0.04em] leading-none"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                >
                    B
                </span>
            </div>
        )
    }

    const wordmarkSize = size === 'sm' ? '14px' : size === 'lg' ? '21px' : '17px'
    const subtitleSize = size === 'sm' ? '8px' : size === 'lg' ? '11px' : '9.5px'
    const barHeight = size === 'sm' ? '18px' : size === 'lg' ? '28px' : '22px'

    return (
        <motion.div
            className={`flex items-center gap-2.5 select-none ${className}`}
            initial={animate ? { opacity: 0, x: -8 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* The premium accent bar — lives just before the wordmark */}
            <div className="flex items-center gap-[5px]">
                {/* Vertical bar — the visual anchor, signals precision + authority */}
                <motion.span
                    initial={animate ? { scaleY: 0, opacity: 0 } : false}
                    animate={{ scaleY: 1, opacity: 1 }}
                    transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="block rounded-full origin-bottom shrink-0"
                    style={{
                        width: '3px',
                        height: barHeight,
                        background: 'linear-gradient(180deg, hsl(40 52% 65%), hsl(38 56% 52%) 60%, hsl(36 58% 38%))',
                        boxShadow: '0 0 8px hsl(38 56% 52% / 0.6)',
                    }}
                />

                {/* BIGWEB + DIGITAL stacked wordmark — mirrors Redstone Software pattern */}
                <motion.div
                    initial={animate ? { opacity: 0, x: -4 } : false}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.55, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col leading-none gap-[1.5px]"
                >
                    {/* Primary wordmark */}
                    <span
                        className="text-white leading-none"
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 800,
                            fontSize: wordmarkSize,
                            letterSpacing: '-0.04em',
                        }}
                    >
                        BIGWEB
                    </span>
                    {/* Sub-label — exactly like REDSTONE / SOFTWARE */}
                    <span
                        className="leading-none tracking-[0.22em] uppercase"
                        style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 500,
                            fontSize: subtitleSize,
                            color: 'hsl(38 56% 52%)',
                            letterSpacing: '0.22em',
                        }}
                    >
                        DIGITAL
                    </span>
                </motion.div>
            </div>
        </motion.div>
    )
}
