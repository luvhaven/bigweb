'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Link from 'next/link'
import {
    ArrowUpRight, ArrowRight, ShieldCheck, Zap, AppWindow,
    Code2, DatabaseZap, Search, Network, Box, Lock, Sparkles, Target, CheckCircle2
} from 'lucide-react'
import KineticTypography from '@/components/effects/KineticTypography'
import TrustBadges from '@/components/trust/TrustBadges'

/* ── UI ATOMS ── */
function Badge({ children, pulse = false }: { children: React.ReactNode, pulse?: boolean }) {
    return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] backdrop-blur-md mb-8">
            {pulse && (
                <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
                </span>
            )}
            <span className="text-[10px] font-mono tracking-[0.2em] text-zinc-300 uppercase">
                {children}
            </span>
        </div>
    )
}

function SectionHeading({ subtitle, title, align = 'left' }: { subtitle: string, title: React.ReactNode, align?: 'left' | 'center' }) {
    const textBase = align === 'center' ? 'text-center' : 'text-left'
    const marginBase = align === 'center' ? 'mx-auto' : ''

    return (
        <div className={`mb-16 md:mb-24 ${textBase} max-w-4xl ${marginBase}`}>
            <div className={`flex items-center gap-3 mb-6 ${align === 'center' ? 'justify-center' : ''}`}>
                <span className="w-8 h-px bg-accent" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent">
                    {subtitle}
                </span>
                {align === 'center' && <span className="w-8 h-px bg-accent" />}
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl tracking-tight text-white leading-[1.05]">
                {title}
            </h2>
        </div>
    )
}

