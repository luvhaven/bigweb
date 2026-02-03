'use client'

import { motion } from 'framer-motion'
import {
    Search,
    Code,
    Zap,
    TrendingUp,
    BarChart3,
    Globe,
    ArrowRight,
    Shield,
    Target,
    Key,
    Award,
    CheckCircle2,
    Rocket,
    LineChart,
    Network,
    Eye,
    Activity,
    Lock,
    DollarSign
} from 'lucide-react'
import Link from 'next/link'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import RelatedServices from '@/components/services/RelatedServices'
import { ServiceSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'

// Product Branding
const PRODUCT_NAME = "The Authority System™"
const PRODUCT_TAGLINE = "Undisputed Search Domination"

// Outcome-focused benefits
const outcomes = [
    {
        title: "Page 1 Dominance",
        description: "We don't just aim for rankings—we aim for total market saturation. Secure multiple top-tier spots for your most profitable keywords.",
        icon: Target,
        metric: "#1",
        metricLabel: "Rankings Secured"
    },
    {
        title: "Deep Intent Capture",
        description: "Vanity metrics are for amateurs. We focus on 'money keywords' that bring buyers, not browsers, with surgical precision.",
        icon: DollarSign,
        metric: "3.5X",
        metricLabel: "ROI Multiplier"
    },
    {
        title: "Algorithm Lockdown",
        description: "White-hat, future-proof strategies that thrive through Google Core Updates. Your authority becomes an immutable asset.",
        icon: Shield,
        metric: "100%",
        metricLabel: "Penalty Free"
    }
]

// Social proof
const socialProof = [
    { value: "450K+", label: "Organic Leads" },
    { value: "#1", label: "Rankings Achieved" },
    { value: "340%", label: "Avg Growth" },
    { value: "85", label: "Markets Locked" }
]

// Transformation phases
const transformation = [
    {
        phase: "Phase 01",
        title: "Forensic Audit",
        outcome: "We surgically dismantle your current search profile to identify logic leaks, technical friction, and capital opportunities.",
        deliverables: ["Technical Audit", "Keyword Blueprint", "Competitor Forensics"]
    },
    {
        phase: "Phase 02",
        title: "Authority Injection",
        outcome: "We fix the structural foundation and begin building high-fidelity backlinks that signal absolute trust to the search mesh.",
        deliverables: ["Site Mesh Fix", "Core Vitals Update", "Authority Building"]
    },
    {
        phase: "Phase 03",
        title: "Market Lockdown",
        outcome: "Our content engine and aggressive outreach push you to the top. We monitor for drift to ensure your dominance remains permanent.",
        deliverables: ["Content Strategy", "Authority PR", "Rank Telemetry"]
    }
]

export default function SEOPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-cyan-500/30">
            <ServiceSchema
                name={`${PRODUCT_NAME} - Elite SEO Services by BIGWEB`}
                description={`${PRODUCT_TAGLINE}. Surgical SEO that makes you the undisputed leader. #1 rankings, 3.5X ROI, penalty-free strategies.`}
                serviceType="SEO Services"
                ratingValue={4.9}
                reviewCount={85}
            />

            <AdvancedNavigation />

            {/* Hero Section */}
            <section className="relative min-h-[110vh] flex items-center justify-center pt-32 pb-24 overflow-hidden bg-gradient-mesh">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:30px_30px]" />
                </div>

                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-[5%] left-[5%] w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[140px] animate-pulse" />
                    <div className="absolute bottom-[5%] right-[5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow" />
                </div>

                <div className="relative z-10 container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-6xl mx-auto"
                    >
                        {/* Status Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="inline-flex items-center gap-3 px-6 py-2 rounded-full backdrop-blur-3xl bg-white/5 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)] mb-12"
                        >
                            <Search className="w-4 h-4 text-cyan-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">
                                Authority System: {PRODUCT_NAME}
                            </span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter uppercase leading-[0.85] italic"
                        >
                            The Authority<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-600 to-blue-600">
                                System™
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-lg md:text-2xl font-bold tracking-widest text-cyan-500 uppercase italic mb-12"
                        >
                            {PRODUCT_TAGLINE}
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-xl md:text-3xl text-zinc-400 max-w-4xl mx-auto leading-tight mb-20 font-light"
                        >
                            We deploy <strong className="text-white font-black italic">surgical search strategies</strong> that make you the undisputed leader in your industry.
                            <br />
                            <span className="text-white font-black underline decoration-cyan-500 underline-offset-8">Rankings are temporary. Authority is permanent.</span>
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24"
                        >
                            <Link
                                href="/contact"
                                className="group relative px-12 py-6 rounded-2xl bg-cyan-600 text-white font-black uppercase tracking-widest text-lg hover:bg-cyan-500 transition-all hover:scale-105 shadow-2xl shadow-cyan-500/20"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <Target className="w-6 h-6" />
                                    Start My Strategy
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                </span>
                            </Link>
                            <Link
                                href="#process"
                                className="px-12 py-6 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-lg hover:bg-white/10 transition-all font-bold"
                            >
                                View Strategy
                            </Link>
                        </motion.div>

                        {/* Authority Telemetry */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto opacity-50 border-t border-white/5 pt-12">
                            {socialProof.map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-3xl font-black text-white italic mb-1">{stat.value}</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Archive Outcomes */}
            <section className="py-32 relative overflow-hidden bg-[#080808]">
                <div className="container mx-auto px-6 mb-24 text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-6">
                        The <span className="text-cyan-500">Outcome</span> Network
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-medium">
                        SEO is not a gamble. It is a <strong className="text-white italic">capital acquisition channel</strong>.
                    </p>
                </div>

                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        {outcomes.map((outcome, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all duration-500"
                            >
                                <div className="p-5 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 w-fit mb-8 group-hover:scale-110 transition-transform duration-500">
                                    <outcome.icon className="w-8 h-8 text-cyan-500" />
                                </div>
                                <h3 className="text-2xl font-black text-white uppercase italic mb-4">{outcome.title}</h3>
                                <p className="text-zinc-400 font-medium mb-12 text-lg leading-relaxed">{outcome.description}</p>

                                <div className="pt-8 border-t border-white/10 flex flex-col gap-1">
                                    <div className="text-5xl font-black text-cyan-500 italic tracking-tighter">{outcome.metric}</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{outcome.metricLabel}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Strategy Stack */}
            <section className="py-24 border-t border-white/5 border-b bg-white/[0.01]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <span className="text-cyan-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Powering The System</span>
                        <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">Forensic Intelligence</h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {[
                            { title: "Semrush Elite", desc: "Surgical keyword mapping and intent forensics.", icon: Target },
                            { title: "Search Console API", desc: "Real-time indexing control and data persistence.", icon: Globe },
                            { title: "Schema Mesh", desc: "Advanced structured data for machine comprehension.", icon: Code },
                            { title: "Ahrefs Forensic", desc: "Deep backlink profile audits and toxic link purge.", icon: LineChart },
                        ].map((tool, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-8 rounded-3xl bg-black border border-white/5 hover:border-cyan-500/20 transition-all group">
                                <div className="w-16 h-16 rounded-2xl bg-cyan-500/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <tool.icon className="w-8 h-8 text-cyan-500" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 uppercase italic leading-tight">{tool.title}</h3>
                                <p className="text-zinc-500 text-xs leading-relaxed font-medium">{tool.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Deployment Workflow */}
            <section id="process" className="py-40 relative bg-white/[0.01]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-8 italic">
                            The <span className="text-cyan-500">Authority</span> Loop
                        </h2>
                        <p className="text-xl text-zinc-500 uppercase tracking-widest font-black">
                            How we architect your digital dominance.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-12">
                        {transformation.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="flex gap-8 md:gap-12 p-10 rounded-[3rem] bg-black border border-white/5 hover:border-cyan-500/20 transition-all relative group"
                            >
                                <div className="absolute -left-4 top-1/2 -translate-y-1/2 py-4 px-2 bg-cyan-600 rounded-lg text-white font-black text-[10px] uppercase [writing-mode:vertical-lr] tracking-widest transform transition-transform group-hover:scale-110">
                                    Phase {i + 1}
                                </div>

                                <div className="flex-1 space-y-6">
                                    <div>
                                        <div className="text-cyan-500 font-black uppercase text-[10px] tracking-widest mb-2">{step.phase}</div>
                                        <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic leading-none">{step.title}</h3>
                                    </div>
                                    <p className="text-xl text-zinc-400 font-medium leading-relaxed">{step.outcome}</p>

                                    <div className="flex flex-wrap gap-3">
                                        {step.deliverables.map((item, j) => (
                                            <div key={j} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
                                                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                                                <span className="text-xs font-bold text-zinc-400 uppercase tracking-tight">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-40 relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-600/5 blur-[120px]" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="max-w-5xl mx-auto p-16 md:p-32 rounded-[4rem] bg-white/[0.02] border border-white/5 relative overflow-hidden backdrop-blur-3xl shadow-2xl">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] scale-150" />

                        <div className="relative z-10">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-10"
                            >
                                <Lock className="w-4 h-4" /> Market Occupied
                            </motion.div>

                            <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter mb-10 leading-none">
                                Occupy <span className="text-cyan-600">Page 1</span>
                            </h2>

                            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-16 font-medium">
                                Do not settle for invisibility.
                                <br />
                                <strong className="text-white italic">The Authority System is primed.</strong>
                            </p>

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-4 px-16 py-8 rounded-[2rem] bg-white text-black font-black uppercase tracking-[0.2em] text-xl transition-all hover:scale-105 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                            >
                                <TrendingUp className="w-8 h-8" />
                                Start My Audit
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <RelatedServices currentPath="/services/seo" />

            <BreadcrumbSchema
                items={[
                    { name: 'Home', url: '/' },
                    { name: 'Services', url: '/services' },
                    { name: 'SEO Services', url: '/services/seo' }
                ]}
            />

            <Footer />
        </main>
    )
}
