'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ArrowRight, BarChart3, Zap, Layers, RefreshCw, Code, Smartphone, ShoppingCart, Palette, Search, Brain, TrendingUp, Bot, Shield, Users, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import BrandLogo from '@/components/branding/BrandLogo'
import { useGlobalContent } from '@/context/GlobalContentContext'

const navItems = [
    {
        title: 'Services',
        href: '/services',
        description: 'Premium digital production services',
        items: [
            { title: 'Web Development', href: '/services/web-development', icon: Layers, desc: 'Enterprise-grade websites & apps' },
            { title: 'AI Automation', href: '/services/ai-automation', icon: Zap, desc: 'Agents & process automation' },
            { title: 'SEO Dominance', href: '/services/seo', icon: BarChart3, desc: 'Search engine authority' },
            { title: 'Advanced Analytics', href: '/services/analytics', icon: RefreshCw, desc: 'Data-driven insights' },
        ]
    },
    {
        title: 'Offers',
        href: '/#offers',
        description: 'Our core conversion products',
        items: [
            { title: 'Conversion Audit', href: '/offers/diagnostic', icon: BarChart3, desc: 'Entry-level analysis' },
            { title: 'Fix Sprint', href: '/offers/fix-sprint', icon: Zap, desc: 'Rapid critical fixes' },
            { title: 'Revenue System', href: '/offers/revenue-system', icon: Layers, desc: 'Full website rebuild' },
            { title: 'Optimization Retainer', href: '/offers/retainer', icon: RefreshCw, desc: 'Ongoing growth' },
        ]
    },
    { title: 'Process', href: '/process' },
    { title: 'Case Studies', href: '/case-studies' },
    { title: 'About', href: '/about' },
    { title: 'Contact', href: '/contact' },
]

