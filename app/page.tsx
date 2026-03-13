import { getFeaturedProjects } from '@/actions/portfolio'
import { getFeaturedTestimonials } from '@/actions/testimonials'
import { getServices } from '@/actions/services'
import { getPageMetadata } from '@/lib/data/cms'
import {
  getCmsProjects,
  getCmsTestimonials,
  getCmsGrowthPackages,
  getEngagements,
  getCmsFooterData,
  getCmsHero,
  getStatistics,
  getProcessPhases,
  getCmsClients,
  getVideoShowroom,
} from '@/actions/cms'
import { getGlobalStats } from '@/actions/stats'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'

/* ─── Eagerly loaded: above the fold ─── */
import HomepageHero from '@/components/HomepageHero'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import ClientMarquee from '@/components/trust/ClientMarquee'
import SectionBridge from '@/components/effects/SectionBridge'

/* ─── Lazy loaded: below the fold — only fetched after hero paints ─── */
const CompetitiveEdge = dynamic(() => import('@/components/CompetitiveEdge'))
const ElitePortfolio = dynamic(() => import('@/components/ElitePortfolio'))
const ImpactNumbers = dynamic(() => import('@/components/ImpactNumbers'))
const CleanProcess = dynamic(() => import('@/components/CleanProcess'))
const BrutalComparison = dynamic(() => import('@/components/BrutalComparison'))
const VideoShowroom = dynamic(() => import('@/components/VideoShowroom'))
const PremiumTestimonials = dynamic(() => import('@/components/PremiumTestimonials'))
const SimplePricing = dynamic(() => import('@/components/SimplePricing'))
const FinalCTA = dynamic(() => import('@/components/FinalCTA'))
const Footer = dynamic(() => import('@/components/Footer'))

/* ─── Non-critical UI overlays: fully deferred client-side only ─── */
import ClientOverlays from '@/components/ClientOverlays'

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getPageMetadata('/').catch(() => null)

  return {
    title: metadata?.title || 'BIGWEB Digital — The World\'s #1 Revenue-Focused Web Agency',
    description: metadata?.description || 'We engineer digital revenue machines for industry leaders and ambitious startups. Strategy, design, and elite web engineering that compounds growth.',
    keywords: metadata?.keywords || [],
    openGraph: {
      title: metadata?.og_title || metadata?.title || 'BIGWEB Digital',
      description: metadata?.og_description || metadata?.description || 'Strategy, design, and engineering for brands that refuse to blend in.',
    }
  }
}

export default async function HomePage() {
  const [
    projects,
    cmsProjects,
    testimonials,
    cmsTestimonials,
    services,
    stats,
    statistics,
    heroStats,
    engagements,
    cmsPackages,
    footerData,
    processPhases,
    clients,
    hero,
    videos,
  ] = await Promise.all([
    getFeaturedProjects().catch(() => []),
    getCmsProjects(true).catch(() => []),
    getFeaturedTestimonials().catch(() => []),
    getCmsTestimonials(true).catch(() => []),
    getServices().catch(() => []),
    getGlobalStats().catch(() => null),
    getStatistics().catch(() => []),
    getStatistics('homepage-hero').catch(() => []),
    getEngagements().catch(() => []),
    getCmsGrowthPackages().catch(() => []),
    getCmsFooterData().catch(() => ({ settings: null, sections: [] })),
    getProcessPhases().catch(() => []),
    getCmsClients().catch(() => []),
    getCmsHero('homepage').catch(() => null),
    getVideoShowroom().catch(() => []),
  ])

  const finalProjects = projects.length > 0 ? projects : cmsProjects
  const finalTestimonials = testimonials.length > 0 ? testimonials : cmsTestimonials

  return (
    <main className="relative min-h-screen bg-[#040404] text-foreground overflow-clip max-w-[100vw]">
      <AdvancedNavigation />

      {/* 1. Hero */}
      <HomepageHero
        stats={heroStats.length > 0 ? heroStats : stats}
        hero={hero}
      />

      {/* 2. Client Social Proof */}
      <SectionBridge variant="neutral" fromColor="#040404" toColor="#050505" />
      <ClientMarquee
        initialStats={stats}
        initialClients={clients}
      />

      {/* 3. Services */}
      <SectionBridge variant="gold" fromColor="#050505" toColor="#040404" label="Services" />
      <CompetitiveEdge initialServices={services} />

      {/* 4. Selected Work */}
      <SectionBridge variant="indigo" fromColor="#040404" toColor="#050505" label="Portfolio" />
      <ElitePortfolio initialProjects={finalProjects} />

      {/* 5. Impact Numbers */}
      <SectionBridge variant="gold" fromColor="#050505" toColor="#040404" label="Results" />
      <ImpactNumbers initialStats={statistics} />

      {/* 6. Process */}
      <SectionBridge variant="neutral" fromColor="#040404" toColor="#060606" label="Process" />
      <CleanProcess initialPhases={processPhases} />

      {/* 7. Comparison */}
      <SectionBridge variant="gold" fromColor="#060606" toColor="#040404" label="Why BIGWEB" />
      <BrutalComparison />

      {/* 8. Video Showroom */}
      <SectionBridge variant="emerald" fromColor="#040404" toColor="#050505" label="In Action" />
      <VideoShowroom initialVideos={videos} />

      {/* 9. Testimonials */}
      <SectionBridge variant="emerald" fromColor="#050505" toColor="#060606" label="Client Proof" />
      <PremiumTestimonials initialTestimonials={finalTestimonials} />

      {/* 10. Pricing */}
      <SectionBridge variant="gold" fromColor="#060606" toColor="#040404" label="Pricing" />
      <SimplePricing initialPackages={engagements.length > 0 ? engagements : cmsPackages} />

      {/* 11. Final CTA */}
      <SectionBridge variant="gold" fromColor="#040404" toColor="#040404" />
      <FinalCTA />

      <Footer footerData={footerData} />

      <ClientOverlays />
    </main>
  )
}
