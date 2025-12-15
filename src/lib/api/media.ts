import { adminSupabase as supabase } from '@/utils/adminSupabase'

export const mediaAPI = {
    // Get all media
    async getAll(filters?: { folder?: string; mime_type?: string }) {
        let query = supabase
            .from('media')
            .select('*, uploaded_by:admin_users(full_name:name)')
            .order('created_at', { ascending: false })

        if (filters?.folder) {
            query = query.eq('folder', filters.folder)
        }

        if (filters?.mime_type) {
            query = query.like('mime_type', `${filters.mime_type}%`)
        }

        const { data, error } = await query

        if (error) throw error
        return data
    },

    // Get media by ID
    async getById(id: string) {
        const { data, error } = await supabase
            .from('media')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    },

    // Upload file
    async upload(file: File, folder: string = 'uploads', userId: string) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
        const filePath = `${folder}/${fileName}`

        // Upload to storage
        const { data: uploadData, error: uploadError } = await supabase.storage
            .from('media')
            .upload(filePath, file)

        if (uploadError) throw uploadError

        // Get public URL
        const { data: { publicUrl } } = supabase.storage
            .from('media')
            .getPublicUrl(filePath)

        // Get file dimensions if image
        let width: number | undefined
        let height: number | undefined

        if (file.type.startsWith('image/')) {
            const dimensions = await getImageDimensions(file)
            width = dimensions.width
            height = dimensions.height
        }

        // Create media record
        const mediaData: any = {
            filename: fileName,
            original_filename: file.name,
            file_path: publicUrl,
            file_size: file.size,
            mime_type: file.type,
            width: width ?? null,
            height: height ?? null,
            folder,
            uploaded_by: userId,
            duration: null,
            alt_text: null,
            caption: null
        }

        const { data, error } = await supabase
            .from('media')
            .insert(mediaData as any)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Update media metadata
    async update(id: string, updates: any) {
        const { data, error } = await supabase
            .from('media')
            .update(updates as any)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error
        return data
    },

    // Delete media
    async delete(id: string) {
        // Get media record
        const media = await this.getById(id)

        // Delete from storage
        const filePath = media.file_path.split('/').slice(-2).join('/')
        await supabase.storage.from('media').remove([filePath])

        // Delete record
        const { error } = await supabase
            .from('media')
            .delete()
            .eq('id', id)

        if (error) throw error
    },

    // Search media
    async search(query: string) {
        const { data, error } = await supabase
            .from('media')
            .select('*')
            .or(`original_filename.ilike.%${query}%,alt_text.ilike.%${query}%,caption.ilike.%${query}%`)
            .order('created_at', { ascending: false })

        if (error) throw error
        return data
    }
}

// Helper function to get image dimensions
function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
            resolve({ width: img.width, height: img.height })
        }
        img.onerror = reject
        img.src = URL.createObjectURL(file)
    })
}
