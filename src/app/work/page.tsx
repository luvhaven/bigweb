import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import MagneticButton from '@/components/ui/MagneticButton';
import TopographyField from '@/components/ui/TopographyField';
import { getCaseStudies } from '@/lib/data';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Our Work — BIGWEB Digital',
  description: 'Real results for real businesses. Case studies showing how BIGWEB Digital drives measurable revenue growth.',
};

export default async function WorkPage() {
  const CASE_STUDIES = await getCaseStudies();
  return (
    <>
      {/* Hero */}
      <section className="section work-hero" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-20))', background: 'var(--color-bg-primary)', position: 'relative', overflow: 'hidden' }}>
        <TopographyField />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <AnimateIn>
            <span className="section-label">CLIENT OUTCOMES</span>
          </AnimateIn>
          <AnimateIn delay={1}>
            <h1 className="work-hero-headline">
              Results, not<br />
              <span className="text-gold">reports.</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={2}>
            <p className="work-hero-sub">
              Every case study below represents a business that was underperforming digitally &mdash; and now isn&apos;t.
              Real clients, real numbers, real timelines.
            </p>
          </AnimateIn>

          {/* Aggregate stats */}
          <AnimateIn delay={3}>
            <div className="work-hero-stats">
              {[
                { num: '288%', label: 'Avg revenue increase' },
                { num: '$140K+', label: 'Avg annual revenue lift per client' },
                { num: '94%', label: 'Client retention rate' },
              ].map((s) => (
                <div key={s.label} className="work-stat">
                  <span className="work-stat-num">{s.num}</span>
                  <span className="work-stat-label">{s.label}</span>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Case Studies */}
      {CASE_STUDIES.map((cs, i) => (
        <section key={cs.id} className="section work-case" style={{ background: i % 2 === 0 ? 'var(--color-bg-primary)' : 'var(--color-bg-secondary)' }}>
          <div className="container">
            <div className="work-case-grid">
              {/* Left: narrative */}
              <div className="work-case-narrative">
                <AnimateIn>
                  <div className="work-case-header">
                    <span className="work-case-index">{`0${i + 1}`}</span>
                    <div>
                      <h2 className="work-case-client">{cs.client}</h2>
                      <span className="work-case-location">{cs.location}</span>
                    </div>
                  </div>
                </AnimateIn>

                <AnimateIn delay={1}>
                  <div className="work-case-tags">
                    {(cs.tags as string[]).map((tag: string) => (
                      <span key={tag} className="work-case-tag">{tag}</span>
                    ))}
                  </div>
                </AnimateIn>

                <AnimateIn delay={2}>
                  <div className="work-case-block">
                    <span className="work-case-block-label">The Problem</span>
                    <p className="work-case-problem">{cs.problem}</p>
                  </div>
                </AnimateIn>

                <AnimateIn delay={3}>
                  <div className="work-case-block">
                    <span className="work-case-block-label">What We Delivered</span>
                    <p>{cs.delivered}</p>
                  </div>
                </AnimateIn>

                <AnimateIn delay={4}>
                  <div className="work-case-block work-case-result-block">
                    <span className="work-case-block-label">The Result</span>
                    <p className="work-case-result-text">{cs.result}</p>
                  </div>
                </AnimateIn>

                <AnimateIn delay={5}>
                  <div style={{ marginTop: 'var(--space-6)' }}>
                    <Link href={`/work/${cs.slug}`} className="btn btn-outline" style={{ padding: '0.75rem 1.5rem', borderRadius: '4px', fontSize: 'var(--text-sm)' }}>
                      Read Full Case Study <ArrowRight size={14} style={{ marginLeft: '6px' }} />
                    </Link>
                  </div>
                </AnimateIn>
              </div>

              {/* Right: big metric */}
              <AnimateIn delay={2}>
                <div className="work-case-metric-panel" style={{ position: 'relative', overflow: 'hidden' }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: `url(${cs.image})`,
                    backgroundSize: 'cover', backgroundPosition: 'center',
                    filter: 'grayscale(0.8) brightness(0.25)', zIndex: 0
                  }} />
                  <div className="work-case-metric-inner" style={{ position: 'relative', zIndex: 1 }}>
                    <span className="work-metric-num">{cs.metric}</span>
                    <span className="work-metric-label">{cs.metric_label}</span>
                    <div className="work-metric-sep" />
                    <span className="work-metric-timeline-label">Achieved in</span>
                    <span className="work-metric-timeline">{cs.timeline}</span>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="section" style={{ background: 'var(--color-bg-primary)', textAlign: 'center' }}>
        <div className="container">
          <AnimateIn>
            <span className="section-label">YOUR BUSINESS NEXT</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, var(--text-5xl))', fontFamily: 'var(--font-display)', fontWeight: 900, margin: 'var(--space-4) 0 var(--space-6)', lineHeight: 1.15 }}>
              Ready to become a case study?
            </h2>
            <p style={{ color: 'var(--color-text-secondary)', maxWidth: 500, margin: '0 auto var(--space-8)', fontSize: 'var(--text-lg)', lineHeight: 1.7 }}>
              Book a free diagnostic call and we&apos;ll show you exactly where the revenue opportunity is hiding in your business.
            </p>
            <MagneticButton href="/contact" className="btn btn-primary btn-lg">
              Get Your Free Diagnostic <ArrowRight size={16} />
            </MagneticButton>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}


