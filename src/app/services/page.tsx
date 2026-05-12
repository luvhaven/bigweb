import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import GridDistortion from '@/components/ui/GridDistortion';
import NoiseField from '@/components/ui/NoiseField';
import { getServicesByTier } from '@/lib/data';

export const revalidate = 0;

export const metadata: Metadata = {
  title: 'Services — BIGWEB Digital',
  description: 'Structured execution with measurable outcomes. From $2,500 conversion audits to comprehensive digital revenue transformations.',
};

interface Service {
  slug: string;
  tier: number;
  name: string;
  outcome: string;
  price: string;
  timeline: string;
}

const TIER_STYLES: Record<number, { borderColor: string; badge?: string; badgeColor?: string }> = {
  1: { borderColor: 'var(--color-bg-border)' },
  2: { borderColor: 'rgba(212,175,106,0.2)', badge: 'POPULAR', badgeColor: 'rgba(212,175,106,0.12)' },
  3: {
    borderColor: 'rgba(212,175,106,0.5)',
    badge: 'STRATEGIC',
    badgeColor: 'rgba(212,175,106,0.15)',
  },
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const tierStyle = TIER_STYLES[service.tier] || TIER_STYLES[1];
  return (
    <AnimateIn delay={index % 4 + 1}>
      <Link
        href={`/services/${service.slug}`}
        className="card service-listing-card"
        data-cursor-hover
        style={{ borderColor: tierStyle.borderColor, position: 'relative' }}
      >
        {tierStyle.badge && (
          <span style={{
            position: 'absolute', top: 16, right: 16,
            fontSize: 10, fontWeight: 800, letterSpacing: '0.12em',
            color: 'var(--color-gold-bright)', background: tierStyle.badgeColor,
            border: '1px solid rgba(212,175,106,0.25)',
            padding: '3px 8px', borderRadius: 2,
          }}>
            {tierStyle.badge}
          </span>
        )}
        <div className="listing-card-header">
          <span className="listing-card-tier">TIER {String(service.tier).padStart(2, '0')}</span>
          <span className="listing-card-timeline">{service.timeline}</span>
        </div>
        <h3 className="listing-card-name" style={service.tier === 3 ? { fontSize: 'var(--text-xl)' } : {}}>
          {service.name}
        </h3>
        <p className="listing-card-outcome">{service.outcome}</p>
        <div className="listing-card-footer">
          <span className="listing-card-price" style={service.tier === 3 ? { color: 'var(--color-gold-bright)', fontSize: 'var(--text-sm)' } : {}}>
            {service.price}
          </span>
          <span className="listing-card-arrow"><ArrowRight size={16} /></span>
        </div>
      </Link>
    </AnimateIn>
  );
}


export default async function ServicesPage() {
  const [tier1, tier2, tier3] = await Promise.all([
    getServicesByTier(1),
    getServicesByTier(2),
    getServicesByTier(3),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="section" style={{ paddingTop: 'calc(var(--nav-height) + var(--space-20))', background: 'var(--color-bg-primary)', position: 'relative', overflow: 'hidden' }}>
        <GridDistortion opacity={0.2} gridSize={40} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <AnimateIn>
            <span className="section-label">OUR SERVICES</span>
          </AnimateIn>
          <AnimateIn delay={1}>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, var(--text-7xl))', fontFamily: 'var(--font-display)', fontWeight: 900, lineHeight: 1.1, marginBottom: 'var(--space-6)', maxWidth: 800 }}>
              12 engagements.<br /><span className="text-gold">$2M+ in client revenue.</span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={2}>
            <p style={{ maxWidth: 600, fontSize: 'var(--text-lg)', lineHeight: 1.7, color: 'var(--color-text-secondary)' }}>
              Every engagement is scoped around a specific problem and a measurable outcome. No open-ended retainers. No vague deliverables. No surprises on the invoice. Just one question: which one does your business need right now?
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Tier 1 */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)', position: 'relative', overflow: 'hidden' }}>
        <NoiseField opacity={0.4} color="212, 175, 106" particleCount={150} speed={0.0003} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <AnimateIn>
            <span className="section-label">{tier1[0]?.tier_label || 'TIER 01'}</span>
            <h2 className="section-headline">{tier1[0]?.tier_headline || 'Quick Wins'}</h2>
            <p style={{ maxWidth: 600, marginBottom: 'var(--space-8)' }}>{tier1[0]?.tier_description || 'Fixed-scope, fast-delivery products. Clear outcomes. Low risk.'}</p>
          </AnimateIn>
          <div className="services-listing-grid">
            {tier1.map((s: Service, i: number) => <ServiceCard key={s.slug} service={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* Tier 2 */}
      <section className="section" style={{ background: 'var(--color-bg-primary)' }}>
        <div className="container">
          <AnimateIn>
            <span className="section-label">{tier2[0]?.tier_label || 'TIER 02'}</span>
            <h2 className="section-headline">{tier2[0]?.tier_headline || 'Growth Engine'}</h2>
            <p style={{ maxWidth: 600, marginBottom: 'var(--space-8)' }}>{tier2[0]?.tier_description || 'Ongoing partnerships that generate consistent, compounding returns.'}</p>
          </AnimateIn>
          <div className="services-listing-grid">
            {tier2.map((s: Service, i: number) => <ServiceCard key={s.slug} service={s} index={i} />)}
          </div>
        </div>
      </section>

      {/* Tier 3 */}
      <section className="section" style={{ background: 'var(--color-bg-secondary)' }}>
        <div className="container">
          <AnimateIn>
            <span className="section-label">{tier3[0]?.tier_label || 'TIER 03'}</span>
            <h2 className="section-headline">{tier3[0]?.tier_headline || 'Revenue Transformation'}</h2>
            <p style={{ maxWidth: 600, marginBottom: 'var(--space-8)' }}>{tier3[0]?.tier_description || 'High-ticket, deeply strategic engagements.'}</p>
          </AnimateIn>
          <div className="services-listing-grid">
            {tier3.map((s: Service, i: number) => <ServiceCard key={s.slug} service={s} index={i} />)}
          </div>
        </div>
      </section>
    </>
  );
}
