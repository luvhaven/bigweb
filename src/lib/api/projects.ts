import { supabase } from '@/lib/supabase/client'
import type { Database } from '@/lib/supabase/client'

type Project = Database['public']['Tables']['projects']['Row']

export const projectsAPI = {
    getAll: async () => {
        const { data, error } = await supabase.from('projects').select('*')
        if (error) throw error
        return data as Project[]
    },
    getById: async (id: string) => {
        const { data, error } = await supabase.from('projects').select('*').eq('id', id).single()
        if (error) throw error
        return data as Project
    },
    create: async (payload: Omit<Project, 'id'>) => {
        const { data, error } = await supabase.from('projects').insert(payload).single()
        if (error) throw error
        return data as Project
    },
    update: async (id: string, payload: Partial<Project>) => {
        const { data, error } = await supabase.from('projects').update(payload).eq('id', id).single()
        if (error) throw error
        return data as Project
    },
    delete: async (id: string) => {
        const { error } = await supabase.from('projects').delete().eq('id', id)
        if (error) throw error
    },
}
