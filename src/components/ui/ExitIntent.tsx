'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, BookOpen, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ExitIntent() {
  const [show, setShow] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if they already saw it this session
    if (sessionStorage.getItem('bigweb_exit_intent')) {
      setHasTriggered(true);
      return;
    }

    const handleMouseLeave = (e: MouseEvent) => {
      // If mouse leaves top of screen (indicating going to address bar/tabs to exit)
      if (e.clientY <= 0 && !hasTriggered) {
        setShow(true);
        setHasTriggered(true);
        sessionStorage.setItem('bigweb_exit_intent', 'true');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasTriggered]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Exit Intent Playbook' })
      });
      
      // Successfully captured, route to playbook
      setShow(false);
      router.push('/playbook?access=granted');
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(8, 7, 6, 0.8)',
            backdropFilter: 'blur(16px)',
            padding: 'var(--space-4)'
          }}
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            style={{
              width: '100%',
              maxWidth: '600px',
              background: 'var(--color-bg-primary)',
              borderRadius: '24px',
              border: '1px solid var(--color-gold-muted)',
              overflow: 'hidden',
              boxShadow: '0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset'
            }}
          >
            <div style={{ padding: 'var(--space-8)', position: 'relative' }}>
              <button 
                onClick={() => setShow(false)}
                style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', color: 'var(--color-text-secondary)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(212, 175, 106, 0.1)', color: 'var(--color-gold-bright)', borderRadius: '20px', fontSize: '12px', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 'var(--space-6)' }}>
                <BookOpen size={14} /> Free Masterclass
              </div>
              <h2 style={{ fontSize: 'var(--text-3xl)', fontFamily: 'var(--font-display)', fontWeight: 600, marginBottom: 'var(--space-4)', lineHeight: 1.1 }}>
                Not ready for a full engagement?
              </h2>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-lg)', lineHeight: 1.6, marginBottom: 'var(--space-8)' }}>
                Download the exact <span style={{ color: 'var(--color-text-primary)' }}>CRO Playbook</span> we used to generate $140M in additional revenue for our clients last year.
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '12px' }}>
                <input 
                  type="email" 
                  placeholder="Enter your work email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  style={{
                    flex: 1,
                    background: 'var(--color-bg-secondary)',
                    border: '1px solid var(--color-border)',
                    padding: '16px 20px',
                    borderRadius: '12px',
                    color: 'var(--color-text-primary)',
                    fontSize: '16px',
                    outline: 'none',
                    opacity: loading ? 0.5 : 1
                  }}
                />
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ padding: '0 24px', display: 'flex', alignItems: 'center', gap: '8px', minWidth: '160px', justifyContent: 'center' }}>
                  {loading ? <Loader2 size={18} className="spin" /> : <><Download size={18} /> Get Playbook</>}
                </button>
              </form>
              <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '16px' }}>
                No spam. Unsubscribe anytime.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
