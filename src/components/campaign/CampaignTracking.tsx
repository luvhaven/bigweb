'use client'

import { useEffect } from 'react'

export default function CampaignTracking({ packageSlug }: { packageSlug: string }) {
    useEffect(() => {
        // Generate visitor ID (persists in localStorage)
        let visitorId = localStorage.getItem('campaign_visitor_id')
        if (!visitorId) {
            visitorId = `visitor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            localStorage.setItem('campaign_visitor_id', visitorId)
        }

        // Generate session ID (new each session)
        let sessionId = sessionStorage.getItem('campaign_session_id')
        if (!sessionId) {
            sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
            sessionStorage.setItem('campaign_session_id', sessionId)
        }

        // Detect device type
        const deviceType = /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop'

        // Track page view
        const trackEvent = async (eventType: string) => {
            try {
                await fetch('/api/campaign/analytics', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        packageSlug,
                        eventType,
                        visitorId,
                        sessionId,
                        referrer: document.referrer,
                        deviceType
                    })
                })
            } catch (error) {
                console.error('Tracking error:', error)
            }
        }

        trackEvent('page_view')

        // Track CTA clicks
        const handleCtaClick = () => trackEvent('cta_click')
        const ctaButtons = document.querySelectorAll('[data-cta]')
        ctaButtons.forEach(btn => btn.addEventListener('click', handleCtaClick))

        return () => {
            ctaButtons.forEach(btn => btn.removeEventListener('click', handleCtaClick))
        }
    }, [packageSlug])

    return null
}
