import { supabase } from '@/utils/supabase'

import ConversionNavigation from '@/components/ConversionNavigation'
import SkipToContent from '@/components/SkipToContent'
import VerticalSplitHero from '@/components/VerticalSplitHero'
import ProblemSolution from '@/components/ProblemSolution'
import ConversionOffers, { Offer } from '@/components/ConversionOffers'
import TechStack3D from '@/components/TechStack3D'
import ConversionProcess from '@/components/ConversionProcess'
import AuthoritySection from '@/components/AuthoritySection'
import ForensicComparison from '@/components/ForensicComparison'
import ElitePortfolio from '@/components/ElitePortfolio'
import ClientMarquee from '@/components/trust/ClientMarquee'
import PremiumTestimonials from '@/components/PremiumTestimonials'
import Footer from '@/components/Footer'
import LiveStats from '@/components/LiveStats'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function HomePage() {
  // Use the predefined High-Conversion Offers instead of legacy DB services
  const offers: Offer[] = [
    {
      iconName: "BarChart3",
      title: "Conversion Diagnostic",
      price: "$399",
      subtitle: "The Entry Point",
      description: "A forensic analysis of your current funnel, messaging, and user experience. We uncover exactly where you are losing revenue.",
      features: ["Full funnel breakdown", "Conversion blocker identification", "Messaging clarity score", "Prioritized fix list"],
      cta: "Start Your Diagnostic",
      link: "/offers/diagnostic",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      highlight: false
    },
    {
      iconName: "Zap",
      title: "Conversion Fix Sprint",
      price: "$1,000+",
      subtitle: "Rapid Execution",
      description: "We surgically fix the critical 20% that drives 80% of your results. Fast, focused execution on high-impact conversion points.",
      features: ["1-3 Critical page fixes", "Headline & Copy optimization", "CTA placement & design", "Speed optimization"],
      cta: "Fix My Website",
      link: "/offers/fix-sprint",
      color: "text-accent",
      bg: "bg-accent/10",
      highlight: true
    },
    {
      iconName: "Layers",
      title: "Revenue Website System",
      price: "$3,000+",
      subtitle: "The Full Build",
      description: "A complete rebuild from the ground up, engineered for conversion psychology first, visual design second.",
      features: ["Complete architecture rebuild", "Conversion-focused copywriting", "Next.js performance stack", "Full mobile optimization"],
      cta: "Build Revenue System",
      link: "/offers/revenue-system",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      highlight: false
    },
    {
      iconName: "RefreshCw",
      title: "Optimization Retainer",
      price: "$500 - $2k/mo",
      subtitle: "Continuous Growth",
      description: "Your in-house conversion team. We constantly monitor, A/B test, and refine your site to squeeze every drop of ROI.",
      features: ["Monthly A/B testing", "Heatmap analysis", "Performance monitoring", "Iterative copy updates"],
      cta: "Discuss Retainer",
      link: "/offers/retainer",
      color: "text-green-500",
      bg: "bg-green-500/10",
      highlight: false
    }
  ]

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-accent/30">
      <SkipToContent />
      <ConversionNavigation />

      {/* Hero Section - The "Hook" */}
      <VerticalSplitHero />

      {/* Live Statistics - Immediate Social Proof */}
      <LiveStats />

      {/* Problem & Solution - The "Why" */}
      <ProblemSolution />

      {/* Social Proof Interlude */}
      <ClientMarquee />

      {/* The Offers - The "What" */}
      <ConversionOffers offers={offers.length > 0 ? offers : undefined} />

      {/* Tech Stack - "Elite" Visualizer */}
      <TechStack3D />

      {/* Process - The "How" */}
      <ConversionProcess />

      {/* Forensic Comparison - The "Proof of Protocol" */}
      <ForensicComparison />

      {/* Authority - The "Who" */}
      <AuthoritySection />

      {/* Case Studies - The "Proof" */}
      <div className="py-24 bg-card/30">
        <ElitePortfolio title="The Laboratory Archive" />
      </div>

      {/* Results/Reviews */}
      <div className="py-12">
        <PremiumTestimonials />
      </div>

      {/* Final CTA handled by Footer/Navigation, or add specific one here */}
      <section className="py-24 bg-accent text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold mb-6">Stop Leaving Money on the Table</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Your competition is already optimizing. Get a clear roadmap to higher revenue today.
          </p>
          <a
            href="/offers/diagnostic"
            className="inline-flex h-14 items-center justify-center rounded-md bg-white text-accent hover:bg-white/90 px-8 text-lg font-bold transition-colors shadow-xl"
          >
            Start Your Diagnostic
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
