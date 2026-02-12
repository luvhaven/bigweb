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
            title: "Performance Architecture",
            desc: "A Next.js core architecture with instant hydration and global edge caching.",
            icon: Cpu
        },
        {
            title: "Design System",
            desc: "Bespoke design engineered for high-transaction environments and authority.",
            icon: Component
        },
        {
            title: "Revenue Intelligence",
            desc: "Custom hooks and middleware for real-time offer personalization.",
            icon: Workflow
        }
    ]

    const architectureModules = [
        { title: "Global Edge Network", desc: "A high-performance codebase engineered for instant load times worldwide via Vercel Edge Network." },
        { title: "Premium Design System", desc: "A bespoke visual language that commands authority and builds trust instantly. High-contrast, precision layout." },
        { title: "Seamless Commerce", desc: "Integration with Stripe, Shopify, or custom payment engines for frictionless checkout and subscription management." },
        { title: "Lead Intelligence", desc: "Smart segmentation forms and qualification logic built into the core user journey." },
        { title: "Semantic SEO", desc: "Structured data and semantic HTML architecture to maximize search visibility and dominance." },
        { title: "Enterprise Security", desc: "Advanced protection and encrypted data flows for security and reliability." }
    ]

    const phases = [
        { id: "01", title: "Strategy & Audit", desc: "Mapping technical dependencies, data flows, and conversion opportunities." },
        { id: "02", title: "Visual Design", desc: "High-fidelity UI design focusing on psychological conversion triggers and brand authority." },
        { id: "03", title: "Development", desc: "Technical implementation using React, Tailwind CSS, and Next.js for scalable performance." },
        { id: "04", title: "Launch & Scale", desc: "Global deployment, testing, and post-launch optimization monitoring." }
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
                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-600/10 border border-orange-500/20 text-orange-500 text-xs font-semibold uppercase tracking-wider mb-8"
                        >
                            <Rocket className="w-4 h-4" /> Comprehensive Build
                        </motion.div>

                        <h1 className="text-7xl md:text-[12rem] font-black mb-12 italic tracking-tighter uppercase leading-[0.7] font-sans">
                            Revenue <br /><span className="text-zinc-800">System.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-zinc-400 font-medium mb-16 max-w-3xl leading-relaxed">
                            The definitive <span className="text-white">digital infrastructure</span>. We rebuild your presence to be a high-performance engine for scaling.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-12 items-start md:items-center">
                            <Link href="/contact">
                                <Button className="bg-orange-600 hover:bg-orange-500 text-white font-bold text-sm uppercase tracking-wider px-10 h-16 rounded-lg shadow-lg transition-all duration-300 group">
                                    Start Your Build
                                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <div className="flex flex-col gap-1 border-l-2 border-orange-500/30 pl-6 h-fit">
                                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Typical Timeline</span>
                                <span className="text-2xl font-black text-white tracking-tight">45-60 Days</span>
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
                                <div key={i} className="group border-l border-orange-500/30 pl-8 space-y-6 py-4 hover:border-orange-500 transition-colors">
                                    <div className="w-16 h-16 border border-zinc-800 bg-zinc-950/50 flex items-center justify-center rounded-xl group-hover:bg-orange-500/10 transition-all duration-300">
                                        <Icon className="w-8 h-8 text-zinc-500 group-hover:text-orange-500 transition-colors" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white tracking-tight leading-none">{item.title}</h3>
                                    <p className="text-zinc-400 text-base leading-relaxed">{item.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Industrial Component Grid */}
            <section className="py-32 border-y border-zinc-900 bg-zinc-950/20">
                <div className="container mx-auto px-6">
                    <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
                        <div className="max-w-xl">
                            <div className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-4">The Specs</div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                                Core <br /><span className="text-zinc-600">Architecture.</span>
                            </h2>
                        </div>
                        <div className="text-zinc-400 text-sm max-w-sm border-l-2 border-orange-500/30 pl-6 mb-4">
                            Every Revenue System is built on an enterprise-grade stack designed for scalability and technical superiority.
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900 border border-zinc-800 overflow-hidden shadow-xl rounded-xl">
                        {architectureModules.map((item, i) => (
                            <div key={i} className="bg-black p-10 hover:bg-zinc-950 transition-all duration-300 group relative">
                                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Workflow Visualization */}
            <section className="py-32 bg-black">
                <div className="container mx-auto px-6 text-center">
                    <div className="mb-20">
                        <div className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-4">The Process</div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                            Build Workflow
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {phases.map((phase, i) => (
                            <div key={i} className="p-10 border border-zinc-800 bg-black text-left relative overflow-hidden group hover:border-orange-500/30 transition-all duration-300 rounded-xl">
                                <div className="w-12 h-12 border border-zinc-800 flex items-center justify-center mb-6 group-hover:border-orange-500/50 group-hover:bg-orange-500/5 transition-all rounded-lg">
                                    <span className="text-zinc-500 font-bold text-lg group-hover:text-orange-500 transition-colors">{phase.id}</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-4">{phase.title}</h3>
                                <p className="text-sm text-zinc-400 leading-relaxed max-w-xs">{phase.desc}</p>
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
                            <h2 className="text-5xl md:text-8xl font-black tracking-tight uppercase mb-12 leading-tight">
                                Dominance <br />By <span className="text-orange-500">Design.</span>
                            </h2>
                            <p className="text-xl text-zinc-400 font-medium mb-12 max-w-2xl leading-relaxed">
                                This is not just a project. It's a structural reset of your business's ability to capture and multiply revenue at scale.
                            </p>
                            <div className="grid grid-cols-2 gap-10">
                                <div className="space-y-2">
                                    <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Investment</div>
                                    <div className="text-4xl font-black text-white tracking-tight">$25,000+</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Availability</div>
                                    <div className="text-4xl font-black text-white tracking-tight">1 / Qtr</div>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 w-full max-w-2xl border border-zinc-800 p-12 bg-zinc-950/50 relative shadow-2xl rounded-2xl">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 blur-[60px]" />
                            <h3 className="text-2xl font-bold uppercase tracking-tight mb-8 text-white">Project Application</h3>
                            <p className="text-sm text-zinc-400 mb-10 leading-relaxed">Describe your current volume and scalability constraints. We will conduct a preliminary architectural audit before scheduling a strategy sync.</p>

                            <Link href="/contact?plan=revenue-system" className="block w-full">
                                <Button className="w-full h-16 bg-white text-black hover:bg-orange-500 hover:text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 rounded-lg shadow-lg">
                                    Start Application
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
