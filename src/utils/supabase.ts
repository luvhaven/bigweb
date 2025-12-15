import { createClient } from '@supabase/supabase-js'

// Database types (based on actual Supabase tables)
export interface Database {
    public: {
        Tables: {
            admin_users: {
                Row: {
                    id: string
                    email: string
                    name: string
                    role: 'super_admin' | 'admin' | 'editor' | 'viewer' | 'client'
                    avatar: string | null
                    is_active: boolean
                    created_at: string
                }
                Insert: Omit<Database['public']['Tables']['admin_users']['Row'], 'id' | 'created_at'>
                Update: Partial<Database['public']['Tables']['admin_users']['Insert']>
            }
            services: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    description: string | null
                    short_description: string | null
                    icon: string | null
                    icon_type: string | null
                    features: any | null
                    pricing: any | null
                    process_steps: any | null
                    technologies: string[] | null
                    case_studies: string[] | null
                    is_featured: boolean
                    status: 'published' | 'draft' | 'archived'
                    order_index: number
                    meta_title: string | null
                    meta_description: string | null
                    created_at: string
                    updated_at: string
                    is_active: boolean // Legacy support
                }
                Insert: Omit<Database['public']['Tables']['services']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['services']['Insert']>
            }
            portfolio_projects: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    description: string | null
                    excerpt: string | null
                    client_name: string | null
                    client_logo: string | null
                    industry: string | null
                    project_type: string | null
                    technologies: string[] | null
                    featured_image: string | null
                    gallery_images: string[] | null
                    video_url: string | null
                    live_url: string | null
                    github_url: string | null
                    duration: string | null
                    team_size: number | null
                    metrics: any | null
                    challenge: string | null
                    solution: string | null
                    results: string | null
                    testimonial: any | null
                    is_featured: boolean
                    status: 'published' | 'draft' | 'archived'
                    order_index: number
                    meta_title: string | null
                    meta_description: string | null
                    og_image: string | null
                    published_at: string | null
                    created_at: string
                    updated_at: string
                    // Legacy fields
                    category: string | null
                    main_image: string | null
                    website_url: string | null
                    background_color: string | null
                    text_color: string | null
                    views_count: number
                    completion_date: string | null
                }
                Insert: Omit<Database['public']['Tables']['portfolio_projects']['Row'], 'id' | 'created_at' | 'updated_at' | 'views_count'>
                Update: Partial<Database['public']['Tables']['portfolio_projects']['Insert']>
            }
            testimonials: {
                Row: {
                    id: string
                    client_name: string
                    client_role: string | null
                    client_company: string | null
                    client_image: string | null
                    client_avatar: string | null
                    content: string
                    rating: number
                    result_metric: string | null
                    project_id: string | null
                    is_featured: boolean
                    status: 'active' | 'inactive' | 'draft' | 'pending' | 'archived'
                    order_index: number
                    created_at: string
                    updated_at: string
                    is_verified: boolean
                }
                Insert: Omit<Database['public']['Tables']['testimonials']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['testimonials']['Insert']>
            }
            blog_posts: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    excerpt: string | null
                    content: string | null
                    featured_image: string | null
                    category_id: string | null
                    category: string | null
                    author_id: string
                    tags: string[] | null
                    read_time: number | null
                    views: number
                    likes: number
                    status: 'draft' | 'published' | 'scheduled' | 'archived'
                    published_at: string | null
                    is_featured: boolean
                    meta_title: string | null
                    meta_description: string | null
                    og_image: string | null
                    created_at: string
                    updated_at: string
                    allow_comments: boolean
                    views_count: number
                }
                Insert: Omit<Database['public']['Tables']['blog_posts']['Row'], 'id' | 'created_at' | 'updated_at' | 'views' | 'likes' | 'views_count'>
                Update: Partial<Database['public']['Tables']['blog_posts']['Insert']>
            }
            blog_categories: {
                Row: {
                    id: string
                    name: string
                    slug: string
                    description: string | null
                    color: string | null
                    created_at: string
                }
                Insert: Omit<Database['public']['Tables']['blog_categories']['Row'], 'id' | 'created_at'>
                Update: Partial<Database['public']['Tables']['blog_categories']['Insert']>
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
                    site_name: string
                    site_description: string | null
                    contact_email: string | null
                    social_links: any
                    maintenance_mode: boolean
                    registration_enabled: boolean
                    notifications_enabled: boolean
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['site_settings']['Row'], 'id' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['site_settings']['Insert']>
            }
            notifications: {
                Row: {
                    id: string
                    user_id: string
                    title: string
                    message: string
                    type: 'info' | 'success' | 'warning' | 'error'
                    link: string | null
                    is_read: boolean
                    created_at: string
                }
                Insert: Omit<Database['public']['Tables']['notifications']['Row'], 'id' | 'created_at'>
                Update: Partial<Database['public']['Tables']['notifications']['Insert']>
            }
            // Additional tables used by API layer
            clients: {
                Row: {
                    id: string
                    company_name: string
                    contact_name: string | null
                    email: string | null
                    phone: string | null
                    status: string
                    user_id: string | null
                    created_at: string
                }
                Insert: any
                Update: any
            }
            projects: {
                Row: {
                    id: string
                    name: string
                    client_id: string | null
                    status: string
                    progress: number
                    created_at: string
                }
                Insert: any
                Update: any
            }
            pages: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    content: any
                    status: string
                    author_id: string | null
                    published_at: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: any
                Update: any
            }
            page_versions: {
                Row: {
                    id: string
                    page_id: string
                    content: any
                    version_number: number
                    created_by: string | null
                    created_at: string
                }
                Insert: any
                Update: any
            }
            media: {
                Row: {
                    id: string
                    filename: string
                    original_filename: string
                    file_path: string
                    file_size: number
                    mime_type: string
                    width: number | null
                    height: number | null
                    duration: number | null
                    folder: string | null
                    alt_text: string | null
                    caption: string | null
                    uploaded_by: string | null
                    created_at: string
                }
                Insert: any
                Update: any
            }
            hero_slides: {
                Row: {
                    id: string
                    title: string | null
                    subtitle: string | null
                    image_url: string | null
                    order_index: number
                    is_active: boolean
                    created_at: string
                }
                Insert: any
                Update: any
            }
            analytics_events: {
                Row: {
                    id: string
                    event_type: string
                    page_path: string | null
                    user_id: string | null
                    session_id: string | null
                    data: any
                    created_at: string
                }
                Insert: any
                Update: any
            }
            components: {
                Row: {
                    id: string
                    type: string
                    name: string
                    data: any
                    status: string
                    order_index: number
                    page_ids: string[]
                    created_at: string
                    updated_at: string
                }
                Insert: any
                Update: any
            }
            portfolio_items: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    description: string | null
                    excerpt: string | null
                    client_name: string | null
                    industry: string | null
                    technologies: string[] | null
                    featured_image: string | null
                    gallery_images: string[] | null
                    live_url: string | null
                    github_url: string | null
                    duration: string | null
                    team_size: number | null
                    is_featured: boolean
                    status: string
                    order_index: number
                    published_at: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: any
                Update: any
            }
        }
    }
}

// Initialize Supabase client with proper config
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Debug logging (client-side only)
if (typeof window !== 'undefined') {
    console.log('[Supabase] Initializing client...')
    if (!supabaseUrl || !supabaseAnonKey) {
        console.error('[Supabase] CRITICAL: Missing env variables!')
    } else {
        console.log('[Supabase] URL:', supabaseUrl.substring(0, 30) + '...')
        console.log('[Supabase] Configured successfully')
    }
}

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Check .env.local file.')
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
        storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    },
})

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