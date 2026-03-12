import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { BreadcrumbSchema, ServiceSchema } from '@/components/seo/JsonLd'
import TrustOptimizationClient from './TrustOptimizationClient'

export const metadata = {
    title: 'Performance & Trust Optimization | BIGWEB Digital',
    description: 'We optimize the invisible factors that determine whether users trust and act. Core Web Vitals, security hardening, and credibility stacking engineered to sub-500ms.',
    alternates: {
        canonical: 'https://bigwebdigital.com/services/trust-optimization'
    }
}

export default function TrustOptimizationPage() {
    return (
        <main className="min-h-screen bg-[#030303] text-white selection:bg-accent/20">
            <ServiceSchema
                name="Performance & Trust Optimization"
                description="Core Web Vitals, security hardening, and credibility stacking engineered to sub-500ms bounds."
                serviceType="Technical SEO & Performance"
                ratingValue={4.9}
                reviewCount={112}
            />
            <BreadcrumbSchema items={[
                { name: 'Home', url: 'https://bigwebdigital.com' },
                { name: 'Services', url: 'https://bigwebdigital.com/services' },
                { name: 'Performance & Trust', url: 'https://bigwebdigital.com/services/trust-optimization' }
            ]} />

            <AdvancedNavigation />
            
            <TrustOptimizationClient />

            <Footer />
        </main>
    )
}
