'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import MagneticButton from '@/components/ui/MagneticButton';
import KineticText from '@/components/ui/KineticText';

const HeroScene = dynamic(() => import('@/components/ui/HeroScene'), { ssr: false });

const STATS = [
  { value: '2018', label: 'Founded' },
  { value: '$140M+', label: 'Revenue tracked' },
  { value: '42', label: 'Clients served' },
  { value: '4', label: 'Countries' },
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Label
      tl.fromTo(labelRef.current,
        { opacity: 0, filter: 'blur(4px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1.2 },
        0.8 // Wait for page transition svg to lift
      );

      // Sub text
      tl.fromTo(subRef.current,
        { opacity: 0, y: 30, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2 },
        1.8
      );

      // CTAs
      tl.fromTo(ctaRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.2)' },
        2.2
      );

      // Stats stagger
      if (statsRef.current) {
        const items = statsRef.current.querySelectorAll('.hero-stat-item-kin');
        tl.fromTo(items,
          { opacity: 0, y: 40, rotateX: -20 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.1 },
          2.4
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        position: 'relative',
        minHeight: '85dvh', // Tightened to prevent massive vertical empty spaces on tall screens
        maxHeight: '1000px', // Caps expansion so it feels incredibly tight and framed
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        paddingBottom: 'var(--space-16)', // Gives it a bit of breathing room near footer
        paddingTop: 'calc(var(--nav-height) + var(--space-8))',
      }}
    >
      <HeroScene />

      {/* Darkened overlay to ensure text is highly legible against the gold anomaly */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', background: 'radial-gradient(circle at center, rgba(10,10,11,0.6) 0%, rgba(10,10,11,0.95) 100%)', mixBlendMode: 'multiply' }} />

      <div className="container" style={{ position: 'relative', zIndex: 3 }}>
        {/* Label */}
        <div ref={labelRef} style={{ opacity: 0, marginBottom: 'var(--space-8)' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 20px',
            border: '1px solid rgba(212, 175, 106, 0.3)',
            borderRadius: '20px',
            background: 'rgba(212, 175, 106, 0.05)',
            backdropFilter: 'blur(10px)',
            fontSize: 'var(--text-xs)', fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--color-gold-bright)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-gold-bright)', boxShadow: '0 0 10px var(--color-gold-bright)' }} />
            Revenue-First Digital Agency
          </span>
        </div>

        {/* Organic Morph Target Blob */}
        <div className="morph-hero-blob" style={{
          position: 'absolute',
          top: '20%',
          left: '10%',
          width: '400px',
          height: '400px',
          background: 'var(--color-gold-bright)',
          filter: 'blur(80px)',
          opacity: 0.25,
          borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
          pointerEvents: 'none',
          willChange: 'transform, clip-path, border-radius',
          zIndex: 1,
        }} />

        {/* Cinematic Kinetic Headline */}
        <h1 style={{
          fontSize: 'clamp(3rem, 6.5vw, 6.5rem)',
          maxWidth: 1000,
          marginBottom: 'var(--space-8)',
          perspective: '1200px',
        }}>
          <span className="scramble-init">R</span>evenue <br />
          <span className="blur-in-init accent-italic">monopolies.</span>
        </h1>

        {/* Sub */}
        <p
          ref={subRef}
          style={{
            fontSize: 'clamp(1rem, 2vw, var(--text-2xl))',
            color: 'var(--color-text-secondary)',
            maxWidth: 800,
            marginBottom: 'var(--space-10)',
            lineHeight: 1.6,
            fontWeight: 500,
            position: 'relative',
            zIndex: 3
          }}
        >
          We don&apos;t build websites. We engineer absolute market dominance. <br style={{ display: 'none' }} className="md:block" />
          Elite kinetic design meets aggressive conversion architecture.
        </p>

        {/* CTAs */}
        <div ref={ctaRef} style={{ opacity: 0, display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)', alignItems: 'center', marginBottom: 'var(--space-16)' }}>
          <MagneticButton href="/contact" className="btn btn-primary btn-lg">
            Book Strategy Call <ArrowRight size={16} style={{ transition: 'transform 0.3s' }} />
          </MagneticButton>
          <MagneticButton href="/work" className="btn btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            See Our Work <ArrowRight size={14} />
          </MagneticButton>
        </div>

        {/* Extreme Grid Stats Bar */}
        <div ref={statsRef} style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1px',
          background: 'rgba(212, 175, 106, 0.1)',
          border: '1px solid rgba(212, 175, 106, 0.2)',
          backdropFilter: 'blur(10px)',
        }}>
          {STATS.map((s) => (
            <div
              key={s.label}
              className="hero-stat-item-kin"
              style={{
                opacity: 0,
                background: 'rgba(10, 10, 11, 0.7)',
                padding: 'var(--space-6) var(--space-6)',
                textAlign: 'center',
                transition: 'background 0.3s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(212, 175, 106, 0.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(10, 10, 11, 0.7)')}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 900,
                color: 'var(--color-gold-bright)',
                marginBottom: 4,
                textShadow: '0 0 20px rgba(212, 175, 106, 0.3)',
              }}>
                {s.value}
              </div>
              <div style={{
                fontSize: '0.65rem',
                textTransform: 'uppercase',
                letterSpacing: '0.25em',
                color: 'var(--color-text-secondary)',
                fontWeight: 700,
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
