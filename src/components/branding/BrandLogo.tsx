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
    if (logoUrl) {
        return (
            <div className={`flex items-center ${className}`}>
                <img src={logoUrl} alt="BIGWEB" className="h-7 w-auto object-contain" />
            </div>
        )
    }

    if (variant === 'symbol') {
        return (
            <div className={`flex items-center ${className}`}>
                <BrandMark animate={animate} size={size} />
            </div>
        )
    }

    const wordmarkPx = size === 'sm' ? 14 : size === 'lg' ? 22 : 17
    const subtitlePx = size === 'sm' ? 7.5 : size === 'lg' ? 11 : 9
    const barH = size === 'sm' ? 17 : size === 'lg' ? 28 : 22

    return (
        <motion.div
            className={`flex items-center gap-[9px] select-none ${className}`}
            initial={animate ? { opacity: 0, x: -10 } : false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* The B mark — geometric square with cut corner */}
            <BrandMark animate={animate} size={size} />

            {/* Wordmark block */}
            <motion.div
                initial={animate ? { opacity: 0, x: -6 } : false}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col leading-none"
                style={{ gap: '2px' }}
            >
                {/* BIGWEB */}
                <span
                    className="text-white leading-none tracking-tighter"
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 900,
                        fontSize: `${wordmarkPx}px`,
                        letterSpacing: '-0.045em',
                    }}
                >
                    BIGWEB
                </span>
                {/* DIGITAL — spaced accent underline */}
                <span
                    className="leading-none"
                    style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                        fontSize: `${subtitlePx}px`,
                        letterSpacing: '0.32em',
                        color: 'hsl(38 56% 52%)',
                        textTransform: 'uppercase',
                    }}
                >
                    DIGITAL
                </span>
            </motion.div>
        </motion.div>
    )
}

/** Isolated geometric brand mark — the "BW" diamond cut square */
export function BrandMark({ animate = true, size = 'md' }: { animate?: boolean; size?: 'sm' | 'md' | 'lg' }) {
    const s = size === 'sm' ? 22 : size === 'lg' ? 36 : 28

    return (
        <motion.div
            initial={animate ? { opacity: 0, scale: 0.7 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ width: s, height: s, flexShrink: 0 }}
        >
            <svg
                width={s}
                height={s}
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Background square with cut top-right corner */}
                <path
                    d="M2 2 H20 L26 8 V26 H2 Z"
                    fill="hsl(38 56% 52%)"
                />
                {/* Corner cut fold — depth triangle */}
                <path
                    d="M20 2 L26 8 L20 8 Z"
                    fill="hsl(36 58% 38%)"
                />
                {/* BW letterform — two vertical bars + diagonal strike */}
                <rect x="6" y="8" width="2.5" height="11" rx="0.5" fill="#0a0a0a" />
                <rect x="11.5" y="8" width="2.5" height="11" rx="0.5" fill="#0a0a0a" />
                <rect x="18" y="8" width="2.5" height="11" rx="0.5" fill="#0a0a0a" />
                {/* The slanted cross bar connecting B and W */}
                <line x1="8.5" y1="13.5" x2="20.5" y2="9" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" />
                <line x1="8.5" y1="13.5" x2="20.5" y2="19" stroke="#0a0a0a" strokeWidth="2" strokeLinecap="round" />
            </svg>
        </motion.div>
    )
}
