'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight, Code2, Palette, BarChart3, Search, Smartphone, Zap, Brain, Shield, Layers, TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import KineticTypography from './effects/KineticTypography'
import SectionAtmosphere from './effects/SectionAtmosphere'

const services = [
    {
        slug: 'revenue-architecture',
        title: 'Revenue Architecture',
        tagline: 'Every pixel has a purpose. Every flow, a dollar value.',
        description: 'We don\'t build pages — we engineer conversion pipelines. Every digital touchpoint is scientifically designed to transition visitors into high-value clients. We start with your revenue goals and reverse-engineer every design decision from there.',
        metric: '+340%',
        metricLabel: 'avg. conversion uplift',
        icon: BarChart3,
        color: '#d4a853',
        image: '/images/services/revenue.png',
        featured: true,
        badge: 'Most Demanded',
        category: 'Strategy',
    },
    {
        slug: 'web-engineering',
        title: 'Elite Web Engineering',
        tagline: 'Performance is your most unfair competitive advantage.',
        description: 'Sub-second latency. Perfect rendering on every device. We build digital infrastructure at the intersection of raw engineering power and visual perfection. When your site loads in under a second, your brand builds trust before a single word is read.',
        metric: '0.8s',
        metricLabel: 'avg. load time',
        icon: Code2,
        color: '#6366f1',
        image: '/images/services/engineering.png',
        featured: false,
        badge: 'Core Service',
        category: 'Engineering',
    },
    {
        slug: 'brand-systems',
        title: 'Brand System Design',
        tagline: 'Visual monopoly. Market authority. Category ownership.',
        description: 'We establish visual monopolies. Strategy-led brand identities and design systems that position you as the undisputed leader in your market category. Consistently premium, rigorously scalable, unmistakably yours.',
        metric: '12×',
        metricLabel: 'brand recall uplift',
        icon: Palette,
        color: '#ec4899',
        image: '/images/services/brands.png',
        featured: false,
        badge: null,
        category: 'Design',
    },
    {
        slug: 'growth-engineering',
        title: 'AI-Powered Growth',
        tagline: 'Machine precision. Human intelligence. Compounding results.',
        description: 'AI-accelerated deployment guided by elite human strategy. We build custom growth loops — SEO flywheels, acquisition funnels, retention engines — that get exponentially smarter over time. Your revenue doesn\'t just grow. It compounds.',
        metric: '$12M+',
        metricLabel: 'client revenue driven',
        icon: Brain,
        color: '#10b981',
        image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600&auto=format&fit=crop',
        featured: false,
        badge: '2026 Future-Proof',
        category: 'AI & Growth',
    },
    {
        slug: 'seo-dominance',
        title: 'Search Dominance',
        tagline: 'Rank. Command. Own the category. Forever.',
        description: 'Technical SEO and authority engineering at a depth that makes most agencies nervous. We don\'t chase algorithms — we build foundational digital dominance that captures market share organically and compounds over years, not months.',
        metric: '580%',
        metricLabel: 'avg. organic growth',
        icon: Search,
        color: '#f59e0b',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop',
        featured: false,
        badge: 'High ROI',
        category: 'Marketing',
    },
    {
        slug: 'digital-products',
        title: 'Product Innovation',
        tagline: 'From breakthrough concept to market-dominating product.',
        description: 'Full-stack product design and engineering. We extract your vision, identify white space in the market, and engineer applications built to dominate their categories from launch day. We\'ve shipped products that raised Series A within 6 months.',
        metric: '3.2×',
        metricLabel: 'faster time-to-market',
        icon: Layers,
        color: '#8b5cf6',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1600&auto=format&fit=crop',
        featured: false,
        badge: null,
        category: 'Product',
    },
]

