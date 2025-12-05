'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import AdminHeader from '@/components/admin/AdminHeader'
import TestimonialForm from '../_components/TestimonialForm'
import { testimonialsAPI } from '@/lib/api/testimonials'

export default function NewTestimonialPage() {
    const router = useRouter()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = async (data: any) => {
        setIsSubmitting(true)
        try {
            await testimonialsAPI.create(data)
            toast.success('Testimonial created successfully')
            router.push('/admin/testimonials')
        } catch (error) {
            console.error('Error creating testimonial:', error)
            toast.error('Failed to create testimonial')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="space-y-8">
            <AdminHeader
                title="Add Testimonial"
                description="Create a new client testimonial"
                backLink="/admin/testimonials"
            />

            <TestimonialForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />
        </div>
    )
}
