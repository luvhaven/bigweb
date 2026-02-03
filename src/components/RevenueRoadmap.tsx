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
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-orange-600/5 blur-[160px] rounded-full pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-4 py-1.5 bg-zinc-950 border border-zinc-900 text-zinc-600 text-[10px] font-mono font-bold uppercase tracking-[0.5em] mb-12"
                    >
                        <ShieldCheck className="w-4 h-4" /> Development_Phases_v8
                    </motion.div>

                    <h2 className="text-6xl md:text-[11rem] font-black text-white tracking-tighter uppercase italic leading-[0.75] mb-16">
                        The Road To <br /><span className="text-zinc-800">Pure ROI.</span>
                    </h2>

                    <p className="text-2xl md:text-5xl text-zinc-500 font-medium leading-none tracking-tight max-w-5xl mx-auto">
                        We don't build projects. We build <span className="text-white italic underline underline-offset-8 decoration-orange-600">Growth_Engines</span>.
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
                                        <div className="w-20 h-20 bg-black border border-zinc-900 flex items-center justify-center shadow-xl group hover:border-orange-600 transition-colors duration-500">
                                            <Icon className="w-8 h-8 text-zinc-600 group-hover:text-orange-500 transition-colors" />
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <div className={`w-full md:w-1/2 ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                                        <div className="group relative">
                                            <div className={`text-[10px] font-mono font-bold text-zinc-500 mb-4 uppercase tracking-[0.4em] ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                                                PHASE_0{index + 1}
                                            </div>
                                            <h3 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-6 group-hover:text-orange-500 transition-colors leading-none">
                                                {step.title}
                                            </h3>
                                            <p className="text-zinc-400 text-xl font-medium leading-[1.1] mb-8">
                                                {step.description}
                                            </p>
                                            <div className={`flex items-center gap-4 text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-800 ${isEven ? 'justify-start' : 'md:justify-end'}`}>
                                                <div className="w-2 h-2 bg-orange-600" />
                                                TARGET_YIELD: <span className="text-zinc-500">{step.outcome}</span>
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
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="p-16 md:p-32 bg-zinc-950 border border-zinc-900 relative overflow-hidden group shadow-2xl text-center"
                    >
                        <div className="absolute inset-0 bg-orange-600 opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700" />

                        <h3 className="text-4xl md:text-[7rem] font-black text-white italic tracking-tighter uppercase mb-16 leading-[0.8]">
                            Ready To <br /><span className="text-zinc-800">Execute?</span>
                        </h3>

                        <div className="flex flex-col sm:flex-row justify-center gap-10 items-center">
                            <Link href="/offers/revenue-roadmap">
                                <Magnetic strength={0.2} className="w-full sm:w-96">
                                    <Button
                                        size="lg"
                                        className="w-full sm:w-full bg-orange-600 hover:bg-orange-500 text-white font-black text-sm px-12 h-24 rounded-none transition-all duration-300 uppercase tracking-[0.4em]"
                                    >
                                        INITIALIZE_DIAGNOSTIC_v1
                                        <ArrowRight className="ml-4 w-6 h-6 transition-transform group-hover/btn:translate-x-3" />
                                    </Button>
                                </Magnetic>
                            </Link>

                            <Link href="/estimator">
                                <Magnetic strength={0.2} className="w-full sm:w-96">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        className="w-full sm:w-full h-24 rounded-none border border-zinc-900 bg-black text-zinc-500 font-black text-sm px-12 hover:bg-white hover:text-black transition-all duration-300 uppercase tracking-[0.4em]"
                                    >
                                        CALCULATE_ROI_DELTA
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
