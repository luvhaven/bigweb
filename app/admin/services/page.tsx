'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Star, Eye, Package, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import AdminHeader from '@/components/admin/AdminHeader'
import { servicesAPI, type Service } from '@/lib/api/services'
import { toast } from 'sonner'

export default function ServicesPage() {
    const router = useRouter()
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadServices()
    }, [])

    const loadServices = async () => {
        try {
            const data = await servicesAPI.getAll()
            setServices(data || [])
        } catch (error: any) {
            console.error('❌ Error loading services:', error)
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
                toast.error('Failed to load services. Check console for details.')
            }
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this service?')) return
        try {
            await servicesAPI.delete(id)
            setServices(prev => prev.filter(s => s.id !== id))
            toast.success('Service deleted')
        } catch (error) {
            toast.error('Failed to delete service')
        }
    }

    if (loading) {
        return (
            <div className="space-y-8">
                <AdminHeader title="Services" description="Manage your service offerings" />
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <AdminHeader title="Services" description="Manage your service offerings">
                <Button className="bg-accent hover:bg-accent/90" onClick={() => router.push('/admin/services/new')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service
                </Button>
            </AdminHeader>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Services</p>
                                <p className="text-2xl font-bold">{services.length}</p>
                            </div>
                            <Package className="w-8 h-8 text-accent opacity-50" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Published</p>
                                <p className="text-2xl font-bold">
                                    {services.filter(s => s.status === 'published').length}
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
                                    {services.filter(s => s.is_featured).length}
                                </p>
                            </div>
                            <Star className="w-8 h-8 text-yellow-500 opacity-50 fill-yellow-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Services</CardTitle>
                    <CardDescription>Manage your service catalog</CardDescription>
                </CardHeader>
                <CardContent>
                    {services.length === 0 ? (
                        <div className="text-center py-12">
                            <Package className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <p className="text-muted-foreground">No services found. Add your first service.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {services.map((service, index) => (
                                <motion.div
                                    key={service.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="p-6 rounded-lg border hover:bg-secondary/50 transition-colors"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="font-semibold text-lg">{service.title}</h3>
                                                <Badge variant={service.status === 'published' ? 'default' : 'secondary'}>
                                                    {service.status}
                                                </Badge>
                                                {service.is_featured && (
                                                    <Badge variant="outline" className="text-yellow-500 border-yellow-500">
                                                        Featured
                                                    </Badge>
                                                )}
                                            </div>

                                            <p className="text-sm text-muted-foreground mb-4 max-w-2xl">
                                                {service.short_description || service.description?.substring(0, 150) + '...'}
                                            </p>

                                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                {service.pricing?.starting_price && (
                                                    <div className="flex items-center gap-1">
                                                        <span className="font-medium text-foreground">
                                                            {service.pricing.starting_price}
                                                        </span>
                                                    </div>
                                                )}
                                                <div>/{service.slug}</div>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="sm" onClick={() => router.push(`/admin/services/${service.id}`)}>
                                                <Edit className="w-4 h-4 mr-2" />
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                className="text-red-500 hover:text-red-600"
                                                onClick={() => handleDelete(service.id)}
                                            >
                                                <Trash2 className="w-4 h-4 mr-2" />
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
