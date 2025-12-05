'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { toast } from 'sonner'
import AdminHeader from '@/components/admin/AdminHeader'
import ServiceForm from '../_components/ServiceForm'
import { servicesAPI, type Service } from '@/lib/api/services'

export default function EditServicePage() {
    const router = useRouter()
    const params = useParams()
    const [service, setService] = useState<Service | null>(null)
    const [loading, setLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (params.id) {
            loadService(params.id as string)
        }
    }, [params.id])

    const loadService = async (id: string) => {
        try {
            const data = await servicesAPI.getById(id)
            setService(data)
        } catch (error) {
            console.error('Error loading service:', error)
            toast.error('Failed to load service')
            router.push('/admin/services')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (data: any) => {
        if (!service) return

        setIsSubmitting(true)
        try {
            await servicesAPI.update(service.id, data)
            toast.success('Service updated successfully')
            router.push('/admin/services')
        } catch (error) {
            console.error('Error updating service:', error)
            toast.error('Failed to update service')
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

    if (!service) return null

    return (
        <div className="space-y-8">
            <AdminHeader
                title="Edit Service"
                description={`Editing service: ${service.title}`}
                backLink="/admin/services"
            />

            <ServiceForm
                initialData={service}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </div>
    )
}
