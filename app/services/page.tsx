import { getCapabilities, getPageMetadata } from '@/lib/data/cms'
import ServicesPageClient from './ServicesPageClient'
import type { Metadata } from 'next'

export const revalidate = 3600 // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getPageMetadata('/services')

  return {
    title: metadata?.title || 'Our Capabilities | BIGWEB Digital',
    description: metadata?.description || 'Elite Web Engineering Capabilities',
    keywords: metadata?.keywords || [],
    openGraph: {
      title: metadata?.og_title || metadata?.title || 'Our Capabilities | BIGWEB Digital',
      description: metadata?.og_description || metadata?.description || 'Elite Web Engineering Capabilities',
    }
  }
}

export default async function ServicesPage() {
  // Fetch capabilities from database
  const capabilities = await getCapabilities()

  // Pass to client component
  return <ServicesPageClient capabilities={capabilities} />
}
