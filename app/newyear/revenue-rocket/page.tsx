import { Metadata } from 'next'
import RevenueRocketPage from './RevenueRocketPage'

export const metadata: Metadata = {
    title: 'Revenue Rocket - New Year 2026 Special | BigWeb Digital',
    description: 'Turn your traffic into a revenue machine. Save 62% on our complete growth package. Limited to 30 clients. Offer ends January 7, 2026.',
    openGraph: {
        title: 'Revenue Rocket - Save 62% | New Year 2026 Offer',
        description: 'E-commerce platform, 6 months CRO, SEO campaign, and dedicated success manager. Only $8,997 (was $24,000).',
        images: ['/og/newyear-revenue-rocket.jpg'],
        type: 'website'
    }
}

export default function Page() {
    return <RevenueRocketPage />
}
