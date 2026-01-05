'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, Code, Smartphone, ShoppingCart, Palette, Search, BarChart, Brain, TrendingUp, Bot, Shield, Users, Mail, MapPin, Phone } from 'lucide-react'
import Link from 'next/link'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import BrandLogo from '@/components/branding/BrandLogo'

// Menu Data
const mainLinks = [
    { name: "Services", path: "/services/web-development", sub: "What we do" },
    { name: "Portfolio", path: "/portfolio", sub: "Our best work" },
    { name: "About", path: "/about", sub: "Who we are" },
    { name: "Careers", path: "/careers", sub: "Join the team" },
    { name: "Blog", path: "/blog", sub: "Insights & News" },
]

const services = [
    { name: "Web Development", path: "/services/web-development", icon: Code, color: "text-blue-500" },
    { name: "Mobile Apps", path: "/services/mobile-apps", icon: Smartphone, color: "text-purple-500" },
    { name: "AI Solutions", path: "/ai-boost", icon: Brain, color: "text-emerald-500" },
    { name: "Growth & SEO", path: "/services/seo-growth", icon: TrendingUp, color: "text-orange-500" },
]

interface MobileMenuOverlayProps {
    isOpen: boolean
    onClose: () => void
}

export default function MobileMenuOverlay({ isOpen, onClose }: MobileMenuOverlayProps) {
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
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[9999] bg-[#030303]/90 backdrop-blur-3xl flex flex-col md:hidden"
                >
                    {/* Background Noise & Gradient */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
                    <div className="absolute top-[-20%] right-[-20%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
                    <div className="absolute bottom-[-20%] left-[-20%] w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none" />

                    {/* Header */}
                    <div className="relative z-10 flex items-center justify-between px-6 py-6 border-b border-white/5">
                        <BrandLogo className="h-9 w-auto" />
                        <button
                            onClick={onClose}
                            className="p-3 bg-white/5 rounded-full hover:bg-white/10 transition-all text-white border border-white/10"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 overflow-y-auto px-6 py-8 relative z-10 no-scrollbar flex flex-col justify-center min-h-[60vh]">
                        <nav className="flex flex-col gap-8">
                            {mainLinks.map((item, i) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        delay: 0.1 + (i * 0.1),
                                        duration: 0.6,
                                        ease: [0.22, 1, 0.36, 1]
                                    }}
                                    className="group"
                                >
                                    <Link
                                        href={item.path}
                                        onClick={onClose}
                                        className="block"
                                    >
                                        <div className="text-sm font-medium text-zinc-500 mb-1 tracking-widest uppercase opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                                            {item.sub}
                                        </div>
                                        <div className="text-5xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-zinc-400 transition-all leading-tight">
                                            {item.name}
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>
                    </div>

                    {/* Footer Services & Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="relative z-10 px-6 py-8 border-t border-white/5 bg-[#0A0A0A]/50 backdrop-blur-md"
                    >
                        <div className="grid grid-cols-2 gap-4 mb-8">
                            {services.map((service) => {
                                const Icon = service.icon
                                return (
                                    <Link
                                        key={service.name}
                                        href={service.path}
                                        onClick={onClose}
                                        className="flex items-center gap-3 group"
                                    >
                                        <div className={`w-8 h-8 rounded mt-1 flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors ${service.color}`}>
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <span className="text-zinc-400 text-sm font-medium group-hover:text-white transition-colors">
                                            {service.name}
                                        </span>
                                    </Link>
                                )
                            })}
                        </div>

                        <div className="flex flex-col gap-4">
                            <Link href="/contact" onClick={onClose} className="w-full">
                                <Button className="w-full h-14 text-lg font-bold bg-white text-black hover:bg-zinc-200 rounded-full transition-all">
                                    Start a Project <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>

                            <div className="flex justify-between items-center text-zinc-500 text-xs mt-2 px-2">
                                <span>© 2026 BigWeb Digital</span>
                                <div className="flex gap-4">
                                    <Link href="/privacy" className="hover:text-white">Privacy</Link>
                                    <Link href="/terms" className="hover:text-white">Terms</Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
