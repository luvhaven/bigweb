'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { motion } from 'framer-motion'
import { 
    BarChart3, Users, Eye, TrendingUp, MousePointer, 
    Gauge, ArrowUpRight, ArrowDownRight, Activity, 
    Target, Zap, Globe
} from 'lucide-react'
import { 
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
    ResponsiveContainer, BarChart, Bar, Cell, PieChart, Pie 
} from 'recharts'

// Advanced Mock Data for Visualization
const trafficData = [
    { name: 'Mon', views: 400, leads: 24, rate: 4.2 },
    { name: 'Tue', views: 300, leads: 18, rate: 3.8 },
    { name: 'Wed', views: 600, leads: 42, rate: 5.1 },
    { name: 'Thu', views: 800, leads: 38, rate: 4.5 },
    { name: 'Fri', views: 700, leads: 45, rate: 4.8 },
    { name: 'Sat', views: 400, leads: 12, rate: 3.0 },
    { name: 'Sun', views: 500, leads: 28, rate: 4.0 },
]

const channelData = [
    { name: 'Direct', value: 45, color: '#FF4D00' },
    { name: 'Organic', value: 30, color: '#FF7A40' },
    { name: 'Referral', value: 15, color: '#FFA680' },
    { name: 'Social', value: 10, color: '#FFD3BF' },
]

