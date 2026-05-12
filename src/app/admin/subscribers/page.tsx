'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@/lib/supabase';

interface Subscriber { id: string; email: string; is_active: boolean; created_at: string; }

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    async function load() {
      const supabase = createBrowserClient();
      const { data } = await supabase.from('subscribers').select('*').order('created_at', { ascending: false });
      setSubscribers(data || []);
    }
    load();
  }, []);

  async function toggleActive(id: string, isActive: boolean) {
    const supabase = createBrowserClient();
    await supabase.from('subscribers').update({ is_active: !isActive }).eq('id', id);
    setSubscribers(prev => prev.map(s => s.id === id ? { ...s, is_active: !isActive } : s));
  }

  async function deleteSub(id: string) {
    if (!confirm('Remove this subscriber?')) return;
    const supabase = createBrowserClient();
    await supabase.from('subscribers').delete().eq('id', id);
    setSubscribers(prev => prev.filter(s => s.id !== id));
  }

  function exportCSV() {
    const csv = 'Email,Status,Date\n' + subscribers.map(s => `${s.email},${s.is_active ? 'active' : 'inactive'},${new Date(s.created_at).toLocaleDateString()}`).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'subscribers.csv'; a.click();
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, color: '#F2F0EB' }}>Subscribers</h1>
          <p style={{ color: '#5A5753', fontSize: 13 }}>{subscribers.length} total</p>
        </div>
        <button onClick={exportCSV} style={{ padding: '8px 16px', background: '#18181C', border: '1px solid #262630', borderRadius: 6, color: '#9B9793', fontSize: 12, cursor: 'pointer' }}>Export CSV</button>
      </div>

      <div style={{ background: '#111114', border: '1px solid #262630', borderRadius: 10, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #262630' }}>
              {['Email', 'Status', 'Date', ''].map(h => (
                <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, color: '#5A5753', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {subscribers.map(sub => (
              <tr key={sub.id} style={{ borderBottom: '1px solid #1a1a1f' }}>
                <td style={{ padding: '12px 16px', fontSize: 13, color: '#F2F0EB' }}>{sub.email}</td>
                <td style={{ padding: '12px 16px' }}>
                  <button onClick={() => toggleActive(sub.id, sub.is_active)} style={{
                    background: sub.is_active ? 'rgba(42,122,74,0.2)' : 'rgba(122,42,42,0.2)',
                    color: sub.is_active ? '#4CAF50' : '#E74C3C',
                    border: 'none', borderRadius: 4, padding: '3px 8px', fontSize: 11, fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase',
                  }}>{sub.is_active ? 'Active' : 'Inactive'}</button>
                </td>
                <td style={{ padding: '12px 16px', fontSize: 12, color: '#5A5753' }}>{new Date(sub.created_at).toLocaleDateString()}</td>
                <td style={{ padding: '12px 16px' }}>
                  <button onClick={() => deleteSub(sub.id)} style={{ background: 'none', border: 'none', color: '#5A5753', cursor: 'pointer', fontSize: 14 }}>×</button>
                </td>
              </tr>
            ))}
            {subscribers.length === 0 && (
              <tr><td colSpan={4} style={{ padding: 24, textAlign: 'center', color: '#5A5753', fontSize: 13 }}>No subscribers yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