export default function ConversionNavigation() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
    const { settings } = useGlobalContent()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                    isScrolled
                        ? "bg-black/90 backdrop-blur-md border-zinc-900 py-4"
                        : "bg-transparent border-transparent py-8"
                )}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group relative z-50">
                        <BrandLogo
                            variant={isScrolled ? "symbol" : "full"}
                            showIcon={isScrolled}
                            logoUrl={settings?.logo_url}
                            className={cn(
                                "transition-all duration-500",
                                isScrolled ? "h-8" : "h-10"
                            )}
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-12">
                        {navItems.map((item) => (
                            <div
                                key={item.title}
                                className="relative"
                                onMouseEnter={() => item.items && setActiveDropdown(item.title)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    href={item.href}
                                    className="text-[11px] font-mono font-bold uppercase tracking-[0.4em] text-zinc-500 hover:text-orange-600 transition-colors flex items-center gap-3 py-2"
                                >
                                    {item.title}
                                    {item.items && <ChevronDown className="w-3 h-3 opacity-30" />}
                                </Link>

                                {/* Dropdown */}
                                {item.items && (
                                    <AnimatePresence>
                                        {activeDropdown === item.title && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: 10 }}
                                                transition={{ duration: 0.2 }}
                                                className={cn(
                                                    "absolute top-full z-50 mt-4",
                                                    item.title === 'Services'
                                                        ? "-left-[300px] w-[900px]"
                                                        : "-left-4 w-[600px]"
                                                )}
                                            >
                                                <div className="bg-black border border-zinc-900 shadow-2xl p-10">
                                                    {item.title === 'Services' ? (
                                                        <div className="grid grid-cols-12 gap-8">
                                                            {/* Column 1: Engineering & Design */}
                                                            <div className="col-span-4 space-y-10">
                                                                <div>
                                                                    <h4 className="text-[10px] font-mono font-bold text-zinc-800 uppercase tracking-[0.6em] mb-8 flex items-center gap-3">
                                                                        <div className="w-4 h-px bg-zinc-900" />
                                                                        ENGINEERING_V1
                                                                    </h4>
                                                                    <div className="space-y-6">
                                                                        {[
                                                                            { title: 'The Revenue Engine™', href: '/services/web-development', icon: Code, desc: 'Enterprise_Core' },
                                                                            { title: 'The Pocket Empire™', href: '/services/mobile-apps', icon: Smartphone, desc: 'Mobile_Architecture' },
                                                                            { title: 'The Design System™', href: '/services/ui-ux-design', icon: Palette, desc: 'Visual_Logic' },
                                                                            { title: 'The Reliability Suite™', href: '/services/maintenance', icon: Shield, desc: 'Integrity_Protocols' },
                                                                        ].map((sub) => (
                                                                            <Link key={sub.title} href={sub.href} className="flex items-center gap-4 group/sub">
                                                                                <div className="w-10 h-10 bg-zinc-950 border border-zinc-900 flex items-center justify-center group-hover/sub:bg-orange-600 group-hover/sub:text-white transition-all duration-300 text-zinc-600">
                                                                                    <sub.icon className="w-4 h-4" />
                                                                                </div>
                                                                                <div className="space-y-1">
                                                                                    <div className="text-sm font-black text-white uppercase italic tracking-tighter group-hover/sub:text-orange-600 transition-colors leading-none">{sub.title}</div>
                                                                                    <div className="text-[9px] font-mono font-bold text-zinc-700 uppercase tracking-widest">{sub.desc}</div>
                                                                                </div>
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Column 2: Growth & Intelligence */}
                                                            <div className="col-span-4 space-y-10 border-l border-zinc-900 pl-10">
                                                                <div>
                                                                    <h4 className="text-[10px] font-mono font-bold text-zinc-800 uppercase tracking-[0.6em] mb-8 flex items-center gap-3">
                                                                        <div className="w-4 h-px bg-zinc-900" />
                                                                        INTELLIGENCE_V1
                                                                    </h4>
                                                                    <div className="space-y-6">
                                                                        {[
                                                                            { title: 'The Profit Autopilot™', href: '/services/ai-automation', icon: Bot, desc: 'AI_Synchronicity' },
                                                                            { title: 'The Authority System™', href: '/services/seo', icon: TrendingUp, desc: 'Visibility_Delta' },
                                                                            { title: 'The Intelligence Dashboard™', href: '/services/analytics', icon: BarChart3, desc: 'Data_Liquidity' },
                                                                            { title: 'The Speed Method™', href: '/services/optimization', icon: Zap, desc: 'Latency_Reduction' },
                                                                        ].map((sub) => (
                                                                            <Link key={sub.title} href={sub.href} className="flex items-center gap-4 group/sub">
                                                                                <div className="w-10 h-10 bg-zinc-950 border border-zinc-900 flex items-center justify-center group-hover/sub:bg-orange-600 group-hover/sub:text-white transition-all duration-300 text-zinc-600">
                                                                                    <sub.icon className="w-4 h-4" />
                                                                                </div>
                                                                                <div className="space-y-1">
                                                                                    <div className="text-sm font-black text-white uppercase italic tracking-tighter group-hover/sub:text-orange-600 transition-colors leading-none">{sub.title}</div>
                                                                                    <div className="text-[9px] font-mono font-bold text-zinc-700 uppercase tracking-widest">{sub.desc}</div>
                                                                                </div>
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            {/* Column 3: Featured */}
                                                            <div className="col-span-4">
                                                                <div className="h-full bg-zinc-950 border border-zinc-900 p-8 relative overflow-hidden group/feat">
                                                                    <div className="absolute top-0 right-0 bg-orange-600 text-white px-4 py-1 text-[9px] font-black uppercase tracking-widest">
                                                                        FLAGSHIP
                                                                    </div>
                                                                    <h4 className="text-[10px] font-mono font-bold text-zinc-600 uppercase tracking-[0.4em] mb-4">Featured_Product</h4>
                                                                    <div className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none mb-6">The Revenue <br /> Engine™</div>
                                                                    <p className="text-[11px] font-mono font-bold text-zinc-800 uppercase tracking-widest mb-10 leading-relaxed">Sub-2s performance, <br /> 3X conversion yield.</p>
                                                                    <Link href="/services/web-development">
                                                                        <Button className="w-full h-16 bg-orange-600 hover:bg-orange-500 text-white font-black text-xs uppercase tracking-[0.4em] rounded-none transition-all duration-300">
                                                                            EXPLORE_v1
                                                                            <ArrowRight className="ml-4 w-4 h-4" />
                                                                        </Button>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="grid grid-cols-2 gap-4">
                                                            {item.items.map((subItem, idx) => (
                                                                <Link
                                                                    key={subItem.title}
                                                                    href={subItem.href}
                                                                    className="group relative flex flex-col p-6 bg-zinc-950 border border-zinc-900 hover:border-orange-600 transition-all duration-300"
                                                                >
                                                                    <div className="flex items-center gap-4 mb-4">
                                                                        <div className="w-10 h-10 bg-black border border-zinc-900 flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors">
                                                                            <subItem.icon className="w-4 h-4 text-zinc-600 group-hover:text-white" />
                                                                        </div>
                                                                        <div className="text-sm font-black text-white uppercase italic tracking-tighter group-hover:text-orange-600 transition-colors">
                                                                            {subItem.title}
                                                                        </div>
                                                                    </div>
                                                                    <div className="text-[10px] font-mono font-bold text-zinc-700 uppercase tracking-widest leading-relaxed">
                                                                        {subItem.desc}
                                                                    </div>
                                                                    <div className="mt-4 flex items-center text-[9px] font-mono font-bold text-orange-600 uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-opacity">
                                                                        INITIALIZE_v1 <ArrowRight className="w-3 h-3 ml-2" />
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    )}

                                                    <div className="mt-8 pt-6 border-t border-zinc-900 flex items-center justify-between px-2">
                                                        <div className="text-[10px] text-zinc-800 font-mono font-bold uppercase tracking-[0.4em]">"Engineers, Not Artists."</div>
                                                        <Link href="/process" className="text-[10px] font-mono font-bold text-orange-600 hover:text-white uppercase tracking-[0.4em] transition-colors">
                                                            CORE_PROCESS_ARCHIVE
                                                        </Link>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* CTAs */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link href="/offers/diagnostic">
                            <Button className="bg-orange-600 hover:bg-orange-500 text-white font-black text-xs px-8 h-14 rounded-none uppercase tracking-[0.4em] transition-all duration-300">
                                START_DIAGNOSTIC_v1
                                <ArrowRight className="ml-4 w-4 h-4" />
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="fixed inset-x-0 top-[73px] bg-background border-b z-40 md:hidden overflow-hidden"
                    >
                        <div className="p-6 space-y-6">
                            {navItems.map((item) => (
                                <div key={item.title} className="space-y-3">
                                    <Link
                                        href={item.href}
                                        className="block text-lg font-semibold"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.title}
                                    </Link>
                                    {item.items && (
                                        <div className="pl-4 space-y-3 border-l-2 border-muted">
                                            {item.items.map((subItem) => (
                                                <Link
                                                    key={subItem.title}
                                                    href={subItem.href}
                                                    className="block text-sm text-muted-foreground hover:text-accent"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                >
                                                    {subItem.title}
                                                </Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <div className="pt-6 border-t border-border">
                                <Button className="w-full bg-accent hover:bg-accent/90" size="lg" asChild>
                                    <Link href="/offers/diagnostic" className="block">
                                        Start My Conversion Audit
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
