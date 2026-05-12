'use client';
import AdminCrud from '@/components/admin/AdminCrud';

export default function AdminServicesPage() {
  return (
    <AdminCrud
      tableName="services"
      title="Services"
      displayColumns={['name', 'slug', 'tier', 'price', 'is_published']}
      fields={[
        { key: 'name', label: 'Service Name', type: 'text', required: true },
        { key: 'slug', label: 'URL Slug', type: 'text', required: true, placeholder: 'e.g. conversion-audit' },
        { key: 'tier', label: 'Tier', type: 'select', options: ['1', '2', '3'] },
        { key: 'tier_label', label: 'Tier Label', type: 'text', placeholder: 'e.g. TIER 01 — QUICK WINS' },
        { key: 'tier_headline', label: 'Tier Headline', type: 'text' },
        { key: 'tier_description', label: 'Tier Description', type: 'textarea' },
        { key: 'outcome', label: 'Outcome (short)', type: 'text' },
        { key: 'price', label: 'Price', type: 'text' },
        { key: 'timeline', label: 'Timeline', type: 'text' },
        { key: 'hero_subtitle', label: 'Hero Subtitle', type: 'textarea' },
        { key: 'description', label: 'Full Description', type: 'textarea' },
        { key: 'features', label: 'Features (JSON array)', type: 'json', placeholder: '["Feature 1", "Feature 2"]' },
        { key: 'results', label: 'Results (JSON array)', type: 'json', placeholder: '[{"metric":"+288%","label":"Revenue increase"}]' },
        { key: 'process', label: 'Process Steps (JSON array)', type: 'json', placeholder: '[{"step":"01","title":"Audit","desc":"..."}]' },
        { key: 'sort_order', label: 'Sort Order', type: 'number' },
        { key: 'is_published', label: 'Published', type: 'boolean' },
      ]}
    />
  );
}
