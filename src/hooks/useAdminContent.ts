import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Type definitions
export interface BlogPost {
    id: string
    title: string
    slug: string
    excerpt: string
    content: string
    category: string
    image: string | null
    author_id: string | null
    published: boolean
    published_at: string | null
    views: number
    seo_title: string | null
    seo_description: string | null
    seo_keywords: string[] | null
    created_at: string
    updated_at: string
}

export interface BlogTag {
    id: string
    name: string
    slug: string
}

export interface MediaFile {
    id: string
    filename: string
    original_filename: string
    file_path: string
    file_size: number
    mime_type: string
    width: number | null
    height: number | null
    alt_text: string | null
    caption: string | null
    uploaded_by: string | null
    folder: string
    created_at: string
}

export interface SiteSetting {
    id: string
    key: string
    value: any
    description: string | null
    updated_at: string
}

// ============================================
// BLOG POSTS HOOKS
// ============================================

export function useBlogPosts() {
    return useQuery({
        queryKey: ['blog-posts'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            return data as BlogPost[]
        }
    })
}

export function useBlogPost(id: string) {
    return useQuery({
        queryKey: ['blog-posts', id],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('blog_posts')
                .select('*')
                .eq('id', id)
                .single()

            if (error) throw error
            return data as BlogPost
        },
        enabled: !!id
    })
}

export function useCreateBlogPost() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (post: Partial<BlogPost>) => {
            const { data, error } = await supabase
                .from('blog_posts')
                .insert([post])
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blog-posts'] })
        }
    })
}

export function useUpdateBlogPost() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, ...updates }: Partial<BlogPost> & { id: string }) => {
            const { data, error } = await supabase
                .from('blog_posts')
                .update(updates)
                .eq('id', id)
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['blog-posts'] })
            queryClient.invalidateQueries({ queryKey: ['blog-posts', variables.id] })
        }
    })
}

export function useDeleteBlogPost() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('blog_posts')
                .delete()
                .eq('id', id)

            if (error) throw error
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blog-posts'] })
        }
    })
}

// ============================================
// BLOG TAGS HOOKS
// ============================================

export function useBlogTags() {
    return useQuery({
        queryKey: ['blog-tags'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('blog_tags')
                .select('*')
                .order('name')

            if (error) throw error
            return data as BlogTag[]
        }
    })
}

export function useCreateBlogTag() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (tag: Partial<BlogTag>) => {
            const { data, error } = await supabase
                .from('blog_tags')
                .insert([tag])
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['blog-tags'] })
        }
    })
}

// ============================================
// MEDIA LIBRARY HOOKS
// ============================================

export function useMediaFiles(folder?: string) {
    return useQuery({
        queryKey: ['media-files', folder],
        queryFn: async () => {
            let query = supabase
                .from('media_library')
                .select('*')
                .order('created_at', { ascending: false })

            if (folder) {
                query = query.eq('folder', folder)
            }

            const { data, error } = await query

            if (error) throw error
            return data as MediaFile[]
        }
    })
}

export function useUploadMedia() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ file, folder = 'uncategorized' }: { file: File; folder?: string }) => {
            // Upload file to Supabase Storage
            const fileExt = file.name.split('.').pop()
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
            const filePath = `${folder}/${fileName}`

            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('media')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('media')
                .getPublicUrl(filePath)

            // Save metadata to database
            const { data, error } = await supabase
                .from('media_library')
                .insert([{
                    filename: fileName,
                    original_filename: file.name,
                    file_path: publicUrl,
                    file_size: file.size,
                    mime_type: file.type,
                    folder: folder
                }])
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['media-files'] })
        }
    })
}

export function useDeleteMedia() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (id: string) => {
            // First get the file path to delete from storage
            const { data: file } = await supabase
                .from('media_library')
                .select('file_path')
                .eq('id', id)
                .single()

            if (file) {
                // Extract path from URL and delete from storage
                const path = file.file_path.split('/').slice(-2).join('/')
                await supabase.storage.from('media').remove([path])
            }

            // Delete from database
            const { error } = await supabase
                .from('media_library')
                .delete()
                .eq('id', id)

            if (error) throw error
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['media-files'] })
        }
    })
}

// ============================================
// SITE SETTINGS HOOKS
// ============================================

export function useSiteSettings() {
    return useQuery({
        queryKey: ['site-settings'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('site_settings')
                .select('*')
                .order('key')

            if (error) throw error
            return data as SiteSetting[]
        }
    })
}

export function useUpdateSiteSetting() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ key, value }: { key: string; value: any }) => {
            const { data, error } = await supabase
                .from('site_settings')
                .update({ value })
                .eq('key', key)
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['site-settings'] })
        }
    })
}

export function useCreateSiteSetting() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (setting: Partial<SiteSetting>) => {
            const { data, error } = await supabase
                .from('site_settings')
                .insert([setting])
                .select()
                .single()

            if (error) throw error
            return data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['site-settings'] })
        }
    })
}
