'use client'

import Navigation from '@/components/AdvancedNavigation'
import SkipToContent from '@/components/SkipToContent'
import VerticalSplitHero from '@/components/VerticalSplitHero'
import ClientMarquee from '@/components/trust/ClientMarquee'
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
import TrustBadges from '@/components/ui/TrustBadges'
import LiveStats from '@/components/LiveStats'
import FloatingActionMenu from '@/components/ui/FloatingActionMenu'
import VideoShowcase from '@/components/VideoShowcase'
import AIProjectEstimator from '@/components/AIProjectEstimator'
import ROICalculator from '@/components/conversion/ROICalculator'
import TestimonialTicker from '@/components/trust/TestimonialTicker'
import BeforeAfterSlider from '@/components/trust/BeforeAfterSlider'

export default function HomePage() {
  return (
    <>
      <SkipToContent />
      <Navigation />
      <main id="main-content" className="min-h-screen overflow-hidden" role="main" aria-label="Main content">
        <VerticalSplitHero />

        {/* Client Logos - Social Proof */}
        <ClientMarquee />

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

        {/* Transformation Showcase */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-12">
              Transforming <span className="text-gradient">Visions</span> into Reality
            </h2>
            <BeforeAfterSlider />
          </div>
        </section>

        <ExpandingServices />
        <EliteSectionDivider variant="curve" flip />

        <EliteProcess />
        <EliteSectionDivider variant="gradient-flow" intensity="bold" flip />

        <TestimonialTicker />
        <PremiumTestimonials />
        <EliteSectionDivider variant="particles" />

        {/* ROI Calculator */}
        <ROICalculator />

        {/* Video Showcase */}
        <VideoShowcase />

        <EliteSectionDivider variant="wave" />
        <EliteCTA />
      </main>
      <Footer />
      <FloatingActionMenu />
    </>
  )
}
