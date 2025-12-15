'use client'

import { useEffect, useState } from 'react'
import {
    FolderKanban,
    MessageSquare,
    Mail,
    Star,
    Clock,
    FileText,
    Eye,
    MousePointerClick,
    DollarSign,
    Users
} from 'lucide-react'
import { adminSupabase as supabase } from '@/utils/adminSupabase'
import { AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { formatDistanceToNow } from 'date-fns'
import AdminHeader from '@/components/admin/AdminHeader'
import StatsCard from '@/components/admin/StatsCard'
import { useAuth } from '@/hooks/useAuth'

// Sample data (will be replaced with real Supabase data)
const trafficData = [
    { date: 'Mon', visitors: 420, pageViews: 890, conversions: 12 },
    { date: 'Tue', visitors: 580, pageViews: 1240, conversions: 18 },
    { date: 'Wed', visitors: 690, pageViews: 1580, conversions: 24 },
    { date: 'Thu', visitors: 520, pageViews: 1120, conversions: 15 },
    { date: 'Fri', visitors: 780, pageViews: 1890, conversions: 28 },
    { date: 'Sat', visitors: 450, pageViews: 980, conversions: 10 },
    { date: 'Sun', visitors: 620, pageViews: 1350, conversions: 16 },
]

const trafficSources = [
    { name: 'Organic', value: 45, color: '#10b981' },
    { name: 'Direct', value: 25, color: '#8b5cf6' },
    { name: 'Referral', value: 20, color: '#f59e0b' },
    { name: 'Social', value: 10, color: '#3b82f6' },
]

export default function AdminDashboard() {
    const { profile } = useAuth()
    const [stats, setStats] = useState({
        projects: 0,
        testimonials: 0,
        contacts: 0,
        chatSessions: 0
    })
    const [loading, setLoading] = useState(true)
    const [currentTime, setCurrentTime] = useState(new Date())
    const [recentActivity, setRecentActivity] = useState<any[]>([])

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000)
        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        loadDashboardData()
    }, [])

    const loadDashboardData = async () => {
        try {
            setLoading(true)

            // Fetch counts from database
            const [
                { count: projectCount },
                { count: testimonialCount },
                { count: contactCount },
                { count: chatCount }
            ] = await Promise.all([
                supabase.from('portfolio_projects').select('*', { count: 'exact', head: true }),
                supabase.from('testimonials').select('*', { count: 'exact', head: true }),
                supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
                supabase.from('chat_sessions').select('*', { count: 'exact', head: true })
            ])

            setStats({
                projects: projectCount || 0,
                testimonials: testimonialCount || 0,
                contacts: contactCount || 0,
                chatSessions: chatCount || 0
            })

            // Fetch recent activity (combining multiple sources)
            const { data: recentContacts } = await supabase
                .from('contact_submissions')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(5)

            setRecentActivity(recentContacts || [])
        } catch (error) {
            console.error('[Dashboard] Error loading data:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-8">
            <AdminHeader
                title="Dashboard"
                description={`Welcome back, ${profile?.full_name || 'Admin'}. Here is your daily overview.`}
            >
                <div className="text-sm text-muted-foreground bg-secondary/50 px-3 py-1 rounded-full flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {currentTime.toLocaleTimeString()}
                </div>
            </AdminHeader>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatsCard
                    title="Total Projects"
                    value={stats.projects}
                    change={12}
                    trend="up"
                    icon={<FolderKanban className="w-6 h-6" />}
                    loading={loading}
                />
                <StatsCard
                    title="Testimonials"
                    value={stats.testimonials}
                    change={5}
                    trend="up"
                    icon={<Star className="w-6 h-6" />}
                    loading={loading}
                />
                <StatsCard
                    title="New Contacts"
                    value={stats.contacts}
                    change={8}
                    trend="up"
                    icon={<Mail className="w-6 h-6" />}
                    loading={loading}
                />
                <StatsCard
                    title="Chat Sessions"
                    value={stats.chatSessions}
                    change={3}
                    trend="down"
                    icon={<MessageSquare className="w-6 h-6" />}
                    loading={loading}
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Traffic Chart */}
                <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">Traffic Overview</h3>
                            <p className="text-sm text-muted-foreground">Visitors and conversions this week</p>
                        </div>
                        <select className="bg-secondary border-none text-foreground rounded-lg px-3 py-1.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                            <option>Last 90 days</option>
                        </select>
                    </div>
                    <div className="h-72">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={trafficData}>
                                <defs>
                                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                                <XAxis
                                    dataKey="date"
                                    stroke="#71717a"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#71717a"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}`}
                                />
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
                                />
                                <Area
                                    type="monotone"
                                    dataKey="conversions"
                                    stroke="#8b5cf6"
                                    strokeWidth={2}
                                    fillOpacity={1}
                                    fill="url(#colorConversions)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Traffic Sources */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-foreground mb-6">Traffic Sources</h3>
                    <div className="h-48 mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={trafficSources}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
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
                    <div className="space-y-4">
                        {trafficSources.map((source) => (
                            <div key={source.name} className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                                    <span className="text-sm text-muted-foreground">{source.name}</span>
                                </div>
                                <span className="text-sm font-medium text-foreground">{source.value}%</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
                    <a href="/admin/contacts" className="text-sm text-primary hover:text-primary/80 transition-colors">
                        View all
                    </a>
                </div>
                <div className="space-y-4">
                    {recentActivity.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mx-auto mb-3">
                                <Clock className="w-6 h-6 text-muted-foreground" />
                            </div>
                            <p className="text-muted-foreground">No recent activity found</p>
                        </div>
                    ) : (
                        recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-start gap-4 p-4 rounded-lg hover:bg-secondary/50 transition-colors group">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between gap-2 mb-1">
                                        <p className="text-sm font-medium text-foreground truncate">{activity.name}</p>
                                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                                            {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground truncate">{activity.email}</p>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{activity.message}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

