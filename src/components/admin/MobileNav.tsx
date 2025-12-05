
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FolderKanban, MessageSquare, Settings } from 'lucide-react';

export default function MobileNav() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/10 z-50 pb-safe">
            <div className="flex justify-around items-center h-16">
                <NavLink href="/admin" icon={LayoutDashboard} label="Home" active={isActive('/admin')} />
                <NavLink href="/admin/projects" icon={FolderKanban} label="Projects" active={isActive('/admin/projects')} />
                <NavLink href="/admin/chat" icon={MessageSquare} label="Chat" active={isActive('/admin/chat')} />
                <NavLink href="/admin/settings" icon={Settings} label="Settings" active={isActive('/admin/settings')} />
            </div>
        </div>
    );
}

function NavLink({ href, icon: Icon, label, active }: any) {
    return (
        <Link
            href={href}
            className={`flex flex-col items-center gap-1 p-2 transition-colors ${active ? 'text-emerald-400' : 'text-white/40 hover:text-white/60'}`}
        >
            <Icon className="w-6 h-6" strokeWidth={active ? 2.5 : 2} />
            <span className="text-[10px] font-medium">{label}</span>
        </Link>
    );
}
