'use client'

import GenericAdminTable from '@/components/admin/GenericAdminTable'

export default function AdminProjectsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Projects</h1>
                    <p className="text-zinc-400">Manage case studies and portfolio items.</p>
                </div>
            </div>

            <GenericAdminTable
                tableName="cms_projects"
                title="Case Studies"
                excludeSlugs={['vortex-pay', 'antro-logistics']}
                columns={[
                    { key: 'title', label: 'Project Title', type: 'text' },
                    { key: 'slug', label: 'Slug', type: 'text' },
                    { key: 'client_name', label: 'Client', type: 'text' },
                    { key: 'summary', label: 'Summary', type: 'text' },
                    { key: 'cover_image_url', label: 'Cover Image', type: 'image' },
                    { key: 'live_url', label: 'Live URL', type: 'text' },
                    { key: 'is_featured', label: 'Featured', type: 'boolean' }
                ]}
                defaultSort="created_at"
            />
        </div>
    )
}
