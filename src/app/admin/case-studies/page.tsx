'use client';
import AdminCrud from '@/components/admin/AdminCrud';

export default function AdminCaseStudiesPage() {
  return (
    <AdminCrud
      tableName="case_studies"
      title="Case Studies"
      displayColumns={['client', 'slug', 'metric', 'is_published']}
      fields={[
        { key: 'client', label: 'Client Name', type: 'text', required: true },
        { key: 'slug', label: 'URL Slug', type: 'text', required: true },
        { key: 'display_index', label: 'Display Index', type: 'text', placeholder: '01' },
        { key: 'location', label: 'Location', type: 'text' },
        { key: 'tags', label: 'Tags', type: 'string_array', placeholder: 'e.g. CRO, Next.js' },
        { key: 'problem', label: 'The Problem', type: 'textarea' },
        { key: 'delivered', label: 'What We Delivered', type: 'textarea' },
        { key: 'result', label: 'The Result', type: 'textarea' },
        { key: 'metric', label: 'Metric (e.g. +288%)', type: 'text' },
        { key: 'metric_label', label: 'Metric Label', type: 'text' },
        { key: 'timeline', label: 'Timeline', type: 'text' },
        { key: 'image', label: 'Cover Image/Video', type: 'media' },
        { key: 'full_content', label: 'Full Story', type: 'markdown' },
        { key: 'sort_order', label: 'Sort Order', type: 'number' },
        { key: 'is_published', label: 'Published', type: 'boolean' },
      ]}
    />
  );
}
