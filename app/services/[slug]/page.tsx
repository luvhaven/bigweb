import { getCmsServiceBySlug } from '@/actions/cms'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import ProcessTimeline from '@/components/ProcessTimeline'
import StickyCTABar from '@/components/mobile/StickyCTABar'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { ServiceSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'
import RelatedServices from '@/components/services/RelatedServices'
import TrustBadges from '@/components/trust/TrustBadges'
import ServiceDetailsClient from '@/components/services/ServiceDetailsClient'

// Revalidate every 60 seconds
export const revalidate = 60

export default async function DynamicServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const serviceData = await getCmsServiceBySlug(slug)

    // Build graceful fallback from slug if not in DB
    const service = serviceData ?? {
        id: 'fallback',
        slug: slug,
        title: slug.split('-').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
        short_description: 'Premium digital services engineered for measurable business outcomes.',
        full_description: 'We deploy specialized interventions to solve your growth bottlenecks. Our approach combines mathematical rigor with psychological precision to ensure every investment in your digital infrastructure yields a measurable ROI.',
        features: '[]',
        process: '[]',
        isActive: true,
        popular: false,
    }

    const rawFeatures = typeof service.features === 'string' ? JSON.parse(service.features) : (service.features || [])
    const features = rawFeatures.map((f: any) => {
        if (typeof f === 'string') return { title: f, description: '', iconName: 'CheckCircle' }
        return { ...f, iconName: f.icon || 'Star' }
    })

    const rawProcess = typeof service.process === 'string' ? JSON.parse(service.process) : (service.process || [])
    const processSteps = rawProcess.map((step: any) => ({
        ...step,
        iconName: step.icon || 'ChevronRight'
    }))

    const breadcrumbItems = [
        { label: 'Services', href: '/services' },
        { label: service.title, href: `/services/${service.slug}` }
    ]

    // Map new DB columns to what ServiceDetailsClient/ServiceSchema expects
    const mappedService = {
        ...service,
        description: service.short_description || service.description,
        fullDescription: service.full_description || service.fullDescription,
    }



    return (
        <main className="min-h-screen bg-[#030303] text-white selection:bg-accent/20">
            {/* SEO */}
            <ServiceSchema
                name={mappedService.title}
                description={mappedService.description || ''}
                serviceType="ProfessionalService"
                ratingValue={4.9}
                reviewCount={100}
            />
            <BreadcrumbSchema items={[
                { name: 'Home', url: 'https://bigwebdigital.com' },
                ...breadcrumbItems.map(item => ({ name: item.label, url: `https://bigwebdigital.com${item.href}` }))
            ]} />

            <AdvancedNavigation />

            <ServiceDetailsClient
                service={mappedService}

                features={features}
                processSteps={processSteps}
            />

            <RelatedServices currentPath={`/services/${service.slug}`} />
            <Footer />
            <StickyCTABar />
        </main>
    )
}
