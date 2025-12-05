import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../src/lib/prisma'

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

export async function POST(request: NextRequest) {
    try {
        const { url, fullSite = false } = await request.json()

        if (!url) {
            return NextResponse.json(
                { error: 'URL is required' },
                { status: 400 }
            )
        }

        // Validate URL
        const urlPattern = /^https?:\/\/.+/
        if (!urlPattern.test(url)) {
            return NextResponse.json(
                { error: 'Invalid URL format. Please include http:// or https://' },
                { status: 400 }
            )
        }

        // Run comprehensive audit
        const report = await runAudit(url, fullSite)

        // Save audit to database
        await prisma.event.create({
            data: {
                event: 'website_audit',
                category: 'audit',
                label: url,
                value: report.overallScore,
                metadata: report as any,
            },
        })

        return NextResponse.json({ success: true, report })
    } catch (error: any) {
        console.error('Audit error:', error)
        return NextResponse.json(
            { error: 'Failed to audit website: ' + error.message },
            { status: 500 }
        )
    }
}

async function runAudit(url: string, fullSite: boolean): Promise<AuditReport> {
    // Fetch the website
    const response = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; BIGWEB-Audit/1.0)',
        },
    })

    if (!response.ok) {
        throw new Error(`Failed to fetch website: ${response.status} ${response.statusText}`)
    }

    const html = await response.text()
    const contentType = response.headers.get('content-type') || ''

    // Run parallel audits
    const [performance, seo, ui, accessibility, copy] = await Promise.all([
        auditPerformance(url, html),
        auditSEO(html, url),
        auditUI(html),
        auditAccessibility(html),
        auditCopy(html),
    ])

    const overallScore = Math.round(
        (performance.score + seo.score + ui.score + accessibility.score + copy.score) / 5
    )

    return {
        url,
        performanceScore: performance.score,
        seoScore: seo.score,
        uiScore: ui.score,
        accessibilityScore: accessibility.score,
        copyScore: copy.score,
        overallScore,
        performance,
        seo,
        ui,
        accessibility,
        copy,
        timestamp: new Date().toISOString(),
    }
}

