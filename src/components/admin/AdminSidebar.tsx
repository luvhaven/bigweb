'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Settings,
    Image,
    FileText,
    Layout,
    Users,
    Briefcase,
    DollarSign,
    Menu,
    Home,
    MessageSquare,
    BarChart
} from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: Home },
    { href: '/admin/settings', label: 'Site Settings', icon: Settings },
    { href: '/admin/heroes', label: 'Hero Sections', icon: Layout },
    { href: '/admin/services', label: 'Services', icon: Briefcase },
    { href: '/admin/pricing', label: 'Pricing', icon: DollarSign },
    { href: '/admin/media', label: 'Media Library', icon: Image },
    { href: '/admin/pages', label: 'Pages', icon: FileText },
    { href: '/admin/team', label: 'Team', icon: Users },
    { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart },
]

export default function AdminSidebar() {
    const pathname = usePathname()

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-border p-6 overflow-y-auto">
            <div className="mb-8">
                <Link href="/admin" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-bold">B</span>
                    </div>
                    <div>
                        <h2 className="font-bold">BigWeb CMS</h2>
                        <p className="text-xs text-muted-foreground">Admin Panel</p>
                    </div>
                </Link>
            </div>

            <nav className="space-y-1">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-accent text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    )
                })}
            </nav>

            <div className="mt-8 pt-8 border-t border-border">
                <Link
                    href="/"
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    <Home className="w-4 h-4" />
                    Back to Website
                </Link>
            </div>
        </aside>
    )
}
