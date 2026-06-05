'use client';

import { useEffect, useState, useCallback } from 'react';
import { CheckCircle, XCircle, PauseCircle, RefreshCw, ExternalLink, ChevronRight, Copy } from 'lucide-react';

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

const STATUS_OPTIONS = ['pending', 'approved', 'suspended', 'rejected'] as const;
type Status = typeof STATUS_OPTIONS[number];

const STATUS_META: Record<Status, { bg: string; text: string; border: string; label: string }> = {
    pending: { bg: 'rgba(212,175,106,0.12)', text: '#D4AF6A', border: 'rgba(212,175,106,0.3)', label: 'Pending Review' },
    approved: { bg: 'rgba(76,175,80,0.12)', text: '#4CAF50', border: 'rgba(76,175,80,0.3)', label: 'Active' },
    suspended: { bg: 'rgba(241,196,15,0.12)', text: '#F1C40F', border: 'rgba(241,196,15,0.3)', label: 'Suspended' },
    rejected: { bg: 'rgba(231,76,60,0.12)', text: '#E74C3C', border: 'rgba(231,76,60,0.3)', label: 'Rejected' },
};

const fmt = (n: number) => `$${(n || 0).toLocaleString('en-US', { minimumFractionDigits: 0 })}`;
const fmtDate = (s: string) => new Date(s).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
const fmtPct = (r: number) => `${((r || 0.1) * 100).toFixed(0)}%`;

