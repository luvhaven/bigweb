'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { toast } from 'sonner'
import AdminHeader from '@/components/admin/AdminHeader'
import PortfolioForm from '../_components/PortfolioForm'
import { portfolioAPI, type PortfolioItem } from '@/lib/api/portfolio'

export default function EditPortfolioPage() {
    const router = useRouter()
    const params = useParams()
    const [item, setItem] = useState<PortfolioItem | null>(null)
    const [loading, setLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (params.id) {
            loadItem(params.id as string)
        }
    }, [params.id])

    const loadItem = async (id: string) => {
        try {
            const data = await portfolioAPI.getById(id)
            setItem(data)
        } catch (error) {
            console.error('Error loading project:', error)
            toast.error('Failed to load project')
            router.push('/admin/portfolio')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (data: any) => {
        if (!item) return

        setIsSubmitting(true)
        try {
            await portfolioAPI.update(item.id, data)
            toast.success('Project updated successfully')
            router.push('/admin/portfolio')
        } catch (error) {
            console.error('Error updating project:', error)
            toast.error('Failed to update project')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
            </div>
        )
    }

    if (!item) return null

    return (
        <div className="space-y-8">
            <AdminHeader
                title="Edit Project"
                description={`Editing project: ${item.title}`}
                backLink="/admin/portfolio"
            />

            <PortfolioForm
                initialData={item}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </div>
    )
}
