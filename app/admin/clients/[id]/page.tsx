'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import ClientForm from '@/components/admin/ClientForm'
import { clientsAPI } from '@/lib/api/clients'
import { Loader2 } from 'lucide-react'

export default function EditClientPage() {
    const params = useParams()
    const [client, setClient] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (params.id) {
            loadClient(params.id as string)
        }
    }, [params.id])

    const loadClient = async (id: string) => {
        try {
            const data = await clientsAPI.getById(id)
            setClient(data)
        } catch (error) {
            console.error('Error loading client:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <div className="flex justify-center py-20"><Loader2 className="animate-spin" /></div>
    if (!client) return <div>Client not found</div>

    return <ClientForm initialData={client} isEditing />
}
