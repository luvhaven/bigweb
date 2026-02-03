'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldAlert, Fingerprint, SearchX, Clock, ArrowRight, Eye, AlertTriangle, CheckCircle2, Search, Activity, Lock, Target, FlaskConical, Zap, GitBranch, Binary, Globe } from 'lucide-react'


import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { PhysicsReveal } from '@/components/ui/PhysicsReveal'

const problems = [
    {
        id: 'traffic',
        icon: SearchX,
        title: "Traffic That Doesn't Convert",
        description: "You're spending money on ads and SEO, but visitors leave without buying. Every visitor who bounces is money wasted.",
        leakType: 'High Bounce Rate',
        severity: 'Critical'
    },
    {
        id: 'design',
        icon: Fingerprint,
        title: "Pretty But Not Profitable",
        description: "Your website looks great but doesn't guide visitors to take action. Beautiful design means nothing without conversions.",
        leakType: 'Poor User Flow',
        severity: 'High'
    },
    {
        id: 'messaging',
        icon: ShieldAlert,
        title: "Confusing Message",
        description: "Visitors can't figure out what you do or why they should care. If they're confused, they won't buy.",
        leakType: 'Unclear Value',
        severity: 'Critical'
    },
    {
        id: 'speed',
        icon: Clock,
        title: "Slow Loading Times",
        description: "Your website takes too long to load. Every extra second costs you customers and hurts your Google rankings.",
        leakType: 'Performance Issues',
        severity: 'High'
    }
]

