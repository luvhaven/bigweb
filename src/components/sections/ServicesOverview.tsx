'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95, filter: 'blur(5px)' }}
      transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', damping: 20, stiffness: 100 }}
      layout
      style={{ display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      <Link href={`/services/${service.slug}`} className="svc-card card"
        style={{
          borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-card)', background: 'var(--color-bg-primary)', border: '1px solid rgba(255,255,255,0.02)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          display: 'flex', flexDirection: 'column', height: '100%', flexGrow: 1
        }}
        data-cursor-hover
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
          e.currentTarget.style.borderColor = 'rgba(212,175,106,0.2)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = 'var(--shadow-card)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.02)';
        }}
      >
        <div className="svc-card-inner" style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
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
    </motion.div>
  );
}

export default function ServicesOverview({ services }: { services: Service[] }) {
  const [active, setActive] = useState(1);

  if (!Array.isArray(services) || services.length === 0) {
    return null;
  }

  // Derive tiers dynamically from the services data
  const tiersMap = new Map();
  services.forEach(s => {
    if (!tiersMap.has(s.tier)) {
      let rawLabel = s.tier_label || `TIER 0${s.tier}`;
      // Strip out the "TIER 0X - " prefix to leave only the semantic name (e.g. REVENUE TRANSFORMATION)
      const cleanLabel = rawLabel.replace(/^TIER\s*\d+\s*[–—-]\s*/i, '');

      tiersMap.set(s.tier, {
        id: s.tier,
        tab: s.tier === 1 ? 'Quick Wins' : s.tier === 2 ? 'Growth Engine' : 'Transformation', // short tab name
        label: cleanLabel,
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

          <motion.div layout className="svc-grid">
            <AnimatePresence mode="popLayout">
              {activeServices.map((service, i) => (
                <ServiceCard key={service.slug} service={service} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>

      </div>


    </section>
  );
}
