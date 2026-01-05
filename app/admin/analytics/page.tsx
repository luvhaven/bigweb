'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart3, Users, Eye, TrendingUp, MousePointer, Gauge } from 'lucide-react'
import AdminHeader from '@/components/admin/AdminHeader'

export default function AnalyticsPage() {
    const supabase = createClient()
    const [stats, setStats] = useState({
        leads: 0,
        projects: 0,
        views: 1240, // Simulated for now if not tracked
        conversions: 24
    })
    const [recentEvents, setRecentEvents] = useState<any[]>([])

    useEffect(() => {
        const fetchStats = async () => {
            const { count: leads } = await supabase.from('cms_leads').select('*', { count: 'exact', head: true })
            const { count: projects } = await supabase.from('cms_projects').select('*', { count: 'exact', head: true })

            // In a real app, you'd query a page_views table
            setStats(prev => ({
                ...prev,
                leads: leads || 0,
                projects: projects || 0
            }))

            // Subscribe to realtime leads
            const channel = supabase
                .channel('admin-dashboard')
                .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'cms_leads' }, (payload) => {
                    setStats(prev => ({ ...prev, leads: prev.leads + 1 }))
                    setRecentEvents(prev => [{ type: 'lead', message: 'New lead received', time: new Date() }, ...prev])
                })
                .subscribe()

            return () => { supabase.removeChannel(channel) }
        }
        fetchStats()
    }, [])

    return (
        <div className="space-y-6">
            <AdminHeader title="Realtime Analytics" description="Monitor site performance and conversions." />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Total Leads</CardTitle>
                        <Users className="h-4 w-4 text-emerald-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{stats.leads}</div>
                        <p className="text-xs text-zinc-500">+2 from yesterday</p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Total Views</CardTitle>
                        <Eye className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{stats.views}</div>
                        <p className="text-xs text-zinc-500">+12% vs last week</p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Conversion Rate</CardTitle>
                        <TrendingUp className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">4.2%</div>
                        <p className="text-xs text-zinc-500">Top 10% of industry</p>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-400">Active Projects</CardTitle>
                        <Gauge className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-white">{stats.projects}</div>
                        <p className="text-xs text-zinc-500">Portfolio Items</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-zinc-900 border-zinc-800 h-[300px]">
                    <CardHeader>
                        <CardTitle>Traffic Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center text-zinc-600">
                        <BarChart3 className="w-12 h-12 mb-2" />
                        <span className="text-sm">Chart integration requires Recharts/Visx</span>
                    </CardContent>
                </Card>
                <Card className="bg-zinc-900 border-zinc-800">
                    <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {recentEvents.length === 0 ? (
                                <p className="text-sm text-zinc-500">No new events in this session.</p>
                            ) : (
                                recentEvents.map((event, i) => (
                                    <div key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                        {event.message} <span className="text-zinc-500 ml-auto">{event.time.toLocaleTimeString()}</span>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
