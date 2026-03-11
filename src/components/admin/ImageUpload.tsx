'use client'

import { useState, useRef, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Upload, X, ImageIcon, Loader2, CheckCircle2, Link2, ChevronDown } from 'lucide-react'
import Image from 'next/image'

interface ImageUploadProps {
    value: string
    onChange: (url: string) => void
    label?: string
    hint?: string
    bucket?: string
    folder?: string
    accept?: string
}

export default function ImageUpload({
    value,
    onChange,
    label = 'Image',
    hint,
    bucket = 'media',
    folder = 'uploads',
    accept = 'image/*',
}: ImageUploadProps) {
    const supabase = createClient()
    const fileRef = useRef<HTMLInputElement>(null)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState('')
    const [mode, setMode] = useState<'upload' | 'url'>('upload')
    const [urlInput, setUrlInput] = useState(value || '')

    const handleFile = useCallback(async (file: File) => {
        if (!file) return
        setUploading(true)
        setError('')
        try {
            const ext = file.name.split('.').pop()
            const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
            const { error: uploadError } = await supabase.storage
                .from(bucket)
                .upload(path, file, { upsert: true })
            if (uploadError) throw uploadError
            const { data } = supabase.storage.from(bucket).getPublicUrl(path)
            onChange(data.publicUrl)
        } catch (err: any) {
            setError(err.message || 'Upload failed')
        } finally {
            setUploading(false)
        }
    }, [supabase, bucket, folder, onChange])

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        const file = e.dataTransfer.files[0]
        if (file) handleFile(file)
    }, [handleFile])

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) handleFile(file)
    }

    const handleUrlSave = () => {
        onChange(urlInput)
    }

    const clear = () => {
        onChange('')
        setUrlInput('')
    }

    return (
        <div className="space-y-2">
            {label && (
                <label className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                    <ImageIcon className="w-3.5 h-3.5" /> {label}
                </label>
            )}

            {/* Mode toggle */}
            <div className="flex gap-2 mb-2">
                <button
                    type="button"
                    onClick={() => setMode('upload')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${mode === 'upload' ? 'bg-accent text-black' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}
                >
                    <Upload className="w-3 h-3" /> Upload File
                </button>
                <button
                    type="button"
                    onClick={() => setMode('url')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${mode === 'url' ? 'bg-accent text-black' : 'bg-zinc-800 text-zinc-400 hover:text-white'}`}
                >
                    <Link2 className="w-3 h-3" /> Paste URL
                </button>
            </div>

            {/* Preview */}
            {value && (
                <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-white/[0.08] group">
                    <img
                        src={value}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                    />
                    <button
                        type="button"
                        onClick={clear}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/70 text-[10px] text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Image set
                    </div>
                </div>
            )}

            {/* Upload dropzone */}
            {mode === 'upload' && (
                <div
                    onDrop={handleDrop}
                    onDragOver={(e) => e.preventDefault()}
                    onClick={() => fileRef.current?.click()}
                    className="relative border-2 border-dashed border-white/[0.1] rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-accent/40 hover:bg-accent/5 transition-all group"
                >
                    <input
                        ref={fileRef}
                        type="file"
                        accept={accept}
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    {uploading ? (
                        <Loader2 className="w-8 h-8 text-accent animate-spin" />
                    ) : (
                        <Upload className="w-8 h-8 text-zinc-600 group-hover:text-accent transition-colors" />
                    )}
                    <p className="text-sm text-zinc-500 group-hover:text-zinc-300 transition-colors">
                        {uploading ? 'Uploading...' : 'Drop image here or click to browse'}
                    </p>
                    <p className="text-xs text-zinc-700">PNG, JPG, WebP · Max 10MB</p>
                </div>
            )}

            {/* URL input */}
            {mode === 'url' && (
                <div className="flex gap-2">
                    <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                        placeholder="https://example.com/image.jpg"
                        className="flex-1 bg-zinc-900/80 border border-white/[0.08] rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-accent/40 transition-all"
                        onKeyDown={(e) => e.key === 'Enter' && handleUrlSave()}
                    />
                    <button
                        type="button"
                        onClick={handleUrlSave}
                        className="px-4 py-3 rounded-xl bg-accent text-black font-bold text-sm hover:opacity-90 transition-opacity whitespace-nowrap"
                    >
                        Set
                    </button>
                </div>
            )}

            {error && (
                <p className="text-red-400 text-xs mt-1">{error}</p>
            )}
            {hint && !error && (
                <p className="text-zinc-600 text-xs mt-1">{hint}</p>
            )}
        </div>
    )
}
