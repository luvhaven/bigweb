'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  FileText,
  Users,
  FolderKanban,
  TrendingUp,
  Eye,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Globe,
  Zap,
  Clock,
  CheckCircle2,
  AlertCircle,
  Target,
  BarChart3,
  PieChart,
  Calendar,
  Download,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { pagesAPI } from '@/lib/api/pages'
import { clientsAPI } from '@/lib/api/clients'
import { projectsAPI } from '@/lib/api/projects'
import { messagesAPI } from '@/lib/api/messages'
import AdminHeader from '@/components/admin/AdminHeader'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { formatDistanceToNow } from 'date-fns'

interface Stats {
  pages: number
  clients: number
  projects: number
  messages: number
}

// Mock data for charts
const trafficData = [
  { date: 'Mon', visitors: 420, pageViews: 890 },
  { date: 'Tue', visitors: 580, pageViews: 1240 },
  { date: 'Wed', visitors: 690, pageViews: 1580 },
  { date: 'Thu', visitors: 520, pageViews: 1120 },
  { date: 'Fri', visitors: 750, pageViews: 1650 },
  { date: 'Sat', visitors: 640, pageViews: 1380 },
  { date: 'Sun', visitors: 480, pageViews: 1050 },
]

const deviceData = [
  { name: 'Desktop', value: 58, color: '#3B82F6' },
  { name: 'Mobile', value: 35, color: '#10B981' },
  { name: 'Tablet', value: 7, color: '#F59E0B' },
]

const topPages = [
  { page: '/services/web-development', views: 3240, change: 12 },
  { page: '/portfolio', views: 2890, change: 8 },
  { page: '/', views: 2654, change: -3 },
  { page: '/services/ai-consulting', views: 2130, change: 15 },
  { page: '/contact', views: 1890, change: 5 },
]

