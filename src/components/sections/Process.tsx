'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from '@/components/ui/TiltCard';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    step: '01',
    title: 'Diagnose',
    duration: '1–3 days',
    description: "We don't guess. We analyze your analytics, user behavior, conversion data, and competitive landscape. We tell you exactly where money is leaking before we propose anything.",
    detail: ['Heatmaps', 'Session recording', 'Funnel analysis', 'Competitor audit'],
  },
  {
    step: '02',
    title: 'Prescribe',
    duration: '1 day',
    description: "Based on the diagnosis, we recommend the exact service that fits your situation — not the most expensive option. We're playing the long game.",
    detail: ['Prioritized fix list', 'ROI estimates', 'Clear scope', 'Fixed price'],
  },
  {
    step: '03',
    title: 'Build',
    duration: '2–3 weeks',
    description: "AI-assisted development, tight scopes, and daily communication. You're never left wondering what's happening. Most Tier 1 engagements go live in under 3 weeks.",
    detail: ['Weekly check-ins', 'Staging previews', 'Iterative delivery'],
  },
  {
    step: '04',
    title: 'Measure',
    duration: 'Ongoing',
    description: "Every engagement ends with a results report. Not a pretty PDF — actual metrics. Revenue delta. Conversion rate changes. Traffic impact. We put our name on numbers.",
    detail: ['Revenue delta', 'Conversion rate', 'Traffic impact', 'Monthly review'],
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current.children,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            duration: 0.9, stagger: 0.15, ease: 'expo.out',
            scrollTrigger: { trigger: headerRef.current, start: 'top 80%' },
          }
        );
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.proc-card-new');
        gsap.fromTo(cards,
          { opacity: 0, y: 70, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.85, stagger: 0.15, ease: 'expo.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 75%' },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" style={{ padding: 'var(--space-24) 0', background: 'var(--color-bg-secondary)' }}>
      <div className="container">
        <div ref={headerRef} style={{ marginBottom: 'var(--space-16)' }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-xs)',
            fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold-bright)',
            marginBottom: 'var(--space-6)',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-gold-bright)' }} />
            Our Process
          </span>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, var(--text-5xl))',
            fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em',
          }}>
            No surprises.<br />
            <span style={{ color: 'var(--color-gold-bright)' }}>Just results.</span>
          </h2>
          <p style={{
            fontSize: 'var(--text-lg)', color: 'var(--color-text-secondary)',
            maxWidth: 560, lineHeight: 1.7, marginTop: 'var(--space-4)',
          }}>
            Four steps. Every engagement. Zero ambiguity about what happens next or what success looks like.
          </p>
        </div>

        <div ref={gridRef} style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 'var(--space-6)',
        }}>
          {processSteps.map((s) => (
            <TiltCard key={s.step} className="proc-card-new" style={{ borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-card)', background: 'var(--color-bg-primary)' }}>
              <div
                style={{
                  height: '100%',
                  padding: 'var(--space-10)', display: 'flex', flexDirection: 'column',
                  position: 'relative', transition: 'box-shadow 0.3s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.parentElement!.style.boxShadow = 'var(--shadow-card-hover)')}
                onMouseLeave={(e) => (e.currentTarget.parentElement!.style.boxShadow = 'var(--shadow-card)')}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-8)' }}>
                  <span style={{
                    fontFamily: 'var(--font-display)', fontSize: 'var(--text-4xl)', fontWeight: 900,
                    color: 'var(--color-bg-border)', lineHeight: 1,
                  }}>
                    {s.step}
                  </span>
                  <span style={{
                    fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.12em',
                    color: 'var(--color-text-tertiary)', padding: '4px 10px', border: '1px solid var(--color-bg-border)',
                  }}>
                    {s.duration}
                  </span>
                </div>

                <h3 style={{
                  fontFamily: 'var(--font-display)', fontSize: 'var(--text-2xl)', fontWeight: 700,
                  marginBottom: 'var(--space-4)', color: 'var(--color-text-primary)',
                }}>
                  {s.title}
                </h3>

                <p style={{
                  fontSize: 'var(--text-sm)', lineHeight: 1.7, color: 'var(--color-text-secondary)',
                  marginBottom: 'var(--space-8)', flex: 1,
                }}>
                  {s.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {s.detail.map((d) => (
                    <span key={d} style={{
                      fontSize: 'var(--text-xs)', padding: '4px 10px', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '9999px',
                      color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em',
                    }}>
                      {d}
                    </span>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
