'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight, TrendingUp, ArrowRight } from 'lucide-react'


// ─── Shared Fallback Data ───
const FALLBACK_PROJECTS = [
    {
        id: 'velocity-engine',
        slug: 'velocity-engine',
        title: 'Velocity Engine',
        category: 'Fintech · Revenue System',
        tagline: 'The fintech that moved money at the speed of thought.',
        cover_image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
        year: '2025',
        accent: '#10b981',
        results: [{ label: 'Transaction Speed', value: '-82%' }, { label: 'Revenue Impact', value: '+$2.4M' }],
    },
    {
        id: 'nexus-flow',
        slug: 'nexus-flow',
        title: 'Nexus Flow',
        category: 'SaaS · Conversion Strategy',
        tagline: 'A SaaS pricing page that became a growth engine.',
        cover_image_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop',
        year: '2024',
        accent: '#6366f1',
        results: [{ label: 'Enterprise Upgrades', value: '+127%' }, { label: 'Churn Reduction', value: '-34%' }],
    },
    {
        id: 'elevate-commerce',
        slug: 'elevate-commerce',
        title: 'Elevate Commerce',
        category: 'Luxury Retail · Ecommerce',
        tagline: 'Luxury commerce that commands premium prices.',
        cover_image_url: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
        year: '2025',
        accent: '#d4a853',
        results: [{ label: 'Conversion Rate', value: '+340%' }, { label: 'AOV Increase', value: '+67%' }],
    },
    {
        id: 'vanguard-capital',
        slug: 'vanguard-capital',
        title: 'Vanguard Capital',
        category: 'Institutional Finance · Brand',
        tagline: '$18M in institutional commitments from a digital presence.',
        cover_image_url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop',
        year: '2024',
        accent: '#f59e0b',
        results: [{ label: 'Lead Quality', value: '+210%' }, { label: 'Commitments', value: '$18M' }],
    },
]

function normalizeProject(p: any, fallback: (typeof FALLBACK_PROJECTS)[0]) {
    const accent = p.accent || p.accentColor || (Array.isArray(p.tech_stack) && p.tech_stack[0]) || fallback.accent
    const img = p.cover_image_url || p.hero_image_url || p.thumbnail_url || fallback.cover_image_url
    const tag = p.tagline || p.summary || p.outcome || fallback.tagline
    const yr = p.year ? p.year
        : (p.published_at && !isNaN(new Date(p.published_at).getTime()))
            ? String(new Date(p.published_at).getFullYear()) : fallback.year
    let results: { label: string; value: string }[] = []
    if (Array.isArray(p.results) && p.results.length > 0) {
        results = p.results.slice(0, 2).map((r: any) =>
            typeof r === 'object' ? { label: r.label || '', value: r.value || '' } : { label: '', value: String(r) }
        )
    }
    return {
        id: p.id || fallback.id,
        slug: p.slug || fallback.slug,
        title: p.title || fallback.title,
        category: p.category || fallback.category,
        tagline: tag,
        cover_image_url: img,
        year: yr,
        accent,
        results,
    }
}

function Metric({ label, value, color }: { label: string; value: string; color: string }) {
    return (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-sm border border-white/[0.06]">
            <TrendingUp size={10} style={{ color }} />
            <span className="text-[11px] font-bold text-white tabular-nums">{value}</span>
            <span className="text-[9px] text-zinc-500">{label}</span>
        </div>
    )
}

