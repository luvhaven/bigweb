import { supabase } from '@/utils/supabase'
import { notFound } from 'next/navigation'
import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import HeroPremium from '@/components/services/HeroPremium'
import BentoGrid from '@/components/services/BentoGrid'
import ProcessTimeline from '@/components/ProcessTimeline'
import PricingCalculator from '@/components/PricingCalculator'
import VideoTestimonials from '@/components/VideoTestimonials'
import StickyCTABar from '@/components/mobile/StickyCTABar'
import Breadcrumbs from '@/components/seo/Breadcrumbs'
import { ServiceSchema, FAQSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'
import * as LucideIcons from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import RelatedServices from '@/components/services/RelatedServices'

// Revalidate every 60 seconds
export const revalidate = 60

// Dynamic Icon Helper
const getIcon = (name: string) => {
    // @ts-ignore
    const Icon = LucideIcons[name]
    return Icon || LucideIcons.Star
}

export default async function DynamicServicePage({ params }: { params: { slug: string } }) {
    const { data: service } = await supabase
        .from('service_pages')
        .select('*')
        .eq('slug', params.slug)
        .single()

    if (!service || !service.published) {
        notFound()
    }

    // Parse JSONB fields (Supabase returns them as objects already usually, but let's be safe)
    const features = Array.isArray(service.features) ? service.features.map((f: any) => ({
        ...f,
        icon: getIcon(f.icon)
    })) : []

    const processSteps = Array.isArray(service.process_steps) ? service.process_steps : []
    const faqs = Array.isArray(service.faqs) ? service.faqs : []

    const breadcrumbItems = [
        { label: 'Services', href: '/services' },
        { label: service.title, href: `/services/${service.slug}` }
    ]

    return (
        <main className="min-h-screen bg-background selection:bg-blue-500/30">
            {/* Structured Data */}
            <ServiceSchema
                name={service.title}
                description={service.description}
                serviceType="ProfessionalService"
                ratingValue={4.9}
                reviewCount={100}
            />
            <FAQSchema faqs={faqs} />
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
                highlight={service.highlight}
                description={service.description}
                badgeText={service.badge_text || 'Premium Service'}
                themeColor={service.theme_color || 'emerald'}
                backgroundImage={undefined} // Fixed!
                pattern={service.pattern || 'Grid'}
            />

            {/* Dynamic Long Description / Content */}
            {service.long_description && (
                <section className="py-24 px-6">
                    <div className="container mx-auto max-w-4xl">
                        <div className="prose prose-lg dark:prose-invert max-w-none whitespace-pre-wrap">
                            {service.long_description}
                        </div>
                    </div>
                </section>
            )}

            {features.length > 0 && (
                <BentoGrid
                    title="Key Features"
                    subtitle="Why choose us for this service."
                    items={features}
                    themeColor={service.theme_color || 'emerald'}
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
                        {service.starting_price
                            ? `Packages starting at $${service.starting_price.toLocaleString()}`
                            : "Contact us for a custom quote."}
                    </p>
                    <PricingCalculator />
                </div>
            </section>

            {/* FAQ Section */}
            {faqs.length > 0 && (
                <section className="py-32 px-6">
                    <div className="container mx-auto max-w-4xl">
                        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {faqs.map((faq: any, index: number) => (
                                <details key={index} className="group bg-card border border-border rounded-xl overflow-hidden p-6">
                                    <summary className="cursor-pointer font-bold text-lg flex justify-between items-center">
                                        {faq.question}
                                        <LucideIcons.ChevronDown className="w-5 h-5 transition-transform group-open:rotate-180" />
                                    </summary>
                                    <div className="mt-4 text-muted-foreground">
                                        {faq.answer}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            )}

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
