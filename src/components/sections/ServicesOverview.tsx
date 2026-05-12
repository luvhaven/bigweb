'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import AnimateIn from '@/components/ui/AnimateIn';
import TiltCard from '@/components/ui/TiltCard';
import GridDistortion from '@/components/ui/GridDistortion';

export interface Service {
  slug: string;
  name: string;
  tier: number;
  outcome: string;
  price: string;
  timeline: string;
  tier_label?: string;
  tier_headline?: string;
  tier_description?: string;
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <TiltCard maxTilt={10}>
      <Link href={`/services/${service.slug}`} className="svc-card card" data-cursor-hover>
        <div className="svc-card-inner">
          {/* Background watermark number */}
          <span className="svc-card-watermark" aria-hidden="true">0{index + 1}</span>

          {/* Top row: arrow */}
          <div className="svc-card-top">
            <span className="svc-card-arrow"><ArrowUpRight size={16} /></span>
          </div>

          {/* Content */}
          <h4 className="svc-card-name">{service.name}</h4>
          <p className="svc-card-outcome">{service.outcome}</p>

          {/* Bottom meta */}
          <div className="svc-card-meta">
            <span className="svc-card-price">{service.price}</span>
            <span className="svc-card-dot">·</span>
            <span className="svc-card-timeline">{service.timeline}</span>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}

export default function ServicesOverview({ services }: { services: Service[] }) {
  const [active, setActive] = useState(1);

  if (!services || services.length === 0) {
    return null;
  }

  // Derive tiers dynamically from the services data
  const tiersMap = new Map();
  services.forEach(s => {
    if (!tiersMap.has(s.tier)) {
      tiersMap.set(s.tier, {
        id: s.tier,
        tab: s.tier === 1 ? 'Quick Wins' : s.tier === 2 ? 'Growth Engine' : 'Transformation', // short tab name
        label: s.tier_label || `TIER 0${s.tier}`,
        headline: s.tier_headline || 'Service Tier',
        desc: s.tier_description || '',
      });
    }
  });
  
  const TIERS = Array.from(tiersMap.values()).sort((a, b) => a.id - b.id);
  const activeTier = TIERS.find(t => t.id === active) || TIERS[0];
  const activeServices = services.filter((s: Service) => s.tier === active);

  return (
    <section className="section svo-section" id="services" style={{ position: 'relative', overflow: 'hidden' }}>
      <GridDistortion opacity={0.3} />
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>

        {/* Section header */}
        <AnimateIn>
          <span className="section-label">WHAT WE DO</span>
        </AnimateIn>
        <AnimateIn delay={1}>
          <h2 className="svo-headline">
            Structured execution.<br />
            <span className="text-gold">Measurable outcomes.</span>
          </h2>
        </AnimateIn>
        <AnimateIn delay={2}>
          <p className="svo-intro">
            Every engagement is scoped, priced, and tied to a measurable result.
            No open-ended retainers. No vague deliverables. Just outcomes.
          </p>
        </AnimateIn>

        {/* Tier tabs */}
        <AnimateIn delay={3}>
          <div className="svo-tabs" role="tablist" aria-label="Service tiers">
            {TIERS.map(tier => (
              <button
                key={tier.id}
                role="tab"
                aria-selected={active === tier.id}
                onClick={() => setActive(tier.id)}
                className={`svo-tab ${active === tier.id ? 'svo-tab-active' : ''}`}
              >
                <span className="svo-tab-label">{tier.label}</span>
                <span className="svo-tab-name">{tier.tab}</span>
              </button>
            ))}
          </div>
        </AnimateIn>

        {/* Active tier content */}
        <div className="svo-panel" key={active} role="tabpanel">
          <div className="svo-panel-header">
            <div>
              <span className="svo-active-label">{activeTier.label}</span>
              <h3 className="svo-active-headline">{activeTier.headline}</h3>
              <p className="svo-active-desc">{activeTier.desc}</p>
            </div>
            <Link href="/services" className="svo-all-link">
              All services <ArrowRight size={14} />
            </Link>
          </div>

          <div className="svc-grid">
            {activeServices.map((service, i) => (
              <ServiceCard key={service.slug} service={service} index={i} />
            ))}
          </div>
        </div>

      </div>

      
    </section>
  );
}
