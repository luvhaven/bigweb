import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Lock } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import LiquidGradient from '@/components/ui/LiquidGradient';

export const metadata: Metadata = {
  title: 'Client Portal — BIGWEB Digital',
  description: 'Secure access to the BIGWEB Revenue Engine client dashboard.',
  robots: {
    index: false,
    follow: false,
  }
};

export default function ClientPortalPage() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', background: 'var(--color-bg-primary)' }}>
      <LiquidGradient />
      
      <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 10 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          <ArrowLeft size={14} /> Return to Public Site
        </Link>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center' }}>
        <AnimateIn>
          <div style={{
            width: '100%',
            maxWidth: '440px',
            background: 'rgba(8, 7, 6, 0.6)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(212, 175, 106, 0.1)',
            borderRadius: '24px',
            padding: 'var(--space-12)',
            boxShadow: '0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.02) inset'
          }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-6)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(212, 175, 106, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(212, 175, 106, 0.2)' }}>
                <Lock size={20} color="var(--color-gold-bright)" />
              </div>
            </div>

            <h1 style={{ textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: 'var(--text-3xl)', fontWeight: 600, marginBottom: 'var(--space-2)' }}>
              Client Access
            </h1>
            <p style={{ textAlign: 'center', color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-8)' }}>
              BIGWEB Revenue Engine
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div>
                <label style={{ display: 'block', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>Access Key</label>
                <input 
                  type="password" 
                  placeholder="••••••••••••••••"
                  style={{
                    width: '100%',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    padding: '14px 16px',
                    borderRadius: '8px',
                    color: 'var(--color-text-primary)',
                    fontFamily: 'monospace',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>
              <button 
                type="button"
                className="btn btn-primary"
                style={{ width: '100%', marginTop: 'var(--space-4)', padding: '16px' }}
              >
                Authenticate
              </button>
            </div>

            <div style={{ marginTop: 'var(--space-8)', textAlign: 'center' }}>
              <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Secure Environment — Authorized Personnel Only
              </p>
            </div>
          </div>
        </AnimateIn>
      </div>
    </div>
  );
}
