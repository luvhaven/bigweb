'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Brain, Cpu, Bot, Search, Zap, Shield, Database, Workflow } from 'lucide-react'

const layers = [
    {
        id: 'intellect',
        title: 'The Neural Core',
        subtitle: 'LLM Orchestration',
        icon: Brain,
        description: 'The cognitive engine. We orchestrate GPT-4o, Claude 3.5, and internal proprietary models for high-stakes decision making.',
        details: [
            { label: 'Reasoning Depth', value: 'Forensic Grade' },
            { label: 'Context Windows', value: '200k+ Tokens' },
            { label: 'Latency', value: '< 800ms' }
        ],
        color: 'text-blue-500',
        bgColor: 'bg-blue-500/10',
        borderColor: 'border-blue-500/20'
    },
    {
        id: 'memory',
        title: 'The Context Vault',
        subtitle: 'Vector Infrastructure',
        icon: Database,
        description: 'Infinite long-term memory. Every interaction, document, and data point is indexed for millisecond retrieval.',
        details: [
            { label: 'Retrieval Engine', value: 'RAG Protocol' },
            { label: 'Knowledge Base', value: 'Bespoke Index' },
            { label: 'Accuracy', value: '99.9% Recall' }
        ],
        color: 'text-indigo-500',
        bgColor: 'bg-indigo-500/10',
        borderColor: 'border-indigo-500/20'
    },
    {
        id: 'execution',
        title: 'The Agent Mesh',
        subtitle: 'Recursive Workflow',
        icon: Workflow,
        description: 'Autonomous execution units. Agents that self-correct, interface with your APIs, and deliver verifiable outcomes.',
        details: [
            { label: 'Autonomy Level', value: 'Full Recursive' },
            { label: 'Error Handling', value: 'Loop Isolation' },
            { label: 'Output', value: 'Deterministic' }
        ],
        color: 'text-cyan-500',
        bgColor: 'bg-cyan-500/10',
        borderColor: 'border-cyan-500/20'
    }
]

export default function NeuralCore() {
    const [activeLayer, setActiveLayer] = useState(layers[0])

    return (
        <div className="w-full max-w-5xl mx-auto py-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Interactive Visualization */}
                <div className="relative aspect-square flex items-center justify-center">
                    {/* Background Pulsing Rings */}
                    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                        <motion.div
                            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute w-full h-full border border-blue-500/20 rounded-full"
                        />
                        <motion.div
                            animate={{ scale: [1.2, 1, 1.2], opacity: [0.05, 0.1, 0.05] }}
                            transition={{ duration: 6, repeat: Infinity }}
                            className="absolute w-3/4 h-3/4 border border-indigo-500/20 rounded-full"
                        />
                    </div>

                    {/* Layer Nodes */}
                    <div className="relative z-10 w-full h-full flex items-center justify-center">
                        {layers.map((layer, i) => (
                            <motion.button
                                key={layer.id}
                                onClick={() => setActiveLayer(layer)}
                                className={`absolute p-6 rounded-3xl border backdrop-blur-xl transition-all duration-500 group ${activeLayer.id === layer.id ? `${layer.bgColor} ${layer.borderColor} scale-110 shadow-glow` : 'bg-white/5 border-white/10 opacity-40 hover:opacity-100 hover:scale-105'}`}
                                style={{
                                    transform: `rotate(${i * 120}deg) translate(140px) rotate(-${i * 120}deg)`
                                }}
                            >
                                <layer.icon className={`w-8 h-8 ${activeLayer.id === layer.id ? layer.color : 'text-white'}`} />
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{layer.subtitle}</span>
                                </div>
                            </motion.button>
                        ))}

                        {/* Center Connection Core */}
                        <div className="w-32 h-32 rounded-full bg-[#0A0A0A] border border-white/5 flex items-center justify-center relative">
                            <div className="absolute inset-0 bg-blue-500/5 blur-2xl animate-pulse" />
                            <Zap className="w-10 h-10 text-blue-500 relative z-10 animate-pulse" />

                            {/* Connecting Lines (Simulated) */}
                            <svg className="absolute inset-0 w-full h-full -rotate-90">
                                <circle
                                    cx="64" cy="64" r="60"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="0.5"
                                    className="text-white/10"
                                    strokeDasharray="4 8"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Data Readout */}
                <div className="space-y-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeLayer.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div>
                                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4">
                                    System Module: {activeLayer.id}
                                </div>
                                <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-2 italic">
                                    {activeLayer.title}
                                </h3>
                                <p className="text-zinc-500 font-medium uppercase text-xs tracking-widest">
                                    {activeLayer.subtitle}
                                </p>
                            </div>

                            <p className="text-xl text-zinc-400 leading-relaxed font-light">
                                {activeLayer.description}
                            </p>

                            <div className="grid gap-4">
                                {activeLayer.details.map((detail, i) => (
                                    <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                        <span className="text-xs font-black uppercase tracking-widest text-zinc-500">{detail.label}</span>
                                        <span className="text-sm font-bold text-white italic uppercase">{detail.value}</span>
                                    </div>
                                ))}
                            </div>

                            <button className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black uppercase tracking-widest text-sm hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/20">
                                Inquiry Diagnostic Protocol
                            </button>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
