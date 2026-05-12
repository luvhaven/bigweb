import { createClient as createBrowserClient } from '@/lib/supabase/client'

// Helper to get the correct Supabase client based on environment
async function getSupabase() {
    if (typeof window === 'undefined') {
        const { createClient: createServerClient } = await import('@/lib/supabase/server')
        return await createServerClient()
    }
    return createBrowserClient()
}

export const projectsAPI = {
    getAll: async () => {
        try {
            const supabase = await getSupabase()
            const { data, error } = await supabase
                .from('portfolio_projects')
                .select('*')
                .order('completionDate', { ascending: false })

            if (error) throw error

            return (data || []).map((p: any) => ({
                ...p,
                name: p.title || 'Untitled Project',
                image_url: (typeof p.images === 'string' && p.images.startsWith('[')) ? JSON.parse(p.images)[0] : p.images,
                category: p.category || 'Case Study',
                description: p.description || ''
            }))
        } catch (error: any) {
            console.warn('[projectsAPI] All Projects Fetch failed:', {
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code
            })
            return []
        }
    },
    getById: async (id: string) => {
        try {
            const supabase = await getSupabase()
            const isUuid = typeof id === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)

            // Priority 1: Modern portfolio_projects
            const { data, error } = isUuid
                ? await supabase.from('portfolio_projects').select('*, results:project_results(*), testimonial:project_testimonials(*)').eq('id', id).maybeSingle()
                : await supabase.from('portfolio_projects').select('*, results:project_results(*), testimonial:project_testimonials(*)').eq('slug', id).maybeSingle()

            if (!error && data) {
                // Map results for component compatibility
                const mappedData = {
                    ...data,
                    title: data.title || 'Untitled Project',
                    tech_stack: data.technologies ? (typeof data.technologies === 'string' ? data.technologies.split(', ') : data.technologies) : [],
                    summary: data.description || '',
                    cover_image_url: (typeof data.images === 'string' && data.images.startsWith('[')) ? JSON.parse(data.images)[0] : data.images,
                    demoComponent: data.demoComponent
                }
                return mappedData
            }

            return null
        } catch (error) {
            console.error('Project Detail Fetch Error:', error)
            return null
        }
    },
    create: async (payload: any) => {
        const supabase = await getSupabase()
        const { data, error } = await supabase.from('portfolio_projects').insert(payload).select().single();
        if (error) throw error;
        return data;
    },
    update: async (id: string, payload: any) => {
        const supabase = await getSupabase()
        const { data, error } = await supabase.from('portfolio_projects').update(payload).eq('id', id).select().single();
        if (error) throw error;
        return data;
    }
}
