import { getProcessPhases, getPageMetadata } from '@/lib/data/cms'
import HowWeWorkClient from './HowWeWorkClient'
import type { Metadata } from 'next'

export const revalidate = 3600 // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
    const metadata = await getPageMetadata('/how-it-works')

    return {
        title: metadata?.title || 'How We Work | BIGWEB Digital',
        description: metadata?.description || 'Our Clinical Methodology',
        keywords: metadata?.keywords || [],
        openGraph: {
            title: metadata?.og_title || metadata?.title || 'How We Work | BIGWEB Digital',
            description: metadata?.og_description || metadata?.description || 'Our Clinical Methodology',
        }
    }
}

export default async function HowWeWorkPage() {
    // Fetch steps from database
    const steps = await getProcessPhases()

    // Pass to client component
    return <HowWeWorkClient steps={steps} />
}
