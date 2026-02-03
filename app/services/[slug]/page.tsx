import { getServiceBySlug } from '@/actions/services'
import { notFound } from 'next/navigation'
import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import HeroPremium from '@/components/services/HeroPremium'
import BentoGrid from '@/components/services/BentoGrid'
import ProcessTimeline from '@/components/ProcessTimeline'
import PricingCalculator from '@/components/PricingCalculator'
import StickyCTABar from '@/components/mobile/StickyCTABar'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { ServiceSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'
import * as LucideIcons from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import RelatedServices from '@/components/services/RelatedServices'

// Revalidate every 60 seconds
export const revalidate = 60

// Dynamic Icon Helper
const getIcon = (name: string) => {
    const Icon = (LucideIcons as any)[name]
    return Icon || LucideIcons.Star
}

export default async function DynamicServicePage({ params }: { params: { slug: string } }) {
    const serviceData = await getServiceBySlug(params.slug)

    if (!serviceData || !serviceData.isActive) {
        notFound()
    }

    const service = serviceData

    // Map features - simple string array or object array in new schema?
    const rawFeatures = typeof service.features === 'string' ? JSON.parse(service.features) : (service.features || [])
    const features = rawFeatures.map((f: any, i: number) => {
        if (typeof f === 'string') {
            return {
                title: f,
                description: "",
                icon: LucideIcons.CheckCircle
            }
        }
        return {
            ...f,
            icon: getIcon(f.icon)
        }
    })

    // Breadcrumbs
    const breadcrumbItems = [
        { label: 'Services', href: '/services' },
        { label: service.title, href: `/services/${service.slug}` }
    ]

    return (
        <main className="min-h-screen bg-background selection:bg-blue-500/30">
            {/* Structured Data */}
            <ServiceSchema
                name={service.title}
                description={service.short_description || ''}
                serviceType="ProfessionalService"
                ratingValue={4.9}
                reviewCount={100}
            />
            {/* FAQ Schema removed for now as generic services table might not have FAQs yet */}
            <BreadcrumbSchema items={[
                { name: 'Home', url: 'https://bigwebdigital.com' },
                ...breadcrumbItems.map(item => ({ name: item.label, url: `https://bigwebdigital.com${item.href}` }))
            ]} />

            <Navigation />

            <div className="container mx-auto px-6">
                <Breadcrumbs items={breadcrumbItems} />
            </div>

            <HeroPremium
                title={service.title}
                highlight=""
                description={service.short_description || ''}
                badgeText="Premium Service"
                themeColor="emerald"
                backgroundImage={service.hero_image_url} // Fixed!
                pattern="Grid"
            />

            {/* Dynamic Long Description / Content */}
            {service.full_description && (
                <section className="py-24 px-6">
                    <div className="container mx-auto max-w-4xl">
                        <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap">
                            {service.full_description}
                        </div>
                    </div>
                </section>
            )}

            {features.length > 0 && (
                <BentoGrid
                    title="Key Features"
                    subtitle="Why choose us for this service."
                    items={features}
                    themeColor="emerald"
                />
            )}

            {processSteps.length > 0 && (
                <div className="py-24">
                    <ProcessTimeline steps={processSteps} />
                </div>
            )}

            <section className="py-24 px-6 bg-secondary/5">
                <div className="container mx-auto max-w-6xl text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">Transparent Pricing</h2>
                    <p className="text-xl text-muted-foreground mb-12">
                        Contact us for a custom quote tailored to your specific needs.
                    </p>
                    <PricingCalculator />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 relative overflow-hidden text-center">
                <div className="container mx-auto max-w-4xl relative z-10">
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
                        Ready to Start?
                    </h2>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link href="/estimator">
                            <Button size="lg" className="h-16 px-10 text-xl rounded-full">
                                Get Free Estimate
                                <ArrowRight className="ml-2 w-6 h-6" />
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            <RelatedServices currentPath={`/services/${service.slug}`} />
            <Footer />
            <StickyCTABar />
        </main>
    )
}
