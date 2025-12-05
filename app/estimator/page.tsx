'use client'

import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import AIProjectEstimator from '@/components/AIProjectEstimator'

export default function EstimatorPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <AIProjectEstimator mode="full" />
      <Footer />
    </main>
  )
}
