'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Link from 'next/link'
import {
    ArrowUpRight, ArrowRight, ShieldCheck, Gauge, Globe,
    Lock, CheckCircle2, Server, BatteryCharging, Zap, Hexagon, Shield
} from 'lucide-react'
import KineticTypography from '@/components/effects/KineticTypography'
import TrustBadges from '@/components/trust/TrustBadges'

/* ── UI ATOMS ── */
function Badge({ children, pulse = false }: { children: React.ReactNode, pulse?: boolean }) {
    return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-md mb-8">
            {pulse && (
                <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
                </span>
            )}
            <span className="text-[10px] font-mono tracking-[0.2em] text-cyan-300 uppercase">
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
                <span className="w-8 h-px bg-cyan-500" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-cyan-500">
                    {subtitle}
                </span>
                {align === 'center' && <span className="w-8 h-px bg-cyan-500" />}
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
                        src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop"
                        alt="Server Infrastructure"
                        className="w-full h-full object-cover opacity-[0.25] mix-blend-luminosity"
                        style={{ filter: 'brightness(0.5) contrast(1.2)' }}
                    />
                </div>
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent z-10" />
                <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-cyan-500/[0.04] blur-[150px] rounded-full z-10 mix-blend-screen" />
                <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-teal-500/[0.03] blur-[180px] rounded-full z-10" />
                {/* Grid */}
                <div className="absolute inset-0 z-10 opacity-[0.03]"
                    style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,0.1) 1px, transparent 1px),linear-gradient(90deg, rgba(6,182,212,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </motion.div>

            <motion.div style={{ opacity }} className="container mx-auto px-6 lg:px-16 relative z-20">
                <div className="max-w-5xl">
                    <Badge pulse>Core Discipline 05</Badge>
                    
                    <div className="mb-8">
                        <KineticTypography
                            text="Trust & Performance"
                            as="h1"
                            className="text-[clamp(3.5rem,8vw,8rem)] font-display font-black leading-[0.9] tracking-tighter text-white"
                        />
                        <div className="text-[clamp(3.5rem,8vw,8rem)] font-display font-black leading-[0.9] tracking-tighter italic text-cyan-400 opacity-90 drop-shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                            Invisible Factors
                        </div>
                    </div>

                    <p className="text-zinc-400 text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed font-light mb-12">
                        Users judge your credibility in 50 milliseconds. We optimize the invisible factors that dictate whether traffic trusts you enough to buy: sub-500ms Edge rendering, military-grade security posture, and absolute Core Web Vitals dominance.
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <Link href="/contact?service=trust-optimization" className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-cyan-500 bg-cyan-500/10 px-10 py-5">
                            <span className="absolute inset-0 bg-cyan-500 transition-transform duration-500 ease-out group-hover:scale-105 opacity-0 group-hover:opacity-100" />
                            <span className="relative z-10 flex items-center gap-3 text-white font-bold text-sm tracking-[0.1em] uppercase group-hover:text-black transition-colors duration-300">
                                Harden My Architecture
                                <ArrowUpRight className="w-4 h-4" />
                            </span>
                        </Link>
                        
                        <div className="flex items-center gap-4 text-zinc-500 text-sm font-mono uppercase tracking-[0.1em] px-4">
                            <div className="flex -space-x-3">
                                {[
                                    'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=100&h=100&fit=crop',
                                    'https://images.unsplash.com/photo-1580828369066-6b22c71026af?w=100&h=100&fit=crop',
                                ].map((img, i) => (
                                    <img key={i} src={img} alt="" className="w-10 h-10 rounded-full border-2 border-[#030303] relative z-10 grayscale hover:grayscale-0 transition-all" />
                                ))}
                            </div>
                            <span className="flex flex-col">
                                <span className="text-cyan-400 font-bold tracking-widest leading-tight">&lt;500ms</span>
                                <span className="text-[9px]">Target Load Protocol</span>
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
                        <SectionLabel>The 4-Second Penalty</SectionLabel>
                        <h2 className="font-display text-4xl md:text-5xl text-white tracking-tight leading-[1.05] mb-8">
                            A slow website <br/>
                            <span className="text-zinc-600 italic">destroys brand equity.</span>
                        </h2>
                        
                        <div className="prose prose-invert prose-lg text-zinc-400 font-light leading-relaxed">
                            <p>
                                If your website takes 4 seconds to load over a 5G connection, you've already lost the battle. Subconsciously, the user has associated your brand with frustration, untrustworthiness, and incompetence.
                            </p>
                            <p>
                                <strong className="text-white font-medium">Google agrees.</strong> Poor Core Web Vitals (Largest Contentful Paint, Cumulative Layout Shift, Interaction to Next Paint) actively penalize your organic ranking, literally burying your site in search results behind faster competitors.
                            </p>
                            <p>
                                We approach performance as <span className="text-cyan-400">a core marketing metric</span>. By ruthlessly optimizing your delivery infrastructure, we build digital assets that feel instantaneous, creating an undeniable aura of enterprise-grade credibility.
                            </p>
                        </div>
                    </motion.div>

                    <div className="lg:col-span-5 lg:col-start-8">
                        <div className="grid gap-4 relative">
                            {/* Decorative background blur */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-500/10 blur-[100px] rounded-full z-0 pointer-events-none" />
                            
                            {[
                                { title: "Conversion Assassination", metric: "7% Drop", impact: "In conversions for every SINGLE second of added page load time." },
                                { title: "Mobile Abandonment", metric: "53%", impact: "Of mobile visits are abandoned if a page takes >3 seconds." },
                                { title: "SEO De-indexing", metric: "Drop", impact: "Google actively deranks sites failing Core Web Vitals assessments." }
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
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse border border-cyan-500" />
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-500">{children}</span>
        </div>
    )
}

/* ── THE MODERN ARCHITECTURE (FEATURES) ── */
const STACK_FEATURES = [
    {
        icon: Globe,
        title: 'Global Edge Rendering',
        desc: 'Instead of running on a single server, your site is cached dynamically on Vercel\'s Edge Network globally. A user in Tokyo gets the exact same 30ms TTFB (Time to First Byte) as a user in New York.',
        color: '#06b6d4' // Cyan 500
    },
    {
        icon: Gauge,
        title: 'LCP & CLS Domination',
        desc: 'We ruthlessly optimize Next.js Image components, critical CSS injection, and font loading sequences to ensure your site hits a perfect 100/100 Lighthouse score.',
        color: '#0ea5e9' // Sky 500
    },
    {
        icon: ShieldCheck,
        title: 'Enterprise Security Posture',
        desc: 'Hardened HTTP headers, strict Content Security Policies (CSP), Cross-Site Scripting (XSS) mitigation, and DDoS-resistant static generation logic.',
        color: '#14b8a6' // Teal 500
    },
    {
        icon: BatteryCharging,
        title: 'Payload Deflation',
        desc: 'Aggressive tree-shaking, code-splitting, and dynamic component loading ensures users only download the exact Javascript required for the pixels on their screen.',
        color: '#f59e0b' // Amber
    },
    {
        icon: Hexagon,
        title: 'Database Connection Pooling',
        desc: 'For dynamic applications, we utilize Prisma and Supabase pooling architectures to ensure database requests execute in milliseconds at virtually infinite scale.',
        color: '#ec4899' // Pink
    },
    {
        icon: Lock,
        title: 'Credibility Architecture',
        desc: 'Seamlessly weaving in dynamic trust badges, SSL verifications, instant SOC2 compliances, and native multi-factor authentication flows.',
        color: '#6366f1' // Indigo
    }
]

function TechStack() {
    return (
        <section className="py-24 md:py-36 relative border-b border-white/[0.04]">
            {/* Background */}
            <div className="absolute inset-0 bg-[#040404] z-0" />
            <div className="container mx-auto px-6 lg:px-16 relative z-10">
                <SectionHeading 
                    subtitle="Strategic Capabilities" 
                    title={<>Engineering the <span className="text-zinc-600 italic">halo effect.</span></>}
                    align="center"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {STACK_FEATURES.map((feat, i) => (
                        <div key={i} className="group p-8 rounded-[2rem] bg-[#060606] border border-white/[0.04] hover:border-white/[0.1] hover:bg-[#0a0a0a] transition-all duration-500 overflow-hidden relative">
                            {/* Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-15 transition-opacity duration-700 blur-[50px] pointer-events-none"
                                 style={{ background: feat.color }} />
                            
                            <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center mb-6 text-cyan-400 group-hover:scale-110 transition-transform duration-500">
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
                            Milliseconds translate <br />
                            <span className="text-cyan-400 italic">into millions.</span>
                        </h2>
                        <ul className="space-y-6">
                            {[
                                { m: '100', label: 'Lighthouse Vitals', t: 'Verified by Google\'s strictest performance metric standards.' },
                                { m: '+22%', label: 'Organic Traffic Lift', t: 'Gained purely via SEO algorithm rewards for passing Core Web Vitals.' },
                                { m: '0.1s', label: 'Maximum Interaction to Next Paint', t: 'Creating a feeling of native-app responsiveness inside the browser.' }
                            ].map((s, i) => (
                                <li key={i} className="flex gap-6 items-start">
                                    <div className="w-24 shrink-0 font-display font-black text-3xl text-cyan-400">{s.m}</div>
                                    <div>
                                        <div className="font-bold text-zinc-300 tracking-wide uppercase text-xs mb-1">{s.label}</div>
                                        <div className="text-zinc-500 text-sm">{s.t}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-10 bg-gradient-to-tr from-cyan-500/[0.05] to-teal-500/[0.05] blur-3xl opacity-50" />
                        <div className="relative rounded-[2rem] overflow-hidden border border-white/[0.06] bg-[#050505] shadow-2xl">
                            
                            <div className="px-8 py-6 border-b border-white/[0.04] bg-[#080808] flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Server className="text-cyan-400 w-5 h-5"/>
                                    <span className="font-semibold text-white tracking-wide">Edge Telemetry / Vercel Vitals</span>
                                </div>
                                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-[10px] uppercase tracking-widest font-mono rounded-full border border-cyan-500/20">Production: iad1</span>
                            </div>

                            <div className="p-8">
                                <div className="space-y-6">
                                    {[
                                        { label: 'Time to First Byte (TTFB)', value: '32ms', status: 'Excellent', color: 'text-emerald-400' },
                                        { label: 'First Contentful Paint (FCP)', value: '0.4s', status: 'Excellent', color: 'text-emerald-400' },
                                        { label: 'Largest Contentful Paint (LCP)', value: '0.8s', status: 'Excellent', color: 'text-emerald-400' },
                                        { label: 'Cumulative Layout Shift (CLS)', value: '0.00', status: 'Perfect', color: 'text-emerald-400' },
                                    ].map((stat, i) => (
                                        <div key={i} className="flex justify-between items-end border-b border-white/[0.04] pb-4 last:border-0 last:pb-0">
                                            <div>
                                                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">{stat.label}</div>
                                                <div className="text-2xl font-light text-white tracking-tight">{stat.value}</div>
                                            </div>
                                            <div className={`${stat.color} text-sm font-mono uppercase tracking-widest`}>{stat.status}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/[0.04] flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />
                                    <p className="text-[11px] text-zinc-500 font-mono tracking-widest uppercase">Global CDN Hit Ratio: 99.8%</p>
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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-cyan-500/5 blur-[120px] mix-blend-screen" />
            </div>

            <div className="container mx-auto px-6 lg:px-16 text-center relative z-10 max-w-4xl">
                <SectionLabel>Initialize Deployment</SectionLabel>
                <h2 className="font-display text-5xl md:text-7xl text-white tracking-tight leading-[0.95] mb-8 uppercase font-black">
                    Outperform the <br/>
                    <span className="text-cyan-400 italic">entire industry.</span>
                </h2>
                
                <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                    A fast website is a feature. A 50-millisecond website is an unfair advantage. Let's harden your infrastructure and guarantee a perfect Lighthouse score.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/contact?service=trust-optimization" className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black text-[13px] font-black tracking-[0.1em] uppercase hover:bg-zinc-100 transition-all duration-300">
                        Audit My Infrastructure
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

export default function TrustOptimizationClient() {
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
