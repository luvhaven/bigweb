'use client'

import { ReactNode, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { QueryProvider } from '@/providers/QueryProvider'
import AdminSidebar from '@/components/admin/Sidebar'
import { useAuth } from '@/hooks/useAuth'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Search } from 'lucide-react'

export default function AdminLayout({ children }: { children: ReactNode }) {
    const { user, profile, loading } = useAuth()
    const router = useRouter()
    const pathname = usePathname()

    // Skip layout for login page
    const isLoginPage = pathname === '/admin/login'

    useEffect(() => {
        // If not loading and no user, redirect to login
        if (!loading && !isLoginPage && !user) {
            router.replace('/admin/login')
        }
        // If loaded, user exists, but no profile (or not active/admin), handle accordingly
        // For now, we assume if they can login to Supabase they have access, 
        // but ideally we check profile.role here.
    }, [user, loading, isLoginPage, router])

    if (isLoginPage) {
        return <QueryProvider>{children}</QueryProvider>
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!user) {
        return null // Will redirect in useEffect
    }

    return (
        <QueryProvider>
            <div className="min-h-screen bg-background flex">
                <AdminSidebar />

                <main className="flex-1 min-w-0 transition-all duration-300">
                    {/* Top Bar - specific to page context if needed, or generic */}
                    <header className="sticky top-0 z-30 h-16 bg-background/80 backdrop-blur-xl border-b border-border px-6 flex items-center justify-between lg:justify-end">
                        <div className="flex items-center gap-4">
                            <div className="relative hidden md:block">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="h-10 pl-9 pr-4 rounded-full bg-secondary/50 border-none focus:ring-1 focus:ring-primary w-64 text-sm"
                                />
                            </div>
                            <button className="relative p-2 text-muted-foreground hover:text-foreground">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                            </button>
                        </div>
                    </header>

                    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
                        {children}
                    </div>
                </main>
            </div>
        </QueryProvider>
    )
}
