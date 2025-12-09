'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Plus,
    Search,
    MoreVertical,
    Edit2,
    Trash2,
    Eye,
    EyeOff,
    GripVertical,
    Star,
    Loader2,
    AlertCircle
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
import { useTestimonials, useDeleteTestimonial, useUpdateTestimonial } from '@/hooks/useAdminData'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

export default function TestimonialsPage() {
    const { data: testimonials, isLoading, error } = useTestimonials()
    const deleteTestimonial = useDeleteTestimonial()
    const updateTestimonial = useUpdateTestimonial()

    const [searchQuery, setSearchQuery] = useState('')
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedTestimonial, setSelectedTestimonial] = useState<any>(null)

    const filteredTestimonials = testimonials?.filter(t =>
        t.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.client_company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.content.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleDelete = async () => {
        if (!selectedTestimonial) return

        try {
            await deleteTestimonial.mutateAsync(selectedTestimonial.id)
            toast.success('Testimonial deleted successfully')
            setDeleteDialogOpen(false)
            setSelectedTestimonial(null)
        } catch (error) {
            toast.error('Failed to delete testimonial')
        }
    }

    const handleToggleFeatured = async (testimonial: any) => {
        try {
            await updateTestimonial.mutateAsync({
                id: testimonial.id,
                is_featured: !testimonial.is_featured
            })
            toast.success(testimonial.is_featured ? 'Removed from featured' : 'Added to featured')
        } catch (error) {
            toast.error('Failed to update testimonial')
        }
    }

    const handleToggleStatus = async (testimonial: any) => {
        const newStatus = testimonial.status === 'active' ? 'archived' : 'active'
        try {
            await updateTestimonial.mutateAsync({
                id: testimonial.id,
                status: newStatus
            })
            toast.success(`Testimonial ${newStatus === 'active' ? 'activated' : 'archived'}`)
        } catch (error) {
            toast.error('Failed to update testimonial')
        }
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <p className="text-zinc-400">Failed to load testimonials. Please try again.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Testimonials</h1>
                    <p className="text-zinc-400 mt-1">
                        Manage client testimonials and reviews
                    </p>
                </div>
                <Link href="/admin/testimonials/new">
                    <Button className="bg-emerald-500 hover:bg-emerald-600">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Testimonial
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <GlassCard className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <Input
                            placeholder="Search testimonials..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 bg-zinc-800/50 border-zinc-700 text-white"
                        />
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300">
                            All
                        </Button>
                        <Button variant="ghost" size="sm" className="text-zinc-400">
                            Featured
                        </Button>
                        <Button variant="ghost" size="sm" className="text-zinc-400">
                            Archived
                        </Button>
                    </div>
                </div>
            </GlassCard>

            {/* Testimonials Grid */}
            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <GlassCard key={i} className="p-6">
                            <Skeleton className="h-4 w-3/4 mb-4" />
                            <Skeleton className="h-20 w-full mb-4" />
                            <div className="flex items-center gap-3">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div>
                                    <Skeleton className="h-4 w-24 mb-2" />
                                    <Skeleton className="h-3 w-32" />
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            ) : filteredTestimonials?.length === 0 ? (
                <EmptyState
                    icon={<Star className="w-8 h-8" />}
                    title="No testimonials yet"
                    description="Add your first client testimonial to showcase on your website."
                    action={
                        <Link href="/admin/testimonials/new">
                            <Button className="bg-emerald-500 hover:bg-emerald-600">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Testimonial
                            </Button>
                        </Link>
                    }
                />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <AnimatePresence>
                        {filteredTestimonials?.map((testimonial) => (
                            <motion.div
                                key={testimonial.id}
                                layout
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <GlassCard className={cn(
                                    'p-6 relative group',
                                    testimonial.status === 'archived' && 'opacity-60'
                                )}>
                                    {/* Featured badge */}
                                    {testimonial.is_featured && (
                                        <div className="absolute top-4 right-4">
                                            <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-xs">
                                                <Star className="w-3 h-3 fill-current" />
                                                Featured
                                            </span>
                                        </div>
                                    )}

                                    {/* Rating */}
                                    <div className="flex gap-1 mb-3">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                                        ))}
                                    </div>

                                    {/* Content */}
                                    <p className="text-zinc-300 text-sm leading-relaxed mb-4 line-clamp-3">
                                        "{testimonial.content}"
                                    </p>

                                    {/* Result metric */}
                                    {testimonial.result_metric && (
                                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm mb-4">
                                            {testimonial.result_metric}
                                        </div>
                                    )}

                                    {/* Author */}
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            {testimonial.client_image ? (
                                                <img
                                                    src={testimonial.client_image}
                                                    alt={testimonial.client_name}
                                                    className="w-10 h-10 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                                                    {testimonial.client_name.charAt(0)}
                                                </div>
                                            )}
                                            <div>
                                                <p className="font-medium text-white text-sm">{testimonial.client_name}</p>
                                                <p className="text-xs text-zinc-500">
                                                    {testimonial.client_role} at {testimonial.client_company}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                                                <DropdownMenuItem
                                                    onClick={() => handleToggleFeatured(testimonial)}
                                                    className="text-zinc-300 focus:bg-zinc-800"
                                                >
                                                    <Star className={cn(
                                                        'w-4 h-4 mr-2',
                                                        testimonial.is_featured && 'fill-current'
                                                    )} />
                                                    {testimonial.is_featured ? 'Remove Featured' : 'Make Featured'}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleToggleStatus(testimonial)}
                                                    className="text-zinc-300 focus:bg-zinc-800"
                                                >
                                                    {testimonial.status === 'active' ? (
                                                        <>
                                                            <EyeOff className="w-4 h-4 mr-2" />
                                                            Archive
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Eye className="w-4 h-4 mr-2" />
                                                            Activate
                                                        </>
                                                    )}
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-zinc-800" />
                                                <Link href={`/admin/testimonials/${testimonial.id}`}>
                                                    <DropdownMenuItem className="text-zinc-300 focus:bg-zinc-800">
                                                        <Edit2 className="w-4 h-4 mr-2" />
                                                        Edit
                                                    </DropdownMenuItem>
                                                </Link>
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setSelectedTestimonial(testimonial)
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
                        <DialogTitle className="text-white">Delete Testimonial</DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Are you sure you want to delete this testimonial from {selectedTestimonial?.client_name}? This action cannot be undone.
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
                            disabled={deleteTestimonial.isPending}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            {deleteTestimonial.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
