'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Star, Eye, FolderKanban, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import AdminHeader from '@/components/admin/AdminHeader'
import { portfolioAPI, type PortfolioItem } from '@/lib/api/portfolio'
import { toast } from 'sonner'

export default function PortfolioPage() {
    const router = useRouter()
    const [items, setItems] = useState<PortfolioItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadItems()
    }, [])

    const loadItems = async () => {
        try {
            console.log('🔄 Loading portfolio items...')
            const data = await portfolioAPI.getAll()
            console.log('✅ Portfolio items loaded:', data)
            setItems(data || [])
        } catch (error: any) {
            console.error('❌ Error loading portfolio:', error)
            console.error('Error details:', {
                message: error?.message,
                code: error?.code,
                details: error?.details,
                hint: error?.hint,
                status: error?.status
            })

            if (error?.message) {
                toast.error(`Error: ${error.message}`)
            } else {
                toast.error('Failed to load portfolio items. Check console for details.')
            }
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this project?')) return
        try {
            await portfolioAPI.delete(id)
            setItems(prev => prev.filter(i => i.id !== id))
            toast.success('Project deleted')
        } catch (error) {
            toast.error('Failed to delete project')
        }
    }

    if (loading) {
        return (
            <div className="space-y-8">
                <AdminHeader title="Portfolio" description="Manage your projects and case studies" />
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <AdminHeader title="Portfolio" description="Manage your projects and case studies">
                <Button className="bg-accent hover:bg-accent/90" onClick={() => router.push('/admin/portfolio/new')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                </Button>
            </AdminHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Projects</p>
                                <p className="text-2xl font-bold">{items.length}</p>
                            </div>
                            <FolderKanban className="w-8 h-8 text-accent opacity-50" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Published</p>
                                <p className="text-2xl font-bold">
                                    {items.filter(i => i.status === 'published').length}
                                </p>
                            </div>
                            <CheckCircle className="w-8 h-8 text-green-500 opacity-50" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Featured</p>
                                <p className="text-2xl font-bold">
                                    {items.filter(i => i.is_featured).length}
                                </p>
                            </div>
                            <Star className="w-8 h-8 text-yellow-500 opacity-50 fill-yellow-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Projects</CardTitle>
                    <CardDescription>Manage your portfolio case studies</CardDescription>
                </CardHeader>
                <CardContent>
                    {items.length === 0 ? (
                        <div className="text-center py-12">
                            <FolderKanban className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <p className="text-muted-foreground">No projects found. Add your first case study.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {items.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                                        {item.featured_image && (
                                            <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                                                <img
                                                    src={item.featured_image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover transition-transform hover:scale-105"
                                                />
                                            </div>
                                        )}
                                        <CardContent className="flex-1 p-6">
                                            <div className="flex items-start justify-between mb-2">
                                                <Badge variant={item.status === 'published' ? 'default' : 'secondary'}>
                                                    {item.status}
                                                </Badge>
                                                {item.is_featured && (
                                                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                                )}
                                            </div>

                                            <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                                            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                                {item.excerpt || item.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {item.technologies?.slice(0, 3).map(tech => (
                                                    <Badge key={tech} variant="outline" className="text-xs">
                                                        {tech}
                                                    </Badge>
                                                ))}
                                                {(item.technologies?.length || 0) > 3 && (
                                                    <Badge variant="outline" className="text-xs">
                                                        +{(item.technologies?.length || 0) - 3}
                                                    </Badge>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2 mt-auto pt-4 border-t">
                                                <Button variant="outline" size="sm" className="flex-1" onClick={() => router.push(`/admin/portfolio/${item.id}`)}>
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-red-500 hover:text-red-600 px-3"
                                                    onClick={() => handleDelete(item.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
