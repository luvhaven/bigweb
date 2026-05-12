'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useSpring, useMotionValue } from 'framer-motion'

/* ── types ── */
export interface PremiumHeroProps {
    eyebrow?: string
    headline: string
    headlineAccent?: string
    subheadline?: string
    accentColor?: string
    children?: React.ReactNode
    minHeight?: string
}

/* ── Mesh / orb background (self-contained) ── */
function MeshBackground({ color = '#d4a853' }: { color: string }) {
    const containerRef = useRef<HTMLDivElement>(null)
    const rawX = useMotionValue(0.5)
    const rawY = useMotionValue(0.5)
    const orbX = useSpring(rawX, { stiffness: 25, damping: 18 })
    const orbY = useSpring(rawY, { stiffness: 25, damping: 18 })

    // Derive orb position as CSS %
    const [pos, setPos] = useState({ x: '50%', y: '30%' })
    useEffect(() => {
        const unsub1 = orbX.on('change', v => setPos(p => ({ ...p, x: `${v * 100}%` })))
        const unsub2 = orbY.on('change', v => setPos(p => ({ ...p, y: `${v * 100}%` })))
        return () => { unsub1(); unsub2() }
    }, [orbX, orbY])

    useEffect(() => {
        const onMove = (e: MouseEvent) => {
            const w = window.innerWidth, h = window.innerHeight
            rawX.set(e.clientX / w)
            rawY.set(e.clientY / h)
        }
        window.addEventListener('mousemove', onMove, { passive: true })
        return () => window.removeEventListener('mousemove', onMove)
    }, [rawX, rawY])

    // hex → r,g,b for rgba()
    const toRgb = (hex: string) => {
        const h = hex.startsWith('#') ? hex : '#d4a853'
        return `${parseInt(h.slice(1, 3), 16)},${parseInt(h.slice(3, 5), 16)},${parseInt(h.slice(5, 7), 16)}`
    }
    const rgb = toRgb(color)

    return (
        <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            {/* Base */}
            <div className="absolute inset-0 bg-[#030303]" />

            {/* Noise film */}
            <div className="absolute inset-0 opacity-[0.04] mix-blend-soft-light"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: '180px 180px' }}
            />

            {/* Grid */}
            <div className="absolute inset-0 opacity-[0.025]"
                style={{ backgroundImage: `linear-gradient(rgba(${rgb},0.18) 1px,transparent 1px),linear-gradient(90deg,rgba(${rgb},0.18) 1px,transparent 1px)`, backgroundSize: '72px 72px' }}
            />

            {/* Scanline sweep */}
            <motion.div
                className="absolute inset-x-0 h-[1px] opacity-[0.18]"
                style={{ background: `linear-gradient(90deg,transparent,rgba(${rgb},1),transparent)` }}
                animate={{ top: ['-1%', '101%'] }}
                transition={{ duration: 5, ease: 'linear', repeat: Infinity, repeatDelay: 7 }}
            />

            {/* Mouse-tracking primary orb */}
            <div
                className="absolute rounded-full transition-none"
                style={{
                    width: '700px', height: '700px',
                    left: pos.x, top: pos.y,
                    transform: 'translate(-50%, -50%)',
                    background: `radial-gradient(circle, rgba(${rgb},0.10) 0%, transparent 70%)`,
                    filter: 'blur(90px)',
                    willChange: 'left,top',
                }}
            />

            {/* Static atmospheric orbs */}
            <motion.div className="absolute rounded-full"
                style={{ width: 500, height: 500, right: '-8%', top: '5%', background: `radial-gradient(circle,rgba(${rgb},0.08) 0%,transparent 70%)`, filter: 'blur(110px)' }}
                animate={{ scale: [1, 1.18, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity }}
            />
            <motion.div className="absolute rounded-full"
                style={{ width: 400, height: 400, left: '25%', bottom: '-8%', background: 'radial-gradient(circle,rgba(99,102,241,0.05) 0%,transparent 70%)', filter: 'blur(120px)' }}
                animate={{ scale: [1, 1.22, 1], opacity: [0.5, 0.85, 0.5] }}
                transition={{ duration: 11, ease: 'easeInOut', repeat: Infinity, delay: 2 }}
            />

            {/* Floating micro-particles */}
            {[
                { left: '18%', top: '25%', size: 2.5, delay: 0 },
                { left: '32%', top: '55%', size: 2, delay: 0.8 },
                { left: '62%', top: '20%', size: 3, delay: 1.5 },
                { left: '75%', top: '60%', size: 2, delay: 0.4 },
                { left: '45%', top: '75%', size: 2.5, delay: 2.1 },
                { left: '85%', top: '35%', size: 2, delay: 1.0 },
            ].map((p, i) => (
                <motion.div key={i} className="absolute rounded-full"
                    style={{ width: p.size, height: p.size, left: p.left, top: p.top, background: `rgba(${rgb},0.45)` }}
                    animate={{ y: [0, -18, 0], opacity: [0.25, 0.75, 0.25] }}
                    transition={{ duration: 4 + i * 0.7, ease: 'easeInOut', repeat: Infinity, delay: p.delay }}
                />
            ))}

            {/* Vignette */}
            <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 130% 100% at 50% 50%,transparent 35%,rgba(3,3,3,0.65) 100%)' }} />
            <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-[#030303] to-transparent" />
        </div>
    )
}