/* ─── The Card component taking scroll progress ─── */
function StackCard({
    project: p,
    index,
    total,
    scrollYProgress
}: {
    project: ReturnType<typeof normalizeProject>
    index: number
    total: number
    scrollYProgress: MotionValue<number>
}) {
    const [hovered, setHovered] = useState(false)

    // Each phase takes exactly 100vh. Total scroll distance is (total - 1) * 100vh.
    const progressSegments = Math.max(1, total - 1)
    const segmentWidth = 1 / progressSegments
    
    const pullUpStart = (index - 1) * segmentWidth
    const pullUpEnd = index * segmentWidth
    const shrinkStart = index * segmentWidth
    const shrinkEnd = (index + 1) * segmentWidth

    const isLast = index === total - 1
    
    // Animate from Y: 100% (below screen) to Y: 0% (centered)
    const yTransform = useTransform(
        scrollYProgress,
        [Math.max(0, pullUpStart), Math.max(0, pullUpEnd)],
        index === 0 ? ['0%', '0%'] : ['100%', '0%']
    )

    // Scale down from 1.15 to 0.65 as it's being scrolled over
    const scale = useTransform(
        scrollYProgress,
        [shrinkStart, shrinkEnd],
        isLast ? [1, 1] : [1.15, 0.65] 
    )

    // Darken it completely as the next card covers it to prevent text overlap
    const opacityTransform = useTransform(
        scrollYProgress,
        [shrinkStart, shrinkEnd],
        [1, isLast ? 1 : 0] 
    )

    return (
        <div
            className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center overflow-hidden pointer-events-none"
            style={{ zIndex: index }}
        >
            <motion.div
                style={{
                    scale,
                    opacity: opacityTransform,
                    y: yTransform,
                    transformOrigin: 'top center',
                }}
                className="w-full px-4 md:px-8 max-w-7xl mx-auto pointer-events-auto"
            >
                <Link
                    href={`/case-studies/${p.slug}`}
                    className="ep-card block relative rounded-[2rem] overflow-hidden bg-[#080808] border border-white/[0.07] shadow-[0_40px_120px_rgba(0,0,0,0.85)] group"
                    style={{
                        height: '75vh',
                        willChange: 'transform, opacity, scale',
                    }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    {/* Full bg image with grain-wash overlay */}
                    {p.cover_image_url && (
                        <div className="absolute inset-0 w-full h-full overflow-hidden">
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                style={{
                                    backgroundImage: `url(${p.cover_image_url})`,
                                    transform: hovered ? 'scale(1.08)' : 'scale(1.01)',
                                    filter: hovered ? 'brightness(0.5) saturate(1.1)' : 'brightness(0.25) saturate(0.8)',
                                }}
                            />
                            {/* Grain wash on hover */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: hovered ? 0.08 : 0 }}
                                className="absolute inset-0 pointer-events-none mix-blend-overlay"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                                }}
                            />
                        </div>
                    )}

                    {/* Content panel */}
                    <div className="absolute inset-0 flex" style={{ zIndex: 2 }}>
                        <div
                            className="w-full md:w-[60%] lg:w-[50%] h-full flex flex-col justify-between p-8 md:p-14 lg:p-16 transition-colors duration-1000"
                            style={{
                                background: 'linear-gradient(108deg, rgba(3,3,3,0.98) 0%, rgba(3,3,3,0.85) 65%, transparent 100%)',
                            }}
                        >
                            {/* Top row */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <span
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: p.accent, boxShadow: `0 0 8px ${p.accent}80` }}
                                    />
                                    <span className="text-[10px] md:text-[11px] font-mono uppercase tracking-[0.3em]" style={{ color: p.accent }}>
                                        {p.category}
                                    </span>
                                </div>
                                <span className="hidden md:inline-flex text-[10px] font-mono tracking-[0.2em] text-white/30 px-3 py-1.5 rounded-full border border-white/[0.05] backdrop-blur-md">
                                    {p.year}
                                </span>
                            </div>

                            {/* Center */}
                            <div className="flex-1 flex flex-col justify-center py-8">
                                <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-zinc-600 mb-6 flex items-center gap-4">
                                    <span className="w-12 h-px bg-zinc-800" />
                                    Exhibit {String(index + 1).padStart(2, '0')}
                                </span>
                                <h3 className="font-display text-4xl md:text-5xl lg:text-[84px] text-white leading-[0.92] tracking-tighter mb-8 drop-shadow-2xl">
                                    {p.title}
                                </h3>
                                <p className="text-zinc-500 text-sm md:text-base lg:text-[18px] leading-relaxed max-w-sm hidden sm:block font-light italic border-l border-white/10 pl-6">
                                    {p.tagline}
                                </p>
                            </div>

                            {/* Bottom */}
                            <div className="flex flex-col gap-6">
                                {p.results.length > 0 && (
                                    <div className="flex flex-wrap gap-2.5">
                                        {p.results.map((r, ri) => (
                                            <Metric key={ri} label={r.label} value={r.value} color={p.accent} />
                                        ))}
                                    </div>
                                )}
                                <div className="flex items-center gap-5 mt-2">
                                    <div
                                        className="w-12 h-12 lg:w-14 lg:h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                        style={{
                                            background: p.accent,
                                            transform: hovered ? 'scale(1.15) rotate(-5deg)' : 'scale(1)',
                                        }}
                                    >
                                        <ArrowUpRight className="w-5 h-5 lg:w-6 lg:h-6 text-black" />
                                    </div>
                                    <div>
                                        <p className="text-[9px] text-zinc-500 uppercase tracking-[0.3em] font-mono mb-1">Deep dive</p>
                                        <p className="text-sm font-bold tracking-[0.2em] uppercase text-white/70 group-hover:text-white transition-colors duration-300 drop-shadow-lg">
                                            Read Case Study
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Gradient Border Line */}
                    <div
                        className="absolute top-0 left-0 right-0 h-[1px] z-[3] transition-opacity duration-700"
                        style={{
                            background: `linear-gradient(90deg, ${p.accent}00 5%, ${p.accent} 35%, ${p.accent} 65%, ${p.accent}00 95%)`,
                            opacity: hovered ? 1 : 0.2,
                        }}
                    />

                    {/* Big Watermark Number */}
                    <span
                        className="absolute bottom-4 right-6 font-mono font-black leading-none select-none pointer-events-none"
                        style={{
                            fontSize: 'clamp(80px, 15vw, 180px)',
                            color: `${p.accent}06`,
                            zIndex: 1,
                        }}
                    >
                        {String(index + 1).padStart(2, '0')}
                    </span>
                </Link>
            </motion.div>
        </div>
    )
}

