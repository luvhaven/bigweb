
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseUserAgent, getCountryFromHeaders, getCityFromHeaders } from '@/lib/analytics-utils';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { type, data } = body;
        const headers = request.headers;
        const userAgent = headers.get('user-agent') || '';

        // Parse User Agent and Geo Data
        const uaInfo = parseUserAgent(userAgent);
        const country = getCountryFromHeaders(headers) || 'Unknown';
        const city = getCityFromHeaders(headers) || 'Unknown';

        if (type === 'pageview') {
            await prisma.pageView.create({
                data: {
                    page: data.page,
                    referrer: data.referrer || null,
                    userAgent: userAgent,
                    sessionId: data.sessionId,
                    country,
                    city,
                    device: uaInfo.device,
                    browser: uaInfo.browser,
                    os: uaInfo.os,
                },
            });
        } else if (type === 'event') {
            await prisma.event.create({
                data: {
                    event: data.event,
                    category: data.category,
                    label: data.label,
                    value: data.value,
                    metadata: data.metadata,
                },
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Analytics Error:', error);
        return NextResponse.json({ success: false, error: 'Failed to track' }, { status: 500 });
    }
}
