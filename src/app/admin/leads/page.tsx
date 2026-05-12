'use client';

import { useEffect, useState, useCallback } from 'react';
import { createBrowserClient } from '@/lib/supabase';

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  company: string | null;
  website: string | null;
  revenue_range: string | null;
  interest: string | null;
  message: string | null;
  status: string;
  notes: string | null;
  created_at: string;
}

const STATUS_OPTIONS = ['new', 'contacted', 'qualified', 'proposal', 'closed', 'lost'];
const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  new: { bg: 'rgba(212,175,106,0.15)', text: '#D4AF6A' },
  contacted: { bg: 'rgba(91,141,239,0.15)', text: '#5B8DEF' },
  qualified: { bg: 'rgba(42,122,74,0.2)', text: '#4CAF50' },
  proposal: { bg: 'rgba(155,89,182,0.15)', text: '#9B59B6' },
  closed: { bg: 'rgba(26,188,156,0.15)', text: '#1ABC9C' },
  lost: { bg: 'rgba(122,42,42,0.2)', text: '#E74C3C' },
};

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<Lead | null>(null);

  const loadLeads = useCallback(async () => {
    const supabase = createBrowserClient();
    let query = supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (filter !== 'all') query = query.eq('status', filter);
    const { data } = await query;
    setLeads(data || []);
  }, [filter]);

  useEffect(() => { loadLeads(); }, [loadLeads]);

  async function updateStatus(id: string, status: string) {
    const supabase = createBrowserClient();
    await supabase.from('leads').update({ status }).eq('id', id);
    loadLeads();
    if (selected?.id === id) setSelected({ ...selected, status });
  }

  async function updateNotes(id: string, notes: string) {
    const supabase = createBrowserClient();
    await supabase.from('leads').update({ notes }).eq('id', id);
  }

  async function deleteLead(id: string) {
    if (!confirm('Delete this lead permanently?')) return;
    const supabase = createBrowserClient();
    await supabase.from('leads').delete().eq('id', id);
    setSelected(null);
    loadLeads();
  }

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#F2F0EB', marginBottom: 24 }}>Leads</h1>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {['all', ...STATUS_OPTIONS].map(s => (
          <button key={s} onClick={() => setFilter(s)} style={{
            padding: '6px 14px', borderRadius: 6, border: '1px solid', fontSize: 12, fontWeight: 500, cursor: 'pointer', textTransform: 'uppercase',
            background: filter === s ? 'rgba(212,175,106,0.1)' : 'transparent',
            borderColor: filter === s ? '#D4AF6A' : '#262630',
            color: filter === s ? '#D4AF6A' : '#5A5753',
          }}>{s}</button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 24 }}>
        {/* Table */}
        <div style={{ flex: 1, background: '#111114', border: '1px solid #262630', borderRadius: 10, overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #262630' }}>
                {['Name', 'Email', 'Interest', 'Status', 'Date', ''].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, color: '#5A5753', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {leads.map(lead => (
                <tr key={lead.id} onClick={() => setSelected(lead)} style={{ borderBottom: '1px solid #1a1a1f', cursor: 'pointer', background: selected?.id === lead.id ? 'rgba(212,175,106,0.04)' : undefined }}>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#F2F0EB', fontWeight: 500 }}>{lead.first_name} {lead.last_name}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#9B9793' }}>{lead.email}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#9B9793' }}>{lead.interest || '—'}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <select value={lead.status} onChange={e => { e.stopPropagation(); updateStatus(lead.id, e.target.value); }}
                      onClick={e => e.stopPropagation()}
                      style={{ background: STATUS_COLORS[lead.status]?.bg, color: STATUS_COLORS[lead.status]?.text, border: 'none', borderRadius: 4, padding: '4px 8px', fontSize: 11, fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase' }}>
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: '#5A5753' }}>{new Date(lead.created_at).toLocaleDateString()}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <button onClick={e => { e.stopPropagation(); deleteLead(lead.id); }} style={{ background: 'none', border: 'none', color: '#5A5753', cursor: 'pointer', fontSize: 14 }}>×</button>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr><td colSpan={6} style={{ padding: 24, textAlign: 'center', color: '#5A5753', fontSize: 13 }}>No leads found.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Detail Panel */}
        {selected && (
          <div style={{ width: 320, background: '#111114', border: '1px solid #262630', borderRadius: 10, padding: 24, flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#F2F0EB' }}>{selected.first_name} {selected.last_name}</h3>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#5A5753', cursor: 'pointer', fontSize: 18 }}>×</button>
            </div>
            {[
              { label: 'Email', value: selected.email },
              { label: 'Company', value: selected.company },
              { label: 'Website', value: selected.website },
              { label: 'Revenue', value: selected.revenue_range },
              { label: 'Interest', value: selected.interest },
              { label: 'Message', value: selected.message },
            ].map(f => (
              <div key={f.label} style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 11, color: '#5A5753', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>{f.label}</div>
                <div style={{ fontSize: 13, color: f.value ? '#F2F0EB' : '#5A5753' }}>{f.value || '—'}</div>
              </div>
            ))}
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 11, color: '#5A5753', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>Internal Notes</div>
              <textarea
                defaultValue={selected.notes || ''}
                onBlur={e => updateNotes(selected.id, e.target.value)}
                rows={4}
                style={{ width: '100%', background: '#18181C', border: '1px solid #262630', borderRadius: 6, color: '#F2F0EB', padding: 10, fontSize: 13, resize: 'vertical' }}
                placeholder="Add internal notes..."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
