'use client'

import GenericAdminTable from '@/components/admin/GenericAdminTable'

export default function AdminClientsPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Clients & Trust</h1>
                    <p className="text-zinc-400">Manage client logos and social proof display.</p>
                </div>
            </div>

            <GenericAdminTable
                tableName="cms_clients"
                title="Client Logos"
                columns={[
                    { key: 'name', label: 'Client Name', type: 'text' },
                    { key: 'logo_url', label: 'Logo URL', type: 'text' },
                    { key: 'sort_order', label: 'Sort Order', type: 'number' },
                    { key: 'is_active', label: 'Active', type: 'boolean' }
                ]}
                defaultSort="sort_order"
            />
        </div>
    )
}
