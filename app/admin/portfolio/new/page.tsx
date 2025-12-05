'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import AdminHeader from '@/components/admin/AdminHeader'
import PortfolioForm from '../_components/PortfolioForm'
import { portfolioAPI } from '@/lib/api/portfolio'

export default function NewPortfolioPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (data: any) => {
        setIsSubmitting(true)
        try {
            await portfolioAPI.create(data)
            toast.success('Project created successfully')
            router.push('/admin/portfolio')
        } catch (error) {
            console.error('Error creating project:', error)
            toast.error('Failed to create project')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="space-y-8">
            <AdminHeader
                title="Add Project"
                description="Create a new portfolio case study"
                backLink="/admin/portfolio"
            />

            <PortfolioForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
    )
}
