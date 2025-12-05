'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, GripVertical, Edit, Trash2, Eye, EyeOff, Image as ImageIcon, Video } from 'lucide-react'
import { heroAPI } from '@/lib/api/hero'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

export default function HeroManagerPage() {
    const [slides, setSlides] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [editingSlide, setEditingSlide] = useState<any>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    useEffect(() => {
        loadSlides()
    }, [])

    const loadSlides = async () => {
        try {
            const data = await heroAPI.getAllSlides()
            setSlides(data || [])
        } catch (error) {
            toast.error('Failed to load slides')
        } finally {
            setLoading(false)
        }
    }

    const handleDragEnd = async (result: any) => {
        if (!result.destination) return

        const items = Array.from(slides)
        const [reorderedItem] = items.splice(result.source.index, 1)
        items.splice(result.destination.index, 0, reorderedItem)

        setSlides(items)

        try {
            const updates = items.map((slide, index) => ({
                id: slide.id,
                order_index: index
            }))
            await heroAPI.reorderSlides(updates)
            toast.success('Slides reordered')
        } catch (error) {
            toast.error('Failed to reorder')
            loadSlides()
        }
    }

    const handleToggleActive = async (slide: any) => {
        try {
            await heroAPI.updateSlide(slide.id, { is_active: !slide.is_active })
            loadSlides()
            toast.success(slide.is_active ? 'Slide hidden' : 'Slide activated')
        } catch (error) {
            toast.error('Failed to update')
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this slide?')) return

        try {
            await heroAPI.deleteSlide(id)
            setSlides(slides.filter(s => s.id !== id))
            toast.success('Slide deleted')
        } catch (error) {
            toast.error('Failed to delete')
        }
    }

    const openEditDialog = (slide?: any) => {
        setEditingSlide(slide || {
            title: '',
            subtitle: '',
            description: '',
            image_url: '',
            video_url: '',
            cta_primary_text: '',
            cta_primary_link: '',
            cta_secondary_text: '',
            cta_secondary_link: '',
            background_color: '#000000',
            text_color: '#ffffff',
            animation_style: 'fade',
            is_active: true,
            order_index: slides.length
        })
        setIsDialogOpen(true)
    }

    const handleSaveSlide = async () => {
        try {
            if (editingSlide.id) {
                await heroAPI.updateSlide(editingSlide.id, editingSlide)
                toast.success('Slide updated')
            } else {
                await heroAPI.createSlide(editingSlide)
                toast.success('Slide created')
            }
            loadSlides()
            setIsDialogOpen(false)
        } catch (error) {
            toast.error('Failed to save slide')
        }
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Hero Manager</h1>
                    <p className="text-muted-foreground">Manage homepage hero slides</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-accent hover:bg-accent/90" onClick={() => openEditDialog()}>
                            <Plus className="w-4 h-4 mr-2" /> New Slide
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingSlide?.id ? 'Edit Slide' : 'New Slide'}</DialogTitle>
                        </DialogHeader>
                        {editingSlide && (
                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="text-sm font-medium">Title</label>
                                        <Input
                                            value={editingSlide.title}
                                            onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                                            placeholder="Headline text"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-sm font-medium">Subtitle</label>
                                        <Input
                                            value={editingSlide.subtitle || ''}
                                            onChange={(e) => setEditingSlide({ ...editingSlide, subtitle: e.target.value })}
                                            placeholder="Subtitle text"
                                        />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="text-sm font-medium">Description</label>
                                        <Textarea
                                            value={editingSlide.description || ''}
                                            onChange={(e) => setEditingSlide({ ...editingSlide, description: e.target.value })}
                                            placeholder="Description"
                                            rows={3}
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <ImageIcon className="w-4 h-4" /> Image URL
                                        </label>
                                        <Input
                                            value={editingSlide.image_url || ''}
                                            onChange={(e) => setEditingSlide({ ...editingSlide, image_url: e.target.value })}
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium flex items-center gap-2">
                                            <Video className="w-4 h-4" /> Video URL
                                        </label>
                                        <Input
                                            value={editingSlide.video_url || ''}
                                            onChange={(e) => setEditingSlide({ ...editingSlide, video_url: e.target.value })}
                                            placeholder="https://..."
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Primary CTA Text</label>
                                        <Input
                                            value={editingSlide.cta_primary_text || ''}
                                            onChange={(e) => setEditingSlide({ ...editingSlide, cta_primary_text: e.target.value })}
                                            placeholder="Get Started"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Primary CTA Link</label>
                                        <Input
                                            value={editingSlide.cta_primary_link || ''}
                                            onChange={(e) => setEditingSlide({ ...editingSlide, cta_primary_link: e.target.value })}
                                            placeholder="/contact"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Secondary CTA Text</label>
                                        <Input
                                            value={editingSlide.cta_secondary_text || ''}
                                            onChange={(e) => setEditingSlide({ ...editingSlide, cta_secondary_text: e.target.value })}
                                            placeholder="Learn More"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium">Secondary CTA Link</label>
                                        <Input
                                            value={editingSlide.cta_secondary_link || ''}
                                            onChange={(e) => setEditingSlide({ ...editingSlide, cta_secondary_link: e.target.value })}
                                            placeholder="/about"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-2 pt-4">
                                    <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button className="bg-accent hover:bg-accent/90" onClick={handleSaveSlide}>
                                        Save Slide
                                    </Button>
                                </div>
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <div className="text-center py-20">Loading slides...</div>
            ) : (
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="slides">
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-4">
                                {slides.map((slide, index) => (
                                    <Draggable key={slide.id} draggableId={slide.id} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div {...provided.dragHandleProps} className="pt-2 cursor-move">
                                                        <GripVertical className="w-5 h-5 text-muted-foreground" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <div className="flex items-start justify-between mb-3">
                                                            <div>
                                                                <h3 className="font-bold text-lg">{slide.title}</h3>
                                                                {slide.subtitle && (
                                                                    <p className="text-sm text-muted-foreground">{slide.subtitle}</p>
                                                                )}
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => handleToggleActive(slide)}
                                                                >
                                                                    {slide.is_active ? (
                                                                        <Eye className="w-4 h-4 text-green-500" />
                                                                    ) : (
                                                                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                                                                    )}
                                                                </Button>
                                                                <Button variant="ghost" size="icon" onClick={() => openEditDialog(slide)}>
                                                                    <Edit className="w-4 h-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="text-red-500"
                                                                    onClick={() => handleDelete(slide.id)}
                                                                >
                                                                    <Trash2 className="w-4 h-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                                            {slide.image_url && (
                                                                <div className="flex items-center gap-2">
                                                                    <ImageIcon className="w-4 h-4 text-accent" />
                                                                    <span className="text-muted-foreground">Image set</span>
                                                                </div>
                                                            )}
                                                            {slide.video_url && (
                                                                <div className="flex items-center gap-2">
                                                                    <Video className="w-4 h-4 text-accent" />
                                                                    <span className="text-muted-foreground">Video set</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            )}
        </div>
    )
}
