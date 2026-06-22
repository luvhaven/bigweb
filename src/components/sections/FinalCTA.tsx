'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '@/components/ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA({ image }: { image?: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pinned headline scale reveal
      if (headlineRef.current) {
        const lines = headlineRef.current.querySelectorAll('.final-line-new');
        gsap.fromTo(lines,
          { opacity: 0, y: 80, scale: 0.92 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 1.2, stagger: 0.2, ease: 'expo.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 75%',
              end: 'top 30%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Content fade
      if (contentRef.current) {
        gsap.fromTo(contentRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.8, stagger: 0.15, ease: 'expo.out',
            scrollTrigger: { trigger: contentRef.current, start: 'top 80%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="final-cta"
      style={{
        padding: 'var(--space-32) 0',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        background: 'var(--color-bg-primary)',
      }}
    >
      {/* Background image */}
      {image && (
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.08, filter: 'grayscale(1)',
          zIndex: 0,
        }} aria-hidden="true" />
      )}

      {/* Gradient vignette */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse at center, transparent 0%, var(--color-bg-primary) 80%)',
        pointerEvents: 'none',
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        {/* Eyebrow */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '6px 16px',
          border: '1px solid var(--color-gold-muted)',
          fontSize: 'var(--text-xs)', fontWeight: 600,
          letterSpacing: '0.2em', textTransform: 'uppercase',
          color: 'var(--color-gold-bright)',
          marginBottom: 'var(--space-10)',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-gold-bright)', animation: 'pulse 2s ease-in-out infinite' }} />
          Currently accepting Q3 2026 applications
        </div>

        {/* Headline */}
        <h2
          ref={headlineRef}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, var(--text-7xl))',
            fontWeight: 900,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: 'var(--space-8)',
            perspective: '800px',
          }}
        >
          <span className="final-line-new" style={{ display: 'block', opacity: 0 }}>Ready to find out</span>
          <span className="final-line-new" style={{ display: 'block', opacity: 0 }}>where <em style={{ fontStyle: 'italic', color: 'var(--color-text-secondary)' }}>you&apos;re</em> losing</span>
          <span className="final-line-new" style={{ display: 'block', opacity: 0, color: 'var(--color-gold-bright)' }}>money?</span>
        </h2>

        <div ref={contentRef}>
          <p style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--color-text-secondary)',
            maxWidth: 500,
            margin: '0 auto var(--space-10)',
            lineHeight: 1.7,
          }}>
            The diagnostic call is free. The conversation is honest. The results are measurable.
          </p>

          <div style={{
            display: 'flex', gap: 'var(--space-4)',
            justifyContent: 'center', flexWrap: 'wrap',
            marginBottom: 'var(--space-6)',
          }}>
            <MagneticButton href="/contact" className="btn btn-primary btn-lg">
              Book My Free Diagnostic <ArrowRight size={16} />
            </MagneticButton>
            <Link
              href="/playbook?access=granted"
              className="btn btn-outline btn-lg"
              style={{ display: 'flex', alignItems: 'center', gap: 8 }}
            >
              Download the Playbook <ArrowRight size={16} />
            </Link>
          </div>

          <p style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-tertiary)',
          }}>
            Or reach us at{' '}
            <a href="mailto:hello@bigwebdigital.com" style={{ color: 'var(--color-gold-bright)', textDecoration: 'underline', textUnderlineOffset: 3 }}>
              hello@bigwebdigital.com
            </a>
          </p>

          {/* Proof strip */}
          <div style={{
            display: 'flex', justifyContent: 'center',
            gap: 'var(--space-8)', marginTop: 'var(--space-12)',
            flexWrap: 'wrap',
          }}>
            {[
              { num: '288%', label: 'Avg revenue lift' },
              { num: '94%', label: 'Client retention' },
              { num: '4hr', label: 'Response time' },
            ].map((p) => (
              <div key={p.label} style={{ textAlign: 'center' }}>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 800,
                  color: 'var(--color-text-primary)',
                }}>{p.num}</div>
                <div style={{
                  fontSize: 'var(--text-xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--color-text-tertiary)',
                  marginTop: 4,
                }}>{p.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
