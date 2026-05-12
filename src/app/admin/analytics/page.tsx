'use client';

import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { ArrowUpRight, Users, Eye, MousePointerClick, Zap, ArrowDownRight } from 'lucide-react';

const TRAFFIC_DATA = [
  { date: 'Oct 01', views: 4000, visitors: 2400 },
  { date: 'Oct 05', views: 3000, visitors: 1398 },
  { date: 'Oct 10', views: 2000, visitors: 9800 },
  { date: 'Oct 15', views: 2780, visitors: 3908 },
  { date: 'Oct 20', views: 1890, visitors: 4800 },
  { date: 'Oct 25', views: 2390, visitors: 3800 },
  { date: 'Oct 30', views: 3490, visitors: 4300 },
];

const CONVERSION_DATA = [
  { name: 'Week 1', leads: 40, sales: 24 },
  { name: 'Week 2', leads: 30, sales: 13 },
  { name: 'Week 3', leads: 20, sales: 98 },
  { name: 'Week 4', leads: 27, sales: 39 },
];

const SOURCES_DATA = [
  { name: 'Organic Search', value: 400 },
  { name: 'Direct', value: 300 },
  { name: 'Social Media', value: 300 },
  { name: 'Referral', value: 200 },
];

const COLORS = ['#D4AF6A', '#9B9793', '#F2F0EB', '#262630'];

export default function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState('30d');

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', color: '#F2F0EB', fontFamily: 'var(--font-inter)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 600, margin: '0 0 8px 0' }}>Analytics Overview</h1>
          <p style={{ color: '#9B9793', margin: 0, fontSize: 14 }}>Monitor your revenue and traffic metrics.</p>
        </div>
        <div style={{ display: 'flex', gap: 8, background: '#111114', padding: 4, borderRadius: 8, border: '1px solid #262630' }}>
          {['7d', '30d', '90d', '1y'].map((t) => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              style={{
                background: timeframe === t ? '#D4AF6A' : 'transparent',
                color: timeframe === t ? '#0A0A0B' : '#9B9793',
                border: 'none',
                padding: '6px 12px',
                borderRadius: 4,
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {t.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 32 }}>
        {[
          { label: 'Total Revenue (Est)', value: '$142,500', trend: '+14.5%', positive: true, icon: Zap },
          { label: 'Unique Visitors', value: '24,892', trend: '+5.2%', positive: true, icon: Users },
          { label: 'Total Page Views', value: '89,430', trend: '-1.4%', positive: false, icon: Eye },
          { label: 'Avg Conversion Rate', value: '4.8%', trend: '+2.1%', positive: true, icon: MousePointerClick },
        ].map((stat, i) => (
          <div key={i} style={{ background: '#111114', border: '1px solid #262630', padding: 20, borderRadius: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ color: '#9B9793', fontSize: 13, fontWeight: 500 }}>{stat.label}</span>
              <stat.icon size={16} color="#D4AF6A" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
              <span style={{ fontSize: 28, fontWeight: 700, color: '#F2F0EB' }}>{stat.value}</span>
              <span style={{ display: 'flex', alignItems: 'center', fontSize: 12, fontWeight: 600, color: stat.positive ? '#10B981' : '#EF4444' }}>
                {stat.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 32 }}>
        
        {/* Main Traffic Chart */}
        <div style={{ background: '#111114', border: '1px solid #262630', padding: 24, borderRadius: 12 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 24, color: '#F2F0EB' }}>Traffic Overview</h2>
          <div style={{ height: 300, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={TRAFFIC_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#D4AF6A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#D4AF6A" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F2F0EB" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#F2F0EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#262630" vertical={false} />
                <XAxis dataKey="date" stroke="#5A5753" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#5A5753" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0B', border: '1px solid #262630', borderRadius: 8, color: '#F2F0EB' }}
                  itemStyle={{ color: '#F2F0EB' }}
                />
                <Area type="monotone" dataKey="views" stroke="#D4AF6A" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
                <Area type="monotone" dataKey="visitors" stroke="#F2F0EB" strokeWidth={2} fillOpacity={1} fill="url(#colorVisitors)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Traffic Sources Pie */}
        <div style={{ background: '#111114', border: '1px solid #262630', padding: 24, borderRadius: 12 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 24, color: '#F2F0EB' }}>Traffic Sources</h2>
          <div style={{ height: 220, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={SOURCES_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {SOURCES_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0A0A0B', border: '1px solid #262630', borderRadius: 8 }}
                  itemStyle={{ color: '#F2F0EB' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
            {SOURCES_DATA.map((source, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 13 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: COLORS[i] }} />
                  <span style={{ color: '#9B9793' }}>{source.name}</span>
                </div>
                <span style={{ fontWeight: 600 }}>{source.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Core Web Vitals */}
        <div style={{ background: '#111114', border: '1px solid #262630', padding: 24, borderRadius: 12 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 24, color: '#F2F0EB' }}>Core Web Vitals</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { metric: 'Largest Contentful Paint (LCP)', value: '1.2s', status: 'Good', target: '< 2.5s' },
              { metric: 'First Input Delay (FID)', value: '42ms', status: 'Good', target: '< 100ms' },
              { metric: 'Cumulative Layout Shift (CLS)', value: '0.01', status: 'Good', target: '< 0.1' },
            ].map((vital, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 13 }}>
                  <span style={{ color: '#9B9793' }}>{vital.metric}</span>
                  <span style={{ color: '#10B981', fontWeight: 600 }}>{vital.value}</span>
                </div>
                <div style={{ width: '100%', height: 4, background: '#262630', borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: '85%', height: '100%', background: '#10B981', borderRadius: 2 }} />
                </div>
                <div style={{ fontSize: 11, color: '#5A5753', marginTop: 4 }}>Target: {vital.target}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Conversions Bar Chart */}
        <div style={{ background: '#111114', border: '1px solid #262630', padding: 24, borderRadius: 12 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 24, color: '#F2F0EB' }}>Conversions via Terminal</h2>
          <div style={{ height: 200, width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={CONVERSION_DATA} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#262630" vertical={false} />
                <XAxis dataKey="name" stroke="#5A5753" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#5A5753" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{ fill: 'rgba(212, 175, 106, 0.05)' }}
                  contentStyle={{ backgroundColor: '#0A0A0B', border: '1px solid #262630', borderRadius: 8 }}
                />
                <Bar dataKey="leads" fill="#262630" radius={[4, 4, 0, 0]} />
                <Bar dataKey="sales" fill="#D4AF6A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
}
