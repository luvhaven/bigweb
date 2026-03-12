'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import {
    ArrowUpRight, Code2, Smartphone, Palette, Search, ShoppingBag,
    BrainCircuit, BarChart3, Wrench, GaugeCircle, Users, Bot,
    ArrowRight, ChevronRight, CheckCircle, Zap
} from 'lucide-react'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import KineticTypography from '@/components/effects/KineticTypography'
import PremiumHero from '@/components/effects/PremiumHero'
import type { Capability } from '@/types/database'

/* ── SERVICE DISCIPLINES DATA ── */
const SERVICES = [
    {
        slug: 'web-development',
        number: '01',
        title: 'Website Engineering',
        tagline: 'The Revenue Engine™',
        desc: 'Enterprise-grade web platforms built with Next.js 15, Edge rendering, and performance-first architecture. Every component engineered for conversion velocity.',
        icon: Code2,
        category: 'Build',
        accent: '#d4a853',
        metric: '+347%', metricLabel: 'Avg. Conversion Lift',
        tags: ['Next.js 15', 'TypeScript', 'Edge CDN', 'Headless CMS'],
    },
    {
        slug: 'mobile-apps',
        number: '02',
        title: 'Mobile Applications',
        tagline: 'The Pocket Empire™',
        desc: 'Native iOS and Android apps — and cross-platform experiences with React Native — engineered for speed, retention, and monetization from day one.',
        icon: Smartphone,
        category: 'Build',
        accent: '#6366f1',
        metric: '4.8★', metricLabel: 'Avg. App Store Rating',
        tags: ['React Native', 'Swift', 'Kotlin', 'App Store Optimization'],
    },
    {
        slug: 'ui-ux-design',
        number: '03',
        title: 'UI/UX Product Design',
        tagline: 'The Experience Engine™',
        desc: 'Research-driven design systems and interaction models that guide users to action. We design for psychology, not just aesthetics.',
        icon: Palette,
        category: 'Design',
        accent: '#ec4899',
        metric: '-62%', metricLabel: 'Task Abandonment Rate',
        tags: ['Figma Systems', 'User Research', 'Prototyping', 'Design Tokens'],
    },
    {
        slug: 'seo',
        number: '04',
        title: 'SEO & GAIO Authority',
        tagline: 'The Authority System™',
        desc: 'Compound organic growth through technical SEO, semantic content architecture, and pioneering Generative AI Optimization (GAIO) to dominate AI-powered search results.',
        icon: Search,
        category: 'Grow',
        accent: '#10b981',
        metric: '+280%', metricLabel: 'Organic Traffic Lift',
        tags: ['Technical SEO', 'GAIO', 'Content Strategy', 'Link Authority'],
    },
    {
        slug: 'ecommerce',
        number: '05',
        title: 'E-Commerce Infrastructure',
        tagline: 'The Transaction Machine™',
        desc: 'Full-stack e-commerce systems built for volume. Custom Shopify storefronts, headless commerce, and payment infrastructure designed to minimize drop-off at every step.',
        icon: ShoppingBag,
        category: 'Build',
        accent: '#f97316',
        metric: '+89%', metricLabel: 'Checkout Completion',
        tags: ['Headless Commerce', 'Shopify Plus', 'Stripe', 'Multi-currency'],
    },
    {
        slug: 'ai-automation',
        number: '06',
        title: 'AI Automation',
        tagline: 'The Profit Autopilot™',
        desc: 'Custom AI agent workflows that eliminate repetitive bottlenecks and create autonomous revenue pipelines. From LLM integrations to multi-agent orchestrations.',
        icon: Bot,
        category: 'Automate',
        accent: '#8b5cf6',
        metric: '80%', metricLabel: 'Manual Task Reduction',
        tags: ['LLM Integration', 'AI Agents', 'n8n / Make', 'OpenAI API'],
    },
    {
        slug: 'analytics',
        number: '07',
        title: 'Analytics & Intelligence',
        tagline: 'The Intelligence Dashboard™',
        desc: 'Forensic event tracking, behavioral analytics, and custom business intelligence dashboards. Turn raw data into clear revenue decisions.',
        icon: BarChart3,
        category: 'Optimize',
        accent: '#06b6d4',
        metric: '100%', metricLabel: 'Data Attribution Accuracy',
        tags: ['GA4', 'Mixpanel', 'Metabase', 'BigQuery'],
    },
    {
        slug: 'maintenance',
        number: '08',
        title: 'Managed Maintenance',
        tagline: 'The Zero-Downtime Mesh™',
        desc: '24/7 monitoring, proactive security patching, performance tuning, and content updates. Your site stays fast, safe, and aligned with your business as it scales.',
        icon: Wrench,
        category: 'Sustain',
        accent: '#14b8a6',
        metric: '99.99%', metricLabel: 'Guaranteed Uptime SLA',
        tags: ['24/7 Monitoring', 'Security Audits', 'Core Updates', 'SLA Backed'],
    },
]

