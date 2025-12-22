'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Pencil, Trash2, Star, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

interface Testimonial {
    id: string
    client_name: string
    client_company: string
    rating: number
    status: string
    is_featured: boolean
}

export default function TestimonialsPage() {
    const supabase = createClient()
    const queryClient = useQueryClient()
    const [searchTerm, setSearchTerm] = useState('')
    const [deleteId, setDeleteId] = useState<string | null>(null)

    // React Query for testimonials
    const { data: testimonials = [], isLoading } = useQuery({
        queryKey: ['admin', 'testimonials'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('testimonials')
                .select('id, client_name, client_company, rating, status, is_featured')
                .order('order_index', { ascending: true })

            if (error) throw error
            return data as Testimonial[]
        }
    })

    // Delete Mutation
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('testimonials')
                .delete()
                .eq('id', id)
            if (error) throw error
        },
        onSuccess: () => {
            toast.success('Testimonial deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['admin', 'testimonials'] })
            setDeleteId(null)
        },
        onError: (error: any) => {
            console.error('Error deleting testimonial:', error)
            toast.error('Failed to delete testimonial: ' + error.message)
        }
    })

    const handleDelete = () => {
        if (!deleteId) return
        deleteMutation.mutate(deleteId)
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
                            {isLoading ? (
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
                                                    onClick={() => setDeleteId(t.id)}
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

            {/* Delete Confirmation Modal - Reusing style from services */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-card border border-border rounded-xl max-w-sm w-full p-6 shadow-xl">
                        <div className="flex items-center gap-3 text-red-500 mb-4">
                            <AlertCircle className="w-6 h-6" />
                            <h3 className="text-lg font-bold">Delete Testimonial?</h3>
                        </div>
                        <p className="text-muted-foreground mb-6">
                            Are you sure you want to delete this testimonial?
                        </p>
                        <div className="flex items-center justify-end gap-3">
                            <button
                                onClick={() => setDeleteId(null)}
                                className="px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleteMutation.isPending}
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50"
                            >
                                {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

