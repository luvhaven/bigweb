'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import PageForm from '@/components/admin/PageForm'
import { pagesAPI } from '@/lib/api/pages'
import { Loader2 } from 'lucide-react'

export default function EditPagePage() {
    const params = useParams()
    const [page, setPage] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (params.id) {
            loadPage(params.id as string)
        }
    }, [params.id])

    const loadPage = async (id: string) => {
        try {
            const data = await pagesAPI.getById(id)
            setPage(data)
        } catch (error) {
            console.error('Error loading page:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>
    if (!page) return <div>Page not found</div>

    return <PageForm initialData={page} isEditing />
}
