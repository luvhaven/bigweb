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

import HomepageHero from '@/components/HomepageHero'
import CleanProcess from '@/components/CleanProcess'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import ClientMarquee from '@/components/trust/ClientMarquee'
import CompetitiveEdge from '@/components/CompetitiveEdge'
import SimplePricing from '@/components/SimplePricing'
import BrutalComparison from '@/components/BrutalComparison'
import ElitePortfolio from '@/components/ElitePortfolio'
import PremiumTestimonials from '@/components/PremiumTestimonials'
import ImpactNumbers from '@/components/ImpactNumbers'
import VideoShowroom from '@/components/VideoShowroom'
import SocialProofToast from '@/components/SocialProofToast'
import ExitIntentModal from '@/components/ExitIntentModal'
import SectionBridge from '@/components/effects/SectionBridge'

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

      <SocialProofToast />
      <ExitIntentModal />
    </main>
  )
}
