'use client';
import AdminCrud from '@/components/admin/AdminCrud';

export default function AdminArticlesPage() {
  return (
    <AdminCrud
      tableName="articles"
      title="Articles"
      displayColumns={['title', 'slug', 'category', 'is_published']}
      fields={[
        { key: 'title', label: 'Title', type: 'text', required: true },
        { key: 'slug', label: 'URL Slug', type: 'text', required: true },
        { key: 'category', label: 'Category', type: 'text', placeholder: 'CONVERSION, AI, STRATEGY, etc.' },
        { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
        { key: 'body', label: 'Body (Markdown)', type: 'markdown', placeholder: '# Article Title\n\nWrite your article in Markdown...' },
        { key: 'read_time', label: 'Read Time', type: 'text', placeholder: '5 min read' },
        { key: 'image', label: 'Cover Image/Video', type: 'media' },
        { key: 'is_featured', label: 'Featured', type: 'boolean' },
        { key: 'is_published', label: 'Published', type: 'boolean' },
        { key: 'sort_order', label: 'Sort Order', type: 'number' },
      ]}
    />
  );
}
