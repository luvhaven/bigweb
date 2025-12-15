import { adminSupabase as supabase } from '@/utils/adminSupabase'

type Project = any

export const projectsAPI = {
    getAll: async () => {
        const { data, error } = await supabase.from('portfolio_projects').select('*')
        if (error) throw error
        return data as Project[]
    },
    getById: async (id: string) => {
        const { data, error } = await supabase.from('portfolio_projects').select('*').eq('id', id).single()
        if (error) throw error
        return data as Project
    },
    create: async (payload: Omit<Project, 'id' | 'created_at' | 'updated_at' | 'views_count'>) => {
        const { data, error } = await supabase.from('portfolio_projects').insert(payload as any).single()
        if (error) throw error
        return data as Project
    },
    update: async (id: string, payload: Partial<Project>) => {
        const { data, error } = await supabase.from('portfolio_projects').update(payload as any).eq('id', id).single()
        if (error) throw error
        return data as Project
    },
    delete: async (id: string) => {
        const { error } = await supabase.from('portfolio_projects').delete().eq('id', id)
        if (error) throw error
    },
}
