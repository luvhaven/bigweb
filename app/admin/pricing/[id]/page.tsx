import EditPricingPageClient from './EditPricingClient'

export default async function EditPricingPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return <EditPricingPageClient id={id} />
}
