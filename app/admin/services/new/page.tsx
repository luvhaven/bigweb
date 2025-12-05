'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import AdminHeader from '@/components/admin/AdminHeader'
import ServiceForm from '../_components/ServiceForm'
import { servicesAPI } from '@/lib/api/services'

export default function NewServicePage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (data: any) => {
        setIsSubmitting(true)
        try {
            await servicesAPI.create(data)
            toast.success('Service created successfully')
            router.push('/admin/services')
        } catch (error) {
            console.error('Error creating service:', error)
            toast.error('Failed to create service')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="space-y-8">
            <AdminHeader
                title="Add Service"
                description="Create a new service offering"
                backLink="/admin/services"
            />

            <ServiceForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
    )
}