export default function ProblemSolution() {
    const [scannedProblem, setScannedProblem] = useState<string | null>(null)
    const [isScanning, setIsScanning] = useState(false)

    const handleScan = (id: string) => {
        setIsScanning(true)
        setScannedProblem(null)
        setTimeout(() => {
            setScannedProblem(id)
            setIsScanning(false)
        }, 800)
    }

    return (
        <section className="py-24 bg-black relative overflow-hidden selection:bg-orange-500/30">
            {/* Grid background for "Lab" feel */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[size:40px_40px]" />
            <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-orange-500/5 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="max-w-4xl mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 px-6 py-2 bg-zinc-950 border border-zinc-900 mb-8"
                    >
                        <AlertTriangle className="w-4 h-4 text-orange-600" />
                        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.3em] text-orange-600">Common_Vector_Failures_v1</span>
                    </motion.div>

                    <h2 className="text-6xl md:text-[9rem] font-black mb-10 tracking-tighter-extreme uppercase italic leading-[0.85] text-white">
                        Is Your Site <br /><span className="text-zinc-800">Bleeding?</span>
                    </h2>

                    <p className="text-2xl md:text-5xl text-zinc-500 font-medium leading-none tracking-tighter-extreme max-w-4xl">
                        Your platform should be a <span className="text-white italic">Strategic_Asset</span>. If it's not, we'll find the point of failure.
                    </p>
                </div>

                {/* Conversion Audit Widget */}
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
                    {/* Left: Interactive Scan Targets */}
                    <div className="lg:col-span-5 space-y-4">
                        {problems.map((prob) => (
                            <button
                                key={prob.id}
                                onClick={() => handleScan(prob.id)}
                                className={`w-full text-left p-6 md:p-8 border-l-4 transition-all duration-300 group relative overflow-hidden flex items-start gap-6 ${scannedProblem === prob.id
                                    ? 'bg-zinc-900/50 border-orange-600'
                                    : 'bg-black border-zinc-900 hover:bg-zinc-950'
                                    }`}
                            >
                                <div className={`mt-1 transition-all duration-300 ${scannedProblem === prob.id ? 'text-orange-600 scale-110' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
                                    <prob.icon className="w-6 h-6" />
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="flex items-center gap-2">
                                            {scannedProblem === prob.id && <span className="text-[10px] font-mono font-bold text-orange-600 uppercase tracking-wider">DETECTED:</span>}
                                            <h3 className={`text-lg font-bold uppercase tracking-wider transition-colors ${scannedProblem === prob.id ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                                                {prob.title}
                                            </h3>
                                        </div>
                                    </div>
                                    <p className={`text-sm font-mono leading-relaxed transition-colors duration-300 ${scannedProblem === prob.id ? 'text-zinc-400' : 'text-zinc-700'}`}>
                                        {prob.description}
                                    </p>
                                </div>

                                <div className={`transition-all duration-300 ${scannedProblem === prob.id ? 'opacity-100 translate-x-0 text-orange-600' : 'opacity-0 -translate-x-4'}`}>
                                    <ArrowRight className="w-5 h-5" />
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Right: The Forensic Monitor */}
                    <div className="lg:col-span-7 sticky top-32">
                        <div className="relative aspect-square md:aspect-video lg:aspect-[16/10] bg-zinc-950 border border-zinc-900 shadow-2xl group/monitor flex flex-col">
                            {/* Terminal Scanline Effect */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none" />

                            {/* Scanning Animation */}
                            <AnimatePresence>
                                {isScanning && (
                                    <motion.div
                                        initial={{ top: '-10%' }}
                                        animate={{ top: '110%' }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1.2, ease: "linear" }}
                                        className="absolute left-0 right-0 h-[100px] bg-gradient-to-b from-transparent via-orange-600/20 to-transparent z-30 pointer-events-none"
                                    />
                                )}
                            </AnimatePresence>

                            {/* Monitor UI */}
                            <div className="relative z-10 p-8 md:p-12 flex flex-col h-full font-mono">
                                <div className="flex items-center justify-between mb-8 border-b border-zinc-900 pb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-2.5 h-2.5 bg-orange-600 animate-pulse" />
                                        <span className="font-bold text-[9px] text-zinc-600 uppercase tracking-[0.5em]">Conversion_Audit_System_v1.0</span>
                                    </div>
                                    <div className="flex gap-1.5">
                                        {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 bg-zinc-900 border border-zinc-800" />)}
                                    </div>
                                </div>

                                <div className="flex-1 flex items-center justify-center relative">
                                    {!scannedProblem && !isScanning && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="text-center"
                                        >
                                            <div className="w-24 h-24 border border-zinc-900 flex items-center justify-center mx-auto mb-8 relative">
                                                <div className="absolute inset-0 border border-orange-600/10 animate-ping" />
                                                <Search className="w-10 h-10 text-zinc-800" />
                                            </div>
                                            <p className="text-zinc-600 font-bold uppercase text-[10px] tracking-[0.4em] leading-loose">
                                                Awaiting Manual Input <br />
                                                <span className="text-zinc-800">Select Vulnerability Node</span>
                                            </p>
                                        </motion.div>
                                    )}

                                    {/* Analysis Output Container */}
                                    <AnimatePresence mode="wait">
                                        {scannedProblem && !isScanning && (
                                            <motion.div
                                                key={scannedProblem}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                className="w-full h-full flex flex-col justify-center gap-8"
                                            >
                                                {/* Results Header */}
                                                <div className="flex items-start justify-between">
                                                    <div className="space-y-4">
                                                        <div className="text-[9px] font-bold text-orange-600 uppercase tracking-widest">Audit_MetaData</div>
                                                        <h4 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter-extreme leading-none">
                                                            {problems.find(p => p.id === scannedProblem)?.leakType} <br />
                                                            <span className="text-zinc-800 font-bold not-italic">DETECTED_</span>
                                                        </h4>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Impact_Level</div>
                                                        <div className="px-4 py-2 bg-red-950/20 border border-red-900/50 text-red-600 text-[10px] font-bold uppercase tracking-widest">
                                                            {problems.find(p => p.id === scannedProblem)?.severity}
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Logic Description Box */}
                                                <div className="p-8 bg-black border border-zinc-900 relative group overflow-hidden">
                                                    <div className="absolute top-0 right-0 p-8 opacity-[0.02]">
                                                        <Fingerprint className="w-32 h-32" />
                                                    </div>
                                                    <div className="relative z-10">
                                                        <div className="flex items-center gap-2 mb-4">
                                                            <Binary className="w-4 h-4 text-orange-600" />
                                                            <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-[0.3em]">Root_Cause_Log</span>
                                                        </div>
                                                        <p className="text-sm text-zinc-400 font-medium leading-relaxed font-sans">
                                                            "{problems.find(p => p.id === scannedProblem)?.description}"
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Action Button */}
                                                <div className="pt-4">
                                                    <Link href="/offers/revenue-roadmap">
                                                        <Button className="h-14 px-8 rounded-none bg-white text-black font-bold uppercase tracking-[0.2em] text-[10px] hover:bg-orange-600 hover:text-white transition-all flex items-center gap-4">
                                                            INITIALIZE_CLINICAL_BATTLE_PLAN
                                                            <ArrowRight className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Footer Telemetry */}
                                <div className="mt-8 pt-6 border-t border-zinc-900 flex justify-between items-center text-[9px] font-bold text-zinc-700 tracking-[0.2em] uppercase">
                                    <div className="flex items-center gap-6">
                                        <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-emerald-500" /> NODE_STABLE</span>
                                        <span className={`flex items-center gap-1.5 transition-colors duration-500 ${scannedProblem ? 'text-orange-600' : ''}`}><div className={`w-1.5 h-1.5 transition-all ${scannedProblem ? 'bg-orange-600 animate-pulse' : 'bg-zinc-900'}`} /> VULNERABILITY_FIXED</span>
                                    </div>
                                    <div className="hidden md:block">Logic_Exception_Capture: ACTIVE // Thread: 0x4f</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Solution Strategy */}
                <div className="grid lg:grid-cols-2 gap-20 items-center">
                    <div className="order-2 lg:order-1 relative group">
                        <PhysicsReveal
                            className="w-full"
                            revealSize={350}
                            dampening={35}
                            cover={
                                <div className="relative bg-black border border-zinc-900 p-16 shadow-2xl overflow-hidden">
                                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
                                    <div className="relative z-10 space-y-12">
                                        {[
                                            { label: 'Conversion_Velocity_Delta', start: '12%', end: '84%', color: 'from-orange-600 to-orange-400' },
                                            { label: 'Logic_Integrity_Score', start: '45%', end: '96%', color: 'from-zinc-400 to-white' },
                                            { label: 'Capital_Session_Yield', start: '+$1.20', end: '+$6.40', color: 'from-orange-800 to-orange-600' }
                                        ].map((stat, i) => (
                                            <div key={i} className="space-y-4">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-[0.5em]">{stat.label}</span>
                                                    <span className="text-3xl font-black text-white italic tracking-tighter">{stat.end}</span>
                                                </div>
                                                <div className="h-1 bg-zinc-900 w-full">
                                                    <motion.div
                                                        initial={{ width: stat.start }}
                                                        whileInView={{ width: stat.end }}
                                                        transition={{ duration: 2.5, delay: i * 0.3, ease: [0.22, 1, 0.36, 1] }}
                                                        className={`h-full bg-gradient-to-r ${stat.color}`}
                                                    />
                                                </div>
                                            </div>
                                        ))}

                                        <div className="mt-12 p-10 bg-zinc-950 border border-zinc-900 text-center relative group/lift overflow-hidden">
                                            <div className="absolute inset-0 bg-white/[0.02] translate-y-full group-hover/lift:translate-y-0 transition-transform duration-700" />
                                            <p className="text-[9px] text-orange-600 font-bold uppercase tracking-[0.5em] mb-4 relative z-10">Realized Performance Outcome</p>
                                            <p className="text-4xl md:text-5xl font-black text-white italic tracking-tighter relative z-10">+312% <span className="text-lg text-zinc-500 font-bold ml-2 uppercase tracking-widest not-italic">LIFT_FACTOR</span></p>
                                        </div>
                                    </div>
                                </div>
                            }
                        >
                            {/* REVEALED CONTENT (Deep Clinical View) */}
                            <div className="relative bg-black border border-orange-500/30 p-16 shadow-2xl relative overflow-hidden">
                                <div className="absolute inset-0 bg-orange-600/5 mix-blend-overlay" />
                                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.1] bg-[size:10px_10px]" />
                                <div className="relative z-10 space-y-12">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Activity className="w-5 h-5 text-orange-600 animate-pulse" />
                                        <span className="text-orange-500 font-bold text-xs font-mono uppercase tracking-[0.4em]">DEEP_SYSTEM_ANALYSIS_MOD_v4.2</span>
                                    </div>

                                    <div className="p-8 border border-zinc-800 bg-black/40 backdrop-blur-sm relative overflow-hidden">
                                        <div className="absolute top-2 right-2 text-[8px] text-zinc-800 rotate-90">ENCRYPTED</div>
                                        <div className="font-mono text-[10px] space-y-2 text-orange-600/60 break-all leading-none opacity-40">
                                            {['a3f5e8b2c9d1f4e7a6b8c2d5e9f1a4b7c3d6e8f2a5b9', 'c7d2e5f8a1b4c6d9e2f5a8b1c4d7e0f3a6b9c2d5e8f1', 'e9f2a5b8c1d4e7f0a3b6c9d2e5f8a1b4c7d0e3f6a9b2', 'f1a4b7c0d3e6f9a2b5c8d1e4f7a0b3c6d9e2f5a8b1c4', 'b5c8d1e4f7a0b3c6d9e2f5a8b1c4d7e0f3a6b9c2d5e8', 'd3e6f9a2b5c8d1e4f7a0b3c6d9e2f5a8b1c4d7e0f3a6', 'f7a0b3c6d9e2f5a8b1c4d7e0f3a6b9c2d5e8f1a4b7c0', 'a9b2c5d8e1f4a7b0c3d6e9f2a5b8c1d4e7f0a3b6c9d2'].map((hex, i) => (
                                                <div key={i}>{hex}</div>
                                            ))}
                                        </div>
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="text-5xl font-black text-white italic mb-2">99.9%</div>
                                                <div className="text-[9px] text-zinc-500 font-bold uppercase tracking-widest">LOGIC_FIDELITY_CONFIRMED</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 border border-zinc-900 bg-zinc-950">
                                            <div className="text-[8px] text-zinc-600 mb-1">DATA_PACKETS</div>
                                            <div className="text-xl font-black text-white italic">1.2M/sec</div>
                                        </div>
                                        <div className="p-4 border border-zinc-900 bg-zinc-950">
                                            <div className="text-[8px] text-zinc-600 mb-1">LATENCY_DELTA</div>
                                            <div className="text-xl font-black text-white italic">-42ms</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </PhysicsReveal>
                    </div>

                    <div className="order-1 lg:order-2 space-y-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-3 px-6 py-2 bg-zinc-950 border border-zinc-900 text-orange-600 text-[10px] font-bold uppercase tracking-[0.4em] mb-4"
                        >
                            <FlaskConical className="w-4 h-4" /> The_Conversion_Lab_Proprietary
                        </motion.div>

                        <h2 className="text-5xl md:text-[6.5rem] font-black leading-[0.85] tracking-tighter-extreme uppercase italic text-white">
                            Absolute <br /><span className="text-zinc-800">Engineering.</span>
                        </h2>

                        <p className="text-xl md:text-2xl text-zinc-500 font-medium leading-[1.1] tracking-tighter-extreme max-w-2xl">
                            Treating your digital environment as a <span className="text-white italic underline underline-offset-8 decoration-zinc-800">Strategic_Asset</span>. Deployed for measurable capital extraction.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 py-10 border-y border-zinc-900">
                            {[
                                { title: 'PHASE_01', desc: 'Clinical Audit.', icon: Activity },
                                { title: 'PHASE_02', desc: 'Visual Flow.', icon: Fingerprint },
                                { title: 'PHASE_03', desc: 'System Build.', icon: Zap },
                                { title: 'PHASE_04', desc: 'Live Monitoring.', icon: ShieldAlert }
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 group/item">
                                    <div className="w-10 h-10 shrink-0 bg-black border border-zinc-900 flex items-center justify-center group-hover/item:border-orange-600 transition-all duration-500">
                                        <item.icon className="w-4 h-4 text-zinc-700 group-hover/item:text-orange-600 transition-colors" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-mono font-bold text-zinc-600 uppercase text-[9px] tracking-widest group-hover/item:text-orange-600 transition-colors">{item.title}</h4>
                                        <p className="text-lg font-black text-white uppercase italic tracking-tight">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8">
                            <Link href="/offers/revenue-roadmap">
                                <Button size="xl" className="h-20 px-12 rounded-none bg-white text-black hover:bg-orange-600 hover:text-white font-black text-xs uppercase tracking-[0.4em] shadow-2xl transition-all group border border-transparent hover:border-orange-600">
                                    <span className="flex items-center gap-6">
                                        INITIALIZE_ROADMAP
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-4 transition-transform" />
                                    </span>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
