import type { Metadata } from 'next'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { BreadcrumbSchema } from '@/components/seo/JsonLd'
import RevenueSystemClient from './RevenueSystemClient'

export const metadata: Metadata = {
    title: 'The Monolith™ System — Complete Revenue Transformation | BIGWEB Digital',
    description: 'Our flagship engagement. A complete digital system engineered end-to-end to acquire, convert, and retain customers at world-class performance levels.',
    alternates: { canonical: 'https://bigwebdigital.com/offers/revenue-system' }
}

export default function RevenueSystemPage() {
    return (
        <main className="min-h-screen bg-[#030303] text-white">
            <BreadcrumbSchema items={[
                { name: 'Home', url: 'https://bigwebdigital.com' },
                { name: 'Packages', url: 'https://bigwebdigital.com/#pricing' },
                { name: 'The Monolith™ System', url: 'https://bigwebdigital.com/offers/revenue-system' }
            ]} />
            <AdvancedNavigation />
            <RevenueSystemClient />
            <Footer />
        </main>
    )
}
