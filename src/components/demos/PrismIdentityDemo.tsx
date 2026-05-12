'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Shield,
    Lock,
    User,
    Activity,
    Fingerprint,
    Globe,
    Database,
    Zap,
    ShieldCheck,
    Command,
    ChevronRight,
    Search,
    AlertCircle
} from 'lucide-react'

// --- Types ---
interface IdentityLog {
    id: string;
    type: 'auth' | 'vault' | 'mesh';
    message: string;
    time: string;
    severity: 'low' | 'med' | 'high';
}

const PrismIdentityDemo = () => {
    const [isVerifying, setIsVerifying] = useState(false)
    const [trustScore, setTrustScore] = useState(98)
    const [activeModule, setActiveModule] = useState('Core')

    const [logs, setLogs] = useState<IdentityLog[]>([
        { id: '1', type: 'auth', message: 'Neural handshake complete', time: '14:32:10', severity: 'low' },
        { id: '2', type: 'mesh', message: 'Nodes synchronized in US-East-1', time: '14:30:05', severity: 'low' },
        { id: '3', type: 'vault', message: 'Encrypted shard accessed securely', time: '14:28:44', severity: 'med' },
    ])

    const handleVerify = () => {
        setIsVerifying(true)
        setTimeout(() => {
            setIsVerifying(false)
            setTrustScore(prev => Math.min(100, prev + 1))
        }, 2500)
    }

    return (
        <div className="w-full max-w-7xl mx-auto rounded-[3rem] overflow-hidden border border-white/5 bg-black shadow-2xl h-[720px] relative font-sans text-white">
            {/* --- Scoped Styles --- */}
            <style jsx>{`
        .prism-bg-scoped {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 30%, rgba(99, 102, 241, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 80% 70%, rgba(236, 72, 153, 0.08) 0%, transparent 40%);
          pointer-events: none;
          z-index: 1;
        }
        .noise-overlay-scoped {
          position: absolute;
          inset: 0;
          background: url('https://grainy-gradients.vercel.app/noise.svg');
          opacity: 0.04;
          pointer-events: none;
          z-index: 20;
        }
        .glass-panel-scoped {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
        }
        .magnetic-button-scoped {
          all: unset;
          cursor: pointer;
          padding: 12px 32px;
          background: #ffffff;
          color: #000000;
          font-weight: 900;
          text-transform: uppercase;
          font-size: 11px;
          letter-spacing: 0.2em;
          border-radius: 100px;
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .magnetic-button-scoped:hover {
          transform: scale(1.05);
          box-shadow: 0 0 40px rgba(255, 255, 255, 0.2);
        }
        .status-dot-scoped {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #06b6d4;
          box-shadow: 0 0 15px #06b6d4;
        }
      `}</style>

            <div className="prism-bg-scoped" />
            <div className="noise-overlay-scoped" />

            <div className="flex h-full relative z-10">
                {/* --- Sidebar --- */}
                <aside className="w-80 h-full border-r border-white/10 bg-black/60 backdrop-blur-3xl flex flex-col p-8 shrink-0">
                    <div className="flex items-center gap-4 mb-16">
                        <div className="w-12 h-12 glass-panel-scoped flex items-center justify-center">
                            <Command className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-sm font-black uppercase tracking-[0.4em]">Prism_ID</h1>
                            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">v4.0.2 Stable</p>
                        </div>
                    </div>

                    <nav className="flex-1 space-y-4">
                        <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-4">Registry_Systems</div>
                        {[
                            { id: 'Core', icon: Zap, label: 'Central Core' },
                            { id: 'Vault', icon: Database, label: 'Encrypted Vault' },
                            { id: 'Mesh', icon: Globe, label: 'Identity Mesh' },
                            { id: 'Compliance', icon: ShieldCheck, label: 'Governance' },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveModule(item.id)}
                                className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-500 relative group ${activeModule === item.id ? 'bg-white/5 text-white' : 'text-gray-500 hover:text-gray-300'}`}
                            >
                                <item.icon className={`w-5 h-5 ${activeModule === item.id ? 'text-indigo-400' : 'text-gray-500'}`} />
                                <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
                                {activeModule === item.id && <motion.div layoutId="nav-glow" className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-full" />}
                                <ChevronRight className="ml-auto w-4 h-4 opacity-0 group-hover:opacity-40 transition-opacity" />
                            </button>
                        ))}
                    </nav>

                    <div className="mt-auto pt-8 border-t border-white/10">
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                            <div className="text-[10px] font-bold uppercase tracking-widest text-red-100">Zero_Leakage_Policy</div>
                        </div>
                    </div>
                </aside>

                {/* --- Main Workspace --- */}
                <main className="flex-1 flex flex-col">
                    {/* Header Bar */}
                    <header className="h-24 w-full border-b border-white/10 px-12 flex items-center justify-between">
                        <div className="flex items-center gap-12">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Session_Status</span>
                                <div className="flex items-center gap-2">
                                    <div className="status-dot-scoped" />
                                    <span className="text-xs font-bold uppercase tracking-tighter">Authorized_Admin</span>
                                </div>
                            </div>

                            <div className="h-8 w-[1px] bg-white/10" />

                            <div className="flex flex-col">
                                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Neural_Fidelity</span>
                                <span className="text-xs font-bold uppercase text-indigo-400">99.88% Accurate</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="text"
                                    placeholder="Registry search..."
                                    className="bg-white/5 border border-white/10 rounded-full h-11 pl-12 pr-6 text-[10px] font-bold tracking-widest focus:outline-none focus:border-indigo-500/50 transition-all w-48"
                                />
                            </div>
                            <div className="w-10 h-10 rounded-full border border-white/10 p-0.5">
                                <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 overflow-hidden">
                                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" alt="Avatar" className="w-full h-full object-cover grayscale brightness-125" />
                                </div>
                            </div>
                        </div>
                    </header>

                    {/* Content Area */}
                    <div className="flex-1 p-12 overflow-y-auto bg-black/20">
                        <AnimatePresence mode="wait">
                            {activeModule === 'Core' && (
                                <motion.div
                                    key="core"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="grid grid-cols-12 gap-12 h-full"
                                >
                                    <div className="col-span-12 lg:col-span-8 flex flex-col gap-8">
                                        <div className="glass-panel-scoped flex-1 relative flex flex-col items-center justify-center overflow-hidden p-12">
                                            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-pink-500/5 pointer-events-none" />

                                            {/* The Prism Interface */}
                                            <div className="relative w-64 h-64 mb-12">
                                                <AnimatePresence>
                                                    {isVerifying && (
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.8 }}
                                                            animate={{ opacity: 1, scale: 1.2 }}
                                                            exit={{ opacity: 0, scale: 1.5 }}
                                                            className="absolute inset-0 border-2 border-indigo-500 rounded-full blur-2xl"
                                                        />
                                                    )}
                                                </AnimatePresence>

                                                <motion.div
                                                    animate={isVerifying ? {
                                                        rotate: 360,
                                                        scale: [1, 1.05, 1],
                                                    } : {
                                                        rotate: 0,
                                                        scale: 1,
                                                    }}
                                                    className="w-full h-full rounded-full border border-white/10 flex items-center justify-center bg-black/60 relative overflow-hidden"
                                                >
                                                    <AnimatePresence>
                                                        {isVerifying && (
                                                            <motion.div
                                                                initial={{ top: '-100%' }}
                                                                animate={{ top: '100%' }}
                                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                                className="absolute left-0 w-full h-[2px] bg-indigo-500 shadow-[0_0_20px_#6366f1] z-20"
                                                            />
                                                        )}
                                                    </AnimatePresence>
                                                    <Fingerprint className={`w-24 h-24 transition-all duration-700 ${isVerifying ? 'text-indigo-500 blur-sm scale-90' : 'text-gray-200'}`} />
                                                </motion.div>
                                            </div>

                                            <div className="text-center space-y-4">
                                                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-white">Neural_Scan</h2>
                                                <button
                                                    onClick={handleVerify}
                                                    disabled={isVerifying}
                                                    className="magnetic-button-scoped mt-4 flex items-center gap-3 mx-auto"
                                                >
                                                    {isVerifying ? 'Verifying...' : 'Initialize Scan'}
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-3 gap-6">
                                            {[
                                                { label: 'Trust_Index', val: trustScore + '%', color: 'text-indigo-400' },
                                                { label: 'Latency', val: '4ms', color: 'text-gray-300' },
                                                { label: 'Auth_Node', val: 'Neural_V3', color: 'text-gray-300' },
                                            ].map((s, i) => (
                                                <div key={i} className="glass-panel-scoped p-8 text-center">
                                                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-2">{s.label}</p>
                                                    <div className={`text-2xl font-black italic tracking-tighter ${s.color}`}>{s.val}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
                                        <div className="glass-panel-scoped p-8 flex-1 flex flex-col overflow-hidden">
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500 mb-8 flex items-center gap-2">
                                                <Activity className="w-4 h-4" /> Live Forensics
                                            </h3>
                                            <div className="space-y-6 flex-1 overflow-y-auto pr-2">
                                                {logs.map((log) => (
                                                    <div key={log.id} className="pb-6 border-b border-white/5 last:border-0">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className={`text-[8px] font-black uppercase tracking-widest ${log.severity === 'high' ? 'text-red-500' : 'text-gray-500'}`}>
                                                                [{log.type}]
                                                            </span>
                                                            <span className="text-[8px] font-bold text-gray-700">{log.time}</span>
                                                        </div>
                                                        <p className="text-[10px] font-bold text-gray-300 tracking-wide uppercase">{log.message}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            {activeModule !== 'Core' && (
                                <motion.div
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex flex-col items-center justify-center h-full text-center space-y-6"
                                >
                                    <Database className="w-16 h-16 text-indigo-500/20" />
                                    <h3 className="text-xl font-black italic uppercase tracking-tighter text-gray-600">Requesting shard decryption...</h3>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default PrismIdentityDemo
