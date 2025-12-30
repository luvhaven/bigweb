'use client'

import { useState, useEffect } from 'react'
import { adminSupabase as supabase } from '@/utils/adminSupabase'
import AdminSidebar from '@/components/admin/AdminSidebar'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Users, Eye, MousePointer, CheckCircle, TrendingUp, Globe } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Lead {
    id: string
    full_name: string
    email: string
    phone: string
    company_name: string
    website_url: string
    message: string
    source: string
    status: string
    created_at: string
    package: {
        name: string
        slug: string
    }
}

interface PackageStats {
    name: string
    slug: string
    spots_available: number
    spots_taken: number
    promo_price: number
}

export default function CampaignDashboard() {
    const [loading, setLoading] = useState(true)
    const [leads, setLeads] = useState<Lead[]>([])
    const [packages, setPackages] = useState<PackageStats[]>([])
    const [analytics, setAnalytics] = useState({
        totalViews: 0,
        ctaClicks: 0,
        formStarts: 0,
        formCompletes: 0,
        byCountry: {} as Record<string, number>,
        byDevice: {} as Record<string, number>
    })

    useEffect(() => {
        loadData()
    }, [])

    const loadData = async () => {
        try {
            setLoading(true)

            // Load packages
            const { data: pkgData } = await supabase
                .from('campaign_packages')
                .select('name, slug, spots_available, spots_taken, promo_price')
                .eq('active', true)

            setPackages(pkgData || [])

            // Load leads
            const { data: leadsData } = await supabase
                .from('campaign_leads')
                .select(`
                    *,
                    campaign_packages!inner(name, slug)
                `)
                .order('created_at', { ascending: false })

            const mappedLeads = (leadsData || []).map(lead => ({
                ...lead,
                package: {
                    name: (lead as any).campaign_packages?.name || 'Unknown',
                    slug: (lead as any).campaign_packages?.slug || ''
                }
            }))

            setLeads(mappedLeads)

            // Load analytics
            const response = await fetch('/api/campaign/analytics')
            const analyticsData = await response.json()
            setAnalytics(analyticsData)

        } catch (error) {
            console.error('Error loading dashboard:', error)
        } finally {
            setLoading(false)
        }
    }

    const conversionRate = analytics.totalViews > 0
        ? ((analytics.formCompletes / analytics.totalViews) * 100).toFixed(2)
        : '0.00'

    return (
        <div className="flex min-h-screen bg-background">
            <AdminSidebar />

            <div className="flex-1 ml-64 p-6">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold">New Year 2026 Campaign</h1>
                    <p className="text-muted-foreground mt-2">
                        Track leads, analytics, and package performance
                    </p>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    </div>
                ) : (
                    <>
                        {/* Stats Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
                                    <Users className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{leads.length}</div>
                                    <p className="text-xs text-muted-foreground">
                                        {leads.filter(l => l.status === 'new').length} new
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Page Views</CardTitle>
                                    <Eye className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{analytics.totalViews}</div>
                                    <p className="text-xs text-muted-foreground">
                                        {analytics.ctaClicks} CTA clicks
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{conversionRate}%</div>
                                    <p className="text-xs text-muted-foreground">
                                        {analytics.formCompletes} / {analytics.totalViews} conversions
                                    </p>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">Spots Taken</CardTitle>
                                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">
                                        {packages.reduce((sum, p) => sum + p.spots_taken, 0)} / 95
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        {95 - packages.reduce((sum, p) => sum + p.spots_taken, 0)} remaining
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Package Performance */}
                        <Card className="mb-8">
                            <CardHeader>
                                <CardTitle>Package Performance</CardTitle>
                                <CardDescription>Spots taken per package</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {packages.map(pkg => (
                                        <div key={pkg.slug} className="flex items-center">
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="font-medium">{pkg.name}</span>
                                                    <span className="text-sm text-muted-foreground">
                                                        {pkg.spots_taken} / {pkg.spots_available}
                                                    </span>
                                                </div>
                                                <div className="w-full bg-secondary rounded-full h-2">
                                                    <div
                                                        className="bg-primary rounded-full h-2 transition-all"
                                                        style={{ width: `${(pkg.spots_taken / pkg.spots_available) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Tabs */}
                        <Tabs defaultValue="leads" className="space-y-4">
                            <TabsList>
                                <TabsTrigger value="leads">Leads ({leads.length})</TabsTrigger>
                                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                            </TabsList>

                            <TabsContent value="leads" className="space-y-4">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Recent Leads</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {leads.length === 0 ? (
                                                <p className="text-muted-foreground text-center py-8">No leads yet</p>
                                            ) : (
                                                leads.map(lead => (
                                                    <div key={lead.id} className="border-b pb-4 last:border-0">
                                                        <div className="flex items-start justify-between">
                                                            <div>
                                                                <p className="font-medium">{lead.full_name}</p>
                                                                <p className="text-sm text-muted-foreground">{lead.email}</p>
                                                                {lead.company_name && (
                                                                    <p className="text-sm text-muted-foreground">{lead.company_name}</p>
                                                                )}
                                                            </div>
                                                            <div className="text-right">
                                                                <span className="inline-block px-2 py-1 rounded-full text-xs bg-primary/10 text-primary">
                                                                    {lead.package.name}
                                                                </span>
                                                                <p className="text-xs text-muted-foreground mt-1">
                                                                    {new Date(lead.created_at).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {lead.message && (
                                                            <p className="text-sm mt-2 text-muted-foreground">{lead.message}</p>
                                                        )}
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="analytics" className="space-y-4">
                                <div className="grid md:grid-cols-2 gap-6">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <Globe className="w-5 h-5" />
                                                By Country
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                {Object.entries(analytics.byCountry)
                                                    .sort(([, a], [, b]) => b - a)
                                                    .slice(0, 5)
                                                    .map(([country, count]) => (
                                                        <div key={country} className="flex items-center justify-between">
                                                            <span>{country}</span>
                                                            <span className="font-medium">{count}</span>
                                                        </div>
                                                    ))}
                                            </div>
                                        </CardContent>
                                    </Card>

                                    <Card>
                                        <CardHeader>
                                            <CardTitle className="flex items-center gap-2">
                                                <MousePointer className="w-5 h-5" />
                                                By Device
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <div className="space-y-2">
                                                {Object.entries(analytics.byDevice).map(([device, count]) => (
                                                    <div key={device} className="flex items-center justify-between">
                                                        <span className="capitalize">{device}</span>
                                                        <span className="font-medium">{count}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </>
                )}
            </div>
        </div>
    )
}
