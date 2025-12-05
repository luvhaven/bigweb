'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { toast } from 'sonner'
import AdminHeader from '@/components/admin/AdminHeader'
import TestimonialForm from '../_components/TestimonialForm'
import { testimonialsAPI, type Testimonial } from '@/lib/api/testimonials'

export default function EditTestimonialPage() {
    const router = useRouter()
    const params = useParams()
    const [testimonial, setTestimonial] = useState<Testimonial | null>(null)
    const [loading, setLoading] = useState(true)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        if (params.id) {
            loadTestimonial(params.id as string)
        }
    }, [params.id])

    const loadTestimonial = async (id: string) => {
        try {
            const data = await testimonialsAPI.getById(id)
            setTestimonial(data)
        } catch (error) {
            console.error('Error loading testimonial:', error)
            toast.error('Failed to load testimonial')
            router.push('/admin/testimonials')
        } finally {
            setLoading(false)
        }
    }

    const handleSubmit = async (data: any) => {
        if (!testimonial) return

        setIsSubmitting(true)
        try {
            await testimonialsAPI.update(testimonial.id, data)
            toast.success('Testimonial updated successfully')
            router.push('/admin/testimonials')
        } catch (error) {
            console.error('Error updating testimonial:', error)
            toast.error('Failed to update testimonial')
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

    if (!testimonial) return null

    return (
        <div className="space-y-8">
            <AdminHeader
                title="Edit Testimonial"
                description={`Editing testimonial from ${testimonial.client_name}`}
                backLink="/admin/testimonials"
            />

            <TestimonialForm
                initialData={testimonial}
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
            />
        </div>
    )
}
