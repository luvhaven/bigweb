import type { Metadata } from 'next'
import AdvancedNavigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import { BreadcrumbSchema } from '@/components/seo/JsonLd'
import RetainerClient from './RetainerClient'

export const metadata: Metadata = {
    title: 'Growth Retainer — Embedded Senior Team | BIGWEB Digital',
    description: 'Retain our senior team as your embedded digital growth unit. Monthly strategy, CRO testing, and performance reporting — continuously compounding your market position.',
    alternates: { canonical: 'https://bigwebdigital.com/offers/retainer' }
}

export default function RetainerPage() {
    return (
        <main className="min-h-screen bg-[#030303] text-white">
            <BreadcrumbSchema items={[
                { name: 'Home', url: 'https://bigwebdigital.com' },
                { name: 'Packages', url: 'https://bigwebdigital.com/#pricing' },
                { name: 'Growth Retainer', url: 'https://bigwebdigital.com/offers/retainer' }
            ]} />
            <AdvancedNavigation />
            <RetainerClient />
            <Footer />
        </main>
    )
}
