'use client'

import { useState, useEffect } from 'react'
import { adminSupabase as supabase } from '@/utils/adminSupabase'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Loader2, Upload, Trash2, Copy, Image as ImageIcon, Search } from 'lucide-react'
import Image from 'next/image'

interface MediaItem {
    id: string
    filename: string
    public_url: string
    file_type: string
    file_size: number
    file_path: string
    created_at: string
}

export default function MediaLibraryPage() {
    const [media, setMedia] = useState<MediaItem[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [search, setSearch] = useState('')

    useEffect(() => {
        loadMedia()
    }, [])

    const loadMedia = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('media_library')
                .select('*')
                .order('created_at', { ascending: false })

            if (error) throw error
            setMedia(data || [])
        } catch (error) {
            console.error('Error loading media:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return

        try {
            setUploading(true)
            const file = e.target.files[0]
            const fileExt = file.name.split('.').pop()
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
            const filePath = `${fileName}`

            // 1. Upload to Supabase Storage
            // Assumes bucket 'cms-media' exists and is public
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('cms-media')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('cms-media')
                .getPublicUrl(filePath)

            // 3. Save to Database
            const { error: dbError } = await supabase
                .from('media_library')
                .insert([{
                    filename: file.name,
                    file_path: filePath,
                    public_url: publicUrl,
                    file_type: file.type,
                    file_size: file.size
                }])

            if (dbError) throw dbError

            loadMedia()
        } catch (error) {
            console.error('Error uploading file:', error)
            alert('Upload failed. Ensure "cms-media" bucket exists and policies allow upload.')
        } finally {
            setUploading(false)
        }
    }

    const handleDelete = async (id: string, filePath: string) => {
        if (!confirm('Delete this image? This cannot be undone.')) return

        try {
            // 1. Delete from Storage
            const { error: storageError } = await supabase.storage
                .from('cms-media')
                .remove([filePath])

            if (storageError) console.error('Storage delete error:', storageError)

            // 2. Delete from DB
            const { error: dbError } = await supabase
                .from('media_library')
                .delete()
                .eq('id', id)

            if (dbError) throw dbError
            loadMedia()
        } catch (error) {
            console.error('Error deleting media:', error)
        }
    }

    const copyToClipboard = (url: string) => {
        navigator.clipboard.writeText(url)
        alert('URL copied to clipboard!')
    }

    const filteredMedia = media.filter(item =>
        item.filename.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="flex min-h-screen bg-background">
            <AdminSidebar />

            <div className="flex-1 ml-64 p-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Media Library</h1>
                        <p className="text-muted-foreground mt-1">Manage your images and assets.</p>
                    </div>

                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search files..."
                                className="pl-9 w-64"
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                            />
                        </div>

                        <div className="relative">
                            <input
                                type="file"
                                id="file-upload"
                                className="hidden"
                                onChange={handleFileUpload}
                                accept="image/*"
                                disabled={uploading}
                            />
                            <label htmlFor="file-upload">
                                <Button asChild disabled={uploading} className="cursor-pointer gap-2">
                                    <span>
                                        {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                        Upload Image
                                    </span>
                                </Button>
                            </label>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-24"><Loader2 className="w-8 h-8 animate-spin" /></div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {filteredMedia.map(item => (
                            <Card key={item.id} className="group overflow-hidden relative border-none shadow-md hover:shadow-xl transition-all">
                                <div className="aspect-square relative bg-muted/30">
                                    <Image
                                        src={item.public_url}
                                        alt={item.filename}
                                        fill
                                        className="object-cover transition-transform group-hover:scale-105"
                                    />
                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                        <Button size="icon" variant="secondary" onClick={() => copyToClipboard(item.public_url)} title="Copy URL">
                                            <Copy className="w-4 h-4" />
                                        </Button>
                                        <Button size="icon" variant="destructive" onClick={() => handleDelete(item.id, item.file_path)} title="Delete">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="p-3 text-sm truncate font-medium text-center bg-card border-t" title={item.filename}>
                                    {item.filename}
                                </div>
                            </Card>
                        ))}

                        {filteredMedia.length === 0 && (
                            <div className="col-span-full py-24 text-center border-2 border-dashed rounded-xl">
                                <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                                <h3 className="text-lg font-medium">No images found</h3>
                                <p className="text-muted-foreground">Upload your first image to get started.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
