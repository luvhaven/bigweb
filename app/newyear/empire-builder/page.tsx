import { Metadata } from 'next'
import EmpireBuilderPage from './EmpireBuilderPage'

export const metadata: Metadata = {
    title: 'Empire Builder - New Year 2026 Special | BigWeb Digital',
    description: 'Dominate your market in 2026. Save 67% on our complete enterprise transformation. Limited to 15 clients. Offer ends January 7, 2026.',
    openGraph: {
        title: 'Empire Builder - Save 67% | New Year 2026 Offer',
        description: 'Premium website + mobile app, AI chatbot, 12 months marketing, and 24/7 priority support. Only $24,997 (was $75,000).',
        images: ['/og/newyear-empire-builder.jpg'],
        type: 'website'
    }
}

export default function Page() {
    return <EmpireBuilderPage />
}
