'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AmbientGlow from '@/components/ui/AmbientGlow';
import MagneticButton from '@/components/ui/MagneticButton';
import CinematicShine from '@/components/ui/CinematicShine';

export default function FinalCTA({ image }: { image?: string }) {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);



  return (
    <section ref={sectionRef} className="section final-cta-section" id="final-cta" style={{ position: 'relative', overflow: 'hidden' }}>
      {image && (
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
            filter: 'grayscale(1)',
            zIndex: 0,
            mixBlendMode: 'luminosity'
          }}
          aria-hidden="true"
        />
      )}
      {/* Background Art */}
      <CinematicShine />

      {/* Horizontal rule top */}
      <div className="final-rule-top" aria-hidden="true" />

      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>

        {/* Eyebrow */}
        <div className={`final-eyebrow ${visible ? 'show' : ''}`}>
          <span className="final-eyebrow-dot" />
          <span>Currently accepting Q3 2026 applications</span>
        </div>

        {/* Main headline — line-by-line reveal */}
        <h2 className="final-headline" aria-label="Ready to find out where you're losing money?">
          <span className="final-line-wrap">
            <span className={`final-line ${visible ? 'show' : ''}`} style={{ transitionDelay: '200ms' }}>
              Ready to find out
            </span>
          </span>
          <span className="final-line-wrap">
            <span className={`final-line ${visible ? 'show' : ''}`} style={{ transitionDelay: '400ms' }}>
              where <em className="final-em">you&apos;re</em> losing
            </span>
          </span>
          <span className="final-line-wrap">
            <span className={`final-line final-line-gold ${visible ? 'show' : ''}`} style={{ transitionDelay: '600ms' }}>
              money?
            </span>
          </span>
        </h2>

        <p className={`final-sub ${visible ? 'show' : ''}`}>
          The diagnostic call is free. The conversation is honest. The results are measurable.
        </p>

        {/* CTA cluster — dual path for different intent levels */}
        <div className={`final-ctas ${visible ? 'show' : ''}`} style={{ flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
            <MagneticButton href="/contact" className="btn btn-primary btn-lg final-btn-primary">
              Book My Free Diagnostic <ArrowRight size={16} />
            </MagneticButton>
            <Link
              href="/playbook?access=granted"
              className="btn btn-outline btn-lg"
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              Download the Playbook <ArrowRight size={16} />
            </Link>
          </div>
          <p className="final-email">
            Or reach us at{' '}
            <a href="mailto:hello@bigwebdigital.com" className="final-email-link">
              hello@bigweb.digital
            </a>
          </p>
        </div>

        {/* Social proof strip */}
        <div className={`final-proof ${visible ? 'show' : ''}`}>
          <div className="final-proof-item">
            <span className="final-proof-num">288%</span>
            <span className="final-proof-label">Avg revenue lift</span>
          </div>
          <div className="final-proof-sep" />
          <div className="final-proof-item">
            <span className="final-proof-num">94%</span>
            <span className="final-proof-label">Client retention</span>
          </div>
          <div className="final-proof-sep" />
          <div className="final-proof-item">
            <span className="final-proof-num">4hr</span>
            <span className="final-proof-label">Response time</span>
          </div>
        </div>

        <p className={`final-note ${visible ? 'show' : ''}`}>
          No pressure. No hard-sell. If we can&apos;t help you, we&apos;ll say so — and point you to who can.
        </p>
      </div>

      
    </section>
  );
}
