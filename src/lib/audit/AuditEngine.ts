
import { load } from 'cheerio'

export interface AuditIssue {
    severity: 'critical' | 'warning' | 'info'
    message: string
    recommendation: string
}

export interface AuditSection {
    score: number
    issues: AuditIssue[]
    details: Record<string, any>
}

export interface ComprehensiveReport {
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

export class AuditEngine {
    private html: string
    private url: string
    private $: any
    private headers: Headers

    constructor(url: string, html: string, headers: Headers) {
        this.url = url
        this.html = html
        this.headers = headers
        this.$ = load(html)
    }

    public async run(): Promise<ComprehensiveReport> {
        const performance = this.auditPerformance()
        const seo = this.auditSEO()
        const ui = this.auditUI()
        const accessibility = this.auditAccessibility()
        const security = this.auditSecurity()
        const content = this.auditContent()

        // Weighted average for overall score
        // SEO: 25%, Performance: 25%, Content: 20%, UI: 15%, Security: 5%, Accessibility: 10%
        const overallScore = Math.round(
            (performance.score * 0.25) +
            (seo.score * 0.25) +
            (content.score * 0.20) +
            (ui.score * 0.15) +
            (security.score * 0.05) +
            (accessibility.score * 0.10)
        )

        return {
            url: this.url,
            timestamp: new Date().toISOString(),
            overallScore,
            categories: {
                performance,
                seo,
                ui,
                accessibility,
                security,
                content
            }
        }
    }

    private auditPerformance(): AuditSection {
        const issues: AuditIssue[] = []
        let score = 100

        // 1. Script Heavy check
        const scripts = this.$('script')
        if (scripts.length > 20) {
            score -= 10
            issues.push({
                severity: 'warning',
                message: `Found ${scripts.length} script tags.`,
                recommendation: 'Reduce the number of external scripts or bundle them to improve load times.'
            })
        }

        // 2. Large Image Check (Heuristic based on attributes, not actual size download)
        const images = this.$('img')
        let largeImages = 0
        let missingDimensions = 0

        images.each((_: any, img: any) => {
            const src = this.$(img).attr('src')
            const width = this.$(img).attr('width')
            const height = this.$(img).attr('height')

            if (!width || !height) missingDimensions++

            if (src && !/\.(webp|avif|svg)$/i.test(src)) {
                // Check if likely large format
                if (/\.(png|jpg|jpeg)$/i.test(src)) {
                    largeImages++
                }
            }
        })

        if (missingDimensions > 0) {
            score -= 5
            issues.push({
                severity: 'info',
                message: `${missingDimensions} images appearing without explicit width/height.`,
                recommendation: 'Set explicit width and height on images to prevent Layout Shifts (CLS).'
            })
        }

        if (largeImages > 5) {
            score -= 15
            issues.push({
                severity: 'warning',
                message: `${largeImages} images potentially not using modern formats.`,
                recommendation: 'Use WebP or AVIF formats for images to reduce payload size.'
            })
        }

        // 3. Inline Styles
        const inlineStyles = this.$('[style]').length
        if (inlineStyles > 50) {
            score -= 10
            issues.push({
                severity: 'info',
                message: `High usage of inline styles detected (${inlineStyles} elements).`,
                recommendation: 'Move styles to external CSS files or classes for better caching and performance.'
            })
        }

        // 4. CSS Link Count
        const cssLinks = this.$('link[rel="stylesheet"]').length
        if (cssLinks > 8) {
            score -= 10
            issues.push({
                severity: 'warning',
                message: `Too many external stylesheets (${cssLinks}).`,
                recommendation: 'Combine CSS files to minimize HTTP requests.'
            })
        }

        return { score: Math.max(0, score), issues, details: { scriptCount: scripts.length, imageCount: images.length } }
    }

