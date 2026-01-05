'use client'

import { ReactNode, useEffect, useState, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { QueryProvider } from '@/providers/QueryProvider'
import { useAuth, AuthProvider } from '@/hooks/useAuth'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LayoutDashboard,
    Navigation,
    Image as ImageIcon,
    Briefcase,
    FolderKanban,
    Users,
    MessageSquare,
    Settings,
    ChevronRight,
    LogOut,
    Search,
    Bell,
    Moon,
    Sun,
    Menu,
    FileText,
    BarChart3
} from 'lucide-react'

// Sidebar Menu Configuration
const menuItems = [
    { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Navigation', href: '/admin/navigation', icon: Navigation },
    { label: 'Heroes', href: '/admin/heroes', icon: ImageIcon },
    { label: 'Services', href: '/admin/services', icon: Briefcase },
    { label: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { label: 'Team', href: '/admin/team', icon: Users },
    { label: 'Testimonials', href: '/admin/testimonials', icon: MessageSquare },
    { label: 'Leads', href: '/admin/leads', icon: FileText },
    { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { label: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <QueryProvider>
                <AdminLayoutContent>{children}</AdminLayoutContent>
            </QueryProvider>
        </AuthProvider>
    )
}

function AdminLayoutContent({ children }: { children: ReactNode }) {
    const { user, loading, signOut } = useAuth()
    const router = useRouter()
    const pathname = usePathname()
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [commandOpen, setCommandOpen] = useState(false)
    const searchInputRef = useRef<HTMLInputElement>(null)

    // Skip layout for login/debug pages
    const isAuthPage = pathname === '/admin/login' || pathname === '/admin/debug'

    // Auth redirect
    useEffect(() => {
        if (!loading && !isAuthPage && !user) {
            router.replace('/admin/login')
        }
    }, [user, loading, isAuthPage, router])

    // Handle Cmd+K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault()
                setCommandOpen(true)
            }
            if (e.key === 'Escape') setCommandOpen(false)
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    useEffect(() => {
        if (commandOpen && searchInputRef.current) {
            searchInputRef.current.focus()
        }
    }, [commandOpen])

    const handleSignOut = async () => {
        await signOut()
        router.push('/admin/login')
    }

    // Auth pages get minimal wrapper
    if (isAuthPage) {
        return <>{children}</>
    }

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500" />
            </div>
        )
    }

    // Not authenticated
    if (!user) {
        return null
    }

    return (
        <div className="min-h-screen bg-zinc-950">
            {/* Sidebar */}
            <motion.aside
                initial={{ width: 280 }}
                animate={{ width: sidebarOpen ? 280 : 80 }}
                transition={{ duration: 0.2 }}
                className="fixed left-0 top-0 h-full bg-zinc-900/95 backdrop-blur-xl border-r border-white/10 z-40 flex flex-col"
            >
                {/* Logo */}
                <div className="p-6 flex items-center gap-3 border-b border-white/10">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center shrink-0">
                        <span className="text-white font-bold text-lg">B</span>
                    </div>
                    <AnimatePresence>
                        {sidebarOpen && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="text-white font-bold text-xl"
                            >
                                BigWeb CMS
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/admin' && pathname.startsWith(item.href))
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group ${isActive
                                    ? 'bg-emerald-500/20 text-emerald-400'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <item.icon className="w-5 h-5 shrink-0" />
                                <AnimatePresence>
                                    {sidebarOpen && (
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            className="font-medium whitespace-nowrap"
                                        >
                                            {item.label}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                                {isActive && sidebarOpen && (
                                    <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                                )}
                            </Link>
                        )
                    })}
                </nav>

                {/* Footer */}
                <div className="p-4 border-t border-white/10 space-y-2">
                    <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full"
                    >
                        <LogOut className="w-5 h-5 shrink-0" />
                        {sidebarOpen && <span className="font-medium">Sign Out</span>}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <div
                className="transition-all duration-200"
                style={{ marginLeft: sidebarOpen ? 280 : 80 }}
            >
                {/* Top Header */}
                <header className="sticky top-0 z-30 bg-zinc-950/80 backdrop-blur-xl border-b border-white/10 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
                            >
                                <Menu className="w-5 h-5" />
                            </button>

                            {/* Command Search */}
                            <div
                                onClick={() => setCommandOpen(true)}
                                className="hidden md:flex items-center gap-3 px-4 py-2 bg-zinc-900 rounded-xl border border-white/10 cursor-pointer hover:border-white/20 transition-colors min-w-[300px]"
                            >
                                <Search className="w-4 h-4 text-zinc-500" />
                                <span className="text-zinc-500 text-sm">Quick search...</span>
                                <kbd className="ml-auto px-2 py-0.5 rounded bg-zinc-800 text-xs text-zinc-400 border border-white/10">
                                    ⌘K
                                </kbd>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors relative">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
                            </button>

                            {/* User Avatar */}
                            <div className="flex items-center gap-3 pl-3 border-l border-white/10">
                                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                                    <span className="text-white text-sm font-medium">
                                        {user?.email?.charAt(0).toUpperCase() || 'A'}
                                    </span>
                                </div>
                                <div className="hidden md:block">
                                    <p className="text-sm font-medium text-white">{user?.email?.split('@')[0]}</p>
                                    <p className="text-xs text-zinc-500">Administrator</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-6 min-h-[calc(100vh-80px)]">
                    {children}
                </main>
            </div>

            {/* Command Palette Modal */}
            <AnimatePresence>
                {commandOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center pt-[20vh]"
                        onClick={() => setCommandOpen(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-xl bg-zinc-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden"
                        >
                            <div className="p-4 border-b border-white/10 flex items-center gap-3">
                                <Search className="w-5 h-5 text-zinc-500" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    placeholder="Search pages, settings, or actions..."
                                    className="flex-1 bg-transparent text-white placeholder-zinc-500 outline-none"
                                />
                            </div>
                            <div className="p-2 max-h-[300px] overflow-y-auto">
                                {menuItems.map((item) => (
                                    <button
                                        key={item.href}
                                        onClick={() => {
                                            router.push(item.href)
                                            setCommandOpen(false)
                                        }}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span>{item.label}</span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