/* ── Main export ── */
export default function PremiumHero({
    eyebrow,
    headline,
    headlineAccent,
    subheadline,
    accentColor = '#d4a853',
    children,
    minHeight = 'min-h-screen',
}: PremiumHeroProps) {
    const [mounted, setMounted] = useState(false)
    useEffect(() => { const t = setTimeout(() => setMounted(true), 16); return () => clearTimeout(t) }, [])

    const toRgb = (hex: string) => {
        const h = hex.startsWith('#') ? hex : '#d4a853'
        return `${parseInt(h.slice(1, 3), 16)},${parseInt(h.slice(3, 5), 16)},${parseInt(h.slice(5, 7), 16)}`
    }
    const rgb = toRgb(accentColor)

    return (
        <section className={`relative ${minHeight} flex flex-col justify-center border-b border-white/[0.04] overflow-hidden`}>
            <MeshBackground color={accentColor} />

            <div className="relative z-10 container mx-auto px-6 lg:px-16 max-w-7xl pt-32 pb-24">
                {/* Eyebrow */}
                {eyebrow && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={mounted ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border mb-8"
                        style={{ borderColor: `rgba(${rgb},0.28)`, background: `rgba(${rgb},0.07)` }}
                    >
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inset-0 rounded-full opacity-75" style={{ background: accentColor }} />
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5" style={{ background: accentColor }} />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.28em]" style={{ color: accentColor }}>
                            {eyebrow}
                        </span>
                    </motion.div>
                )}

                {/* Headline — both lines in a SINGLE overflow wrapper = zero layout gap */}
                <div className="overflow-hidden mb-8">
                    <motion.h1
                        initial={{ y: '108%' }}
                        animate={mounted ? { y: '0%' } : {}}
                        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}
                        className="font-display font-black tracking-tighter text-white uppercase"
                        style={{ fontSize: 'clamp(2.8rem, 6.5vw, 6rem)', lineHeight: 0.9 }}
                    >
                        {headline}
                        {headlineAccent && (
                            <span className="block italic" style={{ color: accentColor }}>
                                {headlineAccent}
                            </span>
                        )}
                    </motion.h1>
                </div>

                {/* Subheadline */}
                {subheadline && (
                    <motion.p
                        initial={{ opacity: 0, y: 18 }}
                        animate={mounted ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.45 }}
                        className="text-zinc-400 text-lg md:text-xl leading-relaxed max-w-xl mb-12"
                    >
                        {subheadline}
                    </motion.p>
                )}

                {/* Slot for custom content (trust grid, stats, CTAs…) */}
                {children && (
                    <motion.div
                        initial={{ opacity: 0, y: 18 }}
                        animate={mounted ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.62 }}
                    >
                        {children}
                    </motion.div>
                )}
            </div>

            {/* Scroll hint */}
            <motion.div
                initial={{ opacity: 0 }} animate={mounted ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 1.3 }}
                className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
            >
                <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-zinc-700">Scroll</span>
                <motion.div className="w-px h-7"
                    style={{ background: `linear-gradient(to bottom,rgba(${rgb},0.5),transparent)` }}
                    animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
                />
            </motion.div>
        </section>
    )
}