const recentActivity = [
  { type: 'page', action: 'updated', item: 'Services Page', user: 'Admin', time: new Date(Date.now() - 1000 * 60 * 15) },
  { type: 'project', action: 'created', item: 'E-commerce Redesign', user: 'John Doe', time: new Date(Date.now() - 1000 * 60 * 45) },
  { type: 'message', action: 'received', item: 'New Contact Form', user: 'Jane Smith', time: new Date(Date.now() - 1000 * 60 * 90) },
  { type: 'blog', action: 'published', item: 'The Future of AI in Web Dev', user: 'Admin', time: new Date(Date.now() - 1000 * 60 * 180) },
  { type: 'media', action: 'uploaded', item: '5 images', user: 'Admin', time: new Date(Date.now() - 1000 * 60 * 240) },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    pages: 0,
    clients: 0,
    projects: 0,
    messages: 0,
  })
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState('7d')

  useEffect(() => {
    loadStats()
    // Simulate real-time updates
    const interval = setInterval(() => {
      // In production, this would fetch real data
    }, 30000) // Update every 30s

    return () => clearInterval(interval)
  }, [])

  // PWA Install Logic
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstallable(false);
    }
    setDeferredPrompt(null);
  };

  const loadStats = async () => {
    try {
      const [pages, clients, projects, messages] = await Promise.all([
        pagesAPI.getAll().catch(() => []),
        clientsAPI.getAll().catch(() => []),
        projectsAPI.getAll().catch(() => []),
        messagesAPI.getAll().catch(() => []),
      ])
      setStats({
        pages: pages?.length || 12,
        clients: clients?.length || 24,
        projects: projects?.length || 18,
        messages: messages?.length || 35,
      })
    } catch (error) {
      // Use demo stats when database is not set up
      setStats({
        pages: 12,
        clients: 24,
        projects: 18,
        messages: 35,
      })
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Pages',
      value: stats.pages,
      icon: FileText,
      color: 'from-blue-500 to-cyan-500',
      change: '+12%',
      positive: true,
      href: '/admin/pages',
      subtitle: '3 drafts pending',
    },
    {
      title: 'Active Clients',
      value: stats.clients,
      icon: Users,
      color: 'from-purple-500 to-pink-500',
      change: '+8%',
      positive: true,
      href: '/admin/clients',
      subtitle: '5 new this month',
    },
    {
      title: 'Projects',
      value: stats.projects,
      icon: FolderKanban,
      color: 'from-orange-500 to-red-500',
      change: '+15%',
      positive: true,
      href: '/admin/projects',
      subtitle: '4 in progress',
    },
    {
      title: 'Messages',
      value: stats.messages,
      icon: MessageSquare,
      color: 'from-green-500 to-emerald-500',
      change: '+5%',
      positive: true,
      href: '/admin/messages',
      subtitle: '12 unread',
    },
  ]

  const performanceMetrics = [
    { label: 'Performance', score: 95, color: 'text-green-500', icon: Zap },
    { label: 'SEO', score: 88, color: 'text-blue-500', icon: TrendingUp },
    { label: 'Accessibility', score: 92, color: 'text-purple-500', icon: Eye },
    { label: 'Best Practices', score: 90, color: 'text-amber-500', icon: CheckCircle2 },
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <AdminHeader
        title="Welcome back, Admin! 👋"
        description="Here's your comprehensive website overview and performance insights."
      >
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1">
            <Activity className="w-3 h-3" />
            Live
          </Badge>
          <Badge variant="outline">
            <Clock className="w-3 h-3 mr-1" />
            {new Date().toLocaleTimeString()}
          </Badge>
        </div>
        {isInstallable && (
          <Button onClick={handleInstallClick} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2">
            <Download className="w-4 h-4" />
            Install App
          </Button>
        )}
      </AdminHeader>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Link key={stat.title} href={stat.href}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-accent/50 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${stat.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.positive ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-3xl font-bold mb-1">
                    {stat.value.toLocaleString()}
                  </p>
                  <p className="text-sm font-medium text-foreground mb-1">{stat.title}</p>
                  <p className="text-xs text-muted-foreground">{stat.subtitle}</p>
                </div>
              </motion.div>
            </Link>
          )
        })}
      </div>

      {/* Performance Scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Site Performance Metrics
              </CardTitle>
              <Badge variant="outline">Lighthouse Scores</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {performanceMetrics.map((metric, index) => {
                const Icon = metric.icon
                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="relative w-24 h-24 mx-auto mb-3">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          className="text-secondary"
                        />
                        <circle
                          cx="48"
                          cy="48"
                          r="40"
                          stroke="currentColor"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${metric.score * 2.51} 251`}
                          className={metric.color}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center flex-col">
                        <Icon className={`w-5 h-5 mb-1 ${metric.color}`} />
                        <span className="text-xl font-bold">{metric.score}</span>
                      </div>
                    </div>
                    <p className="text-sm font-medium">{metric.label}</p>
                  </motion.div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Traffic Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Traffic Overview
                </CardTitle>
                <Tabs value={timeRange} onValueChange={setTimeRange} className="w-auto">
                  <TabsList className="grid grid-cols-3 w-[200px]">
                    <TabsTrigger value="7d" className="text-xs">7 Days</TabsTrigger>
                    <TabsTrigger value="30d" className="text-xs">30 Days</TabsTrigger>
                    <TabsTrigger value="90d" className="text-xs">90 Days</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={trafficData}>
                  <defs>
                    <linearGradient id="colorVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPageViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="visitors" stroke="#3B82F6" fillOpacity={1} fill="url(#colorVisitors)" />
                  <Area type="monotone" dataKey="pageViews" stroke="#10B981" fillOpacity={1} fill="url(#colorPageViews)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Device Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5" />
                Device Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <RePieChart>
                  <Pie
                    data={deviceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {deviceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-4">
                {deviceData.map((device) => (
                  <div key={device.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: device.color }} />
                      <span className="text-sm text-muted-foreground">{device.name}</span>
                    </div>
                    <span className="text-sm font-semibold">{device.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Activity & Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => {
                  const getIcon = () => {
                    switch (activity.type) {
                      case 'page': return FileText
                      case 'project': return FolderKanban
                      case 'message': return MessageSquare
                      case 'blog': return FileText
                      case 'media': return Eye
                      default: return Activity
                    }
                  }
                  const Icon = getIcon()

                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.9 + index * 0.05 }}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{activity.item}</p>
                        <p className="text-sm text-muted-foreground">
                          {activity.action} by {activity.user}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDistanceToNow(activity.time, { addSuffix: true })}
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Top Pages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Top Performing Pages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPages.map((page, index) => (
                  <motion.div
                    key={page.page}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.0 + index * 0.05 }}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm truncate">{page.page}</p>
                      <p className="text-xs text-muted-foreground">
                        {page.views.toLocaleString()} views
                      </p>
                    </div>
                    <div className={`flex items-center gap-1 text-sm font-medium ${page.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {page.change > 0 ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      {Math.abs(page.change)}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/admin/pages/new" className="group">
                <div className="p-6 rounded-xl border border-border hover:border-accent hover:bg-accent/5 transition-all text-center">
                  <FileText className="w-8 h-8 mx-auto mb-3 text-accent group-hover:scale-110 transition-transform" />
                  <p className="font-semibold mb-1">New Page</p>
                  <p className="text-xs text-muted-foreground">Create content</p>
                </div>
              </Link>
              <Link href="/admin/media" className="group">
                <div className="p-6 rounded-xl border border-border hover:border-accent hover:bg-accent/5 transition-all text-center">
                  <Eye className="w-8 h-8 mx-auto mb-3 text-accent group-hover:scale-110 transition-transform" />
                  <p className="font-semibold mb-1">Upload Media</p>
                  <p className="text-xs text-muted-foreground">Add files</p>
                </div>
              </Link>
              <Link href="/admin/analytics" className="group">
                <div className="p-6 rounded-xl border border-border hover:border-accent hover:bg-accent/5 transition-all text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-3 text-accent group-hover:scale-110 transition-transform" />
                  <p className="font-semibold mb-1">Analytics</p>
                  <p className="text-xs text-muted-foreground">View insights</p>
                </div>
              </Link>
              <Link href="/admin/settings" className="group">
                <div className="p-6 rounded-xl border border-border hover:border-accent hover:bg-accent/5 transition-all text-center">
                  <Calendar className="w-8 h-8 mx-auto mb-3 text-accent group-hover:scale-110 transition-transform" />
                  <p className="font-semibold mb-1">Settings</p>
                  <p className="text-xs text-muted-foreground">Configure site</p>
                </div>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
