'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath, unstable_noStore } from 'next/cache'

function mapTestimonial(t: any) {
    return {
        ...t,
        client_name: t.name,
        client_role: t.role,
        client_company: t.company,
        client_image: t.image,
        result_metric: t.result
    }
}

export async function getTestimonials() {
    unstable_noStore() // Prevent caching
    try {
        const supabase = await createClient()
        const { data: testimonials, error } = await supabase
            .from('testimonials')
            .select('*')
            .eq('isActive', true)
            .order('publishedAt', { ascending: false })

        if (error) throw error

        return (testimonials || []).map(mapTestimonial)
    } catch (error: any) {
        console.error('Failed to fetch testimonials:', error.message || error)
        return []
    }
}

export async function getFeaturedTestimonials() {
    unstable_noStore() // Prevent caching
    try {
        const supabase = await createClient()
        const { data: testimonials, error } = await supabase
            .from('testimonials')
            .select('*')
            .eq('isActive', true)
            .eq('featured', true)
            .order('publishedAt', { ascending: false })

        if (error) throw error

        return (testimonials || []).map(mapTestimonial)
    } catch (error: any) {
        console.error('Failed to fetch featured testimonials:', error.message || error)
        return []
    }
}

// Mutation: Save Testimonial (Update or Insert)
export async function saveTestimonial(data: any) {
    try {
        const supabase = await createClient()

        // Map data to database columns
        const testimonialData = {
            name: data.client_name || data.name,
            role: data.client_role || data.role,
            company: data.client_company || data.company,
            content: data.content,
            rating: data.rating,
            image: data.client_image || data.image,
            result: data.result_metric || data.result,
            isActive: data.status === 'active' || data.isActive || true,
            featured: data.is_featured || data.featured || false,
            publishedAt: data.publishedAt || new Date().toISOString()
        }

        let result;
        if (data.id) {
            result = await supabase
                .from('testimonials')
                .update(testimonialData)
                .eq('id', data.id)
        } else {
            result = await supabase
                .from('testimonials')
                .insert([testimonialData])
        }

        if (result.error) throw result.error

        // Revalidate frontend paths
        revalidatePath('/')

        return { success: true }
    } catch (error: any) {
        console.error('Failed to save testimonial:', error.message || error)
        return { success: false, error: error.message }
    }
}

// Mutation: Delete Testimonial
export async function deleteTestimonial(id: string) {
    try {
        const supabase = await createClient()
        const { error } = await supabase
            .from('testimonials')
            .delete()
            .eq('id', id)

        if (error) throw error

        revalidatePath('/')

        return { success: true }
    } catch (error: any) {
        console.error('Failed to delete testimonial:', error.message || error)
        return { success: false, error: error.message }
    }
}
