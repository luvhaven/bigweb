'use client'

import CinematicHero from '@/components/CinematicHero'

interface HeroStat {
    value: string
    label: string
}

interface CmsHero {
    title?: string
    highlight_text?: string
    subtitle?: string
    description?: string
    cta_primary_text?: string
    cta_primary_link?: string
    cta_secondary_text?: string
    cta_secondary_link?: string
    stats?: HeroStat[]
}

interface HomepageHeroProps {
    stats?: HeroStat[] | null
    hero?: CmsHero | null
}

const defaultStats: HeroStat[] = [
    { label: 'Client Revenue', value: '$2B+' },
    { label: 'Avg. Conversion Uplift', value: '+340%' },
    { label: 'Client Retention', value: '98%' },
]

/**
 * Homepage-specific hero wrapper.
 * Accepts live data from the DB (cms_heroes + statistics tables),
 * with hardcoded fallbacks when DB is not available.
 */
export default function HomepageHero({ stats, hero }: HomepageHeroProps) {
    const liveStats = (stats && stats.length > 0)
        ? stats.slice(0, 3).map(s => ({ label: s.label, value: s.value }))
        : defaultStats

    return (
        <CinematicHero
            showPreloader={false}
            title={
                <>
                    <span className="hero-line block" style={{ perspective: '1000px' }}>
                        Your website should
                    </span>
                    <span className="hero-line block" style={{ perspective: '1000px' }}>
                        be earning. <em className="text-accent italic font-medium">Is it?</em>
                    </span>
                </>
            }
            subtitle={hero?.subtitle || hero?.description || 'Elite agencies and ambitious founders come to BIGWEB for one reason: results. We engineer digital revenue machines — measurable, compounding, unstoppable.'}
            ctaText={hero?.cta_primary_text || 'Start Your Project'}
            ctaLink={hero?.cta_primary_link || '/contact'}
            secondaryCtaText={hero?.cta_secondary_text || 'View the Work'}
            secondaryCtaLink={hero?.cta_secondary_link || '/case-studies'}
            metrics={liveStats}
            showUrgencyBadge={true}
        />
    )
}

