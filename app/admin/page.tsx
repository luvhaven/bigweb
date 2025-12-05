'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  FolderKanban,
  Users,
  MessageSquare,
  TrendingUp,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Globe,
  Zap,
  Clock,
  Mail,
  Star,
  FileText,
  Plus,
  ExternalLink,
  RefreshCcw
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { GlassCard, StatWidget, ActivityItem, SectionHeader, Skeleton } from '@/components/admin/ui/GlassCard'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { formatDistanceToNow } from 'date-fns'
import { useDashboardStats, useContacts, useChatSessions } from '@/hooks/useAdminData'

// Chart data (will be replaced with real data)
const trafficData = [
  { date: 'Mon', visitors: 420, pageViews: 890 },
  { date: 'Tue', visitors: 580, pageViews: 1240 },
  { date: 'Wed', visitors: 690, pageViews: 1580 },
  { date: 'Thu', visitors: 520, pageViews: 1120 },
  { date: 'Fri', visitors: 780, pageViews: 1890 },
  { date: 'Sat', visitors: 450, pageViews: 980 },
  { date: 'Sun', visitors: 620, pageViews: 1350 },
]

const trafficSources = [
  { name: 'Organic', value: 45, color: '#10b981' },
  { name: 'Direct', value: 25, color: '#8b5cf6' },
  { name: 'Referral', value: 20, color: '#f59e0b' },
  { name: 'Social', value: 10, color: '#3b82f6' },
]

const recentActivity = [
  { type: 'project', action: 'created', item: 'TechCorp Enterprise', time: new Date(Date.now() - 1000 * 60 * 15), status: 'success' as const },
  { type: 'contact', action: 'received', item: 'New inquiry from Sarah', time: new Date(Date.now() - 1000 * 60 * 45), status: 'info' as const },
  { type: 'testimonial', action: 'approved', item: '5-star review added', time: new Date(Date.now() - 1000 * 60 * 120), status: 'success' as const },
  { type: 'chat', action: 'opened', item: 'New chat session', time: new Date(Date.now() - 1000 * 60 * 180), status: 'warning' as const },
  { type: 'blog', action: 'published', item: 'AI in Web Development', time: new Date(Date.now() - 1000 * 60 * 240), status: 'success' as const },
]

const quickActions = [
  { name: 'Add Project', href: '/admin/portfolio/new', icon: FolderKanban, color: 'from-emerald-500 to-emerald-600' },
  { name: 'New Blog Post', href: '/admin/blog/new', icon: FileText, color: 'from-purple-500 to-purple-600' },
  { name: 'View Contacts', href: '/admin/contacts', icon: Mail, color: 'from-blue-500 to-blue-600' },
  { name: 'Live Chat', href: '/admin/chat', icon: MessageSquare, color: 'from-amber-500 to-amber-600' },
]

export default function AdminDashboard() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats()
  const { data: contacts } = useContacts()
  const { data: chatSessions } = useChatSessions()
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'project': return <FolderKanban className="w-4 h-4" />
      case 'contact': return <Mail className="w-4 h-4" />
      case 'testimonial': return <Star className="w-4 h-4" />
      case 'chat': return <MessageSquare className="w-4 h-4" />
      case 'blog': return <FileText className="w-4 h-4" />
      default: return <Activity className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-zinc-400 mt-1">
            Welcome back! Here's what's happening with your platform.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="border-zinc-700 text-zinc-300 hover:bg-zinc-800">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
            <Plus className="w-4 h-4 mr-2" />
            Quick Add
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatWidget
          title="Total Projects"
          value={stats?.projects || 0}
          change={12}
          trend="up"
          icon={<FolderKanban className="w-5 h-5" />}
          loading={statsLoading}
        />
        <StatWidget
          title="Testimonials"
          value={stats?.testimonials || 0}
          change={5}
          trend="up"
          icon={<Star className="w-5 h-5" />}
          loading={statsLoading}
        />
        <StatWidget
          title="New Contacts"
          value={stats?.newContacts || 0}
          change={-3}
          trend="down"
          icon={<Mail className="w-5 h-5" />}
          loading={statsLoading}
        />
        <StatWidget
          title="Open Chats"
          value={stats?.openChats || 0}
          change={8}
          trend="up"
          icon={<MessageSquare className="w-5 h-5" />}
          loading={statsLoading}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Chart */}
        <GlassCard className="lg:col-span-2 p-6">
          <SectionHeader
            title="Traffic Overview"
            description="Visitors and page views this week"
            action={
              <select className="bg-zinc-800 border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-zinc-300">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            }
          />
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trafficData}>
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
                />
                <Area
                  type="monotone"
                  dataKey="pageViews"
                  stroke="#8b5cf6"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorPageViews)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-sm text-zinc-400">Visitors</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span className="text-sm text-zinc-400">Page Views</span>
            </div>
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

      {/* Activity & Quick Actions Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <GlassCard className="lg:col-span-2 p-6">
          <SectionHeader
            title="Recent Activity"
            description="Latest actions on your platform"
            action={
              <Link href="/admin/activity" className="text-sm text-emerald-500 hover:text-emerald-400">
                View all
              </Link>
            }
          />
          <div className="space-y-1">
            {recentActivity.map((activity, index) => (
              <ActivityItem
                key={index}
                icon={getActivityIcon(activity.type)}
                title={activity.action.charAt(0).toUpperCase() + activity.action.slice(1)}
                description={activity.item}
                time={formatDistanceToNow(activity.time, { addSuffix: true })}
                status={activity.status}
              />
            ))}
          </div>
        </GlassCard>

        {/* Quick Actions */}
        <GlassCard className="p-6">
          <SectionHeader title="Quick Actions" />
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action) => (
              <Link key={action.name} href={action.href}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-xl bg-gradient-to-br ${action.color} cursor-pointer group`}
                >
                  <action.icon className="w-6 h-6 text-white mb-2" />
                  <p className="text-sm font-medium text-white">{action.name}</p>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* System Status */}
          <div className="mt-6 pt-6 border-t border-zinc-800">
            <h4 className="text-sm font-medium text-zinc-300 mb-4">System Status</h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm text-zinc-400">API Status</span>
                </div>
                <span className="text-xs text-emerald-500">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm text-zinc-400">Database</span>
                </div>
                <span className="text-xs text-emerald-500">Connected</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-sm text-zinc-400">Storage</span>
                </div>
                <span className="text-xs text-emerald-500">24.5 GB free</span>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Live Metrics Bar */}
      <GlassCard className="p-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-emerald-500" />
              <span className="text-sm text-zinc-400">Live Visitors:</span>
              <span className="text-lg font-bold text-white">24</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-amber-500" />
              <span className="text-sm text-zinc-400">Page Speed:</span>
              <span className="text-lg font-bold text-white">98</span>
              <span className="text-xs text-zinc-500">/100</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-500" />
              <span className="text-sm text-zinc-400">Uptime:</span>
              <span className="text-lg font-bold text-white">99.9%</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-zinc-500">
            <Clock className="w-4 h-4" />
            <span className="text-sm">
              {currentTime.toLocaleTimeString()}
            </span>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