    private auditSEO(): AuditSection {
        const issues: AuditIssue[] = []
        let score = 100

        // 1. Title Tag
        const title = this.$('title').text()
        if (!title) {
            score -= 30
            issues.push({ severity: 'critical', message: 'Missing <title> tag.', recommendation: 'Add a descriptive title tag.' })
        } else if (title.length < 10 || title.length > 70) {
            score -= 5
            issues.push({ severity: 'info', message: `Title length (${title.length}) is not optimal.`, recommendation: 'Keep title between 10-70 characters.' })
        }

        // 2. Meta Description
        const description = this.$('meta[name="description"]').attr('content')
        if (!description) {
            score -= 20
            issues.push({ severity: 'critical', message: 'Missing Meta Description.', recommendation: 'Add a meta description to improve click-through rates.' })
        } else if (description.length < 50 || description.length > 160) {
            score -= 5
            issues.push({ severity: 'info', message: 'Meta description length is not optimal.', recommendation: 'Keep description between 50-160 characters.' })
        }

        // 3. H1 Existence
        const h1 = this.$('h1')
        if (h1.length === 0) {
            score -= 25
            issues.push({ severity: 'critical', message: 'Missing H1 Heading.', recommendation: 'Ensure the page has exactly one H1 tag.' })
        } else if (h1.length > 1) {
            score -= 10
            issues.push({ severity: 'warning', message: 'Multiple H1 tags found.', recommendation: 'Use only one H1 tag per page for main title.' })
        }

        // 4. Canonical
        const canonical = this.$('link[rel="canonical"]').attr('href')
        if (!canonical) {
            score -= 10
            issues.push({ severity: 'warning', message: 'Missing Canonical URL.', recommendation: 'Add a canonical tag to prevent duplicate content issues.' })
        }

        // 5. Open Graph check
        const ogImage = this.$('meta[property="og:image"]').attr('content')
        if (!ogImage) {
            score -= 10
            issues.push({ severity: 'info', message: 'Missing Social Share Image (OG Image).', recommendation: 'Add an og:image tag for better social sharing visibility.' })
        }

        return { score: Math.max(0, score), issues, details: { title, descriptionLength: description?.length || 0 } }
    }

