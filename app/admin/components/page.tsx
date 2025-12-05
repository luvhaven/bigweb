'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Layers, Plus, Eye, Edit, Trash2, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AdminHeader from '@/components/admin/AdminHeader'
import { componentsAPI } from '@/lib/api/components'
import type { Component } from '@/lib/api/components'
import { toast } from 'sonner'

export default function ComponentsPage() {
    const [activeTab, setActiveTab] = useState('all')
    const [components, setComponents] = useState<Component[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadComponents()
    }, [])

    const loadComponents = async () => {
        try {
            const data = await componentsAPI.getAll()
            setComponents(data || [])
        } catch (error) {
            console.error('Error loading components:', error)
            toast.error('Failed to load components')
        } finally {
            setLoading(false)
        }
    }

    const toggleComponentStatus = async (id: string) => {
        try {
            await componentsAPI.toggleStatus(id)
            setComponents(prev =>
                prev.map(comp =>
                    comp.id === id
                        ? { ...comp, status: comp.status === 'active' ? 'inactive' : 'active' }
                        : comp
                )
            )
            toast.success('Component status updated')
        } catch (error) {
            toast.error('Failed to update status')
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this component?')) return

        try {
            await componentsAPI.delete(id)
            setComponents(prev => prev.filter(c => c.id !== id))
            toast.success('Component deleted')
        } catch (error) {
            toast.error('Failed to delete component')
        }
    }

    // Calculate component type counts
    const componentTypes = components.reduce((acc, comp) => {
        const type = comp.type
        if (!acc[type]) {
            acc[type] = { total: 0, active: 0 }
        }
        acc[type].total++
        if (comp.status === 'active') acc[type].active++
        return acc
    }, {} as Record<string, { total: number; active: number }>)

    const typeCards = [
        { id: 'hero', name: 'Hero Sections' },
        { id: 'cta', name: 'Call-to-Actions' },
        { id: 'testimonial', name: 'Testimonials' },
        { id: 'service', name: 'Services Grid' },
        { id: 'portfolio', name: 'Portfolio Galleries' },
        { id: 'stats', name: 'Statistics' },
        { id: 'team', name: 'Team Members' },
        { id: 'form', name: 'Contact Forms' },
    ].map(type => ({
        ...type,
        count: componentTypes[type.id]?.total || 0,
        active: componentTypes[type.id]?.active || 0
    }))

    if (loading) {
        return (
            <div className="space-y-8">
                <AdminHeader
                    title="Component Library"
                    description="Manage all frontend components across your website"
                />
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <AdminHeader
                title="Component Library"
                description="Manage all frontend components across your website"
            >
                <Button className="bg-accent hover:bg-accent/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Component
                </Button>
            </AdminHeader>

            {/* Component Type Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {typeCards.map((type, index) => (
                    <motion.div
                        key={type.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                    >
                        <Card className="cursor-pointer hover:border-accent transition-colors">
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between mb-2">
                                    <Layers className="w-5 h-5 text-accent" />
                                    <Badge variant="secondary">{type.count}</Badge>
                                </div>
                                <h3 className="font-semibold mb-1">{type.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                    {type.active} active
                                </p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Components List */}
            <Card>
                <CardHeader>
                    <CardTitle>All Components</CardTitle>
                    <CardDescription>
                        Drag to reorder, toggle to enable/disable, or click to edit
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs value={activeTab} onValueChange={setActiveTab}>
                        <TabsList>
                            <TabsTrigger value="all">All Components</TabsTrigger>
                            <TabsTrigger value="active">Active Only</TabsTrigger>
                            <TabsTrigger value="inactive">Inactive</TabsTrigger>
                        </TabsList>

                        <TabsContent value={activeTab} className="space-y-2 mt-6">
                            {components
                                .filter(comp => activeTab === 'all' || comp.status === activeTab)
                                .map((component, index) => (
                                    <motion.div
                                        key={component.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors"
                                    >
                                        <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />

                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <h4 className="font-semibold">{component.name}</h4>
                                                <Badge variant="outline" className="text-xs">
                                                    {component.type}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                Used on: {component.page_ids?.length || 0} pages
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Switch
                                                checked={component.status === 'active'}
                                                onCheckedChange={() => toggleComponentStatus(component.id)}
                                            />
                                            <Button variant="ghost" size="icon">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon">
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-red-500 hover:text-red-600"
                                                onClick={() => handleDelete(component.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                ))}
                            {components.filter(comp => activeTab === 'all' || comp.status === activeTab).length === 0 && (
                                <div className="text-center py-12 text-muted-foreground">
                                    No components found. Click "Add Component" to get started.
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
