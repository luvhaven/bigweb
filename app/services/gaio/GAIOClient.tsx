'use client'

import { motion } from 'framer-motion'
import {
    Brain,
    Bot,
    MessageSquare,
    Sparkles,
    ArrowRight,
    Target,
    Shield,
    Award,
    CheckCircle2,
    Rocket,
    Zap,
    Search,
    Database,
    Lock,
    Globe,
    Cpu,
    Fingerprint,
    Network
} from 'lucide-react'
import Link from 'next/link'
import RelatedServices from '@/components/services/RelatedServices'
import LLMCalibration from '@/components/services/LLMCalibration'

// Product Branding
const PRODUCT_NAME = "The Answer Vault™"
const PRODUCT_TAGLINE = "High-Fidelity Answer Ownership"

// Outcome-focused benefits
const outcomes = [
    {
        title: "Answer Ownership",
        description: "When high-intent users query ChatGPT, Claude, or Perplexity, we ensure YOUR entities are the default authoritative citation.",
        icon: Fingerprint,
        metric: "100%",
        metricLabel: "Citation Integrity"
    },
    {
        title: "Entity Injection",
        description: "We hard-wire your brand into the global Knowledge Graph, making it an immutable truth for Large Language Models.",
        icon: Network,
        metric: "Preferred",
        metricLabel: "Source Node"
    },
    {
        title: "Matrix Dominance",
        description: "Traditional search is dead. We optimize for the agents that now control 90% of technical information discovery.",
        icon: Globe,
        metric: "Elite",
        metricLabel: "Market Share"
    }
]

// Social proof
const socialProof = [
    { value: "12", label: "Models Calibrated" },
    { value: "450%", label: "Authority Lift" },
    { value: "Live", label: "Entity Sync" },
    { value: "Elite", label: "Model Priority" }
]

// Transformation phases
const transformation = [
    {
        phase: "Phase 01",
        title: "Model Scan",
        outcome: "We run deep analysis queries across 12+ LLMs to map your current brand footprint and identify entity friction.",
        deliverables: ["Sentiment DNA Map", "Knowledge Gap Audit", "Friction Index"]
    },
    {
        phase: "Phase 02",
        title: "Knowledge Instruction",
        outcome: "We structuralize your business intelligence using advanced Schema and specialized entity-injection content.",
        deliverables: ["Metadata Lockdown", "Entity Mesh Build", "Source Optimization"]
    },
    {
        phase: "Phase 03",
        title: "Citation Lockdown",
        outcome: "Your brand becomes the primary node. We monitor model drift to ensure your authority remains unshakeable.",
        deliverables: ["Live Citation Feed", "Drift Monitoring", "Matrix Expansion"]
    }
]

