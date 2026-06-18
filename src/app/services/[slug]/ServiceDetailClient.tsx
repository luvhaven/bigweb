'use client';

import Link from 'next/link';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import MagneticButton from '@/components/ui/MagneticButton';
import { useCountUp, useInView } from '@/lib/hooks';

export interface Service {
  slug: string;
  name: string;
  tier: number;
  tierLabel?: string;
  tierHeadline?: string;
  tierDescription?: string;
  outcome: string;
  price: string;
  timeline: string;
  hero_subtitle?: string;
  description?: string;
  features: string[];
  results: { metric: string; label: string }[];
  process: { step: string; title: string; desc: string }[];
}

function MetricBlock({ metric, label, delay }: { metric: string; label: string; delay: number }) {
  const { ref, isInView } = useInView();
  const numericPart = parseInt(metric.replace(/[^0-9]/g, ''));
  const prefix = metric.startsWith('+') ? '+' : metric.startsWith('-') ? '-' : '';
  const suffix = metric.includes('%') ? '%' : metric.includes('x') ? 'x' : '';
  const isNumeric = !isNaN(numericPart) && numericPart > 0;
  const count = useCountUp(isNumeric ? numericPart : 0, 2000, isInView);

  return (
    <AnimateIn delay={delay}>
      <div ref={ref} className="detail-metric-block">
        <span className="detail-metric-value">
          {isNumeric ? `${prefix}${count}${suffix}` : metric}
        </span>
        <span className="detail-metric-label">{label}</span>
      </div>
    </AnimateIn>
  );
}

