'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Search, ArrowRight, Target, FileText, Activity, TrendingUp, Zap, ShieldCheck, Microscope, Database, BarChart3, LineChart } from 'lucide-react'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import FAQSection from '@/components/FAQSection'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function RevenueRoadmapPage() {
    const diagnostics = [
        {
            id: "DX-01",
            label: "Diagnostic_Core",
            title: "Conversion Leak Mapping",
            desc: "High-resolution identification of exactly where traffic is dying in your funnel. We pinpoint 'The Great Dropoff' zones.",
            icon: Target
        },
        {
            id: "DX-02",
            label: "UX_Friction",
            title: "Behavioral Audit",
            desc: "Clinical analysis of click-rage zones, dead-end patterns, and scrolling fatigue across 12 device profiles.",
            icon: Activity
        },
        {
            id: "DX-03",
            label: "Logic_Review",
            title: "Messaging Anatomy",
            desc: "A psychological review of your headline impact and buyer-intent triggers. Are you speaking to pain or just features?",
            icon: Microscope
        },
        {
            id: "DX-04",
            label: "Perf_Delta",
            title: "Latency Assessment",
            desc: "Analysis of First Contentful Paint and interaction delays that cause user bounce before your message even loads.",
            icon: Zap
        },
        {
            id: "DX-05",
            label: "Blueprint_01",
            title: "Revenue Fix Roadmap",
            desc: "A prioritized list of the top 15 high-lift changes that will increase your yield immediately with minimum code changes.",
            icon: FileText
        },
        {
            id: "DX-06",
            label: "Output_Archive",
            title: "Clinical Handoff",
            desc: "A video walkthrough and PDF battle plan ready to hand over to your engineers for immediate execution.",
            icon: ShieldCheck
        },
    ]

    return (
        <main className="min-h-screen bg-black text-white selection:bg-orange-600/30">
            <AdvancedNavigation />

            {/* High-Tech Hero */}
            <section className="pt-48 pb-32 relative overflow-hidden border-b border-zinc-900">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:40px_40px] opacity-[0.05]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-5xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-flex items-center gap-3 px-4 py-1.5 bg-orange-600/10 border border-orange-500/20 text-orange-500 text-[10px] font-mono font-black uppercase tracking-[0.4em] mb-12"
                        >
                            <Search className="w-4 h-4" /> Diagnostic_Archive_v4.8
                        </motion.div>

                        <h1 className="text-6xl md:text-[7rem] font-black mb-10 italic tracking-tighter uppercase leading-[0.8] font-sans">
                            Revenue <br /><span className="text-orange-600">Roadmap.</span>
                        </h1>

                        <p className="text-2xl md:text-5xl text-zinc-500 font-medium mb-16 max-w-4xl leading-[1.05] tracking-tight">
                            Identify the <span className="text-white italic">Leak Delta</span>. Within 7 days, we deliver a clinical blueprint to stop revenue attrition and stabilize your conversion core.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-10 items-start md:items-center">
                            <Link href="#pricing">
                                <Button className="bg-orange-600 hover:bg-orange-500 text-white font-black text-xs uppercase tracking-[0.3em] px-14 h-24 rounded-none shadow-[0_0_80px_rgba(234,88,12,0.1)] transition-all duration-500 group">
                                    INITIATE DIAGNOSTIC
                                    <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-4 transition-transform" />
                                </Button>
                            </Link>
                            <div className="flex flex-col gap-2 border-l border-zinc-900 pl-8">
                                <span className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest">Typical_Client_ROI</span>
                                <span className="text-3xl font-black text-emerald-500 italic tracking-tighter">+24-118%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Industrial Telemetry Snippet */}
            <section className="py-24 border-b border-zinc-900 bg-zinc-950/20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-16">
                        {[
                            { label: "Extraction_Rate", val: "7 Days", desc: "Scientific speed. We ingest, analyze, and deliver within 1 week of data access." },
                            { label: "Data_Points", val: "1,200+", desc: "Metrics tracked per audit including thermal heatmaps and intent categorization." },
                            { label: "Efficiency", val: "0% Waste", desc: "We only tell you what to fix. No fluff. No filler. No bloated reports." },
                        ].map((stat, i) => (
                            <div key={i} className="space-y-4 border-l-2 border-zinc-900 pl-10 group hover:border-orange-500/50 transition-colors">
                                <div className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.3em]">{stat.label}</div>
                                <div className="text-5xl font-black italic tracking-tighter text-white group-hover:text-orange-600 transition-colors">{stat.val}</div>
                                <p className="text-sm text-zinc-500 leading-relaxed font-medium">{stat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Clinical Analytics Visualization */}
            <section className="py-24 bg-black">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-20 items-center">
                        <div className="lg:col-span-4">
                            <div className="text-[10px] font-mono font-bold text-orange-600 uppercase tracking-[0.5em] mb-6">Outcome_Visualization</div>
                            <h2 className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase leading-none mb-10">
                                Trace the <br /><span className="text-white/20">Anomaly.</span>
                            </h2>
                            <p className="text-lg text-zinc-500 font-medium leading-relaxed border-l-2 border-orange-600/30 pl-8">
                                Most business owners treat their website like a black box. We turn on the lights. See exactly where your profit is being filtered out.
                            </p>
                        </div>

                        <div className="lg:col-span-8 bg-black border border-zinc-900 p-12 relative overflow-hidden group shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-600/[0.03] to-transparent pointer-events-none" />

                            <div className="flex items-center justify-between mb-16">
                                <div className="space-y-1">
                                    <div className="text-[10px] font-mono font-bold text-zinc-600 uppercase">Detection_Layer_Alpha</div>
                                    <h4 className="text-xl font-black italic uppercase tracking-tighter text-white">Conversion Funnel Leakage</h4>
                                </div>
                                <div className="h-10 w-32 border border-zinc-900 flex items-center justify-center font-mono text-[10px] uppercase font-bold text-zinc-700">Real-Time Snippet</div>
                            </div>

                            <div className="flex items-end gap-2 h-40">
                                {[40, 65, 30, 85, 45, 90, 20, 55, 75, 50, 95].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${h}%` }}
                                        transition={{ delay: i * 0.05, duration: 1 }}
                                        className="flex-1 bg-zinc-900 relative group-hover:bg-zinc-800 transition-colors"
                                    >
                                        {i === 5 && <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[8px] font-mono font-bold text-orange-600">PEAK_BOUNCE</div>}
                                        {i === 10 && <div className="absolute inset-0 bg-orange-600/20 shadow-[0_0_20px_rgba(234,88,12,0.3)]" />}
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-16 grid grid-cols-3 gap-12 border-t border-zinc-900 pt-12">
                                <div className="space-y-1">
                                    <span className="text-[9px] font-mono font-bold text-zinc-700 uppercase">Avg_Abandonment</span>
                                    <div className="text-2xl font-black text-white italic tracking-tighter">68.4%</div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[9px] font-mono font-bold text-zinc-700 uppercase">Recovery_Potent</span>
                                    <div className="text-2xl font-black text-orange-600 italic tracking-tighter">+$12.4K / mo</div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-[9px] font-mono font-bold text-zinc-700 uppercase">Confidence</span>
                                    <div className="text-2xl font-black text-emerald-500 italic tracking-tighter">High</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* The Deliverables Grid */}
            <section className="py-24 border-y border-zinc-900 bg-zinc-950/20">
                <div className="container mx-auto px-6">
                    <div className="mb-20">
                        <div className="text-[10px] font-mono font-bold text-orange-600 uppercase tracking-[0.5em] mb-6">Execution_Archive</div>
                        <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
                            Diagnostic <br /><span className="text-zinc-800">Deliverables.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-900 border border-zinc-900 overflow-hidden">
                        {diagnostics.map((item, i) => {
                            const Icon = item.icon
                            return (
                                <div key={i} className="bg-black p-16 hover:bg-zinc-950 transition-all duration-500 group relative">
                                    <div className="w-16 h-16 border border-zinc-900 flex items-center justify-center mb-10 group-hover:border-orange-500/50 group-hover:bg-orange-600/5 transition-all">
                                        <Icon className="w-8 h-8 text-zinc-600 group-hover:text-orange-500 transition-colors" />
                                    </div>
                                    <div className="text-[9px] font-mono font-bold text-zinc-700 uppercase tracking-[0.2em] mb-4">{item.label}</div>
                                    <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white mb-6 leading-none">{item.title}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed font-normal">{item.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Quote Block */}
            <section className="py-24 bg-black">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-4xl md:text-7xl font-black italic tracking-tighter uppercase max-w-6xl mx-auto leading-[0.9] mb-12">
                        "Your website isn't broken because of code. It's broken because of <span className="text-orange-600">Leak Friction.</span> We solve that in 7 days."
                    </p>
                    <div className="text-[10px] font-mono font-bold text-zinc-700 uppercase tracking-[0.5em]">— CHIEF DIAGNOSTICIAN // BIGWEB™</div>
                </div>
            </section>

            {/* Final PRICING / CTA */}
            <section id="pricing" className="py-32 bg-black relative border-t border-zinc-900 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto border-2 border-zinc-900 p-12 bg-zinc-950/40 relative text-center">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-10 py-3 bg-orange-600 text-white font-black text-xs uppercase tracking-[0.4em]">
                            ORDER_ROADMAP_v1
                        </div>

                        <div className="mb-12">
                            <div className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.4em] mb-8">One-Time_Diagnostic_Investment</div>
                            <div className="flex items-center justify-center gap-4">
                                <div className="text-[8rem] font-black text-white italic tracking-tighter leading-none">$500</div>
                            </div>
                            <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest mt-10">High-Fidelity Report + Implementation Plan</p>
                        </div>

                        <Link href="/contact?plan=diagnostic" className="block w-full">
                            <Button className="w-full h-24 bg-white text-black hover:bg-orange-600 hover:text-white font-black text-sm uppercase tracking-[0.3em] transition-all duration-500 rounded-none shadow-2xl">
                                REQUEST DIAGNOSTIC NOW
                            </Button>
                        </Link>

                        <div className="mt-12 flex justify-center gap-12 opacity-30 grayscale items-center grayscale">
                            <div className="h-px flex-1 bg-zinc-800" />
                            <span className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-widest whitespace-nowrap">clinical_performance_v4.8</span>
                            <div className="h-px flex-1 bg-zinc-800" />
                        </div>
                    </div>
                </div>
            </section>

            <FAQSection category="audit" title="Roadmap FAQs" />
            <Footer />
        </main>
    )
}
