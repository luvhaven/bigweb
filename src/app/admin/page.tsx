'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@/lib/supabase';
import { Users, Mail, Briefcase, FolderOpen, FileText, MessageSquare, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface DashboardStats {
  leads: number;
  newLeads: number;
  subscribers: number;
  services: number;
  caseStudies: number;
  articles: number;
  testimonials: number;
}

interface Lead {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  interest: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);

  useEffect(() => {
    async function load() {
      const supabase = createBrowserClient();

      const [leads, subs, services, cases, articles, testimonials] = await Promise.all([
        supabase.from('leads').select('id, status', { count: 'exact' }),
        supabase.from('subscribers').select('id', { count: 'exact' }),
        supabase.from('services').select('id', { count: 'exact' }),
        supabase.from('case_studies').select('id', { count: 'exact' }),
        supabase.from('articles').select('id', { count: 'exact' }),
        supabase.from('testimonials').select('id', { count: 'exact' }),
      ]);

      const newLeadCount = leads.data?.filter(l => l.status === 'new').length || 0;

      setStats({
        leads: leads.count || 0,
        newLeads: newLeadCount,
        subscribers: subs.count || 0,
        services: services.count || 0,
        caseStudies: cases.count || 0,
        articles: articles.count || 0,
        testimonials: testimonials.count || 0,
      });

      const { data: recent } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      setRecentLeads(recent || []);
    }
    load();
  }, []);

  const statCards = stats ? [
    { label: 'Total Leads', value: stats.leads, icon: Users, color: '#D4AF6A', href: '/admin/leads' },
    { label: 'New Leads', value: stats.newLeads, icon: TrendingUp, color: '#2A7A4A', href: '/admin/leads' },
    { label: 'Subscribers', value: stats.subscribers, icon: Mail, color: '#5B8DEF', href: '/admin/subscribers' },
    { label: 'Services', value: stats.services, icon: Briefcase, color: '#B8923F', href: '/admin/services' },
    { label: 'Case Studies', value: stats.caseStudies, icon: FolderOpen, color: '#9B59B6', href: '/admin/case-studies' },
    { label: 'Articles', value: stats.articles, icon: FileText, color: '#E67E22', href: '/admin/articles' },
    { label: 'Testimonials', value: stats.testimonials, icon: MessageSquare, color: '#1ABC9C', href: '/admin/testimonials' },
  ] : [];

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 700, color: '#F2F0EB', marginBottom: 8 }}>Dashboard</h1>
      <p style={{ color: '#5A5753', fontSize: 14, marginBottom: 32 }}>Overview of your agency management system</p>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16, marginBottom: 40 }}>
        {statCards.map(card => (
          <Link key={card.label} href={card.href} style={{ textDecoration: 'none' }}>
            <div style={{ background: '#111114', border: '1px solid #262630', borderRadius: 10, padding: '20px', transition: 'border-color 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = card.color)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = '#262630')}
            >
              <card.icon size={18} color={card.color} style={{ marginBottom: 12 }} />
              <div style={{ fontSize: 28, fontWeight: 700, color: '#F2F0EB', lineHeight: 1 }}>{card.value}</div>
              <div style={{ fontSize: 12, color: '#5A5753', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{card.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Leads */}
      <div style={{ background: '#111114', border: '1px solid #262630', borderRadius: 10, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #262630', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: '#F2F0EB' }}>Recent Leads</h2>
          <Link href="/admin/leads" style={{ fontSize: 12, color: '#D4AF6A', textDecoration: 'none' }}>View all →</Link>
        </div>
        {recentLeads.length === 0 ? (
          <p style={{ padding: 20, color: '#5A5753', fontSize: 13 }}>No leads yet. They will appear here once someone submits the contact form.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #262630' }}>
                {['Name', 'Email', 'Interest', 'Status', 'Date'].map(h => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 11, color: '#5A5753', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentLeads.map(lead => (
                <tr key={lead.id} style={{ borderBottom: '1px solid #1a1a1f' }}>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#F2F0EB' }}>{lead.first_name} {lead.last_name}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#9B9793' }}>{lead.email}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: '#9B9793' }}>{lead.interest || '—'}</td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 4,
                      background: lead.status === 'new' ? 'rgba(212,175,106,0.15)' : lead.status === 'qualified' ? 'rgba(42,122,74,0.2)' : 'rgba(90,87,83,0.2)',
                      color: lead.status === 'new' ? '#D4AF6A' : lead.status === 'qualified' ? '#2A7A4A' : '#9B9793',
                      textTransform: 'uppercase',
                    }}>{lead.status}</span>
                  </td>
                  <td style={{ padding: '12px 16px', fontSize: 12, color: '#5A5753' }}>{new Date(lead.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
