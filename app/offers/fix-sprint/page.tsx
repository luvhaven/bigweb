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
        { label: "Core_UX_Correction", title: "Friction Removal", desc: "Surgical removal of interface obstacles preventing user checkout velocity and sub-second decision making." },
        { label: "CTA_Logic_v2", title: "Trigger Optimization", desc: "Re-engineering call-to-action placement and psychological weighting based on heat-map data." },
        { label: "Mobile_Delta", title: "Device Parity", desc: "Locking down the mobile experience to match or exceed desktop conversion rates through viewport hardening." },
        { label: "Trust_Injection", title: "Social Proofing", desc: "Deploying high-impact credentials and clinical evidence at key user bounce points to eliminate hesitation." },
        { label: "Performance_Refactor", title: "Speed Hardening", desc: "Reducing paint times and script bloat to zero-latency standards for instant user feedback cycles." },
        { label: "Clarity_System", title: "Messaging Logic", desc: "Simplifying value propositions into high-intensity commands for immediate user comprehension and action." }
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
                            className="inline-flex items-center gap-3 px-4 py-1.5 bg-orange-600/10 border border-orange-500/20 text-orange-500 text-[10px] font-mono font-black uppercase tracking-[0.4em] mb-12"
                        >
                            <Zap className="w-4 h-4 animate-pulse" /> Rapid_Response_Phase_B
                        </motion.div>

                        <h1 className="text-7xl md:text-[11rem] font-black mb-12 italic tracking-tighter uppercase leading-[0.75] font-sans">
                            The Fix <br /><span className="text-zinc-800">Sprint.</span>
                        </h1>

                        <p className="text-2xl md:text-5xl text-zinc-500 font-medium mb-16 max-w-4xl leading-[1.05] tracking-tight">
                            Low friction leads to high yield. Within 7 days, we surgically <span className="text-white italic">remove the barriers</span> preventing your users from converting.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-10 items-start md:items-center">
                            <Link href="#pricing">
                                <Button className="bg-orange-600 hover:bg-orange-500 text-white font-black text-xs uppercase tracking-[0.3em] px-14 h-24 rounded-none shadow-[0_0_100px_rgba(234,88,12,0.1)] transition-all duration-500 group">
                                    INITIALIZE SPRINT
                                    <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-4 transition-transform" />
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

            {/* Execution Telemetry */}
            <section className="py-24 border-b border-zinc-900 bg-zinc-950/20">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-4 gap-12">
                        {[
                            { label: "Execution_Time", val: "7 Days", desc: "From data access to live code deployment." },
                            { label: "Target_Fixes", val: "Up to 5", desc: "Core architectural or UI refinements per sprint." },
                            { label: "System_Safety", val: "100%", desc: "Changes executed in clinical staging first." },
                            { label: "Measurable_Delta", val: "+14-40%", desc: "Average conversion lift per implementation cycle." },
                        ].map((stat, i) => (
                            <div key={i} className="space-y-4">
                                <div className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.3em]">{stat.label}</div>
                                <div className="text-4xl font-black italic tracking-tighter text-white">{stat.val}</div>
                                <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">{stat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Implementation Visualization */}
            <section className="py-40 bg-black">
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-12 gap-20 items-center">
                        <div className="lg:col-span-5">
                            <div className="text-[10px] font-mono font-bold text-orange-600 uppercase tracking-[0.5em] mb-6">Execution_Modules</div>
                            <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-none mb-10">
                                Tactical <br /><span className="text-white/20">Refines.</span>
                            </h2>
                            <p className="text-lg text-zinc-500 font-medium leading-relaxed border-l-2 border-orange-600/30 pl-8 mb-12">
                                We surgically dismantle friction. Every sprint is a high-intensity focused attack on the code bottlenecks found in your diagnostic.
                            </p>
                            <div className="flex items-center gap-6">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800 flex items-center justify-center font-mono text-[10px] font-bold text-zinc-500 uppercase">ENG</div>
                                    ))}
                                </div>
                                <span className="text-[10px] font-mono font-bold text-zinc-700 uppercase tracking-widest">3 Engineers Assigned per Sprint</span>
                            </div>
                        </div>

                        <div className="lg:col-span-7 grid md:grid-cols-2 gap-4">
                            {modules.map((item, i) => (
                                <div key={i} className="bg-zinc-950/30 border border-zinc-900 p-10 hover:border-orange-500/30 transition-all duration-500 group">
                                    <div className="text-[10px] font-mono font-bold text-zinc-700 uppercase tracking-[0.2em] mb-6 mb-8 block">{item.label}</div>
                                    <h3 className="text-xl font-black uppercase italic tracking-tighter text-white mb-4 group-hover:text-orange-600 transition-colors">{item.title}</h3>
                                    <p className="text-zinc-500 text-xs leading-relaxed font-medium">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Timeline Loop */}
            <section className="py-40 border-y border-zinc-900 bg-zinc-950/20">
                <div className="container mx-auto px-6 text-center">
                    <div className="mb-32">
                        <div className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.5em] mb-6">Operational_Timeline</div>
                        <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-none italic">
                            The 7-Day Protocol
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-4 gap-8">
                        {timeline.map((item, i) => (
                            <div key={i} className="bg-black border border-zinc-900 p-10 text-left relative overflow-hidden group hover:border-orange-500/30 transition-all">
                                <div className="text-6xl font-black text-zinc-900 italic mb-10 group-hover:text-orange-600/20 transition-colors">/{item.step}</div>
                                <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4 leading-none">{item.title}</h3>
                                <p className="text-sm text-zinc-500 font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing / Investment Lock */}
            <section id="pricing" className="py-48 bg-black relative text-center">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto border-2 border-zinc-900 p-24 bg-zinc-950/40 relative shadow-2xl">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-10 py-3 bg-orange-600 text-white font-black text-xs uppercase tracking-[0.4em]">
                            SPRINT_ACCESS_v2
                        </div>

                        <div className="mb-16">
                            <div className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.4em] mb-10">Mandatory_Execution_Investment</div>
                            <div className="text-[12rem] font-black text-white italic tracking-tighter leading-none">$1,500</div>
                            <div className="text-zinc-500 text-sm font-bold uppercase tracking-[0.2em] mt-10">Per Rapid Acceleration Cycle</div>
                        </div>

                        <Link href="/contact?plan=fix-sprint" className="block w-full">
                            <Button className="w-full h-24 bg-white text-black hover:bg-orange-600 hover:text-white font-black text-sm uppercase tracking-[0.3em] transition-all duration-500 rounded-none shadow-2xl">
                                LOCK IN SPRINT DATE
                            </Button>
                        </Link>

                        <div className="mt-16 flex justify-center gap-12 opacity-30 items-center">
                            <div className="h-px flex-1 bg-zinc-800" />
                            <span className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-widest whitespace-nowrap">clinical_execution_stable_v1.2</span>
                            <div className="h-px flex-1 bg-zinc-800" />
                        </div>
                    </div>
                </div>
            </section>

            <FAQSection category="services" title="Fix Sprint FAQs" />
            <Footer />
        </main>
    )
}
