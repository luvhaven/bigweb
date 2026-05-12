'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@/lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createBrowserClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push('/admin');
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-primary)' }}>
      <div style={{ width: '100%', maxWidth: 420, padding: 'var(--space-10)', background: 'var(--color-bg-secondary)', borderRadius: 2, border: '1px solid var(--color-bg-border)', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
        
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>
          <svg width="32" height="32" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ margin: '0 auto var(--space-4)' }}>
            <rect x="1" y="1" width="9" height="9" stroke="var(--color-gold-bright)" strokeWidth="1.5"/>
            <rect x="12" y="1" width="9" height="9" fill="var(--color-gold-bright)" opacity="0.8"/>
            <rect x="1" y="12" width="9" height="9" fill="var(--color-gold-bright)" opacity="0.4"/>
            <rect x="12" y="12" width="9" height="9" stroke="var(--color-gold-bright)" strokeWidth="1.5" strokeDasharray="2 2"/>
          </svg>
          <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 'var(--space-2)' }}>BIGWEB Admin</h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>Sign in to manage your digital presence</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
          
          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="form-input"
              placeholder="admin@bigweb.com"
              style={{ padding: 'var(--space-4)', background: 'var(--color-bg-tertiary)' }}
            />
          </div>
          
          <div>
            <label style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--color-text-tertiary)', marginBottom: 'var(--space-2)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="form-input"
              placeholder="••••••••"
              style={{ padding: 'var(--space-4)', background: 'var(--color-bg-tertiary)' }}
            />
          </div>

          {error && (
            <div style={{ padding: 'var(--space-3)', background: 'rgba(122, 42, 42, 0.1)', borderLeft: '2px solid var(--color-danger)', color: '#ff6b6b', fontSize: 'var(--text-sm)' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: 'var(--space-2)', justifyContent: 'center', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Authenticating...' : 'Secure Sign In'}
          </button>
        </form>
        
      </div>
    </div>
  );
}
