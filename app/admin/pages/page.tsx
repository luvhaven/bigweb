'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Search, MoreVertical, Edit, Trash2, FileText, Globe } from 'lucide-react'
import Link from 'next/link'
import { pagesAPI } from '@/lib/api/pages'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function PagesPage() {
    const [pages, setPages] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        loadPages()
    }, [])

    const loadPages = async () => {
        try {
            const data = await pagesAPI.getAll()
            setPages(data || [])
        } catch (error) {
            toast.error('Failed to load pages')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this page?')) return
        try {
            await pagesAPI.delete(id)
            setPages(pages.filter(p => p.id !== id))
            toast.success('Page deleted')
        } catch (error) {
            toast.error('Failed to delete')
        }
    }

    const filteredPages = pages.filter(page =>
        page.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.slug?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Pages</h1>
                    <p className="text-muted-foreground">Manage your website content.</p>
                </div>
                <Link href="/admin/pages/new">
                    <Button className="bg-accent hover:bg-accent/90">
                        <Plus className="w-4 h-4 mr-2" /> New Page
                    </Button>
                </Link>
            </div>

            <div className="flex items-center gap-4 bg-card p-4 rounded-xl border border-border">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search pages..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20">Loading pages...</div>
            ) : filteredPages.length === 0 ? (
                <div className="text-center py-20 bg-card rounded-xl border border-border border-dashed">
                    <p className="text-muted-foreground">No pages found</p>
                </div>
            ) : (
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-secondary/50 border-b border-border">
                            <tr>
                                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Title</th>
                                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Slug</th>
                                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Status</th>
                                <th className="text-left p-4 font-medium text-sm text-muted-foreground">Last Updated</th>
                                <th className="text-right p-4 font-medium text-sm text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPages.map((page, index) => (
                                <motion.tr
                                    key={page.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="border-b border-border last:border-0 hover:bg-secondary/20 transition-colors"
                                >
                                    <td className="p-4 font-medium flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-accent/10 flex items-center justify-center text-accent">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        {page.title}
                                    </td>
                                    <td className="p-4 text-sm text-muted-foreground">/{page.slug}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${page.status === 'published' ? 'bg-green-500/10 text-green-500' : 'bg-secondary text-muted-foreground'
                                            }`}>
                                            {page.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-sm text-muted-foreground">
                                        {new Date(page.updated_at || page.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="p-4 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                                    <MoreVertical className="w-4 h-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <Link href={`/admin/pages/${page.id}`}>
                                                    <DropdownMenuItem>
                                                        <Edit className="w-4 h-4 mr-2" /> Edit
                                                    </DropdownMenuItem>
                                                </Link>
                                                <a href={`/${page.slug}`} target="_blank" rel="noreferrer">
                                                    <DropdownMenuItem>
                                                        <Globe className="w-4 h-4 mr-2" /> View Live
                                                    </DropdownMenuItem>
                                                </a>
                                                <DropdownMenuItem className="text-red-500" onClick={() => handleDelete(page.id)}>
                                                    <Trash2 className="w-4 h-4 mr-2" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
