import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { BreadcrumbSchema, ServiceSchema } from '@/components/seo/JsonLd'
import WebDevClient from './WebDevClient'

export const metadata = {
    title: 'Website Engineering & Enterprise Web Development | BIGWEB Digital',
    description: 'We don\'t build brochures. We engineer enterprise-grade web platforms designed for conversion velocity and compounding revenue. Next.js 15, Headless CMS, and Edge performance.',
    alternates: {
        canonical: 'https://bigwebdigital.com/services/web-development'
    }
}

export default function WebDevelopmentPage() {
    return (
        <main className="min-h-screen bg-[#030303] text-white selection:bg-accent/20">
            <ServiceSchema
                name="Website Engineering"
                description="Enterprise-grade web platforms engineered from the ground up for conversion velocity and compounding revenue."
                serviceType="Web Development"
                ratingValue={5.0}
                reviewCount={112}
            />
            <BreadcrumbSchema items={[
                { name: 'Home', url: 'https://bigwebdigital.com' },
                { name: 'Services', url: 'https://bigwebdigital.com/services' },
                { name: 'Website Engineering', url: 'https://bigwebdigital.com/services/web-development' }
            ]} />

            <AdvancedNavigation />
            
            <WebDevClient />

            <Footer />
        </main>
    )
}
