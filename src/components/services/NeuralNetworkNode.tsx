'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Cpu, Database, Zap, Sparkles, Brain, Network, Share2, Globe, Lock } from 'lucide-react'

export default function NeuralNetworkNode() {
    const containerRef = useRef<HTMLDivElement>(null)

    // Dynamic Pulse State
    const [activePulse, setActivePulse] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActivePulse(prev => (prev + 1) % 10)
        }, 2000)
        return () => clearInterval(interval)
    }, [])

    // Enhanced Nodes
    const nodes = [
        { id: 1, x: 50, y: 50, icon: Brain, color: 'text-purple-400', bg: 'bg-purple-900/40', border: 'border-purple-500/50', size: 'xl', label: 'Core AI' },
        { id: 2, x: 20, y: 20, icon: Database, color: 'text-cyan-400', bg: 'bg-cyan-900/40', border: 'border-cyan-500/50', size: 'lg', label: 'Data Lake' },
        { id: 3, x: 80, y: 20, icon: Cpu, color: 'text-emerald-400', bg: 'bg-emerald-900/40', border: 'border-emerald-500/50', size: 'lg', label: 'Processing' },
        { id: 4, x: 20, y: 80, icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-900/40', border: 'border-yellow-500/50', size: 'lg', label: 'Action' },
        { id: 5, x: 80, y: 80, icon: Sparkles, color: 'text-pink-400', bg: 'bg-pink-900/40', border: 'border-pink-500/50', size: 'lg', label: 'Result' },

        // Satellites
        { id: 6, x: 50, y: 15, icon: Globe, size: 'sm', color: 'text-slate-400' },
        { id: 7, x: 85, y: 50, icon: Network, size: 'sm', color: 'text-slate-400' },
        { id: 8, x: 50, y: 85, icon: Share2, size: 'sm', color: 'text-slate-400' },
        { id: 9, x: 15, y: 50, icon: Lock, size: 'sm', color: 'text-slate-400' },
    ]

    // Connections definition: [startNodeId, endNodeId]
    const connections = [
        [2, 1], [3, 1], [4, 1], [5, 1], // Core to satellites
        [2, 3], [4, 5],                 // Cross connections
        [6, 1], [7, 3], [8, 5], [9, 2]  // Outer to inner
    ]

    return (
        <div ref={containerRef} className="relative w-full aspect-square max-w-lg mx-auto bg-[#050b14] rounded-full border border-slate-800 shadow-[0_0_50px_-10px_rgba(139,92,246,0.1)] overflow-hidden group">
            {/* Animated Grid Background */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-1000">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(100,100,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(100,100,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" />
                {/* Moving beam */}
                <motion.div
                    animate={{ top: ['0%', '100%'], opacity: [0, 1, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    className="absolute left-0 right-0 h-[1px] bg-cyan-500/50 blur-[2px]"
                />
            </div>

            {/* Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-600/20 rounded-full blur-[50px] animate-pulse" />

            {/* Connections SVG Layer */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
                        <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#ec4899" stopOpacity="0.1" />
                    </linearGradient>
                </defs>
                {connections.map(([start, end], i) => {
                    const startNode = nodes.find(n => n.id === start)!
                    const endNode = nodes.find(n => n.id === end)!

                    return (
                        <g key={i}>
                            <motion.line
                                x1={`${startNode.x}%`}
                                y1={`${startNode.y}%`}
                                x2={`${endNode.x}%`}
                                y2={`${endNode.y}%`}
                                stroke="url(#lineGradient)"
                                strokeWidth="1"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 1.5, delay: i * 0.1 }}
                            />
                            {/* Moving Pulse Packet */}
                            <DataPacket start={startNode} end={endNode} delay={i * 0.8} color={i % 2 === 0 ? '#cyan' : '#purple'} />
                        </g>
                    )
                })}
            </svg>

            {/* Nodes */}
            {nodes.map((node) => {
                const isLarge = node.size === 'xl' || node.size === 'lg'
                return (
                    <div key={node.id} className="absolute -translate-x-1/2 -translate-y-1/2 z-10" style={{ left: `${node.x}%`, top: `${node.y}%` }}>
                        <motion.div
                            className={`
                            relative flex items-center justify-center rounded-full backdrop-blur-md 
                            ${node.size === 'xl' ? 'w-20 h-20' : node.size === 'lg' ? 'w-14 h-14' : 'w-8 h-8 bg-slate-800/80 border-slate-700'}
                            ${isLarge ? `${node.bg} ${node.border} border shadow-lg` : 'border'}
                        `}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: 'spring', delay: node.id * 0.1 }}
                            whileHover={{ scale: 1.15, textShadow: "0 0 8px rgb(255,255,255)" }}
                        >
                            {node.icon && (
                                <node.icon className={`${node.size === 'xl' ? 'w-8 h-8' : node.size === 'lg' ? 'w-6 h-6' : 'w-3 h-3'} ${node.color}`} />
                            )}

                            {/* Ping Animation for active nodes */}
                            {isLarge && (
                                <div className="absolute -inset-2 rounded-full border border-white/5 animate-ping opacity-20" />
                            )}
                        </motion.div>

                        {/* Label */}
                        {node.label && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-0.5 bg-black/50 rounded text-[10px] text-white/70 whitespace-nowrap border border-white/10 backdrop-blur-sm"
                            >
                                {node.label}
                            </motion.div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

function DataPacket({ start, end, delay, color }: { start: any, end: any, delay: number, color: string }) {
    return (
        <motion.circle
            r="2"
            fill="#fff"
            filter="url(#glow)"
            initial={{ cx: `${start.x}%`, cy: `${start.y}%`, opacity: 0 }}
            animate={{
                cx: [`${start.x}%`, `${end.x}%`],
                cy: [`${start.y}%`, `${end.y}%`],
                opacity: [0, 1, 0]
            }}
            transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
                delay: delay,
                repeatDelay: Math.random() * 2
            }}
        />
    )
}
