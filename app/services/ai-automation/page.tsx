'use client'

import { motion } from 'framer-motion'
import {
    Cpu,
    Brain,
    Bot,
    Zap,
    Clock,
    ArrowRight,
    Settings,
    Shield,
    Award,
    CheckCircle2,
    Rocket,
    Code,
    Workflow,
    BarChart,
    RefreshCw,
    Search,
    Lock,
    Microscope,
    Activity
} from 'lucide-react'
import Link from 'next/link'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import RelatedServices from '@/components/services/RelatedServices'
import NeuralCore from '@/components/services/NeuralCore'
import { ServiceSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'

// Product Branding
const PRODUCT_NAME = "The Profit Autopilot™"
const PRODUCT_TAGLINE = "Elite Forensic AI Orchestration"

// Outcome-focused benefits
const outcomes = [
    {
        title: "Forensic Precision",
        description: "Eliminate logic leaks. Our autonomous agents execute complex workflows with mathematical certainty and zero human error.",
        icon: Shield,
        metric: "0%",
        metricLabel: "Error Rate"
    },
    {
        title: "Endless Throughput",
        description: "Your digital workforce scales instantly to handle infinite volume without overhead. Profit is decoupled from headcount.",
        icon: Clock,
        metric: "168hr",
        metricLabel: "Active Telemetry"
    },
    {
        title: "Neural Scalability",
        description: "Handle 1M+ data points without latency. Our infrastructure grows with your ambition, not your payroll.",
        icon: RefreshCw,
        metric: "Infinite",
        metricLabel: "Scale Capacity"
    }
]

// Social proof
const socialProof = [
    { value: "500K+", label: "Tasks Orchestrated" },
    { value: "48,000", label: "Work Hours Saved" },
    { value: "$12M+", label: "Capital Optimized" },
    { value: "92", label: "Active Deployments" }
]

// Transformation phases
const transformation = [
    {
        phase: "Phase 01",
        title: "Forensic Mapping",
        outcome: "We analyze your business logic with microscopic detail to identify high-yield automation vectors.",
        deliverables: ["Logic Flow Audit", "Efficiency Baseline", "Automation Strategy"]
    },
    {
        phase: "Phase 02",
        title: "Agent Calibration",
        outcome: "We engineer and train bespoke AI agents to dominate your specific workflows, integrating deep into your stack.",
        deliverables: ["Neural Agent Mesh", "API Integration", "Stress-Testing"]
    },
    {
        phase: "Phase 03",
        title: "Autonomous Lockdown",
        outcome: "The switch is flipped. Your operations enter a state of perpetual autonomy, monitored by live telemetry.",
        deliverables: ["Command Dashboard", "Performance Reports", "Recursive Optimization"]
    }
]

export default function AIAutomationPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
            <ServiceSchema
                name={`${PRODUCT_NAME} - Elite AI Automation by BIGWEB`}
                description={`${PRODUCT_TAGLINE}. Autonomous business systems that run 24/7. Zero human error, infinite scalability, massive cost reduction.`}
                serviceType="AI Automation"
                ratingValue={5.0}
                reviewCount={92}
            />

            <AdvancedNavigation />

            {/* Hero Section */}
            <section className="relative min-h-[110vh] flex items-center justify-center pt-32 pb-24 overflow-hidden bg-gradient-mesh">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:40px_40px]" />
                </div>

                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-[10%] left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px] animate-pulse-slow" />
                </div>

                <div className="relative z-10 container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-6xl mx-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="inline-flex items-center gap-3 px-6 py-2 rounded-full backdrop-blur-3xl bg-white/5 border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.1)] mb-12"
                        >
                            <Activity className="w-4 h-4 text-blue-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
                                Laboratory System: {PRODUCT_NAME}
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-5xl md:text-8xl lg:text-9xl font-black mb-8 tracking-tighter uppercase leading-[0.85] italic"
                        >
                            The Profit<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-600">
                                Autopilot™
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-lg md:text-2xl font-bold tracking-widest text-blue-500 uppercase italic mb-12"
                        >
                            {PRODUCT_TAGLINE}
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-xl md:text-3xl text-zinc-400 max-w-4xl mx-auto leading-tight mb-20 font-light"
                        >
                            We build <strong className="text-white font-black italic">autonomous AI agents</strong> that handle your global operations with forensic certainty.
                            Zero logic leaks. 100% precision.
                            <br />
                            <span className="text-white font-black underline decoration-blue-500 underline-offset-8">Human error is now obsolete.</span>
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24"
                        >
                            <Link
                                href="/contact"
                                className="group relative px-12 py-6 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-widest text-lg hover:bg-blue-500 transition-all hover:scale-105 shadow-2xl shadow-blue-500/20"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <Bot className="w-6 h-6" />
                                    Start My Automation
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                </span>
                            </Link>
                            <Link
                                href="#neural-core"
                                className="px-12 py-6 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-lg hover:bg-white/10 transition-all"
                            >
                                Inspect Architecture
                            </Link>
                        </motion.div>

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

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-30">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Scan for more</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-1 h-12 bg-gradient-to-b from-blue-500 to-transparent"
                    />
                </div>
            </section>

            {/* Neural Architecture */}
            <section id="neural-core" className="py-32 relative bg-[#080808]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-6"
                        >
                            <Microscope className="w-4 h-4" /> The Brain Stem
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase italic tracking-tighter mb-8 leading-none">
                            Neural <span className="text-zinc-800">Architecture</span>
                        </h2>
                        <p className="text-xl text-zinc-500 max-w-2xl mx-auto uppercase font-bold tracking-widest">
                            Inspect the underlying cognitive layer of our autonomous deployments.
                        </p>
                    </div>

                    <NeuralCore />
                </div>
            </section>

            {/* Outcome Framework */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]" />

                <div className="container mx-auto px-6 mb-24 text-center relative z-10">
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-6">
                        The <span className="text-blue-500">Outcome</span> Framework
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        We don't sell software. We deliver <strong className="text-white italic">verifiable business transformation</strong>.
                    </p>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid md:grid-cols-3 gap-8">
                        {outcomes.map((outcome, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:bg-white/[0.04]"
                            >
                                <div className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20 w-fit mb-8 group-hover:scale-110 transition-transform duration-500 shadow-glow shadow-blue-500/10">
                                    <outcome.icon className="w-8 h-8 text-blue-500" />
                                </div>
                                <h3 className="text-2xl font-black text-white uppercase italic mb-4">{outcome.title}</h3>
                                <p className="text-zinc-400 font-medium mb-12 text-lg leading-relaxed">{outcome.description}</p>

                                <div className="pt-8 border-t border-white/10 flex flex-col gap-1">
                                    <div className="text-5xl font-black text-blue-500 italic tracking-tighter">{outcome.metric}</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{outcome.metricLabel}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Deployment Workflow */}
            <section id="process" className="py-40 relative bg-white/[0.01]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-8 italic">
                            The <span className="text-blue-500">Deployment</span> Loop
                        </h2>
                        <p className="text-xl text-zinc-500 uppercase tracking-widest font-black">
                            From Mapping to Autonomous Lockdown.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-12">
                        {transformation.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="flex gap-8 md:gap-12 p-10 rounded-[3rem] bg-black border border-white/5 hover:border-blue-500/20 transition-all relative group"
                            >
                                <div className="absolute -left-4 top-1/2 -translate-y-1/2 py-4 px-2 bg-blue-600 rounded-lg text-white font-black text-[10px] uppercase [writing-mode:vertical-lr] tracking-widest transform transition-transform group-hover:scale-110">
                                    Phase {i + 1}
                                </div>

                                <div className="flex-1 space-y-6">
                                    <div>
                                        <div className="text-blue-500 font-black uppercase text-[10px] tracking-widest mb-2">{step.phase}</div>
                                        <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic leading-none">{step.title}</h3>
                                    </div>
                                    <p className="text-xl text-zinc-400 font-medium leading-relaxed">{step.outcome}</p>

                                    <div className="flex flex-wrap gap-3">
                                        {step.deliverables.map((item, j) => (
                                            <div key={j} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-500/5 border border-blue-500/10">
                                                <CheckCircle2 className="w-4 h-4 text-blue-500" />
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

            {/* Final Conversion Laboratory */}
            <section className="py-40 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600/5 blur-[120px]" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="max-w-5xl mx-auto p-16 md:p-32 rounded-[4rem] bg-white/[0.02] border border-white/5 relative overflow-hidden backdrop-blur-3xl shadow-2xl">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] scale-150" />

                        <div className="relative z-10">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-10"
                            >
                                <Lock className="w-4 h-4" /> Security Locked
                            </motion.div>

                            <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter mb-10 leading-none">
                                Enter <span className="text-blue-600">Autopilot</span> Mode
                            </h2>

                            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-16 font-medium">
                                Join the elite 92 companies who have decoupled their revenue from human overhead.
                                <br />
                                <strong className="text-white italic">The Laboratory is open.</strong>
                            </p>

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-4 px-16 py-8 rounded-[2rem] bg-white text-black font-black uppercase tracking-[0.2em] text-xl transition-all hover:scale-105 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                            >
                                <Bot className="w-8 h-8" />
                                Start My Autopilot
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <RelatedServices currentPath="/services/ai-automation" />

            <BreadcrumbSchema
                items={[
                    { name: 'Home', url: '/' },
                    { name: 'Services', url: '/services' },
                    { name: 'AI Automation', url: '/services/ai-automation' }
                ]}
            />

            <Footer />
        </main>
    )
}
