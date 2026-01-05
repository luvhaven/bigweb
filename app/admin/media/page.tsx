'use client'

import GenericAdminTable from '@/components/admin/GenericAdminTable'

export default function AdminMediaPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Video Showroom</h1>
                    <p className="text-zinc-400">Manage your featured video content.</p>
                </div>
            </div>

            <GenericAdminTable
                tableName="cms_video_showroom"
                title="Videos"
                columns={[
                    { key: 'title', label: 'Title', type: 'text' },
                    { key: 'category', label: 'Category', type: 'text' },
                    { key: 'duration', label: 'Duration', type: 'text' },
                    { key: 'video_url', label: 'Video URL', type: 'text' },
                    { key: 'thumbnail_url', label: 'Thumbnail', type: 'text' },
                    { key: 'featured', label: 'Featured', type: 'boolean' },
                    { key: 'sort_order', label: 'Order', type: 'number' },
                    { key: 'is_active', label: 'Active', type: 'boolean' }
                ]}
                defaultSort="sort_order"
            />
        </div>
    )
}
