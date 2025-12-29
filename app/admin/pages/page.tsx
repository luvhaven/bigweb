'use client'

import { useState, useEffect } from 'react'
import { adminSupabase as supabase } from '@/utils/adminSupabase'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Plus, Loader2, Edit, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface PageItem {
    id: string
    title: string
    slug: string
    published: boolean
    updated_at: string
}

export default function PagesAdminPage() {
    const [pages, setPages] = useState<PageItem[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        loadPages()
    }, [])

    const loadPages = async () => {
        try {
            setLoading(true)
            const { data, error } = await supabase
                .from('pages')
                .select('*')
                .order('title', { ascending: true })

            if (error) throw error
            setPages(data || [])
        } catch (error) {
            console.error('Error loading pages:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this page?')) return

        try {
            const { error } = await supabase.from('pages').delete().eq('id', id)
            if (error) throw error
            loadPages()
        } catch (err) {
            console.error(err)
            alert('Failed to delete')
        }
    }

    return (
        <div className="flex min-h-screen bg-background">
            <AdminSidebar />
            <div className="flex-1 ml-64 p-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Pages</h1>
                        <p className="text-muted-foreground">Manage static content pages (About, Terms, etc).</p>
                    </div>
                    <Link href="/admin/pages/new">
                        <Button size="lg" className="gap-2">
                            <Plus className="w-4 h-4" /> Create Page
                        </Button>
                    </Link>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-24"><Loader2 className="w-8 h-8 animate-spin" /></div>
                ) : (
                    <div className="grid gap-4">
                        {pages.map(page => (
                            <Card key={page.id} className="hover:shadow-md transition-shadow">
                                <CardContent className="flex items-center justify-between p-6">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-1">{page.title}</h3>
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                            <span className="font-mono bg-muted px-2 py-0.5 rounded">/{page.slug}</span>
                                            <span>•</span>
                                            <span className={page.published ? "text-green-500" : "text-amber-500"}>
                                                {page.published ? "Published" : "Draft"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Link href={`/admin/pages/${page.id}`}>
                                            <Button variant="outline" size="sm">
                                                <Edit className="w-4 h-4 mr-2" /> Edit
                                            </Button>
                                        </Link>
                                        <Button variant="ghost" size="sm" className="text-destructive hover:bg-destructive/10" onClick={() => handleDelete(page.id)}>
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {pages.length === 0 && (
                            <div className="text-center py-24 text-muted-foreground">
                                No pages found. Create one to get started.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
