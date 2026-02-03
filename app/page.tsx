import { getFeaturedProjects } from '@/actions/portfolio'
import { getFeaturedTestimonials } from '@/actions/testimonials'
import { getServices } from '@/actions/services'
import { getHeroByPage } from '@/actions/cms'
import { getPageMetadata } from '@/lib/data/cms'
import type { Metadata } from 'next'

import AdvancedNavigation from '@/components/AdvancedNavigation'
import { EliteImmersiveHero } from '@/components/EliteImmersiveHero'
import ProblemSolution from '@/components/ProblemSolution'
import CompetitiveEdge from '@/components/CompetitiveEdge'
import SimplePricing from '@/components/SimplePricing'
import RevenueRoadmap from '@/components/RevenueRoadmap'
import HowItWorksCards from '@/components/HowItWorksCards'
import ElitePortfolio from '@/components/ElitePortfolio'
import ClientMarquee from '@/components/trust/ClientMarquee'
import PremiumTestimonials from '@/components/PremiumTestimonials'
import Footer from '@/components/Footer'
import LiveStats from '@/components/LiveStats'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Magnetic from '@/components/ui/Magnetic'

// Set to 0 for immediate reflection as requested by user
export const revalidate = 0

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getPageMetadata('/')

  return {
    title: metadata?.title || 'BIGWEB Digital',
    description: metadata?.description || 'Elite Web Engineering',
    keywords: metadata?.keywords || [],
    openGraph: {
      title: metadata?.og_title || metadata?.title || 'BIGWEB Digital',
      description: metadata?.og_description || metadata?.description || 'Elite Web Engineering',
    }
  }
}

export default async function HomePage() {
  // Parallel data fetching for maximum performance
  const [projects, testimonials, services, heroData] = await Promise.all([
    getFeaturedProjects(),
    getFeaturedTestimonials(),
    getServices(),
    getHeroByPage('/')
  ])

  // Extract unique categories for portfolio filters
  const portfolioCategories = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))] as string[]

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent/30">
      <AdvancedNavigation />

      {/* Hero Section - Immersive Design */}
      <EliteImmersiveHero heroData={heroData} />

      {/* Live Statistics - Social Proof */}
      <LiveStats />

      {/* Problem & Solution - Clear Value Prop */}
      <ProblemSolution />

      {/* Why Choose Us - Differentiation */}
      <CompetitiveEdge />

      {/* Social Proof */}
      <ClientMarquee />

      {/* Pricing - Clear Packages / Driven by real services */}
      <SimplePricing />

      {/* The Growth Path - Story Driven Section */}
      <RevenueRoadmap />

      {/* Process - How We Work */}
      <div id="process">
        <HowItWorksCards />
      </div>

      {/* Case Studies - Proof (Dynamic) */}
      <ElitePortfolio
        title="Success Stories"
        showViewAll={true}
        initialProjects={projects}
        initialCategories={portfolioCategories}
      />

      {/* Testimonials (Dynamic) */}
      <div id="testimonials" className="py-20">
        <PremiumTestimonials initialTestimonials={testimonials} />
      </div>

      {/* Final CTA */}
      <section className="py-24 bg-black text-white text-center relative overflow-hidden border-t border-zinc-900">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-[size:20px_20px] opacity-[0.03]" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="text-[10px] font-mono font-bold text-orange-500 mb-8 uppercase tracking-[0.4em]">Project_Initialization_Protocol</div>

          <h2 className="text-5xl md:text-9xl font-black mb-10 italic tracking-tighter-extreme uppercase leading-[0.85]">
            Plug the <br /><span className="text-zinc-800">Leak.</span>
          </h2>

          <p className="text-xl md:text-2xl mb-16 max-w-2xl mx-auto text-zinc-500 font-medium leading-tight">
            Deploy the <span className="text-white italic">Conversion_Audit_System_v1.0</span> and receive your clinical battle plan in 7 days.
          </p>

          <Link href="/offers/revenue-roadmap">
            <Magnetic strength={0.3} className="mx-auto">
              <Button
                className="bg-orange-600 hover:bg-orange-500 text-white font-black text-sm uppercase tracking-widest px-12 h-16 rounded-none shadow-2xl transition-all duration-300 group"
              >
                GET MY REVENUE ROADMAP
                <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Magnetic>
          </Link>

          <div className="mt-16 flex flex-col sm:flex-row justify-center items-center gap-8">
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-widest text-left">EST_Time_to_Deliver</span>
              <span className="text-xs font-bold text-white uppercase text-left">7 Business Days</span>
            </div>
            <div className="w-px h-8 bg-zinc-900" />
            <div className="flex flex-col gap-1">
              <span className="text-[9px] font-mono font-bold text-zinc-600 uppercase tracking-widest text-left">Typical_ROI_Delta</span>
              <span className="text-xs font-bold text-white uppercase text-left">+412% Increase</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
