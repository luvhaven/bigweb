'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Globe,
    Navigation,
    Truck,
    Package,
    BarChart3,
    Settings,
    Clock,
    Bell,
    User,
    Search,
    ChevronRight,
    ArrowUpRight,
    TrendingUp,
    Shield,
    Activity,
    LogOut,
    Box
} from 'lucide-react'

const AntroLogisticsDemo = () => {
    const [activeTab, setActiveTab] = useState('fleet')
    const [selectedNode, setSelectedNode] = useState<number | null>(null)
    const [isLive, setIsLive] = useState(true)
    const [systemMetrics, setSystemMetrics] = useState({
        freights: 4822,
        nodes: 128,
        uptime: 99.9
    })

    const [operationalData, setOperationalData] = useState([40, 60, 45, 70, 65, 90, 80, 100])

    // Simulate real-time updates
    useEffect(() => {
        if (!isLive) return
        const interval = setInterval(() => {
            setSystemMetrics(prev => ({
                ...prev,
                freights: prev.freights + (Math.random() > 0.5 ? 1 : -1),
                uptime: +(99.8 + Math.random() * 0.1).toFixed(1)
            }))
            setOperationalData(prev => [...prev.slice(1), 70 + Math.random() * 30])
        }, 3000)
        return () => clearInterval(interval)
    }, [isLive])

    const nodes = [
        { id: 1, pos: [250, 180], city: 'New York', status: 'Optimal', load: '82%', value: '$1.2M' },
        { id: 2, pos: [520, 150], city: 'London', status: 'Optimal', load: '64%', value: '$0.8M' },
        { id: 3, pos: [350, 350], city: 'Sao Paulo', status: 'Warning', load: '95%', value: '$2.1M' },
        { id: 4, pos: [750, 400], city: 'Sydney', status: 'Optimal', load: '42%', value: '$0.5M' },
        { id: 5, pos: [550, 320], city: 'Lagos', status: 'Optimal', load: '58%', value: '$1.4M' },
    ]

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8" style={{ perspective: '2000px' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95, rotateY: -3 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative bg-[#020202] rounded-[3rem] border border-white/[0.1] shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden min-h-[750px] group"
                style={{
                    boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 1), 0 0 50px -10px rgba(0, 212, 255, 0.15)'
                }}
            >
                {/* 1. Cinematic Background - Curved Monitor & Cyan Energy */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Glowing Cyan Aura */}
                    <motion.div
                        animate={{
                            x: [0, 50, -30, 0],
                            y: [0, -30, 50, 0],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-500/10 blur-[150px] rounded-full"
                    />

                    {/* Perspective Bezel Shadow */}
                    <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] z-40 rounded-[3rem]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.05] to-transparent z-40 h-[2px]" />
                </div>

                {/* 2. Main Workspace Layout */}
                <div className="relative z-30 flex h-full p-6 pt-10">

                    {/* LEFT SIDEBAR: Integrated High-Tech Nav */}
                    <div className="w-24 flex flex-col items-center py-8 bg-white/[0.03] border border-white/[0.05] rounded-[2.5rem] backdrop-blur-2xl mr-6">
                        <div className="w-12 h-12 bg-cyan-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0, 212, 255, 0.5)] mb-12 relative group cursor-pointer overflow-hidden">
                            <Box className="w-7 h-7 text-white relative z-10 group-hover:scale-110 transition-transform" />
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform" />
                        </div>

                        <div className="flex flex-col gap-8">
                            {[
                                { icon: Globe, id: 'global' },
                                { icon: Truck, id: 'fleet' },
                                { icon: Package, id: 'cargo' },
                                { icon: BarChart3, id: 'analytics' },
                                { icon: Settings, id: 'config' }
                            ].map((item, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`p-4 rounded-2xl transition-all ${activeTab === item.id ? 'text-cyan-400 bg-cyan-400/10 shadow-[0_0_20px_rgba(34,211,238,0.2)]' : 'text-white/20 hover:text-white/50 hover:bg-white/5'}`}
                                >
                                    <item.icon className="w-6 h-6" strokeWidth={2} />
                                </button>
                            ))}
                        </div>

                        <div className="mt-auto text-white/10 hover:text-white/30 cursor-pointer">
                            <LogOut className="w-6 h-6" />
                        </div>
                    </div>

                    {/* MAIN CONTENT AREA */}
                    <div className="flex-grow flex flex-col gap-4">

                        {/* 3. Central Branding - As seen in the image */}
                        <div className="absolute top-12 left-1/2 -translate-x-1/2 z-50 text-center">
                            <motion.h1
                                initial={{ y: -20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-5xl md:text-6xl font-black text-cyan-400 tracking-[0.15em] uppercase italic flex items-center gap-4 drop-shadow-[0_0_30px_rgba(0,212,255,0.8)]"
                            >
                                Antro <span className="text-white not-italic opacity-90 drop-shadow-none">Logistics</span>
                            </motion.h1>
                            <div className="flex items-center justify-center gap-2 mt-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-white/40 tracking-[0.4em] uppercase">System_Secure_Link_Active</span>
                            </div>
                        </div>

                        {/* TOP ACTIONS (Search/User) */}
                        <div className="flex items-center justify-between px-2 h-14 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <div className="flex items-center gap-4">
                                <div className="p-2.5 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                                    <Activity className="w-5 h-5 text-cyan-400" />
                                </div>
                                <div>
                                    <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] leading-none mb-1">Command</div>
                                    <div className="text-[8px] font-bold text-cyan-500/60 uppercase tracking-widest leading-none">v4.0.2_Stable</div>
                                </div>
                            </div>

                            <div className="absolute left-1/2 -translate-x-1/2 text-center pointer-events-none">
                                <h1 className="text-xl font-black text-white uppercase tracking-[0.4em] mb-1">Antro Logistics</h1>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="w-8 h-px bg-gradient-to-r from-transparent to-cyan-500/40" />
                                    <span className="text-[8px] font-bold text-cyan-400/60 uppercase tracking-[0.2em]">Global Telemetry Network</span>
                                    <span className="w-8 h-px bg-gradient-to-l from-transparent to-cyan-500/40" />
                                </div>
                            </div>

                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                    <input
                                        type="text"
                                        placeholder="Search Shipment..."
                                        className="bg-white/[0.03] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white/60 w-64 focus:outline-none focus:border-cyan-500/40"
                                    />
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="p-2.5 bg-white/[0.03] border border-white/10 rounded-xl relative">
                                        <Bell className="w-5 h-5 text-white/40" />
                                        <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full" />
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-transparent border border-cyan-500/40 flex items-center justify-center">
                                        <User className="w-5 h-5 text-cyan-400" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* DASHBOARD GRID */}
                        <div className="flex-grow grid grid-cols-12 gap-6 mt-16">

                            {/* LEFT COLUMN: WIDGETS */}
                            <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
                                {/* Analytics Chart */}
                                <div className="bg-white/[0.03] border border-white/[0.08] rounded-[2.5rem] backdrop-blur-3xl p-6">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Operational Efficiency</h3>
                                        <ArrowUpRight className="w-4 h-4 text-cyan-400" />
                                    </div>
                                    <div className="h-24 relative flex items-end gap-[4px]">
                                        {operationalData.map((h, i) => (
                                            <div key={i} className="flex-grow flex flex-col justify-end group/item relative h-full">
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${h}%` }}
                                                    className="w-full min-w-[6px] bg-gradient-to-t from-cyan-500/20 to-cyan-400 rounded-t-lg transition-all duration-500 group-hover/item:brightness-125 group-hover/item:shadow-[0_0_15px_#22d3ee]"
                                                />
                                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/item:opacity-100 transition-opacity whitespace-nowrap bg-cyan-500 text-[8px] px-1.5 py-0.5 rounded font-black text-white pointer-events-none z-50">
                                                    {h}%
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Fleet Tracking Bars */}
                                <div className="bg-white/[0.03] border border-white/[0.08] rounded-[2.5rem] backdrop-blur-3xl p-6 flex-grow ">
                                    <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-6">Fleet Allocation</h3>
                                    <div className="space-y-6">
                                        {[
                                            { label: 'Long Haul', value: 84, color: 'bg-cyan-500' },
                                            { label: 'Express', value: 62, color: 'bg-purple-500' },
                                            { label: 'Last Mile', value: 91, color: 'bg-emerald-500' },
                                            { label: 'Sea Freight', value: 45, color: 'bg-blue-500' },
                                        ].map((item, i) => (
                                            <div key={i}>
                                                <div className="flex justify-between text-[10px] font-bold text-white/60 mb-2">
                                                    <span>{item.label}</span>
                                                    <span>{item.value}%</span>
                                                </div>
                                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${item.value}%` }}
                                                        transition={{ duration: 1, delay: i * 0.1 }}
                                                        className={`h-full ${item.color}`}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* CENTER AREA: WORLD MAP */}
                            <div className="col-span-12 lg:col-span-6 relative flex flex-col items-center justify-center p-4">
                                {/* World Map Placeholder / SVG */}
                                <div className="relative w-full aspect-[1.8/1] opacity-80">
                                    <svg viewBox="0 0 1000 500" className="w-full h-full">
                                        <mask id="map-mask">
                                            <path d="M200 100h600v300h-600z" fill="white" />
                                        </mask>
                                        {/* Point-based map dots (simplified) */}
                                        <defs>
                                            <pattern id="dotPattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                                                <circle cx="2" cy="2" r="1" fill="#ffffff" fillOpacity="0.1" />
                                            </pattern>
                                        </defs>
                                        <rect width="100%" height="100%" fill="url(#dotPattern)" />

                                        {/* High-Fidelity Detailed World Map Paths */}
                                        <g className="fill-white/5 stroke-white/10 stroke-[0.3]">
                                            {/* North America */}
                                            <path d="M120,80 C150,70 180,60 220,70 C250,80 280,100 300,140 C320,170 340,200 330,240 C310,270 280,290 240,300 C200,310 160,300 130,280 C100,250 80,200 120,80 Z" />
                                            {/* South America */}
                                            <path d="M280,310 C310,310 350,320 370,350 C380,380 390,420 370,460 C350,490 310,480 280,450 C260,420 250,380 280,310 Z" />
                                            {/* Eurasia */}
                                            <path d="M480,80 C550,60 650,50 750,70 C850,90 950,150 920,250 C900,320 820,360 720,370 C650,380 580,360 520,330 C480,300 450,250 480,80 Z" />
                                            {/* Africa */}
                                            <path d="M480,270 C530,260 580,260 620,290 C650,330 630,420 590,460 C550,490 500,480 470,440 C440,400 450,330 480,270 Z" />
                                            {/* Australia */}
                                            <path d="M780,380 C820,380 880,390 910,420 C930,450 910,480 880,490 C840,500 800,480 780,450 C760,420 750,400 780,380 Z" />
                                            {/* Extra islands/details */}
                                            <circle cx="200" cy="120" r="1.5" />
                                            <circle cx="700" cy="150" r="2" />
                                            <circle cx="850" cy="300" r="1.5" />
                                        </g>

                                        {/* Animated Routes */}
                                        {[
                                            { d: "M250,180 Q450,100 520,150", delay: 0 },
                                            { d: "M520,150 Q650,250 350,350", delay: 2 },
                                            { d: "M350,350 Q500,450 750,400", delay: 4 },
                                            { d: "M750,400 Q900,200 520,150", delay: 6 },
                                        ].map((route, i) => (
                                            <g key={i}>
                                                <path
                                                    d={route.d}
                                                    fill="none"
                                                    stroke="url(#routeGrad)"
                                                    strokeWidth="1.5"
                                                    strokeDasharray="4 4"
                                                    className="opacity-40"
                                                />
                                                <motion.circle r="3" fill="#00d4ff">
                                                    <animateMotion path={route.d} dur="6s" repeatCount="indefinite" begin={`${route.delay}s`} />
                                                </motion.circle>
                                            </g>
                                        ))}

                                        <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0" />
                                            <stop offset="50%" stopColor="#00d4ff" stopOpacity="1" />
                                            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                                        </linearGradient>

                                        {/* Pulsing Nodes */}
                                        {nodes.map((node, i) => (
                                            <g
                                                key={node.id}
                                                className="cursor-pointer group/node"
                                                onClick={() => setSelectedNode(node.id === selectedNode ? null : node.id)}
                                            >
                                                <motion.circle
                                                    cx={node.pos[0]} cy={node.pos[1]} r="6"
                                                    fill={node.status === 'Warning' ? '#f43f5e' : '#00d4ff'}
                                                    fillOpacity="0.2"
                                                    animate={{
                                                        r: selectedNode === node.id ? [8, 16, 8] : [6, 12, 6],
                                                        opacity: selectedNode === node.id ? [0.4, 0.6, 0.4] : [0.2, 0.4, 0.2]
                                                    }}
                                                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
                                                />
                                                <circle
                                                    cx={node.pos[0]} cy={node.pos[1]} r="3"
                                                    fill={node.status === 'Warning' ? '#f43f5e' : '#00d4ff'}
                                                    className={`transition-all duration-300 ${selectedNode === node.id ? 'shadow-[0_0_15px_#00d4ff]' : ''}`}
                                                />

                                                {/* Tooltip on Click */}
                                                <AnimatePresence>
                                                    {selectedNode === node.id && (
                                                        <foreignObject x={node.pos[0] + 15} y={node.pos[1] - 40} width="160" height="100">
                                                            <motion.div
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                exit={{ opacity: 0, x: -10 }}
                                                                className="bg-black/90 border border-cyan-500/50 rounded-xl p-3 backdrop-blur-xl shadow-2xl"
                                                            >
                                                                <div className="text-[9px] font-black text-cyan-400 uppercase tracking-widest mb-1">{node.city}</div>
                                                                <div className="flex justify-between items-center mb-1">
                                                                    <span className="text-[8px] text-white/40 uppercase">Load:</span>
                                                                    <span className="text-[10px] text-white font-bold">{node.load}</span>
                                                                </div>
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-[8px] text-white/40 uppercase">Value:</span>
                                                                    <span className="text-[10px] text-emerald-400 font-bold">{node.value}</span>
                                                                </div>
                                                            </motion.div>
                                                        </foreignObject>
                                                    )}
                                                </AnimatePresence>
                                            </g>
                                        ))}
                                    </svg>
                                </div>

                                {/* Floating Labels - Replaced with the interactive system above */}

                                <div className="mt-8 flex gap-12 text-center">
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Active Freights</div>
                                        <div className="text-2xl font-black text-white">{systemMetrics.freights.toLocaleString()}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Live Nodes</div>
                                        <div className="text-2xl font-black text-white">{systemMetrics.nodes}</div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">Global Uptime</div>
                                        <div className="text-2xl font-black text-emerald-400">{systemMetrics.uptime}%</div>
                                    </div>
                                    <div className="space-y-1 cursor-pointer group/toggle" onClick={() => setIsLive(!isLive)}>
                                        <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] group-hover/toggle:text-cyan-400 transition-colors text-right">System Status</div>
                                        <div className={`text-2xl font-black flex items-center justify-end gap-2 ${isLive ? 'text-emerald-400' : 'text-rose-400'}`}>
                                            {isLive ? 'LIVE' : 'PAUSED'}
                                            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse shadow-[0_0_10px_#10b981]' : 'bg-rose-400 shadow-[0_0_10px_#f43f5e]'}`} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT COLUMN: METRICS */}
                            <div className="col-span-12 lg:col-span-3 flex flex-col gap-6">
                                {/* Fleet Health Gauges */}
                                <div className="bg-white/[0.03] border border-white/[0.08] rounded-[2.5rem] backdrop-blur-3xl p-6">
                                    <h3 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-6">Fleet Health</h3>
                                    <div className="flex justify-around items-center">
                                        <div className="relative w-16 h-16">
                                            <svg className="w-full h-full rotate-[-90deg]">
                                                <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                                                <motion.circle
                                                    cx="32" cy="32" r="28" fill="none" stroke="#00d4ff" strokeWidth="6"
                                                    strokeDasharray="176" initial={{ strokeDashoffset: 176 }}
                                                    animate={{ strokeDashoffset: 176 - (176 * 0.85) }}
                                                    transition={{ duration: 1.5 }}
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white">85%</div>
                                        </div>
                                        <div className="relative w-16 h-16">
                                            <svg className="w-full h-full rotate-[-90deg]">
                                                <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="6" />
                                                <motion.circle
                                                    cx="32" cy="32" r="28" fill="none" stroke="#8b5cf6" strokeWidth="6"
                                                    strokeDasharray="176" initial={{ strokeDashoffset: 176 }}
                                                    animate={{ strokeDashoffset: 176 - (176 * 0.72) }}
                                                    transition={{ duration: 1.5 }}
                                                />
                                            </svg>
                                            <div className="absolute inset-0 flex items-center justify-center text-[10px] font-black text-white">72%</div>
                                        </div>
                                    </div>
                                </div>

                                {/* Delivery Status List */}
                                <div className="bg-white/[0.03] border border-white/[0.08] rounded-[2.5rem] backdrop-blur-3xl overflow-hidden flex flex-col flex-grow">
                                    <div className="bg-cyan-500/10 border-b border-white/[0.08] p-6 flex justify-between items-center">
                                        <h3 className="text-[10px] font-bold text-cyan-400 uppercase tracking-[0.2em]">Real-time Feed</h3>
                                        <div className="flex gap-1 items-center">
                                            <div className="w-1 h-1 rounded-full bg-cyan-500 animate-ping" />
                                            <div className="text-[8px] text-cyan-400 font-bold tracking-widest leading-none">STREAMING</div>
                                        </div>
                                    </div>
                                    <div className="p-6 space-y-3 overflow-y-auto max-h-[300px] pr-2 custom-scrollbar">
                                        {[
                                            { id: 'SH-293', status: 'In Transit', origin: 'Berlin', dest: 'NYC', icon: Clock, complexity: 'High' },
                                            { id: 'SH-842', status: 'Processing', origin: 'Tokyo', dest: 'London', icon: Activity, complexity: 'Med' },
                                            { id: 'SH-102', status: 'Delivered', origin: 'Paris', dest: 'Dubai', icon: Shield, complexity: 'Low' },
                                            { id: 'SH-551', status: 'Delayed', origin: 'Sydney', dest: 'LA', icon: Bell, complexity: 'Critical' },
                                            { id: 'SH-901', status: 'In Transit', origin: 'Moscow', dest: 'Cairo', icon: Clock, complexity: 'Med' },
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-center gap-4 p-3 rounded-2xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.06] hover:border-cyan-500/20 transition-all cursor-pointer group/item">
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${item.complexity === 'Critical' ? 'bg-rose-500/10 text-rose-400' : 'bg-cyan-500/10 text-cyan-400'}`}>
                                                    <item.icon className="w-5 h-5" />
                                                </div>
                                                <div className="flex-grow">
                                                    <div className="text-[11px] font-bold text-white leading-tight">{item.id}</div>
                                                    <div className="text-[8px] text-white/40 uppercase tracking-widest mt-0.5">{item.origin} → {item.dest}</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className={`text-[9px] font-black uppercase ${item.complexity === 'Critical' ? 'text-rose-400' : 'text-white/60'}`}>{item.status}</div>
                                                    <div className="text-[7px] text-white/20 font-bold uppercase mt-1">{item.complexity}_PRIORITY</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* BOTTOM STATUS BAR */}
                <div className="absolute bottom-0 left-0 right-0 h-14 bg-black/90 border-t border-cyan-500/20 z-50 flex items-center px-10 justify-between backdrop-blur-xl">
                    <div className="flex gap-12">
                        <div className="flex items-center gap-3">
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Protocol</span>
                            <span className="text-[9px] font-black text-cyan-500 uppercase tracking-[0.3em]">ANTRO_SECURE_v4.2</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Network</span>
                            <div className="flex items-center gap-1.5">
                                {[1, 2, 3, 4].map(b => (
                                    <div key={b} className={`w-1 h-3 rounded-sm ${b <= 3 ? 'bg-cyan-500' : 'bg-white/10'}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-4 text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">
                            Packet_Loss: <span className="text-emerald-500">0.00%</span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                            <span className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.2em]">Encr_Tunnel_Stable</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Quick Summary Below */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
                {[
                    { label: 'Tracking Precision', value: '100%', icon: Globe },
                    { label: 'Average Response', value: '24ms', icon: Clock },
                    { label: 'Secure Nodes', value: '5k+', icon: Shield },
                    { label: 'Active Fleet', value: '12.4k', icon: Truck },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + (i * 0.1) }}
                        className="bg-white/[0.01] border border-white/[0.05] p-6 rounded-[2rem] flex flex-col items-center text-center group hover:bg-white/[0.02] transition-colors"
                    >
                        <item.icon className="w-6 h-6 text-cyan-500/40 mb-4 group-hover:text-cyan-400 transition-colors" />
                        <div className="text-2xl font-black text-white italic mb-1 tracking-tighter">{item.value}</div>
                        <div className="text-[10px] text-white/30 font-black uppercase tracking-[0.2em]">{item.label}</div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default AntroLogisticsDemo
