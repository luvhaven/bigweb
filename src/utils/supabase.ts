import { createClient } from '@supabase/supabase-js'

// Database types (generated from Supabase schema)
export interface Database {
    public: {
        Tables: {
            admin_users: {
                Row: {
                    id: string
                    email: string
                    name: string
                    role: 'admin' | 'editor' | 'viewer'
                    avatar: string | null
                    created_at: string
                }
                Insert: Omit<Database['public']['Tables']['admin_users']['Row'], 'created_at'>
                Update: Partial<Database['public']['Tables']['admin_users']['Insert']>
            }
            services: {
                Row: {
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
                Insert: Omit<Database['public']['Tables']['services']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['services']['Insert']>
            }
            portfolio_projects: {
                Row: {
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
                Insert: Omit<Database['public']['Tables']['portfolio_projects']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['portfolio_projects']['Insert']>
            }
            testimonials: {
                Row: {
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
                Insert: Omit<Database['public']['Tables']['testimonials']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['testimonials']['Insert']>
            }
            blog_posts: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    excerpt: string
                    content: string
                    category: string
                    image: string
                    author_id: string
                    published: boolean
                    published_at: string | null
                    views: number
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'views' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>
            }
            contact_submissions: {
                Row: {
                    id: string
                    name: string
                    email: string
                    phone: string | null
                    company: string | null
                    message: string
                    status: 'new' | 'contacted' | 'converted' | 'closed'
                    created_at: string
                }
                Insert: Omit<Database['public']['Tables']['contact_submissions']['Row'], 'id' | 'created_at'>
                Update: Partial<Database['public']['Tables']['contact_submissions']['Insert']>
            }
            chat_sessions: {
                Row: {
                    id: string
                    visitor_id: string
                    name: string | null
                    email: string | null
                    status: 'open' | 'closed' | 'archived'
                    unread_count: number
                    last_message_at: string
                    created_at: string
                }
                Insert: Omit<Database['public']['Tables']['chat_sessions']['Row'], 'id' | 'created_at'>
                Update: Partial<Database['public']['Tables']['chat_sessions']['Insert']>
            }
            chat_messages: {
                Row: {
                    id: string
                    session_id: string
                    content: string
                    sender_type: 'visitor' | 'agent' | 'system'
                    sender_id: string | null
                    read: boolean
                    created_at: string
                }
                Insert: Omit<Database['public']['Tables']['chat_messages']['Row'], 'id' | 'created_at'>
                Update: Partial<Database['public']['Tables']['chat_messages']['Insert']>
            }
            page_views: {
                Row: {
                    id: string
                    page: string
                    referrer: string | null
                    user_agent: string | null
                    session_id: string | null
                    country: string | null
                    city: string | null
                    device: string | null
                    browser: string | null
                    viewed_at: string
                }
                Insert: Omit<Database['public']['Tables']['page_views']['Row'], 'id' | 'viewed_at'>
                Update: never
            }
            site_settings: {
                Row: {
                    id: string
                    key: string
                    value: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['site_settings']['Row'], 'id' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['site_settings']['Insert']>
            }
        }
    }
}

// Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Helper to get typed client
export const getSupabaseClient = () => supabase

// Type exports for convenience
export type Tables = Database['public']['Tables']
export type Service = Tables['services']['Row']
export type Project = Tables['portfolio_projects']['Row']
export type Testimonial = Tables['testimonials']['Row']
export type BlogPost = Tables['blog_posts']['Row']
export type Contact = Tables['contact_submissions']['Row']
export type ChatSession = Tables['chat_sessions']['Row']
export type ChatMessage = Tables['chat_messages']['Row']
export type PageView = Tables['page_views']['Row']
export type AdminUser = Tables['admin_users']['Row']