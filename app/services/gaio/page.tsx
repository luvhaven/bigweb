import { getPageSections, getPageMetadata } from '@/lib/data/cms'
import GAIOClient from './GAIOClient'
import type { Metadata } from 'next'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { ServiceSchema, BreadcrumbSchema } from '@/components/seo/JsonLd'

export const revalidate = 3600 // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
    const metadata = await getPageMetadata('/services/gaio')

    return {
        title: metadata?.title || 'The Answer Vault™ - Generative AI Optimization (GAIO) | BIGWEB Digital',
        description: metadata?.description || 'Future-proof authority in ChatGPT, Gemini, and Claude search results. Own the answer in the AI era.',
        keywords: metadata?.keywords || ['GAIO', 'AI Search Optimization', 'ChatGPT SEO', 'Entity Injection'],
        openGraph: {
            title: metadata?.og_title || metadata?.title || 'The Answer Vault™ - GAIO',
            description: metadata?.og_description || metadata?.description || 'Future-proof authority in AI search results.',
        }
    }
}

export default async function GAIOPage() {
    // Fetch dynamic sections if needed in the future
    // const sections = await getPageSections('/services/gaio')

    return (
        <main className="min-h-screen bg-[#050505] text-white">
            <ServiceSchema
                name="The Answer Vault™ - Generative AI Optimization (GAIO) by BIGWEB"
                description="Future-proof authority in ChatGPT, Gemini, and Claude search results. Own the answer in the AI era."
                serviceType="Digital Marketing"
                ratingValue={5.0}
                reviewCount={12}
            />

            <AdvancedNavigation />

            <GAIOClient />

            <BreadcrumbSchema
                items={[
                    { name: 'Home', url: '/' },
                    { name: 'Services', url: '/services' },
                    { name: 'GAIO', url: '/services/gaio' }
                ]}
            />

            <Footer />
        </main>
    )
}
