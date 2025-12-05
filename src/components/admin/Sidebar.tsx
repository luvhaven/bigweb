'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LayoutDashboard,
    FileText,
    Image,
    Users,
    FolderKanban,
    MessageSquare,
    BarChart3,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Bell,
    Search,
    Menu,
    X,
    BookOpen,
    Presentation,
    Mail,
    MessagesSquare
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import BrandLogo from '@/components/branding/BrandLogo'

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: Presentation, label: 'Hero', href: '/admin/hero' },
    { icon: BookOpen, label: 'Blog', href: '/admin/blog' },
    { icon: FileText, label: 'Pages', href: '/admin/pages' },
    { icon: FolderKanban, label: 'Projects', href: '/admin/projects' },
    { icon: Users, label: 'Clients', href: '/admin/clients' },
    { icon: Mail, label: 'Contacts', href: '/admin/contacts' },
    { icon: MessagesSquare, label: 'Chat', href: '/admin/chat' },
    { icon: Image, label: 'Media', href: '/admin/media' },
    { icon: MessageSquare, label: 'Messages', href: '/admin/messages' },
    { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
]

export default function AdminSidebar() {
    const pathname = usePathname()
    const { profile, signOut } = useAuth()
    const [collapsed, setCollapsed] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    const handleSignOut = async () => {
        await signOut()
        window.location.href = '/admin/login'
    }

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 rounded-lg bg-card border border-border flex items-center justify-center"
            >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setMobileOpen(false)}
                        className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{
                    width: collapsed ? '80px' : '280px',
                    x: mobileOpen ? 0 : '-100%'
                }}
                className={`
          fixed lg:sticky top-0 left-0 h-screen bg-card border-r border-border z-40
          flex flex-col transition-all duration-300
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
            >
                {/* Header */}
                <div className="h-16 border-b border-border flex items-center justify-between px-4">
                    {!collapsed && (
                        <Link href="/admin" className="flex items-center gap-2">
                            <BrandLogo className="h-8 w-auto text-foreground" />
                        </Link>
                    )}

                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="hidden lg:flex w-8 h-8 rounded-lg hover:bg-secondary items-center justify-center"
                    >
                        {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    </button>
                </div>

                {/* User Profile */}
                <div className="p-4 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-purple-500 flex items-center justify-center text-white font-semibold">
                            {profile?.full_name?.charAt(0) || 'A'}
                        </div>
                        {!collapsed && (
                            <div className="flex-1 min-w-0">
                                <p className="font-medium truncate">{profile?.full_name || 'Admin'}</p>
                                <p className="text-xs text-muted-foreground capitalize">{profile?.role}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
                        const Icon = item.icon

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setMobileOpen(false)}
                                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all
                  ${isActive
                                        ? 'bg-accent text-white'
                                        : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                                    }
                  ${collapsed ? 'justify-center' : ''}
                `}
                            >
                                <Icon className="w-5 h-5 flex-shrink-0" />
                                {!collapsed && <span className="font-medium">{item.label}</span>}
                                {isActive && !collapsed && (
                                    <motion.div
                                        layoutId="activeIndicator"
                                        className="ml-auto w-1.5 h-1.5 rounded-full bg-white"
                                    />
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-border space-y-2">
                    <button
                        onClick={handleSignOut}
                        className={`
              flex items-center gap-3 px-3 py-2.5 rounded-lg w-full
              hover:bg-red-500/10 text-red-500 transition-all
              ${collapsed ? 'justify-center' : ''}
            `}
                    >
                        <LogOut className="w-5 h-5" />
                        {!collapsed && <span className="font-medium">Sign Out</span>}
                    </button>
                </div>
            </motion.aside>
        </>
    )
}
