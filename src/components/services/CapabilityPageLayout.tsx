'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
    ArrowUpRight, ArrowRight, Code, Layout, Smartphone, Lock, Rocket, Eye, Terminal,
    Shield, Timer, Search, ShieldCheck, Activity, CheckCircle2, Cpu, Zap, BarChart3,
    Users, Network, Microscope, FlaskConical, Bot, Sparkles, Target, Layers, GitBranch,
    TrendingUp, Clock
} from 'lucide-react'
import Link from 'next/link'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import type { PageSection } from '@/types/database'

const iconMap: Record<string, any> = {
    Code, Layout, Smartphone, Lock, Rocket, Eye, Terminal, Shield, Timer, Search,
    ShieldCheck, Activity, CheckCircle2, Cpu, Zap, BarChart3, Users, Network,
    Microscope, FlaskConical, Bot, Sparkles, Target, Layers, GitBranch, TrendingUp
}

interface CapabilityPageLayoutProps {
    title: string
    subtitle: string
    description: string
    heroImage?: string
    includes: string[]
    features?: { title: string; desc: string; icon?: string }[]
    benefits?: { title: string; desc: string }[]
    problem?: { title: string; desc: string; sideNot?: string }
    methodology?: { title: string; steps: { title: string; desc: string }[] }
    techStack?: { category: string; tools: string[] }[]
    sections?: PageSection[]
}

