'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Upload,
    Search,
    FolderOpen,
    Image as ImageIcon,
    FileVideo,
    FileText,
    MoreVertical,
    Trash2,
    Download,
    Eye,
    Loader2,
    AlertCircle,
    X,
    Check
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GlassCard, SectionHeader, EmptyState, Skeleton } from '@/components/admin/ui/GlassCard'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { useMediaFiles, useUploadMedia, useDeleteMedia } from '@/hooks/useAdminContent'
import { cn } from '@/lib/utils'
import { formatDistanceToNow } from 'date-fns'
import toast from 'react-hot-toast'

const folders = [
    { name: 'All Files', value: null },
    { name: 'Blog', value: 'blog' },
    { name: 'Portfolio', value: 'portfolio' },
    { name: 'Services', value: 'services' },
    { name: 'Uncategorized', value: 'uncategorized' }
]

const getFileIcon = (mimeType: string) => {
    if (mimeType.startsWith('image/')) return ImageIcon
    if (mimeType.startsWith('video/')) return FileVideo
    return FileText
}

const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

export default function MediaPage() {
    const [selectedFolder, setSelectedFolder] = useState<string | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedFile, setSelectedFile] = useState<any>(null)
    const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [dragActive, setDragActive] = useState(false)

    const { data: media, isLoading } = useMediaFiles(selectedFolder || undefined)
    const uploadMedia = useUploadMedia()
    const deleteMedia = useDeleteMedia()

    const filteredMedia = media?.filter(m =>
        m.original_filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.alt_text?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true)
        } else if (e.type === 'dragleave') {
            setDragActive(false)
        }
    }

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)

        const files = Array.from(e.dataTransfer.files)
        for (const file of files) {
            try {
                await uploadMedia.mutateAsync({ file, folder: selectedFolder || 'uncategorized' })
                toast.success(`Uploaded ${file.name}`)
            } catch (error) {
                toast.error(`Failed to upload ${file.name}`)
            }
        }
    }

    const handleFileInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || [])
        for (const file of files) {
            try {
                await uploadMedia.mutateAsync({ file, folder: selectedFolder || 'uncategorized' })
                toast.success(`Uploaded ${file.name}`)
            } catch (error) {
                toast.error(`Failed to upload ${file.name}`)
            }
        }
        setUploadDialogOpen(false)
    }

    const handleDelete = async () => {
        if (!selectedFile) return

        try {
            await deleteMedia.mutateAsync(selectedFile.id)
            toast.success('File deleted successfully')
            setDeleteDialogOpen(false)
            setSelectedFile(null)
        } catch (error) {
            toast.error('Failed to delete file')
        }
    }

    const handleCopyUrl = (url: string) => {
        navigator.clipboard.writeText(url)
        toast.success('URL copied to clipboard')
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Media Library</h1>
                    <p className="text-zinc-400 mt-1">
                        Upload and manage your media files
                    </p>
                </div>
                <Button
                    onClick={() => setUploadDialogOpen(true)}
                    className="bg-emerald-500 hover:bg-emerald-600"
                >
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Files
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar - Folders */}
                <GlassCard className="p-4">
                    <h3 className="text-sm font-medium text-zinc-400 mb-3">Folders</h3>
                    <div className="space-y-1">
                        {folders.map((folder) => (
                            <button
                                key={folder.name}
                                onClick={() => setSelectedFolder(folder.value)}
                                className={cn(
                                    'w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors',
                                    selectedFolder === folder.value
                                        ? 'bg-emerald-500/10 text-emerald-500'
                                        : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                                )}
                            >
                                <FolderOpen className="w-4 h-4" />
                                {folder.name}
                            </button>
                        ))}
                    </div>
                </GlassCard>

                {/* Main Content */}
                <div className="lg:col-span-3 space-y-4">
                    {/* Search */}
                    <GlassCard className="p-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <Input
                                placeholder="Search files..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 bg-zinc-800/50 border-zinc-700 text-white"
                            />
                        </div>
                    </GlassCard>

                    {/* Media Grid */}
                    {isLoading ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <GlassCard key={i} className="aspect-square p-2">
                                    <Skeleton className="w-full h-full rounded" />
                                </GlassCard>
                            ))}
                        </div>
                    ) : filteredMedia?.length === 0 ? (
                        <EmptyState
                            icon={<ImageIcon className="w-8 h-8" />}
                            title="No files yet"
                            description="Upload your first file to get started."
                            action={
                                <Button
                                    onClick={() => setUploadDialogOpen(true)}
                                    className="bg-emerald-500 hover:bg-emerald-600"
                                >
                                    <Upload className="w-4 h-4 mr-2" />
                                    Upload Files
                                </Button>
                            }
                        />
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            <AnimatePresence>
                                {filteredMedia?.map((file) => {
                                    const FileIcon = getFileIcon(file.mime_type)
                                    return (
                                        <motion.div
                                            key={file.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                        >
                                            <GlassCard className="group relative aspect-square overflow-hidden">
                                                {/* Preview */}
                                                {file.mime_type.startsWith('image/') ? (
                                                    <img
                                                        src={file.file_path}
                                                        alt={file.alt_text || file.original_filename}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-zinc-800">
                                                        <FileIcon className="w-12 h-12 text-zinc-600" />
                                                    </div>
                                                )}

                                                {/* Overlay */}
                                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col">
                                                    <div className="p-2 flex justify-end gap-1">
                                                        <Button
                                                            size="icon"
                                                            variant="secondary"
                                                            className="h-8 w-8"
                                                            onClick={() => handleCopyUrl(file.file_path)}
                                                        >
                                                            <Check className="w-4 h-4" />
                                                        </Button>
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button size="icon" variant="secondary" className="h-8 w-8">
                                                                    <MoreVertical className="w-4 h-4" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent className="bg-zinc-900 border-zinc-800">
                                                                <DropdownMenuItem
                                                                    onClick={() => window.open(file.file_path, '_blank')}
                                                                    className="text-zinc-300"
                                                                >
                                                                    <Eye className="w-4 h-4 mr-2" />
                                                                    View
                                                                </DropdownMenuItem>
                                                                <DropdownMenuItem
                                                                    onClick={() => handleCopyUrl(file.file_path)}
                                                                    className="text-zinc-300"
                                                                >
                                                                    <Download className="w-4 h-4 mr-2" />
                                                                    Copy URL
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator className="bg-zinc-800" />
                                                                <DropdownMenuItem
                                                                    onClick={() => {
                                                                        setSelectedFile(file)
                                                                        setDeleteDialogOpen(true)
                                                                    }}
                                                                    className="text-red-400"
                                                                >
                                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                    <div className="flex-1" />
                                                    <div className="p-2 bg-gradient-to-t from-black/80 to-transparent">
                                                        <p className="text-white text-xs font-medium truncate">
                                                            {file.original_filename}
                                                        </p>
                                                        <p className="text-zinc-400 text-xs">
                                                            {formatFileSize(file.file_size)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </GlassCard>
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>

            {/* Upload Dialog */}
            <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
                <DialogContent className="bg-zinc-900 border-zinc-800">
                    <DialogHeader>
                        <DialogTitle className="text-white">Upload Files</DialogTitle>
                    </DialogHeader>
                    <div
                        className={cn(
                            'relative border-2 border-dashed rounded-lg p-12 text-center transition-colors',
                            dragActive
                                ? 'border-emerald-500 bg-emerald-500/10'
                                : 'border-zinc-700 hover:border-zinc-600'
                        )}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input
                            type="file"
                            multiple
                            onChange={handleFileInput}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <Upload className="w-12 h-12 text-zinc-500 mx-auto mb-4" />
                        <p className="text-white font-medium mb-2">
                            Drag and drop files here
                        </p>
                        <p className="text-zinc-400 text-sm">
                            or click to browse
                        </p>
                    </div>
                    {uploadMedia.isPending && (
                        <div className="flex items-center justify-center gap-2 text-emerald-500">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm">Uploading...</span>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="bg-zinc-900 border-zinc-800">
                    <DialogHeader>
                        <DialogTitle className="text-white">Delete File</DialogTitle>
                    </DialogHeader>
                    <p className="text-zinc-400">
                        Are you sure you want to delete "{selectedFile?.original_filename}"? This action cannot be undone.
                    </p>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => setDeleteDialogOpen(false)}
                            className="border-zinc-700 text-zinc-300"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            disabled={deleteMedia.isPending}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            {deleteMedia.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
