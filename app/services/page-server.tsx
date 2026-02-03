import { getCapabilities } from '@/lib/data/cms'
import ServicesPageClient from './ServicesPageClient'

export const revalidate = 3600 // Revalidate every hour

export default async function ServicesPage() {
    // Fetch capabilities from database
    const capabilities = await getCapabilities()

    // Pass to client component
    return <ServicesPageClient capabilities={capabilities} />
}
