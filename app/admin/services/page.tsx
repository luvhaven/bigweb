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
    ExternalLink,
    Loader2,
    AlertCircle,
    Briefcase // Changed from Service to Briefcase
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
import { useServices, useDeleteService, useUpdateService } from '@/hooks/useAdminData'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

// Icon mapping for services
const serviceIcons: Record<string, string> = {
    'web-development': '🌐',
    'mobile-apps': '📱',
    'ui-ux-design': '🎨',
    'ai-consulting': '🤖',
    'seo-marketing': '📈',
    'e-commerce': '🛒',
    'maintenance': '🔧',
    'gaio': '✨'
}

export default function ServicesPage() {
    const { data: services, isLoading, error } = useServices()
    const deleteService = useDeleteService()
    const updateService = useUpdateService()

    const [searchQuery, setSearchQuery] = useState('')
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [selectedService, setSelectedService] = useState<any>(null)

    const filteredServices = services?.filter(s =>
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleDelete = async () => {
        if (!selectedService) return

        try {
            await deleteService.mutateAsync(selectedService.id)
            toast.success('Service deleted successfully')
            setDeleteDialogOpen(false)
            setSelectedService(null)
        } catch (error) {
            toast.error('Failed to delete service')
        }
    }

    const handleToggleActive = async (service: any) => {
        try {
            await updateService.mutateAsync({
                id: service.id,
                is_active: !service.is_active
            })
            toast.success(service.is_active ? 'Service deactivated' : 'Service activated')
        } catch (error) {
            toast.error('Failed to update service')
        }
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <p className="text-zinc-400">Failed to load services. Please try again.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Services</h1>
                    <p className="text-zinc-400 mt-1">
                        Manage your service offerings
                    </p>
                </div>
                <Link href="/admin/services/new">
                    <Button className="bg-emerald-500 hover:bg-emerald-600">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Service
                    </Button>
                </Link>
            </div>

            {/* Search */}
            <GlassCard className="p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <Input
                        placeholder="Search services..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-zinc-800/50 border-zinc-700 text-white"
                    />
                </div>
            </GlassCard>

            {/* Services List */}
            {isLoading ? (
                <div className="space-y-3">
                    {[1, 2, 3, 4].map((i) => (
                        <GlassCard key={i} className="p-4">
                            <div className="flex items-center gap-4">
                                <Skeleton className="h-12 w-12 rounded-lg" />
                                <div className="flex-1">
                                    <Skeleton className="h-5 w-48 mb-2" />
                                    <Skeleton className="h-4 w-full max-w-md" />
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            ) : filteredServices?.length === 0 ? (
                <EmptyState
                    icon={<Briefcase className="w-8 h-8" />}
                    title="No services yet"
                    description="Add your first service to display on your website."
                    action={
                        <Link href="/admin/services/new">
                            <Button className="bg-emerald-500 hover:bg-emerald-600">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Service
                            </Button>
                        </Link>
                    }
                />
            ) : (
                <div className="space-y-3">
                    <AnimatePresence>
                        {filteredServices?.map((service, index) => (
                            <motion.div
                                key={service.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <GlassCard className={cn(
                                    'p-4 group',
                                    !service.is_active && 'opacity-60'
                                )}>
                                    <div className="flex items-center gap-4">
                                        {/* Drag handle */}
                                        <div className="cursor-grab text-zinc-600 hover:text-zinc-400">
                                            <GripVertical className="w-5 h-5" />
                                        </div>

                                        {/* Icon */}
                                        <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-2xl">
                                            {serviceIcons[service.slug] || '⚡'}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-medium text-white truncate">{service.title}</h3>
                                                {!service.is_active && (
                                                    <span className="px-2 py-0.5 rounded text-xs bg-zinc-700 text-zinc-400">
                                                        Inactive
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-sm text-zinc-400 truncate">{service.description}</p>
                                        </div>

                                        {/* Features count */}
                                        <div className="hidden md:block text-sm text-zinc-500">
                                            {Array.isArray(service.features) ? service.features.length : 0} features
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2">
                                            <Link href={`/services/${service.slug}`} target="_blank">
                                                <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                                                    <ExternalLink className="w-4 h-4" />
                                                </Button>
                                            </Link>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800">
                                                    <DropdownMenuItem
                                                        onClick={() => handleToggleActive(service)}
                                                        className="text-zinc-300 focus:bg-zinc-800"
                                                    >
                                                        {service.is_active ? (
                                                            <>
                                                                <EyeOff className="w-4 h-4 mr-2" />
                                                                Deactivate
                                                            </>
                                                        ) : (
                                                            <>
                                                                <Eye className="w-4 h-4 mr-2" />
                                                                Activate
                                                            </>
                                                        )}
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-zinc-800" />
                                                    <Link href={`/admin/services/${service.id}`}>
                                                        <DropdownMenuItem className="text-zinc-300 focus:bg-zinc-800">
                                                            <Edit2 className="w-4 h-4 mr-2" />
                                                            Edit
                                                        </DropdownMenuItem>
                                                    </Link>
                                                    <DropdownMenuItem
                                                        onClick={() => {
                                                            setSelectedService(service)
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
                        <DialogTitle className="text-white">Delete Service</DialogTitle>
                        <DialogDescription className="text-zinc-400">
                            Are you sure you want to delete "{selectedService?.title}"? This action cannot be undone.
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
                            disabled={deleteService.isPending}
                            className="bg-red-500 hover:bg-red-600"
                        >
                            {deleteService.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
