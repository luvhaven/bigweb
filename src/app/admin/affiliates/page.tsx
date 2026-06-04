'use client';

import { useEffect, useState, useCallback } from 'react';
import { createBrowserClient } from '@/lib/supabase';

interface Affiliate {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    company_name: string | null;
    website: string | null;
    referral_code: string;
    status: string;
    commission_rate: number;
    total_earned: number;
    total_paid: number;
    payout_email: string | null;
    referral_source: string | null;
    created_at: string;
    referrals?: Array<{ id: string; status: string; contract_value: number | null; commission_amount: number | null }>;
}

const STATUS_OPTIONS = ['pending', 'approved', 'suspended', 'rejected'];
const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
    pending: { bg: 'rgba(212,175,106,0.15)', text: '#D4AF6A' },
    approved: { bg: 'rgba(76,175,80,0.15)', text: '#4CAF50' },
    suspended: { bg: 'rgba(231,76,60,0.15)', text: '#E74C3C' },
    rejected: { bg: 'rgba(90,87,83,0.2)', text: '#5A5753' },
};

const REFERRAL_COLORS: Record<string, string> = {
    pending: '#D4AF6A',
    qualified: '#5B8DEF',
    converted: '#4CAF50',
    paid: '#1ABC9C',
    rejected: '#E74C3C',
    clawback: '#E74C3C',
};

