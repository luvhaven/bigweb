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
import TrustBadges from '@/components/trust/TrustBadges'

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

    // Map process steps
    const rawProcess = typeof service.process === 'string' ? JSON.parse(service.process) : (service.process || [])
    const processSteps = rawProcess.map((step: any, i: number) => ({
        ...step,
        icon: getIcon(step.icon)
    }))

    return (
        <main className="min-h-screen bg-black selection:bg-orange-500/30 font-sans">
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

            <section className="py-20 px-6 md:py-32 bg-zinc-950/30 border-t border-white/5">
                <div className="container mx-auto max-w-6xl text-center">
                    <h2 className="text-4xl md:text-7xl font-black mb-12 tracking-tight text-white leading-tight">Calculate Your<br /><span className="text-zinc-600">ROI Potential.</span></h2>
                    <p className="text-xl md:text-2xl text-zinc-400 mb-16 font-medium max-w-2xl mx-auto">
                        Get a personalized estimate for your project.
                    </p>
                    <PricingCalculator />
                </div>
            </section>

            <TrustBadges />

            {/* CTA Section */}
            <section className="py-32 px-6 relative overflow-hidden text-center bg-black">
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[size:60px_60px]" />
                <div className="container mx-auto max-w-4xl relative z-10">
                    <div className="text-xs font-semibold text-orange-500 mb-8 uppercase tracking-wider">Ready to Start?</div>
                    <h2 className="text-4xl md:text-7xl font-black mb-12 tracking-tight leading-tight text-white">
                        Stop Losing<br /><span className="text-zinc-600">Customers.</span>
                    </h2>
                    <div className="flex flex-wrap gap-6 justify-center">
                        <Link href="/estimator">
                            <Button className="h-16 px-10 text-sm font-bold bg-white text-black hover:bg-orange-500 hover:text-white rounded-lg uppercase tracking-wider transition-all shadow-lg">
                                Get Free Estimate <ArrowRight className="ml-3 w-5 h-5" />
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
