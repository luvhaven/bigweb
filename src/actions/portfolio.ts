'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath, unstable_noStore } from 'next/cache'

// Fetch all projects (NO CACHE)
export async function getProjects() {
    unstable_noStore() // Prevent caching
    try {
        const supabase = await createClient()
        const { data: projects, error } = await supabase
            .from('portfolio_projects')
            .select('*')
            .order('completionDate', { ascending: false })

        if (error) throw error
        return projects || []
    } catch (error: any) {
        console.error('Failed to fetch projects:', error.message || error)
        return []
    }
}

// Fetch featured projects
export async function getFeaturedProjects() {
    unstable_noStore() // Prevent caching
    try {
        const supabase = await createClient()
        const { data: projects, error } = await supabase
            .from('portfolio_projects')
            .select('*')
            .eq('featured', true)
            .order('completionDate', { ascending: false })

        if (error) throw error
        return projects || []
    } catch (error: any) {
        console.error('Failed to fetch featured projects:', error.message || error)
        return []
    }
}

// Fetch single project by slug
export async function getProjectBySlug(slug: string) {
    unstable_noStore() // Prevent caching
    try {
        const supabase = await createClient()
        const { data: project, error } = await supabase
            .from('portfolio_projects')
            .select('*, results:project_results(*), testimonial:project_testimonials(*)')
            .eq('slug', slug)
            .single()

        if (error) throw error
        return project
    } catch (error: any) {
        console.error(`Failed to fetch project ${slug}:`, error.message || error)
        return null
    }
}

// Mutation: Save Project (Update or Insert)
export async function saveProject(data: any) {
    try {
        const supabase = await createClient()

        // Map data to database columns (schema: featured, completionDate, client, NO isActive)
        const projectData = {
            title: data.title,
            slug: data.slug,
            client: data.client_name || data.client,
            category: data.category,
            description: data.description,
            fullDescription: data.fullDescription || data.description,
            challenge: data.challenge,
            solution: data.solution,
            results: data.results,
            featured: data.is_featured ?? data.featured ?? false,
            completionDate: data.completion_date || data.completionDate,
            technologies: Array.isArray(data.technologies) ? data.technologies.join(', ') : data.technologies,
            demoComponent: data.demoComponent || null,
            images: data.images || null
        }

        let result;
        if (data.id) {
            result = await supabase
                .from('portfolio_projects')
                .update(projectData)
                .eq('id', data.id)
        } else {
            result = await supabase
                .from('portfolio_projects')
                .insert([projectData])
        }

        if (result.error) throw result.error

        // Revalidate frontend paths
        revalidatePath('/')
        revalidatePath('/case-studies')
        if (data.slug) {
            revalidatePath(`/case-studies/${data.slug}`)
        }

        return { success: true }
    } catch (error: any) {
        console.error('Failed to save project:', error.message || error)
        return { success: false, error: error.message }
    }
}

// Mutation: Delete Project
export async function deleteProject(id: string) {
    try {
        const supabase = await createClient()
        const { error } = await supabase
            .from('portfolio_projects')
            .delete()
            .eq('id', id)

        if (error) throw error

        revalidatePath('/')
        revalidatePath('/case-studies')

        return { success: true }
    } catch (error: any) {
        console.error('Failed to delete project:', error.message || error)
        return { success: false, error: error.message }
    }
}
