import EditTeamPageClient from './EditTeamPageClient'

export default async function EditTeamPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return <EditTeamPageClient id={id} />
}
