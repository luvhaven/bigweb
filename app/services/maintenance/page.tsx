'use client'

import { motion } from 'framer-motion'
import {
    ShieldCheck,
    Globe,
    Server,
    Activity,
    ArrowRight,
    Lock,
    RefreshCw,
    Clock,
    HeartPulse,
    Award,
    CheckCircle2,
    Rocket,
    Bug,
    AlertTriangle,
    Shield,
    Terminal,
    Eye,
    Cpu,
    Database,
    Binary
} from 'lucide-react'
import Link from 'next/link'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import RelatedServices from '@/components/services/RelatedServices'
import { ServiceSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'

// Product Branding
const PRODUCT_NAME = "The Zero-Downtime Mesh™"
const PRODUCT_TAGLINE = "High-Fidelity Uptime Assurance"

// Outcome-focused benefits
const outcomes = [
    {
        title: "Forensic Monitoring",
        description: "We surgically monitor every node of your infrastructure in 100ms intervals. If a deviation is detected, our mesh responds before the failure propagates.",
        icon: Activity,
        metric: "99.99%",
        metricLabel: "Uptime Assurance"
    },
    {
        title: "Hardened Security",
        description: "Automated vulnerability patching, industrial-grade firewalls, and forensic threat detection. Your data logic is stored in a permanent fortress.",
        icon: Shield,
        metric: "Bank",
        metricLabel: "Security Grade"
    },
    {
        title: "Proactive Refactoring",
        description: "Software decays without intervention. We proactively inject updates and optimize logic to ensure your machine stays elite permanently.",
        icon: RefreshCw,
        metric: "Auto",
        metricLabel: "Code Injection"
    }
]

// Social proof
const socialProof = [
    { value: "0", label: "Breach Events" },
    { value: "15min", label: "Fast Response" },
    { value: "24/7", label: "Active Telemetry" },
    { value: "Elite", label: "Coverage Tier" }
]

const transformation = [
    {
        phase: "Phase 01",
        title: "System Diagnostics",
        outcome: "We surgically audit your system for existing vulnerabilities, latency bottlenecks, and architectural friction nodes.",
        deliverables: ["Health Analysis", "Patch Roadmap", "Mesh Blueprint"]
    },
    {
        phase: "Phase 02",
        title: "Mesh Deployment",
        outcome: "We inject our proprietary monitoring instrumentation and harden your infrastructure against external threats.",
        deliverables: ["Telemetry Setup", "Firewall Injection", "Backup Grid"]
    },
    {
        phase: "Phase 03",
        title: "Active Defense",
        outcome: "The mesh is live. We maintain 24/7 surveillance, executing automated updates and forensic optimizations in real-time.",
        deliverables: ["System Integrity", "Weekly Patching", "Global Locking"]
    }
]

export default function MaintenancePage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-orange-500/30">
            <ServiceSchema
                name={`${PRODUCT_NAME} - Elite Maintenance by BIGWEB`}
                description={`${PRODUCT_TAGLINE}. 24/7 monitoring and security for your web application. Zero downtime guarantee, bank-grade security, proactive optimization.`}
                serviceType="Software Maintenance"
                ratingValue={5.0}
                reviewCount={200}
            />

            <AdvancedNavigation />

            {/* Hero Section */}
            <section className="relative min-h-[100vh] flex items-center justify-center pt-32 pb-24 overflow-hidden">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:30px_30px]" />
                </div>

                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-[20%] right-[10%] w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[140px] animate-pulse" />
                </div>

                <div className="relative z-10 container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                        className="max-w-6xl mx-auto"
                    >
                        {/* Status Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="inline-flex items-center gap-3 px-6 py-2 rounded-full backdrop-blur-3xl bg-white/5 border border-white/10 mb-12"
                        >
                            <ShieldCheck className="w-4 h-4 text-orange-500" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                                Security System: {PRODUCT_NAME}
                            </span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-6xl md:text-9xl font-bold mb-8 tracking-tighter uppercase leading-[0.85]"
                        >
                            Zero-Downtime<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-700">
                                Mesh™
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-lg md:text-2xl font-bold tracking-widest text-zinc-500 uppercase mb-12"
                        >
                            {PRODUCT_TAGLINE}
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-xl md:text-3xl text-zinc-400 max-w-4xl mx-auto leading-tight mb-20 font-medium tracking-tight"
                        >
                            We protect your digital sovereignty with <strong className="text-white">industrial-grade surveillance</strong> and forensic mitigation.
                            <br />
                            <span className="text-white underline decoration-orange-500/50 underline-offset-8">Uptime is mandatory.</span>
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24"
                        >
                            <Link
                                href="/contact"
                                className="group relative px-12 py-6 rounded-full bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-zinc-200 transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <Shield className="w-5 h-5" />
                                    Secure My System
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform ease-apple" />
                                </span>
                            </Link>
                            <Link
                                href="#coverage"
                                className="px-12 py-6 rounded-full border border-white/10 text-white font-bold uppercase tracking-widest text-sm hover:bg-white/5 transition-all"
                            >
                                View Coverage
                            </Link>
                        </motion.div>

                        {/* Security Telemetry */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto border-t border-white/10 pt-12">
                            {socialProof.map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-4xl font-bold text-white mb-2 tracking-tighter">{stat.value}</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Defense Infrastructure */}
            <section className="py-32 border-t border-white/5 bg-black">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <span className="text-orange-500 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">Engine Integrity</span>
                        <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter">Defense Stack</h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { title: "Node Sentinel", desc: "100ms global health checks across distributed edge nodes.", icon: Globe },
                            { title: "Binary Guardian", desc: "Real-time binary inspection and threat neutralization.", icon: Terminal },
                            { title: "Logic Persistence", desc: "Forced redundancy and automated failover meshes.", icon: Database },
                            { title: "Kernel Defense", desc: "Military-grade OS hardening and root-level security.", icon: Cpu },
                        ].map((tool, i) => (
                            <div key={i} className="flex flex-col items-center text-center p-8 bg-zinc-900/10 border border-white/5 hover:border-orange-500/30 transition-all group backdrop-blur-md rounded-3xl">
                                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:bg-orange-500/10 transition-colors">
                                    <tool.icon className="w-6 h-6 text-zinc-400 group-hover:text-orange-500 transition-colors" />
                                </div>
                                <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-wider">{tool.title}</h3>
                                <p className="text-zinc-500 leading-relaxed font-medium text-xs tracking-wide">{tool.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Forensic Outcomes */}
            <section className="py-32 relative overflow-hidden bg-black">
                <div className="container mx-auto px-6 mb-24 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter mb-6">
                        System <span className="text-zinc-600">Stability</span>
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-medium">
                        Downtime is a failure of logic. We engineer for <strong className="text-white">permanent uptime</strong>.
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
                                className="group p-10 bg-white/[0.02] border border-white/5 hover:border-orange-500/30 transition-all duration-500 rounded-3xl"
                            >
                                <div className="p-4 rounded-full bg-white/5 w-fit mb-8 group-hover:bg-orange-500/10 transition-colors">
                                    <outcome.icon className="w-6 h-6 text-zinc-400 group-hover:text-orange-500 transition-colors" />
                                </div>
                                <h3 className="text-2xl font-bold text-white uppercase mb-4 tracking-tight">{outcome.title}</h3>
                                <p className="text-zinc-400 font-medium mb-12 text-lg leading-relaxed">{outcome.description}</p>

                                <div className="pt-8 border-t border-white/5 flex flex-col gap-1">
                                    <div className="text-5xl font-bold text-white tracking-tighter">{outcome.metric}</div>
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">{outcome.metricLabel}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Deployment Timeline */}
            <section id="coverage" className="py-40 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter mb-8">
                            The <span className="text-zinc-600">Coverage</span> Loop
                        </h2>
                        <p className="text-xl text-zinc-500 uppercase tracking-widest font-bold">
                            How we architect your digital security.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-12">
                        {transformation.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="flex gap-8 md:gap-12 p-10 bg-black/50 backdrop-blur-sm border border-white/5 hover:border-orange-500/20 transition-all relative group rounded-3xl"
                            >
                                <div className="absolute -left-4 top-1/2 -translate-y-1/2 py-4 px-2 bg-orange-500 rounded-lg text-black font-black text-[10px] uppercase [writing-mode:vertical-lr] tracking-widest transform transition-transform group-hover:scale-110">
                                    Phase {i + 1}
                                </div>

                                <div className="flex-1 space-y-6">
                                    <div>
                                        <div className="text-orange-500 font-bold uppercase text-[10px] tracking-widest mb-2">{step.phase}</div>
                                        <h3 className="text-3xl md:text-4xl font-bold text-white uppercase tracking-tighter leading-none">{step.title}</h3>
                                    </div>
                                    <p className="text-xl text-zinc-400 font-medium leading-relaxed">{step.outcome}</p>

                                    <div className="flex flex-wrap gap-3">
                                        {step.deliverables.map((item, j) => (
                                            <div key={j} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10">
                                                <CheckCircle2 className="w-4 h-4 text-orange-500" />
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
            <section className="py-40 relative overflow-hidden bg-black">
                <div className="absolute inset-0 bg-orange-500/5 blur-[120px]" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="max-w-5xl mx-auto p-16 md:p-32 rounded-3xl bg-white/[0.02] border border-white/5 relative overflow-hidden backdrop-blur-3xl shadow-2xl">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] scale-150" />

                        <div className="relative z-10">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-[10px] font-bold uppercase tracking-widest mb-10"
                            >
                                <Lock className="w-4 h-4" /> System Hardened
                            </motion.div>

                            <h2 className="text-5xl md:text-8xl font-bold text-white uppercase tracking-tighter mb-10 leading-none">
                                Activate <span className="text-zinc-600">Protection</span>
                            </h2>

                            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-16 font-medium">
                                Do not settle for system decay.
                                <br />
                                <strong className="text-white">The Zero-Downtime Mesh is ready to start.</strong>
                            </p>

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-4 px-16 py-8 rounded-full bg-white text-black font-bold uppercase tracking-[0.2em] text-xl transition-all hover:scale-[1.02] shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                            >
                                <ShieldCheck className="w-8 h-8" />
                                Start My Mesh
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <RelatedServices currentPath="/services/maintenance" />

            <BreadcrumbSchema
                items={[
                    { name: 'Home', url: '/' },
                    { name: 'Services', url: '/services' },
                    { name: 'Maintenance', url: '/services/maintenance' }
                ]}
            />

            <Footer />
        </main>
    )
}
