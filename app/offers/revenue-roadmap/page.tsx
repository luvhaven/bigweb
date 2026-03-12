import type { Metadata } from 'next'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { BreadcrumbSchema } from '@/components/seo/JsonLd'
import RevenueRoadmapClient from './RevenueRoadmapClient'

export const metadata: Metadata = {
    title: 'Revenue Roadmap — Strategic Growth Blueprint | BIGWEB Digital',
    description: 'A 2-week strategic deep-dive that gives you a battle-tested blueprint before a single pixel is designed. Know exactly what to build, how to position it, and how to convert.',
    alternates: { canonical: 'https://bigwebdigital.com/offers/revenue-roadmap' }
}

export default function RevenueRoadmapPage() {
    return (
        <main className="min-h-screen bg-[#030303] text-white">
            <BreadcrumbSchema items={[
                { name: 'Home', url: 'https://bigwebdigital.com' },
                { name: 'Packages', url: 'https://bigwebdigital.com/#pricing' },
                { name: 'Revenue Roadmap', url: 'https://bigwebdigital.com/offers/revenue-roadmap' }
            ]} />
            <AdvancedNavigation />
            <RevenueRoadmapClient />
            <Footer />
        </main>
    )
}
