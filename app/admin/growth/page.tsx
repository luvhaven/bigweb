'use client'

import GenericAdminTable from '@/components/admin/GenericAdminTable'

export default function AdminGrowthPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white">Growth Packages & Campaigns</h1>
                    <p className="text-zinc-400">Manage landing page offers like /newyear and /ai-boost.</p>
                </div>
            </div>

            <GenericAdminTable
                tableName="cms_growth_packages"
                title="Growth Packages"
                columns={[
                    { key: 'title', label: 'Package Title', type: 'text' },
                    { key: 'slug', label: 'URL Slug', type: 'text' },
                    { key: 'price_display', label: 'Price', type: 'text' },
                    { key: 'cta_link', label: 'CTA Link', type: 'text' },
                    { key: 'description', label: 'Description', type: 'text' },
                    { key: 'features', label: 'Features (JSON)', type: 'json' },
                    { key: 'is_featured', label: 'Featured', type: 'boolean' },
                    { key: 'is_active', label: 'Active', type: 'boolean' }
                ]}
                defaultSort="sort_order"
            />
        </div>
    )
}
