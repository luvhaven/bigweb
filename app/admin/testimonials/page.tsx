'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Star, Eye } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import AdminHeader from '@/components/admin/AdminHeader'
import { testimonialsAPI, type Testimonial } from '@/lib/api/testimonials'
import { toast } from 'sonner'

export default function TestimonialsPage() {
    const router = useRouter()
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadTestimonials()
    }, [])

    const loadTestimonials = async () => {
        try {
            console.log('🔄 Loading testimonials...')
            console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing')
            console.log('Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing')

            const data = await testimonialsAPI.getAll()
            console.log('✅ Testimonials loaded:', data)
            setTestimonials(data || [])
        } catch (error: any) {
            console.error('❌ Error loading testimonials:', error)
            console.error('Error details:', {
                message: error?.message,
                code: error?.code,
                details: error?.details,
                hint: error?.hint,
                status: error?.status
            })

            // Check if Supabase is configured
            if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
                toast.error('⚠️ Supabase URL not configured. Check .env.local')
                console.error('Missing NEXT_PUBLIC_SUPABASE_URL')
            } else if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
                toast.error('⚠️ Supabase key not configured. Check .env.local')
                console.error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY')
            } else if (error?.message) {
                toast.error(`Error: ${error.message}`)
            } else {
                toast.error('⚠️ Failed to load testimonials. Check console for details.')
            }

            setTestimonials([])
        } finally {
            setLoading(false)
        }
    }

    const toggleFeatured = async (id: string) => {
        try {
            await testimonialsAPI.toggleFeatured(id)
            await loadTestimonials()
            toast.success('Testimonial updated')
        } catch (error) {
            toast.error('Failed to update')
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this testimonial?')) return
        try {
            await testimonialsAPI.delete(id)
            setTestimonials(prev => prev.filter(t => t.id !== id))
            toast.success('Deleted')
        } catch (error) {
            toast.error('Failed to delete')
        }
    }

    if (loading) {
        return (
            <div className="space-y-8">
                <AdminHeader title="Testimonials" description="Manage client testimonials" />
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-8">
            <AdminHeader title="Testimonials" description="Manage client testimonials">
                <Button className="bg-accent hover:bg-accent/90" onClick={() => router.push('/admin/testimonials/new')}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Testimonial
                </Button>
            </AdminHeader>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total</p>
                                <p className="text-2xl font-bold">{testimonials.length}</p>
                            </div>
                            <Star className="w-8 h-8 text-accent opacity-50" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Active</p>
                                <p className="text-2xl font-bold">
                                    {testimonials.filter(t => t.status === 'active').length}
                                </p>
                            </div>
                            <Eye className="w-8 h-8 text-green-500 opacity-50" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Featured</p>
                                <p className="text-2xl font-bold">
                                    {testimonials.filter(t => t.is_featured).length}
                                </p>
                            </div>
                            <Star className="w-8 h-8 text-yellow-500 opacity-50 fill-yellow-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Avg Rating</p>
                                <p className="text-2xl font-bold">
                                    {testimonials.length > 0
                                        ? (testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length).toFixed(1)
                                        : '0'}
                                </p>
                            </div>
                            <Star className="w-8 h-8 text-accent opacity-50 fill-accent" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Testimonials</CardTitle>
                    <CardDescription>Manage and organize client testimonials</CardDescription>
                </CardHeader>
                <CardContent>
                    {testimonials.length === 0 ? (
                        <div className="text-center py-12">
                            <Star className="w-16 h-16 mx-auto mb-4 opacity-20" />
                            <p className="text-muted-foreground">No testimonials found. Check console for errors.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {testimonials.map((testimonial, index) => (
                                <motion.div
                                    key={testimonial.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="p-6 rounded-lg border hover:bg-secondary/50 transition-colors"
                                >
                                    <div className="flex items-start gap-4">
                                        {testimonial.client_image && (
                                            <img
                                                src={testimonial.client_image}
                                                alt={testimonial.client_name}
                                                className="w-16 h-16 rounded-full"
                                            />
                                        )}
                                        <div className="flex-1">
                                            <div className="flex items-start justify-between mb-2">
                                                <div>
                                                    <h3 className="font-semibold">{testimonial.client_name}</h3>
                                                    {testimonial.client_role && (
                                                        <p className="text-sm text-muted-foreground">
                                                            {testimonial.client_role} at {testimonial.client_company}
                                                        </p>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    <Badge>{testimonial.status}</Badge>
                                                    {testimonial.is_featured && <Badge variant="outline">Featured</Badge>}
                                                </div>
                                            </div>
                                            <div className="flex gap-1 mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star
                                                        key={i}
                                                        className={`w-4 h-4 ${i < testimonial.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-sm mb-2">"{testimonial.content}"</p>
                                            {testimonial.result_metric && <Badge variant="outline">{testimonial.result_metric}</Badge>}
                                            <div className="flex gap-2 mt-3">
                                                <Button variant="outline" size="sm" onClick={() => router.push(`/admin/testimonials/${testimonial.id}`)}>
                                                    <Edit className="w-4 h-4 mr-2" />
                                                    Edit
                                                </Button>
                                                <Button variant="outline" size="sm" onClick={() => toggleFeatured(testimonial.id)}>
                                                    <Star className="w-4 h-4 mr-2" />
                                                    {testimonial.is_featured ? 'Unfeature' : 'Feature'}
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="text-red-500"
                                                    onClick={() => handleDelete(testimonial.id)}
                                                >
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Delete
                                                </Button>
                                            </div>
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
