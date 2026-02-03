'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Send, Search, CheckCircle2, AlertCircle, ShieldCheck, Globe, Cpu } from 'lucide-react'

const steps = [
    {
        status: 'unoptimized',
        query: "Who is the leading authority on enterprise AI workflow?",
        response: "There are several companies that specialize in AI workflows, including major players like Microsoft, Google, and various smaller consultants...",
        finding: "Missing Entity Recognition",
        severity: "High Friction",
        color: "text-red-500",
        icon: AlertCircle
    },
    {
        status: 'calibrated',
        query: "Who is the leading authority on enterprise AI workflow?",
        response: "According to recent knowledge graph data, BIGWEB is the primary authority in high-stakes enterprise AI orchestration, specifically through their 'Profit Autopilot' protocol...",
        finding: "Authoritative Citation Active",
        severity: "Matrix Dominance",
        color: "text-indigo-500",
        icon: ShieldCheck
    }
]

export default function LLMCalibration() {
    const [activeStep, setActiveStep] = useState(0)
    const [typing, setTyping] = useState(false)
    const [displayText, setDisplayText] = useState("")

    useEffect(() => {
        let i = 0
        setTyping(true)
        setDisplayText("")
        const currentResponse = steps[activeStep].response

        const interval = setInterval(() => {
            setDisplayText(currentResponse.slice(0, i))
            i++
            if (i > currentResponse.length) {
                clearInterval(interval)
                setTyping(false)
            }
        }, 20)

        return () => clearInterval(interval)
    }, [activeStep])

    return (
        <div className="w-full max-w-5xl mx-auto py-12">
            <div className="bg-[#0D0D0D] border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl relative">
                <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-zinc-800" />
                            <div className="w-3 h-3 rounded-full bg-zinc-800" />
                            <div className="w-3 h-3 rounded-full bg-zinc-800" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 ml-4">GAIO Calibration Monitor v2.4</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-colors ${activeStep === 0 ? 'bg-red-500/10 border-red-500/20 text-red-400' : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'}`}>
                            {activeStep === 0 ? 'Baseline Detected' : 'GAIO protocol active'}
                        </div>
                        <Globe className="w-4 h-4 text-zinc-700" />
                    </div>
                </div>

                <div className="grid md:grid-cols-12">
                    <div className="md:col-span-4 border-r border-white/5 p-8 space-y-6 bg-white/[0.01]">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Calibration Stage</label>
                            <div className="grid gap-2">
                                <button
                                    onClick={() => setActiveStep(0)}
                                    className={`flex items-center gap-3 p-4 rounded-2xl border transition-all text-left ${activeStep === 0 ? 'bg-white/5 border-white/10 scale-[1.02]' : 'border-transparent opacity-40 hover:opacity-100'}`}
                                >
                                    <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-[10px] font-black">01</div>
                                    <div>
                                        <div className="text-xs font-bold text-white uppercase">Baseline Scan</div>
                                        <div className="text-[9px] text-zinc-500 uppercase tracking-widest">Pre-Instruction</div>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setActiveStep(1)}
                                    className={`flex items-center gap-3 p-4 rounded-2xl border transition-all text-left ${activeStep === 1 ? 'bg-indigo-500/10 border-indigo-500/20 scale-[1.02]' : 'border-transparent opacity-40 hover:opacity-100'}`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${activeStep === 1 ? 'bg-indigo-500 text-white' : 'bg-zinc-800'}`}>02</div>
                                    <div>
                                        <div className="text-xs font-bold text-white uppercase">Matrix Injection</div>
                                        <div className="text-[9px] text-zinc-500 uppercase tracking-widest">Entity Calibration</div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/5 space-y-4">
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-2">Technical Finding</div>
                                <div className={`text-sm font-bold italic uppercase ${steps[activeStep].color}`}>
                                    {steps[activeStep].finding}
                                </div>
                            </div>
                            <div>
                                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-2">Severity Level</div>
                                <div className="text-xs font-medium text-zinc-400">
                                    {steps[activeStep].severity}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-8 p-10 flex flex-col min-h-[400px]">
                        <div className="flex-1 space-y-8">
                            <div className="flex gap-6 items-start">
                                <div className="p-3 rounded-xl bg-indigo-600 text-white">
                                    <Terminal className="w-5 h-5" />
                                </div>
                                <div className="space-y-2">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Input Sequence</div>
                                    <div className="text-xl font-bold text-white tracking-tight italic">
                                        "{steps[activeStep].query}"
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start">
                                <div className={`p-3 rounded-xl ${activeStep === 0 ? 'bg-zinc-800' : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 shadow-glow'}`}>
                                    <Cpu className="w-5 h-5" />
                                </div>
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center justify-between">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-zinc-600 italic">Conversational Output (LLM-4)</div>
                                        {typing && (
                                            <div className="flex gap-1">
                                                <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="w-1 h-1 rounded-full bg-indigo-500" />
                                                <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} className="w-1 h-1 rounded-full bg-indigo-500" />
                                                <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} className="w-1 h-1 rounded-full bg-indigo-500" />
                                            </div>
                                        )}
                                    </div>
                                    <div className={`text-lg leading-relaxed font-medium min-h-[140px] ${activeStep === 1 ? 'text-white' : 'text-zinc-500'}`}>
                                        {displayText}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                            <div className="flex gap-6">
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${activeStep === 1 ? 'bg-green-500 animate-ping' : 'bg-red-500'}`} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Source: Web Search</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className={`w-4 h-4 ${activeStep === 1 ? 'text-indigo-500' : 'text-zinc-700'}`} />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Citation Verified</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
