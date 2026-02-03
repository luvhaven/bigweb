'use client'

import React from 'react'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Layers, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'
import type { ProcessPhase } from '@/types/database'

// Helper to get Lucide icon component from string
const getIconComponent = (iconName: string | null) => {
    if (!iconName) return LucideIcons.Search
    const Icon = (LucideIcons as any)[iconName]
    return Icon || LucideIcons.Search
}

interface HowWeWorkClientProps {
    steps: ProcessPhase[]
}

export default function HowWeWorkClient({ steps }: HowWeWorkClientProps) {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-orange-600/30">
            <AdvancedNavigation />

            {/* Elite Hero Section */}
            <section className="relative pt-48 pb-32 overflow-hidden border-b border-zinc-900">
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:50px_50px] opacity-[0.03]" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-orange-600/20 to-transparent" />

                <div className="container mx-auto px-6 text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="mb-20"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-zinc-950 border border-zinc-900 text-zinc-600 text-[10px] font-mono font-black uppercase tracking-[0.5em] mb-12">
                            <Layers className="w-4 h-4" /> Operational_Doctrine_v3
                        </div>

                        <h1 className="text-6xl md:text-[9rem] font-black mb-12 tracking-tighter leading-[0.8] uppercase italic">
                            How We <br />
                            <span className="text-zinc-800">Work.</span>
                        </h1>

                        <p className="text-xl md:text-3xl text-zinc-500 max-w-4xl mx-auto leading-relaxed font-medium tracking-tight">
                            We reject "random acts of marketing." We adhere to a <strong className="text-white italic underline decoration-orange-600 underline-offset-8">Clinical Methodology</strong> engineered to extract maximum yield from your traffic.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* The Process Grid */}
            <section className="py-24 bg-black relative">
                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid gap-20">
                        {steps.map((step, index) => {
                            const Icon = getIconComponent(step.icon)
                            return (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="group relative"
                                >
                                    <div className="absolute left-8 top-0 bottom-0 w-px bg-zinc-900 lg:hidden" />

                                    <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                                        {/* ID Column */}
                                        <div className="lg:col-span-2 hidden lg:flex flex-col items-center sticky top-32">
                                            <div className="text-[10rem] font-black leading-none text-zinc-900/50 italic select-none">
                                                {step.step_number}
                                            </div>
                                            <div className="h-32 w-px bg-gradient-to-b from-zinc-800 to-transparent mt-4" />
                                        </div>

                                        {/* Main Card */}
                                        <div className="lg:col-span-7 bg-zinc-950 border border-zinc-900 p-8 md:p-12 relative overflow-hidden transition-all duration-500 hover:border-zinc-800 group-hover:shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                                            <div className={`absolute top-0 right-0 p-4 opacity-50 ${step.bg_color}`}>
                                                <Icon className={`w-24 h-24 ${step.color} opacity-20`} />
                                            </div>

                                            <div className="relative z-10">
                                                <div className="flex items-center gap-4 mb-6">
                                                    <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full border ${step.border_color} ${step.bg_color} ${step.color} uppercase tracking-[0.2em]`}>
                                                        {step.phase_id} // {step.subtitle}
                                                    </span>
                                                </div>

                                                <h3 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter mb-6">
                                                    {step.title}
                                                </h3>

                                                <p className="text-xl text-zinc-400 font-medium leading-relaxed mb-10 max-w-2xl">
                                                    {step.description}
                                                </p>

                                                <div className="grid sm:grid-cols-2 gap-8 mb-10">
                                                    <div>
                                                        <div className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-4">Operations_Manifest</div>
                                                        <ul className="space-y-3">
                                                            {step.details?.map((detail, i) => (
                                                                <li key={i} className="flex items-start gap-3 text-sm text-zinc-400 font-medium">
                                                                    <div className={`w-1.5 h-1.5 mt-1.5 rounded-full ${step.color?.replace('text-', 'bg-')}`} />
                                                                    {detail}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className="space-y-6">
                                                        <div>
                                                            <div className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-1">Deliverable</div>
                                                            <div className="text-white font-bold text-sm">{step.deliverable}</div>
                                                        </div>
                                                        <div>
                                                            <div className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-1">Timeline</div>
                                                            <div className="text-white font-bold text-sm">{step.timeline}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Column */}
                                        <div className="lg:col-span-3 lg:sticky lg:top-32 flex flex-col justify-center h-full pt-8 lg:pt-0">
                                            <div className="bg-zinc-950 border border-zinc-900 p-8 text-center relative group-hover:border-zinc-800 transition-colors">
                                                <div className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-widest mb-4">Investment_Index</div>
                                                <div className={`text-3xl font-black italic tracking-tighter ${step.color} mb-8`}>
                                                    {step.price}
                                                </div>

                                                <Link href={step.cta_link || '#'} className="block w-full">
                                                    <Button className="w-full h-16 bg-white text-black hover:bg-orange-600 hover:text-white font-black text-xs uppercase tracking-[0.3em] rounded-none transition-all duration-300">
                                                        {step.cta_text}
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Philosophy Section */}
            <section className="py-32 border-y border-zinc-900 bg-[#0A0A0A]">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-orange-600/10 border border-orange-600/20 text-orange-600 text-[10px] font-mono font-black uppercase tracking-[0.5em] mb-10">
                            <ShieldCheck className="w-4 h-4" /> Core_Philosophy
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black mb-12 tracking-tighter uppercase italic text-white leading-[0.9]">
                            We Don't Guess. <br />We <span className="text-zinc-800">Diagnose.</span>
                        </h2>
                        <p className="text-xl text-zinc-500 leading-relaxed font-medium max-w-2xl mx-auto">
                            Most agencies jump straight to building. We start with understanding the <span className="text-white">failure points</span>. We fix them methodically. Then, we scale with aggression.
                        </p>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-32 relative overflow-hidden bg-black">
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-5xl md:text-[8rem] font-black mb-10 tracking-tighter uppercase italic leading-[0.8]">
                        Where Do I <br /> <span className="text-zinc-800">Start?</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-zinc-500 mb-16 max-w-2xl mx-auto font-medium">
                        Unless you are ready for a full system rebuild, every engagement begins with the <span className="text-white italic">Revenue Roadmap</span>.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                        <Link href="/offers/revenue-roadmap">
                            <Button className="h-20 px-12 bg-orange-600 hover:bg-orange-500 text-white font-black text-sm uppercase tracking-[0.4em] rounded-none transition-all duration-300 shadow-[0_0_50px_rgba(234,88,12,0.3)]">
                                INITIALIZE DIAGNOSTIC
                                <ArrowRight className="w-5 h-5 ml-4" />
                            </Button>
                        </Link>
                        <Link href="/contact" className="text-xs font-mono font-bold text-zinc-600 hover:text-white uppercase tracking-[0.2em] flex items-center gap-2 transition-colors">
                            Speak to Engineering Team <ArrowRight className="w-3 h-3" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
