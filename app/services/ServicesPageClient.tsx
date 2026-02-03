'use client'

import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
    ArrowRight,
    GitBranch,
} from 'lucide-react'
import * as LucideIcons from 'lucide-react'
import type { Capability } from '@/types/database'

// Helper to get Lucide icon component from string
const getIconComponent = (iconName: string | null) => {
    if (!iconName) return LucideIcons.HelpCircle
    const Icon = (LucideIcons as any)[iconName]
    return Icon || LucideIcons.HelpCircle
}

interface ServicesPageClientProps {
    capabilities: Capability[]
}

export default function ServicesPageClient({ capabilities }: ServicesPageClientProps) {
    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-orange-500/30">
            <AdvancedNavigation />

            {/* Hero Section */}
            <section className="relative pt-32 pb-16 min-h-[85vh] flex items-center overflow-hidden bg-gradient-mesh">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[size:40px_40px]" />
                <div className="absolute top-0 left-0 w-full h-[50vh] bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-5xl mx-auto"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-3 px-4 py-1.5 bg-orange-600/10 border border-orange-500/20 text-orange-400 text-[9px] font-mono font-black uppercase tracking-[0.4em] mb-8 shadow-[0_0_30px_rgba(249,115,22,0.1)]"
                        >
                            <GitBranch className="w-3.5 h-3.5" /> Capabilities_Inventory_v4.2
                        </motion.div>

                        <h1 className="text-6xl md:text-[8rem] font-black tracking-tighter mb-8 leading-[0.8] uppercase italic font-sans grayscale brightness-200">
                            Our <br />
                            <span className="text-zinc-800">Capabilities.</span>
                        </h1>

                        <p className="text-xl md:text-3xl text-zinc-500 leading-tight tracking-tight max-w-3xl mx-auto mb-12 font-medium border-l border-orange-600/30 pl-8 text-left">
                            Constructing high-yield <span className="text-white italic underline decoration-zinc-800 underline-offset-[8px]">Digital Systems</span> engineered for zero-friction revenue extraction.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Link href="/how-it-works">
                                <Button size="xl" className="h-20 px-12 rounded-none bg-white text-black hover:bg-orange-600 hover:text-white font-black text-xs uppercase tracking-[0.4em] transition-all duration-500 shadow-[0_0_80px_rgba(255,255,255,0.1)] group">
                                    EXPLORE OUR PROCESS
                                    <ArrowRight className="w-5 h-5 ml-4 group-hover:translate-x-4 transition-transform" />
                                </Button>
                            </Link>
                            <Link href="/offers/revenue-roadmap" className="text-zinc-600 hover:text-white transition-colors uppercase font-mono font-black tracking-[0.3em] text-[10px] flex items-center gap-3 px-8 py-4 border border-zinc-900 hover:border-orange-600/30">
                                SYSTEM_DIAGNOSTIC <ArrowRight className="w-4 h-4 text-orange-600" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Capabilities Grid */}
            <section id="capabilities" className="py-24 bg-black relative">
                <div className="container mx-auto px-6">
                    <div className="max-w-7xl mx-auto space-y-20">
                        {capabilities.map((capability, index) => {
                            const Icon = getIconComponent(capability.icon)
                            const isEven = index % 2 === 0

                            return (
                                <motion.div
                                    key={capability.id}
                                    initial={{ opacity: 0, y: 60 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8 }}
                                    className={`grid lg:grid-cols-12 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}
                                >
                                    {/* Visual Side */}
                                    <div className={`lg:col-span-5 ${isEven ? '' : 'lg:col-start-8'}`}>
                                        <div className="relative group/visual">
                                            <div className="absolute -inset-4 bg-orange-600/5 rounded-none blur-3xl opacity-0 group-hover/visual:opacity-100 transition-opacity duration-700" />
                                            <div className="relative p-12 rounded-none bg-zinc-950 border border-zinc-900 backdrop-blur-sm overflow-hidden min-h-[350px] flex flex-col justify-center items-center shadow-2xl">
                                                <div className="absolute top-4 left-4 text-[9px] font-mono font-bold text-zinc-800 tracking-widest uppercase">Node_Architecture_v0{capability.number}</div>
                                                <div className="text-[12rem] font-black text-white/[0.02] italic absolute -right-8 -bottom-12 select-none pointer-events-none">{capability.number}</div>

                                                <div className={`w-32 h-32 rounded-none bg-orange-600/5 border border-zinc-900 flex items-center justify-center shrink-0 mb-8 relative z-10 group-hover/visual:border-orange-600 transition-all duration-500`}>
                                                    <Icon className={`w-12 h-12 text-zinc-700 group-hover/visual:text-orange-600 transition-colors duration-500`} />
                                                </div>

                                                <div className="w-full h-[1px] bg-zinc-900 relative">
                                                    <motion.div
                                                        animate={{ x: ["-100%", "200%"] }}
                                                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                                        className="absolute inset-0 bg-orange-600/40 w-1/4"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <div className={`lg:col-span-7 ${isEven ? '' : 'lg:col-start-1 lg:row-start-1'}`}>
                                        <div className="border-l-4 border-zinc-900 pl-10 group-hover:border-orange-600 transition-colors duration-500">
                                            <div className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.5em] mb-4">ENGINEERING_PHASE_0{capability.number}</div>
                                            <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-[0.85] uppercase italic text-white">{capability.title}</h2>
                                            <p className="text-xl md:text-2xl text-zinc-500 font-medium leading-[1.1] max-w-2xl">{capability.description}</p>
                                        </div>

                                        <div className="mt-8 mb-8">
                                            <h4 className="text-sm font-bold uppercase tracking-wider text-orange-500 mb-6">Includes:</h4>
                                            <div className="grid sm:grid-cols-2 gap-4">
                                                {capability.features?.map((item, i) => {
                                                    const IncludeIcon = getIconComponent(item.icon)
                                                    return (
                                                        <div key={i} className="flex items-center gap-3 bg-white/[0.02] border border-white/5 rounded-xl p-4 hover:border-orange-500/20 transition-colors">
                                                            <IncludeIcon className="w-5 h-5 text-orange-500 shrink-0" />
                                                            <span className="text-sm font-medium">{item.text}</span>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        <Link href={capability.route || '#'}>
                                            <Button variant="outline" className="border-white/10 hover:bg-white/5 hover:border-orange-500/40 transition-all font-mono text-[10px] uppercase tracking-widest">
                                                View Capability Protocol
                                                <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 relative overflow-hidden border-t border-white/5">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 via-transparent to-transparent" />
                <div className="container mx-auto px-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="max-w-4xl mx-auto rounded-[3rem] bg-[#0A0A0A] border border-white/10 p-12 md:p-20 text-center relative overflow-hidden shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-600/10 to-transparent pointer-events-none" />
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[size:30px_30px]" />

                        <div className="relative z-10">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-[10px] font-black uppercase tracking-widest mb-8"
                            >
                                Ready to Start?
                            </motion.div>

                            <h2 className="text-5xl md:text-[7rem] font-black tracking-tighter mb-12 uppercase italic leading-[0.8] text-white">
                                Secure the <br /><span className="text-orange-600">Audit.</span>
                            </h2>

                            <p className="text-xl md:text-2xl text-zinc-500 mb-16 font-medium leading-[1.1] max-w-2xl mx-auto">
                                Our capabilities are most effective when deployed as a <strong className="text-white italic">Clinical_Diagnostic</strong>. Get your 7-day battle plan today.
                            </p>

                            <Link href="/offers/revenue-roadmap">
                                <Button size="xl" className="h-24 px-16 rounded-none bg-orange-600 text-white hover:bg-orange-500 font-black text-sm uppercase tracking-[0.4em] shadow-[0_0_60px_rgba(249,115,22,0.2)] transition-all group">
                                    GET REVENUE ROADMAP
                                    <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-4 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </main >
    )
}