    private auditUI(): AuditSection {
        const issues: AuditIssue[] = []
        let score = 100

        // 1. Viewport
        const viewport = this.$('meta[name="viewport"]').attr('content')
        if (!viewport) {
            score -= 30
            issues.push({ severity: 'critical', message: 'Missing Viewport Meta Tag.', recommendation: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> for mobile responsiveness.' })
        } else if (!viewport.includes('width=device-width')) {
            score -= 10
            issues.push({ severity: 'warning', message: 'Viewport not optimized for device width.', recommendation: 'Include width=device-width in viewport meta tag.' })
        }

        // 2. Favicon
        const favicon = this.$('link[rel="icon"]').length || this.$('link[rel="shortcut icon"]').length
        if (favicon === 0) {
            score -= 5
            issues.push({ severity: 'info', message: 'Favicon not detected.', recommendation: 'Add a favicon for brand recognition.' })
        }

        // 3. Touch Targets (Buttons & Links)
        const buttons = this.$('button').length
        const links = this.$('a').length
        const inputs = this.$('input').length

        const interactiveElements = buttons + links + inputs
        if (interactiveElements < 3) {
            score -= 10
            issues.push({ severity: 'info', message: 'Very few interactive elements found.', recommendation: 'Ensure users have clear actions to take (Call to Actions, Navigation).' })
        }

        // 4. Form Labels
        const forms = this.$('form').length
        if (forms > 0) {
            const labels = this.$('label').length
            const inputsWithLabels = this.$('input[aria-label]').length + this.$('input[aria-labelledby]').length

            // Simple heuristic: if we have forms but significantly fewer labels than inputs (excluding submits/hidden)
            const tangibleInputs = this.$('input:not([type="hidden"]):not([type="submit"])').length

            if (tangibleInputs > 0 && (labels + inputsWithLabels) < tangibleInputs) {
                score -= 15
                issues.push({ severity: 'warning', message: 'Potential missing form labels.', recommendation: 'Ensure all form inputs have associated <label> elements or aria-labels for usability.' })
            }
        }

        // 5. Font Size Heuristic (looking for small px values in style attrs)
        // This is a rough check as CSS classes are usually used
        const localStyles = this.$('[style]').text() || this.html
        if (/font-size:\s*([0-9]|1[0-1])px/.test(localStyles)) {
            score -= 5
            issues.push({ severity: 'info', message: 'Small font sizes detected (<12px).', recommendation: 'Use a base font size of at least 16px for readability.' })
        }

        return { score: Math.max(0, score), issues, details: { interactiveElementCount: interactiveElements, formCount: forms } }
    }

    private auditAccessibility(): AuditSection {
        const issues: AuditIssue[] = []
        let score = 100

        // 1. Image ALTs
        const images = this.$('img')
        let missingAlt = 0
        images.each((_: any, img: any) => {
            if (!this.$(img).attr('alt')) missingAlt++
        })

        if (missingAlt > 0) {
            score -= Math.min(30, missingAlt * 5)
            issues.push({ severity: 'warning', message: `${missingAlt} images missing alt text.`, recommendation: 'Add descriptive alt attribute to all images.' })
        }

        // 2. Language Attribute
        const lang = this.$('html').attr('lang')
        if (!lang) {
            score -= 15
            issues.push({ severity: 'warning', message: 'Missing HTML lang attribute.', recommendation: 'Define the language of the page (e.g. <html lang="en">).' })
        }

        // 3. Button Access
        const buttons = this.$('button')
        let badButtons = 0
        buttons.each((_: any, btn: any) => {
            const text = this.$(btn).text().trim()
            const label = this.$(btn).attr('aria-label')
            if (!text && !label) badButtons++
        })

        if (badButtons > 0) {
            score -= 10
            issues.push({ severity: 'warning', message: `${badButtons} buttons without text or aria-label.`, recommendation: 'Ensure all buttons have discernible text or an aria-label.' })
        }

        return { score: Math.max(0, score), issues, details: {} }
    }

    private auditSecurity(): AuditSection {
        const issues: AuditIssue[] = []
        let score = 100

        // 1. HTTPS Check
        if (!this.url.startsWith('https://')) {
            score -= 40
            issues.push({ severity: 'critical', message: 'Not using HTTPS.', recommendation: 'Serve website over HTTPS for security and trust.' })
        }

        // 2. Headers Check (Using the headers object passed in)
        const xFrame = this.headers.get('x-frame-options')
        const hsts = this.headers.get('strict-transport-security')
        const contentSecurity = this.headers.get('content-security-policy')

        if (!xFrame && !contentSecurity) { // CSP can handle frame-ancestors
            score -= 5
            issues.push({ severity: 'info', message: 'Missing X-Frame-Options or CSP frame-ancestors.', recommendation: 'Set X-Frame-Options to DENY or SAMEORIGIN to prevent clickjacking.' })
        }

        if (this.url.startsWith('https://') && !hsts) {
            score -= 5
            issues.push({ severity: 'info', message: 'Missing Strict-Transport-Security header.', recommendation: 'Enable HSTS to prevent protocol downgrade attacks.' })
        }

        return { score: Math.max(0, score), issues, details: {} }
    }

    private auditContent(): AuditSection {
        const issues: AuditIssue[] = []
        let score = 100

        // Remove scripts and styles for text analysis
        const clean$ = load(this.html)
        clean$('script').remove()
        clean$('style').remove()
        const text = clean$('body').text().replace(/\s+/g, ' ').trim()
        const wordCount = text.split(' ').length

        if (wordCount < 300) {
            score -= 20
            issues.push({ severity: 'warning', message: `Low word count (${wordCount} words).`, recommendation: 'Add more relevant content. Aim for at least 300 words.' })
        } else if (wordCount > 5000) {
            issues.push({ severity: 'info', message: `Very detailed page (${wordCount} words).`, recommendation: 'Ensure content is well-structured with headings.' })
        }

        // Check for specific dummy text
        if (text.toLowerCase().includes('lorem ipsum')) {
            score -= 50
            issues.push({ severity: 'critical', message: 'Lorem Ipsum placeholder text detected.', recommendation: 'Replace all placeholder text with real content.' })
        }

        return { score: Math.max(0, score), issues, details: { wordCount } }
    }
}