export default function AffiliatesAdminPage() {
    const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
    const [filter, setFilter] = useState('all');
    const [selected, setSelected] = useState<Affiliate | null>(null);
    const [loading, setLoading] = useState(true);

    const load = useCallback(async () => {
        setLoading(true);
        const supabase = createBrowserClient();
        let query = supabase
            .from('affiliates')
            .select('*, referrals(id, status, contract_value, commission_amount)')
            .order('created_at', { ascending: false });
        if (filter !== 'all') query = query.eq('status', filter);
        const { data } = await query;
        setAffiliates(data || []);
        setLoading(false);
    }, [filter]);

    useEffect(() => { load(); }, [load]);

    const updateStatus = async (id: string, status: string) => {
        const supabase = createBrowserClient();
        await supabase.from('affiliates').update({ status }).eq('id', id);
        load();
        if (selected?.id === id) setSelected(a => a ? { ...a, status } : null);
    };

    const totalEarned = affiliates.reduce((sum, a) => sum + (a.total_earned || 0), 0);
    const totalPaid = affiliates.reduce((sum, a) => sum + (a.total_paid || 0), 0);
    const approved = affiliates.filter(a => a.status === 'approved').length;

    const fmt = (n: number) => `$${n.toLocaleString('en-US', { minimumFractionDigits: 0 })}`;

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <h1 style={{ fontSize: 24, fontWeight: 700, color: '#F2F0EB' }}>Partner Affiliates</h1>
                <a href="/partners" target="_blank" style={{
                    background: 'rgba(212,175,106,0.1)', border: '1px solid rgba(212,175,106,0.25)',
                    color: '#D4AF6A', padding: '8px 18px', borderRadius: 8,
                    fontSize: 12, fontWeight: 600, textDecoration: 'none', letterSpacing: '0.05em',
                }}>
                    View Partner Page ↗
                </a>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
                {[
                    { label: 'Total Partners', value: affiliates.length.toString() },
                    { label: 'Active Partners', value: approved.toString() },
                    { label: 'Commission Earned', value: fmt(totalEarned) },
                    { label: 'Commission Paid', value: fmt(totalPaid) },
                ].map(s => (
                    <div key={s.label} style={{ background: '#111114', border: '1px solid #262630', borderRadius: 10, padding: '16px 20px' }}>
                        <div style={{ fontSize: 11, color: '#5A5753', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{s.label}</div>
                        <div style={{ fontSize: 22, fontWeight: 700, color: '#F2F0EB' }}>{s.value}</div>
                    </div>
                ))}
            </div>

            {/* Filter */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                {['all', ...STATUS_OPTIONS].map(s => (
                    <button key={s} onClick={() => setFilter(s)} style={{
                        padding: '6px 14px', borderRadius: 6, border: '1px solid',
                        fontSize: 11, fontWeight: 600, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em',
                        background: filter === s ? 'rgba(212,175,106,0.1)' : 'transparent',
                        borderColor: filter === s ? '#D4AF6A' : '#262630',
                        color: filter === s ? '#D4AF6A' : '#5A5753',
                    }}>{s}</button>
                ))}
            </div>

            <div style={{ display: 'flex', gap: 20 }}>
                {/* Table */}
                <div style={{ flex: 1, background: '#111114', border: '1px solid #262630', borderRadius: 10, overflow: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #262630' }}>
                                {['Partner', 'Referral Code', 'Referrals', 'Earned', 'Status', 'Joined', ''].map(h => (
                                    <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 11, color: '#5A5753', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={7} style={{ padding: 24, textAlign: 'center', color: '#5A5753', fontSize: 13 }}>Loading…</td></tr>
                            ) : affiliates.length === 0 ? (
                                <tr><td colSpan={7} style={{ padding: 24, textAlign: 'center', color: '#5A5753', fontSize: 13 }}>No affiliates found.</td></tr>
                            ) : affiliates.map(a => (
                                <tr
                                    key={a.id}
                                    onClick={() => setSelected(a)}
                                    style={{ borderBottom: '1px solid #1a1a1f', cursor: 'pointer', background: selected?.id === a.id ? 'rgba(212,175,106,0.04)' : undefined }}
                                >
                                    <td style={{ padding: '12px 16px' }}>
                                        <div style={{ fontSize: 13, fontWeight: 600, color: '#F2F0EB' }}>{a.first_name} {a.last_name}</div>
                                        <div style={{ fontSize: 11, color: '#5A5753', marginTop: 2 }}>{a.email}</div>
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <code style={{ fontSize: 12, background: 'rgba(212,175,106,0.08)', color: '#D4AF6A', padding: '3px 8px', borderRadius: 4, letterSpacing: '0.05em' }}>
                                            {a.referral_code}
                                        </code>
                                    </td>
                                    <td style={{ padding: '12px 16px', fontSize: 13, color: '#9B9793' }}>
                                        {a.referrals?.length ?? 0}
                                    </td>
                                    <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#F2F0EB' }}>
                                        {fmt(a.total_earned || 0)}
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <select
                                            value={a.status}
                                            onChange={e => { e.stopPropagation(); updateStatus(a.id, e.target.value); }}
                                            onClick={e => e.stopPropagation()}
                                            style={{
                                                background: STATUS_COLORS[a.status]?.bg,
                                                color: STATUS_COLORS[a.status]?.text,
                                                border: 'none', borderRadius: 4, padding: '4px 8px',
                                                fontSize: 11, fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase',
                                            }}
                                        >
                                            {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                        </select>
                                    </td>
                                    <td style={{ padding: '12px 16px', fontSize: 12, color: '#5A5753' }}>
                                        {new Date(a.created_at).toLocaleDateString()}
                                    </td>
                                    <td style={{ padding: '12px 16px' }}>
                                        <button
                                            onClick={e => { e.stopPropagation(); setSelected(a); }}
                                            style={{ background: 'none', border: 'none', color: '#5A5753', cursor: 'pointer', fontSize: 12 }}
                                        >
                                            View →
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Detail Drawer */}
                {selected && (
                    <div style={{ width: 340, background: '#111114', border: '1px solid #262630', borderRadius: 10, padding: 24, flexShrink: 0, overflow: 'auto', maxHeight: '80vh' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20, alignItems: 'flex-start' }}>
                            <div>
                                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#F2F0EB' }}>{selected.first_name} {selected.last_name}</h3>
                                <p style={{ fontSize: 12, color: '#5A5753', marginTop: 2 }}>{selected.company_name || 'Individual Partner'}</p>
                            </div>
                            <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#5A5753', cursor: 'pointer', fontSize: 20, lineHeight: 1 }}>×</button>
                        </div>

                        <div style={{ marginBottom: 20, background: 'rgba(212,175,106,0.06)', border: '1px solid rgba(212,175,106,0.2)', borderRadius: 8, padding: '12px 14px' }}>
                            <div style={{ fontSize: 10, color: '#5A5753', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Referral Code</div>
                            <code style={{ fontSize: 15, fontWeight: 700, color: '#D4AF6A', letterSpacing: '0.1em' }}>{selected.referral_code}</code>
                        </div>

                        {[
                            { label: 'Email', value: selected.email },
                            { label: 'Payout Email', value: selected.payout_email },
                            { label: 'Website', value: selected.website },
                            { label: 'Source', value: selected.referral_source },
                            { label: 'Commission Rate', value: `${((selected.commission_rate || 0.1) * 100).toFixed(0)}%` },
                            { label: 'Total Earned', value: fmt(selected.total_earned || 0) },
                            { label: 'Total Paid Out', value: fmt(selected.total_paid || 0) },
                        ].map(f => (
                            <div key={f.label} style={{ marginBottom: 14 }}>
                                <div style={{ fontSize: 10, color: '#5A5753', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 3 }}>{f.label}</div>
                                <div style={{ fontSize: 13, color: f.value ? '#F2F0EB' : '#5A5753' }}>{f.value || '—'}</div>
                            </div>
                        ))}

                        {/* Referrals List */}
                        {(selected.referrals?.length ?? 0) > 0 && (
                            <div style={{ marginTop: 20 }}>
                                <div style={{ fontSize: 11, color: '#5A5753', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>Referrals ({selected.referrals!.length})</div>
                                {selected.referrals!.map(r => (
                                    <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: '#18181C', borderRadius: 6, marginBottom: 6 }}>
                                        <div style={{ fontSize: 12, color: REFERRAL_COLORS[r.status] || '#9B9793', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{r.status}</div>
                                        <div style={{ fontSize: 12, color: '#F2F0EB', fontWeight: 600 }}>{r.commission_amount != null ? fmt(r.commission_amount) : '—'}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
