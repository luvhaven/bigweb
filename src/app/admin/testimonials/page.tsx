'use client';
import AdminCrud from '@/components/admin/AdminCrud';

export default function AdminTestimonialsPage() {
  return (
    <AdminCrud
      tableName="testimonials"
      title="Testimonials"
      displayColumns={['name', 'company', 'is_published']}
      fields={[
        { key: 'quote', label: 'Quote', type: 'textarea', required: true },
        { key: 'name', label: 'Client Name', type: 'text', required: true },
        { key: 'role', label: 'Role / Title', type: 'text' },
        { key: 'company', label: 'Company', type: 'text' },
        { key: 'initials', label: 'Initials', type: 'text', placeholder: 'AO' },
        { key: 'avatar', label: 'Avatar/Profile Image', type: 'media' },
        { key: 'sort_order', label: 'Sort Order', type: 'number' },
        { key: 'is_published', label: 'Published', type: 'boolean' },
      ]}
    />
  );
}
