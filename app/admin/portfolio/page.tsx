'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Plus, Eye, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { format } from 'date-fns'
import AdminHeader from '@/components/admin/AdminHeader'
import DataTable, { Column } from '@/components/admin/DataTable'
import { Button } from '@/components/ui/button'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

interface Project {
    id: string
    title: string
    client_name: string
    category: string
    is_published: boolean
    is_featured: boolean
    completion_date: string | null
    views_count: number
}

export default function PortfolioPage() {
    const supabase = createClient()
    const queryClient = useQueryClient()
    const [deleteId, setDeleteId] = useState<string | null>(null)

    // React Query for projects
    const { data: projects = [], isLoading } = useQuery({
        queryKey: ['admin', 'portfolio'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('portfolio_projects')
                .select('id, title, client_name, category, is_published, is_featured, completion_date, views_count')
                .order('created_at', { ascending: false })

            if (error) throw error
            return data as Project[]
        }
    })

    // Delete Mutation
    const deleteMutation = useMutation({
        mutationFn: async (id: string) => {
            const { error } = await supabase
                .from('portfolio_projects')
                .delete()
                .eq('id', id)
            if (error) throw error
        },
        onSuccess: () => {
            toast.success('Project deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['admin', 'portfolio'] })
            setDeleteId(null)
        },
        onError: (error: any) => {
            console.error('Error deleting project:', error)
            toast.error('Failed to delete project: ' + error.message)
        }
    })

    const handleDelete = () => {
        if (!deleteId) return
        deleteMutation.mutate(deleteId)
    }

    const columns: Column<Project>[] = [
        {
            header: 'Project',
            cell: (project) => (
                <div>
                    <div className="font-medium text-foreground">{project.title}</div>
                    <div className="text-xs text-muted-foreground">{project.client_name}</div>
                </div>
            )
        },
        {
            header: 'Status',
            cell: (project) => (
                project.is_published ? (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 ring-1 ring-inset ring-emerald-500/20">
                        <CheckCircle className="w-3.5 h-3.5" />
                        Published
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-500/10 text-zinc-400 ring-1 ring-inset ring-zinc-500/20">
                        <XCircle className="w-3.5 h-3.5" />
                        Draft
                    </span>
                )
            )
        },
        {
            header: 'Category',
            cell: (project) => (
                <span className="px-2 py-1 bg-secondary rounded text-xs text-muted-foreground capitalize">
                    {project.category}
                </span>
            )
        },
        {
            header: 'Stats',
            cell: (project) => (
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {project.views_count}
                    </div>
                </div>
            )
        },
        {
            header: 'Date',
            cell: (project) => (
                <span className="text-muted-foreground text-sm">
                    {project.completion_date ? format(new Date(project.completion_date), 'MMM yyyy') : 'Ongoing'}
                </span>
            )
        }
    ]

    return (
        <div className="space-y-6">
            <AdminHeader
                title="Portfolio"
                description="Manage your case studies and projects"
            >
                <Link href="/admin/portfolio/new">
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
                        <Plus className="w-4 h-4" />
                        Add Project
                    </Button>
                </Link>
            </AdminHeader>

            <DataTable
                columns={columns}
                data={projects}
                loading={isLoading}
                editLink={(project) => `/admin/portfolio/${project.id}`}
                onDelete={(id) => setDeleteId(id)}
                emptyMessage="No projects found. Create your first case study to showcase your work."
            />

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-card border border-border rounded-xl max-w-sm w-full p-6 shadow-xl">
                        <div className="flex items-center gap-3 text-red-500 mb-4">
                            <AlertCircle className="w-6 h-6" />
                            <h3 className="text-lg font-bold">Delete Project?</h3>
                        </div>
                        <p className="text-muted-foreground mb-6">
                            Are you sure you want to delete this project? This action cannot be undone.
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

