'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Rocket, ArrowRight, Code, Layers, ShieldCheck, Cpu, Database, Network, Building2, Workflow, Globe, Zap, Component } from 'lucide-react'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import FAQSection from '@/components/FAQSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function RevenueSystemPage() {
    const componentStack = [
        {
            id: "ST-01",
            title: "Performance Monolith",
            desc: "A Next.js core architecture with zero-latency hydration and global edge caching.",
            icon: Cpu
        },
        {
            id: "UI-02",
            title: "Command Interface",
            desc: "Bespoke design system engineered for high-transaction environments and authority building.",
            icon: Component
        },
        {
            id: "DA-03",
            title: "Revenue Logic Layer",
            desc: "Custom hooks and middleware for real-time offer personalization and lead segmenting.",
            icon: Workflow
        }
    ]

    const architectureModules = [
        { label: "Arch_Module_01", title: "Global Edge Monolith", desc: "A high-performance codebase engineered for sub-second paint times and global edge delivery via Vercel Edge Network." },
        { label: "Arch_Module_02", title: "Industrial Design System", desc: "A bespoke visual language that commands authority and eliminates buyer hesitation instantly. 0px border radius, high-contrast." },
        { label: "Arch_Module_03", title: "Headless Commerce Sync", desc: "Seamless integration with Stripe, Shopify, or custom payment engines for zero-friction checkout and subscription management." },
        { label: "Arch_Module_04", title: "Lead Engine v5.0", desc: "Intelligent segmentation forms and qualification logic built into the core user journey using Supabase/Edge Functions." },
        { label: "Arch_Module_05", title: "Semantic SEO Foundation", desc: "Structured data and semantic HTML architecture to ensure search engines recognize your market dominance." },
        { label: "Arch_Module_06", title: "Network Security Mesh", desc: "Military-grade DDOS protection and encrypted data flows for universal performance parity and security." }
    ]

    const phases = [
        { id: "01", title: "System Anatomy", desc: "Mapping the technical dependencies, data object flows, and revenue conversion nodes." },
        { id: "02", title: "Visual Engineering", desc: "High-fidelity UI construction focusing on psychological conversion triggers and brand weight." },
        { id: "03", title: "Core Architecture", desc: "Technical builds using React, Tailwind Industrial, and Next.js App Router for zero-debt scaling." },
        { id: "04", title: "Launch & Stabilization", desc: "Global deployment, stress testing, and 30-day post-launch optimization monitoring." }
    ]

    return (
        <main className="min-h-screen bg-black text-white selection:bg-orange-600/30">
            <AdvancedNavigation />

            {/* High-Impact Hero */}
            <section className="pt-48 pb-32 relative overflow-hidden border-b border-zinc-900">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:40px_40px] opacity-[0.05]" />
                <div className="absolute top-0 right-0 w-[1200px] h-[1200px] bg-orange-600/[0.03] rounded-full blur-[200px] -translate-y-1/2 translate-x-1/2" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-6xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-3 px-4 py-1.5 bg-orange-600/10 border border-orange-500/20 text-orange-500 text-[10px] font-mono font-black uppercase tracking-[0.4em] mb-12"
                        >
                            <Rocket className="w-4 h-4" /> Industrial_System_Build_v10.4
                        </motion.div>

                        <h1 className="text-7xl md:text-[12rem] font-black mb-12 italic tracking-tighter uppercase leading-[0.7] font-sans">
                            Revenue <br /><span className="text-zinc-800">System.</span>
                        </h1>

                        <p className="text-2xl md:text-5xl text-zinc-500 font-medium mb-20 max-w-4xl leading-[1.05] tracking-tight">
                            The definitive <span className="text-white italic">Digital Infrastructure</span>. We rebuild your presence from the binary up to be a high-yield engine for 7 and 8-figure scaling.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-12 items-start md:items-center">
                            <Link href="/contact">
                                <Button className="bg-orange-600 hover:bg-orange-500 text-white font-black text-xs uppercase tracking-[0.3em] px-16 h-24 rounded-none shadow-[0_0_100px_rgba(234,88,12,0.1)] transition-all duration-500 group">
                                    INITIALIZE BUILD
                                    <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-4 transition-transform" />
                                </Button>
                            </Link>
                            <div className="flex flex-col gap-2 border-l-2 border-zinc-900 pl-8 h-fit">
                                <span className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest leading-none">Typical_Build_Cycle</span>
                                <span className="text-3xl font-black text-white italic tracking-tighter">45-60 Days</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Component Stack Visualization */}
            <section className="py-40 bg-black">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-3 gap-16">
                        {componentStack.map((item, i) => {
                            const Icon = item.icon
                            return (
                                <div key={i} className="group border-l border-zinc-900 pl-10 space-y-8 py-4 hover:border-orange-500/50 transition-colors">
                                    <div className="text-[10px] font-mono font-bold text-zinc-700 group-hover:text-orange-500 transition-colors">{item.id}</div>
                                    <div className="w-16 h-16 border border-zinc-900 bg-zinc-950 flex items-center justify-center group-hover:bg-orange-600/5 group-hover:scale-110 transition-all duration-500">
                                        <Icon className="w-8 h-8 text-zinc-600 group-hover:text-orange-500" />
                                    </div>
                                    <h3 className="text-3xl font-black uppercase italic tracking-tighter leading-none">{item.title}</h3>
                                    <p className="text-zinc-500 text-base leading-relaxed max-w-xs">{item.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Industrial Component Grid */}
            <section className="py-40 border-y border-zinc-900 bg-zinc-950/20">
                <div className="container mx-auto px-6">
                    <div className="mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
                        <div className="max-w-2xl">
                            <div className="text-[10px] font-mono font-bold text-orange-600 uppercase tracking-[0.5em] mb-6">Performance_Manifest</div>
                            <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-[0.85]">
                                Core <br /><span className="text-zinc-800">Architecture.</span>
                            </h2>
                        </div>
                        <div className="text-zinc-500 text-sm max-w-sm border-l-2 border-orange-600/30 pl-8 mb-4">
                            Every Revenue System is built on an enterprise-grade stack designed for zero-debt scaling and technical superiority.
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900 overflow-hidden">
                        {architectureModules.map((item, i) => (
                            <div key={i} className="bg-black p-16 hover:bg-zinc-950 transition-all duration-500 group relative">
                                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Zap className="w-4 h-4 text-orange-600 animate-pulse" />
                                </div>
                                <span className="text-[9px] font-mono font-bold text-zinc-700 uppercase tracking-[0.2em] block mb-10">{item.label}</span>
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mb-6 leading-none">{item.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed font-normal">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Workflow Visualization */}
            <section className="py-40 bg-black">
                <div className="container mx-auto px-6 text-center">
                    <div className="mb-32">
                        <div className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.5em] mb-6">Phase_Initialization</div>
                        <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-none italic">
                            The Build Workflow
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {phases.map((phase, i) => (
                            <div key={i} className="p-12 border border-zinc-900 bg-black text-left relative overflow-hidden group hover:border-orange-500/30 transition-all duration-500">
                                <div className="absolute top-0 right-0 p-6 font-mono text-[9px] font-bold text-zinc-800">STEP_{phase.id}</div>
                                <div className="w-16 h-16 border border-zinc-900 flex items-center justify-center mb-10 group-hover:border-orange-500/50 group-hover:bg-orange-600/5 transition-all">
                                    <span className="text-zinc-600 font-black italic text-xl group-hover:text-orange-500 transition-colors">{phase.id}</span>
                                </div>
                                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-6 leading-none">{phase.title}</h3>
                                <p className="text-sm text-zinc-600 font-medium leading-relaxed">{phase.desc}</p>

                                {i < 3 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-zinc-900 z-10" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final Investment / CTA */}
            <section className="py-48 bg-black relative border-t border-zinc-900">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-orange-600/[0.02] to-transparent pointer-events-none" />
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row gap-32 items-center">
                        <div className="flex-1">
                            <h2 className="text-6xl md:text-9xl font-black italic tracking-tighter uppercase mb-12 leading-[0.8] font-sans">
                                Dominance <br />By <span className="text-orange-600">Design.</span>
                            </h2>
                            <p className="text-2xl text-zinc-500 font-medium mb-16 max-w-2xl leading-relaxed tracking-tight">
                                This is not a project. It's a structural reset of your business's ability to capture and multiply revenue at scale.
                            </p>
                            <div className="grid grid-cols-2 gap-20">
                                <div className="space-y-4">
                                    <div className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.4em]">Base_Investment</div>
                                    <div className="text-6xl font-black text-white italic tracking-tighter leading-none">$25,000+</div>
                                </div>
                                <div className="space-y-4">
                                    <div className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.4em]">Capacity</div>
                                    <div className="text-6xl font-black text-white italic tracking-tighter leading-none">1 / Qtr</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 w-full max-w-2xl border-2 border-zinc-900 p-20 bg-zinc-950/20 relative shadow-[0_0_80px_rgba(0,0,0,0.5)]">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 blur-[60px]" />
                            <h3 className="text-3xl font-black italic uppercase tracking-tighter mb-10 text-white">Project Application</h3>
                            <p className="text-base text-zinc-500 mb-12 leading-relaxed">Describe your current volume and scalability constraints. We will conduct a preliminary architectural audit before scheduling a strategy sync.</p>

                            <Link href="/contact?plan=revenue-system" className="block w-full">
                                <Button className="w-full h-24 bg-white text-black hover:bg-orange-600 hover:text-white font-black text-sm uppercase tracking-[0.3em] transition-all duration-500 rounded-none shadow-2xl">
                                    START APPLICATION
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <FAQSection category="services" title="Enterprise FAQs" />
            <Footer />
        </main>
    )
}
