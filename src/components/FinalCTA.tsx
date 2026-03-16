'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import KineticTypography from './effects/KineticTypography'
import AnimatedMissingLetter from './effects/AnimatedMissingLetter'
import { InfiniteMarquee } from './effects/InfiniteMarquee'
import SplitTextReveal from './effects/SplitTextReveal'
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

const MARQUEE_ITEMS = ['Website Engineering', 'Mobile Products', 'UI/UX Design', 'Revenue Systems', 'AI Automation', 'SEO Authority', 'Analytics Intelligence', 'Performance Optimization']
const MARQUEE_ITEMS_2 = ['340% Conversion Uplift', '$2B+ Revenue Generated', '200+ Projects', '98% Retention Rate', 'Fortune 500 Clients', 'Next.js Specialists', 'World-Class Engineering', 'Results-First Approach']

function RotatingTestimonial() {
    const [index, setIndex] = useState(0)
    useEffect(() => {
        const t = setInterval(() => setIndex(i => (i + 1) % TESTIMONIALS.length), 4500)
        return () => clearInterval(t)
    }, [])

    return (
        <div className="h-24 flex items-center justify-center">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center px-4 max-w-xl"
                >
                    <p className="text-sm text-zinc-400 italic mb-3">
                        &ldquo;{TESTIMONIALS[index].quote}&rdquo;
                    </p>
                    <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600">
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
                    animate={{ y: [0, -80, 0], opacity: [0, 0.15, 0] }}
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
            className="relative bg-[#030303] overflow-hidden"
        >
            {/* ─── Infinite Marquee Band Top ─── */}
            <div className="border-y border-white/[0.04] py-5 overflow-hidden">
                <InfiniteMarquee
                    items={MARQUEE_ITEMS}
                    speed={55}
                    separator="/"
                    className=""
                    itemClassName="text-[11px] font-mono uppercase tracking-[0.35em] text-zinc-600 px-8"
                />
            </div>

            {/* ─── Hero CTA Block ─── */}
            <div className="relative py-32 md:py-44">
                {/* Background photo with parallax */}
                <motion.div
                    className="absolute inset-0 pointer-events-none"
                    style={{ y: bgY }}
                >
                    <div
                        className="absolute inset-0 opacity-[0.06]"
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
                        style={{ background: 'radial-gradient(ellipse, rgba(212,168,83,0.06) 0%, transparent 70%)' }} />
                    <div className="absolute inset-0"
                        style={{ background: 'linear-gradient(to bottom, #030303 0%, transparent 30%, transparent 70%, #030303 100%)' }} />
                    <AmbientParticles />
                </div>

                {/* Top accent line */}
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

                <div className="container mx-auto px-6 lg:px-16 relative z-10">

                    {/* Headline block */}
                    <div className="text-center max-w-5xl mx-auto mb-20 md:mb-28">
                        {/* Availability badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl mb-16"
                        >
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-400">
                                Currently accepting <span className="text-emerald-400">3 projects</span> — Q2 2026
                            </span>
                        </motion.div>

                        {/* Main headline - Split text reveal */}
                        <div className="overflow-hidden mb-8">
                            <SplitTextReveal
                                text="Command your market."
                                as="h2"
                                className="font-display text-5xl md:text-7xl lg:text-[6.5rem] tracking-tight text-white leading-[0.95] block"
                                mode="slide"
                                delay={0.2}
                                staggerChildren={0.06}
                            />
                        </div>
                        <div className="overflow-hidden mb-12">
                            <SplitTextReveal
                                text="Let's architect your monopoly."
                                as="h2"
                                className="font-display text-5xl md:text-7xl lg:text-[6.5rem] tracking-tight leading-[0.95] block italic"
                                wordClassName="text-accent/80"
                                mode="slide"
                                delay={0.4}
                                staggerChildren={0.06}
                            />
                        </div>

                        {/* Sub-copy */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="text-lg md:text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto"
                        >
                            The world's most ambitious brands trust us to build the digital systems that drive their growth. Join them — or watch your competitors move in.
                        </motion.p>
                    </div>

                    {/* Engagement Options */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.9, delay: 0.9 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-20 max-w-5xl mx-auto"
                    >
                        {OPTIONS.map((opt, i) => {
                            const Icon = opt.icon
                            return (
                                <motion.div
                                    key={opt.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.7, delay: 1.0 + i * 0.1 }}
                                    className={`relative group rounded-2xl border p-8 transition-all duration-500 flex flex-col ${opt.primary
                                        ? 'border-accent/30 bg-accent/[0.03]'
                                        : 'border-white/[0.05] bg-white/[0.01] hover:border-white/[0.1] hover:bg-white/[0.025]'
                                        }`}
                                >
                                    {/* Top color accent line */}
                                    <div
                                        className="absolute top-0 left-6 right-6 h-px opacity-60"
                                        style={{ background: `linear-gradient(90deg, transparent, ${opt.color}, transparent)` }}
                                    />

                                    <div
                                        className="w-11 h-11 rounded-2xl flex items-center justify-center mb-6"
                                        style={{ background: `${opt.color}12`, border: `1px solid ${opt.color}25` }}
                                    >
                                        <Icon className="w-5 h-5" style={{ color: opt.color }} />
                                    </div>

                                    <h3 className="text-base font-semibold text-white mb-2 tracking-tight group-hover:text-accent/90 transition-colors duration-500">{opt.title}</h3>
                                    <p className="text-sm text-zinc-600 leading-relaxed flex-1 mb-7">{opt.description}</p>

                                    <Link
                                        href={opt.href}
                                        data-cursor="View"
                                        className={`inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${opt.primary
                                            ? 'bg-accent text-black hover:bg-accent/90 hover:scale-105'
                                            : 'border border-white/[0.08] text-zinc-400 hover:bg-white/[0.05] hover:border-white/[0.15] hover:text-white'
                                            }`}
                                    >
                                        {opt.cta}
                                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                                    </Link>
                                </motion.div>
                            )
                        })}
                    </motion.div>

                    {/* Trust signals */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 1.3 }}
                        className="flex flex-wrap items-center justify-center gap-8 md:gap-12 mb-16"
                    >
                        {[
                            { icon: '🔒', text: '30-day guarantee' },
                            { icon: '👤', text: 'Senior team only' },
                            { icon: '⚡', text: 'No long contracts' },
                            { icon: '🚀', text: '8–12 week delivery' },
                        ].map((s) => (
                            <div key={s.text} className="flex items-center gap-2.5">
                                <span>{s.icon}</span>
                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600">{s.text}</span>
                            </div>
                        ))}
                    </motion.div>

                    {/* Rotating testimonial */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 1, delay: 1.5 }}
                        className="mb-24"
                    >
                        <RotatingTestimonial />
                    </motion.div>

                    {/* Stats strip */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 1.6 }}
                        className="border-t border-white/[0.04] pt-12 grid grid-cols-3 gap-8 md:gap-0 md:divide-x md:divide-white/[0.04] max-w-3xl mx-auto"
                    >
                        {[
                            { value: '$2B+', label: 'Revenue Generated' },
                            { value: '+340%', label: 'Avg Conversion Uplift' },
                            { value: '98%', label: 'Client Retention Rate' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center md:px-8">
                                <div className="text-2xl md:text-3xl font-black tracking-tighter text-white mb-1">{stat.value}</div>
                                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600">{stat.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* ─── Infinite Marquee Band Bottom ─── */}
            <div className="border-t border-white/[0.04] py-5 overflow-hidden">
                <InfiniteMarquee
                    items={MARQUEE_ITEMS_2}
                    speed={50}
                    direction="right"
                    separator="·"
                    itemClassName="text-[11px] font-mono uppercase tracking-[0.35em] text-zinc-700 px-8"
                />
            </div>
        </section>
    )
}
