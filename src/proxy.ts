import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const config = {
    // Only run on pages, skip API routes, static assets, and images
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};

export function middleware(req: NextRequest) {
    const response = NextResponse.next();

    // On Vercel, x-vercel-ip-city and x-vercel-ip-country are populated at the edge
    // We extract the city and country to personalize the client experience
    const city = req.headers.get('x-vercel-ip-city') || 'San Francisco';
    const country = req.headers.get('x-vercel-ip-country') || 'US';

    // We set these as cookies so client components (like TrustTicker) can read them instantly
    // without needing Server Component prop drilling. 
    response.cookies.set('bw_city', city, { path: '/', maxAge: 60 * 60 * 24 });
    response.cookies.set('bw_country', country, { path: '/', maxAge: 60 * 60 * 24 });

    // Optional: Simple IP parsing / referrer parsing to detect industry
    const referer = req.headers.get('referer');
    if (referer) {
        if (referer.includes('linkedin')) {
            response.cookies.set('bigweb_industry', 'b2b', { path: '/', maxAge: 60 * 60 * 24 });
        }
    }

    return response;
}
