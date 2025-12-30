import { Metadata } from 'next'
import DigitalLaunchProPage from './DigitalLaunchProPage'

export const metadata: Metadata = {
    title: 'Digital Launch Pro - New Year 2026 Special | BigWeb Digital',
    description: 'Start 2026 with a premium website that converts. Save 58% on our complete launch package. Limited to 50 clients. Offer ends January 7, 2026.',
    openGraph: {
        title: 'Digital Launch Pro - Save 58% | New Year 2026 Offer',
        description: 'Premium 5-page website, SEO foundation, and 3 months support. Only $4,997 (was $12,000). Limited spots available.',
        images: ['/og/newyear-digital-launch.jpg'],
        type: 'website'
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Digital Launch Pro - Save 58%',
        description: 'Start 2026 with a website that actually converts. Limited offer ends Jan 7.'
    }
}

export default function Page() {
    return <DigitalLaunchProPage />
}
