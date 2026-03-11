'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import KineticTypography from './effects/KineticTypography'
import Link from 'next/link'
import { ArrowRight, Calendar, MessageSquare, Zap, Compass, Shield } from 'lucide-react'
import { PRICING_PACKAGES } from '@/lib/config/pricing'

/* ─── Rotating micro-testimonials ─── */
const TESTIMONIALS = [
    { quote: "They didn't just build our site — they engineered our growth engine.", author: "CTO, Aether Analytics" },
    { quote: "The ROI was visible within the first month. Genuinely extraordinary.", author: "VP Growth, NovaPay" },
    { quote: "Working with BIGWEB was the best commercial decision we made this year.", author: "Founder, Meridian Labs" },
    { quote: "Our conversion rate tripled after launch. The team is world-class.", author: "CMO, Pulse Commerce" },
    { quote: "For the first time, our website actually works as a sales tool.", author: "CEO, Vanguard Capital" },
]

/* ─── Stats for bottom strip ─── */
const QUICK_STATS = [
    { value: '$2B+', label: 'Revenue Generated' },
    { value: '+340%', label: 'Avg. Conversion Uplift' },
    { value: '98%', label: 'Client Retention Rate' },
]

function RotatingTestimonial() {
    const [index, setIndex] = useState(0)
    useEffect(() => {
        const t = setInterval(() => setIndex(i => (i + 1) % TESTIMONIALS.length), 4500)
        return () => clearInterval(t)
    }, [])

    return (
        <div className="h-20 flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center px-4"
                >
                    <p className="text-sm text-zinc-400 italic mb-2">
                        &ldquo;{TESTIMONIALS[index].quote}&rdquo;
                    </p>
                    <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-600">
                        — {TESTIMONIALS[index].author}
                    </span>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

/* ─── Ambient Particles ─── */
function AmbientParticles() {
    const [mounted, setMounted] = useState(false)
    const particles = useRef(
        Array.from({ length: 24 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 1.5 + 0.5,
            dur: Math.random() * 15 + 12,
            delay: Math.random() * 6,
        }))
    )
    useEffect(() => setMounted(true), [])
    if (!mounted) return null

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.current.map(p => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-accent"
                    style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, opacity: 0 }}
                    animate={{ y: [0, -80, 0], opacity: [0, 0.2, 0] }}
                    transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
                />
            ))}
        </div>
    )
}

/* ─── Options row ─── */
const OPTIONS = PRICING_PACKAGES.map(pkg => ({
    icon: pkg.icon,
    title: pkg.outcome,
    description: pkg.description,
    cta: pkg.price,
    href: pkg.ctaLink,
    primary: pkg.highlighted,
    color: pkg.color,
    packageName: pkg.name,
}))

/* ─── Main Export ─── */
export default function FinalCTA() {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef as any, { once: true, margin: '-80px' })

    const { scrollYProgress } = useScroll({
        target: sectionRef as any,
        offset: ['start end', 'end start'],
    })
    const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

    return (
        <section
            ref={sectionRef}
            className="relative py-32 md:py-44 bg-[#040404] overflow-hidden"
        >
            {/* Background photo with parallax */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{ y: bgY }}
            >
                <div
                    className="absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        filter: 'grayscale(1)',
                    }}
                />
            </motion.div>

            {/* Layered ambient effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] rounded-full"
                    style={{ background: 'radial-gradient(ellipse, rgba(212,168,83,0.05) 0%, transparent 70%)' }} />
                <div className="absolute inset-0"
                    style={{ background: 'linear-gradient(to bottom, #040404 0%, transparent 30%, transparent 70%, #040404 100%)' }} />
                <AmbientParticles />
            </div>

            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

            <div className="container mx-auto px-6 lg:px-16 relative z-10">

                {/* Headline block */}
                <div className="text-center max-w-4xl mx-auto mb-20 md:mb-24">
                    {/* Availability badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl mb-12"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400">
                            Currently accepting <span className="text-emerald-400">3 projects</span> — Q2 2026
                        </span>
                    </motion.div>

                    {/* Main headline */}
                    <KineticTypography
                        segments={[
                            { text: 'Command your market. ' },
                            { text: "Let's architect\nyour monopoly.", className: 'italic text-shimmer' }
                        ]}
                        as="h2"
                        className="font-display text-4xl md:text-6xl lg:text-7xl tracking-tight text-white leading-[1.02] mb-8"
                    />

                    {/* Sub-copy */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-lg md:text-xl text-zinc-400 leading-relaxed max-w-2xl mx-auto"
                    >
                        The world's most ambitious brands trust us to build the digital systems that drive their growth. Join them — or watch your competitors move in.
                    </motion.p>
                </div>

                {/* Engagement Options */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.9, delay: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 max-w-5xl mx-auto"
                >
                    {OPTIONS.map((opt, i) => {
                        const Icon = opt.icon
                        return (
                            <motion.div
                                key={opt.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.7, delay: 0.6 + i * 0.12 }}
                                className={`card-glimmer relative group rounded-2xl border p-7 transition-all duration-500 flex flex-col ${opt.primary
                                    ? 'border-accent/30 bg-accent/[0.04]'
                                    : 'border-white/[0.06] bg-white/[0.015] hover:border-white/[0.12] hover:bg-white/[0.03]'
                                    }`}
                            >
                                {/* Top color line */}
                                <div
                                    className="absolute top-0 left-6 right-6 h-[1px] opacity-60"
                                    style={{ background: `linear-gradient(90deg, transparent, ${opt.color}, transparent)` }}
                                />

                                {/* Icon */}
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                                    style={{ background: `${opt.color}18`, border: `1px solid ${opt.color}30` }}
                                >
                                    <Icon className="w-4 h-4" style={{ color: opt.color }} />
                                </div>

                                <h3 className="text-base font-semibold text-white mb-2 tracking-tight">{opt.title}</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed flex-1 mb-6">{opt.description}</p>

                                <Link
                                    href={opt.href}
                                    className={`btn-magnetic inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full text-sm font-semibold transition-all duration-300 ${opt.primary
                                        ? 'bg-accent text-black hover:bg-accent/90'
                                        : 'border border-white/[0.1] text-white hover:bg-white/[0.06] hover:border-white/[0.2]'
                                        }`}
                                >
                                    {opt.cta}
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Trust signals */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.7, delay: 0.9 }}
                    className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-12"
                >
                    {[
                        { icon: '🔒', text: '30-day guarantee' },
                        { icon: '👤', text: 'Senior team only' },
                        { icon: '⚡', text: 'No long contracts' },
                        { icon: '🚀', text: '8–12 week delivery' },
                    ].map((s) => (
                        <div key={s.text} className="flex items-center gap-2">
                            <span>{s.icon}</span>
                            <span className="text-xs font-mono uppercase tracking-[0.15em] text-zinc-500">{s.text}</span>
                        </div>
                    ))}
                </motion.div>

                {/* Rotating testimonial */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1, delay: 1.1 }}
                    className="mb-20"
                >
                    <RotatingTestimonial />
                </motion.div>

                {/* Stats strip */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.2 }}
                    className="border-t border-white/[0.04] pt-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 md:divide-x md:divide-white/[0.04]"
                >
                    {QUICK_STATS.map((stat) => (
                        <div key={stat.label} className="text-center md:px-8">
                            <div className="text-2xl md:text-3xl font-black tracking-tighter text-white mb-1">{stat.value}</div>
                            <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}
