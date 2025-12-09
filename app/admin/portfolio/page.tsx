'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Plus,
    Search,
    MoreVertical,
    Edit2,
    Trash2,
    Eye,
    ExternalLink,
    Star,
    Loader2,
    AlertCircle,
    FolderKanban,
    Grid,
    List
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
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'
import { useProjects, useDeleteProject, useUpdateProject } from '@/hooks/useAdminData'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export default function PortfolioPage() {
    const { data: projects, isLoading, error } = useProjects()
    const deleteProject = useDeleteProject()
    const updateProject = useUpdateProject()

    const [searchQuery, setSearchQuery] = useState('')
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedProject, setSelectedProject] = useState<any>(null)

    const filteredProjects = projects?.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.client.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleDelete = async () => {
        if (!selectedProject) return

        try {
            await deleteProject.mutateAsync(selectedProject.id)
            toast.success('Project deleted successfully')
            setDeleteDialogOpen(false)
            setSelectedProject(null)
        } catch (error) {
            toast.error('Failed to delete project')
        }
    }

    const handleToggleFeatured = async (project: any) => {
        try {
            await updateProject.mutateAsync({
                id: project.id,
                featured: !project.featured
            })
            toast.success(project.featured ? 'Removed from featured' : 'Added to featured')
        } catch (error) {
            toast.error('Failed to update project')
        }
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <p className="text-zinc-400">Failed to load projects. Please try again.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Portfolio</h1>
                    <p className="text-zinc-400 mt-1">
                        Manage your portfolio projects
                    </p>
                </div>
                <Link href="/admin/portfolio/new">
                    <Button className="bg-emerald-500 hover:bg-emerald-600">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Project
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <GlassCard className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <Input
                            placeholder="Search projects..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-zinc-800/50 border-zinc-700 text-white"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant={viewMode === 'grid' ? 'default' : 'ghost'}
                            size="icon"
                            onClick={() => setViewMode('grid')}
                            className={viewMode === 'grid' ? 'bg-emerald-500' : 'text-zinc-400'}
                        >
                            <Grid className="w-4 h-4" />
                        </Button>
                        <Button
                            variant={viewMode === 'list' ? 'default' : 'ghost'}
                            size="icon"
                            onClick={() => setViewMode('list')}
                            className={viewMode === 'list' ? 'bg-emerald-500' : 'text-zinc-400'}
                        >
                            <List className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </GlassCard>

            {/* Projects */}
            {isLoading ? (
                <div className={cn(
                    'gap-4',
                    viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'space-y-3'
                )}>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <GlassCard key={i} className="p-4">
                            <Skeleton className="h-40 w-full rounded-lg mb-4" />
                            <Skeleton className="h-5 w-3/4 mb-2" />
                            <Skeleton className="h-4 w-1/2" />
                        </GlassCard>
                    ))}
                </div>
            ) : filteredProjects?.length === 0 ? (
                <EmptyState
                    icon={<FolderKanban className="w-8 h-8" />}
                    title="No projects yet"
                    description="Add your first portfolio project to showcase your work."
                    action={
                        <Link href="/admin/portfolio/new">
                            <Button className="bg-emerald-500 hover:bg-emerald-600">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Project
                            </Button>
                        </Link>
                    }
                />
            ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <AnimatePresence>
                        {filteredProjects?.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <GlassCard className="overflow-hidden group">
                                    {/* Image */}
                                    <div className="relative aspect-video bg-zinc-800">
                                        {project.image ? (
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-zinc-600">
                                                <FolderKanban className="w-12 h-12" />
                                            </div>
                                        )}

                                        {/* Overlay */}
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                            <Link href={`/admin/portfolio/${project.id}`}>
                                                <Button size="sm" variant="secondary">
                                                    <Edit2 className="w-4 h-4 mr-1" />
                                                    Edit
                                                </Button>
                                            </Link>
                                            {project.url && (
                                                <Link href={project.url} target="_blank">
                                                    <Button size="sm" variant="secondary">
                                                        <ExternalLink className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                            )}
                                        </div>

                                        {/* Featured badge */}
                                        {project.featured && (
                                            <div className="absolute top-2 left-2">
                                                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/90 text-white text-xs">
                                                    <Star className="w-3 h-3 fill-current" />
                                                    Featured
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-4">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="min-w-0">
                                                <h3 className="font-medium text-white truncate">{project.title}</h3>
                                                <p className="text-sm text-zinc-500">{project.client}</p>
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white shrink-0">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                                                    <DropdownMenuItem
                                                        onClick={() => handleToggleFeatured(project)}
                                                        className="text-zinc-300 focus:bg-zinc-800"
                                                    >
                                                        <Star className={cn('w-4 h-4 mr-2', project.featured && 'fill-current')} />
                                                        {project.featured ? 'Remove Featured' : 'Make Featured'}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-zinc-800" />
                                                    <Link href={`/admin/portfolio/${project.id}`}>
                                                        <DropdownMenuItem className="text-zinc-300 focus:bg-zinc-800">
                                                            <Edit2 className="w-4 h-4 mr-2" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setSelectedProject(project)
                                                            setDeleteDialogOpen(true)
                                                        }}
                                                        className="text-red-400 focus:bg-red-500/10"
                                                    >
                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>

                                        <div className="mt-3 flex items-center gap-2">
                                            <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs">
                                                {project.category}
                                            </span>
                                            {Array.isArray(project.technologies) && (
                                                <span className="text-xs text-zinc-500">
                                                    {project.technologies.slice(0, 2).join(', ')}
                                                    {project.technologies.length > 2 && ` +${project.technologies.length - 2}`}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            ) : (
                <div className="space-y-3">
                    <AnimatePresence>
                        {filteredProjects?.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <GlassCard className="p-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-20 h-14 rounded-lg overflow-hidden bg-zinc-800 shrink-0">
                                            {project.image ? (
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-zinc-600">
                                                    <FolderKanban className="w-6 h-6" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-medium text-white truncate">{project.title}</h3>
                                                {project.featured && (
                                                    <Star className="w-4 h-4 text-amber-500 fill-current shrink-0" />
                                                )}
                                            </div>
                                            <p className="text-sm text-zinc-500 truncate">
                                                {project.client} • {project.category}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Link href={`/admin/portfolio/${project.id}`}>
                                                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                                                    <Edit2 className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => {
                                                    setSelectedProject(project)
                                                    setDeleteDialogOpen(true)
                                                }}
                                                className="text-zinc-400 hover:text-red-400"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}

            {/* Delete Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="bg-zinc-900 border-zinc-800">
                    <DialogHeader>
                        <DialogTitle className="text-white">Delete Project</DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Are you sure you want to delete "{selectedProject?.title}"? This action cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
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
                            disabled={deleteProject.isPending}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            {deleteProject.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
