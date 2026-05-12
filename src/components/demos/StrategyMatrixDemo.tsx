'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Brain,
    Sparkles,
    Shield,
    Target,
    Activity,
    LineChart,
    Layers,
    Cpu,
    Zap,
    ArrowRight,
    RefreshCw,
    Network,
    Scale,
    Binary,
    Search,
    Globe
} from 'lucide-react'

const StrategyMatrixDemo = () => {
    const [activeNode, setActiveNode] = useState(0)
    const [isCalculating, setIsCalculating] = useState(false)

    const nodes = [
        { id: 0, label: 'Market_Forecasting', icon: LineChart, value: '+42%', color: 'text-cyan-400' },
        { id: 1, label: 'Neural_Efficiency', icon: Cpu, value: '98.8%', color: 'text-cyan-400' },
        { id: 2, label: 'Capital_Optimization', icon: Scale, value: '$-120k', color: 'text-emerald-400' },
        { id: 3, label: 'Revenue_Extraction', icon: Target, value: 'Active', color: 'text-purple-400' }
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            if (!isCalculating) {
                setActiveNode(prev => (prev + 1) % nodes.length)
            }
        }, 3000)
        return () => clearInterval(interval)
    }, [isCalculating])

    const runSimulation = () => {
        setIsCalculating(true)
        setTimeout(() => setIsCalculating(false), 2000)
    }

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8 font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-[#020202] rounded-[3rem] border border-white/[0.08] overflow-hidden shadow-[0_0_100px_rgba(34,211,238,0.1)] h-[600px] flex flex-col"
            >
                {/* Header */}
                <div className="p-8 border-b border-white/[0.05] flex items-center justify-between relative z-10 backdrop-blur-md bg-black/40">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                            <Brain className="w-7 h-7 text-cyan-400" />
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-white uppercase tracking-[0.4em]">Strategy_Matrix_v1</h2>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Cognitive_Architecture</span>
                                <span className="w-2 h-[1px] bg-white/20" />
                                <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Consultancy_Active</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Visualization */}
                <div className="flex-1 relative overflow-hidden flex">
                    {/* Left: Interactive Matrix */}
                    <div className="w-1/2 p-12 relative flex flex-col justify-center gap-6 border-r border-white/[0.05]">
                        {nodes.map((node, i) => (
                            <motion.div
                                key={node.id}
                                className={`p-6 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${activeNode === i
                                        ? 'bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_30px_rgba(34,211,238,0.1)]'
                                        : 'bg-white/[0.02] border-white/5 hover:bg-white/[0.05]'
                                    }`}
                                onMouseEnter={() => setActiveNode(i)}
                            >
                                <div className={`p-3 rounded-xl bg-black/40 ${activeNode === i ? 'text-cyan-400' : 'text-white/20'}`}>
                                    <node.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-[10px] text-white/40 font-black uppercase tracking-widest mb-1">{node.label}</div>
                                    <div className={`text-xl font-black italic tracking-tighter ${activeNode === i ? 'text-white' : 'text-white/40'}`}>{node.value}</div>
                                </div>
                                <div className="w-1 h-8 rounded-full bg-white/5 overflow-hidden">
                                    {activeNode === i && <motion.div initial={{ height: 0 }} animate={{ height: '100%' }} transition={{ duration: 3 }} className="w-full bg-cyan-500 shadow-[0_0_10px_#22d3ee]" />}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Right: Neural Output */}
                    <div className="w-1/2 relative bg-black/40 overflow-hidden flex flex-col justify-center items-center text-center p-12">
                        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeNode}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                className="relative z-10"
                            >
                                <div className="w-48 h-48 rounded-full border border-cyan-500/20 mb-12 flex items-center justify-center relative">
                                    <div className="absolute inset-0 rounded-full border border-cyan-500/5 animate-ping" />
                                    <motion.div
                                        animate={isCalculating ? { rotate: 360 } : {}}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                        className="w-32 h-32 rounded-full border-t-2 border-cyan-500 shadow-[0_0_40px_rgba(34,211,238,0.2)] flex items-center justify-center"
                                    >
                                        <Sparkles className="w-12 h-12 text-cyan-400" />
                                    </motion.div>
                                </div>

                                <h3 className="text-3xl font-black text-white uppercase tracking-tighter mb-4 italic">
                                    {isCalculating ? 'Computing_Outcome...' : 'Strategic_Synthesis'}
                                </h3>
                                <p className="text-sm text-white/40 font-bold uppercase tracking-[0.2em]">
                                    Model: Nexus_Advisory_v4.2
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Footer Controls */}
                <div className="p-8 backdrop-blur-3xl bg-white/[0.02] border-t border-white/[0.05] flex items-center justify-between">
                    <div className="flex gap-4">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-white/40 font-black uppercase tracking-widest">Network_Integrity</span>
                            <span className="text-xs font-bold text-white uppercase tracking-widest">Secure_Layer_v9</span>
                        </div>
                    </div>
                    <button
                        onClick={runSimulation}
                        disabled={isCalculating}
                        className="px-8 py-4 rounded-xl bg-cyan-500 text-black font-black uppercase tracking-widest text-xs hover:bg-cyan-400 transition-colors shadow-2xl flex items-center gap-3"
                    >
                        {isCalculating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                        {isCalculating ? 'Processing...' : 'Recalibrate Strategy'}
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

export default StrategyMatrixDemo
