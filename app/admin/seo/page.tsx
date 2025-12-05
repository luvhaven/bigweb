'use client'

import { useState } from 'react'
import { Search, AlertTriangle, CheckCircle2, Globe, Link as LinkIcon, Image, FileText, Zap } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import AdminHeader from '@/components/admin/AdminHeader'

const seoScores = [
    { category: 'Meta Tags', score: 88, issues: 3 },
    { category: 'Content Quality', score: 92, issues: 1 },
    { category: 'Technical SEO', score: 75, issues: 8 },
    { category: 'Mobile Optimization', score: 95, issues: 2 },
    { category: 'Page Speed', score: 82, issues: 5 },
    { category: 'Link Structure', score: 90, issues: 3 },
]

const issues = [
    { type: 'error', title: 'Missing meta description', page: '/services/ai-consulting', severity: 'high' },
    { type: 'warning', title: 'Image missing alt text', page: '/portfolio', severity: 'medium' },
    { type: 'error', title: 'Broken internal link', page: '/blog/post-1', severity: 'high' },
    { type: 'warning', title: 'H1 tag missing', page: '/about', severity: 'high' },
    { type: 'info', title: 'Page title too long', page: '/services/web-development', severity: 'low' },
]

const topKeywords = [
    { keyword: 'web development agency', position: 3, change: 2 },
    { keyword: 'ai consulting services', position: 7, change: -1 },
    { keyword: 'digital marketing', position: 12, change: 5 },
    { keyword: 'mobile app development', position: 15, change: 3 },
    { keyword: 'ecommerce solutions', position: 8, change: 0 },
]

export default function SEOPage() {
    const [activeTab, setActiveTab] = useState('overview')

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'high': return 'bg-red-500'
            case 'medium': return 'bg-amber-500'
            case 'low': return 'bg-blue-500'
            default: return 'bg-gray-500'
        }
    }

    return (
        <div className="space-y-8">
            <AdminHeader
                title="SEO Tools"
                description="Optimize your website's search engine performance"
            >
                <Button className="bg-accent hover:bg-accent/90">
                    <Search className="w-4 h-4 mr-2" />
                    Run Site Audit
                </Button>
            </AdminHeader>

            {/* Overall SEO Score */}
            <Card>
                <CardContent className="p-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Overall SEO Score</h3>
                            <p className="text-muted-foreground">Your site's search engine optimization performance</p>
                        </div>
                        <div className="relative w-32 h-32">
                            <svg className="w-full h-full transform -rotate-90">
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="56"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="none"
                                    className="text-secondary"
                                />
                                <circle
                                    cx="64"
                                    cy="64"
                                    r="56"
                                    stroke="currentColor"
                                    strokeWidth="12"
                                    fill="none"
                                    strokeDasharray={`${87 * 3.51} 351`}
                                    className="text-green-500"
                                    strokeLinecap="round"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center flex-col">
                                <span className="text-4xl font-bold">87</span>
                                <span className="text-xs text-muted-foreground">/ 100</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="issues">Issues</TabsTrigger>
                    <TabsTrigger value="keywords">Keywords</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {seoScores.map((item, index) => (
                            <Card key={index}>
                                <CardHeader>
                                    <CardTitle className="text-base">{item.category}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-3xl font-bold">{item.score}</span>
                                            <Badge variant={item.score > 85 ? 'default' : item.score > 70 ? 'secondary' : 'destructive'}>
                                                {item.issues} issues
                                            </Badge>
                                        </div>
                                        <Progress value={item.score} className="h-2" />
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="issues" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>SEO Issues</CardTitle>
                            <CardDescription>Issues found during the last site audit</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                {issues.map((issue, index) => (
                                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-secondary/50">
                                        {issue.type === 'error' ? (
                                            <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                                        ) : issue.type === 'warning' ? (
                                            <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                                        ) : (
                                            <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                                        )}
                                        <div className="flex-1">
                                            <p className="font-medium">{issue.title}</p>
                                            <p className="text-sm text-muted-foreground">{issue.page}</p>
                                        </div>
                                        <Badge className={getSeverityColor(issue.severity)}>
                                            {issue.severity}
                                        </Badge>
                                        <Button variant="outline" size="sm">
                                            Fix
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="keywords" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Keyword Rankings</CardTitle>
                            <CardDescription>Your top performing keywords and their positions</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-border">
                                            <th className="text-left p-4 font-medium text-sm text-muted-foreground">Keyword</th>
                                            <th className="text-center p-4 font-medium text-sm text-muted-foreground">Position</th>
                                            <th className="text-center p-4 font-medium text-sm text-muted-foreground">Change</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {topKeywords.map((keyword, index) => (
                                            <tr key={index} className="border-b border-border last:border-0 hover:bg-secondary/20">
                                                <td className="p-4 font-medium">{keyword.keyword}</td>
                                                <td className="p-4 text-center">
                                                    <Badge variant="secondary">#{keyword.position}</Badge>
                                                </td>
                                                <td className="p-4 text-center">
                                                    <div className={`flex items-center justify-center gap-1 ${keyword.change > 0 ? 'text-green-500' : keyword.change < 0 ? 'text-red-500' : 'text-muted-foreground'
                                                        }`}>
                                                        {keyword.change > 0 ? '+' : ''}{keyword.change}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
