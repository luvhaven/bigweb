'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { AlertCircle, Target, TrendingUp, Zap, ArrowRight, ShieldCheck, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Magnetic from '@/components/ui/Magnetic'

const roadmapSteps = [
    {
        id: 'leak',
        title: "Identify the Leak",
        description: "Most websites lose 70-98% of their traffic at the first hurdle. We identify exactly where your revenue is escaping through clinical data analysis.",
        icon: AlertCircle,
        outcome: "Stop Capital Bleeding",
        color: "red"
    },
    {
        id: 'diagnostic',
        title: "The Forensic Audit",
        description: "We perform a deep-dive into user behavior, technical performance, and psychological friction. We don't guess; we diagnose the root cause.",
        icon: Search,
        outcome: "Complete Clarity",
        color: "blue"
    },
    {
        id: 'optimize',
        title: "Surgical Optimization",
        description: "We implement high-impact fixes and A/B tests based on our findings. Every change is engineered to move the needle on your bottom line.",
        icon: Zap,
        outcome: "Immediate Revenue Lift",
        color: "orange"
    },
    {
        id: 'scale',
        title: "Continuous Profit Engine",
        description: "Once the foundation is solid, we scale. Continuous monitoring and refinement ensure your ROI grows month after month.",
        icon: TrendingUp,
        outcome: "Industrial Scaling",
        color: "emerald"
    }
]

export default function RevenueRoadmap() {
    return (
        <section className="py-40 bg-[#050505] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[size:60px_60px]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-accent/5 blur-[160px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 bg-zinc-950 border border-zinc-900 text-zinc-500 text-xs font-semibold uppercase tracking-wider mb-8"
                    >
                        <ShieldCheck className="w-4 h-4 text-accent" /> Your Growth Journey
                    </motion.div>

                    <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-8">
                        From Leaky Website<br /><span className="text-zinc-600">To Profit Machine.</span>
                    </h2>

                    <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed max-w-3xl mx-auto">
                        We don't just build websites. We engineer systems designed to turn visitors into paying customers, every single day.
                    </p>
                </div>

                {/* Vertical Roadmap */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Progress Line */}
                    <div className="absolute left-[39px] md:left-1/2 top-0 bottom-0 w-px bg-zinc-800 hidden md:block" />

                    <div className="space-y-24">
                        {roadmapSteps.map((step, index) => {
                            const Icon = step.icon
                            const isEven = index % 2 === 0

                            return (
                                <motion.div
                                    key={step.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className={`relative flex flex-col md:flex-row items-center gap-12 md:gap-24 ${isEven ? 'md:flex-row-reverse' : ''}`}
                                >
                                    {/* Central Indicator */}
                                    <div className="absolute left-0 md:left-1/2 -translate-x-1/2 z-20">
                                        <div className="w-20 h-20 bg-black border border-zinc-900 flex items-center justify-center shadow-xl group hover:border-accent transition-colors duration-500">
                                            <Icon className="w-8 h-8 text-zinc-600 group-hover:text-accent transition-colors" />
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <div className={`w-full md:w-1/2 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                                        <div className="group relative">
                                            <div className={`text-[9px] font-mono font-bold text-zinc-600 mb-6 uppercase tracking-[0.6em] ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                                                Phase 0{index + 1}
                                            </div>
                                            <h3 className="text-4xl md:text-7xl font-bold text-white uppercase italic tracking-tighter mb-8 group-hover:text-accent transition-colors leading-[0.8] transition-all duration-700">
                                                {step.title}
                                            </h3>
                                            <div className={`flex items-center gap-6 text-[10px] font-mono font-bold uppercase tracking-[0.4em] text-zinc-800 ${isEven ? 'justify-start' : 'md:justify-end'}`}>
                                                <div className="w-3 h-3 bg-accent rounded-full animate-pulse" />
                                                TARGET: <span className="text-white">{step.outcome}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Spacing Side */}
                                    <div className="w-full md:w-1/2 hidden md:block" />
                                </motion.div>
                            )
                        })}
                    </div>
                </div>

                <div className="mt-40">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="p-16 md:p-32 bg-black border border-white/5 relative overflow-hidden group shadow-[0_0_100px_rgba(0,0,0,1)] text-center rounded-3xl"
                    >
                        <div className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-[0.05] transition-opacity duration-1000" />
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] bg-[size:40px_40px]" />

                        <h3 className="text-4xl md:text-[8rem] font-bold text-white italic tracking-tighter uppercase mb-20 leading-[0.8]">
                            Ready To <br /><span className="text-zinc-900 border-b-4 border-accent">Execute?</span>
                        </h3>

                        <div className="flex flex-col sm:flex-row justify-center gap-12 items-center">
                            <Link href="/offers/revenue-roadmap">
                                <Magnetic strength={0.3} className="w-full sm:w-auto">
                                    <Button
                                        size="lg"
                                        className="w-full sm:w-auto bg-white text-black hover:bg-accent hover:text-white font-bold text-xs px-16 h-28 rounded-2xl transition-all duration-500 uppercase tracking-[0.4em] shadow-2xl"
                                    >
                                        Start Your Roadmap
                                        <ArrowRight className="ml-6 w-6 h-6 transition-transform group-hover/btn:translate-x-4" />
                                    </Button>
                                </Magnetic>
                            </Link>

                            <Link href="/estimator">
                                <Magnetic strength={0.3} className="w-full sm:w-auto">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="w-full sm:w-auto h-28 rounded-2xl border border-white/10 bg-black text-zinc-600 font-bold text-xs px-16 hover:bg-white hover:text-black transition-all duration-500 uppercase tracking-[0.4em]"
                                    >
                                        Estimate ROI
                                    </Button>
                                </Magnetic>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section >
    )
}