export default function GAIOClient() {
    return (
        <div className="selection:bg-indigo-500/30">
            {/* Hero Section */}
            <section className="relative min-h-[100svh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-gradient-mesh">
                {/* Background Grid */}
                <div className="absolute inset-0 opacity-[0.03]">
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:30px_30px]" />
                </div>

                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-[5%] right-[5%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[140px] animate-pulse" />
                    <div className="absolute bottom-[5%] left-[5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow" />
                </div>

                <div className="relative z-10 container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-5xl mx-auto"
                    >
                        {/* Status Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="inline-flex items-center gap-3 px-5 py-2 rounded-full backdrop-blur-3xl bg-white/5 border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.1)] mb-8"
                        >
                            <Target className="w-4 h-4 text-indigo-400" />
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-indigo-400">
                                Calibration System: {PRODUCT_NAME}
                            </span>
                        </motion.div>

                        {/* Main Headline */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-4xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter uppercase leading-[0.85] italic"
                        >
                            The Answer<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-indigo-600 to-blue-600">
                                Vault™
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-base md:text-xl font-bold tracking-[0.4em] text-indigo-500 uppercase italic mb-8"
                        >
                            {PRODUCT_TAGLINE}
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-lg md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-tight mb-12 font-light"
                        >
                            Google is no longer the search gatekeeper. <strong className="text-white font-black italic">LLMs are.</strong>
                            <br />
                            We calibrate AI models to cite your brand as the <span className="text-white font-black underline decoration-indigo-500 underline-offset-8">absolute industry authority</span>.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                            className="flex flex-col sm:flex-row gap-5 justify-center items-center mb-16"
                        >
                            <Link
                                href="/contact"
                                className="group relative px-10 py-5 rounded-xl bg-indigo-600 text-white font-black uppercase tracking-widest text-sm hover:bg-indigo-500 transition-all hover:scale-105 shadow-2xl shadow-indigo-500/20"
                            >
                                <span className="relative z-10 flex items-center gap-3">
                                    <Brain className="w-5 h-5" />
                                    Calibrate Brand
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                                </span>
                            </Link>
                            <Link
                                href="#demo"
                                className="px-10 py-5 rounded-xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all font-bold"
                            >
                                Live Demo
                            </Link>
                        </motion.div>

                        {/* Data Telemetry */}
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

            {/* The Demonstration (Technical Component) */}
            <section id="demo" className="py-32 relative bg-[#080808]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-6"
                        >
                            <Search className="w-4 h-4" /> Live Calibration Monitor
                        </motion.div>
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-8 leading-none">
                            The <span className="text-zinc-800">Calibration</span> Result
                        </h2>
                        <p className="text-xl text-zinc-500 max-w-2xl mx-auto uppercase font-bold tracking-widest">
                            Watch how we force Large Language Models to recognize and cite your authority.
                        </p>
                    </div>

                    <LLMCalibration />
                </div>
            </section>

            {/* Outcome Framework */}
            <section className="py-32 relative overflow-hidden bg-[#050505]">
                <div className="container mx-auto px-6 mb-24 text-center">
                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-6">
                        Forensic <span className="text-indigo-500">Intelligence</span>
                    </h2>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto font-medium">
                        We don't just optimize. We <strong className="text-white italic">structuralize</strong> your superiority for the machine age.
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
                                className="group p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-indigo-500/30 transition-all duration-500"
                            >
                                <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 w-fit mb-8 group-hover:scale-110 transition-transform duration-500">
                                    <outcome.icon className="w-8 h-8 text-indigo-500" />
                                </div>
                                <h3 className="text-2xl font-black text-white uppercase italic mb-4">{outcome.title}</h3>
                                <p className="text-zinc-400 font-medium mb-12 text-lg leading-relaxed">{outcome.description}</p>

                                <div className="pt-8 border-t border-white/10 flex flex-col gap-1">
                                    <div className="text-5xl font-black text-indigo-500 italic tracking-tighter">{outcome.metric}</div>
                                    <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">{outcome.metricLabel}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Transformation Process */}
            <section id="process" className="py-40 relative bg-white/[0.01]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-7xl font-black text-white uppercase italic tracking-tighter mb-8">
                            Instruction <span className="text-indigo-500">System</span>
                        </h2>
                        <p className="text-xl text-zinc-500 uppercase tracking-widest font-black">
                            How we embed your brand into the global knowledge graph.
                        </p>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-12">
                        {transformation.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="flex gap-8 md:gap-12 p-10 rounded-[3rem] bg-black border border-white/5 hover:border-indigo-500/20 transition-all relative group"
                            >
                                <div className="absolute -left-4 top-1/2 -translate-y-1/2 py-4 px-2 bg-indigo-600 rounded-lg text-white font-black text-[10px] uppercase [writing-mode:vertical-lr] tracking-widest transform transition-transform group-hover:scale-110">
                                    Phase {i + 1}
                                </div>

                                <div className="flex-1 space-y-6">
                                    <div>
                                        <div className="text-indigo-500 font-black uppercase text-[10px] tracking-widest mb-2">{step.phase}</div>
                                        <h3 className="text-3xl md:text-4xl font-black text-white uppercase italic leading-none">{step.title}</h3>
                                    </div>
                                    <p className="text-xl text-zinc-400 font-medium leading-relaxed">{step.outcome}</p>

                                    <div className="flex flex-wrap gap-3">
                                        {step.deliverables.map((item, j) => (
                                            <div key={j} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/5 border border-indigo-500/10">
                                                <CheckCircle2 className="w-4 h-4 text-indigo-500" />
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
                <div className="absolute inset-0 bg-indigo-600/5 blur-[120px]" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="max-w-5xl mx-auto p-16 md:p-32 rounded-[4rem] bg-white/[0.02] border border-white/5 relative overflow-hidden backdrop-blur-3xl shadow-2xl">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] scale-150" />

                        <div className="relative z-10">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-10"
                            >
                                <Lock className="w-4 h-4" /> Authority Locked
                            </motion.div>

                            <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter mb-10 leading-none">
                                Own The <span className="text-indigo-600">Answer</span>
                            </h2>

                            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto mb-16 font-medium">
                                Do not let your competitors train the machines.
                                <br />
                                <strong className="text-white italic">Occupy the Knowledge Graph now.</strong>
                            </p>

                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-4 px-16 py-8 rounded-[2rem] bg-white text-black font-black uppercase tracking-[0.2em] text-xl transition-all hover:scale-105 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                            >
                                <Cpu className="w-8 h-8" />
                                Begin Calibration
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <RelatedServices currentPath="/services/gaio" />
        </div>
    )
}
