import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import MagneticButton from '@/components/ui/MagneticButton';
import TiltCard from '@/components/ui/TiltCard';
import ProximityCard from '@/components/ui/ProximityCard';
import CinematicShine from '@/components/ui/CinematicShine';

const tiers = [
  {
    num: '01',
    name: 'Quick Wins',
    tagline: 'Results in weeks, not months.',
    priceFrom: 'Min. $2,500',
    priceNote: 'engagement',
    description: 'Fixed-scope, fast-delivery engagements. Low risk, measurable outcomes. Perfect first step.',
    includes: [
      'Conversion Audit + Fix Sprint',
      'Landing Page Revenue Engine',
      'Site Speed & Core Web Vitals Fix',
      'Authority Redesign Package',
    ],
    cta: 'Start a Quick Win',
    featured: false,
  },
  {
    num: '02',
    name: 'Growth Engine',
    tagline: 'Compounding returns month over month.',
    priceFrom: 'Min. $3,000',
    priceNote: '/ mo engagement',
    description: 'Ongoing engagements that compound. We execute, measure, and iterate â€” every month.',
    includes: [
      'CRO Retainer',
      'AI Sales Agent Build & Management',
      'Revenue Funnel System',
      'Business Intelligence Dashboard',
    ],
    cta: 'Build a Growth Engine',
    featured: true,
  },
  {
    num: '03',
    name: 'Transformation',
    tagline: 'Full-scale digital revenue overhaul.',
    priceFrom: 'Min. $8,000',
    priceNote: 'engagement',
    description: 'Deep, strategic engagements. Not a vendor relationship â€” a true digital revenue partnership.',
    includes: [
      'Digital Revenue Overhaul',
      'SaaS & Web App Development',
      'AI Operations Integration',
      'Fractional CTO / Digital Partner',
    ],
    cta: 'Explore Transformation',
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section className="section" id="pricing" style={{ background: 'var(--color-bg-tertiary)', position: 'relative', overflow: 'hidden' }}>
      <CinematicShine />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <AnimateIn>
          <span className="section-label">INVESTMENT</span>
        </AnimateIn>
        <AnimateIn delay={1}>
          <h2 className="section-headline">
            Radical pricing<br />
            <span className="text-gold">transparency.</span>
          </h2>
        </AnimateIn>
        <AnimateIn delay={2}>
          <p style={{ maxWidth: 600, marginBottom: 'var(--space-12)', fontSize: 'var(--text-lg)', lineHeight: 1.75, color: 'var(--color-text-secondary)' }}>
            Most agencies make you jump on a call before you hear a number. We think
            that&apos;s disrespectful of your time. Here&apos;s what things cost â€” real ranges, real scopes.
          </p>
        </AnimateIn>

        {/* Tier cards */}
        <div className="pricing-grid">
          {tiers.map((tier, i) => (
              <AnimateIn key={i} delay={i + 1}>
                <TiltCard maxTilt={6}>
                  <ProximityCard 
                    className="card" 
                    innerClassName={`pricing-card ${tier.featured ? 'pricing-featured' : ''}`}
                  >
                    {tier.featured && (
                      <div className="pricing-popular-badge">Most Popular</div>
                    )}

                    {/* Header */}
                    <div className="pricing-card-header">
                      <span className="pricing-tier-num">{tier.num}</span>
                      <h3 className="pricing-name">{tier.name}</h3>
                      <p className="pricing-tagline">{tier.tagline}</p>
                    </div>

                    {/* Price */}
                    <div className="pricing-price-block">
                      <span className="pricing-amount">{tier.priceFrom}</span>
                      <span className="pricing-note">{tier.priceNote}</span>
                    </div>

                    {/* Description */}
                    <p className="pricing-desc">{tier.description}</p>

                    {/* Includes */}
                    <ul className="pricing-includes">
                      {tier.includes.map(item => (
                        <li key={item} className="pricing-include-item">
                          <Check size={13} className="pricing-check" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <MagneticButton href="/contact" className={`btn ${tier.featured ? 'btn-primary' : 'btn-outline'} pricing-btn`} style={{ marginTop: 'auto', width: '100%', justifyContent: 'center' }}>
                      {tier.cta} <ArrowRight size={16} />
                    </MagneticButton>
                    <p style={{ fontSize: '0.58rem', color: 'var(--color-text-tertiary)', textAlign: 'center', marginTop: 'var(--space-2)', letterSpacing: '0.04em', lineHeight: 1.5 }}>
                      {tier.featured ? '94% client retention Â· Most requested tier' : tier.num === '01' ? 'No retainer Â· No lock-in commitment' : 'Strategic partnership Â· By application'}
                    </p>
                  </ProximityCard>
                </TiltCard>
              </AnimateIn>
          ))}
        </div>

        {/* Footer note */}
        <AnimateIn delay={4}>
          <p className="pricing-footer-note">
            All engagements begin with a free 20-minute diagnostic call. We&apos;ll tell you exactly
            which service fits â€” and if none of them do, we&apos;ll tell you that too.
          </p>
        </AnimateIn>
      </div>

      
    </section>
  );
}
