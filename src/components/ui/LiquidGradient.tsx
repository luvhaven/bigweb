'use client';

import { useEffect, useRef } from 'react';

export default function LiquidGradient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = containerRef.current;
    if (!el) return;

    let raf: number;
    let t = 0;

    const tick = () => {
      t += 0.002;
      el.style.setProperty('--t', t.toString());
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      ref={containerRef}
      className="liquid-gradient-bg"
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        background: '#040302',
      }}
    >
      <div 
        className="liquid-orb" 
        style={{ 
          background: 'radial-gradient(circle, rgba(212, 175, 106, 0.06) 0%, transparent 60%)',
          width: '80%', height: '80%', top: '-20%', left: '-10%',
          animation: 'liquid-float 20s infinite ease-in-out alternate'
        }} 
      />
      <div 
        className="liquid-orb" 
        style={{ 
          background: 'radial-gradient(circle, rgba(40, 40, 40, 0.2) 0%, transparent 60%)',
          width: '90%', height: '90%', top: '30%', right: '-20%',
          animation: 'liquid-float 25s infinite ease-in-out alternate-reverse',
          animationDelay: '-5s'
        }} 
      />
      <div 
        className="liquid-orb" 
        style={{ 
          background: 'radial-gradient(circle, rgba(180, 140, 70, 0.04) 0%, transparent 60%)',
          width: '70%', height: '70%', bottom: '-20%', left: '20%',
          animation: 'liquid-float 22s infinite ease-in-out alternate',
          animationDelay: '-10s'
        }} 
      />
      
      {/* Noise overlay to give it texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
}
