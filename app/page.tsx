'use client'

import Navigation from '@/components/AdvancedNavigation'
import SkipToContent from '@/components/SkipToContent'
import VerticalSplitHero from '@/components/VerticalSplitHero'
import ElitePortfolio from '@/components/ElitePortfolio'
import EliteAbout from '@/components/EliteAbout'
import CompetitiveEdge from '@/components/CompetitiveEdge'
import ExpandingServices from '@/components/ExpandingServices'
import EliteProcess from '@/components/EliteProcess'
import EliteStatistics from '@/components/EliteStatistics'
import PremiumTestimonials from '@/components/PremiumTestimonials'
import EliteSectionDivider from '@/components/EliteSectionDivider'
import EliteCTA from '@/components/EliteCTA'
import Footer from '@/components/Footer'
import ExitIntent from '@/components/ui/ExitIntent'
import TrustBadges from '@/components/ui/TrustBadges'
import LiveStats from '@/components/LiveStats'
import FloatingActionMenu from '@/components/ui/FloatingActionMenu'
import VideoShowcase from '@/components/VideoShowcase'
import AIProjectEstimator from '@/components/AIProjectEstimator'

export default function HomePage() {
  return (
    <>
      <SkipToContent />
      <Navigation />
      <main id="main-content" className="min-h-screen overflow-hidden" role="main" aria-label="Main content">
        <VerticalSplitHero />

        {/* Trust Indicators */}
        <section className="py-12 bg-secondary/5">
          <div className="container mx-auto">
            <TrustBadges />
          </div>
        </section>

        <EliteSectionDivider variant="particles" />
        <EliteStatistics />
        <EliteSectionDivider variant="gradient-flow" intensity="medium" />

        {/* Live Stats */}
        <LiveStats />

        <EliteSectionDivider variant="wave" />
        <ElitePortfolio />

        {/* AI Project Estimator - Premium Feature */}
        <EliteSectionDivider variant="gradient-flow" intensity="bold" />
        <AIProjectEstimator />

        <EliteSectionDivider variant="wave" />
        <EliteAbout />
        <CompetitiveEdge />
        <EliteSectionDivider variant="mesh" />
        <ExpandingServices />
        <EliteSectionDivider variant="curve" flip />
        <EliteProcess />
        <EliteSectionDivider variant="gradient-flow" intensity="bold" flip />
        <PremiumTestimonials />
        <EliteSectionDivider variant="particles" />

        {/* Video Showcase */}
        <VideoShowcase />

        <EliteSectionDivider variant="wave" />
        <EliteCTA />
      </main>
      <Footer />
      <ExitIntent />
      <FloatingActionMenu />
    </>
  )
}
