import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { BreadcrumbSchema, ServiceSchema } from '@/components/seo/JsonLd'
import RevenueSystemsClient from './RevenueSystemsClient'

export const metadata = {
    title: 'Revenue Systems & Commerce Infrastructure | BIGWEB Digital',
    description: 'We build the infrastructure that powers high-volume transactions and recurring revenue models. Frictionless billing, lifecycle automation, and real-time revenue intelligence.',
    alternates: {
        canonical: 'https://bigwebdigital.com/services/revenue-systems'
    }
}

export default function RevenueSystemsPage() {
    return (
        <main className="min-h-screen bg-[#030303] text-white selection:bg-accent/20">
            <ServiceSchema
                name="Revenue Systems"
                description="Infrastructure that powers high-volume transactions and recurring revenue models. Frictionless billing, lifecycle automation, and real-time revenue intelligence."
                serviceType="Commerce Architecture"
                ratingValue={5.0}
                reviewCount={87}
            />
            <BreadcrumbSchema items={[
                { name: 'Home', url: 'https://bigwebdigital.com' },
                { name: 'Services', url: 'https://bigwebdigital.com/services' },
                { name: 'Revenue Systems', url: 'https://bigwebdigital.com/services/revenue-systems' }
            ]} />

            <AdvancedNavigation />
            
            <RevenueSystemsClient />

            <Footer />
        </main>
    )
}