export default function CapabilityPageLayout({
    title, subtitle, description, includes, features, benefits,
    problem, methodology, techStack, sections
}: CapabilityPageLayoutProps) {
    const heroRef = useRef<HTMLElement>(null)
    const heroInView = useInView(heroRef, { once: true })

    const dynamicHero = sections?.find(s => s.section_type === 'hero')
    const dynamicFeatures = sections?.filter(s => s.section_type === 'features') || []
    const dynamicBenefits = sections?.find(s => s.section_type === 'benefits')
    const dynamicProblem = sections?.find(s => s.section_type === 'problem')
    const dynamicMethodology = sections?.find(s => s.section_type === 'methodology')

    return (
        <main className="min-h-screen bg-[#050505] text-white selection:bg-accent/20 font-sans overflow-hidden">
            <AdvancedNavigation />

            {/* ── Hero ── */}
            <section ref={heroRef} className="relative min-h-[92vh] flex flex-col justify-center pt-28 pb-20 overflow-hidden">
                {/* Grid */}
                <div className="absolute inset-0 opacity-[0.025]"
                    style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '80px 80px' }}
                />
                <div className="absolute top-1/3 right-[10%] w-[500px] h-[500px] rounded-full bg-accent/[0.03] blur-[120px] pointer-events-none" />

                <div className="container mx-auto px-6 lg:px-16 relative z-10">
                    {/* Eyebrow */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="flex items-center gap-3 mb-10"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-500">{subtitle}</span>
                    </motion.div>

                    {/* Headline */}
                    <div className="overflow-hidden mb-6">
                        <motion.h1
                            initial={{ y: 90, opacity: 0 }}
                            animate={heroInView ? { y: 0, opacity: 1 } : {}}
                            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                            className="font-display text-[clamp(2.8rem,8vw,6.5rem)] text-white tracking-tight leading-[0.95] max-w-4xl"
                        >
                            {dynamicHero?.title || title}
                        </motion.h1>
                    </div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className="text-zinc-500 text-lg md:text-xl leading-relaxed max-w-2xl mb-10"
                    >
                        {dynamicHero?.description || description}
                    </motion.p>

                    {/* Includes chips */}
                    {includes.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={heroInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.7, delay: 0.3 }}
                            className="flex flex-wrap gap-2 mb-12"
                        >
                            {includes.map((item, i) => (
                                <span key={i} className="text-[9px] font-mono tracking-wider text-zinc-500 px-3 py-1.5 rounded-full border border-white/[0.06] hover:border-white/[0.12] hover:text-zinc-300 transition-all duration-300 cursor-default">
                                    {item}
                                </span>
                            ))}
                        </motion.div>
                    )}

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.42 }}
                        className="flex flex-wrap gap-4 mb-20"
                    >
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-white text-black text-sm font-semibold tracking-wide hover:bg-zinc-100 transition-all duration-300"
                        >
                            Start Your Project
                            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                        <Link
                            href="#details"
                            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-white/[0.08] text-sm text-zinc-400 hover:text-white hover:border-white/[0.16] transition-all duration-300"
                        >
                            Explore Details
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </motion.div>

                    {/* 3-stat mini bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={heroInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.55 }}
                        className="grid grid-cols-3 gap-8 max-w-sm pt-10 border-t border-white/[0.04]"
                    >
                        {[
                            { value: '3–10×', label: 'Typical ROI' },
                            { value: '<30d', label: 'Time to Launch' },
                            { value: '99.9%', label: 'Uptime' },
                        ].map((s, i) => (
                            <div key={i}>
                                <div className="font-display text-2xl md:text-3xl text-white tracking-tight mb-1">{s.value}</div>
                                <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-600">{s.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Problem Framing ── */}
            {(dynamicProblem || problem) && (
                <section className="py-24 border-t border-white/[0.04]">
                    <div className="container mx-auto px-6 lg:px-16">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -24 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <span className="text-[9px] font-mono uppercase tracking-[0.35em] text-red-500/70 mb-4 block">The Problem</span>
                                <h2 className="font-display text-4xl md:text-5xl text-white tracking-tight leading-[1.1] mb-6">
                                    {dynamicProblem?.title || problem?.title}
                                </h2>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, x: 24 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <p className="text-zinc-500 text-lg leading-relaxed mb-6">
                                    {dynamicProblem?.description || problem?.desc}
                                </p>
                                {(dynamicProblem?.metadata?.sideNote || problem?.sideNot) && (
                                    <div className="pl-4 border-l border-red-500/20 text-xs font-mono text-red-400/70 uppercase tracking-widest leading-loose">
                                        ⚠ {dynamicProblem?.metadata?.sideNote || problem?.sideNot}
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>
                </section>
            )}

            {/* ── Features Grid ── */}
            {(dynamicFeatures.length > 0 || (features && features.length > 0)) && (
                <section id="details" className="py-28 border-t border-white/[0.04]">
                    <div className="container mx-auto px-6 lg:px-16">
                        <div className="mb-16">
                            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-600 mb-4 block">What's Included</span>
                            <h2 className="font-display text-4xl md:text-5xl text-white tracking-tight">
                                Every deliverable,<br />
                                <span className="text-zinc-600 italic">accounted for.</span>
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {(dynamicFeatures.length > 0 ? dynamicFeatures : features || []).map((feature: any, i: number) => {
                                const Icon = iconMap[feature.icon || feature.metadata?.icon] || null
                                const featureTitle = feature.title
                                const featureDesc = feature.desc || feature.description || ''
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: '-40px' }}
                                        transition={{ delay: i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                                        className="group p-8 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:border-white/[0.1] hover:bg-white/[0.025] transition-all duration-700 relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                                            style={{ background: 'radial-gradient(400px circle at 50% 0%, rgba(255,255,255,0.02), transparent 60%)' }}
                                        />
                                        {Icon && (
                                            <div className="w-10 h-10 rounded-xl border border-white/[0.06] flex items-center justify-center mb-6 group-hover:border-white/[0.12] transition-colors duration-500">
                                                <Icon className="w-5 h-5 text-zinc-600 group-hover:text-white transition-colors duration-500" />
                                            </div>
                                        )}
                                        <h3 className="text-base font-semibold text-white tracking-tight mb-3 leading-snug">{featureTitle}</h3>
                                        {featureDesc && (
                                            <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors duration-500">{featureDesc}</p>
                                        )}
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Benefits ── */}
            {benefits && benefits.length > 0 && (
                <section className="py-28 border-t border-white/[0.04]">
                    <div className="container mx-auto px-6 lg:px-16">
                        <div className="grid lg:grid-cols-2 gap-20 items-center">
                            <div>
                                <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-600 mb-6 block">The Advantage</span>
                                <h2 className="font-display text-4xl md:text-5xl text-white tracking-tight leading-[1.1] mb-12">
                                    Why this matters<br />
                                    <span className="text-zinc-600 italic">for your revenue.</span>
                                </h2>
                                <div className="space-y-8">
                                    {(dynamicBenefits?.metadata?.items || benefits).map((benefit: any, i: number) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -16 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex gap-6 group"
                                        >
                                            <div className="w-10 h-10 flex-shrink-0 border border-white/[0.06] flex items-center justify-center font-mono text-xs text-zinc-600 group-hover:border-white/[0.16] group-hover:text-white transition-all duration-500">
                                                0{i + 1}
                                            </div>
                                            <div>
                                                <h4 className="text-sm font-semibold text-white mb-2">{benefit.title}</h4>
                                                <p className="text-sm text-zinc-500 leading-relaxed">{benefit.desc}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                            {/* Decorative visual */}
                            <div className="relative h-[400px] rounded-2xl border border-white/[0.04] bg-white/[0.01] overflow-hidden hidden lg:flex items-center justify-center">
                                <div className="absolute inset-0 opacity-[0.025]"
                                    style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
                                />
                                <div className="absolute w-64 h-64 rounded-full border border-white/[0.04] animate-[spin_20s_linear_infinite]" />
                                <div className="absolute w-40 h-40 rounded-full border border-accent/[0.08] animate-[spin_15s_linear_infinite_reverse]" />
                                <div className="relative z-10 text-center">
                                    <div className="font-display text-5xl text-white tracking-tight mb-2">∞</div>
                                    <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-zinc-600">Compounding Returns</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* ── Methodology ── */}
            {methodology && (
                <section className="py-28 border-t border-white/[0.04]">
                    <div className="container mx-auto px-6 lg:px-16">
                        <div className="mb-16">
                            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-600 mb-4 block">Process</span>
                            <h2 className="font-display text-4xl md:text-5xl text-white tracking-tight">
                                {methodology.title}
                            </h2>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {methodology.steps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.7 }}
                                    className="relative p-8 rounded-2xl border border-white/[0.04] hover:border-white/[0.08] transition-all duration-500 group"
                                >
                                    {i < methodology.steps.length - 1 && (
                                        <div className="hidden lg:block absolute top-8 -right-2 w-4 h-px bg-white/[0.06]" />
                                    )}
                                    <div className="font-mono text-[10px] tracking-[0.3em] text-zinc-700 mb-6">0{i + 1}</div>
                                    <h3 className="font-display text-lg text-white tracking-tight mb-3 group-hover:text-zinc-300 transition-colors duration-300">
                                        {step.title}
                                    </h3>
                                    <p className="text-xs text-zinc-600 leading-relaxed group-hover:text-zinc-500 transition-colors duration-300">
                                        {step.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── Tech Stack ── */}
            {techStack && (
                <section className="py-20 border-t border-white/[0.04]">
                    <div className="container mx-auto px-6 lg:px-16">
                        <div className="text-[9px] font-mono uppercase tracking-[0.35em] text-zinc-700 mb-10">Technology Stack</div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {techStack.map((category, i) => (
                                <div key={i} className="space-y-3">
                                    <h4 className="text-xs font-semibold text-white uppercase tracking-wider pb-2 border-b border-white/[0.04]">
                                        {category.category}
                                    </h4>
                                    <ul className="space-y-2">
                                        {category.tools.map((tool, j) => (
                                            <li key={j} className="text-xs text-zinc-600 font-mono hover:text-zinc-400 transition-colors cursor-default">
                                                — {tool}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ── CTA ── */}
            <section className="py-32 border-t border-white/[0.04] relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-white/[0.012] blur-[100px] pointer-events-none" />
                <div className="container mx-auto px-6 lg:px-16 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-medium mb-10">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Accepting new projects · Limited spots available
                    </div>
                    <h2 className="font-display text-5xl md:text-7xl text-white tracking-tight leading-[0.95] mb-8 max-w-3xl mx-auto">
                        Ready to get<br />
                        <span className="text-zinc-600 italic">started?</span>
                    </h2>
                    <p className="text-zinc-500 text-lg max-w-xl mx-auto mb-12">
                        Let's scope your project. We'll audit your current state and deliver a clear path to measurable outcomes.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/contact"
                            className="group inline-flex items-center gap-2.5 px-10 py-5 rounded-full bg-white text-black text-sm font-semibold tracking-wide hover:bg-zinc-100 transition-all duration-300"
                        >
                            Start Your Project
                            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                        <Link
                            href="/estimator"
                            className="inline-flex items-center gap-2.5 px-10 py-5 rounded-full border border-white/[0.08] text-sm text-zinc-400 hover:text-white hover:border-white/[0.16] transition-all duration-300"
                        >
                            Get a Free Estimate
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
