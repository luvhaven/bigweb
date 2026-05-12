'use client'

import React, { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import {
    ArrowUpRight, ArrowRight, CheckCircle2,
    Zap, Target, TrendingUp, Shield,
    ArrowDown, ChevronRight, BarChart3,
    Cpu, Clock
} from 'lucide-react'

import MotionOrchestrator, { MotionItem } from '@/components/effects/MotionOrchestrator'
import SectionAtmosphere from '@/components/effects/SectionAtmosphere'
import KineticTypography from '@/components/effects/KineticTypography'
import PricingCalculator from '@/components/PricingCalculator'
import ProcessTimeline from '@/components/ProcessTimeline'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface ServiceDetailsClientProps {
    service: any
    features: any[]
    processSteps: any[]
}

export default function ServiceDetailsClient({ service, features, processSteps }: ServiceDetailsClientProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const heroRef = useRef<HTMLElement>(null)
    const statsRef = useRef<HTMLDivElement>(null)

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    })

    const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"])
    const heroContentY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Animate stats on scroll
            if (statsRef.current) {
                gsap.from(statsRef.current.querySelectorAll('.stat-item'), {
                    y: 40,
                    opacity: 0,
                    stagger: 0.15,
                    duration: 1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: "top 85%",
                    }
                })
            }

            // Animate feature cards
            gsap.from(".feature-card", {
                y: 60,
                opacity: 0,
                stagger: 0.1,
                duration: 1.2,
                ease: "expo.out",
                scrollTrigger: {
                    trigger: "#features-grid",
                    start: "top 80%",
                }
            })
        })
        return () => ctx.revert()
    }, [])

    const serviceTitle = service.title || 'Our Service'
    const serviceCategory = service.category || 'Expert Implementation'

    return (
        <div ref={containerRef} className="bg-[#030303] text-white">
            <MotionOrchestrator>

                {/* ─── PREMIUM PARALLAX HERO ─── */}
                <section
                    ref={heroRef}
                    className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
                >
                    {/* Background layers */}
                    <motion.div
                        style={{ y: heroImageY, opacity: 0.4 }}
                        className="absolute inset-0 z-0"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/20 via-[#030303]/60 to-[#030303]" />
                        {/* Abstract visual pattern or image fallback */}
                        <div className="w-full h-full bg-[#050505] relative overflow-hidden">
                            <div className="absolute inset-0 opacity-20"
                                style={{
                                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)',
                                    backgroundSize: '40px 40px'
                                }}
                            />
                            <SectionAtmosphere intensity={1} preset="cool" />
                        </div>
                    </motion.div>

                    <motion.div
                        style={{ y: heroContentY, opacity: heroOpacity }}
                        className="container mx-auto px-6 lg:px-16 relative z-10 text-center"
                    >
                        <MotionItem>
                            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
                                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                                <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-zinc-400">
                                    {serviceCategory}
                                </span>
                            </div>
                        </MotionItem>

                        <KineticTypography
                            segments={[
                                { text: serviceTitle.split(' ').slice(0, -1).join(' ') + ' ' },
                                { text: serviceTitle.split(' ').slice(-1)[0], className: 'italic text-accent' }
                            ]}
                            className="font-display text-[clamp(2.5rem,8vw,6rem)] leading-[0.9] tracking-tighter text-white mb-10 max-w-5xl mx-auto"
                        />

                        <MotionItem variant="blurReveal">
                            <p className="text-lg md:text-2xl text-zinc-500 max-w-3xl mx-auto leading-relaxed mb-12 font-light">
                                {service.description || "Transforming complex challenges into scalable revenue engines through precision engineering and psychological design."}
                            </p>
                        </MotionItem>

                        <MotionItem variant="scaleUp">
                            <div className="flex flex-wrap items-center justify-center gap-6">
                                <Link
                                    href="/contact"
                                    className="group relative inline-flex items-center gap-3 bg-white text-black px-10 py-5 rounded-full font-bold text-sm tracking-widest uppercase transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-[1.05]"
                                >
                                    Start Engagement
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                                <button
                                    onClick={() => document.getElementById('anatomy')?.scrollIntoView({ behavior: 'smooth' })}
                                    className="group flex flex-col items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-600 hover:text-white transition-colors"
                                >
                                    <span>Explore Logic</span>
                                    <ArrowDown className="w-4 h-4 animate-bounce" />
                                </button>
                            </div>
                        </MotionItem>
                    </motion.div>
                </section>

                {/* ─── ANALYTICS / IMPACT SECTION ─── */}
                <section ref={statsRef} className="py-24 border-y border-white/[0.04] bg-[#050505]">
                    <div className="container mx-auto px-6 lg:px-16">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
                            {[
                                { icon: TrendingUp, value: "3.2x", label: "Average ROI", sub: "measured 90d post-launch" },
                                { icon: Clock, value: "14d", label: "Initial Delivery", sub: "First major milestone" },
                                { icon: Shield, value: "Elite", label: "Standard", sub: "No compromises made" },
                                { icon: Target, value: "100%", label: "Alignment", sub: "Built for your goals" },
                            ].map((stat, i) => (
                                <div key={i} className="stat-item flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-center mb-6">
                                        <stat.icon className="w-5 h-5 text-accent" />
                                    </div>
                                    <div className="font-display text-4xl text-white mb-2">{stat.value}</div>
                                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1">{stat.label}</div>
                                    <div className="text-[9px] text-zinc-700 uppercase">{stat.sub}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── THE ANATOMY (CONTENT) ─── */}
                <section id="anatomy" className="py-32 relative overflow-hidden">
                    <div className="container mx-auto px-6 lg:px-16 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-24 items-start">
                            <div className="sticky top-32">
                                <span className="text-xs font-medium tracking-[0.3em] uppercase text-accent mb-6 block">The Anatomy</span>
                                <h2 className="font-display text-5xl md:text-6xl text-white tracking-tighter leading-tight mb-8">
                                    Engineered for <br />
                                    <span className="italic text-zinc-500">Total Dominance.</span>
                                </h2>
                                <p className="text-xl text-zinc-500 leading-relaxed mb-12 max-w-lg">
                                    We don't provide "services." We deploy surgical interventions. Every line of code and every pixel is a deliberate choice made to reduce friction and accelerate conversion.
                                </p>

                                <div className="space-y-6">
                                    {[
                                        { title: "Psychological Architecture", icon: Brain },
                                        { title: "Technical Excellence", icon: Cpu },
                                        { title: "Revenue Alignment", icon: BarChart3 }
                                    ].map((point, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-center gap-4 group"
                                        >
                                            <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent transition-colors">
                                                <point.icon className="w-4 h-4 text-zinc-600 group-hover:text-accent" />
                                            </div>
                                            <span className="text-sm font-semibold tracking-wide text-zinc-400 group-hover:text-white transition-colors">{point.title}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-32">
                                <div
                                    className="prose prose-invert prose-2xl max-w-none text-zinc-400 leading-relaxed font-light"
                                    dangerouslySetInnerHTML={{ __html: service.fullDescription?.replace(/\n/g, '<br/>') }}
                                />

                                {/* Features Grid Within Content */}
                                <div id="features-grid" className="grid gap-4">
                                    {features.map((feature, i) => (
                                        <div key={i} className="feature-card p-8 rounded-2xl border border-white/[0.04] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 group">
                                            <div className="flex items-start justify-between mb-6">
                                                <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                                                    <CheckCircle2 className="w-5 h-5 text-accent" />
                                                </div>
                                                <span className="text-[10px] font-mono text-zinc-700">0{i + 1}</span>
                                            </div>
                                            <h3 className="text-xl font-bold mb-4 group-hover:text-accent transition-colors">{feature.title}</h3>
                                            <p className="text-zinc-500 leading-relaxed text-sm">
                                                {feature.description || "Precision-crafted capability designed to remove specific business bottlenecks and streamline operations."}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── PROCESS SECTION ─── */}
                <section className="py-32 border-t border-white/[0.04]">
                    <div className="container mx-auto px-6 lg:px-16 text-center mb-24">
                        <span className="text-xs font-mono uppercase tracking-[0.4em] text-zinc-600 mb-6 block">The Protocol</span>
                        <h2 className="font-display text-5xl md:text-7xl text-white tracking-tighter">
                            Step-by-step <span className="italic text-zinc-500">execution.</span>
                        </h2>
                    </div>
                    <div className="container mx-auto px-6 lg:px-16">
                        <ProcessTimeline steps={processSteps} />
                    </div>
                </section>

                {/* ─── ROI CALCULATOR ─── */}
                <section className="py-32 bg-[#050505] relative">
                    <SectionAtmosphere preset="emerald" intensity={0.6} />
                    <div className="container mx-auto px-6 lg:px-16 relative z-10">
                        <div className="max-w-4xl mx-auto">
                            <div className="text-center mb-16">
                                <h2 className="font-display text-4xl md:text-6xl text-white tracking-tighter mb-6">The Outcome <span className="italic text-zinc-500">Calculator.</span></h2>
                                <p className="text-zinc-500 max-w-xl mx-auto">Estimate the potential growth impact of our {serviceTitle} engagement on your bottom line.</p>
                            </div>
                            <PricingCalculator />
                        </div>
                    </div>
                </section>

                {/* ─── CALL TO ACTION ─── */}
                <section className="py-48 relative overflow-hidden bg-[#030303]">
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.03] blur-[200px] rounded-full" />
                    </div>

                    <div className="container mx-auto px-6 lg:px-16 text-center relative z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <h2 className="font-display text-6xl md:text-8xl lg:text-9xl text-white tracking-[ -0.05em] leading-[0.85] mb-12">
                                STOP LEAKING <br />
                                <span className="text-accent italic">REVENUE.</span>
                            </h2>

                            <p className="text-xl md:text-2xl text-zinc-500 max-w-2xl mx-auto mb-16 font-light">
                                Your current infrastructure is costing you clients every second.
                                Secure your consultation for a professional {serviceTitle} re-engineering.
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-8">
                                <Link
                                    href="/contact"
                                    className="group relative h-20 px-12 rounded-full bg-white text-black flex items-center justify-center font-bold text-lg tracking-widest uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
                                >
                                    <span className="relative z-10">Start Re-Engineering</span>
                                    <div className="absolute inset-0 translate-y-full bg-accent group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                </Link>

                                <Link
                                    href="/services"
                                    className="group flex items-center gap-4 text-sm font-bold uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors"
                                >
                                    View Other Services
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </section>

            </MotionOrchestrator>
        </div>
    )
}

// Helper icons
const Brain = (props: any) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Z" />
        <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z" />
    </svg>
)
