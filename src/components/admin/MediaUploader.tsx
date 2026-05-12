'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Image as ImageIcon, Film, FileText, Loader2, Check } from 'lucide-react'
import { mediaAPI } from '@/lib/api/media'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'

interface MediaUploaderProps {
    onUploadComplete?: (media: any[]) => void
    maxFiles?: number
    accept?: Record<string, string[]>
}

export default function MediaUploader({
    onUploadComplete,
    maxFiles = 10,
    accept = {
        'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp'],
        'video/*': ['.mp4', '.webm'],
        'application/pdf': ['.pdf']
    }
}: MediaUploaderProps) {
    const { user } = useAuth()
    const [uploading, setUploading] = useState(false)
    const [uploads, setUploads] = useState<any[]>([])

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        if (!user) return

        setUploading(true)
        const newUploads = acceptedFiles.map(file => ({
            file,
            progress: 0,
            status: 'uploading' as 'uploading' | 'success' | 'error',
            id: Math.random().toString(36)
        }))

        setUploads(prev => [...prev, ...newUploads])

        const uploadedMedia: any[] = []

        for (const upload of newUploads) {
            try {
                const media = await mediaAPI.upload(upload.file, 'uploads', user.id)

                setUploads(prev => prev.map(u =>
                    u.id === upload.id
                        ? { ...u, status: 'success', media }
                        : u
                ))

                uploadedMedia.push(media)
            } catch (error) {
                console.error('Upload error:', error)
                setUploads(prev => prev.map(u =>
                    u.id === upload.id
                        ? { ...u, status: 'error' }
                        : u
                ))
            }
        }

        setUploading(false)

        if (onUploadComplete && uploadedMedia.length > 0) {
            onUploadComplete(uploadedMedia)
        }
    }, [user, onUploadComplete])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        maxFiles,
        disabled: uploading
    })

    const removeUpload = (id: string) => {
        setUploads(prev => prev.filter(u => u.id !== id))
    }

    const getFileIcon = (type: string) => {
        if (type.startsWith('image/')) return ImageIcon
        if (type.startsWith('video/')) return Film
        return FileText
    }

    return (
        <div className="space-y-4">
            {/* Drop Zone */}
            <div
                {...getRootProps()}
                className={`
          border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
          transition-all duration-300
          ${isDragActive
                        ? 'border-accent bg-accent/5 scale-105'
                        : 'border-border hover:border-accent/50 hover:bg-accent/5'
                    }
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
            >
                <input {...getInputProps()} />

                <motion.div
                    animate={isDragActive ? { scale: 1.1 } : { scale: 1 }}
                    className="space-y-4"
                >
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto">
                        <Upload className="w-8 h-8 text-accent" />
                    </div>

                    <div>
                        <p className="text-lg font-semibold mb-1">
                            {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            or click to browse • Max {maxFiles} files • Images, videos, PDFs
                        </p>
                    </div>
                </motion.div>
            </div>

            {/* Upload Progress */}
            <AnimatePresence>
                {uploads.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-2"
                    >
                        {uploads.map((upload) => {
                            const Icon = getFileIcon(upload.file.type)

                            return (
                                <div
                                    key={upload.id}
                                    className="flex items-center gap-3 p-3 bg-card border border-border rounded-lg"
                                >
                                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-5 h-5" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{upload.file.name}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {(upload.file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>
                                    </div>

                                    {upload.status === 'uploading' && (
                                        <Loader2 className="w-5 h-5 animate-spin text-accent" />
                                    )}

                                    {upload.status === 'success' && (
                                        <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                                            <Check className="w-3 h-3 text-white" />
                                        </div>
                                    )}

                                    {upload.status === 'error' && (
                                        <div className="text-red-500 text-sm">Failed</div>
                                    )}

                                    <button
                                        onClick={() => removeUpload(upload.id)}
                                        className="p-1 hover:bg-secondary rounded"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            )
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}
