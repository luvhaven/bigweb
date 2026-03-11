'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Link from 'next/link'
import {
    ArrowUpRight, ArrowRight, ShieldCheck, Zap, Activity,
    CreditCard, DatabaseZap, Globe, Repeat, Coins, Lock, Sparkles, CheckCircle2, TrendingUp, Key
} from 'lucide-react'
import KineticTypography from '@/components/effects/KineticTypography'
import TrustBadges from '@/components/trust/TrustBadges'

/* ── UI ATOMS ── */
function Badge({ children, pulse = false }: { children: React.ReactNode, pulse?: boolean }) {
    return (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 backdrop-blur-md mb-8">
            {pulse && (
                <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                </span>
            )}
            <span className="text-[10px] font-mono tracking-[0.2em] text-emerald-300 uppercase">
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
                <span className="w-8 h-px bg-emerald-500" />
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-400">
                    {subtitle}
                </span>
                {align === 'center' && <span className="w-8 h-px bg-emerald-500" />}
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
                        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                        alt="Data Dashboard"
                        className="w-full h-full object-cover opacity-30 mix-blend-luminosity"
                        style={{ filter: 'brightness(0.35) contrast(1.3)' }}
                    />
                </div>
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-[#030303]/80 to-transparent z-10" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/[0.04] blur-[150px] rounded-full z-10 mix-blend-screen" />
                <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-500/[0.04] blur-[180px] rounded-full z-10" />
                {/* Grid */}
                <div className="absolute inset-0 z-10 opacity-[0.03]"
                    style={{ backgroundImage: 'linear-gradient(rgba(16,185,129,0.1) 1px, transparent 1px),linear-gradient(90deg, rgba(16,185,129,0.1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
            </motion.div>

            <motion.div style={{ opacity }} className="container mx-auto px-6 lg:px-16 relative z-20">
                <div className="max-w-5xl">
                    <Badge pulse>Core Discipline 02</Badge>
                    
                    <div className="mb-8">
                        <KineticTypography
                            text="Revenue Systems"
                            as="h1"
                            className="text-[clamp(3.5rem,8vw,8rem)] font-display font-black leading-[0.9] tracking-tighter text-white"
                        />
                        <div className="text-[clamp(3.5rem,8vw,8rem)] font-display font-black leading-[0.9] tracking-tighter italic text-emerald-400 opacity-90 drop-shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                            Commerce Core
                        </div>
                    </div>

                    <p className="text-zinc-400 text-lg md:text-xl lg:text-2xl max-w-3xl leading-relaxed font-light mb-12">
                        Don't let clunky billing logic restrict your growth. We engineer invincible payment infrastructures, frictionless checkout flows, and automated recurring billing models that capture every dollar of your demand.
                    </p>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        <Link href="/contact?service=revenue-systems" className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-emerald-500 bg-emerald-500/10 px-10 py-5">
                            <span className="absolute inset-0 bg-emerald-500 transition-transform duration-500 ease-out group-hover:scale-105 opacity-0 group-hover:opacity-100" />
                            <span className="relative z-10 flex items-center gap-3 text-white font-bold text-sm tracking-[0.1em] uppercase group-hover:text-black transition-colors duration-300">
                                Engineer My Revenue Core
                                <ArrowUpRight className="w-4 h-4" />
                            </span>
                        </Link>
                        
                        <div className="flex items-center gap-4 text-zinc-500 text-sm font-mono uppercase tracking-[0.1em] px-4">
                            <div className="flex -space-x-3">
                                {[
                                    'https://images.unsplash.com/photo-1542314831-c6a4d14b8ba2?w=100&h=100&fit=crop',
                                    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=100&h=100&fit=crop'
                                ].map((img, i) => (
                                    <img key={i} src={img} alt="" className="w-10 h-10 rounded-full border-2 border-[#030303] relative z-10 grayscale hover:grayscale-0 transition-all" />
                                ))}
                            </div>
                            <span className="flex flex-col">
                                <span className="text-emerald-400 font-bold tracking-widest leading-tight">$47M+</span>
                                <span className="text-[9px]">Transactions Processed</span>
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
                        <SectionLabel>The Hidden Leak</SectionLabel>
                        <h2 className="font-display text-4xl md:text-5xl text-white tracking-tight leading-[1.05] mb-8">
                            Cart abandonment is a symptom. <br/>
                            <span className="text-zinc-600 italic">Bad architecture is the disease.</span>
                        </h2>
                        
                        <div className="prose prose-invert prose-lg text-zinc-400 font-light leading-relaxed">
                            <p>
                                Slapping a standard Stripe checkout script on a page isn't a revenue strategy. When a user has to enter their billing details on a slow, unbranded, clunky external redirect, trust breaks down instantly.
                            </p>
                            <p>
                                <strong className="text-white font-medium">It gets worse.</strong> What happens when credit cards fail? How do you handle complex proration, seat-based SaaS billing, or dynamic localized tax collection across 50 countries? If your system requires manual intervention, you're bleeding MRR.
                            </p>
                            <p>
                                We engineer <span className="text-emerald-400">bulletproof commerce logic</span>. No drop-offs, no churn due to payment failures, no compliance nightmares. Pure, automated revenue capturing.
                            </p>
                        </div>
                    </motion.div>

                    <div className="lg:col-span-5 lg:col-start-8">
                        <div className="grid gap-4 relative">
                            {/* Decorative background blur */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-red-500/10 blur-[100px] rounded-full z-0 pointer-events-none" />
                            
                            {[
                                { title: "Involuntary Churn", metric: "30%", impact: "Of SaaS churn is due to failed card payments." },
                                { title: "Checkout Fragmentation", metric: "68%", impact: "Of users abandon clunky, multi-step carts." },
                                { title: "Technical Debt", metric: "Months", impact: "Wasted reconciling bad data into ERPs." }
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
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse border border-emerald-500" />
            <span className="text-[10px] font-mono uppercase tracking-[0.35em] text-zinc-500">{children}</span>
        </div>
    )
}

/* ── THE MODERN ARCHITECTURE (FEATURES) ── */
const STACK_FEATURES = [
    {
        icon: CreditCard,
        title: 'Custom Stripe Integration',
        desc: 'We bypass standard checkout blocks and engineer branded, localized, zero-friction payment elements via Stripe Elements and custom APIs.',
        color: '#10b981'
    },
    {
        icon: Repeat,
        title: 'Complex Recurring Billing',
        desc: 'Usage-based metering, tiered SaaS models, seat limits, and complex proration handled gracefully without edge-case crashes.',
        color: '#6366f1'
    },
    {
        icon: Coins,
        title: 'Global Tax Compliance',
        desc: 'Automated VAT/Sales Tax calculations worldwide. Never worry about nexus laws or foreign tax thresholds when scaling globally.',
        color: '#f59e0b'
    },
    {
        icon: Activity,
        title: 'Dunning & Recovery Automation',
        desc: 'Smart card retry logic and automated email sequences that recover up to 45% of failed payments before tracking them as churn.',
        color: '#0ea5e9'
    },
    {
        icon: Key,
        title: 'SSO & Role Based Access',
        desc: 'Enterprise-grade authentication layers (SAML, OAuth) mapped tightly to your subscription entitlements and gating logic.',
        color: '#d4a853'
    },
    {
        icon: DatabaseZap,
        title: 'ERP & CRM Symphonies',
        desc: 'Real-time webhooks pushing pristine transaction data directly into Salesforce, NetSuite, or Postgres with zero reconciliation required.',
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
                    subtitle="Strategic Capabilities" 
                    title={<>The architecture of <span className="text-zinc-600 italic">infinite scale.</span></>}
                    align="center"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {STACK_FEATURES.map((feat, i) => (
                        <div key={i} className="group p-8 rounded-[2rem] bg-[#060606] border border-white/[0.04] hover:border-white/[0.1] hover:bg-[#0a0a0a] transition-all duration-500 overflow-hidden relative">
                            {/* Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-15 transition-opacity duration-700 blur-[50px] pointer-events-none"
                                 style={{ background: feat.color }} />
                            
                            <div className="w-12 h-12 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-500 text-emerald-400">
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
                            Frictionless logic <br />
                            <span className="text-emerald-400 italic">captures trapped revenue.</span>
                        </h2>
                        <ul className="space-y-6">
                            {[
                                { m: '+22%', label: 'Checkout Completion Lift', t: 'By engineering 1-click Apple Pay/G-Pay directly into hero streams.' },
                                { m: '-45%', label: 'Involuntary Churn', t: 'Due to custom Dunning mechanics and direct issuer retries.' },
                                { m: '100%', label: 'Data Integrity', t: 'Zero sync errors between payment gateway and actual database.' }
                            ].map((s, i) => (
                                <li key={i} className="flex gap-6 items-start">
                                    <div className="w-24 shrink-0 font-display font-black text-3xl text-emerald-400">{s.m}</div>
                                    <div>
                                        <div className="font-bold text-zinc-300 tracking-wide uppercase text-xs mb-1">{s.label}</div>
                                        <div className="text-zinc-500 text-sm">{s.t}</div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="relative">
                        <div className="absolute -inset-10 bg-gradient-to-tr from-emerald-500/[0.05] to-indigo-500/[0.05] blur-3xl opacity-50" />
                        <div className="relative rounded-[2rem] overflow-hidden border border-white/[0.06] bg-[#050505] shadow-2xl">
                            
                            <div className="px-8 py-6 border-b border-white/[0.04] bg-[#080808] flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <TrendingUp className="text-emerald-400 w-5 h-5"/>
                                    <span className="font-semibold text-white tracking-wide">MRR Velocity Metrics</span>
                                </div>
                                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] uppercase tracking-widest font-mono rounded-full border border-emerald-500/20">Live Sync</span>
                            </div>

                            <div className="p-8">
                                <div className="space-y-6">
                                    {[
                                        { l: 'Gross Revenue (30d)', v: '$942,500.00', p: '+14.2%' },
                                        { l: 'Failed Payments', v: '0.4%', p: '-89.0%' },
                                        { l: 'Avg Revenue Per User', v: '$412.50', p: '+8.4%' }
                                    ].map((sc, i) => (
                                        <div key={i} className="flex justify-between items-end border-b border-white/[0.04] pb-4 last:border-0 last:pb-0">
                                            <div>
                                                <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">{sc.l}</div>
                                                <div className="text-2xl font-light text-white tracking-tight">{sc.v}</div>
                                            </div>
                                            <div className="text-emerald-400 text-sm font-mono">{sc.p}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-8 pt-6 border-t border-white/[0.04] flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <p className="text-[11px] text-zinc-500 font-mono tracking-widest uppercase">Webhook Latency: &lt;14ms</p>
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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-emerald-500/5 blur-[120px] mix-blend-screen" />
            </div>

            <div className="container mx-auto px-6 lg:px-16 text-center relative z-10 max-w-4xl">
                <SectionLabel>Connect Your Systems</SectionLabel>
                <h2 className="font-display text-5xl md:text-7xl text-white tracking-tight leading-[0.95] mb-8 uppercase font-black">
                    Scale without <br/>
                    <span className="text-emerald-400 italic">technical friction.</span>
                </h2>
                
                <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
                    Let's audit your current payment flows and architect a bespoke commerce backend designed strictly for maximum conversion and zero churn.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link href="/contact?service=revenue-systems" className="group inline-flex items-center gap-3 px-10 py-5 rounded-full bg-white text-black text-[13px] font-black tracking-[0.1em] uppercase hover:bg-zinc-100 transition-all duration-300">
                        Map My Revenue Core
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

export default function RevenueSystemsClient() {
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
