'use client'

import { useEffect, useState } from 'react'
import TestimonialForm from '../components/TestimonialForm'
import { adminSupabase as supabase } from '@/utils/adminSupabase'
import { useParams, useRouter } from 'next/navigation'

export default function EditTestimonialPage() {
    const params = useParams()
    const router = useRouter()
    const [testimonial, setTestimonial] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadTestimonial = async () => {
            try {
                const id = Array.isArray(params.id) ? params.id[0] : params.id
                if (!id || id === 'new') {
                    setLoading(false)
                    return
                }

                const { data, error } = await supabase
                    .from('testimonials')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (error) throw error
                setTestimonial(data)
            } catch (error) {
                console.error('Error loading testimonial:', error)
                router.push('/admin/testimonials')
            } finally {
                setLoading(false)
            }
        }

        if (params.id) {
            loadTestimonial()
        }
    }, [params.id, router])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!testimonial) return null

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Edit Review</h1>
                <p className="text-zinc-400 mt-1">Update testimonial details</p>
            </div>
            <TestimonialForm initialData={testimonial} isEditing />
        </div>
    )
}
