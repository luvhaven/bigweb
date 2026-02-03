'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    BrainCircuit,
    Sparkles,
    Dna,
    Target,
    Activity,
    Search,
    RefreshCw,
    TrendingUp,
    Shield,
    Layers,
    Cpu
} from 'lucide-react'

const AetherInsightsDemo = () => {
    const [isScanning, setIsScanning] = useState(false)
    const [progress, setProgress] = useState(0)
    const [revenuePotential, setRevenuePotential] = useState(0)
    const [nodes, setNodes] = useState<any[]>([])

    // Generate random neural nodes
    useEffect(() => {
        const newNodes = Array.from({ length: 20 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 4 + 2,
            opacity: Math.random() * 0.5 + 0.2
        }))
        setNodes(newNodes)
    }, [])

    const startScan = () => {
        setIsScanning(true)
        setProgress(0)
        setRevenuePotential(0)

        let currentProgress = 0
        const interval = setInterval(() => {
            currentProgress += 1
            setProgress(currentProgress)
            if (currentProgress % 2 === 0) {
                setRevenuePotential(prev => +(prev + Math.random() * 1.5).toFixed(1))
            }
            if (currentProgress >= 100) {
                clearInterval(interval)
                setIsScanning(false)
            }
        }, 30)
    }

    return (
        <div className="w-full max-w-5xl mx-auto p-4 md:p-8 font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-[#020202] rounded-[3rem] border border-white/[0.08] overflow-hidden shadow-[0_0_100px_rgba(168,85,247,0.15)] h-[600px] flex flex-col"
            >
                {/* 1. AI Interface Header */}
                <div className="p-8 border-b border-white/[0.05] flex items-center justify-between relative z-10 backdrop-blur-md bg-black/40">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-tr from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.4)]">
                            <BrainCircuit className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-white uppercase tracking-[0.4em]">Aether_Insights</h2>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-purple-400 font-bold uppercase tracking-widest">Neural_Revenue_Network</span>
                                <span className="w-2 h-[1px] bg-white/20" />
                                <span className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Core_Active</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex gap-3">
                            <button className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-[10px] text-white/60 font-black uppercase tracking-widest hover:bg-white/[0.08] transition-colors">Config</button>
                            <button className="px-4 py-2 rounded-xl bg-white/[0.05] border border-white/10 text-[10px] text-white/60 font-black uppercase tracking-widest hover:bg-white/[0.08] transition-colors">Neural_Map</button>
                        </div>
                        <div className="h-10 w-px bg-white/10" />
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-purple-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Neural Visualization Area */}
                <div className="flex-1 relative overflow-hidden group">
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

                    {/* Floating Nodes */}
                    <div className="absolute inset-0">
                        {nodes.map(node => (
                            <motion.div
                                key={node.id}
                                className="absolute rounded-full bg-purple-500"
                                style={{
                                    left: `${node.x}%`,
                                    top: `${node.y}%`,
                                    width: node.size,
                                    height: node.size,
                                    opacity: node.opacity,
                                    boxShadow: node.id % 4 === 0 ? '0 0 15px rgba(168,85,247,0.8)' : 'none'
                                }}
                                animate={{
                                    y: [0, -20, 0],
                                    x: [0, 10, 0],
                                    opacity: [node.opacity, node.opacity * 1.5, node.opacity]
                                }}
                                transition={{
                                    duration: 4 + Math.random() * 4,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        ))}
                    </div>

                    {/* Scanning Beam */}
                    <AnimatePresence>
                        {isScanning && (
                            <motion.div
                                initial={{ top: '-10%' }}
                                animate={{ top: '110%' }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-purple-500/20 to-transparent z-10 pointer-events-none"
                            >
                                <div className="h-[2px] w-full bg-purple-500 shadow-[0_0_20px_#a855f7]" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Central Analysis Hub */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="relative text-center">
                            <motion.div
                                animate={isScanning ? { rotate: 360 } : {}}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="w-72 h-72 rounded-full border border-white/[0.05] p-8 flex items-center justify-center"
                            >
                                <div className="w-full h-full rounded-full border border-purple-500/20 shadow-[inset_0_0_50px_rgba(168,85,247,0.1)]" />
                            </motion.div>

                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-auto">
                                <motion.div
                                    animate={isScanning ? { scale: [1, 1.1, 1] } : {}}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    <Sparkles className="w-12 h-12 text-purple-500 mb-6 drop-shadow-[0_0_15px_#a855f7]" />
                                </motion.div>

                                <div className="space-y-1">
                                    <div className="text-4xl font-black text-white italic tracking-tighter">
                                        {progress === 100 ? '+420%' : `${progress}%`}
                                    </div>
                                    <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.4em]">
                                        {progress === 100 ? 'Analysis_Complete' : 'Processing_Data'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Data Feed */}
                    <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-6">
                        {[
                            { label: 'Neural_Entropy', value: '0.042', icon: Activity },
                            { label: 'Hidden_Revenue', value: `$${revenuePotential}M`, icon: TrendingUp },
                            { label: 'Engine_Load', value: '42.8%', icon: Cpu },
                        ].map((stat, i) => (
                            <div key={i} className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 backdrop-blur-xl">
                                <div className="flex items-center gap-3 mb-4">
                                    <stat.icon className="w-4 h-4 text-purple-400" />
                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{stat.label}</span>
                                </div>
                                <div className="text-2xl font-black text-white italic tracking-tighter">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. Action Bar */}
                <div className="p-8 backdrop-blur-3xl bg-white/[0.02] border-t border-white/[0.05] flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div>
                            <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mb-1">Target_Market</p>
                            <p className="text-sm font-bold text-white uppercase tracking-widest leading-none">Global_Enterprise</p>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div>
                            <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mb-1">AI_Model</p>
                            <p className="text-sm font-bold text-white uppercase tracking-widest leading-none">Vortex_Neural_v4</p>
                        </div>
                    </div>

                    <button
                        onClick={startScan}
                        disabled={isScanning}
                        className={`px-10 py-5 rounded-2xl font-black uppercase tracking-[0.4em] text-xs transition-all duration-500 relative overflow-hidden group ${isScanning
                                ? 'bg-purple-900/40 text-purple-300 cursor-not-allowed border border-purple-500/20'
                                : 'bg-white text-black hover:bg-purple-600 hover:text-white shadow-2xl'
                            }`}
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            {isScanning ? (
                                <>
                                    <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
                                    Scanning...
                                </>
                            ) : (
                                <>
                                    Initialize Sweep
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </span>
                    </button>
                </div>
            </motion.div>
        </div>
    )
}

const ArrowRight = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12H19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
)

export default AetherInsightsDemo
