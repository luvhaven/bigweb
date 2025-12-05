'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    TrendingUp,
    TrendingDown,
    Users,
    Eye,
    Clock,
    Globe,
    Monitor,
    Smartphone,
    Tablet,
    ArrowUpRight,
    Calendar,
    Download
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassCard, StatWidget, SectionHeader } from '@/components/admin/ui/GlassCard'
import {
    LineChart,
    Line,
    AreaChart,
    Area,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from 'recharts'

// Mock data - replace with real API calls
const visitorsData = [
    { date: 'Jan 1', visitors: 1200, pageViews: 3400 },
    { date: 'Jan 2', visitors: 1400, pageViews: 4100 },
    { date: 'Jan 3', visitors: 980, pageViews: 2800 },
    { date: 'Jan 4', visitors: 1600, pageViews: 4600 },
    { date: 'Jan 5', visitors: 1800, pageViews: 5200 },
    { date: 'Jan 6', visitors: 2100, pageViews: 5900 },
    { date: 'Jan 7', visitors: 1900, pageViews: 5400 },
]

const topPages = [
    { page: '/', views: 12450, change: 12 },
    { page: '/services', views: 8320, change: 8 },
    { page: '/portfolio', views: 6780, change: -3 },
    { page: '/contact', views: 4520, change: 15 },
    { page: '/about', views: 3210, change: 5 },
]

const trafficSources = [
    { name: 'Organic Search', value: 45, color: '#10b981' },
    { name: 'Direct', value: 25, color: '#8b5cf6' },
    { name: 'Social Media', value: 18, color: '#f59e0b' },
    { name: 'Referral', value: 12, color: '#3b82f6' },
]

const deviceData = [
    { name: 'Desktop', value: 58, icon: Monitor },
    { name: 'Mobile', value: 35, icon: Smartphone },
    { name: 'Tablet', value: 7, icon: Tablet },
]

const countryData = [
    { country: 'United States', visitors: 4520, flag: '🇺🇸' },
    { country: 'United Kingdom', visitors: 2340, flag: '🇬🇧' },
    { country: 'Germany', visitors: 1890, flag: '🇩🇪' },
    { country: 'Canada', visitors: 1230, flag: '🇨🇦' },
    { country: 'Nigeria', visitors: 980, flag: '🇳🇬' },
]

export default function AnalyticsPage() {
    const [dateRange, setDateRange] = useState('7d')

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white">Analytics</h1>
                    <p className="text-zinc-400 mt-1">
                        Track your website performance and visitor insights
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="bg-zinc-800 border-zinc-700 rounded-lg px-3 py-2 text-sm text-zinc-300"
                    >
                        <option value="24h">Last 24 hours</option>
                        <option value="7d">Last 7 days</option>
                        <option value="30d">Last 30 days</option>
                        <option value="90d">Last 90 days</option>
                    </select>
                    <Button variant="outline" className="border-zinc-700 text-zinc-300">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatWidget
                    title="Total Visitors"
                    value="24,521"
                    change={12}
                    trend="up"
                    icon={<Users className="w-5 h-5" />}
                />
                <StatWidget
                    title="Page Views"
                    value="89,432"
                    change={8}
                    trend="up"
                    icon={<Eye className="w-5 h-5" />}
                />
                <StatWidget
                    title="Avg. Session"
                    value="3m 45s"
                    change={-5}
                    trend="down"
                    icon={<Clock className="w-5 h-5" />}
                />
                <StatWidget
                    title="Bounce Rate"
                    value="42.3%"
                    change={-3}
                    trend="up"
                    icon={<TrendingDown className="w-5 h-5" />}
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Visitors Chart */}
                <GlassCard className="lg:col-span-2 p-6">
                    <SectionHeader
                        title="Visitors & Page Views"
                        description="Daily traffic over the selected period"
                    />
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={visitorsData}>
                                <defs>
                                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                                <XAxis dataKey="date" stroke="#71717a" fontSize={12} />
                                <YAxis stroke="#71717a" fontSize={12} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#18181b',
                                        border: '1px solid #27272a',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="visitors"
                                    stroke="#10b981"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorVisitors)"
                                    name="Visitors"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="pageViews"
                                    stroke="#8b5cf6"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorPageViews)"
                                    name="Page Views"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Traffic Sources */}
                <GlassCard className="p-6">
                    <SectionHeader title="Traffic Sources" />
                    <div className="h-48">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={trafficSources}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={50}
                                    outerRadius={70}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {trafficSources.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#18181b',
                                        border: '1px solid #27272a',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-2 mt-4">
                        {trafficSources.map((source) => (
                            <div key={source.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                                    <span className="text-sm text-zinc-300">{source.name}</span>
                                </div>
                                <span className="text-sm font-medium text-white">{source.value}%</span>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Top Pages */}
                <GlassCard className="lg:col-span-2 p-6">
                    <SectionHeader title="Top Pages" description="Most visited pages" />
                    <div className="space-y-3">
                        {topPages.map((page, index) => (
                            <div key={page.page} className="flex items-center gap-4">
                                <span className="text-sm font-medium text-zinc-500 w-6">{index + 1}</span>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-white truncate">{page.page}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-white">{page.views.toLocaleString()}</p>
                                    <p className={`text-xs ${page.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {page.change >= 0 ? '+' : ''}{page.change}%
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>

                {/* Devices */}
                <GlassCard className="p-6">
                    <SectionHeader title="Devices" />
                    <div className="space-y-4">
                        {deviceData.map((device) => (
                            <div key={device.name}>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <device.icon className="w-4 h-4 text-zinc-400" />
                                        <span className="text-sm text-zinc-300">{device.name}</span>
                                    </div>
                                    <span className="text-sm font-medium text-white">{device.value}%</span>
                                </div>
                                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${device.value}%` }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                        className="h-full bg-emerald-500 rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>

            {/* Countries */}
            <GlassCard className="p-6">
                <SectionHeader title="Top Countries" description="Visitors by location" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    {countryData.map((country, index) => (
                        <motion.div
                            key={country.country}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 rounded-lg bg-zinc-800/50 text-center"
                        >
                            <span className="text-3xl mb-2 block">{country.flag}</span>
                            <p className="text-sm font-medium text-white">{country.country}</p>
                            <p className="text-lg font-bold text-emerald-500">{country.visitors.toLocaleString()}</p>
                        </motion.div>
                    ))}
                </div>
            </GlassCard>
        </div>
    )
}
