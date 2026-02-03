'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Loader2, Save, ArrowLeft, Plus, X, Image as ImageIcon } from 'lucide-react'
import { adminSupabase as supabase } from '@/utils/adminSupabase'
import { saveProject } from '@/actions/portfolio'
import Link from 'next/link'

interface PortfolioFormProps {
    initialData?: any
    isEditing?: boolean
}

export default function PortfolioForm({ initialData, isEditing = false }: PortfolioFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [technologies, setTechnologies] = useState<{ text: string }[]>(
        initialData?.technologies?.map((t: string) => ({ text: t })) || []
    )
    const [newTech, setNewTech] = useState('')

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        client_name: initialData?.client_name || '',
        category: initialData?.category || 'web-development',
        description: initialData?.description || '',
        challenge: initialData?.challenge || '',
        solution: initialData?.solution || '',
        results: initialData?.results || '',
        live_url: initialData?.live_url || '',
        github_url: initialData?.github_url || '',
        completion_date: initialData?.completion_date || '',
        is_published: initialData?.is_published ?? true,
        is_featured: initialData?.is_featured || false,
        // Neural Fields
        deconstructed_view: initialData?.deconstructed_view || false,
        technical_details: initialData?.technical_details || {
            architecture_url: '',
            api_latency: '',
            core_features: '' // Stored as a string for easier editing, could be parsed to array
        }
    })

    const addTech = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && newTech.trim()) {
            e.preventDefault()
            setTechnologies([...technologies, { text: newTech.trim() }])
            setNewTech('')
        }
    }

    const removeTech = (index: number) => {
        setTechnologies(technologies.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const projectData = {
                title: formData.title,
                slug: formData.slug,
                client_name: formData.client_name,
                category: formData.category,
                description: formData.description,
                challenge: formData.challenge,
                solution: formData.solution,
                results: formData.results,
                live_url: formData.live_url,
                github_url: formData.github_url,
                completion_date: formData.completion_date,
                status: formData.is_published ? 'published' : 'draft',
                is_featured: formData.is_featured,
                technologies: technologies.map(t => t.text),

                // Neural Fields
                deconstructed_view: formData.deconstructed_view,
                technical_details: formData.technical_details,

                featured_image: null,
                gallery_images: null,
                main_image: null,
                website_url: formData.live_url,
                background_color: null,
                text_color: null,
                views_count: 0
            }

            const result = await saveProject({
                ...projectData,
                id: isEditing ? initialData.id : undefined
            })

            if (!result.success) throw new Error(result.error)

            router.push('/admin/portfolio')
            router.refresh()
        } catch (error) {
            console.error('Error saving project:', error)
            alert('Failed to save project')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
                <Link
                    href="/admin/portfolio"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Portfolio
                </Link>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => router.push('/admin/portfolio')}
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
                        {isEditing ? 'Update Project' : 'Create Project'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-white">Project Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Project Title</label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => {
                                        setFormData(prev => ({
                                            ...prev,
                                            title: e.target.value,
                                            slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
                                        }))
                                    }}
                                    className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Slug</label>
                                <input
                                    type="text"
                                    value={formData.slug}
                                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                                    className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    required
                                />
                            </div>
                        </div>

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
                            <label className="text-sm font-medium text-zinc-300">Short Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                className="w-full h-24 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                                placeholder="Brief overview of the project..."
                                required
                            />
                        </div>
                    </div>

                    {/* Case Study Details */}
                    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-white">Case Study Content</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">The Challenge</label>
                            <textarea
                                value={formData.challenge}
                                onChange={(e) => setFormData(prev => ({ ...prev, challenge: e.target.value }))}
                                className="w-full h-32 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                                placeholder="What problem did we solve?"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">The Solution</label>
                            <textarea
                                value={formData.solution}
                                onChange={(e) => setFormData(prev => ({ ...prev, solution: e.target.value }))}
                                className="w-full h-32 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                                placeholder="How did we fix it?"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Key Results</label>
                            <textarea
                                value={formData.results}
                                onChange={(e) => setFormData(prev => ({ ...prev, results: e.target.value }))}
                                className="w-full h-32 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                                placeholder="Metrics and outcomes..."
                            />
                        </div>
                    </div>

                    {/* Technical Deep Dive (Neural Section) */}
                    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 space-y-6 border-l-4 border-l-blue-500">
                        <div className="flex items-center gap-2">
                            <h3 className="text-lg font-semibold text-white">Technical Deep Dive</h3>
                            <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded border border-blue-500/30">NEURAL</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Architecture Diagram URL</label>
                                <input
                                    type="url"
                                    value={formData.technical_details.architecture_url}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        technical_details: { ...prev.technical_details, architecture_url: e.target.value }
                                    }))}
                                    className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600"
                                    placeholder="https://... (Mermaid or Image)"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Avg API Latency</label>
                                <input
                                    type="text"
                                    value={formData.technical_details.api_latency}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        technical_details: { ...prev.technical_details, api_latency: e.target.value }
                                    }))}
                                    className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600"
                                    placeholder="e.g. 12ms"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Core Technical Features (JSON-like List)</label>
                            <textarea
                                value={formData.technical_details.core_features}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    technical_details: { ...prev.technical_details, core_features: e.target.value }
                                }))}
                                className="w-full h-24 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-blue-500 transition-colors resize-none font-mono text-sm"
                                placeholder="- Real-time Websockets&#10;- Redis Caching Layer&#10;- Edge Functions"
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Status */}
                    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-white">Publishing</h3>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-zinc-300">Published</label>
                            <input
                                type="checkbox"
                                checked={formData.is_published}
                                onChange={(e) => setFormData(prev => ({ ...prev, is_published: e.target.checked }))}
                                className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-emerald-500 focus:ring-emerald-500"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-zinc-300">Featured Project</label>
                            <input
                                type="checkbox"
                                checked={formData.is_featured}
                                onChange={(e) => setFormData(prev => ({ ...prev, is_featured: e.target.checked }))}
                                className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-emerald-500 focus:ring-emerald-500"
                            />
                        </div>

                        {/* Neural Config */}
                        <div className="border-t border-zinc-800 pt-4 mt-4">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-blue-400">Deconstructed View</label>
                                <input
                                    type="checkbox"
                                    checked={formData.deconstructed_view}
                                    onChange={(e) => setFormData(prev => ({ ...prev, deconstructed_view: e.target.checked }))}
                                    className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-blue-500 focus:ring-blue-500"
                                />
                            </div>
                            <p className="text-xs text-zinc-500 mt-1">Enables technical overlay mode on the case study page.</p>
                        </div>

                        <div className="space-y-2 mt-4">
                            <label className="text-sm font-medium text-zinc-300">Completion Date</label>
                            <input
                                type="date"
                                value={formData.completion_date}
                                onChange={(e) => setFormData(prev => ({ ...prev, completion_date: e.target.value }))}
                                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                            />
                        </div>
                    </div>

                    {/* Categorization */}
                    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-white">Categorization</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Category</label>
                            <select
                                value={formData.category}
                                onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                            >
                                <option value="web-development">Web Development</option>
                                <option value="mobile-app">Mobile App</option>
                                <option value="branding">Branding</option>
                                <option value="marketing">Marketing</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Technologies</label>
                            <input
                                type="text"
                                value={newTech}
                                onChange={(e) => setNewTech(e.target.value)}
                                onKeyDown={addTech}
                                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                placeholder="Type and press Enter..."
                            />
                            <div className="flex flex-wrap gap-2 mt-2">
                                {technologies.map((tech, index) => (
                                    <span key={index} className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-800 text-xs text-zinc-300 rounded border border-zinc-700">
                                        {tech.text}
                                        <button
                                            type="button"
                                            onClick={() => removeTech(index)}
                                            className="hover:text-red-400"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-white">Links</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Live URL</label>
                            <input
                                type="url"
                                value={formData.live_url}
                                onChange={(e) => setFormData(prev => ({ ...prev, live_url: e.target.value }))}
                                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                placeholder="https://..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">GitHub URL</label>
                            <input
                                type="url"
                                value={formData.github_url}
                                onChange={(e) => setFormData(prev => ({ ...prev, github_url: e.target.value }))}
                                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    )
}