// ─── FEATURED HERO CARD ───
function FeaturedServiceCard({ service }: { service: typeof services[0] }) {
    const [isHovered, setIsHovered] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)
    const Icon = service.icon

    return (
        <motion.div
            ref={cardRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0c0c0c] row-span-2 cursor-pointer"
            whileHover={{ borderColor: 'rgba(212,168,83,0.25)' }}
            transition={{ duration: 0.4 }}
        >
            <Link href={`/services/${service.slug}`} className="block h-full">
                {/* Background Image */}
                <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                        className="absolute inset-0"
                        animate={{ scale: isHovered ? 1.06 : 1 }}
                        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                            style={{ filter: 'brightness(0.22) saturate(0.5)' }}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </motion.div>
                    <motion.div
                        className="absolute inset-0"
                        animate={{ opacity: isHovered ? 1 : 0 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            background: `radial-gradient(ellipse 80% 60% at 30% 80%, ${service.color}18, transparent)`,
                        }}
                    />
                </div>

                {/* Gradient overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/70 to-transparent" />

                {/* Content */}
                <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-between min-h-[420px]">
                    <div>
                        {/* Tag */}
                        <div className="flex items-center gap-3 mb-6">
                            <span
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-[0.2em]"
                                style={{ background: `${service.color}20`, color: service.color, borderColor: `${service.color}30` }}
                            >
                                <span className="w-1.5 h-1.5 rounded-full" style={{ background: service.color }} />
                                {service.badge || service.category}
                            </span>
                            <span className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-600">{service.category}</span>
                        </div>

                        {/* Icon */}
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                            style={{ background: `${service.color}15`, border: `1px solid ${service.color}25` }}
                        >
                            <Icon className="w-5 h-5" style={{ color: service.color }} />
                        </div>

                        <h3 className="font-display text-3xl md:text-4xl tracking-tight text-white leading-tight mb-4">
                            {service.title}
                        </h3>
                        <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
                            {service.tagline}
                        </p>
                    </div>

                    <div>
                        <p className="text-zinc-500 text-sm leading-relaxed mb-8 max-w-sm">
                            {service.description}
                        </p>

                        {/* Metric */}
                        <div className="flex items-end justify-between">
                            <div>
                                <div className="text-4xl font-black tracking-tighter" style={{ color: service.color }}>
                                    {service.metric}
                                </div>
                                <div className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 mt-1">
                                    {service.metricLabel}
                                </div>
                            </div>

                            <motion.div
                                className="w-11 h-11 rounded-full border border-white/[0.1] flex items-center justify-center text-white"
                                animate={{ borderColor: isHovered ? `${service.color}60` : 'rgba(255,255,255,0.1)' }}
                            >
                                <ArrowUpRight className="w-4 h-4" />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    )
}

