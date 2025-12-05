import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@supabase/supabase-js'

// Create a basic Supabase client (without strict typing for flexibility)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions for admin data
export interface Service {
    id: string
    title: string
    slug: string
    description: string
    icon: string
    features: string[]
    is_active: boolean
    order_index: number
    created_at: string
    updated_at: string
}

export interface Project {
    id: string
    title: string
    slug: string
    description: string
    category: string
    client: string
    image: string
    images: string[]
    technologies: string[]
    url: string | null
    featured: boolean
    order_index: number
    created_at: string
    updated_at: string
}

export interface Testimonial {
    id: string
    client_name: string
    client_role: string
    client_company: string
    content: string
    rating: number
    client_image: string | null
    result_metric: string | null
    is_featured: boolean
    status: 'active' | 'pending' | 'archived'
    order_index: number
    created_at: string
    updated_at: string
}

export interface Contact {
    id: string
    name: string
    email: string
    phone: string | null
    company: string | null
    message: string
    status: 'new' | 'contacted' | 'converted' | 'closed'
    created_at: string
}

export interface ChatSession {
    id: string
    visitor_id: string
    name: string | null
    email: string | null
    status: 'open' | 'closed' | 'archived'
    unread_count: number
    last_message_at: string
    created_at: string
}

// ============================================
// SERVICES HOOKS
// ============================================

export function useServices() {
    return useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .order('order_index', { ascending: true })

            if (error) throw error
            return data as Service[]
        }
    })
}

export function useService(id: string) {
    return useQuery({
        queryKey: ['services', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('services')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error
            return data as Service
        },
        enabled: !!id
    })
}

export function useCreateService() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (service: Partial<Service>) => {
            const { data, error } = await supabase
                .from('services')
                .insert([service])
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] })
        }
    })
}

export function useUpdateService() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, ...updates }: Partial<Service> & { id: string }) => {
            const { data, error } = await supabase
                .from('services')
                .update(updates)
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['services'] })
            queryClient.invalidateQueries({ queryKey: ['services', variables.id] })
        }
    })
}

export function useDeleteService() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('services')
                .delete()
                .eq('id', id)

            if (error) throw error
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['services'] })
        }
    })
}

// ============================================
// PROJECTS HOOKS
// ============================================

export function useProjects() {
    return useQuery({
        queryKey: ['projects'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('portfolio_projects')
                .select('*')
                .order('order_index', { ascending: true })

            if (error) throw error
            return data as Project[]
        }
    })
}

export function useProject(id: string) {
    return useQuery({
        queryKey: ['projects', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('portfolio_projects')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error
            return data as Project
        },
        enabled: !!id
    })
}

export function useCreateProject() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (project: Partial<Project>) => {
            const { data, error } = await supabase
                .from('portfolio_projects')
                .insert([project])
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
        }
    })
}

export function useUpdateProject() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, ...updates }: Partial<Project> & { id: string }) => {
            const { data, error } = await supabase
                .from('portfolio_projects')
                .update(updates)
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
            queryClient.invalidateQueries({ queryKey: ['projects', variables.id] })
        }
    })
}

export function useDeleteProject() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('portfolio_projects')
                .delete()
                .eq('id', id)

            if (error) throw error
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['projects'] })
        }
    })
}

// ============================================
// TESTIMONIALS HOOKS
// ============================================

export function useTestimonials() {
    return useQuery({
        queryKey: ['testimonials'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('testimonials')
                .select('*')
                .order('order_index', { ascending: true })

            if (error) throw error
            return data as Testimonial[]
        }
    })
}

export function useCreateTestimonial() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (testimonial: Partial<Testimonial>) => {
            const { data, error } = await supabase
                .from('testimonials')
                .insert([testimonial])
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['testimonials'] })
        }
    })
}

export function useUpdateTestimonial() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, ...updates }: Partial<Testimonial> & { id: string }) => {
            const { data, error } = await supabase
                .from('testimonials')
                .update(updates)
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['testimonials'] })
        }
    })
}

export function useDeleteTestimonial() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('testimonials')
                .delete()
                .eq('id', id)

            if (error) throw error
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['testimonials'] })
        }
    })
}

// ============================================
// CONTACTS HOOKS
// ============================================

export function useContacts() {
    return useQuery({
        queryKey: ['contacts'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('contact_submissions')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            return data as Contact[]
        }
    })
}

export function useUpdateContactStatus() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, status }: { id: string; status: Contact['status'] }) => {
            const { data, error } = await supabase
                .from('contact_submissions')
                .update({ status })
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['contacts'] })
        }
    })
}

// ============================================
// CHAT HOOKS
// ============================================

export function useChatSessions() {
    return useQuery({
        queryKey: ['chat-sessions'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('chat_sessions')
                .select('*')
                .order('last_message_at', { ascending: false })

            if (error) throw error
            return data as ChatSession[]
        },
        refetchInterval: 5000 // Poll every 5 seconds for new chats
    })
}

export function useChatMessages(sessionId: string) {
    return useQuery({
        queryKey: ['chat-messages', sessionId],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('chat_messages')
                .select('*')
                .eq('session_id', sessionId)
                .order('created_at', { ascending: true })

            if (error) throw error
            return data
        },
        enabled: !!sessionId,
        refetchInterval: 2000 // Poll every 2 seconds for new messages
    })
}

export function useSendMessage() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ sessionId, content }: { sessionId: string; content: string }) => {
            const { data, error } = await supabase
                .from('chat_messages')
                .insert([{
                    session_id: sessionId,
                    content,
                    sender_type: 'agent',
                    read: true
                }])
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['chat-messages', variables.sessionId] })
            queryClient.invalidateQueries({ queryKey: ['chat-sessions'] })
        }
    })
}

// ============================================
// ANALYTICS HOOKS
// ============================================

export function useDashboardStats() {
    return useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: async () => {
            // Get counts from various tables
            const [projectsRes, testimonialsRes, contactsRes, chatsRes] = await Promise.all([
                supabase.from('portfolio_projects').select('*', { count: 'exact', head: true }),
                supabase.from('testimonials').select('*', { count: 'exact', head: true }),
                supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('status', 'new'),
                supabase.from('chat_sessions').select('*', { count: 'exact', head: true }).eq('status', 'open')
            ])

            return {
                projects: projectsRes.count || 0,
                testimonials: testimonialsRes.count || 0,
                newContacts: contactsRes.count || 0,
                openChats: chatsRes.count || 0
            }
        },
        refetchInterval: 30000 // Refresh every 30 seconds
    })
}

export function usePageViews(days: number = 7) {
    return useQuery({
        queryKey: ['page-views', days],
        queryFn: async () => {
            const startDate = new Date()
            startDate.setDate(startDate.getDate() - days)

            const { data, error } = await supabase
                .from('page_views')
                .select('page, viewed_at')
                .gte('viewed_at', startDate.toISOString())
                .order('viewed_at', { ascending: true })

            if (error) throw error
            return data
        }
    })
}
