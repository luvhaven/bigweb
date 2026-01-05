import { adminSupabase as supabase } from '@/utils/adminSupabase'

type Project = any

export const projectsAPI = {
    getAll: async () => {
        const { data, error } = await supabase
            .from('cms_projects')
            .select('id, title, summary, cover_image_url, created_at, slug')
            .order('sort_order', { ascending: true })

        if (error) throw error
        return data?.map((p: any) => ({
            ...p,
            name: p.title,
            description: p.summary,
            image_url: p.cover_image_url,
            category: 'Project' // Placeholder as category is relational now
        })) as Project[]
    },
    getById: async (id: string) => {
        const { data, error } = await supabase.from('cms_projects').select('*').eq('id', id).single()
        if (error) throw error
        return {
            ...data,
            name: data.title,
            description: data.summary,
            image_url: data.cover_image_url
        } as Project
    },
    create: async (payload: any) => {
        const { data, error } = await supabase.from('cms_projects').insert(payload).single()
        if (error) throw error
        return data
    },
    update: async (id: string, payload: any) => {
        const { data, error } = await supabase.from('cms_projects').update(payload).eq('id', id).single()
        if (error) throw error
        return data
    },
    delete: async (id: string) => {
        const { error } = await supabase.from('cms_projects').delete().eq('id', id)
        if (error) throw error
    },
}
