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
    Download
} from 'lucide-react'

interface AuditScore {
    score: number
    issues: string[]
    recommendations: string[]
}

interface AuditReport {
    url: string
    performanceScore: number
    seoScore: number
    uiScore: number
    accessibilityScore: number
    copyScore: number
    overallScore: number
    performance: AuditScore
    seo: AuditScore
    ui: AuditScore
    accessibility: AuditScore
    copy: AuditScore
    timestamp: string
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

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Audit failed')
            }

            setReport(data.report)
        } catch (err: any) {
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

    const getScoreBg = (score: number) => {
        if (score >= 90) return 'from-green-500 to-emerald-500'
        if (score >= 70) return 'from-yellow-500 to-orange-500'
        if (score >= 50) return 'from-orange-500 to-red-500'
        return 'from-red-500 to-rose-500'
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
                                30 Seconds
                            </span>
                        </h1>

                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-12">
                            Get a comprehensive analysis of your website's performance, SEO, UI/UX, accessibility, and content quality — completely free.
                        </p>

                        {/* URL Input */}
                        <div className="max-w-2xl mx-auto">
                            <div className="flex gap-4 mb-4">
                                <Input
                                    type="url"
                                    placeholder="https://example.com"
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
                                            Analyzing...
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
                                            <p className="text-muted-foreground break-all">{report.url}</p>
                                            <p className="text-sm text-muted-foreground mt-2">
                                                {new Date(report.timestamp).toLocaleString()}
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
                                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
                                        {[
                                            { label: 'Performance', score: report.performanceScore, icon: Zap },
                                            { label: 'SEO', score: report.seoScore, icon: TrendingUp },
                                            { label: 'UI/UX', score: report.uiScore, icon: Target },
                                            { label: 'Accessibility', score: report.accessibilityScore, icon: Eye },
                                            { label: 'Content', score: report.copyScore, icon: FileText },
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
                                <TabsList className="grid w-full grid-cols-5">
                                    <TabsTrigger value="performance">Performance</TabsTrigger>
                                    <TabsTrigger value="seo">SEO</TabsTrigger>
                                    <TabsTrigger value="ui">UI/UX</TabsTrigger>
                                    <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
                                    <TabsTrigger value="copy">Content</TabsTrigger>
                                </TabsList>

                                {[
                                    { key: 'performance', data: report.performance, title: 'Performance Analysis' },
                                    { key: 'seo', data: report.seo, title: 'SEO Analysis' },
                                    { key: 'ui', data: report.ui, title: 'UI/UX Analysis' },
                                    { key: 'accessibility', data: report.accessibility, title: 'Accessibility Analysis' },
                                    { key: 'copy', data: report.copy, title: 'Content Analysis' },
                                ].map((tab) => (
                                    <TabsContent key={tab.key} value={tab.key} className="space-y-4">
                                        <Card>
                                            <CardHeader>
                                                <div className="flex items-center justify-between">
                                                    <CardTitle>{tab.title}</CardTitle>
                                                    <div className={`text-4xl font-bold ${getScoreColor(tab.data.score)}`}>
                                                        {tab.data.score}
                                                    </div>
                                                </div>
                                                <Progress value={tab.data.score} className="h-2" />
                                            </CardHeader>
                                            <CardContent className="space-y-6">
                                                {/* Issues */}
                                                {tab.data.issues.length > 0 && (
                                                    <div>
                                                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                                            <AlertCircle className="w-5 h-5 text-orange-500" />
                                                            Issues Found ({tab.data.issues.length})
                                                        </h3>
                                                        <ul className="space-y-2">
                                                            {tab.data.issues.map((issue, idx) => (
                                                                <motion.li
                                                                    key={idx}
                                                                    initial={{ opacity: 0, x: -20 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: idx * 0.05 }}
                                                                    className="flex items-start gap-3 p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg"
                                                                >
                                                                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                                                                    <span className="text-sm">{issue}</span>
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {/* Recommendations */}
                                                {tab.data.recommendations.length > 0 && (
                                                    <div>
                                                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                                            <CheckCircle2 className="w-5 h-5 text-green-500" />
                                                            Recommendations ({tab.data.recommendations.length})
                                                        </h3>
                                                        <ul className="space-y-2">
                                                            {tab.data.recommendations.map((rec, idx) => (
                                                                <motion.li
                                                                    key={idx}
                                                                    initial={{ opacity: 0, x: -20 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    transition={{ delay: idx * 0.05 }}
                                                                    className="flex items-start gap-3 p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
                                                                >
                                                                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                                                    <span className="text-sm">{rec}</span>
                                                                </motion.li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                )}

                                                {tab.data.issues.length === 0 && tab.data.recommendations.length === 0 && (
                                                    <div className="text-center py-8 text-muted-foreground">
                                                        <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-green-500" />
                                                        <p>No issues found! Great job! 🎉</p>
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
                                    <h3 className="text-2xl font-bold mb-4">Need Help Fixing These Issues?</h3>
                                    <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                                        Our team specializes in optimizing websites for performance, SEO, and conversions.
                                        Let us help you turn these insights into results.
                                    </p>
                                    <div className="flex flex-wrap gap-4 justify-center">
                                        <Button
                                            size="lg"
                                            className="bg-gradient-to-r from-accent to-orange-500 hover:from-accent/90 hover:to-orange-500/90"
                                            onClick={() => window.location.href = '/contact'}
                                        >
                                            Get Free Consultation
                                        </Button>
                                        <Button
                                            size="lg"
                                            variant="outline"
                                            onClick={() => window.print()}
                                        >
                                            <Download className="w-4 h-4 mr-2" />
                                            Download Report
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </motion.section>
                )}
            </AnimatePresence>

            {/* Features Section */}
            {!report && (
                <section className="pb-32 px-6">
                    <div className="container mx-auto max-w-6xl">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl font-bold mb-4">What We Analyze</h2>
                            <p className="text-xl text-muted-foreground">
                                Comprehensive website audit across 5 critical categories
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[
                                {
                                    icon: Zap,
                                    title: 'Performance',
                                    description: 'Page speed, image optimization, render-blocking resources, and loading times',
                                    color: 'from-yellow-500 to-orange-500'
                                },
                                {
                                    icon: TrendingUp,
                                    title: 'SEO',
                                    description: 'Meta tags, heading structure, alt texts, canonical tags, and Open Graph',
                                    color: 'from-blue-500 to-cyan-500'
                                },
                                {
                                    icon: Target,
                                    title: 'UI/UX',
                                    description: 'Mobile responsiveness, font sizes, touch targets, and form usability',
                                    color: 'from-purple-500 to-pink-500'
                                },
                                {
                                    icon: Eye,
                                    title: 'Accessibility',
                                    description: 'ARIA landmarks, screen reader compatibility, color contrast, and semantic HTML',
                                    color: 'from-green-500 to-emerald-500'
                                },
                                {
                                    icon: FileText,
                                    title: 'Content Quality',
                                    description: 'Copy readability, call-to-actions, value propositions, and content length',
                                    color: 'from-red-500 to-rose-500'
                                },
                                {
                                    icon: Download,
                                    title: 'Detailed Report',
                                    description: 'Get actionable recommendations and export your audit report as PDF',
                                    color: 'from-orange-500 to-amber-500'
                                },
                            ].map((feature, idx) => {
                                const Icon = feature.icon
                                return (
                                    <motion.div
                                        key={feature.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        whileHover={{ y: -5 }}
                                    >
                                        <Card className="h-full hover:border-accent/50 transition-all">
                                            <CardHeader>
                                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4`}>
                                                    <Icon className="w-6 h-6 text-white" />
                                                </div>
                                                <CardTitle>{feature.title}</CardTitle>
                                                <CardDescription>{feature.description}</CardDescription>
                                            </CardHeader>
                                        </Card>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </main>
    )
}
