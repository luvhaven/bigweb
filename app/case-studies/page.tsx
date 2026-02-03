'use client'

import React from 'react'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import ElitePortfolio from '@/components/ElitePortfolio'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Activity, Search, Target, TrendingUp, Lock } from 'lucide-react'
import { ChromeShimmer } from '@/components/ui/ChromeShimmer'

export default function CaseStudiesPage() {
    // In a real app, projects would be passed from a server component or fetched via API
    // For this demonstration, we'll assume ElitePortfolio handles its own data or is passed from parent

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-orange-500/30">
            <AdvancedNavigation />

            {/* Hero Section */}
            <section className="relative pt-48 pb-20 overflow-hidden bg-gradient-mesh">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[size:40px_40px]" />
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <ChromeShimmer />
                </div>
                <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="max-w-5xl mx-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-3 px-6 py-2 rounded-full backdrop-blur-3xl bg-white/5 border border-orange-500/20 mb-12 shadow-[0_0_30px_rgba(249,115,22,0.1)]"
                        >
                            <Activity className="w-4 h-4 text-orange-400" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-400">
                                Verified Performance Data
                            </span>
                        </motion.div>

                        <h1 className="text-6xl md:text-[11.5rem] font-black tracking-tighter-clinical mb-10 leading-[0.85] uppercase italic font-sans">
                            The<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-zinc-700">Evidence.</span>
                        </h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl md:text-3xl text-zinc-400 leading-tight max-w-3xl mx-auto mb-16 font-light"
                        >
                            We don't build "websites." We engineer <strong className="text-white font-black italic underline decoration-orange-500 underline-offset-8">revenue architectures</strong> that force the market to pay attention.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Section 1: Sector Performance Logs */}
            <section className="py-24 border-t border-white/5 bg-[#080808]">
                <div className="container mx-auto px-6">
                    <div className="text-[10px] font-mono font-bold text-orange-500 mb-12 uppercase tracking-[0.4em] text-center">Sector_Performance_Logs</div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                client: "Confidential: SaaS Unicorn",
                                context: "Enterprise SaaS",
                                challenge: "92% bounce rate on pricing page.",
                                change: "Simplified tiered logic & removed friction nodes.",
                                result: "+215% Demo Requests"
                            },
                            {
                                client: "Confidential: Luxury Retail",
                                context: "High-Ticket E-commerce",
                                challenge: "Cart abandonment at shipping step.",
                                change: "Single-page checkout & trust injection.",
                                result: "+48% Revenue Lift"
                            },
                            {
                                client: "Confidential: FinTech App",
                                context: "User Acquisition",
                                challenge: "Low trust signals on landing page.",
                                change: "Clinical authority evidence & speed opt.",
                                result: "3.2x Conversion Rate"
                            }
                        ].map((caseStudy, i) => (
                            <div key={i} className="p-8 border-l-2 border-zinc-800 bg-zinc-900/20 hover:border-orange-500 hover:bg-zinc-900/40 transition-all duration-500 group relative">
                                <div className="absolute top-4 right-4 opacity-100">
                                    <div className="px-2 py-1 bg-emerald-950 border border-emerald-900/50 text-[8px] font-mono text-emerald-500 uppercase tracking-widest rounded">
                                        STATUS: RESOLVED
                                    </div>
                                </div>

                                <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest mb-2">{caseStudy.context}</div>
                                <div className="text-lg font-bold text-white mb-6 group-hover:text-orange-500 transition-colors">{caseStudy.client}</div>

                                <div className="space-y-6 mb-8 border-t border-white/5 pt-6">
                                    <div>
                                        <span className="text-[9px] font-mono text-red-500 uppercase tracking-wider block mb-1">Detected_Issue</span>
                                        <p className="text-xs text-zinc-400 font-mono leading-relaxed">{caseStudy.challenge}</p>
                                    </div>
                                    <div>
                                        <span className="text-[9px] font-mono text-emerald-500 uppercase tracking-wider block mb-1">Architecture_Fix</span>
                                        <p className="text-xs text-zinc-400 font-mono leading-relaxed">{caseStudy.change}</p>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-white/5 flex items-baseline justify-between">
                                    <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-wider">Net_Impact</span>
                                    <div className="text-2xl font-black text-orange-500 italic tracking-tighter">{caseStudy.result}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 2: Before / After Analysis */}
            <section className="py-24 bg-black border-y border-zinc-900 relative">
                <div className="container mx-auto px-6">
                    <div className="mb-20 text-center">
                        <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-6">Visual <span className="text-zinc-700">Teardowns.</span></h2>
                        <p className="text-zinc-400 max-w-2xl mx-auto">We do not guess. We deconstruct interface failures and rebuild them for pure velocity.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <div className="space-y-12">
                            {/* Before: Friction */}
                            <div className="p-8 border border-red-900/30 bg-red-950/10 rounded-3xl relative overflow-hidden group hover:border-red-500/50 transition-all duration-500">
                                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] bg-[size:10px_10px]" />
                                <div className="absolute top-4 right-4 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                                    <span className="text-[9px] font-mono font-bold text-red-500 uppercase tracking-widest">System_Critical</span>
                                </div>
                                <div className="mt-8 mb-4">
                                    <div className="text-[10px] font-mono text-red-400/60 uppercase tracking-widest mb-1">State: High Friction</div>
                                    <h3 className="text-2xl font-black text-white italic">The "Leakage" Model</h3>
                                </div>

                                {/* UI Visualization: Chaos */}
                                <div className="h-64 relative bg-black/40 rounded-xl border border-red-900/30 p-4">
                                    {/* Mock chaotic UI elements */}
                                    <div className="flex justify-between items-center mb-6 opacity-30">
                                        <div className="w-8 h-8 rounded bg-zinc-700" />
                                        <div className="flex gap-2">
                                            <div className="w-12 h-2 bg-zinc-700 rounded" />
                                            <div className="w-12 h-2 bg-zinc-700 rounded" />
                                        </div>
                                    </div>
                                    <div className="space-y-3 relative">
                                        <div className="w-3/4 h-8 bg-zinc-800 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 bg-red-500/10 animate-pulse" />
                                        </div>
                                        <div className="w-1/2 h-2 bg-zinc-800 rounded" />
                                        <div className="w-2/3 h-2 bg-zinc-800 rounded" />

                                        {/* Error Badges */}
                                        <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                                            <div className="bg-red-950 border border-red-500/50 text-red-500 text-[9px] font-mono px-2 py-1 rounded shadow-lg backdrop-blur-md">
                                                ⚠ ERR_SLOW_ LCP
                                            </div>
                                        </div>
                                        <div className="absolute bottom-[-40px] left-10">
                                            <div className="bg-red-950 border border-red-500/50 text-red-500 text-[9px] font-mono px-2 py-1 rounded shadow-lg backdrop-blur-md">
                                                ⚠ CONFUSING_NAV
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-4 left-4 right-4 h-10 bg-zinc-800/50 rounded flex items-center justify-center border border-zinc-700 border-dashed">
                                        <span className="text-[9px] text-zinc-600 font-mono uppercase">Unclear Call to Action</span>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-red-900/20 grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-[9px] text-zinc-500 uppercase tracking-wider mb-1">Bounce Rate</div>
                                        <div className="text-xl font-mono text-red-500">85.4%</div>
                                    </div>
                                    <div>
                                        <div className="text-[9px] text-zinc-500 uppercase tracking-wider mb-1">Conversion</div>
                                        <div className="text-xl font-mono text-red-500">0.8%</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center md:rotate-0 rotate-90">
                                <div className="p-3 rounded-full bg-zinc-900 border border-zinc-800 relative group/arrow">
                                    <ArrowRight className="w-6 h-6 text-zinc-500 group-hover/arrow:text-orange-500 transition-colors" />
                                </div>
                            </div>

                            {/* After: Velocity */}
                            <div className="p-8 border border-emerald-900/30 bg-emerald-950/10 rounded-3xl relative overflow-hidden group hover:border-emerald-500/50 transition-all duration-500 shadow-[0_0_50px_rgba(16,185,129,0.05)]">
                                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.1] bg-[size:20px_20px]" />
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent" />

                                <div className="absolute top-4 right-4 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,1)]" />
                                    <span className="text-[9px] font-mono font-bold text-emerald-500 uppercase tracking-widest">Optimized_State</span>
                                </div>

                                <div className="mt-8 mb-4">
                                    <div className="text-[10px] font-mono text-emerald-400/60 uppercase tracking-widest mb-1">State: High Velocity</div>
                                    <h3 className="text-2xl font-black text-white italic">The "Conversion" Engine</h3>
                                </div>

                                {/* UI Visualization: Order */}
                                <div className="h-64 relative bg-black/60 rounded-xl border border-emerald-900/30 p-4 backdrop-blur-sm">
                                    <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                                        <div className="w-8 h-8 rounded bg-emerald-500/20 border border-emerald-500/30" />
                                        <div className="flex gap-4">
                                            <div className="w-2 h-2 rounded-full bg-zinc-800" />
                                            <div className="w-2 h-2 rounded-full bg-zinc-800" />
                                            <div className="w-16 h-2 rounded bg-emerald-500/20" />
                                        </div>
                                    </div>
                                    <div className="space-y-6 flex flex-col items-center justify-center h-[120px]">
                                        <div className="w-full h-12 bg-white rounded flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black">Primary_Action</span>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className="px-2 py-1 bg-emerald-900/30 border border-emerald-500/20 rounded text-[8px] font-mono text-emerald-500">TRUST_SIGNAL_VALIDATED</div>
                                            <div className="px-2 py-1 bg-emerald-900/30 border border-emerald-500/20 rounded text-[8px] font-mono text-emerald-500">SPEED: 0.1s</div>
                                        </div>
                                    </div>

                                    {/* Success Lines */}
                                    <div className="absolute inset-0 pointer-events-none border border-emerald-500/10 rounded-xl" />
                                </div>

                                <div className="mt-6 pt-4 border-t border-emerald-900/20 grid grid-cols-2 gap-4">
                                    <div>
                                        <div className="text-[9px] text-zinc-500 uppercase tracking-wider mb-1">Bounce Rate</div>
                                        <div className="text-xl font-mono text-emerald-500">32.1%</div>
                                    </div>
                                    <div>
                                        <div className="text-[9px] text-zinc-500 uppercase tracking-wider mb-1">Conversion</div>
                                        <div className="text-xl font-mono text-emerald-500">4.8%</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h3 className="text-3xl font-black uppercase italic text-white"><span className="text-orange-600">Structural</span> Improvements</h3>
                            <ul className="space-y-6">
                                {[
                                    { title: "UX Clarity", desc: "Removing cognitive load so users don't think—they just act." },
                                    { title: "Visual Hierarchy", desc: "Guiding the eye surgically to the conversion event." },
                                    { title: "Performance", desc: "Sub-second interactions to prevent attention drift." }
                                ].map((item, i) => (
                                    <li key={i} className="flex gap-6 border-l-2 border-zinc-800 pl-6 py-2 hover:border-orange-500 transition-colors group">
                                        <div className="text-2xl font-black text-zinc-800 group-hover:text-orange-500 transition-colors">0{i + 1}</div>
                                        <div>
                                            <h4 className="text-white font-bold uppercase tracking-wide mb-1">{item.title}</h4>
                                            <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3: Thinking & Method */}
            <section className="py-24 bg-[#080808]">
                <div className="container mx-auto px-6">
                    <div className="text-[10px] font-mono font-bold text-zinc-600 mb-12 uppercase tracking-[0.4em] text-center">Our_Philosophy</div>
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            {
                                title: "Why Diagnosis Matters",
                                desc: "Prescription without diagnosis is malpractice. We audit before we build.",
                                icon: Search
                            },
                            {
                                title: "Systems > Redesigns",
                                desc: "A pretty website dies in 2 years. A revenue system evolves and scales forever.",
                                icon: Target
                            },
                            {
                                title: "Testing > Assumptions",
                                desc: "We don't argue about colors. We let the data decide what makes money.",
                                icon: Activity
                            }
                        ].map((method, i) => (
                            <div key={i} className="p-8 border-t border-zinc-800 hover:border-orange-600 transition-colors group">
                                <method.icon className="w-8 h-8 text-zinc-600 group-hover:text-orange-500 transition-colors mb-6" />
                                <h3 className="text-xl font-black uppercase italic text-white mb-4 group-hover:translate-x-2 transition-transform">{method.title}</h3>
                                <p className="text-zinc-500 leading-relaxed text-sm font-medium">{method.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div id="archives" className="bg-[#050505] py-20">
                <div className="container mx-auto px-6 mb-16">
                    <h2 className="text-3xl font-black uppercase italic tracking-tighter">Case Archives</h2>
                </div>
                <ElitePortfolio />
            </div>

            {/* Final CTA */}
            <section className="py-40 relative overflow-hidden">
                <div className="absolute inset-0 bg-orange-600/5 blur-[120px]" />
                <div className="container mx-auto px-6 relative z-10 text-center">
                    <div className="max-w-6xl mx-auto p-16 md:p-32 rounded-[4rem] bg-white/[0.02] border border-white/5 relative overflow-hidden backdrop-blur-3xl shadow-2xl">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] scale-150" />

                        <div className="relative z-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-widest mb-10">
                                <Lock className="w-4 h-4" /> Proven Results Only
                            </div>

                            <h2 className="text-5xl md:text-8xl font-black text-white uppercase italic tracking-tighter mb-10 leading-none">
                                Want Evidence on <br /><span className="text-orange-600">Your Own Website?</span>
                            </h2>

                            <Link
                                href="/offers/revenue-roadmap?plan=diagnostic"
                                className="inline-flex items-center gap-4 px-16 py-8 rounded-[2rem] bg-white text-black font-black uppercase tracking-[0.2em] text-xl transition-all hover:scale-105 shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                            >
                                <Activity className="w-8 h-8" />
                                Start with a Revenue Roadmap
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
