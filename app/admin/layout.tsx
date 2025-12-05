'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    LayoutDashboard,
    FileText,
    Users,
    FolderKanban,
    MessageSquare,
    MessageCircle,
    Image as ImageIcon,
    Newspaper,
    Sparkles,
    Settings,
    BarChart3,
    Globe,
    Layers,
    Menu as MenuIcon,
    Search,
    Bell,
    User,
    LogOut,
    ChevronDown,
    Star,
    Package,
} from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    {
        name: 'Content',
        icon: FileText,
        children: [
            { name: 'Pages', href: '/admin/pages', icon: FileText },
            { name: 'Blog', href: '/admin/blog', icon: Newspaper },
            { name: 'Media Library', href: '/admin/media', icon: ImageIcon },
        ]
    },
    {
        name: 'Site',
        icon: Globe,
        children: [
            { name: 'Components', href: '/admin/components', icon: Layers },
            { name: 'Navigation', href: '/admin/navigation', icon: MenuIcon },
            { name: 'Forms', href: '/admin/forms', icon: FileText },
        ]
    },
    {
        name: 'Business',
        icon: Users,
        children: [
            { name: 'Services', href: '/admin/services', icon: Package },
            { name: 'Clients', href: '/admin/clients', icon: Users },
            { name: 'Portfolio', href: '/admin/portfolio', icon: FolderKanban },
            { name: 'Testimonials', href: '/admin/testimonials', icon: Star },
            { name: 'Messages', href: '/admin/messages', icon: MessageSquare },
            { name: 'Live Chat', href: '/admin/chat', icon: MessageCircle },
        ]
    },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'SEO Tools', href: '/admin/seo', icon: Sparkles },
    { name: 'Settings', href: '/admin/settings/site', icon: Settings },
]

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [expandedGroups, setExpandedGroups] = useState<string[]>(['Content', 'Business', 'Site'])

    const toggleGroup = (groupName: string) => {
        setExpandedGroups(prev =>
            prev.includes(groupName)
                ? prev.filter(name => name !== groupName)
                : [...prev, groupName]
        )
    }

    const isActive = (href: string) => {
        if (href === '/admin') return pathname === '/admin'
        return pathname?.startsWith(href)
    }

    return (
        <div className="min-h-screen bg-background">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
                <div className="flex h-16 items-center gap-4 px-6">
                    {/* Mobile Menu Toggle */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="lg:hidden"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <MenuIcon className="h-5 w-5" />
                    </Button>

                    {/* Logo */}
                    <Link href="/admin" className="flex items-center gap-2 font-bold text-xl">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white">
                            <LayoutDashboard className="w-5 h-5" />
                        </div>
                        <span className="hidden sm:inline">BigWeb Admin</span>
                    </Link>

                    {/* Search */}
                    <div className="flex-1 max-w-md">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search..."
                                className="pl-9 bg-secondary/50"
                            />
                        </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="relative">
                            <Bell className="w-5 h-5" />
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-red-500">
                                3
                            </Badge>
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-semibold">
                                        A
                                    </div>
                                    <span className="hidden sm:inline">Admin</span>
                                    <ChevronDown className="w-4 h-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56">
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                    <User className="w-4 h-4 mr-2" />
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="w-4 h-4 mr-2" />
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-red-500">
                                    <LogOut className="w-4 h-4 mr-2" />
                                    Logout
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </header>

            <div className="flex">
                {/* Sidebar */}
                <aside
                    className={`
            fixed lg:sticky top-16 left-0 z-30 h-[calc(100vh-4rem)]
            w-64 border-r border-border bg-card
            transition-transform duration-300 ease-in-out
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
                >
                    <div className="h-full overflow-y-auto p-4 space-y-2">
                        {navigation.map((item) => (
                            <div key={item.name}>
                                {item.children ? (
                                    <div>
                                        <button
                                            onClick={() => toggleGroup(item.name)}
                                            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors text-sm font-medium"
                                        >
                                            <div className="flex items-center gap-3">
                                                <item.icon className="w-5 h-5" />
                                                <span>{item.name}</span>
                                            </div>
                                            <ChevronDown
                                                className={`w-4 h-4 transition-transform ${expandedGroups.includes(item.name) ? 'transform rotate-180' : ''
                                                    }`}
                                            />
                                        </button>
                                        <AnimatePresence>
                                            {expandedGroups.includes(item.name) && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="ml-4 mt-1 space-y-1 border-l-2 border-border pl-3">
                                                        {item.children.map((child) => (
                                                            <Link
                                                                key={child.href}
                                                                href={child.href}
                                                                className={`
                                  flex items-center gap-3 p-2 rounded-lg transition-colors text-sm
                                  ${isActive(child.href)
                                                                        ? 'bg-accent text-accent-foreground font-medium'
                                                                        : 'hover:bg-secondary text-muted-foreground'
                                                                    }
                                `}
                                                            >
                                                                <child.icon className="w-4 h-4" />
                                                                <span>{child.name}</span>
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                ) : (
                                    <Link
                                        href={item.href}
                                        className={`
                      flex items-center gap-3 p-3 rounded-lg transition-colors text-sm font-medium
                      ${isActive(item.href)
                                                ? 'bg-accent text-accent-foreground'
                                                : 'hover:bg-secondary'
                                            }
                    `}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        <span>{item.name}</span>
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Mobile Overlay */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 z-20 bg-black/50 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <main className="flex-1 overflow-x-hidden">
                    <div className="container mx-auto p-6 lg:p-8 max-w-[1600px]">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
