/**
 * BIGWEB Digital — Single Source of Truth for All Pricing
 * ─────────────────────────────────────────────────────────
 * Any time pricing is displayed anywhere on the site (SimplePricing,
 * PricingTable, FinalCTA, Services page, offers pages) it MUST
 * import from here. No hardcoded pricing data elsewhere.
 */

import { Compass, Zap, Shield } from 'lucide-react'

export interface PricingPackage {
    id: string
    name: string
    tagline: string
    price: string
    priceNote: string
    description: string
    features: string[]
    cta: string
    ctaLink: string
    highlighted: boolean
    badge?: string
    color: string
    ideal: string
    outcome: string   // Client-outcome framing (for FinalCTA)
    icon: typeof Compass
}

export const PRICING_PACKAGES: PricingPackage[] = [
    {
        id: 'revenue-roadmap',
        name: 'Revenue Roadmap',
        tagline: 'Your strategic foundation.',
        price: '$4,997',
        priceNote: 'one-time',
        description: 'A 2-week intensive discovery and strategy sprint. You walk away with a battle-tested growth blueprint — your roadmap to dominance, before a single pixel is designed.',
        features: [
            'In-depth competitor analysis (20+ hours)',
            'Custom conversion architecture blueprint',
            'Priority KPI framework & tracking plan',
            'Audience segmentation & ICP refinement',
            'Growth opportunity scorecard',
            '60-min strategic debrief with our principals',
        ],
        cta: 'Book Discovery Sprint',
        ctaLink: '/offers/revenue-roadmap',
        highlighted: false,
        badge: undefined,
        color: '#6366f1',
        ideal: 'Pre-launch startups · Brands with traffic but low conversion',
        outcome: 'I need a clear strategy before I invest',
        icon: Compass,
    },
    {
        id: 'revenue-system',
        name: 'The Monolith™ System',
        tagline: 'Full-stack revenue transformation.',
        price: 'From $18,000',
        priceNote: 'project-based',
        description: 'Our flagship engagement. A complete website or digital product, engineered end-to-end to acquire, convert, and retain customers at world-class performance levels.',
        features: [
            'Everything in Revenue Roadmap',
            'Full brand system & design language',
            'Elite frontend engineering (Next.js + TypeScript)',
            'CMS setup with full team training',
            'Technical SEO & Core Web Vitals architecture',
            'Post-launch 30-day optimization sprint',
            'Full analytics & conversion tracking suite',
        ],
        cta: 'Start Your Project',
        ctaLink: '/offers/revenue-system',
        highlighted: true,
        badge: 'Most Chosen',
        color: '#d4a853',
        ideal: 'Scale-ups launching new products · Enterprise rebrands · Series A companies',
        outcome: 'I need a flagship digital system that converts',
        icon: Zap,
    },
    {
        id: 'growth-retainer',
        name: 'Growth Retainer',
        tagline: 'Perpetual compounding growth.',
        price: 'From $6,000',
        priceNote: '/month',
        description: 'Retain our senior team as your embedded digital growth unit. Monthly strategy, CRO testing, content engineering, and performance reporting — everything you need to dominate your market, continuously.',
        features: [
            'Dedicated Senior Strategist + Lead Engineer',
            'Monthly CRO experiments & A/B tests',
            'Content strategy & production pipeline',
            'Monthly analytics review & roadmap updates',
            'Priority development sprints',
            'Unlimited Slack access to senior team',
        ],
        cta: 'Apply for Retainer',
        ctaLink: '/offers/retainer',
        highlighted: false,
        badge: 'Best Long-Term ROI',
        color: '#10b981',
        ideal: 'Funded startups · D2C brands · SaaS companies at scale',
        outcome: 'I need continuous managed growth',
        icon: Shield,
    },
]

/** Convenience lookup by ID */
export function getPricingPackage(id: string): PricingPackage | undefined {
    return PRICING_PACKAGES.find(p => p.id === id)
}
