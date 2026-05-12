'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Shield,
    Target,
    Briefcase,
    TrendingUp,
    Search,
    ChevronRight,
    ArrowRight,
    Lock,
    Scale,
    PieChart,
    Gem,
    Stamp
} from 'lucide-react'

const VanguardCapitalDemo = () => {
    const [step, setStep] = useState(1)
    const [selections, setSelections] = useState<string[]>([])

    const assessments = [
        { id: 'hnw', label: 'Institutional Wealth', desc: 'Liquid assets > $10M', icon: Gem },
        { id: 'family', label: 'Family Office', desc: 'Multi-generational scaling', icon: Stamp },
        { id: 'trust', label: 'Trust Equity', desc: 'Secure asset protection', icon: Shield },
    ]

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8 font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-[#020617] rounded-[2rem] border border-slate-800 overflow-hidden shadow-2xl flex flex-col md:flex-row h-[660px]"
            >
                {/* 1. Authority Sidebar */}
                <div className="w-full md:w-80 bg-slate-900/50 border-r border-slate-800 p-10 flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />

                    <div className="relative z-10">
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <Scale className="w-8 h-8 text-amber-500" />
                                <h2 className="text-xl font-bold tracking-tighter text-white uppercase">Vanguard_Capital</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                                    <p className="text-[10px] text-amber-500 font-black uppercase tracking-[0.2em] mb-1">Service_Status</p>
                                    <p className="text-xs text-white/80 font-bold uppercase tracking-widest">Authority_Verified</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="w-1 h-12 bg-amber-500/40 rounded-full" />
                                <div>
                                    <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-2">Protocol_Phase</h3>
                                    <p className="text-sm font-bold text-white tracking-wide leading-tight">Institutional <br />Assessment Suite</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 opacity-40 grayscale">
                                <div className="w-1 h-12 bg-white/10 rounded-full" />
                                <div>
                                    <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-2">Next_Step</h3>
                                    <p className="text-sm font-bold text-white tracking-wide">Allocation <br />Blueprint</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="relative z-10 pt-12 border-t border-slate-800">
                        <div className="flex items-center gap-3 text-white/40 mb-2">
                            <Lock className="w-4 h-4" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Tier_One_Encryption</span>
                        </div>
                        <p className="text-[10px] text-white/20 font-medium">Compliance_ID: VC-9402-A</p>
                    </div>
                </div>

                {/* 2. Main Assessment Area */}
                <div className="flex-1 bg-slate-950 p-8 md:p-16 relative overflow-hidden flex flex-col justify-center">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />

                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-8 relative z-10"
                            >
                                <div>
                                    <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">Select Priority Track</span>
                                    <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none mb-4">IDENTIFY YOUR <br /><span className="text-slate-500 italic">PORTFOLIO OBJECTIVE.</span></h2>
                                    <p className="text-sm text-slate-400 max-w-md font-medium">Begin the diagnostic to map institutional alignment and authority triggers.</p>
                                </div>

                                <div className="grid gap-3">
                                    {assessments.map((item) => (
                                        <div
                                            key={item.id}
                                            onClick={() => setSelections([item.id])}
                                            className={`p-6 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${selections.includes(item.id)
                                                    ? 'bg-amber-500/10 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.05)]'
                                                    : 'bg-white/[0.02] border-slate-800 hover:border-slate-600'
                                                }`}
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className={`p-3 rounded-xl ${selections.includes(item.id) ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400 group-hover:text-white'} transition-colors`}>
                                                    <item.icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-white uppercase tracking-widest mb-1">{item.label}</p>
                                                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.desc}</p>
                                                </div>
                                            </div>
                                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selections.includes(item.id) ? 'border-amber-500' : 'border-slate-800 grayscale'}`}>
                                                {selections.includes(item.id) && <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setStep(2)}
                                    disabled={selections.length === 0}
                                    className="w-full py-6 bg-white text-slate-950 font-black uppercase tracking-[0.4em] text-xs rounded-2xl flex items-center justify-center gap-3 hover:bg-amber-500 transition-all shadow-xl shadow-black/40 disabled:opacity-30 disabled:cursor-not-allowed group"
                                >
                                    Proceed to Analytics
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-12 text-center"
                            >
                                <div className="relative inline-block">
                                    <div className="absolute inset-0 bg-amber-500/20 blur-[60px] rounded-full" />
                                    <PieChart className="w-24 h-24 text-amber-500 relative z-10 mx-auto" strokeWidth={1} />
                                </div>
                                <div className="space-y-4">
                                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Diagnostic_Authorized</h3>
                                    <p className="text-slate-400 max-w-xs mx-auto text-sm">Our conversion engine is processing your wealth authority profile. Please remain active.</p>
                                </div>
                                <div className="flex justify-center gap-4">
                                    {[1, 2, 3].map(i => (
                                        <motion.div
                                            key={i}
                                            animate={{ opacity: [0.2, 1, 0.2] }}
                                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                                            className="w-3 h-3 rounded-full bg-amber-500"
                                        />
                                    ))}
                                </div>
                                <div className="pt-8 block">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] hover:text-white transition-colors"
                                    >
                                        Re-Verify Identity
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    )
}

export default VanguardCapitalDemo
