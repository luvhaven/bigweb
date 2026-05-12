'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useAudio } from '@/lib/useAudio';
import { useMousePosition } from '@/lib/hooks';
import { ContactForm } from '@/components/sections/ContactForm';

type Step = 'init' | 'goal' | 'revenue' | 'qualified' | 'disqualified';

interface Option {
  id: string;
  label: string;
  key: string;
}

const goals: Option[] = [
  { id: 'conversion', label: 'Traffic is high, conversion is low.', key: '1' },
  { id: 'brand', label: 'Our web presence damages our brand equity.', key: '2' },
  { id: 'app', label: 'We need a bespoke web application built.', key: '3' },
  { id: 'unsure', label: 'I just know we are leaving money on the table.', key: '4' }
];

const revenues: Option[] = [
  { id: '0-5k', label: 'Under $5,000 / mo', key: '1' },
  { id: '5-20k', label: '$5,000 - $20,000 / mo', key: '2' },
  { id: '20-50k', label: '$20,000 - $50,000 / mo', key: '3' },
  { id: '50k+', label: '$50,000+ / mo', key: '4' }
];

function DecodeText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const [displayed, setDisplayed] = useState('');
  const { playClick } = useAudio();
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  const [hasDecoded, setHasDecoded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || hasDecoded) return;

    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayed(text.split('').map((letter, index) => {
        if (index < iteration) {
          return text[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));

      if (iteration % 3 === 0) playClick();

      if (iteration >= text.length) {
        clearInterval(interval);
        setHasDecoded(true);
        if (onComplete) setTimeout(onComplete, 300);
      }
      
      iteration += 1 / 2; // Speed of decoding
    }, 30);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, hasDecoded]); // Removed text, playClick, onComplete to prevent inline-function re-renders

  return <span ref={ref}>{displayed || text.replace(/./g, '-')}</span>;
}

