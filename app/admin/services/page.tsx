'use client'

import { useState, useEffect } from 'react'
import { adminSupabase as supabase } from '@/utils/adminSupabase'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Plus, Edit, Trash2, Eye, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'

interface ServicePage {
    id: string
    slug: string
    title: string
    highlight: string
    description: string
    theme_color: string
    icon: string
    featured: boolean
    published: boolean
    sort_order: number
}

export default function ServicesIndexPage() {
    const [services, setServices] = useState<ServicePage[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadServices()
    }, [])

    const loadServices = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('service_pages')
                .select('*')
                .order('sort_order', { ascending: true })

            if (error) throw error
            setServices(data || [])
        } catch (error) {
            console.error('Error loading services:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service page?')) return

        try {
            const { error } = await supabase
                .from('service_pages')
                .delete()
                .eq('id', id)

            if (error) throw error
            loadServices()
        } catch (error) {
            console.error('Error deleting service:', error)
        }
    }

    return (
        <div className="flex min-h-screen bg-background">
            <AdminSidebar />

            <div className="flex-1 ml-64 p-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-4xl font-bold">Services</h1>
                        <p className="text-muted-foreground mt-2">
                            Manage your service offerings, descriptions, and feature lists.
                        </p>
                    </div>

                    <Link href="/admin/services/new">
                        <Button size="lg" className="gap-2">
                            <Plus className="w-4 h-4" />
                            Add New Service
                        </Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {services.map((service) => (
                            <Card key={service.id} className="hover:shadow-md transition-all">
                                <CardContent className="p-6 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center bg-${service.theme_color}-500/10 text-${service.theme_color}-500`}>
                                            {/* We'll render dynamic icons later, placeholder for now */}
                                            <span className="text-xl font-bold">{service.title.charAt(0)}</span>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-xl font-bold">{service.title}</h3>
                                                {service.featured && <Badge variant="secondary">Featured</Badge>}
                                                {!service.published && <Badge variant="destructive">Draft</Badge>}
                                            </div>
                                            <p className="text-muted-foreground line-clamp-1 max-w-xl">
                                                {service.description}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Link href={`/${service.slug}`} target="_blank">
                                            <Button variant="ghost" size="icon">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </Link>
                                        <Link href={`/admin/services/${service.id}`}>
                                            <Button variant="outline" size="sm" className="gap-2">
                                                <Edit className="w-4 h-4" />
                                                Edit Content
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleDelete(service.id)}
                                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {services.length === 0 && (
                            <div className="text-center py-12 border-2 border-dashed rounded-lg">
                                <h3 className="text-lg font-medium text-muted-foreground">No services found</h3>
                                <p className="text-sm text-muted-foreground mt-1">Create your first service page to get started.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