const DIFFERENTIATORS = [
    {
        number: '01',
        title: 'Revenue-First Thinking',
        desc: 'We don\'t measure success in "beautiful designs" or "bug-free code." We measure it in revenue lift, conversion rate improvements, and compounding ROI.',
    },
    {
        number: '02',
        title: 'Senior-Only Talent',
        desc: 'No junior developers. No offshore outsourcing. Every project is handled by senior engineers, designers, and strategists with 8+ years of proven results.',
    },
    {
        number: '03',
        title: 'Outcome Guarantees',
        desc: 'We set clear KPIs before starting every engagement. If we don\'t hit agreed benchmarks, we continue working until we do — at no additional cost.',
    },
    {
        number: '04',
        title: 'Transparent Velocity',
        desc: 'Weekly progress reviews, live staging previews, and direct Slack access to your entire team. No agency fog. Total visibility from day one.',
    },
]

const STATS = [
    { val: '$47M+', label: 'Revenue generated for clients' },
    { val: '200+', label: 'Projects shipped globally' },
    { val: '98%', label: 'Client retention rate' },
    { val: '<30d', label: 'Avg. time to first result' },
]

/* ── ATOMS ── */
function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-500">{children}</span>
        </div>
    )
}

/* ── HERO ── */
function Hero() {
    return (
        <PremiumHero
            eyebrow="8 Core Disciplines"
            headline="Engineering"
            headlineAccent="unfair advantages"
            subheadline="for ambitious brands."
        >
            <motion.div
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.8 }}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8 max-w-5xl"
            >
                <p className="text-lg text-zinc-500 max-w-md leading-relaxed">
                    These are our disciplines — the crafts we practice and the expertise we've compounded over years. Our <Link href="/#pricing" className="text-white underline-offset-4 underline hover:text-accent transition-colors">Packages</Link> are how you engage us.
                </p>
                <Link href="#disciplines" className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-black text-[13px] uppercase tracking-[0.1em] hover:bg-accent transition-colors duration-300 whitespace-nowrap">
                    View Disciplines
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }}
                className="flex flex-wrap gap-10 mt-14 pt-10 border-t border-white/[0.04] max-w-5xl"
            >
                {STATS.map((s, i) => (
                    <div key={i}>
                        <div className="text-2xl font-black text-white mb-0.5">{s.val}</div>
                        <div className="text-[10px] text-zinc-600 uppercase tracking-wider font-bold">{s.label}</div>
                    </div>
                ))}
            </motion.div>
        </PremiumHero>
    )
}

