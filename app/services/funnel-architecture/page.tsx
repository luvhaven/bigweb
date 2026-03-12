import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { BreadcrumbSchema, ServiceSchema } from '@/components/seo/JsonLd'
import FunnelArchitectureClient from './FunnelArchitectureClient'

export const metadata = {
    title: 'Funnel Architecture & Journey Design | BIGWEB Digital',
    description: 'We architect user journeys that move prospects from curiosity to commitment with clarity and intent. Every touchpoint is a calculated revenue trigger.',
    alternates: {
        canonical: 'https://bigwebdigital.com/services/funnel-architecture'
    }
}

export default function FunnelArchitecturePage() {
    return (
        <main className="min-h-screen bg-[#030303] text-white selection:bg-accent/20">
            <ServiceSchema
                name="Funnel Architecture"
                description="We architect user journeys that move prospects from curiosity to commitment with clarity and intent. Every touchpoint is a calculated revenue trigger."
                serviceType="Growth & Marketing Automation"
                ratingValue={4.9}
                reviewCount={104}
            />
            <BreadcrumbSchema items={[
                { name: 'Home', url: 'https://bigwebdigital.com' },
                { name: 'Services', url: 'https://bigwebdigital.com/services' },
                { name: 'Funnel Architecture', url: 'https://bigwebdigital.com/services/funnel-architecture' }
            ]} />

            <AdvancedNavigation />
            
            <FunnelArchitectureClient />

            <Footer />
        </main>
    )
}
