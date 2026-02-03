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

const App = () => {
    const [isVerifying, setIsVerifying] = useState(false)
    const [trustScore, setTrustScore] = useState(98)
    const [activeModule, setActiveModule] = useState('Core')

    // Simulated Log Data
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
        <div className="relative w-full h-full flex overflow-hidden">
            <div className="prism-bg" />
            <div className="noise-overlay" />

            {/* --- Sidebar --- */}
            <aside className="w-80 h-full border-r border-white/5 bg-black/40 backdrop-blur-3xl flex flex-col p-8 relative z-20">
                <div className="flex items-center gap-4 mb-16">
                    <div className="w-12 h-12 glass-panel flex items-center justify-center">
                        <Command className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h1 className="text-sm font-black uppercase tracking-[0.4em]">Prism_ID</h1>
                        <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mt-1">v4.0.2 Stable</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-6">
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

                <div className="mt-auto pt-8 border-t border-white/5">
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-red-500/5 border border-red-500/10">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                        <div className="text-[10px] font-bold uppercase tracking-widest text-red-100">Zero_Leakage_Policy Active</div>
                    </div>
                </div>
            </aside>

            {/* --- Main Workspace --- */}
            <main className="flex-1 h-full flex flex-col relative">

                {/* Header Bar */}
                <header className="h-24 w-full border-b border-white/5 px-12 flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-12">
                        <div className="flex flex-col">
                            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Session_Status</span>
                            <div className="flex items-center gap-2">
                                <div className="status-dot" />
                                <span className="text-xs font-bold uppercase">Authorized_Admin</span>
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
                                placeholder="Search Identity Registry..."
                                className="bg-white/5 border border-white/10 rounded-full h-11 pl-12 pr-6 text-xs font-bold tracking-widest placeholder:text-gray-600 focus:outline-none focus:border-indigo-500/50 transition-all w-64"
                            />
                        </div>
                        <div className="w-11 h-11 rounded-full border border-white/10 p-0.5">
                            <div className="w-full h-full rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100" alt="Avatar" className="w-full h-full object-cover grayscale brightness-125" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 p-12 overflow-y-auto relative z-10">
                    <AnimatePresence mode="wait">
                        {activeModule === 'Core' && (
                            <motion.div
                                key="core"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="grid grid-cols-12 gap-12 h-full"
                            >
                                {/* Central Identity Pulse */}
                                <div className="col-span-12 lg:col-span-8 flex flex-col gap-12">
                                    <div className="glass-panel flex-1 relative flex flex-col items-center justify-center overflow-hidden p-20">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-pink-500/5 pointer-events-none" />

                                        {/* The Prism Interface */}
                                        <div className="relative w-80 h-80 mb-16">
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
                                                    scale: [1, 1.1, 1],
                                                } : {
                                                    rotate: 0,
                                                    scale: 1,
                                                }}
                                                transition={{ duration: 2, repeat: isVerifying ? Infinity : 0, ease: "linear" }}
                                                className="w-full h-full rounded-full border border-white/10 flex items-center justify-center bg-black/60 relative overflow-hidden"
                                            >
                                                {/* Scanning Line */}
                                                <AnimatePresence>
                                                    {isVerifying && (
                                                        <motion.div
                                                            initial={{ top: '-100%' }}
                                                            animate={{ top: '100%' }}
                                                            transition={{ duration: 1.5, repeat: Infinity }}
                                                            className="absolute left-0 w-full h-[2px] bg-indigo-500 shadow-[0_0_20px_var(--prism-indigo)] z-20"
                                                        />
                                                    )}
                                                </AnimatePresence>

                                                <Fingerprint className={`w-32 h-32 transition-all duration-700 ${isVerifying ? 'text-indigo-500 blur-sm flex scale-90' : 'text-gray-200'}`} />
                                            </motion.div>
                                        </div>

                                        <div className="text-center space-y-6 relative z-10">
                                            <h2 className="text-4xl font-black italic uppercase tracking-tighter">Initialize_Neural_Scan</h2>
                                            <p className="text-gray-500 max-w-sm mx-auto text-xs uppercase tracking-[0.2em] font-bold leading-relaxed">
                                                Secure biometric handshake required for high-fidelity data decryption.
                                            </p>

                                            <button
                                                onClick={handleVerify}
                                                disabled={isVerifying}
                                                className="magnetic-button mt-8 flex items-center gap-3 mx-auto"
                                            >
                                                {isVerifying ? 'Handshaking...' : 'Scan Biometrics'}
                                                <Fingerprint className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Bottom Stats Grid */}
                                    <div className="grid grid-cols-3 gap-8">
                                        {[
                                            { label: 'Trust_Index', val: trustScore + '%', color: 'text-indigo-400' },
                                            { label: 'Latency_Core', val: '4ms', color: 'text-gray-300' },
                                            { label: 'Auth_Method', val: 'Neural_V3', color: 'text-gray-300' },
                                        ].map((s, i) => (
                                            <div key={i} className="glass-panel p-8 text-center bg-white/[0.01]">
                                                <p className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] mb-3">{s.label}</p>
                                                <div className={`text-3xl font-black italic tracking-tighter ${s.color}`}>{s.val}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Analytics Sidebar */}
                                <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
                                    <div className="glass-panel p-10 flex-1 flex flex-col">
                                        <div className="flex items-center justify-between mb-8">
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-500">Live forensics</h3>
                                            <Activity className="w-4 h-4 text-gray-500 animate-pulse" />
                                        </div>

                                        <div className="space-y-6 flex-1">
                                            {logs.map((log) => (
                                                <div key={log.id} className="group cursor-pointer">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <span className={`text-[9px] font-black uppercase tracking-widest ${log.severity === 'high' ? 'text-red-500' : 'text-gray-500'}`}>
                                                            [{log.type}]
                                                        </span>
                                                        <span className="text-[9px] font-bold text-gray-700 tracking-widest">{log.time}</span>
                                                    </div>
                                                    <p className="text-[11px] font-bold text-gray-300 uppercase tracking-widest group-hover:text-white transition-colors">{log.message}</p>
                                                    <div className="h-[1px] w-full bg-white/5 mt-4" />
                                                </div>
                                            ))}
                                        </div>

                                        <button className="w-full py-4 border border-white/5 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] text-gray-500 hover:bg-white/5 hover:text-white transition-all mt-8">
                                            View Complete Logs
                                        </button>
                                    </div>

                                    <div className="glass-panel p-10 bg-gradient-to-br from-indigo-500/10 to-transparent relative overflow-hidden group">
                                        <Shield className="absolute -right-8 -bottom-8 w-48 h-48 opacity-[0.03] group-hover:scale-110 transition-transform duration-1000" />
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4">Security_Mesh</h3>
                                        <p className="text-xs text-gray-400 font-medium leading-relaxed mb-8">
                                            Your decentralized identity is currently protected by 4-node redundant orchestration across three continents.
                                        </p>
                                        <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                                            View Mesh Topology <ChevronRight className="w-3 h-3" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeModule !== 'Core' && (
                            <motion.div
                                key="placeholder"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex items-center justify-center h-full text-center"
                            >
                                <div className="space-y-6">
                                    <Database className="w-20 h-20 text-indigo-500/20 mx-auto" />
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-gray-700">Initializing_Module...</h3>
                                    <p className="text-xs text-gray-600 uppercase tracking-widest font-bold">Requesting shard decryption</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    )
}

export default App