export default function AffiliatesAdminPage() {
    const [affiliates, setAffiliates] = useState<Affiliate[]>([]);
    const [filter, setFilter] = useState('all');
    const [selected, setSelected] = useState<Affiliate | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<string | null>(null);
    const [copied, setCopied] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // ── Fetch via /api/affiliates (uses service key, bypasses RLS) ──
    const load = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const url = filter === 'all' ? '/api/affiliates' : `/api/affiliates?status=${filter}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            if (Array.isArray(data)) {
                setAffiliates(data);
            } else {
                setError(data.error || 'Failed to load affiliates.');
            }
        } catch (e) {
            setError(String(e));
        }
        setLoading(false);
    }, [filter]);

    useEffect(() => { load(); }, [load]);

    // ── Status update via PATCH /api/affiliates ──
    const updateStatus = async (id: string, status: string) => {
        setUpdating(id);
        await fetch('/api/affiliates', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id, status }),
        });
        setUpdating(null);
        load();
        if (selected?.id === id) setSelected(a => a ? { ...a, status } : null);
    };

    const copyCode = (code: string) => {
        navigator.clipboard.writeText(code);
        setCopied(code);
        setTimeout(() => setCopied(null), 2000);
    };

    // ── Aggregate stats ──
    const counts = { total: affiliates.length, approved: 0, pending: 0, suspended: 0, rejected: 0 };
    let totalEarned = 0, totalPaid = 0;
    for (const a of affiliates) {
        counts[a.status as keyof typeof counts] = (counts[a.status as keyof typeof counts] || 0) + 1;
        totalEarned += a.total_earned || 0;
        totalPaid += a.total_paid || 0;
    }

    return (
        <div>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28 }}>
                <div>
                    <h1 style={{ fontSize: 22, fontWeight: 700, color: '#F2F0EB', margin: 0 }}>Partner Affiliates</h1>
                    <p style={{ fontSize: 12, color: '#5A5753', marginTop: 4 }}>Manage partner applications, referral codes and commission status.</p>
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button
                        onClick={load}
                        title="Refresh"
                        style={{ background: '#18181C', border: '1px solid #262630', color: '#9B9793', padding: '8px 12px', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
                    >
                        <RefreshCw size={14} />
                    </button>
                    <a href="/partners" target="_blank" style={{
                        background: 'rgba(212,175,106,0.1)', border: '1px solid rgba(212,175,106,0.25)',
                        color: '#D4AF6A', padding: '8px 16px', borderRadius: 8, fontSize: 12,
                        fontWeight: 600, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6,
                    }}>
                        <ExternalLink size={12} /> Partner Page
                    </a>
                </div>
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginBottom: 24 }}>
                {[
                    { label: 'Total Partners', value: counts.total },
                    { label: 'Active', value: counts.approved, accent: STATUS_META.approved.text },
                    { label: 'Pending Review', value: counts.pending, accent: STATUS_META.pending.text },
                    { label: 'Commission Earned', value: fmt(totalEarned) },
                    { label: 'Commission Paid', value: fmt(totalPaid) },
                ].map(stat => (
                    <div key={stat.label} style={{ background: '#111114', border: '1px solid #262630', borderRadius: 10, padding: '14px 18px' }}>
                        <div style={{ fontSize: 10, color: '#5A5753', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{stat.label}</div>
                        <div style={{ fontSize: 22, fontWeight: 700, color: (stat as any).accent || '#F2F0EB' }}>{stat.value}</div>
                    </div>
                ))}
            </div>

            {/* Filters */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
                {(['all', ...STATUS_OPTIONS] as string[]).map(s => (
                    <button key={s} onClick={() => setFilter(s)} style={{
                        padding: '5px 13px', borderRadius: 6, border: '1px solid',
                        fontSize: 11, fontWeight: 600, cursor: 'pointer', textTransform: 'capitalize', letterSpacing: '0.04em',
                        background: filter === s ? 'rgba(212,175,106,0.1)' : 'transparent',
                        borderColor: filter === s ? '#D4AF6A' : '#262630',
                        color: filter === s ? '#D4AF6A' : '#5A5753',
                        transition: 'all 0.15s',
                    }}>
                        {s === 'all' ? 'All' : STATUS_META[s as Status]?.label || s}
                    </button>
                ))}
            </div>

            {error && (
                <div style={{ background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.3)', color: '#E74C3C', padding: '10px 16px', borderRadius: 8, marginBottom: 16, fontSize: 13 }}>
                    Error: {error}
                </div>
            )}

            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                {/* Table */}
                <div style={{ flex: 1, background: '#111114', border: '1px solid #262630', borderRadius: 10, overflow: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 720 }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #1a1a1f' }}>
                                {['Partner', 'Referral Code', 'Source', 'Commission', 'Status', 'Joined', 'Actions'].map(h => (
                                    <th key={h} style={{ padding: '11px 16px', textAlign: 'left', fontSize: 10, color: '#5A5753', textTransform: 'uppercase', letterSpacing: '0.07em', fontWeight: 600, whiteSpace: 'nowrap' }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr><td colSpan={7} style={{ padding: 32, textAlign: 'center', color: '#5A5753', fontSize: 13 }}>Loading affiliates…</td></tr>
                            ) : affiliates.length === 0 ? (
                                <tr><td colSpan={7} style={{ padding: 32, textAlign: 'center', color: '#5A5753', fontSize: 13 }}>
                                    {filter === 'all' ? 'No affiliate applications yet.' : `No ${filter} affiliates.`}
                                </td></tr>
                            ) : affiliates.map(a => {
                                const sm = STATUS_META[a.status as Status] || STATUS_META.pending;
                                const isUpdating = updating === a.id;
                                return (
                                    <tr
                                        key={a.id}
                                        onClick={() => setSelected(a)}
                                        style={{ borderBottom: '1px solid #1a1a1f', cursor: 'pointer', transition: 'background 0.1s', background: selected?.id === a.id ? 'rgba(212,175,106,0.04)' : undefined }}
                                    >
                                        <td style={{ padding: '12px 16px' }}>
                                            <div style={{ fontSize: 13, fontWeight: 600, color: '#F2F0EB' }}>{a.first_name} {a.last_name}</div>
                                            <div style={{ fontSize: 11, color: '#5A5753', marginTop: 2 }}>{a.email}</div>
                                            {a.company_name && <div style={{ fontSize: 10, color: '#3a3835', marginTop: 1 }}>{a.company_name}</div>}
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                                <code style={{ fontSize: 12, background: 'rgba(212,175,106,0.08)', color: '#D4AF6A', padding: '3px 8px', borderRadius: 4, letterSpacing: '0.06em' }}>
                                                    {a.referral_code}
                                                </code>
                                                <button
                                                    onClick={e => { e.stopPropagation(); copyCode(a.referral_code); }}
                                                    title="Copy code"
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, color: copied === a.referral_code ? '#4CAF50' : '#5A5753' }}
                                                >
                                                    <Copy size={11} />
                                                </button>
                                            </div>
                                        </td>
                                        <td style={{ padding: '12px 16px', fontSize: 12, color: '#9B9793' }}>
                                            {a.referral_source || '—'}
                                        </td>
                                        <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 600, color: '#F2F0EB' }}>
                                            {fmtPct(a.commission_rate)}
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <span style={{ background: sm.bg, color: sm.text, border: `1px solid ${sm.border}`, padding: '3px 10px', borderRadius: 12, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
                                                {sm.label}
                                            </span>
                                        </td>
                                        <td style={{ padding: '12px 16px', fontSize: 12, color: '#5A5753', whiteSpace: 'nowrap' }}>
                                            {fmtDate(a.created_at)}
                                        </td>
                                        <td style={{ padding: '12px 16px' }}>
                                            <div style={{ display: 'flex', gap: 6, alignItems: 'center' }} onClick={e => e.stopPropagation()}>
                                                {a.status !== 'approved' && (
                                                    <button
                                                        onClick={() => updateStatus(a.id, 'approved')}
                                                        disabled={isUpdating}
                                                        title="Approve"
                                                        style={{ background: 'rgba(76,175,80,0.12)', border: '1px solid rgba(76,175,80,0.3)', color: '#4CAF50', padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                                                    >
                                                        <CheckCircle size={12} /> Approve
                                                    </button>
                                                )}
                                                {a.status !== 'rejected' && (
                                                    <button
                                                        onClick={() => updateStatus(a.id, 'rejected')}
                                                        disabled={isUpdating}
                                                        title="Reject"
                                                        style={{ background: 'rgba(231,76,60,0.1)', border: '1px solid rgba(231,76,60,0.2)', color: '#E74C3C', padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}
                                                    >
                                                        <XCircle size={12} /> Reject
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => setSelected(a)}
                                                    style={{ background: 'none', border: 'none', color: '#5A5753', cursor: 'pointer', padding: 4 }}
                                                >
                                                    <ChevronRight size={14} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Detail Panel */}
                {selected && (
                    <div style={{ width: 340, background: '#111114', border: '1px solid #262630', borderRadius: 10, padding: 22, flexShrink: 0, overflowY: 'auto', maxHeight: '80vh', position: 'sticky', top: 20 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
                            <div>
                                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#F2F0EB', margin: 0 }}>{selected.first_name} {selected.last_name}</h3>
                                <p style={{ fontSize: 11, color: '#5A5753', marginTop: 3 }}>{selected.company_name || 'Individual Partner'}</p>
                            </div>
                            <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#5A5753', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>×</button>
                        </div>

                        {/* Referral Code */}
                        <div style={{ marginBottom: 18, background: 'rgba(212,175,106,0.06)', border: '1px solid rgba(212,175,106,0.18)', borderRadius: 8, padding: '11px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <div style={{ fontSize: 9, color: '#5A5753', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>Referral Code</div>
                                <code style={{ fontSize: 14, fontWeight: 700, color: '#D4AF6A', letterSpacing: '0.08em' }}>{selected.referral_code}</code>
                            </div>
                            <button
                                onClick={() => copyCode(selected.referral_code)}
                                style={{ background: 'rgba(212,175,106,0.1)', border: '1px solid rgba(212,175,106,0.2)', color: copied === selected.referral_code ? '#4CAF50' : '#D4AF6A', padding: '6px 10px', borderRadius: 6, cursor: 'pointer', fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}
                            >
                                <Copy size={11} /> {copied === selected.referral_code ? 'Copied!' : 'Copy'}
                            </button>
                        </div>

                        {/* Status Quick Actions */}
                        <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                            {(STATUS_OPTIONS.filter(s => s !== selected.status) as Status[]).map(s => {
                                const icons: Record<string, React.ReactNode> = { approved: <CheckCircle size={11} />, rejected: <XCircle size={11} />, suspended: <PauseCircle size={11} /> };
                                const sm = STATUS_META[s];
                                return (
                                    <button key={s}
                                        onClick={() => updateStatus(selected.id, s)}
                                        disabled={!!updating}
                                        style={{ flex: 1, background: sm.bg, border: `1px solid ${sm.border}`, color: sm.text, padding: '7px 10px', borderRadius: 7, fontSize: 10, fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}
                                    >
                                        {icons[s]} {sm.label}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Info Fields */}
                        {[
                            { label: 'Email', value: selected.email },
                            { label: 'Payout Email', value: selected.payout_email },
                            { label: 'Website', value: selected.website },
                            { label: 'Referral Source', value: selected.referral_source },
                            { label: 'Commission Rate', value: fmtPct(selected.commission_rate) },
                            { label: 'Total Earned', value: fmt(selected.total_earned) },
                            { label: 'Total Paid Out', value: fmt(selected.total_paid) },
                            { label: 'Joined', value: fmtDate(selected.created_at) },
                        ].map(f => (
                            <div key={f.label} style={{ marginBottom: 12 }}>
                                <div style={{ fontSize: 9, color: '#5A5753', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>{f.label}</div>
                                <div style={{ fontSize: 12, color: f.value ? '#F2F0EB' : '#3a3835' }}>
                                    {f.value && f.label === 'Website' ? (
                                        <a href={f.value} target="_blank" rel="noreferrer" style={{ color: '#5B8DEF', textDecoration: 'none' }}>{f.value}</a>
                                    ) : (f.value || '—')}
                                </div>
                            </div>
                        ))}

                        {/* Referrals */}
                        {(selected.referrals?.length ?? 0) > 0 && (
                            <div style={{ marginTop: 16 }}>
                                <div style={{ fontSize: 10, color: '#5A5753', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Referrals ({selected.referrals!.length})</div>
                                {selected.referrals!.map(r => (
                                    <div key={r.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: '#18181C', borderRadius: 6, marginBottom: 5 }}>
                                        <span style={{ fontSize: 11, fontWeight: 700, color: '#9B9793', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{r.status}</span>
                                        <span style={{ fontSize: 12, color: '#F2F0EB', fontWeight: 600 }}>{r.commission_amount != null ? fmt(r.commission_amount) : '—'}</span>
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
