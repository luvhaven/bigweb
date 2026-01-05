import EditPostPageClient from './EditBlogClient'

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    return <EditPostPageClient id={id} />
}
