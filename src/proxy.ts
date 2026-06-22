import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const config = {
    // Only run on pages, skip API routes, static assets, and images
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};

export async function proxy(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    // 1. Supabase Authentication Handshake
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({ name, value, ...options })
                    response = NextResponse.next({
                        request: { headers: request.headers },
                    })
                    response.cookies.set({ name, value, ...options })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({ name, value: '', ...options })
                    response = NextResponse.next({
                        request: { headers: request.headers },
                    })
                    response.cookies.set({ name, value: '', ...options })
                },
            },
        }
    );

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // 2. Protect explicit secure routes (Admin/Client bounds)
    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (request.nextUrl.pathname === '/admin/login' || request.nextUrl.pathname === '/admin/debug') {
            // allow bypass
        } else if (!user) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        } else {
            const { data: profile, error } = await supabase
                .from('admin_users')
                .select('role')
                .eq('id', user.id)
                .single()

            if (error || !profile) {
                return NextResponse.redirect(new URL('/admin/login?error=no_profile', request.url))
            }

            if (!['super_admin', 'admin', 'editor'].includes(profile.role)) {
                return NextResponse.redirect(new URL('/unauthorized', request.url))
            }
        }
    }

    if (request.nextUrl.pathname.startsWith('/client')) {
        if (!user) {
            return NextResponse.redirect(new URL('/client/login', request.url))
        }
    }

    // 3. User Geolocation extraction routines for contextual layout binding
    const city = request.headers.get('x-vercel-ip-city') || 'San Francisco';
    const country = request.headers.get('x-vercel-ip-country') || 'US';

    response.cookies.set('bw_city', city, { path: '/', maxAge: 60 * 60 * 24 });
    response.cookies.set('bw_country', country, { path: '/', maxAge: 60 * 60 * 24 });

    const referer = request.headers.get('referer');
    if (referer && referer.includes('linkedin')) {
        response.cookies.set('bigweb_industry', 'b2b', { path: '/', maxAge: 60 * 60 * 24 });
    }

    return response;
}
