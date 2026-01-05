'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Navigation from '@/components/AdvancedNavigation'
import Footer from '@/components/Footer'
import {
    Search,
    Loader2,
    CheckCircle2,
    AlertCircle,
    TrendingUp,
    Zap,
    Target,
    Eye,
    FileText,
    Download,
    Shield,
    Info
} from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import the download button to isolate @react-pdf/renderer from server bundle
const AuditDownloadButton = dynamic(
    () => import('@/components/audit/AuditDownloadButton'),
    {
        ssr: false,
        loading: () => <Button variant="outline" disabled>Loading PDF Engine...</Button>,
    }
)

// Updated Interfaces to match AuditEngine
interface AuditIssue {
    severity: 'critical' | 'warning' | 'info'
    message: string
    recommendation: string
}

interface AuditSection {
    score: number
    issues: AuditIssue[]
    details: Record<string, any>
}

interface AuditReport {
    url: string
    timestamp: string
    overallScore: number
    categories: {
        performance: AuditSection
        seo: AuditSection
        ui: AuditSection
        accessibility: AuditSection
        security: AuditSection
        content: AuditSection
    }
}

export default function AuditPage() {
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const [report, setReport] = useState<AuditReport | null>(null)
    const [error, setError] = useState('')

    const handleAudit = async () => {
        if (!url) {
            setError('Please enter a valid URL')
            return
        }

        setLoading(true)
        setError('')
        setReport(null)

        try {
            const response = await fetch('/api/audit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url }),
            })

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || 'Audit failed');
                }
                setReport(data.report);
            } else {
                // If response is not JSON (likely a 500 server error HTML page)
                const text = await response.text();
                console.error("Non-JSON response:", text);
                throw new Error(`Server returned a non-JSON response (${response.status}). This usually means a server-side error occurred.`);
            }

        } catch (err: any) {
            console.error(err)
            setError(err.message || 'Failed to audit website')
        } finally {
            setLoading(false)
        }
    }

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-500'
        if (score >= 70) return 'text-yellow-500'
        if (score >= 50) return 'text-orange-500'
        return 'text-red-500'
    }

    const getSeverityIcon = (severity: string) => {
        switch (severity) {
            case 'critical': return <AlertCircle className="w-5 h-5 text-red-500" />
            case 'warning': return <AlertCircle className="w-5 h-5 text-orange-500" />
            case 'info': return <Info className="w-5 h-5 text-blue-500" />
            default: return <CheckCircle2 className="w-5 h-5 text-green-500" />
        }
    }

    const getSeverityBg = (severity: string) => {
        switch (severity) {
            case 'critical': return 'bg-red-500/10 border-red-500/20'
            case 'warning': return 'bg-orange-500/10 border-orange-500/20'
            case 'info': return 'bg-blue-500/10 border-blue-500/20'
            default: return 'bg-green-500/10 border-green-500/20'
        }
    }

    return (
        <main className="min-h-screen bg-background">
            <Navigation />

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto max-w-4xl text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full mb-6">
                            <Zap className="w-4 h-4 text-accent" />
                            <span className="text-sm font-semibold text-accent">Free Website Audit Tool</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            Audit Your Website in
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-500">
                                Real-Time
                            </span>
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                            Get a comprehensive analysis of your Performance, SEO, Security, and more.
                            <br />
                            <span className="text-sm opacity-70">Powered by the new Deep-Scan Engine</span>
                        </p>

                        {/* URL Input */}
                        <div className="max-w-2xl mx-auto">
                            <div className="flex gap-4 mb-4">
                                <Input
                                    type="text"
                                    placeholder="example.com"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAudit()}
                                    className="text-lg h-14"
                                    disabled={loading}
                                />
                                <Button
                                    onClick={handleAudit}
                                    disabled={loading || !url}
                                    size="lg"
                                    className="bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-500/90 h-14 px-8"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                            Scanning...
                                        </>
                                    ) : (
                                        <>
                                            <Search className="w-5 h-5 mr-2" />
                                            Audit Website
                                        </>
                                    )}
                                </Button>
                            </div>

                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-2 text-red-500 text-sm"
                                >
                                    <AlertCircle className="w-4 h-4" />
                                    {error}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Report Section */}
            <AnimatePresence mode="wait">
                {report && (
                    <motion.section
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -40 }}
                        transition={{ duration: 0.5 }}
                        className="pb-32 px-6"
                    >
                        <div className="container mx-auto max-w-6xl">
                            {/* Overall Score */}
                            <Card className="mb-8 border-2">
                                <CardContent className="p-8">
                                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                        <div className="flex-1 text-center md:text-left">
                                            <h2 className="text-2xl font-bold mb-2">Audit Report for</h2>
                                            <p className="text-muted-foreground break-all text-lg">{report.url}</p>
                                            <p className="text-sm text-muted-foreground mt-2">
                                                Scanned on {new Date(report.timestamp).toLocaleString()}
                                            </p>
                                        </div>

                                        <div className="relative">
                                            <div className="w-48 h-48 rounded-full bg-gradient-to-br from-background to-secondary flex items-center justify-center border-4 border-accent/20">
                                                <div className="text-center">
                                                    <div className={`text-6xl font-bold ${getScoreColor(report.overallScore)}`}>
                                                        {report.overallScore}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground mt-2">Overall Score</div>
                                                </div>
                                            </div>
                                            <motion.div
                                                className="absolute inset-0 rounded-full opacity-20 blur-2xl"
                                                style={{
                                                    background: `linear-gradient(135deg, hsl(var(--accent)), hsl(270 85% 55%))`
                                                }}
                                                animate={{
                                                    scale: [1, 1.1, 1],
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    repeat: Infinity,
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Score Breakdown */}
                                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-8">
                                        {[
                                            { label: 'Performance', score: report.categories.performance.score, icon: Zap },
                                            { label: 'SEO', score: report.categories.seo.score, icon: TrendingUp },
                                            { label: 'UI/UX', score: report.categories.ui.score, icon: Target },
                                            { label: 'Accessibility', score: report.categories.accessibility.score, icon: Eye },
                                            { label: 'Security', score: report.categories.security.score, icon: Shield },
                                            { label: 'Content', score: report.categories.content.score, icon: FileText },
                                        ].map((item) => {
                                            const Icon = item.icon
                                            return (
                                                <div key={item.label} className="text-center p-4 bg-card border border-border rounded-lg">
                                                    <Icon className={`w-6 h-6 mx-auto mb-2 ${getScoreColor(item.score)}`} />
                                                    <div className={`text-2xl font-bold ${getScoreColor(item.score)}`}>
                                                        {item.score}
                                                    </div>
                                                    <div className="text-xs text-muted-foreground mt-1">{item.label}</div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Detailed Analysis */}
                            <Tabs defaultValue="performance" className="w-full">
                                <TabsList className="grid w-full grid-cols-6 mb-8 h-12">
                                    <TabsTrigger value="performance">Performance</TabsTrigger>
                                    <TabsTrigger value="seo">SEO</TabsTrigger>
                                    <TabsTrigger value="ui">UI/UX</TabsTrigger>
                                    <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
                                    <TabsTrigger value="security">Security</TabsTrigger>
                                    <TabsTrigger value="content">Content</TabsTrigger>
                                </TabsList>

                                {[
                                    { key: 'performance', data: report.categories.performance, title: 'Performance Analysis' },
                                    { key: 'seo', data: report.categories.seo, title: 'SEO Analysis' },
                                    { key: 'ui', data: report.categories.ui, title: 'UI/UX Analysis' },
                                    { key: 'accessibility', data: report.categories.accessibility, title: 'Accessibility Analysis' },
                                    { key: 'security', data: report.categories.security, title: 'Security Analysis' },
                                    { key: 'content', data: report.categories.content, title: 'Content Analysis' },
                                ].map((tab) => (
                                    <TabsContent key={tab.key} value={tab.key} className="space-y-4">
                                        <Card>
                                            <CardHeader>
                                                <div className="flex items-center justify-between">
                                                    <CardTitle className="flex items-center gap-2">
                                                        {tab.title}
                                                    </CardTitle>
                                                    <div className={`text-4xl font-bold ${getScoreColor(tab.data.score)}`}>
                                                        {tab.data.score}
                                                    </div>
                                                </div>
                                                <Progress value={tab.data.score} className="h-2" />
                                            </CardHeader>
                                            <CardContent className="space-y-6">
                                                {/* Issues List */}
                                                {tab.data.issues.length > 0 ? (
                                                    <ul className="space-y-3">
                                                        {tab.data.issues.map((issue, idx) => (
                                                            <motion.li
                                                                key={idx}
                                                                initial={{ opacity: 0, x: -20 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: idx * 0.05 }}
                                                                className={`flex items-start gap-4 p-4 rounded-lg border ${getSeverityBg(issue.severity)}`}
                                                            >
                                                                <div className="mt-1 flex-shrink-0">
                                                                    {getSeverityIcon(issue.severity)}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="font-medium text-sm md:text-base">
                                                                        {issue.message}
                                                                    </p>
                                                                    <p className="text-sm opacity-80 mt-1">
                                                                        <span className="font-semibold">Fix: </span>
                                                                        {issue.recommendation}
                                                                    </p>
                                                                </div>
                                                                <div className="text-xs uppercase font-bold tracking-wider opacity-60 mt-1">
                                                                    {issue.severity}
                                                                </div>
                                                            </motion.li>
                                                        ))}
                                                    </ul>
                                                ) : (
                                                    <div className="text-center py-12 text-muted-foreground flex flex-col items-center">
                                                        <CheckCircle2 className="w-16 h-16 mb-4 text-green-500 opacity-80" />
                                                        <p className="text-lg font-medium">No critical issues found!</p>
                                                        <p className="text-sm">You are doing a great job in this category.</p>
                                                    </div>
                                                )}

                                                {/* Category Details (if any) */}
                                                {Object.keys(tab.data.details).length > 0 && (
                                                    <div className="mt-6 pt-6 border-t">
                                                        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                                                            Technical Details
                                                        </h4>
                                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                                            {Object.entries(tab.data.details).map(([key, value]) => (
                                                                <div key={key} className="p-3 bg-muted/50 rounded-lg">
                                                                    <div className="text-xs text-muted-foreground capitalize">
                                                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                                                    </div>
                                                                    <div className="font-mono font-medium truncate" title={String(value)}>
                                                                        {String(value)}
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </TabsContent>
                                ))}
                            </Tabs>

                            {/* CTA Section */}
                            <Card className="mt-8 bg-gradient-to-br from-accent/10 to-orange-500/10 border-accent/20">
                                <CardContent className="p-8 text-center">
                                    <h3 className="text-2xl font-bold mb-4">Ready to Fix These Issues?</h3>
                                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                                        Our expert engineers can implement these fixes for you, boosting your conversions and search rankings.
                                    </p>
                                    <div className="flex flex-wrap gap-4 justify-center">
                                        <Button
                                            size="lg"
                                            className="bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-500/90"
                                            onClick={() => window.location.href = '/contact'}
                                        >
                                            Get Free Consultation
                                        </Button>

                                        <div className="inline-block">
                                            <AuditDownloadButton report={report} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Features Section - Only show when no report */}
            {!report && (
                <section className="pb-32 px-6">
                    <div className="container mx-auto max-w-6xl">
                        {/* This section remains largely the same, just ensuring icons are mapped correctly */}
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4">Five-Point Expert Analysis</h2>
                            <p className="text-xl text-muted-foreground">
                                We check what others miss.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { icon: Shield, title: 'Security', desc: 'SSL, HSTS, X-Frame checks' },
                                { icon: Zap, title: 'Performance', desc: 'Asset weight, blocking scripts' },
                                { icon: TrendingUp, title: 'SEO', desc: 'Meta, headings, canonicals' },
                                { icon: Eye, title: 'Accessibility', desc: 'ARIA, contrast, labels' },
                                { icon: FileText, title: 'Content', desc: 'Readability, keyword checking' },
                                { icon: Target, title: 'UI/UX', desc: 'Viewport, mobile touch targets' },
                            ].map((f, i) => (
                                <Card key={i} className="bg-card/50 hover:bg-card transition-colors">
                                    <CardHeader>
                                        <f.icon className="w-8 h-8 text-accent mb-2" />
                                        <CardTitle>{f.title}</CardTitle>
                                        <CardDescription>{f.desc}</CardDescription>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </main>
    )
}
