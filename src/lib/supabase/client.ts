import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
    console.error('❌ NEXT_PUBLIC_SUPABASE_URL is not defined')
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!supabaseAnonKey) {
    console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY is not defined')
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

console.log('✅ Supabase client initialized with URL:', supabaseUrl?.substring(0, 20) + '...')

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
})

// Database types
export type Database = {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    email: string
                    full_name: string | null
                    avatar_url: string | null
                    role: 'admin' | 'editor' | 'client' | 'viewer'
                    company: string | null
                    phone: string | null
                    bio: string | null
                    is_active: boolean
                    last_seen_at: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['profiles']['Insert']>
            }
            pages: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    description: string | null
                    content: any
                    meta_title: string | null
                    meta_description: string | null
                    meta_keywords: string[] | null
                    og_image: string | null
                    status: 'draft' | 'published' | 'archived'
                    published_at: string | null
                    author_id: string | null
                    parent_id: string | null
                    template: string
                    custom_css: string | null
                    custom_js: string | null
                    view_count: number
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['pages']['Row'], 'id' | 'created_at' | 'updated_at' | 'view_count'>
                Update: Partial<Database['public']['Tables']['pages']['Insert']>
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
                    alt_text: string | null
                    caption: string | null
                    folder: string | null
                    uploaded_by: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['media']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['media']['Insert']>
            }
            clients: {
                Row: {
                    id: string
                    user_id: string | null
                    company_name: string
                    contact_name: string
                    email: string
                    phone: string | null
                    address: string | null
                    city: string | null
                    country: string | null
                    website: string | null
                    logo_url: string | null
                    status: 'active' | 'inactive' | 'pending'
                    notes: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['clients']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['clients']['Insert']>
            }
            projects: {
                Row: {
                    id: string
                    client_id: string
                    name: string
                    description: string | null
                    status: 'planning' | 'in_progress' | 'review' | 'completed' | 'on_hold' | 'cancelled'
                    start_date: string | null
                    end_date: string | null
                    budget: number | null
                    actual_cost: number | null
                    progress: number
                    assigned_to: string[]
                    tags: string[] | null
                    created_by: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['projects']['Insert']>
            }
            messages: {
                Row: {
                    id: string
                    conversation_id: string
                    sender_id: string
                    content: string
                    attachments: any
                    is_read: boolean
                    read_by: string[]
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['messages']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['messages']['Insert']>
            }
            conversations: {
                Row: {
                    id: string
                    title: string | null
                    type: 'direct' | 'group' | 'support'
                    participants: string[]
                    last_message_at: string | null
                    created_at: string
                    updated_at: string
                }
                Insert: Omit<Database['public']['Tables']['conversations']['Row'], 'id' | 'created_at' | 'updated_at'>
                Update: Partial<Database['public']['Tables']['conversations']['Insert']>
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
        }
    }
}
