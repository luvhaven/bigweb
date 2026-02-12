import { getProcessPhases, getPageMetadata } from '@/lib/data/cms'
import ProcessClient from './ProcessClient'
import type { Metadata } from 'next'

export const revalidate = 3600 // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
    const metadata = await getPageMetadata('/process')

    return {
        title: metadata?.title || 'Our Process | BIGWEB Digital',
        description: metadata?.description || 'Our Clinical Methodology: Diagnose, Execute, Scale, Dominate. A proven process for extracting maximum yield from your traffic.',
        keywords: metadata?.keywords || [],
        openGraph: {
            title: metadata?.og_title || metadata?.title || 'Our Process | BIGWEB Digital',
            description: metadata?.og_description || metadata?.description || 'Our Clinical Methodology',
        }
    }
}

export default async function ProcessPage() {
    // Fetch process phases from database
    const steps = await getProcessPhases()

    // Pass to client component
    return <ProcessClient steps={steps} />
}
