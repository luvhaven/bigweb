
'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

export function useAnalytics() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const sessionId = useRef<string | null>(null);

    useEffect(() => {
        // Initialize Session ID
        if (!sessionId.current) {
            let storedSession = sessionStorage.getItem('analytics_session_id');
            if (!storedSession) {
                storedSession = uuidv4();
                sessionStorage.setItem('analytics_session_id', storedSession);
            }
            sessionId.current = storedSession;
        }

        // Track Pageview
        const trackPageview = async () => {
            try {
                await fetch('/api/analytics/track', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        type: 'pageview',
                        data: {
                            page: pathname,
                            sessionId: sessionId.current,
                            referrer: document.referrer,
                        },
                    }),
                });
            } catch (err: any) {
                // Silently handle fetch errors (likely ad-blockers or connection issues)
                if (process.env.NODE_ENV === 'development') {
                    console.debug('Analytics pageview tracking suppressed:', {
                        message: err.message,
                        url: '/api/analytics/track',
                        error: err
                    });
                }
            }
        };

        trackPageview();
    }, [pathname, searchParams]);

    const trackEvent = async (event: string, category: string, label?: string, value?: number) => {
        try {
            await fetch('/api/analytics/track', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'event',
                    data: {
                        event,
                        category,
                        label,
                        value,
                        sessionId: sessionId.current,
                    },
                }),
            });
        } catch (err) {
            if (process.env.NODE_ENV === 'development') {
                console.debug('Analytics event tracking suppressed:', err);
            }
        }
    };

    return { trackEvent };
}
