'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LayoutDashboard,
    FileText,
    FolderKanban,
    MessageSquare,
    Users,
    BarChart3,
    Settings,
    LogOut,
    ChevronDown,
    Menu,
    X,
    Bell,
    Search,
    Sparkles,
    Image as ImageIcon,
    Star,
    Mail,
    Newspaper,
    Briefcase
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { supabase } from '@/utils/supabase'
import { QueryProvider } from '@/providers/QueryProvider'
import { cn } from '@/lib/utils'

// Navigation structure
const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    {
        name: 'Content',
        icon: FileText,
        children: [
            { name: 'Services', href: '/admin/services', icon: Briefcase },
            { name: 'Portfolio', href: '/admin/portfolio', icon: FolderKanban },
            { name: 'Testimonials', href: '/admin/testimonials', icon: Star },
            { name: 'Blog', href: '/admin/blog', icon: Newspaper },
            { name: 'Media', href: '/admin/media', icon: ImageIcon },
        ]
    },
    {
        name: 'Communication',
        icon: MessageSquare,
        children: [
            { name: 'Live Chat', href: '/admin/chat', icon: MessageSquare },
            { name: 'Contacts', href: '/admin/contacts', icon: Mail },
            { name: 'Clients', href: '/admin/clients', icon: Users },
        ]
    },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'SEO Tools', href: '/admin/seo', icon: Sparkles },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [expandedGroups, setExpandedGroups] = useState<string[]>(['Content', 'Communication'])
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const pathname = usePathname()
    const router = useRouter()

    // Skip auth check for login page
    const isLoginPage = pathname === '/admin/login'

    useEffect(() => {
        if (isLoginPage) {
            setLoading(false)
            return
        }

        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
                router.push('/admin/login')
                return
            }
            setUser(session.user)
            setLoading(false)
        }

        checkAuth()

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                router.push('/admin/login')
            } else if (session) {
                setUser(session.user)
            }
        })

        return () => subscription.unsubscribe()
    }, [router, isLoginPage])

    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.push('/admin/login')
    }

    const toggleGroup = (groupName: string) => {
        setExpandedGroups(prev =>
            prev.includes(groupName)
                ? prev.filter(g => g !== groupName)
                : [...prev, groupName]
        )
    }

    const isActive = (href: string) => {
        if (href === '/admin') return pathname === '/admin'
        return pathname.startsWith(href)
    }

    // Render login page without layout
    if (isLoginPage) {
        return <QueryProvider>{children}</QueryProvider>
    }

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    return (
        <QueryProvider>
            <div className="min-h-screen bg-zinc-950">
                {/* Mobile sidebar overlay */}
                <AnimatePresence>
                    {sidebarOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                        />
                    )}
                </AnimatePresence>

                {/* Sidebar */}
                <aside className={cn(
                    'fixed top-0 left-0 z-50 h-full w-64 bg-zinc-900/95 backdrop-blur-xl border-r border-zinc-800 transition-transform duration-300 lg:translate-x-0',
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                )}>
                    {/* Logo */}
                    <div className="h-16 flex items-center justify-between px-4 border-b border-zinc-800">
                        <Link href="/admin" className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                                <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold text-white">BIGWEB</span>
                        </Link>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-2 text-zinc-400 hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Navigation */}
                    <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
                        {navigation.map((item) => (
                            <div key={item.name}>
                                {item.children ? (
                                    <>
                                        <button
                                            onClick={() => toggleGroup(item.name)}
                                            className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon className="w-5 h-5" />
                                                {item.name}
                                            </div>
                                            <ChevronDown className={cn(
                                                'w-4 h-4 transition-transform',
                                                expandedGroups.includes(item.name) && 'rotate-180'
                                            )} />
                                        </button>
                                        <AnimatePresence>
                                            {expandedGroups.includes(item.name) && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden ml-4 mt-1 space-y-1"
                                                >
                                                    {item.children.map((child) => (
                                                        <Link
                                                            key={child.href}
                                                            href={child.href}
                                                            className={cn(
                                                                'flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors',
                                                                isActive(child.href)
                                                                    ? 'bg-emerald-500/10 text-emerald-500 font-medium'
                                                                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                                            )}
                                                        >
                                                            <child.icon className="w-4 h-4" />
                                                            {child.name}
                                                        </Link>
                                                    ))}
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors',
                                            isActive(item.href)
                                                ? 'bg-emerald-500/10 text-emerald-500'
                                                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                        )}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {item.name}
                                    </Link>
                                )}
                            </div>
                        ))}
                    </nav>
                </aside>

                {/* Main content */}
                <div className="lg:pl-64">
                    {/* Header */}
                    <header className="sticky top-0 z-30 h-16 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800">
                        <div className="flex items-center justify-between h-full px-4">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setSidebarOpen(true)}
                                    className="lg:hidden p-2 text-zinc-400 hover:text-white"
                                >
                                    <Menu className="w-5 h-5" />
                                </button>

                                <div className="hidden md:flex items-center gap-2 bg-zinc-800/50 rounded-lg px-3 py-2 w-64">
                                    <Search className="w-4 h-4 text-zinc-500" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        className="bg-transparent text-sm text-white placeholder:text-zinc-500 focus:outline-none flex-1"
                                    />
                                    <kbd className="hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border border-zinc-700 bg-zinc-800 px-1.5 font-mono text-[10px] font-medium text-zinc-400">
                                        ⌘K
                                    </kbd>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                {/* Notifications */}
                                <Button variant="ghost" size="icon" className="relative text-zinc-400 hover:text-white">
                                    <Bell className="w-5 h-5" />
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
                                </Button>

                                {/* User menu */}
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="flex items-center gap-2 px-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={user?.user_metadata?.avatar_url} />
                                                <AvatarFallback className="bg-emerald-500/20 text-emerald-500">
                                                    {user?.email?.charAt(0).toUpperCase() || 'A'}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="hidden md:block text-sm text-zinc-300">
                                                {user?.email?.split('@')[0] || 'Admin'}
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56 bg-zinc-900 border-zinc-800">
                                        <DropdownMenuLabel className="text-zinc-400">My Account</DropdownMenuLabel>
                                        <DropdownMenuSeparator className="bg-zinc-800" />
                                        <DropdownMenuItem className="text-zinc-300 focus:bg-zinc-800 focus:text-white cursor-pointer">
                                            <Settings className="w-4 h-4 mr-2" />
                                            Settings
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={handleSignOut}
                                            className="text-red-400 focus:bg-red-500/10 focus:text-red-400 cursor-pointer"
                                        >
                                            <LogOut className="w-4 h-4 mr-2" />
                                            Sign out
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </header>

                    {/* Page content */}
                    <main className="p-6">
                        {children}
                    </main>
                </div>
            </div>
        </QueryProvider>
    )
}
