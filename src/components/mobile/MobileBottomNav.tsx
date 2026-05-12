'use client'

import { Home, Grid, Briefcase, Phone, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Services', path: '/services', icon: Grid },
    { name: 'Work', path: '/portfolio', icon: Briefcase },
    { name: 'About', path: '/about', icon: User },
    { name: 'Contact', path: '/contact', icon: Phone },
]

export default function MobileBottomNav() {
    const pathname = usePathname()
    const [isVisible, setIsVisible] = useState(true)
    const [lastScrollY, setLastScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY

            // Show on scroll up, hide on scroll down (unless at top)
            if (currentScrollY < 10) {
                setIsVisible(true)
            } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }

            setLastScrollY(currentScrollY)
        }

        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [lastScrollY])

    return (
        <motion.div
            initial={{ y: 100 }}
            animate={{ y: isVisible ? 0 : 100 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-bottom bg-background/80 backdrop-blur-xl border-t border-white/10"
        >
            <nav className="flex items-center justify-around px-2 py-3">
                {navItems.map((item) => {
                    const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path))
                    const Icon = item.icon

                    return (
                        <Link key={item.path} href={item.path} className="relative group">
                            <div className="flex flex-col items-center gap-1 p-2 touch-target">
                                <div className="relative">
                                    <Icon
                                        className={`w-6 h-6 transition-colors duration-300 ${isActive ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground'
                                            }`}
                                    />
                                    {isActive && (
                                        <motion.div
                                            layoutId="bottomNavIndicator"
                                            className="absolute -inset-2 bg-accent/10 rounded-full -z-10"
                                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                </div>
                                <span className={`text-[10px] font-medium transition-colors duration-300 ${isActive ? 'text-accent' : 'text-muted-foreground group-hover:text-foreground'
                                    }`}>
                                    {item.name}
                                </span>
                            </div>
                        </Link>
                    )
                })}
            </nav>
        </motion.div>
    )
}
