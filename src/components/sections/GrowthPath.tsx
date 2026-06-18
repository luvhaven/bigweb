'use client';

import { useEffect, useRef, useState } from 'react';
import AnimateIn from '@/components/ui/AnimateIn';

const steps = [
  {
    num: '01',
    label: 'Conversion Audit',
    price: '$3,000–5,000',
    type: 'One-time',
    desc: 'We diagnose exactly where revenue is leaking. You get a prioritized fix list with ROI estimates. If we can\'t find $10,000 in opportunity, we refund you.',
    outcome: 'Proves ROI. Trust earned.',
    color: 'rgba(212,175,106,0.5)',
  },
  {
    num: '02',
    label: 'CRO Retainer',
    price: '$4,000/mo',
    type: 'Monthly',
    desc: 'We execute the audit recommendations — A/B testing, landing pages, funnel fixes — and report on revenue impact monthly. Results compound.',
    outcome: 'Results compound month over month.',
    color: 'rgba(212,175,106,0.7)',
  },
  {
    num: '03',
    label: 'Revenue Funnel System',
    price: '$10,000–20,000',
    type: 'Project',
    desc: 'Full-funnel infrastructure: paid traffic → optimized landing → email nurture → AI sales agent → booked call. The complete revenue machine.',
    outcome: 'Full system built. Revenue predictable.',
    color: 'rgba(212,175,106,0.9)',
  },
  {
    num: '04',
    label: 'Digital Revenue Partner',
    price: '$8,000/mo',
    type: 'Partnership',
    desc: 'We become your embedded digital team. Strategy, execution, analytics, and iteration — every month. Not a vendor. A growth partner.',
    outcome: '12-month value: ~$140,000+ generated.',
    color: 'var(--color-gold-bright)',
  },
];

export default function GrowthPath() {
  const [activeStep, setActiveStep] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          steps.forEach((_, i) => {
            setTimeout(() => setActiveStep(i), i * 350);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section" id="growth-path" style={{ background: 'var(--color-bg-tertiary)' }}>
      <div className="container">
        <AnimateIn>
          <span className="section-label">THE GROWTH PATH</span>
        </AnimateIn>
        <AnimateIn delay={1}>
          <h2 className="section-headline" style={{ maxWidth: 700 }}>
            How a $4,000 project becomes a{' '}
            <span className="text-gold">$140,000/year partnership.</span>
          </h2>
        </AnimateIn>
        <AnimateIn delay={2}>
          <p style={{ maxWidth: 600, marginBottom: 'var(--space-14)', fontSize: 'var(--text-lg)', lineHeight: 1.75, color: 'var(--color-text-secondary)' }}>
            Every engagement delivers standalone value — and makes the next step obvious. Our clients don&apos;t feel upsold. They feel guided.
          </p>
        </AnimateIn>

        <div className="gp-timeline" ref={containerRef}>
          {steps.map((step, i) => (
            <div
              key={i}
              className={`gp-step ${activeStep >= i ? 'gp-active' : ''}`}
            >
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className={`gp-connector ${activeStep >= i + 1 ? 'gp-connector-active' : ''}`} />
              )}

              {/* Node circle */}
              <div className="gp-node" style={{ borderColor: activeStep >= i ? step.color : undefined }}>
                <span className="gp-node-num">{step.num}</span>
              </div>

              {/* Content card */}
              <div className="gp-content card">
                <div className="gp-card-header">
                  <div>
                    <span className="gp-type">{step.type}</span>
                    <h3 className="gp-label">{step.label}</h3>
                  </div>
                  <div className="gp-price-block">
                    <span className="gp-price">{step.price}</span>
                  </div>
                </div>
                <p className="gp-desc">{step.desc}</p>
                <div className="gp-outcome">
                  <span className="gp-outcome-dot" style={{ background: step.color }} />
                  <span>{step.outcome}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Value summary strip */}
        <div className={`gp-value-strip ${activeStep >= steps.length - 1 ? 'gp-value-strip-show' : ''}`}>
          <div className="gp-value-strip-inner">
            <span className="gp-value-label">12-month compounded value</span>
            <span className="gp-value-num">~$140,000+</span>
            <span className="gp-value-arrow">generated for clients who complete the full path</span>
          </div>
        </div>
      </div>

      
    </section>
  );
}
