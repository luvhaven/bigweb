import { supabase } from '@/utils/supabase'

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

import VideoShowcase from '@/components/VideoShowcase'
import AIProjectEstimator from '@/components/AIProjectEstimator'
import ROICalculator from '@/components/conversion/ROICalculator'
import TestimonialTicker from '@/components/trust/TestimonialTicker'
import BeforeAfterSlider from '@/components/trust/BeforeAfterSlider'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function HomePage() {
  // Fetch Hero Data
  let heroData: any = undefined
  let heroSlides: any[] = []

  try {
    // 1. Fetch Hero Section Metadata
    const { data: sectionData } = await supabase
      .from('hero_sections')
      .select('*')
      .eq('page_slug', 'home')
      .single()

    if (sectionData) {
      // Map DB structure to Component structure for fallback/single mode
      const statItem = sectionData.stats?.[0] || { value: '100%', label: 'Satisfaction' }

      heroData = {
        id: sectionData.id,
        title: `${sectionData.title} ${sectionData.highlight || ''}`,
        subtitle: sectionData.subtitle || 'Premium Web Development',
        description: sectionData.description || '',
        cta: sectionData.cta_primary_text || 'Get Started',
        ctaLink: sectionData.cta_primary_url || '/contact',
        image: sectionData.background_image || '/assets/hero-conversion.png',
        stat: statItem.value || '100%',
        statLabel: statItem.label || 'Satisfaction'
      }

      // 2. Fetch Slides associated with this section
      const { data: slides } = await supabase
        .from('hero_slides')
        .select('*')
        .eq('hero_section_id', sectionData.id)
        .eq('active', true)
        .order('sort_order', { ascending: true })

      if (slides && slides.length > 0) {
        heroSlides = slides.map(s => ({
          id: s.id,
          title: s.title,
          subtitle: s.subtitle || '',
          description: s.description || '',
          cta: s.cta_text || 'Get Started',
          ctaLink: s.cta_link || '/contact',
          image: s.image_url || '/assets/hero-conversion.png',
          stat: s.stat_value || '100%',
          statLabel: s.stat_label || 'Satisfaction',
          video: s.video_url
        }))
      }
    }
  } catch (err) {
    console.error('Error fetching hero data:', err)
  }

  return (
    <>
      <SkipToContent />
      <Navigation />
      <main id="main-content" className="min-h-screen overflow-hidden" role="main" aria-label="Main content">
        <VerticalSplitHero cmsSlide={heroData} slides={heroSlides} />


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

    </>
  )
}
