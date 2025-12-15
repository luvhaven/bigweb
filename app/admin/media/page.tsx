'use client'

import { useState, useEffect, useRef } from 'react'
import { Upload, X, Image as ImageIcon, Trash2, Copy, Check, File, Search, Loader2, CloudUpload } from 'lucide-react'
import { adminSupabase as supabase } from '@/utils/adminSupabase'
import { motion, AnimatePresence } from 'framer-motion'

interface MediaFile {
    id: string
    name: string
    created_at: string
    metadata: {
        size: number
        mimetype: string
    }
}

export default function MediaLibraryPage() {
    const [files, setFiles] = useState<MediaFile[]>([])
    const [loading, setLoading] = useState(true)
    const [uploading, setUploading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [copiedId, setCopiedId] = useState<string | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [dragActive, setDragActive] = useState(false)

    useEffect(() => {
        loadFiles()
    }, [])

    const loadFiles = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase.storage.from('media').list('', {
                limit: 100,
                offset: 0,
                sortBy: { column: 'created_at', order: 'desc' },
            })

            if (data) {
                setFiles(data)
            }
        } catch (error) {
            console.error('Error loading files:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleUpload = async (file: File) => {
        if (!file) return

        try {
            setUploading(true)

            const fileExt = file.name.split('.').pop()
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

            const { error } = await supabase.storage
                .from('media')
                .upload(fileName, file)

            if (error) throw error

            await loadFiles()
        } catch (error) {
            console.error('Error uploading file:', error)
            alert('Failed to upload file')
        } finally {
            setUploading(false)
            setDragActive(false)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
        }
    }

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleUpload(e.dataTransfer.files[0])
        }
    }

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(true)
    }

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
    }

    const handleDelete = async (fileName: string) => {
        if (!confirm('Are you sure you want to delete this file?')) return

        try {
            const { error } = await supabase.storage
                .from('media')
                .remove([fileName])

            if (error) throw error

            setFiles(files.filter(f => f.name !== fileName))
        } catch (error) {
            console.error('Error deleting file:', error)
            alert('Failed to delete file')
        }
    }

    const copyUrl = (fileName: string) => {
        const { data } = supabase.storage.from('media').getPublicUrl(fileName)
        navigator.clipboard.writeText(data.publicUrl)
        setCopiedId(fileName)
        setTimeout(() => setCopiedId(null), 2000)
    }

    const filteredFiles = files.filter(file =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B'
        const k = 1024
        const sizes = ['B', 'KB', 'MB', 'GB']
        const i = Math.floor(Math.log(bytes) / Math.log(k))
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i]
    }

    return (
        <div className="space-y-8" onDragOver={onDragOver} onDrop={onDrop} onDragLeave={onDragLeave}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Media Library</h1>
                    <p className="text-zinc-400 mt-1">Manage and organize your digital assets</p>
                </div>
            </div>

            {/* Upload Zone */}
            <motion.div
                animate={{
                    scale: dragActive ? 1.02 : 1,
                    borderColor: dragActive ? 'rgb(16 185 129)' : 'rgb(39 39 42)'
                }}
                className={`relative border-2 border-dashed rounded-2xl p-8 transition-colors ${dragActive ? 'bg-emerald-500/10 border-emerald-500' : 'bg-zinc-900/30 border-zinc-800 hover:border-zinc-700'
                    }`}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => e.target.files && handleUpload(e.target.files[0])}
                    className="hidden"
                    accept="image/*,application/pdf"
                />
                <div className="flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center mb-4 text-emerald-500">
                        {uploading ? (
                            <Loader2 className="w-8 h-8 animate-spin" />
                        ) : (
                            <CloudUpload className="w-8 h-8" />
                        )}
                    </div>
                    <h3 className="text-lg font-medium text-white mb-1">
                        {uploading ? 'Uploading...' : 'Upload new assets'}
                    </h3>
                    <p className="text-sm text-zinc-400 mb-6 max-w-sm">
                        Drag and drop your files here, or click the button below to browse your computer.
                    </p>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        disabled={uploading}
                        className="px-6 py-2.5 bg-white text-black hover:bg-zinc-200 rounded-lg transition-colors font-medium disabled:opacity-50"
                    >
                        Browse Files
                    </button>
                </div>
            </motion.div>

            {/* Search Bar */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-4 sticky top-0 z-10">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search files by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-zinc-800/50 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                    />
                </div>
            </div>

            {/* Media Grid */}
            {loading ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                        <div key={i} className="aspect-square bg-zinc-900/30 rounded-xl animate-pulse" />
                    ))}
                </div>
            ) : filteredFiles.length === 0 ? (
                <div className="text-center py-20 bg-zinc-900/30 rounded-2xl border border-zinc-800/50">
                    <div className="w-16 h-16 rounded-full bg-zinc-800/50 flex items-center justify-center mx-auto mb-4">
                        <ImageIcon className="w-8 h-8 text-zinc-600" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">No media found</h3>
                    <p className="text-zinc-500 max-w-sm mx-auto">
                        Your library is empty. Upload your first image or document to get started.
                    </p>
                </div>
            ) : (
                <motion.div
                    layout
                    className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6"
                >
                    <AnimatePresence>
                        {filteredFiles.map((file) => {
                            const { data } = supabase.storage.from('media').getPublicUrl(file.name)
                            const isImage = file.metadata?.mimetype?.startsWith('image/')

                            return (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    key={file.id}
                                    className="group relative bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all duration-300"
                                >
                                    <div className="aspect-square bg-zinc-950/50 relative flex items-center justify-center overflow-hidden">
                                        {isImage ? (
                                            <img
                                                src={data.publicUrl}
                                                alt={file.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        ) : (
                                            <File className="w-12 h-12 text-zinc-700" />
                                        )}

                                        {/* Overlay Actions */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2 backdrop-blur-sm">
                                            <button
                                                onClick={() => copyUrl(file.name)}
                                                className="p-2.5 bg-white text-black rounded-lg hover:scale-110 transition-transform shadow-lg"
                                                title="Copy URL"
                                            >
                                                {copiedId === file.name ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(file.name)}
                                                className="p-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:scale-110 transition-transform shadow-lg"
                                                title="Delete"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <p className="text-xs text-zinc-200 truncate font-medium" title={file.name}>{file.name}</p>
                                        <div className="flex items-center justify-between mt-1.5 text-[10px] text-zinc-500 font-medium">
                                            <span>{formatSize(file.metadata?.size || 0)}</span>
                                            <span>{new Date(file.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </AnimatePresence>
                </motion.div>
            )}
        </div>
    )
}

