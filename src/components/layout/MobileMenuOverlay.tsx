'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Code, Smartphone, ShoppingCart, Palette, Search, BarChart, BarChart3, Brain, TrendingUp, Bot, Shield, Users, Mail, MapPin, Phone, Layers, RefreshCw, Zap, Terminal, GitBranch, Microscope, ShieldCheck, Cpu, Rocket, FlaskConical, Beaker } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import BrandLogo from '@/components/branding/BrandLogo'

import { useGlobalContent } from '@/context/GlobalContentContext'

// Centralized icon map for mobile
const iconMap: Record<string, any> = {
    Terminal, GitBranch, ShieldCheck, Cpu, Microscope, Search, Zap, Rocket, FlaskConical, Code, Smartphone, ShoppingCart, BarChart, BarChart3, Brain, TrendingUp, Bot, Shield, Users, Layers, RefreshCw, Beaker
};

interface MobileMenuOverlayProps {
    isOpen: boolean
    onClose: () => void
}

export default function MobileMenuOverlay({ isOpen, onClose }: MobileMenuOverlayProps) {
    const { navigation } = useGlobalContent();

    // Define the 5 core navigation items to match desktop
    const mobileNav = [
        { id: 'capabilities', label: 'Capabilities', url: '/services' },
        { id: 'engagements', label: 'Engagements', url: '/#offers' },
        { id: 'process', label: 'Process', url: '/process' },
        { id: 'evidence', label: 'Evidence', url: '/case-studies' },
        { id: 'contact', label: 'Contact', url: '/contact' }
    ];

    // Sub-items for quick links (Capabilities sub-set)
    const quickLinks = [
        { id: 'cap1', label: 'Engineering', icon: 'Code', url: '/services/web-development' },
        { id: 'cap2', label: 'Revenue Systems', icon: 'Cpu', url: '/services/revenue-systems' },
        { id: 'cap3', label: 'Funnel Arch', icon: 'GitBranch', url: '/services/funnel-architecture' },
        { id: 'cap4', label: 'The Lab™', icon: 'Microscope', url: '/services/conversion-optimization' }
    ];

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
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '100%', opacity: 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="fixed inset-0 z-[9999] bg-zinc-950/95 backdrop-blur-2xl flex flex-col md:hidden"
                >
                    {/* Background Dynamics */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] bg-[size:40px_40px] pointer-events-none" />
                    <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-accent/[0.08] to-transparent pointer-events-none" />

                    {/* Header */}
                    <div className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/5">
                        <BrandLogo className="h-7 w-auto" />
                        <button
                            onClick={onClose}
                            className="p-3 bg-white/[0.08] border border-white/10 rounded-full text-white active:scale-90 transition-all duration-200"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation Menu */}
                    <div className="flex-1 overflow-y-auto px-8 py-16 relative z-10 no-scrollbar">
                        <nav className="flex flex-col gap-12">
                            {mobileNav.map((item, i) => (
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
                                        className="group block py-4 border-b border-white/[0.06]"
                                    >
                                        <div className="text-5xl font-bold text-white group-active:text-accent-light transition-all duration-300 leading-tight tracking-tight">
                                            {item.label}
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Quick Capabilities */}
                        <div className="mt-20 pt-12 border-t border-white/[0.08] grid grid-cols-2 gap-5">
                            {quickLinks.map((service, i) => {
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
                                            className="flex flex-col gap-4 p-6 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/10 active:bg-white/[0.12] active:scale-95 transition-all duration-200"
                                        >
                                            <Icon className="w-6 h-6 text-accent-light" />
                                            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                                                {service.label}
                                            </span>
                                        </Link>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Action Footer */}
                    <div className="relative z-10 p-8 border-t border-white/[0.08] bg-black/50 backdrop-blur-xl">
                        <Button className="w-full h-20 text-xs font-bold bg-white text-black hover:bg-accent hover:text-white rounded-2xl uppercase tracking-[0.3em] transition-all duration-300 shadow-lg" asChild>
                            <Link href="/offers/revenue-roadmap" onClick={onClose}>
                                Revenue Roadmap <ArrowRight className="w-5 h-5 ml-4" />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
