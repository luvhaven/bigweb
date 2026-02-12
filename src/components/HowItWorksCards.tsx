'use client'

import React, { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Microscope, PencilRuler, Code2, Rocket, ArrowRight, Zap, Target, Search, BarChart3 } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const steps = [
    {
        number: "01",
        title: "Deep Discovery Audit",
        description: "We dive deep into your tracking, traffic, and user behavior. We identify exactly where you're losing customers and why.",
        icon: Search,
        color: "from-blue-600 to-indigo-600",
        shadow: "shadow-blue-500/20",
        elements: ["User Tracking", "Behavior Analysis", "UX Audit", "Path Mapping"]
    },
    {
        number: "02",
        title: "Conversion Strategy",
        description: "We design a clear path to purchase based on user psychology and proven data. No guessing—just results.",
        icon: Target,
        color: "from-orange-500 to-red-600",
        shadow: "shadow-orange-500/20",
        elements: ["Value Prop", "Trust Building", "Social Proof", "Clear CTAs"]
    },
    {
        number: "03",
        title: "High-Performance Build",
        description: "We build your website using modern tech that's lightning fast. Every page is optimized for speed, SEO, and conversions.",
        icon: Code2,
        color: "from-purple-600 to-pink-600",
        shadow: "shadow-purple-500/20",
        elements: ["Modern Tech", "Speed Focused", "Mobile Ready", "SEO Ready"]
    },
    {
        number: "04",
        title: "Growth & Optimization",
        description: "We don't just launch and leave. We continuously test and refine your site to ensure your results keep getting better.",
        icon: Rocket,
        color: "from-emerald-500 to-teal-600",
        shadow: "shadow-emerald-500/20",
        elements: ["A/B Testing", "KPI Tracking", "ROI Scaling", "Lead Growth"]
    }
]

export default function HowItWorksCards() {
    const containerRef = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    })

    return (
        <section id="how-it-works" className="py-24 bg-black relative overflow-hidden border-t border-zinc-900" ref={containerRef}>
            {/* Background Accents */}
            <div className="absolute inset-0 bg-[#050505] z-0" />
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:40px_40px] opacity-[0.02]" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Section Header */}
                <div className="max-w-4xl mb-20 border-l-4 border-orange-500 pl-10">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="text-zinc-500 font-semibold uppercase tracking-wider text-xs block mb-6"
                    >
                        Our Process
                    </motion.span>
                    <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-tight mb-6">
                        How We Build<br /><span className="text-zinc-600">High-Converting Sites.</span>
                    </h2>
                    <p className="text-xl md:text-2xl text-zinc-400 font-medium leading-relaxed max-w-3xl">
                        A proven four-step methodology designed to eliminate guesswork and maximize your return on investment.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {steps.map((step, index) => {
                        const Icon = step.icon
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.8 }}
                                className="group relative bg-black p-16 overflow-hidden flex flex-col h-full hover:bg-zinc-950 transition-colors duration-500 rounded-3xl border border-white/5"
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-12 relative z-10">
                                    <div className="flex items-center gap-6">
                                        <div className="w-16 h-16 flex items-center justify-center bg-zinc-950 border border-zinc-900 group-hover:border-orange-600 transition-colors duration-500 rounded-2xl">
                                            <Icon className="w-6 h-6 text-zinc-700 group-hover:text-orange-600 transition-colors" />
                                        </div>
                                        <span className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.5em]">
                                            Phase 0{index + 1}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="flex-grow relative z-10 space-y-10">
                                    <h3 className="text-4xl md:text-7xl font-bold text-white uppercase italic tracking-tighter leading-[0.8]">
                                        {step.title}
                                    </h3>
                                    <p className="text-zinc-600 text-xl leading-none font-bold uppercase tracking-tighter max-w-md">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Dynamic Elements */}
                                <div className="grid grid-cols-2 gap-4 relative z-10 mt-12">
                                    {step.elements.map((el, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3"
                                        >
                                            <div className="w-1.5 h-1.5 bg-zinc-800 group-hover:bg-orange-600 transition-colors rounded-full" />
                                            <span className="text-[10px] font-mono font-bold text-zinc-700 group-hover:text-zinc-400 uppercase tracking-widest transition-colors">
                                                {el}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Phantom Number */}
                                <div className="absolute -right-8 -bottom-12 text-[15rem] font-bold text-white/[0.01] italic select-none pointer-events-none group-hover:text-white/[0.02] transition-colors">{index + 1}</div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Final Connection Decor */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mt-20 p-16 md:p-20 bg-zinc-950 border border-zinc-900 relative overflow-hidden group shadow-3xl rounded-3xl"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-16 text-center md:text-left">
                        <div className="space-y-8">
                            <div className="text-[9px] font-mono font-bold text-orange-600 uppercase tracking-[0.6em]">System Audit: Active</div>
                            <h4 className="text-4xl md:text-[9rem] font-bold text-white uppercase italic tracking-tighter leading-[0.7]">Plug the Leak <br /><span className="text-zinc-900 border-b-4 border-orange-600">Immediately.</span></h4>
                            <p className="text-zinc-600 text-2xl font-bold uppercase tracking-tighter max-w-3xl mt-10">Deploy our <span className="text-white italic">Conversion Audit</span> and uncover your revenue blockers in 7 days.</p>
                        </div>

                        <Link href="/offers/revenue-roadmap">
                            <Button className="h-28 px-20 rounded-full bg-white text-black hover:bg-orange-600 hover:text-white font-bold text-xs uppercase tracking-[0.6em] transition-all duration-700 shadow-2xl group ring-1 ring-white/10 ring-offset-8 ring-offset-black">
                                Get Started
                                <ArrowRight className="ml-8 w-6 h-6 group-hover:translate-x-6 transition-transform duration-700" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
