'use client'

import { useEffect, useState } from 'react'
import PortfolioForm from '../components/PortfolioForm'
import { adminSupabase as supabase } from '@/utils/adminSupabase'
import { useParams, useRouter } from 'next/navigation'

export default function EditProjectPage() {
    const params = useParams()
    const router = useRouter()
    const [project, setProject] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadProject = async () => {
            try {
                const id = Array.isArray(params.id) ? params.id[0] : params.id
                if (!id) return;

                const { data, error } = await supabase
                    .from('portfolio_projects')
                    .select('*')
                    .eq('id', id)
                    .single()

                if (error) throw error
                setProject(data)
            } catch (error) {
                console.error('Error loading project:', error)
                router.push('/admin/portfolio')
            } finally {
                setLoading(false)
            }
        }

        if (params.id) {
            loadProject()
        }
    }, [params.id, router])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!project) return null

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Edit Project</h1>
                <p className="text-zinc-400 mt-1">Update case study details</p>
            </div>
            <PortfolioForm initialData={project} isEditing />
        </div>
    )
}
