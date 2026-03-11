'use client'

import React, { useRef, useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import {
    motion,
    useScroll,
    useTransform,
    useInView,
    AnimatePresence,
    useMotionValue,
    useSpring,
    stagger,
    animate as motionAnimate,
} from 'framer-motion'
import {
    ArrowRight, ArrowUpRight, TrendingUp, Target, Shield, Layers,
    BarChart3, Zap, CheckCircle, Star, Users, Globe, Cpu, Clock,
    ChevronRight, Play, Award, Sparkles, ExternalLink
} from 'lucide-react'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const PROJECTS = [
    {
        slug: 'nexus-flow',
        client: 'Nexus Analytics',
        title: 'The 127% SaaS Funnel Rebuild',
        category: 'SaaS · Conversion Architecture',
        tagline: 'A pricing page that became the highest-converting asset in the company.',
        summary: 'Complete architectural rebuild of a multi-tenant analytics platform funnel. Eliminated cognitive friction in the pricing matrix and streamlined the path-to-upgrade.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
        accentColor: '#6366f1',
        year: '2025',
        duration: '8 weeks',
        results: [
            { value: '+127%', label: 'Trial → Paid Conversion' },
            { value: '$1.2M', label: 'Incremental ARR' },
            { value: '-34%', label: 'Churn Rate' },
        ],
        tags: ['Revenue System', 'UX Design', 'Conversion'],
        featured: true,
        size: 'hero',
    },
    {
        slug: 'vortex-pay',
        client: 'Vortex Systems',
        title: 'Fintech Funnel Re-Engineering',
        category: 'FinTech · Payment Infrastructure',
        tagline: 'KYC friction eliminated. Revenue unlocked at scale.',
        summary: 'Surgical friction extraction from a high-frequency payment gateway. Reduced identity verification drop-off by 64% through redesigned UX and optimized API feedback loops.',
        image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2074&auto=format&fit=crop',
        accentColor: '#10b981',
        year: '2025',
        duration: '6 weeks',
        results: [
            { value: '+64%', label: 'KYC Completion' },
            { value: '2.8×', label: 'User Engagement' },
            { value: '-41%', label: 'Support Tickets' },
        ],
        tags: ['Fix Sprint', 'API Design', 'FinTech'],
        featured: false,
        size: 'medium',
    },
    {
        slug: 'aether-insights',
        client: 'Aether AI',
        title: 'AI Revenue Engine Build',
        category: 'AI / SaaS · Product Design',
        tagline: 'Moving the AHA! moment from demo call to first page visit.',
        summary: 'Turned complex AI analytics into actionable conversions through an interactive live prototype embedded directly on the landing page.',
        image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=2032&auto=format&fit=crop',
        accentColor: '#a855f7',
        year: '2025',
        duration: '10 weeks',
        results: [
            { value: '400%', label: 'SQL Increase' },
            { value: '$4.2M', label: 'Attributed Pipeline' },
            { value: '3.1×', label: 'Demo-to-Close' },
        ],
        tags: ['Revenue Website', 'AI', 'Pipeline'],
        featured: false,
        size: 'medium',
    },
    {
        slug: 'elevate-commerce',
        client: 'Elevate Group',
        title: 'Luxury Retail Scale to $10M ARR',
        category: 'Luxury E-Commerce · Brand',
        tagline: 'Every pixel designed to justify a premium price point.',
        summary: 'Designed the "Boutique Digital" experience. Revenue milestone hit in 90 days after launch through minimal friction and maximal trust architecture.',
        image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
        accentColor: '#d4a853',
        year: '2025',
        duration: '12 weeks',
        results: [
            { value: '$10M', label: 'ARR Milestone' },
            { value: '+340%', label: 'Conversion Rate' },
            { value: '+22%', label: 'Average Order Value' },
        ],
        tags: ['Revenue Website', 'E-Commerce', 'Brand'],
        featured: false,
        size: 'large',
    },
    {
        slug: 'vanguard-capital',
        client: 'Vanguard Capital',
        title: '3.5× Authority Lead-Gen System',
        category: 'Institutional Finance · Brand',
        tagline: '$18M in institutional commitments from a redesigned digital presence.',
        summary: 'Built institutional trust through strategic typography and intent-based lead capture. Turned a generic landing page into a capital allocation magnet.',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
        accentColor: '#f59e0b',
        year: '2024',
        duration: '4 weeks',
        results: [
            { value: '300%', label: 'SQL Increase' },
            { value: '$18M', label: 'Commitments', },
            { value: '-63%', label: 'Cost Per Acquisition' },
        ],
        tags: ['Conversion Diagnostic', 'Finance', 'Brand'],
        featured: false,
        size: 'medium',
    },
    {
        slug: 'antro-logistics',
        client: 'Antro Global',
        title: 'B2B Fulfillment Conversion Fix',
        category: 'B2B Logistics · SaaS',
        tagline: 'Complex B2B value made instantly visible. Sales cycle collapsed.',
        summary: 'Built a real-time shipping telemetry dashboard that converted cold leads into long-term retainers by making complex value instantly visual.',
        image: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=2070&auto=format&fit=crop',
        accentColor: '#00d4ff',
        year: '2025',
        duration: '5 weeks',
        results: [
            { value: '3×', label: 'Lead-to-Demo Rate' },
            { value: '58%', label: 'Faster Sales Cycle' },
            { value: '+$2.1M', label: 'New Pipeline' },
        ],
        tags: ['Conversion Diagnostic', 'B2B', 'Dashboard'],
        featured: false,
        size: 'medium',
    },
]

const GLOBAL_STATS = [
    { value: '$2B+', label: 'Revenue Influenced', icon: TrendingUp },
    { value: '3.2×', label: 'Avg. Conversion Lift', icon: Target },
    { value: '200+', label: 'Brands Scaled', icon: Layers },
    { value: '98%', label: 'Client Retention', icon: Shield },
    { value: '40+', label: 'Countries Served', icon: Globe },
    { value: '6 yrs', label: 'Market Leadership', icon: Award },
]

const TESTIMONIALS = [
    { quote: "They didn't just build our site — they engineered our growth engine. Pipeline tripled in 90 days.", author: 'CTO, Aether Analytics', avatar: 'AE' },
    { quote: 'The ROI was visible within the first month. The team is genuinely world-class.', author: 'VP Growth, Vortex Systems', avatar: 'VS' },
    { quote: 'For the first time ever, our website actually works as a sales tool.', author: 'CEO, Vanguard Capital', avatar: 'VC' },
    { quote: 'Working with BIGWEB was the best commercial decision we made this year. Conversion rate tripled.', author: 'CMO, Elevate Group', avatar: 'EG' },
]

const METHODOLOGY = [
    {
        num: '01',
        icon: BarChart3,
        title: 'Forensic Audit',
        desc: 'We dissect every data point — heatmaps, session recordings, funnel analytics — to locate the exact revenue leaks before touching a single pixel.',
        metric: '2–3 days',
        metricLabel: 'avg. audit duration',
        color: '#6366f1',
    },
    {
        num: '02',
        icon: Cpu,
        title: 'Precision Architecture',
        desc: 'Every design decision is backed by behavioral psychology and tied to a measurable conversion outcome. Zero guesswork, maximum velocity.',
        metric: '2–12 wks',
        metricLabel: 'avg. build timeline',
        color: '#10b981',
    },
    {
        num: '03',
        icon: Zap,
        title: 'Velocity Launch',
        desc: 'We deploy fast without cutting corners. Performance-engineered code that loads in under 1 second and converts from visit one.',
        metric: '<1 sec',
        metricLabel: 'avg. load time',
        color: '#d4a853',
    },
    {
        num: '04',
        icon: TrendingUp,
        title: 'Verified Results',
        desc: '30, 60, and 90-day post-launch reviews ensure your investment keeps compounding — not just spikes at launch and then flatlines.',
        metric: '90 days',
        metricLabel: 'to guaranteed ROI',
        color: '#ec4899',
    },
]

const WHY_BIGWEB = [
    { icon: Award, text: 'Senior-only team — no juniors, no outsourcing' },
    { icon: Target, text: 'Revenue-obsessed, not pixel-obsessed' },
    { icon: Clock, text: 'Fixed-price, fixed-timeline — no scope creep' },
    { icon: Shield, text: '30-day performance guarantee, unconditional' },
    { icon: Zap, text: 'Sub-second load times, guaranteed in writing' },
    { icon: Users, text: 'Direct access to your lead engineer, always' },
]

/* ─────────────────────────────────────────
   UTILITIES / ATOMS
───────────────────────────────────────── */
function AnimatedCounter({ target, duration = 2 }: { target: string; duration?: number }) {
    const [displayed, setDisplayed] = useState('0')
    const ref = useRef<HTMLSpanElement>(null)
    const inView = useInView(ref, { once: true })
    useEffect(() => {
        if (!inView) return
        const numMatch = target.match(/[\d.]+/)
        if (!numMatch) { setDisplayed(target); return }
        const num = parseFloat(numMatch[0])
        const prefix = target.slice(0, target.indexOf(numMatch[0]))
        const suffix = target.slice(target.indexOf(numMatch[0]) + numMatch[0].length)
        let start = 0
        const steps = 50
        const inc = num / steps
        const timer = setInterval(() => {
            start += inc
            if (start >= num) { setDisplayed(target); clearInterval(timer) }
            else {
                const val = num < 10 ? start.toFixed(1) : Math.floor(start).toString()
                setDisplayed(`${prefix}${val}${suffix}`)
            }
        }, (duration * 1000) / steps)
        return () => clearInterval(timer)
    }, [inView, target, duration])
    return <span ref={ref}>{displayed}</span>
}

/* ─────────────────────────────────────────
   HERO SECTION
───────────────────────────────────────── */
function WorkHero() {
    const heroRef = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: heroRef })
    const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
    const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

    const titleLines = ['Our', 'Work', 'Speaks.']

    return (
        <section ref={heroRef} className="relative min-h-screen flex flex-col justify-end pb-24 md:pb-36 overflow-hidden">
            {/* Background */}
            <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/40 to-background z-10" />
                <div className="absolute top-0 left-0 right-0 h-full"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center top',
                        opacity: 0.07,
                        filter: 'grayscale(1)',
                    }}
                />
                {/* Orbs */}
                <div className="absolute top-1/4 left-1/3 w-[700px] h-[700px] bg-accent/[0.04] blur-[200px] rounded-full" />
                <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-indigo-500/[0.03] blur-[180px] rounded-full" />
            </motion.div>

            {/* Micro-grid */}
            <div className="absolute inset-0 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)', backgroundSize: '80px 80px' }} />

            <motion.div style={{ opacity }} className="container mx-auto px-6 lg:px-16 relative z-20">
                {/* Overline badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="flex items-center gap-3 mb-14 pt-44"
                >
                    <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
                        </span>
                        <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-400">
                            Evidence Registry · {PROJECTS.length} Case Studies
                        </span>
                    </div>
                </motion.div>

                {/* Main headline — staggered reveal */}
                <div className="mb-16">
                    {titleLines.map((line, i) => (
                        <div key={i} className="overflow-hidden">
                            <motion.div
                                initial={{ y: '110%', opacity: 0 }}
                                animate={{ y: '0%', opacity: 1 }}
                                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.1 }}
                            >
                                <span className={`block text-[17vw] md:text-[12vw] xl:text-[10rem] font-black font-display tracking-tighter leading-[0.85] uppercase
                                    ${i === 0 ? 'text-white' : i === 1 ? 'text-accent italic' : 'text-zinc-700 italic'}`}>
                                    {line}
                                </span>
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* Sub-row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.8 }}
                    className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 max-w-6xl"
                >
                    <div className="max-w-lg">
                        <p className="text-xl text-zinc-400 leading-relaxed">
                            Real outcomes. Verified numbers. Every project below is a business transformation — measurable revenue impact, not estimates.
                        </p>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                        <Link
                            href="/offers/revenue-roadmap"
                            className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-white text-black font-black text-[13px] uppercase tracking-[0.1em] hover:bg-accent transition-colors duration-300 shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                        >
                            Start Your Project
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-white font-black text-[13px] uppercase tracking-[0.1em] hover:bg-white/[0.06] transition-all duration-300 backdrop-blur-sm"
                        >
                            Talk to a Strategist
                        </Link>
                    </div>
                </motion.div>
            </motion.div>

            {/* Scroll cue */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            >
                <motion.div
                    className="w-[1px] h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent"
                    animate={{ scaleY: [0, 1, 0], originY: 0 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className="text-[9px] font-mono text-zinc-700 uppercase tracking-[0.3em]">Scroll</span>
            </motion.div>
        </section>
    )
}

/* ─────────────────────────────────────────
   STATS STRIP
───────────────────────────────────────── */
function StatsStrip() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })

    return (
        <section ref={ref} className="py-0 border-y border-white/[0.04] bg-card relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/[0.02] to-transparent" />
            <div className="flex overflow-x-auto scrollbar-hide">
                <div className="flex divide-x divide-white/[0.04] min-w-full">
                    {GLOBAL_STATS.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 16 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: i * 0.07 }}
                            className="flex-1 min-w-[140px] px-6 py-8 flex flex-col items-center text-center group hover:bg-white/[0.01] transition-colors"
                        >
                            <stat.icon className="w-4 h-4 text-accent/30 mb-3 group-hover:text-accent transition-colors" />
                            <div className="text-2xl md:text-3xl font-black font-display text-white tracking-tighter mb-1">
                                <AnimatedCounter target={stat.value} />
                            </div>
                            <div className="text-[9px] text-zinc-600 uppercase tracking-wider font-bold">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ─────────────────────────────────────────
   FEATURED PROJECT — HERO CARD
