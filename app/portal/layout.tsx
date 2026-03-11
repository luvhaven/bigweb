import { ReactNode } from 'react'
import Link from 'next/link'
import { LayoutDashboard, FileText, CreditCard, Settings, MessageSquare, LogOut } from 'lucide-react'
import BrandLogo from '@/components/branding/BrandLogo'

const PORTAL_NAV = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/portal' },
    { label: 'Projects', icon: FileText, href: '/portal/projects' },
    { label: 'Billing', icon: CreditCard, href: '/portal/billing' },
    { label: 'Messages', icon: MessageSquare, href: '/portal/messages' },
    { label: 'Settings', icon: Settings, href: '/portal/settings' },
]

export default function PortalLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-[#020202] text-white flex select-none">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/[0.05] bg-[#050505] flex flex-col justify-between hidden md:flex sticky top-0 h-screen">
                <div>
                    <div className="p-8 pb-12 border-b border-white/[0.05]">
                        <BrandLogo variant="full" />
                        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] rounded-full border border-white/[0.05] text-[10px] font-mono tracking-widest text-zinc-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            CLIENT PORTAL
                        </div>
                    </div>

                    <nav className="p-4 space-y-1">
                        {PORTAL_NAV.map((item) => (
                            <Link
                                key={item.label}
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/[0.03] transition-colors group"
                            >
                                <item.icon className="w-4 h-4 text-zinc-500 group-hover:text-accent transition-colors" />
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>

                <div className="p-4 border-t border-white/[0.05]">
                    <button className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors group">
                        <LogOut className="w-4 h-4 text-zinc-500 group-hover:text-red-400 transition-colors" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-h-screen overflow-y-auto">
                <header className="h-20 border-b border-white/[0.05] bg-[#050505]/80 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between px-8">
                    <h1 className="text-xl font-bold tracking-tight">Welcome back, Meridian Labs</h1>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent to-accent-light border border-white/[0.1] shadow-[0_0_15px_rgba(255,107,53,0.3)]" />
                </header>
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    )
}
