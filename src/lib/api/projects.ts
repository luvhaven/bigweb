import { createClient } from '@/lib/supabase/client'
const supabase = createClient()

export const projectsAPI = {
    getAll: async () => {
        try {
            const { data, error } = await supabase
                .from('portfolio_projects')
                .select('*')
                .order('completionDate', { ascending: false })

            if (error) throw error

            return (data || []).map((p: any) => ({
                ...p,
                name: p.title,
                image_url: (typeof p.images === 'string' && p.images.startsWith('[')) ? JSON.parse(p.images)[0] : p.images,
                category: p.category || 'Case Study',
                description: p.description
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
            const isUuid = typeof id === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)

            // Priority 1: Modern portfolio_projects
            const { data, error } = isUuid
                ? await supabase.from('portfolio_projects').select('*, results:project_results(*), testimonial:project_testimonials(*)').eq('id', id).single()
                : await supabase.from('portfolio_projects').select('*, results:project_results(*), testimonial:project_testimonials(*)').eq('slug', id).single()

            if (!error && data) {
                // Map results for component compatibility
                const mappedData = {
                    ...data,
                    tech_stack: data.technologies ? (typeof data.technologies === 'string' ? data.technologies.split(', ') : data.technologies) : [],
                    summary: data.description,
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
    }
}
