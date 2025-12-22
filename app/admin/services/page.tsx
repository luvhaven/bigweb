'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { format } from 'date-fns'
import AdminHeader from '@/components/admin/AdminHeader'
import DataTable, { Column } from '@/components/admin/DataTable'
import { Button } from '@/components/ui/button'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner' // Assuming sonner is installed as confirmed in task.md

interface Service {
    id: string
    title: string
    slug: string
    is_active: boolean
    pricing_model: string
    starting_price: number | null
    updated_at: string
}

export default function ServicesPage() {
    const supabase = createClient()
    const queryClient = useQueryClient()
    const [deleteId, setDeleteId] = useState<string | null>(null)

    // React Query for Fetching
    const { data: services = [], isLoading } = useQuery({
        queryKey: ['admin', 'services'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('services')
                .select('id, title, slug, is_active, pricing_model, starting_price, updated_at')
                .order('order_index', { ascending: true })

            if (error) throw error
            return data as Service[]
        }
    })

    // React Query for Deleting
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('services')
                .delete()
                .eq('id', id)
            if (error) throw error
        },
        onSuccess: () => {
            toast.success('Service deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['admin', 'services'] })
            setDeleteId(null)
        },
        onError: (error: any) => {
            console.error('Error deleting service:', error)
            toast.error('Failed to delete service: ' + error.message)
        }
    })

    const handleDelete = async () => {
        if (!deleteId) return
        deleteMutation.mutate(deleteId)
    }

    const columns: Column<Service>[] = [
        {
            header: 'Title',
            cell: (service) => (
                <div>
                    <div className="font-medium text-foreground">{service.title}</div>
                    <div className="text-xs text-muted-foreground">/{service.slug}</div>
                </div>
            )
        },
        {
            header: 'Status',
            cell: (service) => (
                service.is_active ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 ring-1 ring-inset ring-emerald-500/20">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Active
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-500/10 text-zinc-400 ring-1 ring-inset ring-zinc-500/20">
                        <XCircle className="w-3.5 h-3.5" />
                        Inactive
                    </span>
                )
            )
        },
        {
            header: 'Pricing',
            cell: (service) => (
                <div className="text-zinc-300">
                    {service.starting_price ? (
                        <span>From ${service.starting_price.toLocaleString()}</span>
                    ) : (
                        <span className="text-muted-foreground">Custom Quote</span>
                    )}
                    <span className="text-xs text-muted-foreground block capitalize">{service.pricing_model}</span>
                </div>
            )
        },
        {
            header: 'Last Updated',
            cell: (service) => (
                <span className="text-muted-foreground">
                    {format(new Date(service.updated_at), 'MMM d, yyyy')}
                </span>
            )
        }
    ]

    return (
        <div className="space-y-6">
            <AdminHeader
                title="Services"
                description="Manage your service offerings and pricing"
            >
                <Link href="/admin/services/new">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                        <Plus className="w-4 h-4" />
                        Add New Service
                    </Button>
                </Link>
            </AdminHeader>

            <DataTable
                columns={columns}
                data={services}
                loading={isLoading}
                editLink={(service) => `/admin/services/${service.id}`}
                onDelete={(id) => setDeleteId(id)}
                emptyMessage="No services found. Create one to get started."
            />

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-card border border-border rounded-xl max-w-sm w-full p-6 shadow-xl">
                        <div className="flex items-center gap-3 text-red-500 mb-4">
                            <AlertCircle className="w-6 h-6" />
                            <h3 className="text-lg font-bold">Delete Service?</h3>
                        </div>
                        <p className="text-muted-foreground mb-6">
                            Are you sure you want to delete this service? This action cannot be undone.
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
                                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center gap-2"
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