export default function AnalyticsPage() {
    const supabase = createClient()
    const [stats, setStats] = useState({
        leads: 0,
        projects: 0,
        views: 4820,
        conversions: 142,
        avgSession: '4m 32s',
        bounceRate: '24.2%'
    })
    const [recentEvents, setRecentEvents] = useState<any[]>([])

    useEffect(() => {
        const fetchStats = async () => {
            const { count: leads } = await supabase.from('cms_leads').select('*', { count: 'exact', head: true })
            const { count: projects } = await supabase.from('cms_projects').select('*', { count: 'exact', head: true })

            setStats(prev => ({
                ...prev,
                leads: leads || 0,
                projects: projects || 0
            }))

            // Subscribe to realtime leads
            const channel = supabase
                .channel('admin-analytics')
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'cms_leads' }, (payload: any) => {
                    setStats(prev => ({ ...prev, leads: prev.leads + 1 }))
                    setRecentEvents(prev => [{ 
                        type: 'lead', 
                        message: `New conversion from ${payload.new.email}`, 
                        time: new Date(),
                        icon: Zap
                    }, ...prev])
                })
                .subscribe()

            return () => { supabase.removeChannel(channel) }
        }
        fetchStats()
    }, [])

    return (
        <div className="space-y-8 pb-12">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-black text-white tracking-tighter uppercase italic">
                        Intelligence_Hub
                    </h1>
                    <p className="text-zinc-500 font-medium">Real-time performance metrics and conversion intelligence.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-950 bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                    </div>
                    <span className="text-xs font-bold text-zinc-400">03 Users Online</span>
                </div>
            </header>

            {/* Core Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total_Leads', value: stats.leads, trend: '+12.4%', up: true, icon: Users, color: 'text-orange-500' },
                    { label: 'Site_Views', value: stats.views.toLocaleString(), trend: '+8.2%', up: true, icon: Eye, color: 'text-blue-500' },
                    { label: 'Conv_Rate', value: '5.2%', trend: '-1.1%', up: false, icon: Target, color: 'text-purple-500' },
                    { label: 'Avg_Uptime', value: '99.9%', trend: 'Perfect', up: true, icon: Gauge, color: 'text-emerald-500' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-[2rem] bg-zinc-900/40 border border-white/5 backdrop-blur-xl group hover:border-white/10 transition-all"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center border border-white/5`}>
                                <stat.icon className={`w-6 h-6 ${stat.color}`} />
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-black ${stat.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {stat. trend}
                            </div>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-black text-white italic">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Traffic Trend */}
                <div className="lg:col-span-8 p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-xl font-black text-white uppercase italic">Traffic_Dynamics</h3>
                            <p className="text-sm text-zinc-500">Weekly views vs conversions analysis</p>
                        </div>
                        <select className="bg-zinc-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg border border-white/5 outline-none">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trafficData}>
                                <defs>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#FF4D00" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#FF4D00" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis 
                                    dataKey="name" 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#71717a', fontSize: 12, fontWeight: 700 }} 
                                />
                                <YAxis 
                                    axisLine={false} 
                                    tickLine={false} 
                                    tick={{ fill: '#71717a', fontSize: 12, fontWeight: 700 }} 
                                />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#18181b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px' }}
                                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 'bold' }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="views" 
                                    stroke="#FF4D00" 
                                    strokeWidth={4}
                                    fillOpacity={1} 
                                    fill="url(#colorViews)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Revenue Channels */}
                <div className="lg:col-span-4 p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-sm flex flex-col">
                    <h3 className="text-xl font-black text-white uppercase italic mb-8">Traffic_Sources</h3>
                    <div className="h-[200px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={channelData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {channelData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                            <span className="text-2xl font-black text-white">45%</span>
                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Direct</span>
                        </div>
                    </div>
                    <div className="mt-8 space-y-4">
                        {channelData.map((channel, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: channel.color }} />
                                    <span className="text-sm font-bold text-zinc-400">{channel.name}</span>
                                </div>
                                <span className="text-sm font-black text-white">{channel.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Activity & Funnel Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Conversion Funnel */}
                <div className="p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-sm">
                    <h3 className="text-xl font-black text-white uppercase italic mb-8 flex items-center gap-3">
                        <Activity className="w-5 h-5 text-orange-500" />
                        Conversion_Funnel
                    </h3>
                    <div className="space-y-6">
                        {[
                            { label: 'Aquisition', sub: 'Total Visitors', value: '4,820', percent: 100, color: 'bg-orange-500' },
                            { label: 'Engagement', sub: 'Viewed Offers', value: '1,240', percent: 25.7, color: 'bg-orange-500/80' },
                            { label: 'Intent', sub: 'Diagnostic Start', value: '312', percent: 6.4, color: 'bg-orange-500/60' },
                            { label: 'Conversion', sub: 'Qualified Leads', value: '142', percent: 2.9, color: 'bg-orange-500/40' },
                        ].map((item, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <span className="text-sm font-bold text-white">{item.label}</span>
                                        <span className="ml-2 text-xs text-zinc-500">{item.sub}</span>
                                    </div>
                                    <span className="text-sm font-black text-white">{item.value}</span>
                                </div>
                                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.percent}%` }}
                                        transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                        className={`h-full ${item.color}`} 
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Real-time events */}
                <div className="p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-sm flex flex-col">
                    <h3 className="text-xl font-black text-white uppercase italic mb-8 flex items-center justify-between">
                        <span>Live_Activity</span>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] uppercase font-black tracking-widest text-emerald-500">Live</span>
                        </div>
                    </h3>
                    <div className="flex-1 space-y-4 max-h-[400px] overflow-y-auto pr-2 no-scrollbar">
                        {recentEvents.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full text-zinc-600 gap-4 opacity-50">
                                <Activity className="w-12 h-12" />
                                <p className="text-sm font-bold uppercase tracking-widest">Waiting for incoming events...</p>
                            </div>
                        ) : (
                            recentEvents.map((event, i) => (
                                <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="p-4 rounded-2xl bg-zinc-900/50 border border-white/5 flex items-start gap-4"
                                >
                                    <div className="w-10 h-10 shrink-0 rounded-xl bg-orange-500/10 flex items-center justify-center">
                                        <Zap className="w-5 h-5 text-orange-500" />
                                    </div>
                                    <div className="flex-1 overflow-hidden">
                                        <p className="text-sm font-bold text-white leading-snug">{event.message}</p>
                                        <p className="text-[10px] text-zinc-500 font-bold mt-1 uppercase">{event.time.toLocaleTimeString()}</p>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
