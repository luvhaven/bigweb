'use client';
import AdminCrud from '@/components/admin/AdminCrud';

export default function AdminTeamPage() {
  return (
    <AdminCrud
      tableName="team_members"
      title="Team Members"
      displayColumns={['name', 'role', 'sort_order', 'is_published']}
      fields={[
        { key: 'name', label: 'Full Name', type: 'text', required: true },
        { key: 'role', label: 'Role / Title', type: 'text', required: true },
        { key: 'bio', label: 'Bio', type: 'textarea' },
        { key: 'initials', label: 'Initials (fallback avatar)', type: 'text', placeholder: 'DO' },
        { key: 'image', label: 'Photo URL', type: 'media', placeholder: 'https://...' },
        { key: 'sort_order', label: 'Display Order', type: 'number' },
        { key: 'is_published', label: 'Published', type: 'boolean' },
      ]}
    />
  );
}
