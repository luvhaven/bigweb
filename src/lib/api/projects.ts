import { supabase } from '@/utils/supabase' // Use standard client to avoid confusion

type Project = any

export const projectsAPI = {
    getAll: async () => {
        try {
            // Priority 1: Modern cms_case_studies
            const { data, error } = await supabase
                .from('cms_case_studies')
                .select('*')
                .order('sort_order', { ascending: true })

            if (!error && data) {
                return data.map((p: any) => ({
                    ...p,
                    name: p.title,
                    image_url: p.image_url,
                    category: p.industry || 'Case Study',
                    description: p.challenge || p.description
                })) as Project[]
            }

            // Priority 2: Legacy cms_projects (Handle missing sort_order)
            console.warn('Modern fetch failed, attempting legacy fallback...')

            // First try with sort_order
            let legacy = await supabase.from('cms_projects').select('*').order('sort_order', { ascending: true })

            // If sort_order fails (code 42703), try without sorting
            if (legacy.error?.code === '42703') {
                legacy = await supabase.from('cms_projects').select('*')
            }

            if (legacy.data) {
                return legacy.data.map((p: any) => ({
                    ...p,
                    name: p.title || p.name,
                    image_url: p.image_url || p.hero_image_url,
                    category: p.industry || p.category || 'Legacy Project',
                    description: p.challenge || p.description
                })) as Project[]
            }

            return []
        } catch (error) {
            console.error('Projects Fetch critical error:', JSON.stringify(error, null, 2))
            return []
        }
    },
    getById: async (id: string | number) => {
        try {
            // Priority 1: Modern
            const { data, error } = await supabase
                .from('cms_case_studies')
                .select('*')
                .or(`id.eq.${id},slug.eq.${id}`)
                .single()

            if (!error && data) return data

            // Priority 2: Legacy
            const legacy = await supabase
                .from('cms_projects')
                .select('*')
                .or(`id.eq.${id},slug.eq.${id}`)
                .single()

            if (legacy.data) return legacy.data

            throw error || legacy.error
        } catch (error) {
            console.error('Project Detail Fetch Error:', JSON.stringify(error, null, 2))
            return null
        }
    },
    create: async (payload: any) => {
        const { data, error } = await supabase.from('cms_case_studies').insert(payload).select().single()
        if (error) throw error
        return data
    },
    update: async (id: string, payload: any) => {
        const { data, error } = await supabase.from('cms_case_studies').update(payload).eq('id', id).select().single()
        if (error) throw error
        return data
    },
    delete: async (id: string) => {
        const { error } = await supabase.from('cms_case_studies').delete().eq('id', id)
        if (error) throw error
    },
}
