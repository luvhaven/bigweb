'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, X } from 'lucide-react';
import KineticText from '@/components/ui/KineticText';

gsap.registerPlugin(ScrollTrigger);

export default function PhilosophyShift() {
  const sectionRef = useRef<HTMLElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scale entry for the comparison table
      if (comparisonRef.current) {
        gsap.fromTo(comparisonRef.current,
          { opacity: 0, scale: 0.95, y: 50 },
          {
            opacity: 1, scale: 1, y: 0,
            duration: 1.2, ease: 'expo.out',
            scrollTrigger: {
              trigger: comparisonRef.current,
              start: 'top 80%',
            },
          }
        );

        // Stagger list items inside table
        const rows = comparisonRef.current.querySelectorAll('.comp-row');
        gsap.fromTo(rows,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0,
            duration: 0.6, stagger: 0.1, ease: 'power2.out',
            scrollTrigger: {
              trigger: comparisonRef.current,
              start: 'top 65%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="philosophy" style={{ padding: 'var(--space-32) 0', background: 'var(--color-bg-primary)', overflow: 'hidden' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--space-16)', alignItems: 'center' }}>
        
        {/* Left narrative */}
        <div>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 'var(--text-xs)', fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--color-gold-bright)',
            marginBottom: 'var(--space-6)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-gold-bright)' }} />
            The Paradigm
          </span>
          
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 5vw, var(--text-6xl))',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: 'var(--space-8)',
          }}>
            <div style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.1em' }}>
              <KineticText animation="skew" scrollTrigger>Aesthetics</KineticText> <span style={{ color: 'var(--color-text-secondary)', textDecoration: 'line-through' }}>don&apos;t</span>
            </div>
            <div style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.1em' }}>
              <KineticText animation="skew" delay={0.1} scrollTrigger>pay the bills.</KineticText>
            </div>
            <div style={{ display: 'block', color: 'var(--color-gold-bright)', overflow: 'hidden', paddingBottom: '0.1em' }}>
              <KineticText animation="scramble" scrollTrigger duration={1.2}>Conversions do.</KineticText>
            </div>
          </h2>

          <div style={{ paddingLeft: 'var(--space-6)', borderLeft: '1px solid var(--color-gold-muted)' }}>
            <p style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.8,
              marginBottom: 'var(--space-6)',
            }}>
              Most digital agencies sell you a pretty website. We sell you a revenue machine. If a design element doesn&apos;t increase trust, reduce friction, or drive a conversion—we delete it.
            </p>
            <p style={{
              fontSize: 'var(--text-base)',
              color: 'var(--color-text-primary)',
              lineHeight: 1.7,
              fontWeight: 500,
            }}>
              Your website is your best salesperson. It should be working 24/7, answering objections, and closing deals. If it isn&apos;t, you don&apos;t need a rebrand—you need a rebuild.
            </p>
          </div>
        </div>

        {/* Right Comparison Table */}
        <div ref={comparisonRef} style={{
          border: '1px solid var(--color-gold-muted)',
          background: 'rgba(212, 175, 106, 0.03)',
          backdropFilter: 'blur(10px)',
          borderRadius: 0,
        }}>
          {/* Table Header */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--color-gold-muted)' }}>
            <div style={{ padding: 'var(--space-6)', borderRight: '1px solid var(--color-gold-muted)', textAlign: 'center' }}>
              <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600, color: 'var(--color-text-tertiary)' }}>Standard Agencies</span>
            </div>
            <div style={{ padding: 'var(--space-6)', textAlign: 'center', background: 'rgba(212, 175, 106, 0.08)' }}>
              <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 800, color: 'var(--color-gold-bright)' }}>BIGWEB Digital</span>
            </div>
          </div>

          {/* Table Rows */}
          {[
            { old: 'Optimize for awards', new: 'Optimize for revenue' },
            { old: 'Sell hours & retainers', new: 'Sell measurable outcomes' },
            { old: 'Guess based on trends', new: 'Build based on data' },
            { old: 'Scope creep & delays', new: 'Fixed price, strict timeline' },
            { old: 'You manage them', new: 'We integrate with you' },
          ].map((row, i) => (
            <div key={i} className="comp-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: i === 4 ? 'none' : '1px solid rgba(212, 175, 106, 0.1)' }}>
              <div style={{ padding: 'var(--space-5)', borderRight: '1px solid rgba(212, 175, 106, 0.1)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(122, 42, 42, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-danger)', flexShrink: 0 }}>
                  <X size={12} strokeWidth={3} />
                </div>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>{row.old}</span>
              </div>
              <div style={{ padding: 'var(--space-5)', background: 'rgba(212, 175, 106, 0.03)', display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(212, 175, 106, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-gold-bright)', flexShrink: 0, boxShadow: '0 0 10px rgba(212,175,106,0.2)' }}>
                  <Check size={12} strokeWidth={3} />
                </div>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--color-text-primary)', fontWeight: 500 }}>{row.new}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