export default function ServiceDetailClient({ service, relatedServices }: { service: Service, relatedServices: Service[] }) {

  return (
    <>
      {/* Back navigation */}
      <div style={{ paddingTop: 'calc(var(--nav-height) + var(--space-8))', background: 'var(--color-bg-primary)' }}>
        <div className="container">
          <Link href="/services" className="back-link">
            <ArrowLeft size={14} /> All Services
          </Link>
        </div>
      </div>

      {/* Hero */}
      <section className="section detail-hero">
        <div className="container">
          <AnimateIn>
            <span className="section-label">TIER {String(service.tier).padStart(2, '0')} SERVICE</span>
          </AnimateIn>
          <AnimateIn delay={1}>
            <h1 className="detail-title">{service.name}</h1>
          </AnimateIn>
          <AnimateIn delay={2}>
            <p className="detail-subtitle">{service.hero_subtitle}</p>
          </AnimateIn>
          <AnimateIn delay={3}>
            <div className="detail-hero-meta">
              <div className="detail-hero-price">
                <span className="detail-meta-label">Investment</span>
                <span className="detail-meta-value">{service.price}</span>
              </div>
              <div className="detail-hero-timeline">
                <span className="detail-meta-label">Timeline</span>
                <span className="detail-meta-value">{service.timeline}</span>
              </div>
              <MagneticButton href="/contact" className="btn btn-primary btn-lg">
                Start This Engagement <ArrowRight size={16} />
              </MagneticButton>
            </div>
          </AnimateIn>
        </div>
      </section>

      <div className="section-divider" />

      {/* Description */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container detail-two-col">
          <div className="detail-content">
            <AnimateIn>
              <span className="section-label">THE CHALLENGE</span>
            </AnimateIn>
            <AnimateIn delay={1}>
              <div 
                className="detail-description" 
                dangerouslySetInnerHTML={{ __html: service.description || '' }} 
              />
            </AnimateIn>
          </div>
          <div className="detail-features">
            <AnimateIn delay={2}>
              <span className="section-label">WHAT&apos;S INCLUDED</span>
              <ul className="feature-list">
                {service.features.map((f, i) => (
                  <li key={i} className="feature-item">
                    <Check size={16} className="feature-check" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </AnimateIn>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Results Metrics */}
      <section className="section" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <AnimateIn>
            <span className="section-label">EXPECTED RESULTS</span>
            <h2 className="section-headline" style={{ margin: '0 auto var(--space-12)' }}>What this engagement delivers.</h2>
          </AnimateIn>
          <div className="detail-metrics-grid">
            {service.results.map((r, i) => (
              <MetricBlock key={i} metric={r.metric} label={r.label} delay={i + 1} />
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Process */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <AnimateIn>
            <span className="section-label">HOW IT WORKS</span>
            <h2 className="section-headline">Our process for this engagement.</h2>
          </AnimateIn>
          <div className="detail-process-grid">
            {service.process.map((p, i) => (
              <AnimateIn key={i} delay={i + 1}>
                <div className="card detail-process-card">
                  <span className="detail-process-step">{p.step}</span>
                  <h3 className="detail-process-title">{p.title}</h3>
                  <p className="detail-process-desc">{p.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Qualification (Is This For You?) */}
      <section className="section" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
            <AnimateIn>
              <span className="section-label">QUALIFICATION</span>
              <h2 className="section-headline" style={{ margin: '0 auto' }}>Who this is actually for.</h2>
            </AnimateIn>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-8)' }}>
            <AnimateIn delay={1}>
              <div className="card" style={{ borderTop: '4px solid var(--color-gold-bright)', height: '100%' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <Check size={24} color="var(--color-gold-bright)" /> IDEAL FIT
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <li style={{ display: 'flex', gap: '12px', color: 'var(--color-text-secondary)' }}>
                    <span style={{ color: 'var(--color-gold-bright)' }}>•</span>
                    Organizations that view their digital presence as a revenue engine, not just an expense.
                  </li>
                  <li style={{ display: 'flex', gap: '12px', color: 'var(--color-text-secondary)' }}>
                    <span style={{ color: 'var(--color-gold-bright)' }}>•</span>
                    Teams ready to deploy capital for exponential, measurable ROI.
                  </li>
                  <li style={{ display: 'flex', gap: '12px', color: 'var(--color-text-secondary)' }}>
                    <span style={{ color: 'var(--color-gold-bright)' }}>•</span>
                    Founders and executives who value speed of execution and elite quality.
                  </li>
                  <li style={{ display: 'flex', gap: '12px', color: 'var(--color-text-secondary)' }}>
                    <span style={{ color: 'var(--color-gold-bright)' }}>•</span>
                    Companies experiencing scale that has outpaced their current infrastructure.
                  </li>
                </ul>
              </div>
            </AnimateIn>
            
            <AnimateIn delay={2}>
              <div className="card" style={{ borderTop: '4px solid var(--color-bg-border)', height: '100%', opacity: 0.8 }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-6)', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--color-text-tertiary)' }}>
                  <span style={{ display: 'inline-flex', justifyContent: 'center', alignItems: 'center', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-bg-border)', fontSize: '12px' }}>X</span> NOT A FIT
                </h3>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                  <li style={{ display: 'flex', gap: '12px', color: 'var(--color-text-tertiary)' }}>
                    <span style={{ color: 'var(--color-text-tertiary)' }}>•</span>
                    Businesses looking for the cheapest vendor rather than the highest ROI.
                  </li>
                  <li style={{ display: 'flex', gap: '12px', color: 'var(--color-text-tertiary)' }}>
                    <span style={{ color: 'var(--color-text-tertiary)' }}>•</span>
                    Committees that require months of deliberation for minor decisions.
                  </li>
                  <li style={{ display: 'flex', gap: '12px', color: 'var(--color-text-tertiary)' }}>
                    <span style={{ color: 'var(--color-text-tertiary)' }}>•</span>
                    Those looking for a "digital brochure" without a monetization strategy.
                  </li>
                  <li style={{ display: 'flex', gap: '12px', color: 'var(--color-text-tertiary)' }}>
                    <span style={{ color: 'var(--color-text-tertiary)' }}>•</span>
                    Startups without product-market fit or a verified marketing budget.
                  </li>
                </ul>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* The Methodology / BIGWEB Difference */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', height: '1px', background: 'linear-gradient(90deg, transparent, var(--color-gold-muted), transparent)', opacity: 0.3 }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <AnimateIn>
              <span className="section-label">THE BIGWEB DIFFERENCE</span>
              <h2 className="section-headline" style={{ margin: '0 auto var(--space-8)' }}>We don't build deliverables. We engineer assets.</h2>
            </AnimateIn>
            
            <AnimateIn delay={1}>
              <div style={{ textAlign: 'left', background: 'var(--color-bg-primary)', padding: 'var(--space-8)', borderRadius: '0', border: '1px solid var(--color-bg-border)' }}>
                <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
                  Traditional agencies treat <strong>{service.name}</strong> as an isolated deliverable. They assign a junior team, follow a templated checklist, and hand over an asset that looks pretty but does absolutely nothing to move the needle on your revenue.
                </p>
                <p style={{ fontSize: '1.125rem', lineHeight: 1.8, color: 'var(--color-text-secondary)', marginBottom: 'var(--space-6)' }}>
                  At BIGWEB Digital, we operate as an extension of your growth team. Every engagement is rooted in <span style={{ color: 'var(--color-gold-bright)' }}>Conversion Physics</span>. We audit the friction in your current funnel, deploy aesthetic authority to instantly build institutional trust, and structure the deployment to maximize immediate financial return.
                </p>
                <div style={{ borderLeft: '3px solid var(--color-gold-bright)', paddingLeft: 'var(--space-6)', marginTop: 'var(--space-8)' }}>
                  <p style={{ fontSize: '1.25rem', fontStyle: 'italic', color: 'var(--color-text-primary)' }}>
                    "Our metric for success is not whether you like the final product. Our metric for success is whether the product drastically increases your enterprise value."
                  </p>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* FAQ Section */}
      <section className="section" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <AnimateIn>
              <span className="section-label">FREQUENTLY ASKED QUESTIONS</span>
              <h2 className="section-headline" style={{ marginBottom: 'var(--space-12)' }}>Common inquiries.</h2>
            </AnimateIn>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {[
                { 
                  q: "How quickly can we start?", 
                  a: "Depending on our current bandwidth and your Tier level, we can typically onboard and initiate discovery within 7-14 days of contract signature." 
                },
                { 
                  q: "Do you require long-term retainers?", 
                  a: "For foundational builds, we operate on a project basis. For revenue scaling and AI systems, we require a minimum 6-month commitment to ensure we have the time to iterate and generate verifiable ROI." 
                },
                { 
                  q: "What is expected from our team?", 
                  a: "We require a single point of contact with decision-making authority. We do the heavy lifting, but we need your domain expertise during the discovery phase and prompt approvals during sprints." 
                },
                { 
                  q: "Are the timelines guaranteed?", 
                  a: `Yes. We guarantee the ${service.timeline} timeline for this specific engagement, provided that your team meets the 24-hour SLA for necessary feedback and asset delivery.` 
                }
              ].map((faq, idx) => (
                <AnimateIn key={idx} delay={idx + 1}>
                  <div style={{ padding: 'var(--space-6)', background: 'var(--color-bg-secondary)', borderRadius: '0', border: '1px solid var(--color-bg-border)' }}>
                    <h4 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-2)', color: 'var(--color-text-primary)' }}>{faq.q}</h4>
                    <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{faq.a}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* CTA */}
      <section className="section" style={{ background: 'linear-gradient(170deg, var(--color-bg-primary), #0F0E08)', textAlign: 'center' }}>
        <div className="container">
          <AnimateIn>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, var(--text-5xl))', fontFamily: 'var(--font-display)', fontWeight: 900, marginBottom: 'var(--space-4)' }}>
              Ready to get started?
            </h2>
          </AnimateIn>
          <AnimateIn delay={1}>
            <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--space-8)', maxWidth: 500, margin: '0 auto var(--space-8)' }}>
              Book a free 20-minute diagnostic call. We&apos;ll tell you if this is the right engagement for your situation.
            </p>
          </AnimateIn>
          <AnimateIn delay={2}>
            <div style={{ display: 'flex', gap: 'var(--space-4)', justifyContent: 'center', flexWrap: 'wrap' }}>
              <MagneticButton href="/contact" className="btn btn-primary btn-lg">
                Book Your Free Diagnostic <ArrowRight size={16} />
              </MagneticButton>
              <Link href="/services" className="btn btn-outline btn-lg">
                View All Services
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
          <div className="container">
            <AnimateIn>
              <span className="section-label">RELATED SERVICES</span>
              <h2 className="section-headline">You might also consider.</h2>
            </AnimateIn>
            <div className="services-listing-grid" style={{ marginTop: 'var(--space-12)' }}>
              {relatedServices.map((s, i) => (
                <AnimateIn key={s.slug} delay={i + 1}>
                  <Link href={`/services/${s.slug}`} className="card service-listing-card" data-cursor-hover>
                    <div className="listing-card-header">
                      <span className="listing-card-tier">TIER {String(s.tier).padStart(2, '0')}</span>
                      <span className="listing-card-timeline">{s.timeline}</span>
                    </div>
                    <h3 className="listing-card-name">{s.name}</h3>
                    <p className="listing-card-outcome">{s.outcome}</p>
                    <div className="listing-card-footer">
                      <span className="listing-card-price">{s.price}</span>
                      <span className="listing-card-arrow"><ArrowRight size={16} /></span>
                    </div>
                  </Link>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      )}

      
    </>
  );
}