/* ── HERO ── */
function Hero() {
    const ref = useRef<HTMLElement>(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
    const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

    return (
        <section ref={ref} className="relative min-h-[95vh] flex items-end pb-24 md:pb-32 overflow-hidden border-b border-white/[0.04] pt-32">
            <motion.div style={{ y: yBg }} className="absolute inset-0 pointer-events-none">
                {/* Image Background */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop"
                        alt="Engineering Data"
                        className="w-full h-full object-cover opacity-30"
                        style={{ filter: 'brightness(0.3) contrast(1.2) saturate(0)' }}
                    />
                </div>
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent z-10" />
                <div className="absolute top-1/2 left-1/4 w-[800px] h-[800px] bg-accent/[0.04] blur-[180px] rounded-full z-10" />
                {/* Tech grid */}
                <div className="absolute inset-0 z-10 opacity-[0.03]"
                    style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </motion.div>

            <motion.div style={{ opacity }} className="container mx-auto px-6 lg:px-16 relative z-20">
                <div className="max-w-5xl">
                    <Badge pulse>Core Discipline 01</Badge>
                    
                    <div className="mb-8">
                        <KineticTypography
                            text="Website Engineering"
                            as="h1"
                            className="text-[clamp(3.5rem,8vw,8rem)] font-display font-black leading-[0.9] tracking-tighter text-white"
                        />
                        <div className="text-[clamp(3.5rem,8vw,8rem)] font-display font-black leading-[0.9] tracking-tighter italic text-accent opacity-90">
                            The Revenue Machine
                        </div>
                    </div>

                    <p className="text-zinc-400 text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed font-light mb-12">
                        We don't build brochures. We engineer ultra-fast, highly-available enterprise platforms wrapped in conversion psychology. Your website is the ultimate sales asset. <strong className="font-semibold text-white">We make it perform.</strong>
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <Link href="/contact?service=web-development" className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-accent bg-accent/10 px-10 py-5">
                            <span className="absolute inset-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-105 opacity-0 group-hover:opacity-100" />
                            <span className="relative z-10 flex items-center gap-3 text-white font-bold text-sm tracking-[0.1em] uppercase group-hover:text-black transition-colors duration-300">
                                Engineer My Platform
                                <ArrowUpRight className="w-4 h-4" />
                            </span>
                        </Link>
                        
                        <div className="flex items-center gap-4 text-zinc-500 text-sm font-mono uppercase tracking-[0.1em] px-4">
                            <div className="flex -space-x-3">
                                {[
                                    'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop',
                                    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop',
                                    'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop'
                                ].map((img, i) => (
                                    <img key={i} src={img} alt="" className="w-10 h-10 rounded-full border-2 border-[#030303] relative z-10" />
                                ))}
                            </div>
                            <span className="flex flex-col">
                                <span className="text-white font-bold tracking-widest leading-tight">200+</span>
                                <span className="text-[9px]">Stacks Deployed</span>
                            </span>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    )
}

/* ── PROBLEM / MANIFESTO ── */
function ProblemAgitation() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-20%' })

    return (
        <section className="py-24 md:py-36 border-b border-white/[0.04] bg-[#020202] relative" ref={ref}>
            <div className="container mx-auto px-6 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
                    
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }} 
                        animate={inView ? { opacity: 1, x: 0 } : {}} 
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-6"
                    >
                        <SectionLabel>The Broken Standard</SectionLabel>
                        <h2 className="font-display text-4xl md:text-5xl text-white tracking-tight leading-[1.05] mb-8">
                            Most agencies sell you <br/>
                            <span className="text-zinc-600 italic">a pretty PDF in the browser.</span>
                        </h2>
                        
                        <div className="prose prose-invert prose-lg text-zinc-400 font-light leading-relaxed">
                            <p>
                                The vast majority of standard web development is fundamentally broken. Agencies focus exclusively on subjective aesthetics: nice colors, fancy fonts, and arbitrary animations.
                            </p>
                            <p>
                                <strong className="text-white font-medium">The result?</strong> A beautiful website that takes 4 seconds to load over 5G, bleeds SEO ranking due to terrible Core Web Vitals, gets hacked via outdated WordPress plugins, and ultimately fails to convert high-value traffic.
                            </p>
                            <p>
                                We don't build brochures. We treat every web project as a <span className="text-accent">mission-critical software application</span>.
                            </p>
                        </div>
                    </motion.div>

                    <div className="lg:col-span-5 lg:col-start-8">
                        <div className="grid gap-4 relative">
                            {/* Decorative background blur */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-500/10 blur-[100px] rounded-full z-0 pointer-events-none" />
                            
                            {[
                                { title: "Bloated DOMs & 4s+ Load Times", metric: "53%", impact: "Users leave if a site takes >3s." },
                                { title: "Hardcoded CMS Constraints", metric: "Zero", impact: "Marketing agility when chained to code." },
                                { title: "Weak SEO Architecture", metric: "Rank #42", impact: "Because client-side React can't be crawled." }
                            ].map((issue, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={inView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                                    className="bg-[#050505] border border-white/[0.04] p-6 rounded-2xl relative z-10 flex items-start gap-6"
                                >
                                    <div className="w-14 h-14 shrink-0 rounded-full border border-red-500/20 bg-red-500/5 flex justify-center items-center">
                                        <span className="font-mono text-red-500 font-bold text-sm">{issue.metric}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-semibold tracking-tight text-lg mb-1.5">{issue.title}</h4>
                                        <p className="text-zinc-500 text-sm leading-relaxed">{issue.impact}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
    return (
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/[0.06] bg-white/[0.02] mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-500">{children}</span>
        </div>
    )
}

/* ── THE MODERN ARCHITECTURE (FEATURES) ── */
const STACK_FEATURES = [
    {
        icon: AppWindow,
        title: 'Next.js 15 & React Server Components',
        desc: 'We leverage the bleeding edge of React. Server-side rendering ensures perfect technical SEO, while Edge caching guarantees identical sub-50ms load times worldwide.',
        color: '#ffffff'
    },
    {
        icon: DatabaseZap,
        title: 'Headless CMS Infrastructure',
        desc: 'Sanity, Contentful, or Supabase. We decouple your frontend from the database. Your marketing team can publish visually, instantly securely, without touching a line of code.',
        color: '#6366f1'
    },
    {
        icon: Search,
        title: 'Forensic Technical SEO',
        desc: 'Perfect semantic HTML, dynamic XML sitemaps, structured JSON-LD data, and strict adherence to Google Core Web Vitals. We engineer for page 1.',
        color: '#10b981'
    },
    {
        icon: Lock,
        title: 'Enterprise Security Posture',
        desc: 'Static site generation mitigates 99% of common web attack vectors. We implement strict CSP headers, DDoS protection, and end-to-end encryption.',
        color: '#f59e0b'
    },
    {
        icon: Sparkles,
        title: 'WebGL & Motion Physics',
        desc: '60fps hardware-accelerated animations using GSAP and Framer Motion. The site doesn\'t just load — it breathes, creating undeniable brand premium.',
        color: '#d4a853'
    },
    {
        icon: Target,
        title: 'A/B & Multi-Variant Ready',
        desc: 'Built with conversion in mind. Easily route varied traffic to dynamic server-rendered pages to test copy, layouts, and CTAs algorithmically.',
        color: '#ec4899'
    }
]

function TechStack() {
    return (
        <section className="py-24 md:py-36 relative border-b border-white/[0.04]">
            {/* Background */}
            <div className="absolute inset-0 bg-[#040404] z-0" />
            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                <SectionHeading 
                    subtitle="The Blueprint" 
                    title={<>The anatomy of an <span className="text-zinc-600 italic">elite platform.</span></>}
                    align="center"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {STACK_FEATURES.map((feat, i) => (
                        <div key={i} className="group p-8 rounded-[2rem] bg-[#060606] border border-white/[0.04] hover:border-white/[0.1] hover:bg-[#0a0a0a] transition-all duration-500 overflow-hidden relative">
                            {/* Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-15 transition-opacity duration-700 blur-[50px] pointer-events-none"
                                 style={{ background: feat.color }} />
                            
                            <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-500">
                                <feat.icon size={20} strokeWidth={1.5} />
                            </div>
                            <h3 className="text-xl font-bold text-white tracking-tight mb-4">{feat.title}</h3>
                            <p className="text-zinc-500 leading-relaxed text-sm font-light group-hover:text-zinc-400 transition-colors">
                                {feat.desc}
                            </p>
                            
                            {/* Bottom accent */}
                            <div className="absolute bottom-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                 style={{ background: `linear-gradient(90deg, transparent, ${feat.color}, transparent)` }} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

/* ── PROOF / ROI ── */
function ProofSection() {
    return (
        <section className="py-24 md:py-36 bg-[#030303] border-b border-white/[0.04]">
            <div className="container mx-auto px-6 lg:px-16">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <div>
                        <SectionLabel>The Results</SectionLabel>
                        <h2 className="font-display text-4xl md:text-5xl text-white tracking-tight leading-[1.05] mb-8">
                            Speed correlates <br />
                            <span className="text-accent italic">directly to revenue.</span>
                        </h2>
                        <ul className="space-y-6">
                            {[
                                { m: '-42%', label: 'Bounce Rate Reduction', t: 'When rendering shifts to Edge CDN.' },
                                { m: '+340%', label: 'Mobile Conversion Lift', t: 'Via fluid layouts and optimized Core Web Vitals.' },
                                { m: '0.1s', label: 'Interaction Delay', t: 'Near-instantaneous feeling vs sluggish legacy stacks.' }
                            ].map((s, i) => (
                                <li key={i} className="flex gap-6 items-start">
                                    <div className="w-24 shrink-0 font-display font-black text-3xl text-white">{s.m}</div>
                                    <div>
                                        <div className="font-bold text-zinc-300 tracking-wide uppercase text-xs mb-1">{s.label}</div>
                                        <div className="text-zinc-500 text-sm">{s.t}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-10 bg-gradient-to-tr from-accent/[0.05] to-indigo-500/[0.05] blur-3xl opacity-50" />
                        <div className="relative rounded-[2rem] overflow-hidden border border-white/[0.06] bg-[#050505] p-8 md:p-12 shadow-2xl">
                            <h3 className="text-xl text-white tracking-tight font-semibold mb-6 flex items-center justify-between">
                                Audit Target (Post-Launch)
                                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono tracking-widest uppercase">Passing</span>
                            </h3>

                            <div className="space-y-4">
                                {/* Lighthouse Mock */}
                                <div className="flex gap-4">
                                    {[
                                        { s: 100, l: 'Performance', c: '#10b981' },
                                        { s: 100, l: 'Accessibility', c: '#10b981' },
                                        { s: 100, l: 'Best Practices', c: '#10b981' },
                                        { s: 100, l: 'SEO', c: '#10b981' },
                                    ].map((sc, i) => (
                                        <div key={i} className="flex-1 text-center bg-white/[0.02] rounded-xl py-6 border border-white/[0.04]">
                                            <div className="text-3xl font-display font-black text-emerald-400 mb-2">{sc.s}</div>
                                            <div className="text-[9px] uppercase tracking-wider text-zinc-500 max-w-[60px] mx-auto leading-tight">{sc.l}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 pt-6 border-t border-white/[0.04] flex items-center gap-3">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    <p className="text-xs text-zinc-400 leading-relaxed font-mono">Core Web Vitals assessment: <span className="text-emerald-400">PASSED</span>. LCP &lt; 1.2s, CLS 0.00, INP &lt; 50ms.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

/* ── FINAL CTA ── */
function BottomCTA() {
    return (
        <section className="py-32 md:py-48 relative overflow-hidden bg-[#000]">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-accent/5 blur-[120px] mix-blend-screen" />
            </div>

            <div className="container mx-auto px-6 lg:px-16 text-center relative z-10 max-w-4xl">
                <SectionLabel>Initialize Build</SectionLabel>
                <h2 className="font-display text-5xl md:text-7xl text-white tracking-tight leading-[0.95] mb-8 uppercase font-black">
                    Deploy Your <br/>
                    <span className="text-accent italic">Unfair Advantage.</span>
                </h2>
                
                <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                    Stop losing market share to inferior products with better websites. We build the architecture required for your next phase of scale.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/contact?service=web-development" className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black text-[13px] font-black tracking-[0.1em] uppercase hover:bg-zinc-100 transition-all duration-300">
                        Scope My Platform
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <Link href="/case-studies" className="group inline-flex items-center gap-3 px-10 py-5 rounded-full border border-white/[0.1] text-zinc-400 text-[13px] font-bold tracking-[0.1em] uppercase hover:text-white hover:border-white/[0.2] transition-all duration-300">
                        View Implementations
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default function WebDevClient() {
    return (
        <div className="overflow-clip">
            <Hero />
            <ProblemAgitation />
            <TechStack />
            <ProofSection />
            <TrustBadges />
            <BottomCTA />
        </div>
    )
}
