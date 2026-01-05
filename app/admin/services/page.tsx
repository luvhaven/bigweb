'use client'

import GenericAdminTable from '@/components/admin/GenericAdminTable'

export default function AdminServicesPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Services</h1>
                    <p className="text-zinc-400">Manage your agency service offerings.</p>
                </div>
            </div>

            <GenericAdminTable
                tableName="cms_services"
                title="Service Offerings"
                columns={[
                    { key: 'title', label: 'Service Title', type: 'text' },
                    { key: 'slug', label: 'URL Slug', type: 'text' },
                    { key: 'short_description', label: 'Description', type: 'text' },
                    { key: 'icon', label: 'Icon (Lucide)', type: 'text' },
                    { key: 'sort_order', label: 'Order', type: 'number' },
                    { key: 'is_active', label: 'Active', type: 'boolean' }
                ]}
                defaultSort="sort_order"
            />
        </div>
    )
}
