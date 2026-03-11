import { getCapabilities, getPageMetadata } from '@/lib/data/cms'
import ServicesPageClient from './ServicesPageClient'
import type { Metadata } from 'next'

export const revalidate = 3600 // Revalidate every hour

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getPageMetadata('/services')

  return {
    title: metadata?.title || 'Services | BIGWEB Digital',
    description: metadata?.description || 'Strategy, design, and engineering services for ambitious brands.',
    keywords: metadata?.keywords || [],
    openGraph: {
      title: metadata?.og_title || metadata?.title || 'Services | BIGWEB Digital',
      description: metadata?.og_description || metadata?.description || 'Strategy, design, and engineering services for ambitious brands.',
    }
  }
}

export default async function ServicesPage() {
  // Fetch capabilities from database
  const capabilities = await getCapabilities()

  // Pass to client component
  return <ServicesPageClient capabilities={capabilities} />
}
