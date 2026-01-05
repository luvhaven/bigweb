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
    // 1. Fetch Hero Section Metadata (New Schema)
    const { data: sectionData } = await supabase
      .from('cms_heroes')
      .select('*')
      .eq('slug', 'home')
      .single()

    if (sectionData) {
      // Map DB structure to Component structure for fallback/single mode
      // cms_heroes stores stats as JSONB: [{ label, value }]
      const stats = sectionData.stats || []
      const statItem = stats[0] || { value: '100%', label: 'Satisfaction' }

      heroData = {
        id: sectionData.id,
        title: sectionData.title,
        highlight: sectionData.highlight_text,
        subtitle: sectionData.subtitle || 'Premium Web Development',
        description: sectionData.description || '',
        cta: sectionData.cta_primary_text || 'Get Started',
        ctaLink: sectionData.cta_primary_link || '/contact',
        image: sectionData.media_url || '/assets/hero-conversion.png',
        stat: statItem.value || '100%',
        statLabel: statItem.label || 'Satisfaction'
      }

      // 2. Fetch Slides associated with this section
      const { data: slides } = await supabase
        .from('cms_hero_slides')
        .select('*')
        .eq('hero_id', sectionData.id)
        .eq('is_active', true)
        .order('sort_order', { ascending: true })

      if (slides && slides.length > 0) {
        heroSlides = slides.map(s => ({
          id: s.id,
          title: s.title,
          subtitle: s.subtitle || '',
          description: s.description || '',
          cta: s.cta_text || 'Get Started',
          ctaLink: s.cta_link || '/contact',
          image: s.media_url || '/assets/hero-conversion.png',
          // Slides in new schema don't have individual stats - use parent or hardcoded interesting stats for variety if desired, 
          // or just fallback to main hero stat.
          stat: statItem.value || '100%',
          statLabel: statItem.label || 'Satisfaction',
          video: s.media_type === 'video' ? s.media_url : null
        }))
      }
    }
  } catch (err) {
    console.error('Error fetching hero data:', err)
  }

  let servicesData: any[] = []

  // 3. Fetch Services
  const { data: services } = await supabase
    .from('cms_services')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (services) {
    servicesData = services.map(s => ({
      title: s.title,
      slug: s.slug,
      tagline: s.short_description,
      description: s.full_description?.slice(0, 150) + '...', // Truncate for card
      features: s.features || [],
      // Map benefits or use generic results if not available
      results: s.benefits?.[0] || 'Proven Results',
      image: s.hero_image_url || '/assets/service-default.jpg'
    }))
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

        <ExpandingServices services={servicesData} />
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
