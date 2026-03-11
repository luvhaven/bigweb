'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import gsap from 'gsap'

/* ─── Rich brand mix: popular + niche, high-quality PNG sources ─── */
const defaultClients = [
    { name: 'Kōyō Dynamics', logo_url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><text x="10" y="25" font-family="sans-serif" font-weight="900" font-size="18" fill="white">KŌYŌ</text></svg>' },
    { name: 'Al-Zahra Tech', logo_url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><text x="10" y="25" font-family="sans-serif" font-weight="900" font-size="16" fill="white">AL-ZAHRA</text></svg>' },
    { name: 'Lumière Systems', logo_url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><text x="10" y="25" font-family="sans-serif" font-weight="900" font-size="16" fill="white">LUMIÈRE</text></svg>' },
    { name: 'Nairobi Innovate', logo_url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 40"><text x="10" y="25" font-family="sans-serif" font-weight="900" font-size="15" fill="white">NAIROBI LABS</text></svg>' },
    { name: 'Astraeus Capital', logo_url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 40"><text x="10" y="25" font-family="serif" font-weight="900" font-size="18" fill="white">ASTRAEUS</text></svg>' },
    { name: 'Zeng Group', logo_url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><text x="10" y="25" font-family="sans-serif" font-weight="900" font-size="18" fill="white">ZENG 集团</text></svg>' },
    { name: 'Valkyrie Nordic', logo_url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><text x="10" y="25" font-family="sans-serif" font-weight="900" font-size="16" fill="white">VALKYRIE</text></svg>' },
    { name: 'Ocelot Solutions', logo_url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><text x="10" y="25" font-family="sans-serif" font-weight="900" font-size="18" fill="white">OCELOT</text></svg>' },
    { name: 'Baobab Finance', logo_url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><circle cx="20" cy="20" r="10" fill="white"/><text x="35" y="25" font-family="sans-serif" font-weight="900" font-size="15" fill="white">BAOBAB</text></svg>' },
    { name: 'Taranis Aero', logo_url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><path d="M10 30 L20 10 L30 30 Z" fill="white"/><text x="35" y="25" font-family="sans-serif" font-weight="900" font-size="15" fill="white">TARANIS</text></svg>' },
    { name: 'Garuda Logistics', logo_url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 40"><rect x="10" y="10" width="15" height="15" fill="white"/><text x="32" y="25" font-family="sans-serif" font-weight="900" font-size="16" fill="white">GARUDA</text></svg>' },
    { name: 'Vespera Health', logo_url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><text x="10" y="25" font-family="sans-serif" font-weight="300" font-size="18" fill="white">VESPERA</text></svg>' },
    { name: 'Bukhara Textiles', logo_url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 130 40"><text x="10" y="25" font-family="serif" font-weight="400" font-size="16" fill="white">BUKHARA</text></svg>' },
    { name: 'Ananta Ventures', logo_url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><text x="10" y="25" font-family="sans-serif" font-weight="900" font-size="16" fill="white">ANANTA</text></svg>' },
    { name: 'Iroko Partners', logo_url: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40"><text x="10" y="25" font-family="sans-serif" font-weight="900" font-size="18" fill="white">IROKO</text></svg>' },
]

const defaultStats = [
    { value: '$2B+', label: 'Client Revenue Generated' },
    { value: '+340%', label: 'Avg. Conversion Uplift' },
    { value: '98%', label: 'Client Retention Rate' },
]

/* ─── Floating particles (client-only to avoid SSR hydration mismatch) ─── */
function Particles({ count = 20 }: { count?: number }) {
    const [mounted, setMounted] = useState(false)
    const particles = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 1.4 + 0.5,
                dur: Math.random() * 12 + 10,
                delay: Math.random() * 8,
                drift: (Math.random() - 0.5) * 6,
            })),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [] // generated once, client-side only
    )

    useEffect(() => { setMounted(true) }, [])

    if (!mounted) return null

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
            {particles.map(p => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-white"
                    style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0 }}
                    animate={{ y: [0, -55, 0], x: [0, p.drift, 0], opacity: [0, 0.16, 0] }}
                    transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
                />
            ))}
        </div>
    )
}

/* ─── Animated stat counter ─── */
function StatCounter({ value, label, delay }: { value: string; label: string; delay: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-1 px-8 group"
        >
            <span className="text-2xl md:text-3xl font-black tracking-tight text-white tabular-nums" style={{ fontFeatureSettings: '"tnum"' }}>
                {value}
            </span>
            <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-500 group-hover:text-zinc-400 transition-colors duration-500">
                {label}
            </span>
        </motion.div>
    )
}

/* ─── Single Marquee Row ─── */
function MarqueeRow({ items }: { items: { name: string; logo_url: string }[] }) {
    const trackRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!trackRef.current) return
        const track = trackRef.current
        const totalWidth = track.scrollWidth / 3

        const tween = gsap.to(track, {
            x: -totalWidth,
            repeat: -1,
            duration: 60,
            ease: 'none',
            modifiers: {
                x: gsap.utils.unitize(x => parseFloat(x) % totalWidth),
            },
        })

        return () => { tween.kill() }
    }, [items.length])

    const tripled = [...items, ...items, ...items]

    return (
        <div
            className="overflow-hidden"
            style={{
                maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            }}
        >
            <div ref={trackRef} className="flex gap-20 md:gap-32 items-center whitespace-nowrap py-6">
                {tripled.map((client, i) => (
                    <div key={`${client.name}-${i}`} className="flex-shrink-0 group relative cursor-pointer px-4">
                        {/* Per-logo hover glow */}
                        <div
                            className="absolute inset-[-12px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                            style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(255,255,255,0.08), transparent)' }}
                        />
                        <img
                            src={client.logo_url}
                            alt={client.name}
                            className="h-10 md:h-14 lg:h-16 w-auto object-contain transition-all duration-700 opacity-35 group-hover:opacity-100 group-hover:scale-105"
                    style={{ filter: 'brightness(10)', maxWidth: '160px' }}
                            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                        />
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                            <span className="text-[9px] font-mono uppercase tracking-[0.4em] text-accent whitespace-nowrap">
                                {client.name}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

/* ─── Main Export ─── */
interface ClientItem {
    name: string
    logo_url: string  // always provided (with fallback in getCmsClients)
}

export default function ClientMarquee({
    initialStats,
    initialClients,
}: {
    initialStats?: { value: string; label: string }[] | null
    initialClients?: ClientItem[] | null
}) {
    const [clients, setClients] = useState<ClientItem[]>(
        initialClients && initialClients.length > 0 ? initialClients : defaultClients
    )
    const [stats, setStats] = useState(initialStats && initialStats.length > 0 ? initialStats : defaultStats)

    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
    const mouseX = useMotionValue(50)
    const mouseY = useMotionValue(50)
    const springX = useSpring(mouseX, { stiffness: 60, damping: 25 })
    const springY = useSpring(mouseY, { stiffness: 60, damping: 25 })
    const spotlightX = useTransform(springX, v => `${v}%`)
    const spotlightY = useTransform(springY, v => `${v}%`)

    useEffect(() => {
        // Only fetch from API if we didn't get server-side data
        if (initialClients && initialClients.length > 0) return
        const loadClients = async () => {
            try {
                const { clientsAPI } = await import('@/lib/api/clients')
                const data = await clientsAPI.getActive()
                if (data && data.length > 0) setClients(data)
            } catch { /* fall back to defaults */ }
        }
        loadClients()
    }, [initialClients])

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set(((e.clientX - rect.left) / rect.width) * 100)
        mouseY.set(((e.clientY - rect.top) / rect.height) * 100)
    }

    return (
        <section
            ref={sectionRef}
            onMouseMove={handleMouseMove}
            className="relative py-24 md:py-32 overflow-hidden bg-[#020202] border-y border-white/[0.04]"
        >
            {/* ── Cinematic background ── */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden>
                <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255,255,255,0.015) 0%, transparent 70%)' }} />
                <motion.div
                    className="absolute w-[600px] h-[600px] rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ left: spotlightX, top: spotlightY, background: 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, transparent 70%)' }}
                />
                <div
                    className="absolute inset-0 opacity-[0.022]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
                        backgroundSize: '60px 60px',
                    }}
                />
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.3) 2px, rgba(255,255,255,0.3) 3px)' }}
                />
            </div>

            <Particles count={18} />

            {/* ── Header ── */}
            <div className="relative z-10 text-center mb-16 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center gap-4 mb-4"
                >
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-500 whitespace-nowrap">Trusted Worldwide</span>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                        Brands that chose to{' '}
                        <span className="text-zinc-500 font-light">grow differently.</span>
                    </h2>
                    <p className="text-zinc-500 text-sm leading-relaxed max-w-lg">
                        From Series A startups to Fortune 500 enterprises — one thing unites them: they don\'t accept average digital returns.
                    </p>
                </motion.div>
            </div>

            {/* ── Single marquee row ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1.4, delay: 0.4 }}
                className="relative z-10 mb-16"
            >
                <MarqueeRow items={clients} />
            </motion.div>

            {/* ── Stats bar ── */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 mx-auto max-w-3xl px-6"
            >
                <div
                    className="relative flex flex-wrap justify-center divide-x divide-white/[0.06] rounded-2xl overflow-hidden py-6 px-4"
                    style={{
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.015) 100%)',
                        border: '1px solid rgba(255,255,255,0.07)',
                        backdropFilter: 'blur(20px)',
                    }}
                >
                    <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.04), transparent)' }} />
                    {stats.map((s, i) => (
                        <StatCounter key={s.label} value={s.value} label={s.label} delay={0.65 + i * 0.1} />
                    ))}
                </div>
            </motion.div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent pointer-events-none" />
        </section>
    )
}