// Performance Audit
async function auditPerformance(url: string, html: string): Promise<AuditScore> {
    const issues: string[] = []
    const recommendations: string[] = []
    let score = 100

    // Check HTTPS
    if (!url.startsWith('https://')) {
        issues.push('Site not using HTTPS')
        recommendations.push('Enable HTTPS for better security and SEO')
        score -= 15
    }

    // Check for large images
    const imgTags = html.match(/<img[^>]+>/g) || []
    const largeImages = imgTags.filter(img => {
        const src = img.match(/src=["']([^"']+)["']/)?.[1]
        return src && !src.includes('webp') && !src.includes('avif')
    })

    if (largeImages.length > 0) {
        issues.push(`${largeImages.length} images not using modern formats (WebP/AVIF)`)
        recommendations.push('Convert images to WebP or AVIF format for 30-50% size reduction')
        score -= Math.min(20, largeImages.length * 2)
    }

    // Check for inline styles
    const inlineStyles = (html.match(/style="/g) || []).length
    if (inlineStyles > 10) {
        issues.push(`${inlineStyles} instances of inline styles found`)
        recommendations.push('Move inline styles to external CSS files for better performance')
        score -= Math.min(10, inlineStyles)
    }

    // Check for render-blocking resources
    const cssLinks = (html.match(/<link[^>]+rel=["']stylesheet["'][^>]*>/g) || []).length
    if (cssLinks > 5) {
        issues.push(`${cssLinks} CSS files may be render-blocking`)
        recommendations.push('Combine and minify CSS files, use critical CSS inline')
        score -= Math.min(15, cssLinks * 2)
    }

    return {
        score: Math.max(0, score),
        issues,
        recommendations,
    }
}

// SEO Audit
async function auditSEO(html: string, url: string): Promise<AuditScore> {
    const issues: string[] = []
    const recommendations: string[] = []
    let score = 100

    // Check title tag
    const titleMatch = html.match(/<title>([^<]+)<\/title>/)
    if (!titleMatch) {
        issues.push('Missing title tag')
        recommendations.push('Add a descriptive title tag (50-60 characters)')
        score -= 20
    } else {
        const titleLength = titleMatch[1].length
        if (titleLength < 30 || titleLength > 60) {
            issues.push(`Title tag length (${titleLength}) not optimal`)
            recommendations.push('Title should be 50-60 characters for best SEO')
            score -= 5
        }
    }

    // Check meta description
    const metaDesc = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i)
    if (!metaDesc) {
        issues.push('Missing meta description')
        recommendations.push('Add meta description (150-160 characters)')
        score -= 15
    }

    // Check heading structure
    const h1Count = (html.match(/<h1[^>]*>/g) || []).length
    if (h1Count === 0) {
        issues.push('No H1 heading found')
        recommendations.push('Add exactly one H1 heading per page')
        score -= 15
    } else if (h1Count > 1) {
        issues.push(`Multiple H1 headings (${h1Count}) found`)
        recommendations.push('Use only one H1 heading per page')
        score -= 10
    }

    // Check alt tags on images
    const images = html.match(/<img[^>]+>/g) || []
    const imagesWithoutAlt = images.filter(img => !img.includes('alt='))
    if (imagesWithoutAlt.length > 0) {
        issues.push(`${imagesWithoutAlt.length} images missing alt attributes`)
        recommendations.push('Add descriptive alt text to all images for accessibility and SEO')
        score -= Math.min(20, imagesWithoutAlt.length * 3)
    }

    // Check for canonical tag
    if (!html.includes('rel="canonical"')) {
        issues.push('Missing canonical tag')
        recommendations.push('Add canonical tag to prevent duplicate content issues')
        score -= 5
    }

    // Check for Open Graph tags
    if (!html.includes('property="og:')) {
        issues.push('Missing Open Graph tags')
        recommendations.push('Add OG tags for better social media sharing')
        score -= 10
    }

    return {
        score: Math.max(0, score),
        issues,
        recommendations,
    }
}

// UI/UX Audit
async function auditUI(html: string): Promise<AuditScore> {
    const issues: string[] = []
    const recommendations: string[] = []
    let score = 100

    // Check viewport meta tag
    if (!html.includes('name="viewport"')) {
        issues.push('Missing viewport meta tag')
        recommendations.push('Add viewport meta tag for mobile responsiveness')
        score -= 20
    }

    // Check for mobile-friendly font sizes
    const smallFonts = html.match(/font-size:\s*([0-9]|1[0-2])px/g) || []
    if (smallFonts.length > 0) {
        issues.push(`${smallFonts.length} instances of very small fonts (<13px)`)
        recommendations.push('Use minimum 14px font size for better readability')
        score -= Math.min(15, smallFonts.length * 2)
    }

    // Check for touch targets (buttons/links)
    const buttons = (html.match(/<button[^>]*>/g) || []).length
    const links = (html.match(/<a\s+[^>]*href=/g) || []).length

    if (buttons + links < 3) {
        issues.push('Very few interactive elements detected')
        recommendations.push('Add clear call-to-action buttons')
        score -= 10
    }

    // Check for forms
    const forms = (html.match(/<form[^>]*>/g) || []).length
    if (forms > 0) {
        const labels = (html.match(/<label[^>]*>/g) || []).length
        if (labels < forms) {
            issues.push('Forms missing proper labels')
            recommendations.push('Add labels to all form inputs for better UX')
            score -= 15
        }
    }

    return {
        score: Math.max(0, score),
        issues,
        recommendations,
    }
}

// Accessibility Audit
async function auditAccessibility(html: string): Promise<AuditScore> {
    const issues: string[] = []
    const recommendations: string[] = []
    let score = 100

    // Check for lang attribute
    if (!html.match(/<html[^>]+lang=/)) {
        issues.push('Missing lang attribute on html tag')
        recommendations.push('Add lang="en" to html tag for screen readers')
        score -= 10
    }

    // Check for ARIA landmarks
    const hasMain = html.includes('<main')
    const hasNav = html.includes('<nav')
    const hasFooter = html.includes('<footer')

    if (!hasMain) {
        issues.push('Missing <main> landmark')
        recommendations.push('Use semantic <main> tag for main content')
        score -= 10
    }

    if (!hasNav) {
        issues.push('Missing <nav> landmark')
        recommendations.push('Use semantic <nav> tag for navigation')
        score -= 5
    }

    // Check for skip links
    if (!html.includes('skip')) {
        issues.push('No skip navigation link found')
        recommendations.push('Add "skip to main content" link for keyboard users')
        score -= 10
    }

    // Check button accessibility
    const buttons = html.match(/<button[^>]*>/g) || []
    const buttonsWithoutText = buttons.filter(btn => {
        return !btn.includes('aria-label') && !btn.includes('>')
    })

    if (buttonsWithoutText.length > 0) {
        issues.push(`${buttonsWithoutText.length} buttons without accessible text`)
        recommendations.push('Add aria-label or visible text to all buttons')
        score -= Math.min(15, buttonsWithoutText.length * 5)
    }

    // Check for color contrast issues (basic check)
    const hasLightText = html.includes('white') || html.includes('#fff')
    const hasLightBg = html.includes('white') || html.includes('#fff')

    if (hasLightText && hasLightBg) {
        issues.push('Potential color contrast issues detected')
        recommendations.push('Ensure 4.5:1 contrast ratio for normal text')
        score -= 10
    }

    return {
        score: Math.max(0, score),
        issues,
        recommendations,
    }
}

// Copy/Content Audit
async function auditCopy(html: string): Promise<AuditScore> {
    const issues: string[] = []
    const recommendations: string[] = []
    let score = 100

    // Extract text content
    const textContent = html
        .replace(/<script[^>]*>.*?<\/script>/gs, '')
        .replace(/<style[^>]*>.*?<\/style>/gs, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()

    const wordCount = textContent.split(' ').filter(w => w.length > 3).length

    // Check content length
    if (wordCount < 300) {
        issues.push(`Low word count (${wordCount} words)`)
        recommendations.push('Add more content (300+ words) for better SEO')
        score -= 20
    }

    // Check for CTAs
    const hasCTA = /contact|get started|sign up|buy now|learn more|try|demo|free/i.test(textContent)
    if (!hasCTA) {
        issues.push('No clear call-to-action detected')
        recommendations.push('Add clear CTAs to guide user actions')
        score -= 15
    }

    // Check readability (simple Flesch approximation)
    const sentences = textContent.split(/[.!?]+/).length
    const avgWordsPerSentence = wordCount / Math.max(1, sentences)

    if (avgWordsPerSentence > 25) {
        issues.push(`Long sentences detected (avg ${Math.round(avgWordsPerSentence)} words)`)
        recommendations.push('Use shorter sentences (15-20 words) for better readability')
        score -= 10
    }

    // Check for value proposition
    const hasValue = /save|improve|increase|reduce|boost|grow|better|fast/i.test(textContent)
    if (!hasValue) {
        issues.push('Weak value proposition detected')
        recommendations.push('Clearly communicate benefits and value')
        score -= 15
    }

    return {
        score: Math.max(0, score),
        issues,
        recommendations,
    }
}
