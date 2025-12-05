'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Image as ImageIcon, Video, File, Trash2, Search, FolderPlus, Grid, List, CheckCircle, MoreHorizontal, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import AdminHeader from '@/components/admin/AdminHeader'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'

// Mock data generator
const generateMockMedia = (count: number) => {
    return Array.from({ length: count }).map((_, i) => ({
        id: `media-${i}`,
        name: `Asset_${i + 1}.${i % 3 === 0 ? 'jpg' : i % 3 === 1 ? 'png' : 'mp4'}`,
        type: i % 3 === 2 ? 'video' : 'image',
        size: `${(Math.random() * 5 + 0.5).toFixed(1)} MB`,
        url: `https://picsum.photos/seed/${i}/400/400`,
        date: new Date(Date.now() - Math.random() * 10000000000).toLocaleDateString()
    }))
}

export default function MediaPage() {
    const [media, setMedia] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [uploading, setUploading] = useState(false)
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [selectedItems, setSelectedItems] = useState<string[]>([])

    useEffect(() => {
        // Simulate loading
        setTimeout(() => {
            setMedia(generateMockMedia(12))
            setLoading(false)
        }, 1000)
    }, [])

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return

        setUploading(true)
        try {
            // Simulate upload
            await new Promise(resolve => setTimeout(resolve, 1500))
            toast.success(`${files.length} file(s) uploaded`)
            // Add dummy files
            const newFiles = Array.from(files).map((f, i) => ({
                id: `new-${Date.now()}-${i}`,
                name: f.name,
                type: f.type.startsWith('video') ? 'video' : 'image',
                size: `${(f.size / 1024 / 1024).toFixed(1)} MB`,
                url: URL.createObjectURL(f),
                date: new Date().toLocaleDateString()
            }))
            setMedia(prev => [...newFiles, ...prev])
        } catch (error) {
            toast.error('Failed to upload files')
        } finally {
            setUploading(false)
        }
    }

    const toggleSelection = (id: string) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        )
    }

    const deleteSelected = () => {
        if (!confirm(`Delete ${selectedItems.length} items?`)) return
        setMedia(prev => prev.filter(m => !selectedItems.includes(m.id)))
        setSelectedItems([])
        toast.success('Items deleted')
    }

    const filteredMedia = media.filter(m =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-8">
            <AdminHeader
                title="Media Library"
                description="Manage your digital assets."
            >
                <div className="flex items-center gap-2">
                    {selectedItems.length > 0 && (
                        <Button variant="destructive" size="sm" onClick={deleteSelected} className="gap-2">
                            <Trash2 className="w-4 h-4" />
                            Delete ({selectedItems.length})
                        </Button>
                    )}
                    <div className="flex items-center border border-border rounded-lg p-1">
                        <Button
                            variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setViewMode('grid')}
                        >
                            <Grid className="w-4 h-4" />
                        </Button>
                        <Button
                            variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setViewMode('list')}
                        >
                            <List className="w-4 h-4" />
                        </Button>
                    </div>
                    <label>
                        <Button className="bg-accent hover:bg-accent/90 gap-2" disabled={uploading} asChild>
                            <span>
                                {uploading ? 'Uploading...' : (
                                    <>
                                        <Upload className="w-4 h-4" /> Upload
                                    </>
                                )}
                            </span>
                        </Button>
                        <input
                            type="file"
                            multiple
                            accept="image/*,video/*"
                            className="hidden"
                            onChange={handleFileUpload}
                            disabled={uploading}
                        />
                    </label>
                </div>
            </AdminHeader>

            <Tabs defaultValue="all" className="space-y-6">
                <div className="flex items-center justify-between">
                    <TabsList>
                        <TabsTrigger value="all">All Media</TabsTrigger>
                        <TabsTrigger value="images">Images</TabsTrigger>
                        <TabsTrigger value="videos">Videos</TabsTrigger>
                        <TabsTrigger value="documents">Documents</TabsTrigger>
                    </TabsList>

                    <div className="relative w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search assets..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-9"
                        />
                    </div>
                </div>

                <TabsContent value="all" className="mt-0">
                    {/* Upload Zone */}
                    <label className="block mb-8 group cursor-pointer">
                        <div className="border-2 border-dashed border-border rounded-2xl p-12 text-center hover:border-accent hover:bg-accent/5 transition-all">
                            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Upload className="w-8 h-8 text-muted-foreground group-hover:text-accent" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2">Drop files here or click to upload</h3>
                            <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                                Support for high-res images, videos, and documents up to 50MB.
                            </p>
                            <input
                                type="file"
                                multiple
                                accept="image/*,video/*"
                                className="hidden"
                                onChange={handleFileUpload}
                                disabled={uploading}
                            />
                        </div>
                    </label>

                    {loading ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="aspect-square bg-secondary/50 rounded-xl animate-pulse" />
                            ))}
                        </div>
                    ) : (
                        <div className={viewMode === 'grid' ? "grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6" : "space-y-2"}>
                            {filteredMedia.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    layoutId={item.id}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: index * 0.05 }}
                                    onClick={() => toggleSelection(item.id)}
                                    className={`group relative ${viewMode === 'grid'
                                        ? 'aspect-square bg-card border rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer'
                                        : 'flex items-center gap-4 p-4 bg-card border rounded-xl hover:bg-accent/5 cursor-pointer'
                                        } ${selectedItems.includes(item.id) ? 'ring-2 ring-accent border-transparent' : 'border-border'}`}
                                >
                                    {viewMode === 'grid' ? (
                                        <>
                                            {/* Grid View Item */}
                                            <div className="absolute top-3 left-3 z-10">
                                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedItems.includes(item.id)
                                                    ? 'bg-accent border-accent text-white'
                                                    : 'border-white/50 bg-black/20 hover:border-white'
                                                    }`}>
                                                    {selectedItems.includes(item.id) && <CheckCircle className="w-3 h-3" />}
                                                </div>
                                            </div>

                                            <div className="w-full h-full relative">
                                                {item.type === 'video' ? (
                                                    <div className="w-full h-full flex items-center justify-center bg-secondary">
                                                        <Video className="w-12 h-12 text-muted-foreground" />
                                                    </div>
                                                ) : (
                                                    <img src={item.url} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                                                    <p className="text-white text-sm font-medium truncate">{item.name}</p>
                                                    <p className="text-white/70 text-xs">{item.size}</p>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            {/* List View Item */}
                                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${selectedItems.includes(item.id)
                                                ? 'bg-accent border-accent text-white'
                                                : 'border-muted-foreground/30 hover:border-accent'
                                                }`}>
                                                {selectedItems.includes(item.id) && <CheckCircle className="w-3 h-3" />}
                                            </div>
                                            <div className="w-12 h-12 rounded-lg bg-secondary overflow-hidden shrink-0">
                                                {item.type === 'video' ? (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Video className="w-6 h-6 text-muted-foreground" />
                                                    </div>
                                                ) : (
                                                    <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium truncate">{item.name}</p>
                                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                    <Badge variant="secondary" className="text-[10px] h-5">{item.type}</Badge>
                                                    <span>{item.size}</span>
                                                    <span>•</span>
                                                    <span>{item.date}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon">
                                                    <Download className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}