───────────────────────────────────────── */
function FeaturedProjectCard({ project }: { project: typeof PROJECTS[0] }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-5%' })
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 60 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
        >
            <Link
                href={`/case-studies/${project.slug}`}
                className="group block relative overflow-hidden rounded-[2rem] md:rounded-[2.5rem] border border-white/[0.06] hover:border-white/[0.12] transition-all duration-700"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                {/* Image */}
                <div className="relative h-[65vh] md:h-[80vh] overflow-hidden">
                    <motion.div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${project.image})` }}
                        animate={{ scale: hovered ? 1.04 : 1 }}
                        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

                    {/* Top accent + meta */}
                    <motion.div
                        className="absolute top-0 left-0 right-0 h-[2px]"
                        style={{ background: `linear-gradient(to right, transparent, ${project.accentColor}, transparent)` }}
                        animate={{ opacity: hovered ? 1 : 0 }}
                        transition={{ duration: 0.6 }}
                    />

                    <div className="absolute top-8 left-8 right-8 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 bg-black/50 backdrop-blur-md" style={{ color: project.accentColor }}>
                                Featured
                            </span>
                            <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/10 bg-black/50 backdrop-blur-md text-zinc-400">
                                {project.tags[0]}
                            </span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-600">{project.year}</span>
                    </div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-14 lg:p-20">
                        <div className="text-[11px] font-black uppercase tracking-[0.3em] mb-4" style={{ color: project.accentColor }}>
                            {project.client} · {project.category}
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[0.88] italic mb-6 max-w-4xl">
                            {project.title}
                        </h2>
                        <p className="text-base md:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-10 hidden md:block">
                            {project.summary}
                        </p>

                        {/* Results */}
                        <div className="flex flex-wrap items-center gap-4 md:gap-6">
                            {project.results.map((r, i) => (
                                <div key={i} className="px-5 py-3 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-md">
                                    <div className="text-xl md:text-2xl font-black" style={{ color: i === 0 ? project.accentColor : 'white' }}>{r.value}</div>
                                    <div className="text-[9px] text-zinc-500 uppercase tracking-wider font-bold mt-0.5">{r.label}</div>
                                </div>
                            ))}
                            <div className="ml-auto hidden md:flex items-center gap-2 text-[12px] font-black uppercase tracking-[0.25em] text-zinc-400 group-hover:text-white transition-colors">
                                View Case Study
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

/* ─────────────────────────────────────────
   PROJECT LIST ROW (selected work style)
───────────────────────────────────────── */
function ProjectListRow({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-5%' })
    const [hovered, setHovered] = useState(false)

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.06 }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="group border-t border-white/[0.05] last:border-b hover:border-white/[0.12] transition-colors duration-500"
        >
            <Link href={`/case-studies/${project.slug}`} className="block py-10 md:py-14">
                <div className="flex items-center gap-8 md:gap-16">
                    {/* Index */}
                    <span className="hidden md:block text-sm font-mono text-zinc-700 group-hover:text-accent transition-colors w-8 shrink-0">
                        {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* Thumbnail */}
                    <div className="w-20 h-14 md:w-28 md:h-20 rounded-xl overflow-hidden shrink-0 border border-white/[0.05]">
                        <motion.img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            animate={{ scale: hovered ? 1.08 : 1 }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        />
                    </div>

                    {/* Title */}
                    <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-black uppercase tracking-[0.25em] mb-2" style={{ color: project.accentColor }}>
                            {project.client}
                        </div>
                        <h3 className="text-xl md:text-3xl lg:text-4xl font-black text-white tracking-tight italic leading-tight group-hover:translate-x-2 transition-transform duration-500">
                            {project.title}
                        </h3>
                    </div>

                    {/* Result + category */}
                    <div className="hidden lg:flex items-center gap-12">
                        <div className="text-right">
                            <div className="text-2xl font-black" style={{ color: project.accentColor }}>{project.results[0].value}</div>
                            <div className="text-[9px] text-zinc-600 uppercase tracking-wider font-bold">{project.results[0].label}</div>
                        </div>
                        <div>
                            <div className="text-sm text-zinc-500">{project.category}</div>
                            <div className="text-[10px] font-mono text-zinc-700 mt-1">{project.duration}</div>
                        </div>
                    </div>

                    {/* Arrow */}
                    <motion.div
                        animate={{ x: hovered ? 0 : -4, opacity: hovered ? 1 : 0.3 }}
                        transition={{ duration: 0.3 }}
                        className="shrink-0"
                    >
                        <div className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center group-hover:border-white/20 group-hover:bg-white/[0.06] transition-all">
                            <ArrowUpRight className="w-4 h-4 text-white" />
                        </div>
                    </motion.div>
                </div>
            </Link>
        </motion.div>
    )
}

/* ─────────────────────────────────────────
   BENTO GRID — Secondary Projects
───────────────────────────────────────── */
function BentoProjectCard({ project, span }: { project: typeof PROJECTS[0]; span?: 'full' | 'half' | 'third' }) {
    const ref = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: true, margin: '-5%' })
    const [hovered, setHovered] = useState(false)

    const spanClass = span === 'full' ? 'md:col-span-2' : span === 'third' ? 'md:col-span-1' : 'md:col-span-1'

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={spanClass}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Link href={`/case-studies/${project.slug}`} className="group flex flex-col h-full min-h-[420px] overflow-hidden rounded-[1.5rem] border border-white/[0.05] hover:border-white/[0.12] bg-white/[0.01] hover:bg-white/[0.025] transition-all duration-500 relative">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                    <motion.div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${project.image})` }}
                        animate={{ scale: hovered ? 1.06 : 1 }}
                        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                    <motion.div
                        className="absolute top-0 left-0 right-0 h-[2px]"
                        style={{ background: `linear-gradient(90deg, transparent, ${project.accentColor}80, transparent)` }}
                        animate={{ opacity: hovered ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                    />

                    <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                        <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border border-white/10 bg-black/60 backdrop-blur-md text-zinc-400">
                            {project.tags[0]}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-600">{project.year}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 p-6 md:p-8">
                    <div className="text-[10px] font-black uppercase tracking-[0.25em] mb-2" style={{ color: project.accentColor }}>
                        {project.client}
                    </div>
                    <h3 className="text-lg md:text-xl font-black text-white tracking-tight italic leading-tight mb-3 group-hover:text-zinc-100 transition-colors flex-none">
                        {project.title}
                    </h3>
                    <p className="text-sm text-zinc-500 leading-relaxed flex-1 line-clamp-3 mb-6">
                        {project.tagline}
                    </p>

                    <div className="pt-5 border-t border-white/[0.04] flex items-center justify-between">
                        <div className="flex gap-4">
                            <div>
                                <div className="text-lg font-black" style={{ color: project.accentColor }}>{project.results[0].value}</div>
                                <div className="text-[9px] text-zinc-600 uppercase tracking-wider font-bold">{project.results[0].label}</div>
                            </div>
                        </div>
                        <motion.div
                            animate={{ x: hovered ? 0 : -4, opacity: hovered ? 1 : 0.4 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ArrowUpRight className="w-5 h-5 text-white" />
                        </motion.div>
                    </div>
                </div>

                {/* Hover accent bottom */}
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: `linear-gradient(to right, transparent, ${project.accentColor}50, transparent)` }}
                    animate={{ opacity: hovered ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                />
            </Link>
        </motion.div>
    )
}

/* ─────────────────────────────────────────
   METHODOLOGY
───────────────────────────────────────── */
function MethodologySection() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-10%' })

    return (
        <section ref={ref} className="py-28 md:py-40 relative overflow-hidden border-y border-white/[0.04]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-accent/[0.025] blur-[200px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-16 relative">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8 }}
                        className="max-w-xl"
                    >
                        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] mb-7">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-accent">Our Process</span>
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic leading-[1.0]">
                            How results<br />
                            <span className="text-zinc-600">get made.</span>
                        </h2>
                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-zinc-500 text-lg leading-relaxed max-w-sm lg:text-right"
                    >
                        Every BIGWEB engagement follows the same forensic → build → verify system. No exceptions, no shortcuts.
                    </motion.p>
                </div>

                {/* Steps */}
                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-px bg-white/[0.04]">
                    {METHODOLOGY.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group bg-card hover:bg-secondary transition-colors duration-500 p-10 md:p-12 relative overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }} />

                            <div className="flex items-start justify-between mb-10">
                                <span className="text-[72px] font-black leading-none text-white/[0.03] select-none">{step.num}</span>
                                <div className="w-10 h-10 rounded-xl flex items-center justify-center mt-1"
                                    style={{ background: `${step.color}15`, border: `1px solid ${step.color}30` }}>
                                    <step.icon className="w-5 h-5 transition-colors" style={{ color: step.color }} />
                                </div>
                            </div>
                            <h3 className="text-xl md:text-2xl font-black text-white italic tracking-tight mb-4">{step.title}</h3>
                            <p className="text-zinc-500 leading-relaxed text-sm mb-10">{step.desc}</p>
                            <div className="pt-6 border-t border-white/[0.04]">
                                <div className="text-xl font-black" style={{ color: step.color }}>{step.metric}</div>
                                <div className="text-[10px] text-zinc-700 uppercase tracking-wider font-bold mt-1">{step.metricLabel}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ─────────────────────────────────────────
   TESTIMONIALS STRIP
