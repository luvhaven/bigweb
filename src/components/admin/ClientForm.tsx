'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { clientsAPI } from '@/lib/api/clients'
import { Loader2, Save, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface ClientFormProps {
    initialData?: any
    isEditing?: boolean
}

export default function ClientForm({ initialData, isEditing = false }: ClientFormProps) {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        logo_url: '',
        website: ''
    })

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                email: initialData.email || '',
                company: initialData.company || '',
                logo_url: initialData.logo_url || '',
                website: initialData.website || ''
            })
        }
    }, [initialData])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const payload = {
                contact_name: formData.name,
                email: formData.email,
                company_name: formData.company,
                logo_url: formData.logo_url,
                website: formData.website
            }

            if (isEditing && initialData?.id) {
                await clientsAPI.update(initialData.id, payload)
                toast.success('Client updated')
            } else {
                await clientsAPI.create(payload as any)
                toast.success('Client created')
            }
            router.push('/admin/clients')
            router.refresh()
        } catch (error) {
            toast.error('Failed to save client')
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/clients">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold">{isEditing ? 'Edit Client' : 'New Client'}</h1>
                    </div>
                </div>
                <Button type="submit" disabled={loading} className="bg-accent hover:bg-accent/90">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                    Save Client
                </Button>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Contact Name</label>
                        <Input
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Company Name</label>
                    <Input
                        required
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Website URL</label>
                    <Input
                        value={formData.website}
                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium">Logo URL</label>
                    <Input
                        value={formData.logo_url}
                        onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                    />
                </div>
            </div>
        </form>
    )
}
