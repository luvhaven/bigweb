'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Zap, ArrowRight, Activity, ShieldCheck, Timer, Cpu, BarChart2, CheckCircle2, AlertCircle } from 'lucide-react'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import FAQSection from '@/components/FAQSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function FixSprintPage() {
    const modules = [
        { title: "Friction Removal", desc: "We remove interface obstacles that prevent users from completing checkout and making quick decisions." },
        { title: "CTA Optimization", desc: "Re-engineering call-to-action placement and messaging based on real user behavior data." },
        { title: "Mobile Parity", desc: "Ensuring your mobile experience converts as well as (or better than) desktop." },
        { title: "Trust Building", desc: "Adding social proof and credibility signals at key decision points to eliminate hesitation." },
        { title: "Speed Optimization", desc: "Reducing load times and eliminating script bloat for instant user feedback." },
        { title: "Messaging Clarity", desc: "Simplifying your value proposition into clear, compelling statements that drive action." }
    ]

    const timeline = [
        { step: "01", title: "Audit Ingestion", desc: "We ingest your Revenue Roadmap data and prioritize the top 5 'High-Yield' targets for immediate recovery." },
        { step: "02", title: "System Refactor", desc: "Our senior engineers execute code and UI changes in a hardened staging environment for peer review." },
        { step: "03", title: "Stress Testing", desc: "Rigorous QA across 12 viewport configurations and edge cases to ensure clinical stability at scale." },
        { step: "04", title: "Live Injection", desc: "Changes pushed to production with a 24-hour monitoring window to measure the initial delta impact." }
    ]

    return (
        <main className="min-h-screen bg-black text-white selection:bg-orange-600/30">
            <AdvancedNavigation />

            {/* High-Intensity Hero */}
            <section className="pt-48 pb-32 relative overflow-hidden border-b border-zinc-900">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:40px_40px] opacity-[0.05]" />
                <div className="absolute top-0 right-0 w-[1000px] h-px bg-gradient-to-l from-orange-600/40 via-transparent to-transparent" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-5xl">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-semibold uppercase tracking-wider mb-8"
                        >
                            <Zap className="w-4 h-4 animate-pulse" /> Fast Implementation
                        </motion.div>

                        <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tight leading-tight">
                            The Fix<br /><span className="text-zinc-600">Sprint.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-zinc-400 font-medium mb-12 max-w-3xl leading-relaxed">
                            Within 7 days, we surgically <span className="text-white">remove the barriers</span> preventing your users from converting.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-8 items-start md:items-center">
                            <Link href="#pricing">
                                <Button className="bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm uppercase tracking-wider px-10 h-16 rounded-lg shadow-lg transition-all duration-300 group">
                                    Start My Sprint
                                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-3 text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest leading-none">
                                    <span className="w-2.5 h-2.5 rounded-full bg-orange-600 animate-pulse" />
                                    Next Deployment Slot
                                </div>
                                <div className="text-2xl font-black text-white italic tracking-tighter">FEBRUARY 05, 2026</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Stats */}
            <section className="py-20 border-b border-zinc-900 bg-zinc-950/20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-10">
                        {[
                            { label: "Delivery Time", val: "7 Days", desc: "From data access to live deployment." },
                            { label: "Fixes Included", val: "Up to 5", desc: "Core UI or architectural improvements." },
                            { label: "Safety First", val: "100%", desc: "All changes tested in staging first." },
                            { label: "Avg Lift", val: "+14-40%", desc: "Typical conversion improvement." },
                        ].map((stat, i) => (
                            <div key={i} className="space-y-3">
                                <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{stat.label}</div>
                                <div className="text-3xl font-black tracking-tight text-white">{stat.val}</div>
                                <p className="text-sm text-zinc-500 font-medium">{stat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What We Fix */}
            <section className="py-32 bg-black">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-5">
                            <div className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-4">What We Fix</div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-8">
                                Focused<br /><span className="text-zinc-600">Improvements.</span>
                            </h2>
                            <p className="text-lg text-zinc-400 font-medium leading-relaxed border-l-2 border-orange-500/30 pl-6 mb-10">
                                We focus on the highest-impact changes identified in your audit. Every sprint is a concentrated effort on the fixes that matter most.
                            </p>
                            <div className="flex items-center gap-5">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-9 h-9 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-400">ENG</div>
                                    ))}
                                </div>
                                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">3 Engineers per Sprint</span>
                            </div>
                        </div>

                        <div className="lg:col-span-7 grid md:grid-cols-2 gap-4">
                            {modules.map((item, i) => (
                                <div key={i} className="bg-zinc-950/30 border border-zinc-800 p-8 hover:border-orange-500/30 transition-all duration-300 group rounded-lg">
                                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-orange-500 transition-colors">{item.title}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="py-32 border-y border-zinc-900 bg-zinc-950/20">
                <div className="container mx-auto px-6 text-center">
                    <div className="mb-24">
                        <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-4">The Process</div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                            The 7-Day Sprint
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-6">
                        {timeline.map((item, i) => (
                            <div key={i} className="bg-black border border-zinc-800 p-8 text-left relative overflow-hidden group hover:border-orange-500/30 transition-all rounded-lg">
                                <div className="text-5xl font-black text-zinc-900 mb-8 group-hover:text-orange-500/20 transition-colors">/{item.step}</div>
                                <h3 className="text-xl font-bold text-white mb-3 leading-tight">{item.title}</h3>
                                <p className="text-sm text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing */}
            <section id="pricing" className="py-32 bg-black relative text-center">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto border border-zinc-800 p-12 bg-zinc-950/40 relative shadow-xl rounded-xl">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-full">
                            Get Started
                        </div>

                        <div className="mb-12 pt-4">
                            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-6">One-Time Investment</div>
                            <div className="text-7xl md:text-8xl font-black text-white tracking-tight leading-none">$1,500</div>
                            <div className="text-zinc-400 text-sm font-medium mt-4">Per Sprint Cycle</div>
                        </div>

                        <Link href="/contact?plan=fix-sprint" className="block w-full">
                            <Button className="w-full h-16 bg-white text-black hover:bg-orange-500 hover:text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 rounded-lg shadow-lg">
                                Book My Sprint
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <FAQSection category="services" title="Fix Sprint FAQs" />
            <Footer />
        </main>
    )
}