───────────────────────────────────────── */
function TestimonialsSection() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-10%' })

    return (
        <section ref={ref} className="py-28 md:py-36 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background" />
            <div className="container mx-auto px-6 lg:px-16 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] mb-7">
                        <Star className="w-3 h-3 text-accent" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-500">Client Verdict</span>
                    </div>
                    <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-tighter italic">
                        What our clients say.
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-5">
                    {TESTIMONIALS.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                            className="group p-8 md:p-10 rounded-2xl border border-white/[0.05] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.1] transition-all duration-500"
                        >
                            <div className="flex gap-1 mb-6">
                                {[0, 1, 2, 3, 4].map(s => (
                                    <Star key={s} className="w-3.5 h-3.5 fill-accent text-accent" />
                                ))}
                            </div>
                            <p className="text-lg text-zinc-300 italic leading-relaxed mb-8">&ldquo;{t.quote}&rdquo;</p>
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full border border-white/10 bg-accent/10 flex items-center justify-center text-[12px] font-black text-accent">
                                    {t.avatar}
                                </div>
                                <span className="text-sm font-semibold text-zinc-400">{t.author}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ─────────────────────────────────────────
   WHY BIGWEB — AUTHORITY STRIP
───────────────────────────────────────── */
function AuthoritySection() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-10%' })

    return (
        <section ref={ref} className="py-28 md:py-36 border-y border-white/[0.04] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/[0.02] blur-[200px] rounded-full" />
            <div className="container mx-auto px-6 lg:px-16 relative">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    {/* Left */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] mb-8">
                            <Sparkles className="w-3 h-3 text-accent" />
                            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-accent">The BIGWEB Difference</span>
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic leading-[1.0] mb-8">
                            Built by the<br />
                            <span className="text-zinc-600">world's best.</span>
                        </h2>
                        <p className="text-zinc-500 text-lg leading-relaxed mb-10 max-w-md">
                            We are not a typical agency. We are a world-class team of senior engineers, strategic designers, and conversion specialists — operating with the precision of a product studio and the hunger of a startup.
                        </p>
                        <Link
                            href="/about"
                            className="group inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
                        >
                            <span className="relative">
                                Meet the team
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-500" />
                            </span>
                            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </motion.div>

                    {/* Right */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.9, delay: 0.2 }}
                        className="space-y-3"
                    >
                        {WHY_BIGWEB.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                animate={inView ? { opacity: 1, x: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
                                className="group flex items-center gap-4 p-5 rounded-xl border border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.02] transition-all duration-400"
                            >
                                <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 bg-accent/10 border border-accent/20 group-hover:bg-accent/20 transition-colors">
                                    <item.icon className="w-4 h-4 text-accent" />
                                </div>
                                <span className="text-zinc-300 text-sm font-medium">{item.text}</span>
                                <CheckCircle className="w-4 h-4 text-emerald-500/60 ml-auto shrink-0" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

/* ─────────────────────────────────────────
   FINAL CTA
───────────────────────────────────────── */
function WorkPageCTA() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-10%' })

    return (
        <section ref={ref} className="py-36 md:py-52 relative overflow-hidden">
            {/* BG */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full"
                    style={{ background: 'radial-gradient(ellipse, rgba(212,168,83,0.06) 0%, transparent 70%)' }} />
                <div className="absolute inset-0"
                    style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/25 to-transparent" />

            <div className="container mx-auto px-6 lg:px-16 relative text-center">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full border border-accent/20 bg-accent/[0.04] mb-14">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-zinc-400">
                            Currently accepting <span className="text-emerald-400">3 projects</span> — Q2 2026
                        </span>
                    </div>

                    {/* Headline */}
                    <div className="mb-8">
                        {['Want results', 'like these?'].map((line, i) => (
                            <div key={i} className="overflow-hidden">
                                <motion.div
                                    initial={{ y: '110%' }}
                                    animate={inView ? { y: '0%' } : {}}
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.1 }}
                                >
                                    <span className={`block text-5xl md:text-7xl lg:text-[6rem] font-black font-display tracking-tighter leading-[0.88] uppercase italic
                                        ${i === 0 ? 'text-white' : 'text-accent'}`}>
                                        {line}
                                    </span>
                                </motion.div>
                            </div>
                        ))}
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto mb-16 leading-relaxed"
                    >
                        Start with a Revenue Roadmap — a forensic audit of your platform&apos;s conversion potential. Clear plan, measurable targets, in 72 hours.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.65 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="/offers/revenue-roadmap"
                            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl bg-white text-black font-black text-[13px] uppercase tracking-[0.15em] hover:bg-accent transition-all duration-300 shadow-[0_0_50px_rgba(255,255,255,0.08)] hover:shadow-[0_0_60px_rgba(212,168,83,0.25)]"
                        >
                            <Target className="w-4 h-4" />
                            Get My Revenue Roadmap
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/contact"
                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] text-white font-black text-[13px] uppercase tracking-[0.15em] hover:bg-white/[0.06] hover:border-white/[0.15] transition-all duration-300 backdrop-blur-sm"
                        >
                            Speak with a Strategist
                        </Link>
                    </motion.div>

                    {/* Trust micro-badges */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="flex flex-wrap items-center justify-center gap-8 mt-14"
                    >
                        {[
                            { icon: '🔒', text: '30-day guarantee' },
                            { icon: '👤', text: 'Senior team only' },
                            { icon: '⚡', text: 'No long contracts' },
                            { icon: '🚀', text: '8–12 week delivery' },
                        ].map((b) => (
                            <div key={b.text} className="flex items-center gap-2">
                                <span>{b.icon}</span>
                                <span className="text-[11px] font-mono uppercase tracking-[0.15em] text-zinc-600">{b.text}</span>
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

/* ─────────────────────────────────────────
   PAGE ASSEMBLY
───────────────────────────────────────── */
export default function CaseStudiesPage() {
    const featuredProject = PROJECTS[0]
    const listProjects = PROJECTS.slice(1, 4)
    const bentoProjects = PROJECTS.slice(3)

    const listRef = useRef(null)
    const listInView = useInView(listRef, { once: true })

    return (
        <main className="min-h-screen bg-background text-white overflow-x-hidden selection:bg-accent/20 selection:text-white">
            <AdvancedNavigation />

            {/* 1. CINEMATIC HERO */}
            <WorkHero />

            {/* 2. STATS STRIP */}
            <StatsStrip />

            {/* 3. FEATURED PROJECT */}
            <section className="py-20 md:py-32">
                <div className="container mx-auto px-6 lg:px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-4 mb-10"
                    >
                        <div className="w-10 h-[1px] bg-accent/50" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Flagship Work</span>
                    </motion.div>
                    <FeaturedProjectCard project={featuredProject} />
                </div>
            </section>

            {/* 4. PROJECT LIST ROWS */}
            <section className="pb-24 md:pb-32" ref={listRef}>
                <div className="container mx-auto px-6 lg:px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={listInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="flex items-center justify-between mb-6"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-[1px] bg-zinc-700" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Selected Work</span>
                        </div>
                        <span className="hidden md:block text-[10px] font-mono text-zinc-700">{listProjects.length} projects</span>
                    </motion.div>

                    {listProjects.map((p, i) => (
                        <ProjectListRow key={p.slug} project={p} index={i} />
                    ))}
                </div>
            </section>

            {/* 5. BENTO GRID — remaining projects */}
            <section className="pb-24 md:pb-32">
                <div className="container mx-auto px-6 lg:px-16">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-4 mb-12"
                    >
                        <div className="w-10 h-[1px] bg-zinc-700" />
                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">More Projects</span>
                    </motion.div>
                    <div className="grid md:grid-cols-2 gap-5">
                        {bentoProjects.map((p, i) => (
                            <BentoProjectCard key={p.slug} project={p} />
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. METHODOLOGY */}
            <MethodologySection />

            {/* 7. TESTIMONIALS */}
            <TestimonialsSection />

            {/* 8. WHY BIGWEB */}
            <AuthoritySection />

            {/* 9. CTA */}
            <WorkPageCTA />

            <Footer />
        </main>
    )
}
