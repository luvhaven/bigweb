import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { BreadcrumbSchema, ServiceSchema } from '@/components/seo/JsonLd'
import ConversionOptimizationClient from './ConversionOptimizationClient'

export const metadata = {
    title: 'Conversion Rate Optimization (CRO) | BIGWEB Digital',
    description: 'Systematic CRO that eliminates friction and multiplies revenue through forensic analytics, psychological triggers, and scientific A/B testing. 3X conversion rates guaranteed.',
    alternates: {
        canonical: 'https://bigwebdigital.com/services/conversion-optimization'
    }
}

export default function ConversionOptimizationPage() {
    return (
        <main className="min-h-screen bg-[#030303] text-white selection:bg-accent/20">
            <ServiceSchema
                name="Conversion Optimization"
                description="Systematic CRO that eliminates friction and multiplies revenue through forensic analytics, psychological triggers, and scientific A/B testing."
                serviceType="Growth & Marketing Automation"
                ratingValue={5.0}
                reviewCount={145}
            />
            <BreadcrumbSchema items={[
                { name: 'Home', url: 'https://bigwebdigital.com' },
                { name: 'Services', url: 'https://bigwebdigital.com/services' },
                { name: 'Conversion Optimization', url: 'https://bigwebdigital.com/services/conversion-optimization' }
            ]} />

            <AdvancedNavigation />
            
            <ConversionOptimizationClient />

            <Footer />
        </main>
    )
}
