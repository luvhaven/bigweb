'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Loader2, Save, ArrowLeft, Plus, Trash2, GripVertical } from 'lucide-react'
import { adminSupabase as supabase } from '@/utils/adminSupabase'
import Link from 'next/link'

interface ServiceFormProps {
    initialData?: any
    isEditing?: boolean
}

export default function ServiceForm({ initialData, isEditing = false }: ServiceFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [features, setFeatures] = useState<{ text: string }[]>(
        initialData?.features?.map((f: string) => ({ text: f })) || [{ text: '' }]
    )
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        description: initialData?.description || '',
        subtitle: initialData?.subtitle || '',
        pricing_model: initialData?.pricing_model || 'custom',
        starting_price: initialData?.starting_price || '',
        is_active: initialData?.is_active ?? true,
        icon: initialData?.icon || 'Code',
        order_index: initialData?.order_index || 0
    })

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...features]
        newFeatures[index].text = value
        setFeatures(newFeatures)
    }

    const addFeature = () => {
        setFeatures([...features, { text: '' }])
    }

    const removeFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const serviceData = {
                ...formData,
                starting_price: formData.starting_price ? Number(formData.starting_price) : null,
                features: features.map(f => f.text).filter(t => t.trim() !== '')
            }

            if (isEditing) {
                const { error } = await supabase
                    .from('services')
                    .update(serviceData)
                    .eq('id', initialData.id)
                if (error) throw error
            } else {
                const { error } = await supabase
                    .from('services')
                    .insert([serviceData])
                if (error) throw error
            }

            router.push('/admin/services')
            router.refresh()
        } catch (error) {
            console.error('Error saving service:', error)
            alert('Failed to save service')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            {/* Header Actions */}
            <div className="flex items-center justify-between">
                <Link
                    href="/admin/services"
                    className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Services
                </Link>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => router.push('/admin/services')}
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
                        {isEditing ? 'Update Service' : 'Create Service'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Basic Info */}
                    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-white">Basic Information</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">Service Title</label>
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
                                    placeholder="e.g. Web Development"
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
                                    placeholder="e.g. web-development"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Subtitle</label>
                            <input
                                type="text"
                                value={formData.subtitle}
                                onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                placeholder="Short catchy description"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Description</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                className="w-full h-32 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors resize-none"
                                placeholder="Detailed description of the service..."
                                required
                            />
                        </div>
                    </div>

                    {/* Features List */}
                    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-white">Features</h3>
                            <button
                                type="button"
                                onClick={addFeature}
                                className="text-sm text-emerald-500 hover:text-emerald-400 font-medium flex items-center gap-1"
                            >
                                <Plus className="w-4 h-4" />
                                Add Feature
                            </button>
                        </div>
                        <div className="space-y-3">
                            {features.map((feature, index) => (
                                <div key={index} className="flex gap-2">
                                    <div className="px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-zinc-500 cursor-move">
                                        <GripVertical className="w-5 h-5" />
                                    </div>
                                    <input
                                        type="text"
                                        value={feature.text}
                                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                                        className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                        placeholder="e.g. Responsive Design"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(index)}
                                        className="p-2 text-zinc-500 hover:text-red-400 hover:bg-zinc-800 rounded-lg transition-colors"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Settings */}
                <div className="space-y-6">
                    {/* Status & Visibility */}
                    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-white">Settings</h3>

                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-zinc-300">Active Status</label>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.is_active}
                                    onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
                                    className="sr-only peer"
                                />
                                <div className="w-11 h-6 bg-zinc-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                            </label>
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

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Icon Name</label>
                            <input
                                type="text"
                                value={formData.icon}
                                onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                placeholder="Lucide icon name"
                            />
                            <p className="text-xs text-zinc-500">Use PascalCase name from Lucide React</p>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-xl p-6 space-y-6">
                        <h3 className="text-lg font-semibold text-white">Pricing</h3>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-300">Model</label>
                            <select
                                value={formData.pricing_model}
                                onChange={(e) => setFormData(prev => ({ ...prev, pricing_model: e.target.value }))}
                                className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                            >
                                <option value="fixed">Fixed Price</option>
                                <option value="hourly">Hourly Rate</option>
                                <option value="custom">Custom Quoted</option>
                            </select>
                        </div>

                        {formData.pricing_model !== 'custom' && (
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-300">
                                    {formData.pricing_model === 'hourly' ? 'Hourly Rate ($)' : 'Starting Price ($)'}
                                </label>
                                <input
                                    type="number"
                                    value={formData.starting_price}
                                    onChange={(e) => setFormData(prev => ({ ...prev, starting_price: e.target.value }))}
                                    className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-emerald-500 transition-colors"
                                    placeholder="0.00"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    )
}

