'use client';

import { useState, useEffect } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import AnimateIn from '@/components/ui/AnimateIn';
import { useAudioFeedback } from '@/hooks/useAudioFeedback';

function Counter({ value, prefix = '', suffix = '' }: { value: number; prefix?: string; suffix?: string }) {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => {
    return prefix + Math.floor(current).toLocaleString('en-US') + suffix;
  });

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return <motion.span>{display}</motion.span>;
}

export default function ROISimulator() {
  const [traffic, setTraffic] = useState(50000);
  const [cvr, setCvr] = useState(1.5);
  const [aov, setAov] = useState(250);
  const [upliftIndex, setUpliftIndex] = useState(1);
  const playSound = useAudioFeedback();

  const uplifts = [15, 35, 75]; // Conservative, Expected, Aggressive
  const labels = ['Conservative (+15%)', 'Expected (+35%)', 'Aggressive (+75%)'];

  const currentRevenue = (traffic * (cvr / 100)) * aov;
  const activeUplift = uplifts[upliftIndex];
  const newCvr = cvr * (1 + (activeUplift / 100));
  const newRevenue = (traffic * (newCvr / 100)) * aov;
  const delta = newRevenue - currentRevenue;
  const annualDelta = delta * 12;

  // SVG Curve generation based on uplift
  const curveIntensity = 20 + (activeUplift * 0.8);
  const pathData = `M 0 100 Q 250 ${100 - curveIntensity} 500 ${100 - curveIntensity * 1.5}`;

  return (
    <section className="section" id="roi-simulator" style={{ background: 'var(--color-bg-primary)', position: 'relative', overflow: 'hidden' }}>
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <AnimateIn>
            <span className="section-label">THE MATH</span>
          </AnimateIn>
          <AnimateIn delay={1}>
            <h2 className="section-headline">Calculate your<br />revenue leak.</h2>
          </AnimateIn>
        </div>

        <div className="roi-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-8)',
          background: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)',
          borderRadius: '24px',
          padding: 'var(--space-8)',
          position: 'relative'
        }}>
          {/* Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                <label style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Monthly Traffic
                </label>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gold-bright)', fontWeight: 700, fontFamily: 'monospace' }}>
                  {traffic.toLocaleString()}
                </span>
              </div>
              <input 
                type="range" 
                min="5000" max="500000" step="5000"
                value={traffic} 
                onChange={(e) => {
                  setTraffic(Number(e.target.value));
                  playSound('tick');
                }}
                className="custom-slider"
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                <label style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Conversion Rate
                </label>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gold-bright)', fontWeight: 700, fontFamily: 'monospace' }}>
                  {cvr.toFixed(2)}%
                </span>
              </div>
              <input 
                type="range" 
                min="0.1" max="10" step="0.1"
                value={cvr} 
                onChange={(e) => {
                  setCvr(Number(e.target.value));
                  playSound('tick');
                }}
                className="custom-slider"
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-4)' }}>
                <label style={{ fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Average Order Value (AOV)
                </label>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-gold-bright)', fontWeight: 700, fontFamily: 'monospace' }}>
                  ${aov.toLocaleString()}
                </span>
              </div>
              <input 
                type="range" 
                min="50" max="5000" step="50"
                value={aov} 
                onChange={(e) => {
                  setAov(Number(e.target.value));
                  playSound('tick');
                }}
                className="custom-slider"
              />
            </div>

            <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-4)', flexWrap: 'wrap' }}>
              {uplifts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setUpliftIndex(idx);
                    playSound('thud');
                  }}
                  style={{
                    flex: 1,
                    minWidth: '100px',
                    padding: '12px 16px',
                    background: upliftIndex === idx ? 'var(--color-gold-muted)' : 'var(--color-bg-primary)',
                    color: upliftIndex === idx ? 'var(--color-bg-primary)' : 'var(--color-text-secondary)',
                    border: '1px solid var(--color-gold-muted)',
                    borderRadius: '8px',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {labels[idx]}
                </button>
              ))}
            </div>
          </div>

          {/* Results Display */}
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            padding: 'var(--space-8)',
            background: 'var(--color-bg-primary)',
            borderRadius: '16px',
            border: '1px solid var(--color-border)',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* SVG Background Curve */}
            <svg 
              style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '100px', opacity: 0.1, zIndex: 0 }}
              viewBox="0 0 500 100" preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-gold-bright)" stopOpacity="1" />
                  <stop offset="100%" stopColor="var(--color-gold-muted)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <motion.path 
                d={pathData} 
                fill="none" 
                stroke="url(#glow)" 
                strokeWidth="4"
                animate={{ d: pathData }}
                transition={{ type: 'spring', stiffness: 50, damping: 20 }}
              />
              <motion.path 
                d={`${pathData} L 500 100 L 0 100 Z`} 
                fill="url(#glow)" 
                animate={{ d: `${pathData} L 500 100 L 0 100 Z` }}
                transition={{ type: 'spring', stiffness: 50, damping: 20 }}
              />
            </svg>

            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ display: 'block', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 'var(--space-2)' }}>
                Additional Monthly Revenue
              </span>
              <div style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', fontWeight: 300, color: 'var(--color-gold-bright)', lineHeight: 1, marginBottom: 'var(--space-8)', letterSpacing: '-0.02em' }}>
                <Counter value={delta} prefix="+$" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-6)' }}>
                <div>
                  <span style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-1)' }}>
                    Current Revenue
                  </span>
                  <div style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    <Counter value={currentRevenue} prefix="$" />
                  </div>
                </div>
                <div>
                  <span style={{ display: 'block', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-1)' }}>
                    Annualized Uplift
                  </span>
                  <div style={{ fontSize: 'var(--text-lg)', fontWeight: 600, color: 'var(--color-gold-muted)' }}>
                    <Counter value={annualDelta} prefix="+$" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 4px;
          background: var(--color-border);
          border-radius: 2px;
          outline: none;
        }
        .custom-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: var(--color-gold-bright);
          cursor: pointer;
          border: 2px solid var(--color-bg-primary);
          box-shadow: 0 0 10px rgba(212, 175, 106, 0.4);
          transition: transform 0.1s;
        }
        .custom-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
      `}} />
    </section>
  );
}
