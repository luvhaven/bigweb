'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, RotateCw, Lock, Search, Plus, X, Shield, Star, MoreHorizontal } from 'lucide-react'
import { ReactNode } from 'react'

interface BrowserWindowProps {
    children: ReactNode
    url?: string
    title?: string
    onClose?: () => void
}

export default function BrowserWindow({ children, url = "https://techcorp.platform/dashboard", title = "TechCorp - Enterprise Dashboard", onClose }: BrowserWindowProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full max-w-[1400px] max-h-[900px] flex flex-col rounded-xl overflow-hidden shadow-2xl border border-white/10 bg-[#0F111A]"
        >
            {/* Browser Toolbar (Glassmorphism) */}
            <div className="h-12 bg-[#1e1e1e]/80 backdrop-blur-xl flex items-center px-4 border-b border-white/5 gap-4 shrink-0 relative z-50">
                {/* Traffic Lights */}
                <div className="flex items-center gap-2 group mr-2">
                    <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#FF5F56] hover:brightness-90 flex items-center justify-center text-[8px] text-black/50 transition-all shadow-inner">
                        <X className="w-2 h-2 opacity-0 group-hover:opacity-100" />
                    </button>
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:brightness-90 shadow-inner" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] hover:brightness-90 shadow-inner" />
                </div>

                {/* Navigation Controls */}
                <div className="flex items-center gap-3 text-slate-400">
                    <button className="hover:text-white transition-colors"><ArrowLeft className="w-4 h-4" /></button>
                    <button className="hover:text-white transition-colors"><ArrowRight className="w-4 h-4" /></button>
                    <button className="hover:text-white transition-colors"><RotateCw className="w-3.5 h-3.5" /></button>
                </div>

                {/* Address Bar */}
                <div className="flex-1 max-w-3xl mx-auto">
                    <div className="h-8 bg-[#000000]/20 hover:bg-[#000000]/30 transition-colors rounded-lg flex items-center px-3 text-xs text-slate-400 gap-3 border border-white/5 shadow-inner group">
                        <Lock className="w-3 h-3 text-emerald-500" />
                        <span className="flex-1 font-mono text-slate-300 selection:bg-blue-500/30">{url}</span>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Star className="w-3 h-3 hover:text-yellow-400 cursor-pointer" />
                        </div>
                    </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-4 text-slate-400">
                    <div className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-white/5 transition-colors cursor-pointer">
                        <Shield className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium hidden sm:block">Secure</span>
                    </div>
                    <button className="hover:text-white transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 bg-[#0F111A] relative overflow-hidden isolate">
                {children}
            </div>
        </motion.div>
    )
}
