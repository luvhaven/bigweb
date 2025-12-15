'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { Pencil, Trash2, Eye, MoreHorizontal, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'

export interface Column<T> {
    header: string
    accessorKey?: keyof T
    cell?: (item: T) => ReactNode
    className?: string
}

interface DataTableProps<T> {
    columns: Column<T>[]
    data: T[]
    loading?: boolean
    onDelete?: (id: string) => void
    onEdit?: (id: string) => void // If provided, shows edit button. Alternatively provide editLink in actions.
    editLink?: (item: T) => string // Function to generate edit link
    searchable?: boolean
    emptyMessage?: string
}

export default function DataTable<T extends { id: string }>({
    columns,
    data,
    loading,
    onDelete,
    editLink,
    emptyMessage = 'No items found.'
}: DataTableProps<T>) {

    if (loading) {
        return (
            <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground animate-pulse">
                Loading data...
            </div>
        )
    }

    if (data.length === 0) {
        return (
            <div className="bg-card border border-border rounded-xl p-12 text-center text-muted-foreground">
                {emptyMessage}
            </div>
        )
    }

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-secondary/50 text-muted-foreground uppercase font-medium">
                        <tr>
                            {columns.map((col, i) => (
                                <th key={i} className={`px-6 py-4 ${col.className || ''}`}>
                                    {col.header}
                                </th>
                            ))}
                            {(onDelete || editLink) && (
                                <th className="px-6 py-4 text-right">Actions</th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {data.map((item) => (
                            <tr key={item.id} className="hover:bg-secondary/30 transition-colors">
                                {columns.map((col, i) => (
                                    <td key={i} className={`px-6 py-4 ${col.className || ''}`}>
                                        {col.cell
                                            ? col.cell(item)
                                            : col.accessorKey
                                                ? String(item[col.accessorKey])
                                                : null
                                        }
                                    </td>
                                ))}
                                {(onDelete || editLink) && (
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {editLink && (
                                                <Link
                                                    href={editLink(item)}
                                                    className="p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                            )}
                                            {onDelete && (
                                                <button
                                                    onClick={() => onDelete(item.id)}
                                                    className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
