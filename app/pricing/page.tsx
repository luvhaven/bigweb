import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import PricingTable from '@/components/billing/PricingTable'
import EliteSectionDivider from '@/components/EliteSectionDivider'

export default function PricingPage() {
    return (
        <>
            <Navigation />
            <main className="min-h-screen pt-32 pb-24">
                <div className="container mx-auto px-4 mb-20 text-center">
                    <p className="text-orange-500 font-bold tracking-widest uppercase mb-4">Investment</p>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8">Transparent Pricing for <br /> Elite Results</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Choose the package that fits your goals. No hidden fees, just pure value and measurable growth.
                    </p>
                </div>

                <PricingTable />

                <div className="mt-32">
                    <EliteSectionDivider variant="wave" />
                </div>
            </main>
            <Footer />
        </>
    )
}
