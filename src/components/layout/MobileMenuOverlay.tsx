'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Code, Smartphone, ShoppingCart, Palette, Search, BarChart, BarChart3, Brain, TrendingUp, Bot, Shield, Users, Mail, MapPin, Phone, Layers, RefreshCw, Zap, Terminal, GitBranch, Microscope, ShieldCheck, Cpu, Rocket, FlaskConical } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import BrandLogo from '@/components/branding/BrandLogo'

import { useGlobalContent } from '@/context/GlobalContentContext'

// Centralized icon map for mobile
const iconMap: Record<string, any> = {
    Terminal, GitBranch, ShieldCheck, Cpu, Microscope, Search, Zap, Rocket, FlaskConical, Code, Smartphone, ShoppingCart, BarChart, BarChart3, Brain, TrendingUp, Bot, Shield, Users, Layers, RefreshCw
};



interface MobileMenuOverlayProps {
    isOpen: boolean
    onClose: () => void
}

export default function MobileMenuOverlay({ isOpen, onClose }: MobileMenuOverlayProps) {
    const { navigation } = useGlobalContent();

    // Find sub-items for quick links (e.g. from Capabilities)
    const capabilities = navigation.find(n => n.label?.toLowerCase() === 'capabilities');
    const quickLinks = capabilities?.children || [];
    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => { document.body.style.overflow = 'unset' }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[9999] bg-black flex flex-col md:hidden"
                >
                    {/* Background Dynamics */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[size:40px_40px] pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-orange-500/10 to-transparent pointer-events-none" />

                    {/* Header */}
                    <div className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/5">
                        <BrandLogo className="h-7 w-auto" />
                        <button
                            onClick={onClose}
                            className="p-3 bg-zinc-950 border border-zinc-900 rounded-full text-white active:scale-90 transition-transform"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation Menu */}
                    <div className="flex-1 overflow-y-auto px-8 py-12 relative z-10 no-scrollbar">
                        <nav className="flex flex-col gap-12">
                            {navigation.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: 0.1 + (i * 0.08),
                                        duration: 0.8,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                >
                                    <Link
                                        href={item.url || '#'}
                                        onClick={onClose}
                                        className="group block"
                                    >
                                        <div className="text-[10px] font-mono font-black text-zinc-600 mb-2 uppercase tracking-[0.4em]">
                                            Module_0{i + 1}
                                        </div>
                                        <div className="text-5xl font-black text-white group-active:text-orange-500 transition-colors leading-[0.85] uppercase tracking-tighter-extreme">
                                            {item.label}
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Quick Capabilities */}
                        <div className="mt-20 pt-10 border-t border-white/5 grid grid-cols-2 gap-4">
                            {quickLinks.slice(0, 4).map((service, i) => {
                                const Icon = iconMap[service.icon || 'Code'] || Code;
                                return (
                                    <motion.div
                                        key={service.id}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.6 + (i * 0.1) }}
                                    >
                                        <Link
                                            href={service.url || '#'}
                                            onClick={onClose}
                                            className="flex flex-col gap-3 p-5 rounded-2xl bg-zinc-950 border border-zinc-900 active:bg-zinc-900 transition-all"
                                        >
                                            <Icon className="w-5 h-5 text-orange-600" />
                                            <span className="text-[9px] font-mono font-black uppercase tracking-widest text-zinc-500">
                                                {service.label}
                                            </span>
                                        </Link>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Action Footer */}
                    <div className="relative z-10 p-8 border-t border-white/5 bg-black">
                        <Button className="w-full h-20 text-xs font-black bg-white text-black hover:bg-orange-600 hover:text-white rounded-none uppercase tracking-[0.4em] transition-all" asChild>
                            <Link href="/offers/revenue-roadmap" onClick={onClose}>
                                INITIALIZE ROADMAP <ArrowRight className="w-5 h-5 ml-4" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
