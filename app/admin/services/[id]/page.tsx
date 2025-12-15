'use client'

import { useEffect, useState } from 'react'
import ServiceForm from '../components/ServiceForm'
import { adminSupabase as supabase } from '@/utils/adminSupabase'
import { useParams, useRouter } from 'next/navigation'

export default function EditServicePage() {
    const params = useParams()
    const router = useRouter()
    const [service, setService] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadService = async () => {
            try {
                const { data, error } = await supabase
                    .from('services')
                    .select('*')
                    .eq('id', params.id)
                    .single()

                if (error) throw error
                setService(data)
            } catch (error) {
                console.error('Error loading service:', error)
                router.push('/admin/services')
            } finally {
                setLoading(false)
            }
        }

        if (params.id) {
            loadService()
        }
    }, [params.id, router])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
            </div>
        )
    }

    if (!service) return null

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Edit Service</h1>
                <p className="text-zinc-400 mt-1">Update service details and pricing</p>
            </div>
            <ServiceForm initialData={service} isEditing />
        </div>
    )
}