// ─── SERVICE GRID CARD ───
function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
    const [isHovered, setIsHovered] = useState(false)
    const Icon = service.icon

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group overflow-hidden rounded-xl border border-white/[0.06] bg-[#0c0c0c] cursor-pointer"
            whileHover={{ borderColor: `${service.color}30`, y: -4 }}
        >
            <Link href={`/services/${service.slug}`} className="block p-7">
                {/* Hover Background */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            className="absolute inset-0 pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{
                                background: `radial-gradient(ellipse 80% 60% at 20% 80%, ${service.color}0f, transparent)`,
                            }}
                        />
                    )}
                </AnimatePresence>

                {/* Thumbnail */}
                <div className="relative overflow-hidden rounded-lg mb-5 h-36">
                    <motion.div
                        className="absolute inset-0"
                        animate={{ scale: isHovered ? 1.08 : 1 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                            style={{ filter: 'brightness(0.3) saturate(0.6)' }}
                            sizes="(max-width: 768px) 100vw, 33vw"
                            loading="lazy"
                        />
                    </motion.div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/80 to-transparent" />

                    {/* Icon overlay */}
                    <div
                        className="absolute top-3 right-3 w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: `${service.color}20`, border: `1px solid ${service.color}30` }}
                    >
                        <Icon className="w-4 h-4" style={{ color: service.color }} />
                    </div>

                    {service.badge && (
                        <div
                            className="absolute top-3 left-3 px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-[0.2em]"
                            style={{ background: `${service.color}20`, color: service.color }}
                        >
                            {service.badge}
                        </div>
                    )}
                </div>

                {/* Category */}
                <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-600 mb-2">{service.category}</div>

                {/* Title */}
                <h3 className="font-display text-xl tracking-tight text-white leading-tight mb-3">
                    {service.title}
                </h3>
                <p className="text-zinc-500 text-xs leading-relaxed mb-5">{service.tagline}</p>

                {/* Metric & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.04]">
                    <div>
                        <div className="text-xl font-black tracking-tight" style={{ color: service.color }}>
                            {service.metric}
                        </div>
                        <div className="text-[9px] font-mono text-zinc-600">{service.metricLabel}</div>
                    </div>
                    <motion.div
                        className="text-xs font-mono text-zinc-500 flex items-center gap-1"
                        animate={{ x: isHovered ? 4 : 0, color: isHovered ? '#ffffff' : '#71717a' }}
                    >
                        Explore <ArrowUpRight className="w-3 h-3" />
                    </motion.div>
                </div>
            </Link>
        </motion.div>
    )
}

// ─── CTA ROW ───
function ServicesCTA({ isInView }: { isInView: boolean }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-8 py-10 border-t border-white/[0.04]"
        >
            <p className="text-zinc-500 text-sm max-w-md leading-relaxed">
                Every engagement starts with a thorough discovery. We only take 3–4 new partners per quarter to guarantee elite delivery.
            </p>
            <div className="flex items-center gap-5 shrink-0">
                <Link
                    href="/services"
                    className="text-sm font-semibold text-zinc-300 hover:text-white transition-colors flex items-center gap-2 group"
                >
                    View All Services
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                    href="/contact"
                    className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full"
                >
                    <span className="absolute inset-0 bg-white rounded-full" />
                    <span className="absolute inset-0 bg-gradient-to-r from-accent to-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <span className="relative z-10 flex items-center gap-2.5 px-7 py-3 text-[#0a0a0a] text-[13px] font-bold tracking-wide">
                        Start a Project
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                </Link>
            </div>
        </motion.div>
    )
}

// ─── MAIN EXPORT ───
interface ServiceData {
    id?: string
    slug: string
    title: string
    description?: string | null
    fullDescription?: string | null
    icon?: string | null
    features?: any
    isActive?: boolean
    popular?: boolean
}

export default function CompetitiveEdge({ initialServices }: { initialServices?: ServiceData[] | null }) {
    const sectionRef = useRef<HTMLElement>(null)
    const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

    // If DB services are available, merge with display config for images/colors
    const displayServices = (initialServices && initialServices.length >= 2)
        ? initialServices.slice(0, 6).map((s, i) => ({
            ...services[i % services.length], // carry over image, color, icon component
            slug: s.slug || services[i % services.length].slug,
            title: s.title || services[i % services.length].title,
            description: s.description || services[i % services.length].description,
            tagline: services[i % services.length].tagline,
        }))
        : services

    const featuredService = displayServices[0]
    const gridServices = displayServices.slice(1)

    return (
        <section
            ref={sectionRef}
            className="relative py-28 md:py-36 bg-[#080808] overflow-hidden"
        >
            {/* Atmospheric lighting — cool indigo for engineering/services */}
            <SectionAtmosphere preset="cool" parallax />

            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                {/* Header */}
                <div className="mb-16 md:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-3 mb-8"
                    >
                        <span className="w-8 h-px bg-accent" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent">
                            What We Build
                        </span>
                    </motion.div>

                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
                        <div className="max-w-2xl">
                            <KineticTypography
                                segments={[
                                    { text: 'Digital interfaces ' },
                                    { text: 'engineered for revenue.', className: 'italic text-zinc-400' }
                                ]}
                                as="h2"
                                className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.05]"
                            />
                        </div>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-zinc-500 text-sm leading-relaxed max-w-xs lg:max-w-sm lg:text-right"
                        >
                            Six specialized disciplines. One unified revenue outcome. Every engagement is bespoke, every strategy is rooted in business results.
                        </motion.p>
                    </div>
                </div>

                {/* Services grid — editorial 3-column layout, no orphaned cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
                    {/* Featured large card — left column, spans 2 rows on lg */}
                    <motion.div
                        className="lg:row-span-2"
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                        style={{ gridRow: 'span 2' }}
                    >
                        <FeaturedServiceCard service={featuredService} />
                    </motion.div>

                    {/* Remaining services — always fills 2 columns cleanly */}
                    {gridServices.slice(0, 4).map((service, i) => (
                        <ServiceCard key={service.slug} service={service} index={i} />
                    ))}
                </div>

                {/* Last row — remaining services in a 2-col or 3-col clean strip */}
                {gridServices.length > 4 && (
                    <div className={`grid gap-4 lg:gap-5 mt-4 lg:mt-5 grid-cols-1 md:grid-cols-${Math.min(gridServices.slice(4).length, 3)}`}>
                        {gridServices.slice(4).map((service, i) => (
                            <ServiceCard key={service.slug} service={service} index={i + 4} />
                        ))}
                    </div>
                )}

                {/* CTA Row */}
                <ServicesCTA isInView={isInView} />
            </div>
        </section>
    )
}
