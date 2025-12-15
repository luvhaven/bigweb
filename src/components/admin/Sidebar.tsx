'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LayoutDashboard,
    FileText,
    FolderKanban,
    BookOpen,
    Star,
    Image,
    Users,
    Mail,
    MessagesSquare,
    BarChart3,
    Settings,
    Search,
    Menu,
    X,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Bell
} from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import BrandLogo from '@/components/branding/BrandLogo'

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
    { icon: FileText, label: 'Services', href: '/admin/services' },
    { icon: FolderKanban, label: 'Portfolio', href: '/admin/portfolio' }, // Updated to match folder structure
    { icon: BookOpen, label: 'Blog', href: '/admin/blog' },
    { icon: Star, label: 'Testimonials', href: '/admin/testimonials' },
    { icon: Image, label: 'Media', href: '/admin/media' },
    { icon: Users, label: 'Clients', href: '/admin/clients' },
    { icon: Mail, label: 'Contacts', href: '/admin/contacts' },
    { icon: MessagesSquare, label: 'Chat', href: '/admin/chat' },
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
    }

    return (
        <>
            {/* Mobile Menu Button - Only visible on mobile */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileOpen(true)}
                    className="bg-card border border-border shadow-sm"
                >
                    <Menu className="w-5 h-5" />
                </Button>
            </div>

            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setMobileOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: 'spring', damping: 20 }}
                            className="fixed inset-y-0 left-0 w-72 bg-card border-r border-border z-50 lg:hidden flex flex-col"
                        >
                            <div className="p-6 flex items-center justify-between border-b border-border">
                                <BrandLogo />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                                {menuItems.map((item) => {
                                    const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setMobileOpen(false)}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                                ? 'bg-primary/10 text-primary font-medium'
                                                : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                                }`}
                                        >
                                            <item.icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
                                            <span>{item.label}</span>
                                        </Link>
                                    )
                                })}
                            </nav>

                            <div className="p-4 border-t border-border">
                                <div className="flex items-center gap-3 px-4 py-3 mb-2">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                                        {profile?.name?.[0] || 'A'}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-sm font-medium truncate">{profile?.name || 'Admin'}</p>
                                        <p className="text-xs text-muted-foreground truncate capitalize">{profile?.role || 'User'}</p>
                                    </div>
                                </div>
                                <Button
                                    variant="outline"
                                    className="w-full justify-start gap-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20"
                                    onClick={handleSignOut}
                                >
                                    <LogOut className="w-4 h-4" />
                                    Sign Out
                                </Button>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <aside
                className={`hidden lg:flex flex-col border-r border-border bg-card transition-all duration-300 relative ${collapsed ? 'w-20' : 'w-72'
                    }`}
            >
                <div className={`p-6 border-b border-border flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
                    {!collapsed && <BrandLogo />}
                    {collapsed && (
                        <div className="w-8 h-8 rounded-lg bg-primary/20" />
                    )}
                </div>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute -right-3 top-20 bg-card border border-border rounded-full w-6 h-6 shadow-sm z-10 hover:bg-secondary hidden lg:flex"
                >
                    {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
                </Button>

                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-hide">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative ${isActive
                                    ? 'bg-primary/10 text-primary font-medium'
                                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                                    } ${collapsed ? 'justify-center' : ''}`}
                                title={collapsed ? item.label : undefined}
                            >
                                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-primary' : ''}`} />
                                {!collapsed && <span>{item.label}</span>}

                                {collapsed && (
                                    <div className="absolute left-14 bg-popover text-popover-foreground px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-md border border-border">
                                        {item.label}
                                    </div>
                                )}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-border">
                    <div className={`flex items-center gap-3 px-2 py-2 mb-2 ${collapsed ? 'justify-center' : ''}`}>
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex-shrink-0 flex items-center justify-center text-primary font-bold">
                            {profile?.name?.[0] || 'A'}
                        </div>
                        {!collapsed && (
                            <div className="overflow-hidden min-w-0">
                                <p className="text-sm font-medium truncate">{profile?.name || 'Admin'}</p>
                                <p className="text-xs text-muted-foreground truncate capitalize">{profile?.role || 'User'}</p>
                            </div>
                        )}
                    </div>
                    <Button
                        variant="outline"
                        size={collapsed ? 'icon' : 'default'}
                        className={`w-full text-muted-foreground hover:text-red-500 hover:bg-red-500/10 hover:border-red-500/20 ${collapsed ? 'justify-center' : 'justify-start gap-2'}`}
                        onClick={handleSignOut}
                        title={collapsed ? 'Sign Out' : undefined}
                    >
                        <LogOut className="w-4 h-4" />
                        {!collapsed && 'Sign Out'}
                    </Button>
                </div>
            </aside>
        </>
    )
}
