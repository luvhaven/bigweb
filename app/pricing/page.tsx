import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import PricingTable from '@/components/billing/PricingTable'
import CinematicHero from '@/components/CinematicHero'
import FAQSection from '@/components/FAQSection'
import FinalCTA from '@/components/FinalCTA'
import RiskReversal from '@/components/RiskReversal'
import { getPricingTiers } from '@/actions/pricing'

export const revalidate = 60 // Enable ISR for pricing data

export default async function PricingPage() {
    // Fetch directly from unified action (validated by Zod natively)
    const tiers = await getPricingTiers().catch(() => [])

    return (
        <main className="min-h-screen bg-[#0a0a0a] text-white">
            <AdvancedNavigation />

            <CinematicHero
                title={
                    <>
                        <span className="hero-line block">Transparent Pricing</span>
                        <span className="hero-line block text-zinc-600">
                            for <em className="text-accent italic">Elite Results.</em>
                        </span>
                    </>
                }
                subtitle="Choose the package that fits your goals. No asterisks, no hidden fees — just measurable growth and a team that stands behind every deliverable."
                ctaText="Get Started"
                showSecondaryCta={false}
            />

            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-accent/[0.03] blur-[150px] rounded-full pointer-events-none" />
                <PricingTable initialTiers={tiers} />
            </section>

            <RiskReversal />

            <FAQSection category="pricing" title="Billing Details" />

            <div className="py-24">
                <FinalCTA />
            </div>

            <Footer />
        </main>
    )
}
