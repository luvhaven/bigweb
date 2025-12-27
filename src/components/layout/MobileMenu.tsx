'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, Code, Smartphone, ShoppingCart, Palette, Search, BarChart, Brain, TrendingUp, Bot, Shield, Users, ArrowRight, Menu } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import BrandLogo from '@/components/branding/BrandLogo'

// Services Data (Duplicated from AdvancedNavigation to be self-contained or could be imported)
const services = [
    { name: "Web Development", path: "/services/web-development", icon: Code, color: "text-blue-500", bgColor: "bg-blue-500/10" },
    { name: "Mobile Apps", path: "/services/mobile-apps", icon: Smartphone, color: "text-purple-500", bgColor: "bg-purple-500/10" },
    { name: "E-Commerce", path: "/services/ecommerce", icon: ShoppingCart, color: "text-orange-500", bgColor: "bg-orange-500/10" },
    { name: "UI/UX Design", path: "/services/ui-ux-design", icon: Palette, color: "text-green-500", bgColor: "bg-green-500/10" },
    { name: "SEO & Growth", path: "/services/seo-growth", icon: Search, color: "text-yellow-500", bgColor: "bg-yellow-500/10" },
    { name: "Analytics", path: "/services/analytics", icon: BarChart, color: "text-cyan-500", bgColor: "bg-cyan-500/10" },
    { name: "AI Consulting", path: "/services/ai-consulting", icon: Brain, color: "text-violet-500", bgColor: "bg-violet-500/10" },
    { name: "CRO", path: "/services/conversion-optimization", icon: TrendingUp, color: "text-red-500", bgColor: "bg-red-500/10" },
    { name: "GAIO", path: "/services/gaio", icon: Bot, color: "text-indigo-500", bgColor: "bg-indigo-500/10" },
    { name: "Staff Augmentation", path: "/services/staff-augmentation", icon: Users, color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
    { name: "Maintenance", path: "/services/maintenance", icon: Shield, color: "text-zinc-500", bgColor: "bg-zinc-500/10" },
]

const menuItems = [
    { name: "About", path: "/about" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Blog", path: "/blog" },
    { name: "Careers", path: "/careers" },
    { name: "Estimator", path: "/estimator" },
]

interface MobileMenuProps {
    isOpen: boolean
    onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
    // Lock body scroll
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
            document.body.style.position = 'fixed'
            document.body.style.width = '100%'
        } else {
            document.body.style.overflow = 'unset'
            document.body.style.position = 'unset'
            document.body.style.width = 'auto'
        }
        return () => {
            document.body.style.overflow = 'unset'
            document.body.style.position = 'unset'
            document.body.style.width = 'auto'
        }
    }, [isOpen])

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] md:hidden"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#0A0A0A] border-l border-white/10 z-[9999] md:hidden shadow-2xl flex flex-col h-[100dvh]"
                    >
                        {/* Noise Texture */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

                        {/* Header */}
                        <div className="relative z-10 flex items-center justify-between p-6 border-b border-white/10 shrink-0">
                            <BrandLogo className="h-8 w-auto" />
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Scrollable Content */}
                        <div className="relative z-10 flex-1 overflow-y-auto p-6 space-y-8 no-scrollbar">

                            {/* Primary Navigation */}
                            <nav className="flex flex-col gap-4">
                                {menuItems.map((item, i) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 + (i * 0.05) }}
                                    >
                                        <Link
                                            href={item.path}
                                            onClick={onClose}
                                            className="text-3xl font-bold text-white hover:text-accent transition-colors block"
                                        >
                                            {item.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <hr className="border-white/10" />

                            {/* Services Grid */}
                            <div>
                                <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Code className="w-3 h-3" /> Services
                                </h3>
                                <div className="grid grid-cols-1 gap-2">
                                    {services.map((service, i) => {
                                        const Icon = service.icon
                                        return (
                                            <motion.div
                                                key={service.name}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 + (i * 0.03) }}
                                            >
                                                <Link
                                                    href={service.path}
                                                    onClick={onClose}
                                                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                                                >
                                                    <div className={`w-8 h-8 rounded-md ${service.bgColor} flex items-center justify-center ${service.color} group-hover:bg-opacity-20 transition-all`}>
                                                        <Icon className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-zinc-300 font-medium group-hover:text-white transition-colors">
                                                        {service.name}
                                                    </span>
                                                </Link>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Footer / CTA */}
                        <div className="relative z-10 p-6 border-t border-white/10 bg-[#0A0A0A]/50 shrink-0 safe-area-bottom">
                            <Link href="/contact" onClick={onClose}>
                                <Button className="w-full h-12 text-lg font-bold bg-gradient-to-r from-accent to-purple-600 rounded-xl shadow-lg shadow-accent/20">
                                    Start Project
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    )
}