export default function ElitePortfolio({
    title = 'Selected Work',
    showViewAll = true,
    initialProjects = [],
}: {
    title?: string
    showViewAll?: boolean
    initialProjects?: any[]
}) {
    const raw = initialProjects.length > 0 ? initialProjects : FALLBACK_PROJECTS
    const projects = raw.map((p, i) => normalizeProject(p, FALLBACK_PROJECTS[i % FALLBACK_PROJECTS.length]))

    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end end'],
    })

    return (
        <section className="bg-[#020202] text-white relative">
            {/* Header stays untouched */}
            <div className="relative pt-24 md:pt-32 pb-8 px-6 lg:px-16 container mx-auto">
                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="w-8 h-[1px] bg-accent" />
                            <span className="text-[10px] font-mono uppercase tracking-[0.32em] text-accent">{title}</span>
                        </div>
                        <h2 className="font-display text-4xl md:text-5xl lg:text-[64px] tracking-tight leading-[1.05] text-white">
                            Engineered{' '}
                            <em className="not-italic text-zinc-600 font-display">
                                for impact.
                            </em>
                        </h2>
                    </div>
                </div>
            </div>

            {/* Scrolling container — height is dynamic based on number of cards to allow scroll room */}
            <div
                ref={containerRef}
                className="relative"
                style={{
                    // Height = 100vh for each card + ending margin
                    height: `${projects.length * 100}vh`,
                }}
            >
                {/* 
                  Sticky container tracking the cards in the window view 
                  It holds the cards relative to the viewport.
                */}
                <div className="sticky top-0 h-screen w-full overflow-hidden">
                    {projects.map((p, i) => (
                        <StackCard
                            key={p.id}
                            project={p}
                            index={i}
                            total={projects.length}
                            scrollYProgress={scrollYProgress}
                        />
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 bg-[#020202] py-24 px-6 lg:px-16 container mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/[0.04]">
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-700">
                        {projects.length} elite transformations
                    </p>
                    {showViewAll && (
                        <Link
                            href="/case-studies"
                            className="flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white transition-colors group px-6 py-3 rounded-full border border-white/[0.06] hover:border-white/[0.15] hover:bg-white/[0.02]"
                        >
                            View Full Portfolio
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    )}
                </div>
            </div>
        </section>
    )
}
