'use client'

import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import ElitePortfolio from '@/components/ElitePortfolio'
import PortfolioCTA from '@/components/PortfolioCTA'

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-20">
        <ElitePortfolio title="Our Work" />
        <PortfolioCTA />
      </div>

      <Footer />
    </main>
  )
}
