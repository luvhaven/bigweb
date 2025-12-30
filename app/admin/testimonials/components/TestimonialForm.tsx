'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Save, ArrowLeft, Star } from 'lucide-react'
import { adminSupabase as supabase } from '@/utils/adminSupabase'
import Link from 'next/link'

interface TestimonialFormProps {
    initialData?: any
    isEditing?: boolean
}

export default function TestimonialForm({ initialData, isEditing = false }: TestimonialFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    // Fetch projects for linking
    const [projects, setProjects] = useState<any[]>([])

    useEffect(() => {
        const fetchProjects = async () => {
            const { data } = await supabase.from('portfolio_projects').select('id, title')
            if (data) setProjects(data)
        }
        fetchProjects()
    }, [])

    const [formData, setFormData] = useState({
        client_name: initialData?.client_name || '',
        client_role: initialData?.client_role || '',
        client_company: initialData?.client_company || '',
        content: initialData?.content || '',
        rating: initialData?.rating || 5,
        project_id: initialData?.project_id || '',
        is_featured: initialData?.is_featured || false,
        is_verified: initialData?.is_verified ?? true,
        status: initialData?.status || 'active',
        order_index: initialData?.order_index || 0,
        video_url: initialData?.video_url || '',
        thumbnail_url: initialData?.thumbnail_url || ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const testimonialData = {
                client_name: formData.client_name,
                client_role: formData.client_role,
                client_company: formData.client_company,
                content: formData.content,
                rating: formData.rating,
                project_id: formData.project_id || null, // Handle empty string
                is_featured: formData.is_featured,
                is_verified: formData.is_verified,
                status: formData.status as 'active' | 'pending' | 'archived',
                order_index: formData.order_index,
                video_url: (formData as any).video_url,
                thumbnail_url: (formData as any).thumbnail_url
            }

            if (isEditing) {
                const { error } = await supabase
                    .from('testimonials')
                    .update(testimonialData)
                    .eq('id', initialData.id)
                if (error) throw error
            } else {
                const { error } = await supabase
                    .from('testimonials')
                    .insert([testimonialData])
                if (error) throw error
            }

            router.push('/admin/testimonials')
            router.refresh()
        } catch (error: any) {
            console.error('Error saving testimonial:', error)
            alert('Failed to save testimonial')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
                <Link
                    href="/admin/testimonials"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Link>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => router.push('/admin/testimonials')}
                        className="px-4 py-2 text-zinc-300 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors font-medium disabled:opacity-50"
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {isEditing ? 'Update Review' : 'Create Review'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-white">Client Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Client Name</label>
                                <input
                                    type="text"
                                    value={formData.client_name}
                                    onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                                    className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Company</label>
                                <input
                                    type="text"
                                    value={formData.client_company}
                                    onChange={(e) => setFormData(prev => ({ ...prev, client_company: e.target.value }))}
                                    className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Role / Title</label>
                            <input
                                type="text"
                                value={formData.client_role}
                                onChange={(e) => setFormData(prev => ({ ...prev, client_role: e.target.value }))}
                                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                placeholder="e.g. CEO, Marketing Director"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Review Content</label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                className="w-full h-32 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                                placeholder="What did they say?"
                                required
                            />
                        </div>

                        {/* Video Testimonials Section */}
                        <div className="pt-6 border-t border-zinc-700 space-y-4">
                            <h4 className="text-md font-semibold text-white">Video Details (Optional)</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">Video URL (Vimeo/YouTube/MP4)</label>
                                    <input
                                        type="text"
                                        value={(formData as any).video_url || ''}
                                        onChange={(e) => setFormData(prev => ({ ...prev, video_url: e.target.value }))}
                                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                        placeholder="https://player.vimeo.com/..."
                                    />
                                    <p className="text-xs text-zinc-500">Paste the embed URL or direct file link.</p>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-300">Thumbnail URL</label>
                                    <input
                                        type="text"
                                        value={(formData as any).thumbnail_url || ''}
                                        onChange={(e) => setFormData(prev => ({ ...prev, thumbnail_url: e.target.value }))}
                                        className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                        placeholder="https://..."
                                    />
                                    <p className="text-xs text-zinc-500">Preview image for the video.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Status */}
                    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-white">Settings</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
                                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                            >
                                <option value="active">Active</option>
                                <option value="pending">Pending</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Rating (1-5)</label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="range"
                                    min="1"
                                    max="5"
                                    step="1"
                                    value={formData.rating}
                                    onChange={(e) => setFormData(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                                    className="flex-1 accent-emerald-500"
                                />
                                <span className="text-white font-bold w-4">{formData.rating}</span>
                                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Linked Project</label>
                            <select
                                value={formData.project_id}
                                onChange={(e) => setFormData(prev => ({ ...prev, project_id: e.target.value }))}
                                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                            >
                                <option value="">None</option>
                                {projects.map((p) => (
                                    <option key={p.id} value={p.id}>
                                        {p.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-zinc-300">Featured Review</label>
                            <input
                                type="checkbox"
                                checked={formData.is_featured}
                                onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                                className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-emerald-500 focus:ring-emerald-500"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-zinc-300">Verified Client</label>
                            <input
                                type="checkbox"
                                checked={formData.is_verified}
                                onChange={(e) => setFormData(prev => ({ ...prev, is_verified: e.target.checked }))}
                                className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-emerald-500 focus:ring-emerald-500"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Sort Order</label>
                            <input
                                type="number"
                                value={formData.order_index}
                                onChange={(e) => setFormData(prev => ({ ...prev, order_index: parseInt(e.target.value) || 0 }))}
                                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

