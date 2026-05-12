'use client'

import React, { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'
import Image from 'next/image'
import {
    ArrowLeft, CheckCircle2,
    ArrowRight, Target, Zap, TrendingUp, BarChart3,
    Cpu, Layers, Code2, Rocket, ArrowUpRight
} from 'lucide-react'

import MotionOrchestrator, { MotionItem } from '@/components/effects/MotionOrchestrator'
import SectionAtmosphere from '@/components/effects/SectionAtmosphere'
import KineticTypography from '@/components/effects/KineticTypography'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface ProjectDetailsClientProps {
    project: any
    results: any[]
}

export default function ProjectDetailsClient({ project, results }: ProjectDetailsClientProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const heroRef = useRef<HTMLElement>(null)

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    })

    const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
    const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
    const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Horizontal scroll for process/metrics if needed or simple staggers
            gsap.from(".result-card", {
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 1,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: "#results-grid",
                    start: "top 85%",
                }
            })

            gsap.from(".tech-tag", {
                scale: 0.8,
                opacity: 0,
                stagger: 0.05,
                duration: 0.5,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: "#tech-stack",
                    start: "top 90%",
                }
            })
        })
        return () => ctx.revert()
    }, [])

    return (
        <div ref={containerRef} className="bg-[#030303] text-white">
            <MotionOrchestrator>

                {/* ─── CINEMATIC HERO ─── */}
                <section
                    ref={heroRef}
                    className="relative min-h-[90vh] flex items-center justify-center overflow-hidden"
                >
                    <motion.div
                        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
                        className="absolute inset-0 z-0"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-[#030303]/40 via-[#030303]/70 to-[#030303] z-10" />
                        {project.thumbnail_url ? (
                            <Image
                                src={project.thumbnail_url}
                                alt={project.title}
                                fill
                                className="object-cover opacity-30"
                                priority
                            />
                        ) : (
                            <div className="w-full h-full bg-[#050505]" />
                        )}
                        <SectionAtmosphere preset="gradient" intensity={0.8} />
                    </motion.div>

                    <div className="container mx-auto px-6 lg:px-16 relative z-10 pt-32 text-center">
                        <MotionItem>
                            <Link href="/results" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 text-sm font-mono tracking-widest group">
                                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                                BACK TO RESULTS
                            </Link>
                        </MotionItem>

                        <MotionItem>
                            <div className="flex items-center justify-center gap-4 mb-8 text-xs font-mono tracking-[0.4em] uppercase text-accent">
                                <span>{project.client}</span>
                                <span className="w-1 h-1 rounded-full bg-white/20" />
                                <span className="text-zinc-500">{project.category}</span>
                            </div>
                        </MotionItem>

                        <KineticTypography
                            text={project.title}
                            className="font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.9] tracking-tighter text-white mb-12 max-w-5xl mx-auto"
                        />

                        <MotionItem variant="blurReveal">
                            <p className="text-xl md:text-2xl text-zinc-400 max-w-3xl mx-auto leading-relaxed font-light mb-16">
                                {project.description}
                            </p>
                        </MotionItem>

                        <MotionItem>
                            <div className="flex justify-center">
                                <div className="p-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm animate-bounce">
                                    <div className="w-8 h-12 rounded-full border-2 border-zinc-700 flex items-start justify-center p-2">
                                        <div className="w-1 h-2 bg-accent rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </MotionItem>
                    </div>
                </section>

                {/* ─── RESULTS GRID ─── */}
                <section id="results-grid" className="py-24 border-y border-white/[0.04] bg-[#050505]">
                    <div className="container mx-auto px-6 lg:px-16">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                            {results.map((result: any, i: number) => (
                                <div key={i} className="result-card flex flex-col items-center text-center">
                                    <div className="text-5xl font-display text-white mb-2 tracking-tighter">{result.value}</div>
                                    <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{result.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── THE CASE NARRATIVE ─── */}
                <section className="py-32 relative">
                    <div className="container mx-auto px-6 lg:px-16">
                        <div className="grid lg:grid-cols-12 gap-20">

                            {/* Left Side: Text Content */}
                            <div className="lg:col-span-7 space-y-24">
                                {project.challenge && (
                                    <div>
                                        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent mb-6 block">The Bottleneck</span>
                                        <h2 className="font-display text-4xl text-white mb-8 tracking-tight">The Challenge</h2>
                                        <div
                                            className="prose prose-invert prose-xl text-zinc-400 leading-relaxed font-light"
                                            dangerouslySetInnerHTML={{ __html: project.challenge.replace(/\n/g, '<br/>') }}
                                        />
                                    </div>
                                )}

                                {project.solution && (
                                    <div>
                                        <span className="text-[10px] font-mono uppercase tracking-[0.4em] text-accent mb-6 block">The Intervention</span>
                                        <h2 className="font-display text-4xl text-white mb-8 tracking-tight">The Solution</h2>
                                        <div
                                            className="prose prose-invert prose-xl text-zinc-400 leading-relaxed font-light"
                                            dangerouslySetInnerHTML={{ __html: project.solution.replace(/\n/g, '<br/>') }}
                                        />
                                    </div>
                                )}

                                {project.fullDescription && (
                                    <div className="pt-20 border-t border-white/[0.05]">
                                        <div
                                            className="prose prose-invert prose-lg text-zinc-500 leading-relaxed font-light max-w-none"
                                            dangerouslySetInnerHTML={{ __html: project.fullDescription.replace(/\n/g, '<br/>') }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Right Side: Meta/Tech Stack */}
                            <div className="lg:col-span-5">
                                <div className="sticky top-32 space-y-12">
                                    <div className="p-8 rounded-3xl border border-white/[0.04] bg-white/[0.02] backdrop-blur-md">
                                        <h3 className="text-sm font-mono uppercase tracking-[0.3em] text-zinc-500 mb-8 border-b border-white/5 pb-6">Stack & Tools</h3>
                                        <div id="tech-stack" className="flex flex-wrap gap-3">
                                            {(project.technologies || "").split(',').map((tech: string, i: number) => (
                                                <span key={i} className="tech-tag px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-widest text-zinc-400 hover:text-white hover:border-accent transition-colors cursor-default">
                                                    {tech.trim()}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Sidebar CTA */}
                                    <div className="p-8 rounded-3xl bg-accent text-black">
                                        <h3 className="font-display text-2xl mb-4 leading-tight">Want results like this for your brand?</h3>
                                        <p className="text-black/60 text-sm mb-8 leading-relaxed">
                                            We're currently accepting 3 new partners for the next quarter. Reserve your diagnostic call today.
                                        </p>
                                        <Link
                                            href="/contact"
                                            className="flex items-center justify-between w-full p-4 rounded-xl bg-black text-white font-bold text-xs tracking-widest uppercase transition-transform hover:scale-[1.02]"
                                        >
                                            Book Consultation
                                            <ArrowUpRight className="w-4 h-4" />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {/* ─── FINAL CTA ─── */}
                <section className="py-48 relative overflow-hidden bg-[#030303] border-t border-white/[0.04]">
                    <div className="container mx-auto px-6 lg:px-16 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="font-display text-5xl md:text-8xl text-white tracking-tighter leading-[0.9] mb-12">
                                Ready for your <br />
                                <span className="italic text-zinc-500">Milestone.</span>
                            </h2>
                            <Link
                                href="/contact"
                                className="group inline-flex items-center gap-4 bg-white text-black px-12 py-6 rounded-full font-bold text-sm tracking-widest uppercase transition-all duration-500 hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
                            >
                                Start Your Journey
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                            </Link>
                        </motion.div>
                    </div>
                </section>

            </MotionOrchestrator>
        </div>
    )
}