/* ── SERVICE ROW ── */
function ServiceRow({ svc, index }: { svc: typeof SERVICES[0]; index: number }) {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-10%' })
    const Icon = svc.icon

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="border-b border-white/[0.04] last:border-b-0"
        >
            <Link href={`/services/${svc.slug}`} className="group block py-14 md:py-20">
                <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                        {/* Left — number + category */}
                        <div className="lg:col-span-2 flex lg:flex-col items-center lg:items-start gap-4">
                            <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.3em]">{svc.number}</span>
                            <span className="text-[9px] font-mono text-accent/60 uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border border-accent/10 bg-accent/[0.02]">
                                {svc.category}
                            </span>
                        </div>

                        {/* Middle — content */}
                        <div className="lg:col-span-7">
                            <div className="flex items-start gap-5 mb-6">
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 mt-1"
                                    style={{ background: `${svc.accent}15`, border: `1px solid ${svc.accent}30` }}>
                                    <Icon className="w-5 h-5" style={{ color: svc.accent }} />
                                </div>
                                <div>
                                    <div className="text-[9px] font-mono text-zinc-700 uppercase tracking-[0.25em] mb-1">{svc.tagline}</div>
                                    <h2 className="font-display text-3xl md:text-4xl xl:text-5xl font-black text-white tracking-tighter italic leading-[1.0] group-hover:text-accent transition-colors duration-500">
                                        {svc.title}
                                    </h2>
                                </div>
                            </div>
                            <p className="text-zinc-500 text-base md:text-lg leading-relaxed group-hover:text-zinc-400 transition-colors duration-400 mb-8 ml-16">
                                {svc.desc}
                            </p>
                            <div className="flex flex-wrap gap-2 ml-16">
                                {svc.tags.map(tag => (
                                    <span key={tag} className="text-[10px] font-mono text-zinc-600 px-3 py-1.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Right — metric + CTA */}
                        <div className="lg:col-span-3 flex lg:flex-col items-start lg:items-end gap-6 pt-1">
                            <div className="text-right">
                                <div className="text-3xl font-black font-display tracking-tighter" style={{ color: svc.accent }}>
                                    {svc.metric}
                                </div>
                                <div className="text-[9px] font-bold text-zinc-700 uppercase tracking-wider mt-0.5">{svc.metricLabel}</div>
                            </div>
                            <div className="flex items-center gap-2 text-[12px] font-bold text-zinc-600 group-hover:text-white transition-colors duration-400 uppercase tracking-wider">
                                View Discipline
                                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </div>
                        </div>
                    </div>

                    {/* Bottom highlight bar on hover */}
                    <div className="mt-6 h-[1px] w-0 group-hover:w-full transition-all duration-700 ease-out"
                        style={{ background: `linear-gradient(90deg, ${svc.accent}60, transparent)` }} />
                </div>
            </Link>
        </motion.div>
    )
}

/* ── DISCIPLINES SECTION ── */
function DisciplinesSection() {
    return (
        <section id="disciplines" className="py-8 bg-card relative">
            <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
                <div className="pt-16 pb-10">
                    <SectionLabel>All Disciplines</SectionLabel>
                    <KineticTypography
                        as="h2"
                        className="font-display text-4xl md:text-5xl font-black text-white tracking-tighter italic"
                        segments={[
                            { text: "Eight disciplines. " },
                            { text: "One obsessive standard.", className: "text-zinc-600" }
                        ]}
                    />
                    <p className="text-zinc-500 text-lg mt-5 max-w-2xl leading-relaxed">
                        These are our areas of deep expertise — fields we've spent years mastering. Once you choose how to engage us (via a Package), we draw from these disciplines to solve your specific challenge.
                    </p>
                </div>
            </div>
            <div className="border-t border-white/[0.04]">
                {SERVICES.map((svc, i) => (
                    <ServiceRow key={svc.slug} svc={svc} index={i} />
                ))}
            </div>
        </section>
    )
}

/* ── PACKAGES BRIDGE CTA ── */
function PackagesBridge() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-10%' })

    return (
        <section ref={ref} className="py-28 md:py-36 border-t border-white/[0.04] bg-[#020202] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/[0.025] blur-[180px] rounded-full" />
            <div className="container mx-auto px-6 lg:px-16 max-w-7xl relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9 }}>
                        <SectionLabel>How to Engage Us</SectionLabel>
                        <KineticTypography
                            as="h2"
                            className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic leading-[1.0]"
                            segments={[
                                { text: "Expertise is the foundation. " },
                                { text: "Packages are the vehicle.", className: "text-zinc-600" }
                            ]}
                        />
                        <p className="text-zinc-500 text-lg leading-relaxed mt-8 max-w-lg">
                            Our disciplines show you <em className="text-white not-italic font-medium">what we know</em>. Our Packages define <em className="text-white not-italic font-medium">how we deliver it</em> — structured, priced engagements designed for specific business objectives.
                        </p>
                        <Link href="/#pricing" className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-black text-[13px] uppercase tracking-[0.1em] hover:bg-accent transition-colors duration-300 mt-10">
                            View Packages & Pricing
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    <div className="grid gap-4">
                        {[
                            { name: 'Revenue Roadmap', price: '$4,997', note: 'one-time', desc: 'Strategy sprint — the blueprint before we build.', href: '/offers/revenue-roadmap', tag: 'Popular' },
                            { name: 'The Monolith™ System', price: 'From $18,000', note: 'project-based', desc: 'Complete flagship website + conversion engine.', href: '/offers/revenue-system', tag: 'Best Value' },
                            { name: 'Growth Retainer', price: 'From $6,000', note: '/ month', desc: 'Embedded senior team. Continuous growth.', href: '/offers/retainer', tag: undefined }
                        ].map((pkg, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.6, delay: 0.1 + i * 0.1 }}
                            >
                                <Link href={pkg.href} className="group flex items-center justify-between p-6 rounded-2xl bg-[#050505] border border-white/[0.04] hover:border-accent/20 hover:bg-white/[0.02] transition-all duration-300">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-white font-bold tracking-tight">{pkg.name}</span>
                                            {pkg.tag && <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/20">{pkg.tag}</span>}
                                        </div>
                                        <p className="text-zinc-600 text-sm">{pkg.desc}</p>
                                    </div>
                                    <div className="text-right shrink-0 ml-6">
                                        <div className="text-white font-black font-display text-lg tracking-tight">{pkg.price}</div>
                                        <div className="text-zinc-700 text-[10px] font-mono uppercase tracking-widest">{pkg.note}</div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ── WHY US ── */
function DifferentiatorsSection() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-10%' })

    return (
        <section ref={ref} className="py-28 md:py-40 border-t border-white/[0.04] relative overflow-hidden">
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.025] blur-[200px] rounded-full pointer-events-none" />
            <div className="container mx-auto px-6 lg:px-16 max-w-7xl">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.9 }}>
                        <SectionLabel>Why BIGWEB</SectionLabel>
                        <KineticTypography
                            as="h2"
                            className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter italic leading-[1.0]"
                            segments={[
                                { text: "Most agencies focus on output. " },
                                { text: "We guarantee outcomes.", className: "text-zinc-600" }
                            ]}
                        />
                        <p className="text-zinc-500 text-lg leading-relaxed mt-8 max-w-lg">
                            A stunning website is useless if it doesn&apos;t convert. We build holistic digital ecosystems where design, engineering, and psychology compound together.
                        </p>
                        <Link href="/contact" className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black font-black text-[13px] uppercase tracking-[0.1em] hover:bg-accent transition-colors duration-300 mt-10">
                            Start a Project
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>

                    <div className="grid gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.04]">
                        {DIFFERENTIATORS.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={inView ? { opacity: 1 } : {}}
                                transition={{ duration: 0.6, delay: 0.1 + i * 0.07 }}
                                className="group bg-card hover:bg-secondary p-8 transition-colors duration-400 relative"
                            >
                                <div className="absolute top-0 left-0 right-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-transparent via-accent to-transparent" />
                                <div className="flex gap-6">
                                    <span className="text-[10px] font-mono text-zinc-700 uppercase tracking-[0.25em] shrink-0 mt-1">{item.number}</span>
                                    <div>
                                        <h3 className="text-base font-black text-white mb-2 tracking-tight group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                                        <p className="text-sm text-zinc-600 leading-relaxed group-hover:text-zinc-500 transition-colors">{item.desc}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ── FINAL CTA ── */
function FinalCTA() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-10%' })

    return (
        <section ref={ref} className="py-36 md:py-48 relative overflow-hidden border-t border-white/[0.04]">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full"
                    style={{ background: 'radial-gradient(ellipse, rgba(212,168,83,0.05) 0%, transparent 70%)' }} />
                <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </div>

            <div className="container mx-auto px-6 lg:px-16 max-w-5xl text-center relative">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }}>
                    <SectionLabel>Let&apos;s Build</SectionLabel>
                    <div className="font-display text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter italic leading-[0.9] uppercase mb-8 text-white">
                        Your Revenue<br />
                        <span className="text-accent">Machine Awaits.</span>
                    </div>
                    <p className="text-xl text-zinc-500 max-w-xl mx-auto mb-12 leading-relaxed">
                        Join 200+ ambitious brands who chose engineering over guesswork — and built something that actually compounds.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
                        <Link href="/contact" className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl bg-white text-black font-black text-[13px] uppercase tracking-[0.15em] hover:bg-accent transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.08)]">
                            Start a Conversation
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/#pricing" className="group inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-medium px-6 py-5">
                            View Packages
                            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-6">
                        {['NDA on day one', 'Senior-only team', 'Outcome guarantees', 'Cancel anytime'].map((t, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                                <span className="text-[11px] text-zinc-600 uppercase tracking-wider font-bold">{t}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

/* ── MAIN EXPORT ── */
export default function ServicesPageClient({ capabilities }: { capabilities: Capability[] }) {
    return (
        <main className="min-h-screen bg-background text-white overflow-x-hidden selection:bg-accent/20">
            <AdvancedNavigation />
            <Hero />
            <DisciplinesSection />
            <PackagesBridge />
            <DifferentiatorsSection />
            <FinalCTA />
            <Footer />
        </main>
    )
}
