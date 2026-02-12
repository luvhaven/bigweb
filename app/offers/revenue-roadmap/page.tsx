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
                            className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-600/10 border border-orange-500/20 text-orange-500 text-xs font-semibold uppercase tracking-wider mb-8"
                        >
                            <Search className="w-4 h-4" /> Your Conversion Roadmap
                        </motion.div>

                        <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tight leading-tight">
                            Revenue<br /><span className="text-orange-600">Roadmap.</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-zinc-400 font-medium mb-12 max-w-3xl leading-relaxed">
                            Find exactly where your website is <span className="text-white">losing customers</span>. Within 7 days, you'll have a clear action plan to fix it.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-8 items-start md:items-center">
                            <Link href="#pricing">
                                <Button className="bg-orange-500 hover:bg-orange-400 text-white font-bold text-sm uppercase tracking-wider px-10 h-16 rounded-lg shadow-lg transition-all duration-300 group">
                                    Get My Roadmap
                                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                            <div className="flex flex-col gap-1 border-l border-zinc-800 pl-6">
                                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Typical Client ROI</span>
                                <span className="text-2xl font-black text-emerald-500 tracking-tight">+24-118%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Stats */}
            <section className="py-20 border-b border-zinc-900 bg-zinc-950/20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { label: "Delivery Time", val: "7 Days", desc: "We analyze your data and deliver actionable insights within one week." },
                            { label: "Data Points", val: "1,200+", desc: "Metrics tracked per audit including heatmaps and user behavior analysis." },
                            { label: "Zero Fluff", val: "100%", desc: "We only tell you what to fix. No filler, no bloated reports." },
                        ].map((stat, i) => (
                            <div key={i} className="space-y-3 border-l-2 border-zinc-800 pl-8 group hover:border-orange-500/50 transition-colors">
                                <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">{stat.label}</div>
                                <div className="text-4xl font-black tracking-tight text-white group-hover:text-orange-500 transition-colors">{stat.val}</div>
                                <p className="text-sm text-zinc-500 leading-relaxed font-medium">{stat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What You'll See */}
            <section className="py-20 bg-black">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                        <div className="lg:col-span-4">
                            <div className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-4">Visual Analysis</div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight mb-8">
                                See Where<br /><span className="text-zinc-600">You're Losing.</span>
                            </h2>
                            <p className="text-lg text-zinc-400 font-medium leading-relaxed border-l-2 border-orange-500/30 pl-6">
                                Most business owners treat their website like a black box. We turn on the lights so you can see exactly where profit is slipping away.
                            </p>
                        </div>

                        <div className="lg:col-span-8 bg-black border border-zinc-800 p-10 relative overflow-hidden group shadow-xl rounded-lg">
                            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.03] to-transparent pointer-events-none" />

                            <div className="flex items-center justify-between mb-12">
                                <div className="space-y-1">
                                    <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Sample Analysis</div>
                                    <h4 className="text-lg font-bold text-white">Conversion Funnel Leakage</h4>
                                </div>
                                <div className="h-8 px-4 border border-zinc-800 flex items-center justify-center text-xs font-semibold uppercase text-zinc-600 rounded">Live Preview</div>
                            </div>

                            <div className="flex items-end gap-2 h-40">
                                {[40, 65, 30, 85, 45, 90, 20, 55, 75, 50, 95].map((h, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ height: 0 }}
                                        whileInView={{ height: `${h}%` }}
                                        transition={{ delay: i * 0.05, duration: 1 }}
                                        className="flex-1 bg-zinc-800 relative group-hover:bg-zinc-700 transition-colors rounded-t"
                                    >
                                        {i === 5 && <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-semibold text-orange-500">Peak Bounce</div>}
                                        {i === 10 && <div className="absolute inset-0 bg-orange-500/20 shadow-[0_0_20px_rgba(234,88,12,0.3)] rounded-t" />}
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-12 grid grid-cols-3 gap-10 border-t border-zinc-800 pt-10">
                                <div className="space-y-1">
                                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Avg Abandonment</span>
                                    <div className="text-xl font-black text-white tracking-tight">68.4%</div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Recovery Potential</span>
                                    <div className="text-xl font-black text-orange-500 tracking-tight">+$12.4K / mo</div>
                                </div>
                                <div className="space-y-1">
                                    <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Confidence</span>
                                    <div className="text-xl font-black text-emerald-500 tracking-tight">High</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What You'll Get */}
            <section className="py-20 border-y border-zinc-900 bg-zinc-950/20">
                <div className="container mx-auto px-6">
                    <div className="mb-16">
                        <div className="text-xs font-semibold text-orange-500 uppercase tracking-wider mb-4">What's Included</div>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                            Your<br /><span className="text-zinc-600">Deliverables.</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-800 border border-zinc-800 overflow-hidden rounded-lg">
                        {diagnostics.map((item, i) => {
                            const Icon = item.icon
                            return (
                                <div key={i} className="bg-black p-12 hover:bg-zinc-950 transition-all duration-300 group relative">
                                    <div className="w-12 h-12 border border-zinc-800 rounded-lg flex items-center justify-center mb-8 group-hover:border-orange-500/50 group-hover:bg-orange-500/5 transition-all">
                                        <Icon className="w-6 h-6 text-zinc-500 group-hover:text-orange-500 transition-colors" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-4 leading-tight">{item.title}</h3>
                                    <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Quote Block */}
            <section className="py-20 bg-black">
                <div className="container mx-auto px-6 text-center">
                    <p className="text-3xl md:text-5xl font-black tracking-tight max-w-4xl mx-auto leading-tight mb-8">
                        "Your website isn't broken because of bad code. It's broken because visitors can't find what they need. <span className="text-orange-500">We fix that in 7 days.</span>"
                    </p>
                    <div className="text-sm font-semibold text-zinc-500 uppercase tracking-wider">— The BIGWEB Team</div>
                </div>
            </section>

            {/* Pricing CTA */}
            <section id="pricing" className="py-24 bg-black relative border-t border-zinc-900 overflow-hidden">
                <div className="container mx-auto px-6">
                    <div className="max-w-3xl mx-auto border border-zinc-800 p-10 bg-zinc-950/40 relative text-center rounded-xl">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-6 py-2 bg-orange-500 text-white font-bold text-xs uppercase tracking-wider rounded-full">
                            Get Started
                        </div>

                        <div className="mb-10 pt-4">
                            <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-6">One-Time Investment</div>
                            <div className="flex items-center justify-center gap-4">
                                <div className="text-7xl md:text-8xl font-black text-white tracking-tight leading-none">$500</div>
                            </div>
                            <p className="text-zinc-400 text-sm font-medium mt-6">Complete audit report + implementation plan</p>
                        </div>

                        <Link href="/contact?plan=diagnostic" className="block w-full">
                            <Button className="w-full h-16 bg-white text-black hover:bg-orange-500 hover:text-white font-bold text-sm uppercase tracking-wider transition-all duration-300 rounded-lg shadow-lg">
                                Request My Roadmap
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <FAQSection category="audit" title="Roadmap FAQs" />
            <Footer />
        </main>
    )
}
