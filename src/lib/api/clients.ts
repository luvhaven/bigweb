import { supabase } from '../supabase/client'
import type { Database } from '../supabase/client'

type Client = Database['public']['Tables']['clients']['Row']
type ClientInsert = Database['public']['Tables']['clients']['Insert']
type Project = Database['public']['Tables']['projects']['Row']
type ProjectInsert = Database['public']['Tables']['projects']['Insert']

export const clientsAPI = {
    // Get all clients
    async getAll(filters?: { status?: string }) {
        let query = supabase
            .from('clients')
            .select('*, user:profiles(full_name, email, avatar_url)')
            .order('created_at', { ascending: false })

        if (filters?.status) {
            query = query.eq('status', filters.status)
        }

        const { data, error } = await query

        if (error) throw error
        return data
    },

    // Get client by ID
    async getById(id: string) {
        const { data, error } = await supabase
            .from('clients')
            .select('*, user:profiles(full_name, email, avatar_url), projects(*)')
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    },

    // Create client
    async create(client: ClientInsert) {
        const { data, error } = await supabase
            .from('clients')
            .insert(client)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Update client
    async update(id: string, updates: Partial<ClientInsert>) {
        const { data, error } = await supabase
            .from('clients')
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Delete client
    async delete(id: string) {
        const { error } = await supabase
            .from('clients')
            .delete()
            .eq('id', id)

        if (error) throw error
    },

    // Get client projects
    async getProjects(clientId: string) {
        const { data, error } = await supabase
            .from('projects')
            .select('*, client:clients(company_name)')
            .eq('client_id', clientId)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    }
}

export const projectsAPI = {
    // Get all projects
    async getAll(filters?: { status?: string; client_id?: string }) {
        let query = supabase
            .from('projects')
            .select('*, client:clients(company_name, contact_name)')
            .order('created_at', { ascending: false })

        if (filters?.status) {
            query = query.eq('status', filters.status)
        }

        if (filters?.client_id) {
            query = query.eq('client_id', filters.client_id)
        }

        const { data, error } = await query

        if (error) throw error
        return data
    },

    // Get project by ID
    async getById(id: string) {
        const { data, error } = await supabase
            .from('projects')
            .select('*, client:clients(*)')
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    },

    // Create project
    async create(project: ProjectInsert) {
        const { data, error } = await supabase
            .from('projects')
            .insert(project)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Update project
    async update(id: string, updates: Partial<ProjectInsert>) {
        const { data, error } = await supabase
            .from('projects')
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Delete project
    async delete(id: string) {
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id)

        if (error) throw error
    },

    // Update project progress
    async updateProgress(id: string, progress: number) {
        const { data, error } = await supabase
            .from('projects')
            .update({ progress })
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    }
}
