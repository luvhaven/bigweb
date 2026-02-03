'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath, unstable_noStore } from 'next/cache'

// Fetch all active services
export async function getServices() {
    unstable_noStore() // Prevent caching
    try {
        const supabase = await createClient()
        const { data: services, error } = await supabase
            .from('services')
            .select('*')
            .eq('isActive', true)
            .order('title', { ascending: true })

        if (error) throw error
        return services || []
    } catch (error: any) {
        console.error('Failed to fetch services:', error.message || error)
        return []
    }
}

// Fetch single service by slug
export async function getServiceBySlug(slug: string) {
    unstable_noStore() // Prevent caching
    try {
        const supabase = await createClient()
        const { data: service, error } = await supabase
            .from('services')
            .select('*')
            .eq('slug', slug)
            .eq('isActive', true)
            .single()

        if (error) throw error
        return service
    } catch (error: any) {
        console.error(`Failed to fetch service ${slug}:`, error.message || error)
        return null
    }
}

// Mutation: Save Service (Update or Insert)
export async function saveService(data: any) {
    try {
        const supabase = await createClient()

        // Map data to database columns
        const serviceData = {
            title: data.title,
            slug: data.slug,
            isActive: data.is_active ?? data.isActive ?? true,
            description: data.description,
            fullDescription: data.fullDescription || data.description, // Fallback if missing
            icon: data.icon,
            popular: data.popular || false
        }

        let result;
        if (data.id) {
            result = await supabase
                .from('services')
                .update(serviceData)
                .eq('id', data.id)
        } else {
            result = await supabase
                .from('services')
                .insert([serviceData])
        }

        if (result.error) throw result.error

        // Revalidate frontend paths
        revalidatePath('/')
        revalidatePath('/services')
        if (data.slug) {
            revalidatePath(`/services/${data.slug}`)
        }

        return { success: true }
    } catch (error: any) {
        console.error('Failed to save service:', error.message || error)
        return { success: false, error: error.message }
    }
}

// Mutation: Delete Service
export async function deleteService(id: string) {
    try {
        const supabase = await createClient()
        const { error } = await supabase
            .from('services')
            .delete()
            .eq('id', id)

        if (error) throw error

        revalidatePath('/')
        revalidatePath('/services')

        return { success: true }
    } catch (error: any) {
        console.error('Failed to delete service:', error.message || error)
        return { success: false, error: error.message }
    }
}
