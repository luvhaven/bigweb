'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Cloud,
    Server,
    Zap,
    Activity,
    Shield,
    Globe,
    Cpu,
    Database,
    Network,
    ArrowUpRight,
    Search,
    RefreshCw
} from 'lucide-react'

const SkyPulseDemo = () => {
    const [performance, setPerformance] = useState(99.98)
    const [activeNodes, setActiveNodes] = useState([
        { id: 1, name: 'EU-WEST-1', load: 42, color: '#3b82f6' },
        { id: 2, name: 'US-EAST-1', load: 78, color: '#60a5fa' },
        { id: 3, name: 'AP-SOUTH-1', load: 12, color: '#93c5fd' },
    ])

    useEffect(() => {
        const interval = setInterval(() => {
            setPerformance(prev => {
                const change = (Math.random() - 0.5) * 0.01
                return +(0.999 + Math.random() * 0.0009 + change * 10).toFixed(4)
            })
            setActiveNodes(nodes => nodes.map(node => ({
                ...node,
                load: Math.max(5, Math.min(95, node.load + (Math.random() - 0.5) * 10))
            })))
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="w-full max-w-6xl mx-auto p-4 md:p-8 font-sans">
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative bg-[#020408] rounded-[2.5rem] border border-blue-500/20 overflow-hidden shadow-[0_0_80px_rgba(59,130,246,0.1)] flex flex-col h-[600px]"
            >
                {/* 1. Infrastructure Header */}
                <div className="p-8 border-b border-blue-500/10 flex items-center justify-between backdrop-blur-md bg-black/40 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                            <Cloud className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h2 className="text-sm font-black text-white uppercase tracking-[0.4em]">Sky_Pulse</h2>
                            <div className="flex items-center gap-2">
                                <span className="text-[10px] text-blue-400 font-black uppercase tracking-widest leading-none">Global_Telemetry_ID: SP-094</span>
                                <div className="w-2 h-[1px] bg-blue-500/30" />
                                <span className="text-[10px] text-green-500 font-black uppercase tracking-widest leading-none animate-pulse">Operational</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-10">
                        <div className="text-right">
                            <p className="text-[9px] text-white/30 font-black uppercase tracking-widest mb-1">Infrastructure_Uptime</p>
                            <p className="text-2xl font-black text-white italic tracking-tighter">{performance}%</p>
                        </div>
                        <div className="h-10 w-[1px] bg-blue-500/20" />
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-500/5 border border-blue-500/20 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-blue-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Visual Command Center */}
                <div className="flex-1 p-10 flex flex-col md:flex-row gap-10 relative overflow-hidden">
                    {/* Background Visual: Orbital Grid */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10 pointer-events-none" />

                    {/* Left: Interactive Node Feed */}
                    <div className="flex-1 flex flex-col justify-between relative z-10">
                        <div className="space-y-4">
                            <h3 className="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-6">Cluster_Performance</h3>
                            {activeNodes.map((node) => (
                                <div key={node.id} className="p-6 rounded-2xl bg-blue-500/[0.02] border border-blue-500/10 hover:border-blue-500/30 transition-all group">
                                    <div className="flex justify-between items-end mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                                            <span className="text-xs font-black text-white uppercase tracking-widest">{node.name}</span>
                                        </div>
                                        <span className="text-sm font-black text-blue-400 italic">{node.load.toFixed(0)}%_Load</span>
                                    </div>
                                    <div className="h-2 w-full bg-blue-500/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
                                            animate={{ width: `${node.load}%` }}
                                            transition={{ type: 'spring', damping: 20 }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex gap-4">
                            <button className="flex-1 py-4 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] rounded-xl flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-white transition-all shadow-xl shadow-black/40 group">
                                Deploy Cluster
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>
                            <button className="w-14 h-14 bg-blue-500/5 border border-blue-500/20 rounded-xl flex items-center justify-center hover:bg-blue-500/20 transition-all group">
                                <RefreshCw className="w-5 h-5 text-blue-500 group-hover:rotate-180 transition-transform duration-700" />
                            </button>
                        </div>
                    </div>

                    {/* Right: Orbital Telemetry (Globe Visual) */}
                    <div className="md:w-[400px] bg-blue-600/[0.03] border border-blue-500/10 rounded-[2rem] p-8 flex flex-col relative overflow-hidden group/globe">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent pointer-events-none" />

                        <div className="flex-1 flex items-center justify-center relative">
                            {/* Rotating Globe Wireframe */}
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                                className="w-64 h-64 border border-blue-500/10 rounded-full relative flex items-center justify-center"
                            >
                                <div className="absolute inset-0 border-[0.5px] border-blue-500/20 rounded-full rotate-45" />
                                <div className="absolute inset-0 border-[0.5px] border-blue-500/20 rounded-full -rotate-45" />
                                <Globe className="w-32 h-32 text-blue-500 opacity-20" strokeWidth={0.5} />

                                {/* Orbital Point */}
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0"
                                >
                                    <div className="w-3 h-3 bg-blue-500 rounded-full absolute -top-1.5 left-1/2 -translate-x-1/2 shadow-[0_0_15px_#3b82f6]" />
                                </motion.div>
                            </motion.div>

                            {/* Center Data Point */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                                <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2 animate-pulse">Scanning_Active</p>
                                <div className="text-4xl font-black text-white italic tracking-tighter">4.2ms</div>
                                <p className="text-[8px] font-black text-white/40 uppercase tracking-widest mt-1">Avg_Latency</p>
                            </div>
                        </div>

                        {/* Telemetry Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-blue-500/10">
                            <div>
                                <p className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1">Active_Req</p>
                                <div className="flex items-center gap-2">
                                    <Activity className="w-3 h-3 text-blue-400" />
                                    <span className="text-sm font-black text-white">12,402</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-white/30 uppercase tracking-widest mb-1">Threats_X</p>
                                <div className="flex items-center gap-2">
                                    <Shield className="w-3 h-3 text-red-500" />
                                    <span className="text-sm font-black text-white">0.00%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default SkyPulseDemo
