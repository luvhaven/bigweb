'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, Plus, Pencil, Trash2, Save, X, RefreshCw, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

interface Column {
    key: string
    label: string
    type: 'text' | 'boolean' | 'number' | 'date' | 'json' | 'image'
    editable?: boolean
}

interface GenericAdminTableProps {
    tableName: string
    title: string
    columns: Column[]
    defaultSort?: string
    excludeSlugs?: string[]
}

export default function GenericAdminTable({ tableName, title, columns, defaultSort = 'created_at', excludeSlugs = [] }: GenericAdminTableProps) {
    const supabase = createClient()
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [openEditor, setOpenEditor] = useState<any | null>(null) // null = closed, {} = new, object = edit
    const [saving, setSaving] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const fetchData = async () => {
        setLoading(true)
        const { data: rows, error } = await supabase
            .from(tableName)
            .select('*')
            .order(defaultSort, { ascending: false })

        if (error) {
            console.error('Fetch error:', error)
            toast.error('Failed to load data')
        }
        if (rows) {
            // Apply exclusion filter
            const filteredRows = excludeSlugs.length > 0
                ? rows.filter(row => !excludeSlugs.includes(row.slug))
                : rows
            setData(filteredRows)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchData()
    }, [tableName])

    const handleSave = async (formData: any) => {
        setSaving(true)
        try {
            if (formData.id) {
                // Update
                const { error } = await supabase.from(tableName).update(formData).eq('id', formData.id)
                if (error) throw error
                toast.success('Updated successfully')
            } else {
                // Insert
                const { error } = await supabase.from(tableName).insert(formData)
                if (error) throw error
                toast.success('Created successfully')
            }
            setOpenEditor(null)
            fetchData()
        } catch (err: any) {
            console.error('Save error:', err)
            toast.error(err.message || 'Failed to save')
        } finally {
            setSaving(false)
        }
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this record?')) return
        const { error } = await supabase.from(tableName).delete().eq('id', id)
        if (error) {
            console.error('Delete error:', error)
            toast.error('Failed to delete')
        }
        else {
            toast.success('Deleted successfully')
            fetchData()
        }
    }

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const file = e.target.files?.[0]
        if (!file) return

        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${tableName}/${fileName}`

        const toastId = toast.loading('Uploading...')

        try {
            const { error: uploadError } = await supabase.storage
                .from('media')
                .upload(filePath, file)

            if (uploadError) throw uploadError

            const { data } = supabase.storage.from('media').getPublicUrl(filePath)

            // Update editor state
            setOpenEditor((prev: any) => ({ ...prev, [key]: data.publicUrl }))

            toast.success('Uploaded successfully', { id: toastId })
        } catch (error: any) {
            console.error('Upload error:', error)
            toast.error('Upload failed: ' + error.message, { id: toastId })
        }
    }

    // Client-side filtering
    const filteredData = data.filter(item => {
        if (!searchQuery) return true
        return columns.some(col => {
            const val = item[col.key]
            if (val == null) return false
            return String(val).toLowerCase().includes(searchQuery.toLowerCase())
        })
    })

    if (loading) return <div className="flex items-center justify-center p-12"><Loader2 className="animate-spin w-8 h-8 text-emerald-500" /></div>

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
            {/* Header / Actions */}
            <div className="p-6 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <h2 className="text-xl font-bold">{title}</h2>
                    <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-xs text-zinc-400">{filteredData.length} records</span>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <div className="relative flex-1 sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                        <Input
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            className="pl-9 bg-zinc-950 border-zinc-800"
                        />
                    </div>
                    <Button variant="ghost" size="icon" onClick={fetchData}><RefreshCw className="w-4 h-4" /></Button>
                    <Button onClick={() => setOpenEditor({})} className="bg-emerald-500 hover:bg-emerald-600 text-white">
                        <Plus className="w-4 h-4 mr-2" /> Add New
                    </Button>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-zinc-950 text-zinc-400 font-medium">
                        <tr>
                            {columns.map(col => <th key={col.key} className="px-6 py-3 whitespace-nowrap">{col.label}</th>)}
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {filteredData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length + 1} className="px-6 py-12 text-center text-zinc-500">
                                    No records found matching your search.
                                </td>
                            </tr>
                        ) : (
                            filteredData.map(item => (
                                <tr key={item.id} className="group hover:bg-zinc-800/50 transition-colors">
                                    {columns.map(col => (
                                        <td key={col.key} className="px-6 py-4 max-w-xs truncate">
                                            {col.type === 'boolean' ? (
                                                item[col.key] ?
                                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500">Active</span> :
                                                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-zinc-500/10 text-zinc-500">Inactive</span>
                                            ) : col.type === 'json' ? (
                                                <code className="text-xs bg-zinc-950 px-1 py-0.5 rounded text-zinc-500">{JSON.stringify(item[col.key]).slice(0, 30)}...</code>
                                            ) : col.type === 'image' ? (
                                                item[col.key] ? <img src={item[col.key]} alt="preview" className="h-8 w-8 rounded object-cover bg-zinc-800" /> : <span className="text-zinc-600">-</span>
                                            ) : (
                                                <span title={String(item[col.key])}>{item[col.key]}</span>
                                            )}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 text-right flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => setOpenEditor(item)}><Pencil className="w-4 h-4 text-blue-400" /></Button>
                                        <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleDelete(item.id)}><Trash2 className="w-4 h-4 text-red-400" /></Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Side Drawer Editor */}
            <motion.div
                initial={false}
                animate={openEditor ? { opacity: 1, pointerEvents: 'auto' } : { opacity: 0, pointerEvents: 'none' }}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end transition-opacity"
                onClick={() => setOpenEditor(null)}
            >
                <motion.div
                    initial={{ x: '100%' }}
                    animate={{ x: openEditor ? 0 : '100%' }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    onClick={e => e.stopPropagation()}
                    className="w-full max-w-lg bg-zinc-900 border-l border-zinc-800 h-full p-6 shadow-2xl overflow-y-auto"
                >
                    {openEditor && (
                        <>
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
                                <div>
                                    <h3 className="text-xl font-bold text-white">{openEditor.id ? 'Edit Record' : 'Create Record'}</h3>
                                    <p className="text-zinc-500 text-sm mt-1">{tableName}</p>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setOpenEditor(null)}><X className="w-5 h-5" /></Button>
                            </div>

                            <form onSubmit={(e) => {
                                e.preventDefault()
                                const formData = new FormData(e.currentTarget)
                                const updates: any = openEditor.id ? { id: openEditor.id } : {}
                                columns.filter(c => c.editable !== false).forEach(col => {
                                    if (col.type === 'image') {
                                        // Image URL is handled by state (openEditor), not this form input directly if hidden
                                        updates[col.key] = openEditor[col.key]
                                        return
                                    }
                                    const val = formData.get(col.key)
                                    if (col.type === 'boolean') updates[col.key] = val === 'on'
                                    else if (col.type === 'number') updates[col.key] = Number(val)
                                    else if (col.type === 'json') {
                                        try {
                                            updates[col.key] = JSON.parse(val as string)
                                        } catch (e) {
                                            toast.error(`Invalid JSON for ${col.label}`)
                                            throw e
                                        }
                                    }
                                    else updates[col.key] = val
                                })
                                handleSave(updates)
                            }} className="space-y-6">
                                {columns.filter(c => c.editable !== false).map(col => (
                                    <div key={col.key}>
                                        <label className="block text-sm font-medium text-zinc-400 mb-2">{col.label}</label>

                                        {col.type === 'boolean' ? (
                                            <div className="flex items-center gap-3 p-3 bg-zinc-950 rounded-lg border border-zinc-800">
                                                <input type="checkbox" name={col.key} defaultChecked={openEditor[col.key]} className="w-5 h-5 rounded border-zinc-700 bg-zinc-800 text-emerald-500 focus:ring-emerald-500" />
                                                <span className="text-sm">Enabled / Active</span>
                                            </div>
                                        ) : col.type === 'text' && (col.key.includes('description') || col.key.includes('summary')) ? (
                                            <textarea
                                                name={col.key}
                                                defaultValue={openEditor[col.key]}
                                                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-lg min-h-[120px] focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
                                                placeholder={`Enter ${col.label}...`}
                                            />
                                        ) : col.type === 'json' ? (
                                            <textarea
                                                name={col.key}
                                                defaultValue={JSON.stringify(openEditor[col.key] || [], null, 2)}
                                                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-lg min-h-[120px] font-mono text-xs focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
                                                placeholder="[\n  'Item 1',\n  'Item 2'\n]"
                                            />
                                        ) : col.type === 'image' ? (
                                            <div className="space-y-3">
                                                {openEditor[col.key] && (
                                                    <img src={openEditor[col.key]} alt="Preview" className="w-full h-40 object-cover rounded-lg border border-zinc-800" />
                                                )}
                                                <div className="flex gap-2">
                                                    <Input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(e) => handleFileUpload(e, col.key)}
                                                        className="bg-zinc-950 border-zinc-800"
                                                    />
                                                </div>
                                                <p className="text-xs text-zinc-500">Uploads to 'cms_media' bucket. URL auto-filled.</p>
                                                <input type="hidden" name={col.key} value={openEditor[col.key] || ''} />
                                            </div>
                                        ) : (
                                            <input
                                                type={col.type === 'number' ? 'number' : 'text'}
                                                name={col.key}
                                                defaultValue={openEditor[col.key]}
                                                className="w-full p-3 bg-zinc-950 border border-zinc-800 rounded-lg focus:ring-2 focus:ring-emerald-500/50 outline-none transition-all"
                                                placeholder={`Enter ${col.label}...`}
                                            />
                                        )}
                                    </div>
                                ))}

                                <div className="pt-6 border-t border-zinc-800 flex gap-3 sticky bottom-0 bg-zinc-900 pb-2">
                                    <Button type="button" variant="outline" onClick={() => setOpenEditor(null)} className="flex-1">
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={saving} className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white">
                                        {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4 mr-2" />}
                                        Save Changes
                                    </Button>
                                </div>
                            </form>
                        </>
                    )}
                </motion.div>
            </motion.div>
        </div>
    )
}
