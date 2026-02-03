'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Shield,
    Fingerprint,
    LayoutDashboard,
    Activity,
    CreditCard,
    Settings,
    LogOut,
    Search,
    Bell,
    User,
    TrendingUp,
    ArrowUpRight,
    ArrowDownLeft,
    Zap,
    ChevronRight,
    Search as SearchIcon,
    Box,
    Globe,
    Lock
} from 'lucide-react'

const VortexPayDemo = () => {
    const [activeTab, setActiveTab] = useState('dashboard')
    const [isScanning, setIsScanning] = useState(false)
    const [scanProgress, setScanProgress] = useState(0)
    const [isVerified, setIsVerified] = useState(false)
    const [stats, setStats] = useState({ revenue: 142.4, efficiency: 98.2, growth: 24 })
    const [revMouseX, setRevMouseX] = useState(0)
    const [transactions, setTransactions] = useState([
        { id: 1, name: 'SaaS Subscription', amount: '+$12,400', status: 'Completed', type: 'up', verified: true },
        { id: 2, name: 'Cloud Infrastructure', amount: '-$2,150', status: 'Processing', type: 'down', verified: false },
        { id: 3, name: 'API Credits', amount: '-$840', status: 'Completed', type: 'down', verified: true },
        { id: 4, name: 'Enterprise Plan', amount: '+$45,000', status: 'Completed', type: 'up', verified: true },
        { id: 5, name: 'Identity Ping', amount: '---', status: 'Awaiting...', type: 'up', verified: false },
    ])
    const [revenueData, setRevenueData] = useState([30, 45, 35, 60, 55, 80, 100, 70, 85, 95])

    // Live Stat Updates
    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                ...prev,
                efficiency: +(99.5 + Math.random() * 0.4).toFixed(1),
                growth: +(prev.growth + (Math.random() - 0.5) * 0.1).toFixed(1)
            }))

            setRevenueData(prev => {
                const newData = [...prev.slice(1), 70 + Math.random() * 30]
                return newData
            })
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    const startScan = () => {
        if (isScanning || isVerified) return
        setIsScanning(true)
        setScanProgress(0)

        const interval = setInterval(() => {
            setScanProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setIsScanning(false)
                    setIsVerified(true)
                    return 100
                }
                return prev + 2
            })
        }, 30)
    }

    const toggleVerify = (id: number) => {
        setTransactions(prev => prev.map(t =>
            t.id === id ? { ...t, verified: !t.verified, status: !t.verified ? 'Completed' : 'Processing' } : t
        ))
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-4 md:p-8" style={{ perspective: '2000px' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: -2 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="relative bg-[#020202] rounded-[3rem] border border-white/[0.1] shadow-[0_0_150px_rgba(0,0,0,1)] overflow-hidden min-h-[750px] group"
            >
                {/* 1. Cinematic Background - Swirling Orange Energy */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Glowing Blobs */}
                    <motion.div
                        animate={{
                            x: [0, 100, -50, 0],
                            y: [0, -50, 100, 0],
                            opacity: [0.1, 0.2, 0.1]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-accent/20 blur-[120px] rounded-full"
                    />
                    <motion.div
                        animate={{
                            x: [0, -100, 50, 0],
                            y: [0, 100, -50, 0],
                            opacity: [0.05, 0.15, 0.05]
                        }}
                        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-accent/30 blur-[150px] rounded-full"
                    />

                    {/* SVG Light Trails */}
                    <svg className="absolute inset-0 w-full h-full opacity-40 blur-[4px]" viewBox="0 0 1200 800">
                        <motion.path
                            d="M -100 400 Q 300 100 600 400 T 1300 400"
                            stroke="url(#trail-grad)"
                            strokeWidth="4"
                            fill="transparent"
                            animate={{
                                d: [
                                    "M -100 400 Q 300 100 600 400 T 1300 400",
                                    "M -100 300 Q 300 600 600 300 T 1300 300",
                                    "M -100 400 Q 300 100 600 400 T 1300 400"
                                ]
                            }}
                            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <defs>
                            <linearGradient id="trail-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#ff6b35" stopOpacity="0" />
                                <stop offset="40%" stopColor="#ff6b35" stopOpacity="0.8" />
                                <stop offset="60%" stopColor="#ffb035" stopOpacity="0.8" />
                                <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Grid Pattern Overlay */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />
                </div>

                {/* 2. Hardware Frame Effects */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.9)] z-40 rounded-[3rem]" />
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-50" />

                {/* 3. Dashboard UI Container */}
                <div className="relative z-30 flex h-full p-6 pt-10">

                    {/* LEFTSIDEBAR: Integrated Glass Column */}
                    <div className="w-24 flex flex-col items-center py-8 bg-white/[0.03] border border-white/[0.05] rounded-[2.5rem] backdrop-blur-2xl mr-6">
                        {/* Styled 'V' Logo - Matches Case Study */}
                        <div className="mb-12 relative group cursor-pointer">
                            <div className="absolute inset-0 bg-accent blur-xl opacity-40 group-hover:opacity-100 transition-opacity" />
                            <div className="relative w-12 h-12 bg-black border border-accent/40 rounded-xl flex items-center justify-center overflow-hidden">
                                <motion.div
                                    className="relative z-10"
                                    animate={{ rotate: [0, 5, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M4 6L12 18L20 6" stroke="#ff6b35" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M8 6L12 12L16 6" stroke="#ff6b35" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-50" />
                                    </svg>
                                </motion.div>
                                <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </div>

                        <div className="flex flex-col gap-8">
                            {[
                                { icon: LayoutDashboard, id: 'dashboard' },
                                { icon: Globe, id: 'global' },
                                { icon: Activity, id: 'health' },
                                { icon: CreditCard, id: 'payments' },
                                { icon: Box, id: 'vault' },
                                { icon: Settings, id: 'config' }
                            ].map((item, i) => (
                                <div
                                    key={i}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`p-4 rounded-2xl cursor-pointer transition-all ${activeTab === item.id ? 'text-accent bg-accent/10 border border-accent/20 shadow-[0_0_15px_#ff6b3533]' : 'text-white/20 hover:text-white/50 hover:bg-white/5'}`}
                                >
                                    <item.icon className="w-6 h-6" strokeWidth={2} />
                                </div>
                            ))}
                        </div>

                        <div className="mt-auto text-white/10 hover:text-white/30 cursor-pointer">
                            <LogOut className="w-6 h-6" />
                        </div>
                    </div>

                    {/* MAIN CONTENT AREA */}
                    <div className="flex-grow flex flex-col gap-6">

                        {/* TOP HEADER */}
                        <div className="flex items-center justify-between mb-2">
                            <h1 className="text-2xl font-bold text-white tracking-widest uppercase opacity-90">Dashboard</h1>
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_#ff6b35]" />
                                    <span className="text-[10px] font-black text-white/40 tracking-[0.3em] uppercase">Auth_Session_Active</span>
                                </div>
                                <div className="p-2.5 bg-white/[0.03] border border-white/10 rounded-xl">
                                    <Bell className="w-5 h-5 text-white/40" />
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/40 flex items-center justify-center">
                                        <User className="w-5 h-5 text-accent" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* DASHBOARD GRID */}
                        <div className="flex-grow grid grid-cols-12 gap-6">

                            {/* LEFT WIDGET: TRANSACTION HISTORY */}
                            <div className="col-span-12 lg:col-span-4 h-full">
                                <div className="h-full bg-white/[0.03] border border-white/[0.08] rounded-[2.5rem] backdrop-blur-3xl p-8 flex flex-col">
                                    <h3 className="text-[11px] font-bold text-white/40 uppercase tracking-[0.4em] mb-8">Transaction Logs</h3>

                                    <div className="relative mb-8">
                                        <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                                        <input
                                            type="text"
                                            placeholder="Query Registry..."
                                            className="w-full bg-black/40 border border-white/10 rounded-2xl pl-12 pr-4 py-3 text-xs text-white/80 placeholder:text-white/20 focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/20 transition-all font-mono"
                                        />
                                    </div>

                                    <div className="flex-grow flex flex-col gap-6 overflow-y-auto pr-2 custom-scrollbar">
                                        {transactions.map((item) => (
                                            <div
                                                key={item.id}
                                                onClick={() => toggleVerify(item.id)}
                                                className="flex items-center justify-between group cursor-pointer hover:bg-white/[0.04] p-3 rounded-2xl transition-all border border-transparent hover:border-white/5"
                                            >
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-colors ${item.verified ? 'bg-emerald-500/10 text-emerald-400' : 'bg-accent/10 text-accent'}`}>
                                                        {item.verified ? <Shield className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                                                    </div>
                                                    <div>
                                                        <div className="text-[12px] font-bold text-white transition-colors group-hover:text-accent">{item.name}</div>
                                                        <div className="text-[9px] text-white/20 uppercase tracking-widest mt-1">ID: #{item.id * 892}</div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <div className={`text-[11px] font-black ${item.type === 'up' ? 'text-emerald-400' : 'text-rose-400'}`}>{item.amount}</div>
                                                    <div className="text-[8px] text-white/20 uppercase font-bold mt-1">{item.status}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-white/[0.05] flex items-center justify-center gap-2 text-white/20 hover:text-white/60 cursor-pointer transition-colors">
                                        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Vertical_Scroll_Enabled</span>
                                    </div>
                                </div>
                            </div>

                            {/* CENTER AREA: BRANDING + SCANNER */}
                            <div className="col-span-12 lg:col-span-4 flex flex-col items-center justify-center gap-12 pt-10">

                                {/* VORTEX PAY GLASS CARD */}
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="bg-white/[0.04] border border-white/[0.1] rounded-[2rem] px-14 py-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent w-1/2 -skew-x-12 group-hover:left-full transition-all duration-1000" />
                                    <h1 className="text-5xl font-black text-white tracking-widest leading-none">
                                        Vortex <span className="text-accent italic">Pay</span>
                                    </h1>
                                </motion.div>

                                {/* CENTRAL SECURITY INTERFACE */}
                                <div className="relative w-72 h-72 group">
                                    {/* Rotating Brackets */}
                                    <motion.div
                                        animate={{ rotate: isScanning ? 360 : 0 }}
                                        transition={{ duration: isScanning ? 2 : 20, repeat: isScanning ? Infinity : 0, ease: "linear" }}
                                        className={`absolute inset-0 border-2 border-dashed rounded-full transition-colors duration-500 ${isVerified ? 'border-emerald-500/40' : 'border-accent/20'}`}
                                    />

                                    <div
                                        onClick={startScan}
                                        className={`absolute inset-4 bg-[#0a0a0a] border rounded-[3rem] shadow-2xl flex flex-col items-center justify-center overflow-hidden cursor-pointer transition-all duration-700 ${isVerified ? 'border-emerald-500/40' : 'border-white/[0.1] hover:border-accent/40'}`}
                                    >
                                        {/* Scanner Line */}
                                        <AnimatePresence>
                                            {isScanning && (
                                                <motion.div
                                                    className="absolute left-0 right-0 h-1 bg-accent/60 shadow-[0_0_20px_#ff6b35] z-20"
                                                    initial={{ top: '10%' }}
                                                    animate={{ top: '90%' }}
                                                    exit={{ opacity: 0 }}
                                                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                                                />
                                            )}
                                        </AnimatePresence>

                                        {isVerified ? (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="flex flex-col items-center gap-4"
                                            >
                                                <Shield className="w-24 h-24 text-emerald-400 drop-shadow-[0_0_15px_#10b981]" />
                                                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">Access_Granted</span>
                                            </motion.div>
                                        ) : (
                                            <div className="relative flex flex-col items-center justify-center">
                                                <Fingerprint className={`w-28 h-28 transition-all duration-700 ${isScanning ? 'text-accent scale-110' : 'text-white/20'}`} strokeWidth={1.5} />
                                                <div className="mt-4 text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">
                                                    {isScanning ? `${scanProgress}% SCANNED` : 'INITIATE_HAND_AUTH'}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Corner Markers */}
                                    <div className={`absolute -top-2 -left-2 w-10 h-10 border-t-2 border-l-2 rounded-tl-2xl transition-colors duration-700 ${isVerified ? 'border-emerald-500' : 'border-accent'}`} />
                                    <div className={`absolute -top-2 -right-2 w-10 h-10 border-t-2 border-r-2 rounded-tr-2xl transition-colors duration-700 ${isVerified ? 'border-emerald-500' : 'border-accent'}`} />
                                    <div className={`absolute -bottom-2 -left-2 w-10 h-10 border-b-2 border-l-2 rounded-bl-2xl transition-colors duration-700 ${isVerified ? 'border-emerald-500' : 'border-accent'}`} />
                                    <div className={`absolute -bottom-2 -right-2 w-10 h-10 border-b-2 border-r-2 rounded-br-2xl transition-colors duration-700 ${isVerified ? 'border-emerald-500' : 'border-accent'}`} />
                                </div>

                                {/* Bottom Stat Bar */}
                                <div className="bg-white/[0.03] border border-white/[0.08] rounded-2xl px-8 py-4 flex items-center gap-10">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-emerald-500/10 rounded-lg"><Activity className="w-4 h-4 text-emerald-400" /></div>
                                        <div>
                                            <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Efficiency</div>
                                            <div className="text-[12px] font-black text-white">{stats.efficiency}%</div>
                                        </div>
                                    </div>
                                    <div className="w-[1px] h-6 bg-white/10" />
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-accent/10 rounded-lg"><Lock className="w-4 h-4 text-accent" /></div>
                                        <div>
                                            <div className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Bit_Key</div>
                                            <div className="text-[12px] font-black text-white">AES_256</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT WIDGETS: REVENUE & ANALYTICS */}
                            <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">

                                {/* REVENUE STACKED DATA */}
                                <div className="bg-white/[0.03] border border-white/[0.08] rounded-[2.5rem] backdrop-blur-3xl p-8 flex-grow">
                                    <div className="flex justify-between items-center mb-8">
                                        <h3 className="text-[11px] font-bold text-white/40 uppercase tracking-[0.4em]">Revenue</h3>
                                        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-white/40">PERIOD_NODES</div>
                                    </div>

                                    <div className="flex items-end gap-1.5 h-32 mb-10">
                                        {revenueData.map((v, i) => (
                                            <div key={i} className="flex-grow flex flex-col justify-end group/bar relative">
                                                <motion.div
                                                    initial={{ height: 0 }}
                                                    animate={{ height: `${v}%` }}
                                                    whileHover={{ scaleX: 1.1, brightness: 1.2 }}
                                                    className="w-full bg-gradient-to-t from-accent/20 to-accent rounded-full transition-all duration-300 group-hover/bar:shadow-[0_0_20px_#ff6b35] cursor-pointer"
                                                />
                                                <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover/bar:opacity-100 transition-all duration-300 bg-accent text-[10px] px-2 py-0.5 rounded-lg font-black text-white shadow-[0_10px_20px_rgba(255,107,53,0.4)] z-50 whitespace-nowrap border border-white/20">
                                                    ${v}.4k
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="space-y-6 pt-6 border-t border-white/[0.05]">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Growth_Index</span>
                                            <span className="text-emerald-400 font-black">+{stats.growth}%</span>
                                        </div>
                                        <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: '0%' }}
                                                animate={{ width: `${stats.growth * 2}%` }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                                className="absolute inset-0 bg-accent"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* REVENUE CHARTS (Area Chart Style) */}
                                <div className="bg-white/[0.03] border border-white/[0.08] rounded-[2.5rem] backdrop-blur-3xl p-8 flex-grow relative overflow-hidden group/chart">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-[11px] font-bold text-white/40 uppercase tracking-[0.4em]">Revenue Analytics</h3>
                                        <div className="flex gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                            <span className="text-[8px] font-black text-accent uppercase tracking-widest">Live_Tracking</span>
                                        </div>
                                    </div>

                                    <div
                                        className="bg-black/40 border border-white/5 rounded-2xl h-32 relative flex items-center justify-center cursor-crosshair overflow-hidden group/area"
                                        onMouseMove={(e) => {
                                            const rect = e.currentTarget.getBoundingClientRect()
                                            const x = ((e.clientX - rect.left) / rect.width) * 100
                                            setRevMouseX(x)
                                        }}
                                    >
                                        {/* Simulated Area Chart */}
                                        <svg className="w-full h-full p-2" viewBox="0 0 100 40" preserveAspectRatio="none">
                                            <defs>
                                                <linearGradient id="area-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                                                    <stop offset="0%" stopColor="#ff6b35" stopOpacity="0.4" />
                                                    <stop offset="100%" stopColor="#ff6b35" stopOpacity="0" />
                                                </linearGradient>
                                            </defs>

                                            <motion.path
                                                d="M 0 40 Q 10 20 20 30 T 40 10 T 60 25 T 80 15 T 100 20 L 100 40 L 0 40 Z"
                                                fill="url(#area-grad)"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            />
                                            <motion.path
                                                d="M 0 40 Q 10 20 20 30 T 40 10 T 60 25 T 80 15 T 100 20"
                                                stroke="#ff6b35"
                                                strokeWidth="1.5"
                                                fill="none"
                                                initial={{ pathLength: 0 }}
                                                animate={{ pathLength: 1 }}
                                                transition={{ duration: 2, ease: "easeInOut" }}
                                            />

                                            {/* Interactive Tracking Line */}
                                            <motion.line
                                                x1={revMouseX} y1="0" x2={revMouseX} y2="40"
                                                stroke="#ff6b35" strokeWidth="0.5"
                                                className="opacity-0 group-hover/area:opacity-100 transition-opacity"
                                            />
                                        </svg>

                                        {/* Dynamic Tooltip on Hover */}
                                        <div className="absolute inset-0 opacity-0 group-hover/area:opacity-100 transition-opacity pointer-events-none z-20">
                                            <div
                                                className="absolute bg-accent text-[10px] px-3 py-1 rounded-full font-black text-white shadow-[0_0_25px_#ff6b35] border border-white/20 flex items-center gap-2"
                                                style={{
                                                    left: `${revMouseX}%`,
                                                    top: '30%',
                                                    transform: 'translateX(-50%)'
                                                }}
                                            >
                                                <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                                                LIVE REVENUE: $84,204
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between mt-4 text-[8px] font-black text-white/20 uppercase tracking-widest">
                                        <span>Node_Alpha</span>
                                        <span className="text-accent/40">Real_Time_Stream</span>
                                        <span>Node_Omega</span>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* 4. Global Status Footer */}
                <div className="absolute bottom-0 left-0 right-0 h-14 bg-black/90 border-t border-accent/20 z-50 flex items-center px-10 backdrop-blur-xl">
                    <div className="flex gap-12">
                        <div className="flex items-center gap-3">
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Hardware_Link</span>
                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-[0.3em] flex items-center gap-2">
                                Stable
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            </span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Engine</span>
                            <span className="text-[9px] font-black text-white/60 uppercase tracking-[0.3em]">VORTEX_GCM_v2.4</span>
                        </div>
                    </div>
                    <div className="ml-auto flex items-center gap-8">
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">Security</span>
                            <div className={`px-3 py-1 rounded-full border text-[8px] font-black uppercase tracking-widest ${isVerified ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-accent/10 border-accent/20 text-accent'}`}>
                                {isVerified ? 'Hand_Auth_Clear' : 'Auth_Required'}
                            </div>
                        </div>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} className={`w-1 h-3 rounded-full ${i <= 4 ? 'bg-accent' : 'bg-white/10'}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>
    )
}

export default VortexPayDemo