export default function TerminalQualifier() {
  const [step, setStep] = useState<Step>('init');
  const [optionsActive, setOptionsActive] = useState(false);
  const { playClick, playSelect, playSuccess } = useAudio();
  const mousePosition = useMousePosition();
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate mouse position relative to the container for the spatial glow
  const [localMouse, setLocalMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setLocalMouse({
        x: mousePosition.x - rect.left,
        y: mousePosition.y - rect.top,
      });
    }
  }, [mousePosition]);

  // Boot sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setStep('goal');
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (nextStep: Step, sound: 'select' | 'success' = 'select') => {
    if (!optionsActive) return;
    setOptionsActive(false);
    if (sound === 'success') playSuccess();
    else playSelect();
    
    // Add a slight delay for dramatic effect
    setTimeout(() => {
      setStep(nextStep);
    }, 400);
  };

  // Global Keyboard Listener
  useEffect(() => {
    if (!optionsActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (step === 'goal') {
        const option = goals.find(g => g.key === e.key);
        if (option) handleSelect('revenue');
      } else if (step === 'revenue') {
        const option = revenues.find(r => r.key === e.key);
        if (option) {
          handleSelect(option.id === '0-5k' ? 'disqualified' : 'qualified', option.id === '0-5k' ? 'select' : 'success');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [optionsActive, step]);

  const terminalVariants = {
    hidden: { opacity: 0, filter: 'blur(10px)', scale: 0.98 },
    visible: { opacity: 1, filter: 'blur(0px)', scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, filter: 'blur(10px)', y: -20, transition: { duration: 0.3 } }
  };

  return (
    <div 
      ref={containerRef}
      style={{ 
        position: 'relative', 
        minHeight: '500px', 
        background: 'var(--color-bg-primary)', 
        border: '1px solid rgba(212, 175, 106, 0.1)', 
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)'
      }}
    >
      {/* Spatial Glow Effect */}
      <div 
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: `radial-gradient(circle 400px at ${localMouse.x}px ${localMouse.y}px, rgba(212, 175, 106, 0.08), transparent 80%)`,
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Terminal Header */}
      <div style={{ display: 'flex', gap: '8px', padding: '16px 24px', borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.2)', position: 'relative', zIndex: 1 }}>
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#27c93f' }} />
        <div style={{ marginLeft: 'auto', fontSize: '12px', fontFamily: 'monospace', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          sys.audit_protocol // {step}
        </div>
      </div>

      <div style={{ padding: 'var(--space-8) var(--space-8)', position: 'relative', zIndex: 1, minHeight: '350px' }}>
        <AnimatePresence mode="wait">
          
          {step === 'init' && (
            <motion.div key="init" variants={terminalVariants} initial="hidden" animate="visible" exit="exit" style={{ fontFamily: 'monospace', color: 'var(--color-gold-muted)', fontSize: '14px', display: 'flex', alignItems: 'center' }}>
              <span style={{ color: 'var(--color-text-secondary)', marginRight: '12px' }}>[SYSTEM]</span>
              <DecodeText text="Establishing secure connection... Protocol 7X Active." />
            </motion.div>
          )}

          {step === 'goal' && (
            <motion.div key="goal" variants={terminalVariants} initial="hidden" animate="visible" exit="exit">
              <div style={{ fontSize: 'var(--text-lg)', fontWeight: 400, marginBottom: 'var(--space-8)', fontFamily: 'monospace', color: 'var(--color-text-primary)' }}>
                <span style={{ color: 'var(--color-gold-muted)', marginRight: '12px' }}>root@bigweb:~#</span> 
                <DecodeText text="Identify primary revenue bottleneck:" onComplete={() => setOptionsActive(true)} />
                <span className="cursor-blink" style={{ display: 'inline-block', width: '8px', height: '1.2em', background: 'var(--color-gold-bright)', marginLeft: '8px', verticalAlign: 'middle' }} />
              </div>

              {optionsActive && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontFamily: 'monospace', marginLeft: '24px' }}>
                  {goals.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => handleSelect('revenue')}
                      className="terminal-btn"
                      style={{
                        textAlign: 'left',
                        padding: 'var(--space-3) var(--space-4)',
                        background: 'transparent',
                        border: '1px solid transparent',
                        color: 'var(--color-text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontSize: '14px',
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'center'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-gold-bright)'; playClick(); }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
                    >
                      <span style={{ color: 'var(--color-text-tertiary)' }}>[{g.key}]</span>
                      {g.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 'revenue' && (
            <motion.div key="revenue" variants={terminalVariants} initial="hidden" animate="visible" exit="exit">
              <div style={{ fontSize: 'var(--text-lg)', fontWeight: 400, marginBottom: 'var(--space-8)', fontFamily: 'monospace', color: 'var(--color-text-primary)' }}>
                <span style={{ color: 'var(--color-gold-muted)', marginRight: '12px' }}>root@bigweb:~#</span> 
                <DecodeText text="Select average monthly revenue (USD):" onComplete={() => setOptionsActive(true)} />
                <span className="cursor-blink" style={{ display: 'inline-block', width: '8px', height: '1.2em', background: 'var(--color-gold-bright)', marginLeft: '8px', verticalAlign: 'middle' }} />
              </div>

              {optionsActive && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', fontFamily: 'monospace', marginLeft: '24px' }}>
                  {revenues.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => handleSelect(r.id === '0-5k' ? 'disqualified' : 'qualified', r.id === '0-5k' ? 'select' : 'success')}
                      className="terminal-btn"
                      style={{
                        textAlign: 'left',
                        padding: 'var(--space-3) var(--space-4)',
                        background: 'transparent',
                        border: '1px solid transparent',
                        color: 'var(--color-text-secondary)',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                        fontSize: '14px',
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'center'
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-gold-bright)'; playClick(); }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-text-secondary)'; }}
                    >
                      <span style={{ color: 'var(--color-text-tertiary)' }}>[{r.key}]</span>
                      {r.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 'disqualified' && (
            <motion.div key="disqualified" variants={terminalVariants} initial="hidden" animate="visible" exit="exit">
              <div style={{ padding: 'var(--space-6)', background: 'rgba(212, 175, 106, 0.05)', border: '1px solid rgba(212, 175, 106, 0.2)', borderRadius: '12px' }}>
                <h3 style={{ fontSize: 'var(--text-xl)', fontWeight: 600, marginBottom: 'var(--space-4)', fontFamily: 'var(--font-display)', color: 'var(--color-text-primary)' }}>
                  <DecodeText text="Execution halted. Minimum criteria not met." />
                </h3>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                  <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)', lineHeight: 1.6, fontSize: 'var(--text-sm)' }}>
                    Based on your current scale, our minimum engagement size would introduce unnecessary cash flow friction. We only deploy capital when mathematical certainty of ROI exists.
                  </p>
                  <a href="mailto:hello@bigwebdigital.com" className="btn btn-outline" style={{ display: 'inline-flex' }}>
                    <Mail size={16} /> Request Free Resources
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}

          {step === 'qualified' && (
            <motion.div key="qualified" variants={terminalVariants} initial="hidden" animate="visible" exit="exit">
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <div style={{ fontSize: 'var(--text-2xl)', fontWeight: 600, marginBottom: 'var(--space-2)', fontFamily: 'var(--font-display)', color: 'var(--color-gold-bright)' }}>
                  <DecodeText text="Criteria Met. Authorization Granted." />
                </div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
                  <p style={{ color: 'var(--color-text-secondary)', fontSize: 'var(--text-sm)', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    [STATUS] Priority Diagnostic Initiated
                  </p>
                </motion.div>
              </div>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2 }}>
                <ContactForm />
              </motion.div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .cursor-blink { animation: blink 1s step-end infinite; }
        .terminal-btn:hover { background: rgba(212, 175, 106, 0.08) !important; border-radius: 4px; border-left: 2px solid var(--color-gold-bright) !important; padding-left: calc(var(--space-4) - 2px) !important; }
      `}} />
    </div>
  );
}
