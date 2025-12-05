'use client'

import { useState } from 'react'
import { Search, Globe, TrendingUp, Users, MousePointerClick, Clock, MapPin } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import AdminHeader from '@/components/admin/AdminHeader'
import { LineChart, Line, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

const trafficData = Array.from({ length: 30 }, (_, i) => ({
    date: `Day ${i + 1}`,
    visitors: Math.floor(Math.random() * 500) + 300,
    pageViews: Math.floor(Math.random() * 1000) + 600,
}))

const sourceData = [
    { name: 'Organic Search', value: 45, color: '#3B82F6' },
    { name: 'Direct', value: 25, color: '#10B981' },
    { name: 'Social Media', value: 15, color: '#F59E0B' },
    { name: 'Referral', value: 10, color: '#8B5CF6' },
    { name: 'Email', value: 5, color: '#EF4444' },
]

const topPages = [
    { page: '/', views: 12540, avgTime: '2:34', bounceRate: 45 },
    { page: '/services/web-development', views: 8920, avgTime: '3:12', bounceRate: 38 },
    { page: '/portfolio', views: 7650, avgTime: '4:05', bounceRate: 32 },
    { page: '/about', views: 5430, avgTime: '1:58', bounceRate: 52 },
    { page: '/contact', views: 4210, avgTime: '1:25', bounceRate: 28 },
]

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState('30d')

    return (
        <div className="space-y-8">
            <AdminHeader
                title="Analytics Dashboard"
                description="Comprehensive insights into your website's performance and visitor behavior"
            >
                <Tabs value={timeRange} onValueChange={setTimeRange}>
                    <TabsList>
                        <TabsTrigger value="7d">7 Days</TabsTrigger>
                        <TabsTrigger value="30d">30 Days</TabsTrigger>
                        <TabsTrigger value="90d">90 Days</TabsTrigger>
                    </TabsList>
                </Tabs>
            </AdminHeader>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: 'Total Visitors', value: '24,583', change: '+12.5%', icon: Users, color: 'from-blue-500 to-cyan-500' },
                    { label: 'Page Views', value: '52,147', change: '+8.2%', icon: Globe, color: 'from-green-500 to-emerald-500' },
                    { label: 'Avg. Session', value: '3:42', change: '+5.1%', icon: Clock, color: 'from-purple-500 to-pink-500' },
                    { label: 'Conversion Rate', value: '3.8%', change: '+0.4%', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
                ].map((metric, index) => {
                    const Icon = metric.icon
                    return (
                        <Card key={index}>
                            <CardContent className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center text-white`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <Badge variant="secondary" className="text-green-600">
                                        {metric.change}
                                    </Badge>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold mb-1">{metric.value}</p>
                                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Traffic Overview</CardTitle>
                        <CardDescription>Daily visitors and page views</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={350}>
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

                <Card>
                    <CardHeader>
                        <CardTitle>Traffic Sources</CardTitle>
                        <CardDescription>Where your visitors come from</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                            <PieChart>
                                <Pie
                                    data={sourceData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {sourceData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                        <div className="space-y-2 mt-4">
                            {sourceData.map((source) => (
                                <div key={source.name} className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: source.color }} />
                                        <span className="text-sm text-muted-foreground">{source.name}</span>
                                    </div>
                                    <span className="text-sm font-semibold">{source.value}%</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Top Pages */}
            <Card>
                <CardHeader>
                    <CardTitle>Top Performing Pages</CardTitle>
                    <CardDescription>Most visited pages and their metrics</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-border">
                                    <th className="text-left p-4 font-medium text-sm text-muted-foreground">Page</th>
                                    <th className="text-right p-4 font-medium text-sm text-muted-foreground">Views</th>
                                    <th className="text-right p-4 font-medium text-sm text-muted-foreground">Avg. Time</th>
                                    <th className="text-right p-4 font-medium text-sm text-muted-foreground">Bounce Rate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {topPages.map((page, index) => (
                                    <tr key={index} className="border-b border-border last:border-0 hover:bg-secondary/20">
                                        <td className="p-4 font-medium">{page.page}</td>
                                        <td className="p-4 text-right">{page.views.toLocaleString()}</td>
                                        <td className="p-4 text-right">{page.avgTime}</td>
                                        <td className="p-4 text-right">
                                            <Badge variant={page.bounceRate > 50 ? 'destructive' : 'secondary'}>
                                                {page.bounceRate}%
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
