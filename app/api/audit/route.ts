
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { AuditEngine, ComprehensiveReport } from '@/lib/audit/AuditEngine'

export async function POST(request: NextRequest) {
    try {
        const { url } = await request.json()

        if (!url) {
            return NextResponse.json(
                { error: 'URL is required' },
                { status: 400 }
            )
        }

        // Fix URL (Strictly enforcing https unless http is explicit, but mainly ensuring protocol exists)
        let targetUrl = url.trim()
        if (!/^https?:\/\//i.test(targetUrl)) {
            targetUrl = `https://${targetUrl}`
        }

        // 1. Fetch the website content
        // We'll use a standard fetch with a timeout
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 15000) // 15s timeout

        let response: Response
        try {
            response = await fetch(targetUrl, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (compatible; BIGWEB-Audit/2.0; +https://bigwebdigital.com)'
                },
                signal: controller.signal
            })
        } catch (fetchError: any) {
            clearTimeout(timeoutId)
            throw new Error(`Failed to fetch website. It might be down or blocking bots. Error: ${fetchError.message}`)
        }
        clearTimeout(timeoutId)

        if (!response.ok) {
            throw new Error(`Website returned error status: ${response.status} ${response.statusText}`)
        }

        const html = await response.text()

        // 2. Run the Audit Engine
        const engine = new AuditEngine(targetUrl, html, response.headers)
        const report: ComprehensiveReport = await engine.run()

        // 3. Save to Supabase (bypassing broken Prisma)
        const supabase = await createClient()

        // We'll store this in the 'events' table as before, but using Supabase SDK
        const { error: dbError } = await supabase
            .from('events')
            .insert({
                event: 'website_audit',
                category: 'audit',
                label: targetUrl,
                value: report.overallScore,
                metadata: report
            })

        if (dbError) {
            console.error('Failed to save audit to Supabase:', dbError)
            // We don't fail the request if saving fails, just log it
        }

        return NextResponse.json({ success: true, report })

    } catch (error: any) {
        console.error('Audit error:', error)
        return NextResponse.json(
            { error: error.message || 'Failed to audit website' },
            { status: 500 }
        )
    }
}
