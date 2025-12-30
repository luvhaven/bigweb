import { Metadata } from 'next'
import NewYearHubPage from './NewYearHubPage'

export const metadata: Metadata = {
    title: 'New Year 2026 Special Offers | BigWeb Digital',
    description: 'Exclusive New Year packages for 2026. Up to 67% off premium web development, marketing, and digital transformation. Limited spots. Ends January 7, 2026.',
    openGraph: {
        title: 'New Year 2026 Special Offers | BigWeb Digital',
        description: 'Save up to 67% on premium digital services. Limited to the first 7 days of 2026.',
        images: ['/og/newyear-hub.jpg'],
        type: 'website'
    }
}

export default function Page() {
    return <NewYearHubPage />
}
