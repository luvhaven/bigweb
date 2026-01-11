'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, ArrowRight, BarChart3, Zap, Layers, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import BrandLogo from '@/components/branding/BrandLogo'

const navItems = [
    {
        title: 'Offers',
        href: '#offers', // Anchor link for single page feel or /services if separate
        description: 'Our core conversion products',
        items: [
            { title: 'Conversion Diagnostic', href: '/offers/diagnostic', icon: BarChart3, desc: 'Entry-level analysis' },
            { title: 'Fix Sprint', href: '/offers/fix-sprint', icon: Zap, desc: 'Rapid critical fixes' },
            { title: 'Revenue System', href: '/offers/revenue-system', icon: Layers, desc: 'Full website rebuild' },
            { title: 'Optimization Retainer', href: '/offers/retainer', icon: RefreshCw, desc: 'Ongoing growth' },
        ]
    },
    { title: 'How It Works', href: '/process' },
    { title: 'Case Studies', href: '/case-studies' },
    { title: 'About', href: '/about' },
    { title: 'Blog', href: '/blog' },
    { title: 'Contact', href: '/contact' },
]

export default function ConversionNavigation() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

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
                        ? "bg-background/80 backdrop-blur-md border-border/50 py-3"
                        : "bg-transparent border-transparent py-5"
                )}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center group relative z-50">
                        <BrandLogo
                            variant={isScrolled ? "symbol" : "full"}
                            className={cn(
                                "transition-all duration-500",
                                isScrolled ? "h-8" : "h-10"
                            )}
                        />
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <div
                                key={item.title}
                                className="relative"
                                onMouseEnter={() => item.items && setActiveDropdown(item.title)}
                                onMouseLeave={() => setActiveDropdown(null)}
                            >
                                <Link
                                    href={item.href}
                                    className="text-sm font-medium hover:text-accent transition-colors flex items-center gap-1 py-2"
                                >
                                    {item.title}
                                    {item.items && <ChevronDown className="w-4 h-4" />}
                                </Link>

                                {/* Dropdown */}
                                {item.items && (
                                    <AnimatePresence>
                                        {activeDropdown === item.title && (
                                            <motion.div
                                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute top-full -left-4 w-[600px] bg-popover/95 backdrop-blur-2xl border border-border rounded-2xl shadow-2xl p-6 mt-2 z-50"
                                            >
                                                <div className="grid grid-cols-2 gap-4">
                                                    {item.items.map((subItem) => (
                                                        <Link
                                                            key={subItem.title}
                                                            href={subItem.href}
                                                            className="group relative flex flex-col p-4 rounded-xl bg-background/40 hover:bg-accent/5 border border-border/50 hover:border-accent/30 transition-all duration-300"
                                                        >
                                                            <div className="flex items-center gap-3 mb-3">
                                                                <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent group-hover:text-white transition-colors">
                                                                    <subItem.icon className="w-4 h-4 text-accent group-hover:text-white" />
                                                                </div>
                                                                <div className="text-sm font-bold group-hover:text-accent transition-colors">
                                                                    {subItem.title}
                                                                </div>
                                                            </div>
                                                            <div className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                                                {subItem.desc}
                                                            </div>
                                                            <div className="mt-4 flex items-center text-[10px] font-bold text-accent uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                                                Learn More <ArrowRight className="w-3 h-3 ml-1" />
                                                            </div>
                                                        </Link>
                                                    ))}
                                                </div>
                                                <div className="mt-4 pt-4 border-t border-border/50 flex items-center justify-between px-2">
                                                    <div className="text-[10px] text-muted-foreground font-medium italic">"Engineers, Not Artists."</div>
                                                    <Link href="/process" className="text-[10px] font-bold text-accent hover:underline uppercase tracking-widest">
                                                        View Our Protocol
                                                    </Link>
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
                            <Button className="bg-accent hover:bg-accent/90 text-white shadow-lg shadow-accent/20">
                                Start Diagnostic
                                <ArrowRight className="w-4 h-4 ml-2" />
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
                                <Link href="/offers/diagnostic" className="block">
                                    <Button className="w-full bg-accent hover:bg-accent/90" size="lg">
                                        Start Conversion Diagnostic
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
