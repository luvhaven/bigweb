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
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[9999] bg-[#000000] flex flex-col md:hidden"
                    style={{ backgroundColor: '#000000' }}
                >
                    {/* Background Noise & Gradient */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
                    <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-[#FF4D00]/10 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-[-20%] left-[-20%] w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[120px] pointer-events-none" />

                    {/* Header */}
                    <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/5">
                        <BrandLogo className="h-8 w-auto" />
                        <button
                            onClick={onClose}
                            className="p-2 bg-white/5 rounded-full hover:bg-white/10 transition-all text-white border border-white/10 active:scale-95"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 overflow-y-auto px-6 py-6 relative z-10 no-scrollbar flex flex-col min-h-[50vh]">
                        <nav className="flex flex-col gap-6 mb-8">
                            {navigation.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: 0.2 + (i * 0.05),
                                        duration: 0.5,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                    className="group"
                                >
                                    <Link
                                        href={item.url || '#'}
                                        onClick={onClose}
                                        className="block border-b border-white/5 pb-4"
                                    >
                                        <div className="text-[10px] font-bold text-zinc-500 mb-1 tracking-[0.2em] uppercase">
                                            {item.description || 'Section'}
                                        </div>
                                        <div className="text-3xl font-black text-white group-hover:text-[#FF4D00] transition-colors leading-tight uppercase italic">
                                            {item.label}
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        <div className="grid grid-cols-2 gap-3 pb-8">
                            {quickLinks.slice(0, 6).map((service, i) => {
                                const Icon = iconMap[service.icon || 'Code'] || Code;
                                return (
                                    <motion.div
                                        key={service.id}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 + (i * 0.05) }}
                                    >
                                        <Link
                                            href={service.url || '#'}
                                            onClick={onClose}
                                            className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 active:bg-white/10 transition-all"
                                        >
                                            <Icon className="w-4 h-4 text-[#FF4D00]" />
                                            <span className="text-[10px] font-black uppercase tracking-tight text-zinc-300">
                                                {service.label}
                                            </span>
                                        </Link>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Footer Services & Contact */}
                    <div className="relative z-10 px-6 py-6 border-t border-white/5 bg-[#0A0A0A]">
                        <div className="flex flex-col gap-4">
                            <Button className="w-full h-14 text-base font-black bg-[#FF4D00] text-white hover:bg-[#CC3D00] rounded-xl transition-all shadow-lg shadow-orange-900/40" asChild>
                                <Link href="/offers/revenue-roadmap" onClick={onClose} className="w-full">
                                    GET REVENUE ROADMAP ($500) <ArrowRight className="w-5 h-5 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
