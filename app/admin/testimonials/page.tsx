'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Search, Pencil, Trash2, Eye, Star, CheckCircle } from 'lucide-react'
import { adminSupabase as supabase } from '@/utils/adminSupabase'

interface Testimonial {
    id: string
    client_name: string
    client_company: string
    rating: number
    status: string
    is_featured: boolean
}

export default function TestimonialsPage() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')

    useEffect(() => {
        loadTestimonials()
    }, [])

    const loadTestimonials = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('testimonials')
                .select('id, client_name, client_company, rating, status, is_featured')
                .order('order_index', { ascending: true })

            if (error) throw error
            setTestimonials(data || [])
        } catch (error) {
            console.error('Error loading testimonials:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this review?')) return

        try {
            const { error } = await supabase
                .from('testimonials')
                .delete()
                .eq('id', id)

            if (error) throw error
            setTestimonials(testimonials.filter(t => t.id !== id))
        } catch (error) {
            console.error('Error deleting testimonial:', error)
            alert('Failed to delete testimonial')
        }
    }

    const filteredTestimonials = testimonials.filter(t =>
        t.client_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.client_company.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Testimonials</h1>
                    <p className="text-zinc-400 mt-1">Manage client reviews and social proof</p>
                </div>
                <Link
                    href="/admin/testimonials/new"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-medium"
                >
                    <Plus className="w-4 h-4" />
                    Add Review
                </Link>
            </div>

            {/* Search Bar */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-4">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                    <input
                        type="text"
                        placeholder="Search reviews..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                </div>
            </div>

            {/* Reviews List */}
            <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-zinc-800/50 text-zinc-400 uppercase font-medium">
                            <tr>
                                <th className="px-6 py-4">Client</th>
                                <th className="px-6 py-4">Rating</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Featured</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                                        Loading reviews...
                                    </td>
                                </tr>
                            ) : filteredTestimonials.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                                        No reviews found.
                                    </td>
                                </tr>
                            ) : (
                                filteredTestimonials.map((t) => (
                                    <tr key={t.id} className="hover:bg-zinc-800/30 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white">{t.client_name}</div>
                                            <div className="text-xs text-zinc-500">{t.client_company}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                <span className="text-white font-medium">{t.rating}</span>
                                                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ring-1 ring-inset capitalize 
                                                ${t.status === 'active' ? 'bg-emerald-500/10 text-emerald-500 ring-emerald-500/20' : 'bg-zinc-500/10 text-zinc-400 ring-zinc-500/20'}`}>
                                                {t.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {t.is_featured && (
                                                <span className="text-amber-500" title="Featured">
                                                    <Star className="w-4 h-4 fill-amber-500" />
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/testimonials/${t.id}`}
                                                    className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(t.id)}
                                                    className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

