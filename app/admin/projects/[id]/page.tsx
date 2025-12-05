'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ProjectForm from '@/components/admin/ProjectForm'
import { projectsAPI } from '@/lib/api/projects'
import { Loader2 } from 'lucide-react'

export default function EditProjectPage() {
    const params = useParams()
    const [project, setProject] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (params.id) {
            loadProject(params.id as string)
        }
    }, [params.id])

    const loadProject = async (id: string) => {
        try {
            const data = await projectsAPI.getById(id)
            setProject(data)
        } catch (error) {
            console.error('Error loading project:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
            </div>
        )
    }

    if (!project) {
        return <div>Project not found</div>
    }

    return <ProjectForm initialData={project} isEditing />
}
