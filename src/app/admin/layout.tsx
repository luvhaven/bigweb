'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@/lib/supabase';
import { LayoutDashboard, Users, Mail, Briefcase, FolderOpen, FileText, MessageSquare, Settings, LogOut, Menu, X, BarChart, UserSquare2 } from 'lucide-react';
import { ToastProvider } from '@/components/admin/ToastProvider';

const NAV_ITEMS = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart },
  { href: '/admin/leads', label: 'Leads', icon: Users },
  { href: '/admin/subscribers', label: 'Subscribers', icon: Mail },
  { href: '/admin/services', label: 'Services', icon: Briefcase },
  { href: '/admin/case-studies', label: 'Case Studies', icon: FolderOpen },
  { href: '/admin/articles', label: 'Articles', icon: FileText },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
  { href: '/admin/team', label: 'Team Members', icon: UserSquare2 },
  { href: '/admin/settings', label: 'Site Settings', icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Skip auth check on login page
  const isLoginPage = pathname === '/admin/login';

  const checkAuth = useCallback(async () => {
    if (isLoginPage) { setChecking(false); return; }
    const supabase = createBrowserClient();
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/admin/login');
    } else {
      setAuthenticated(true);
    }
    setChecking(false);
  }, [isLoginPage, router]);

  useEffect(() => { checkAuth(); }, [checkAuth]);

  async function handleLogout() {
    const supabase = createBrowserClient();
    await supabase.auth.signOut();
    router.push('/admin/login');
  }

  // Login page gets no layout
  if (isLoginPage) return <>{children}</>;

  if (checking) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0A0A0B', color: '#9B9793' }}>
        Loading...
      </div>
    );
  }

  if (!authenticated) return null;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0A0A0B' }}>
      {/* Sidebar */}
      <aside style={{
        width: 240, background: '#111114', borderRight: '1px solid #262630', padding: '20px 0',
        display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, height: '100vh', zIndex: 100,
        transform: sidebarOpen ? 'translateX(0)' : undefined,
      }} className="admin-sidebar">
        <div style={{ padding: '0 20px 20px', borderBottom: '1px solid #262630', marginBottom: 8 }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="20" height="20" viewBox="0 0 22 22" fill="none">
              <rect x="1" y="1" width="9" height="9" stroke="#D4AF6A" strokeWidth="1.5"/>
              <rect x="12" y="1" width="9" height="9" fill="#D4AF6A" opacity="0.8"/>
              <rect x="1" y="12" width="9" height="9" fill="#D4AF6A" opacity="0.4"/>
              <rect x="12" y="12" width="9" height="9" stroke="#D4AF6A" strokeWidth="1.5" strokeDasharray="2 2"/>
            </svg>
            <span style={{ color: '#F2F0EB', fontWeight: 700, fontSize: 14 }}>BIGWEB Admin</span>
          </Link>
        </div>

        <nav style={{ flex: 1, padding: '0 8px' }}>
          {NAV_ITEMS.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 6, marginBottom: 2,
                  textDecoration: 'none', fontSize: 13, fontWeight: 500, transition: 'all 0.15s',
                  color: isActive ? '#D4AF6A' : '#9B9793',
                  background: isActive ? 'rgba(212,175,106,0.08)' : 'transparent',
                }}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '12px 8px', borderTop: '1px solid #262630' }}>
          <button
            onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 6, border: 'none', background: 'transparent', color: '#5A5753', fontSize: 13, fontWeight: 500, cursor: 'pointer', width: '100%' }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="admin-mobile-toggle"
        style={{ position: 'fixed', top: 16, left: 16, zIndex: 200, background: '#111114', border: '1px solid #262630', borderRadius: 8, padding: 8, color: '#F2F0EB', cursor: 'pointer', display: 'none' }}
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Main content */}
      <main style={{ marginLeft: 240, flex: 1, padding: '32px 40px', minHeight: '100vh' }} className="admin-main">
        <ToastProvider>
          {children}
        </ToastProvider>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar { transform: ${sidebarOpen ? 'translateX(0)' : 'translateX(-100%)'} !important; transition: transform 0.25s ease; }
          .admin-main { margin-left: 0 !important; padding: 24px 16px !important; }
          .admin-mobile-toggle { display: block !important; }
        }
      `}</style>
    </div>
  );
}
