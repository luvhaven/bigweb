import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    })
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    })
                    response.cookies.set({
                        name,
                        value: '',
                        ...options,
                    })
                },
            },
        }
    )

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Protect admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Allow access to login page AND debug page
        if (request.nextUrl.pathname === '/admin/login' || request.nextUrl.pathname === '/admin/debug') {
            return response
        }

        if (!user) {
            console.log('[Middleware] No session for admin, redirecting')
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }

        // Check if user has admin or editor role
        const { data: profile, error } = await supabase
            .from('admin_users')
            .select('role')
            .eq('id', user.id)
            .single()

        if (error || !profile) {
            console.log('[Middleware] Profile check failed:', error)
            // Redirect to debug or show error, but better to safe fail to login or debug
            return NextResponse.redirect(new URL('/admin/login?error=no_profile', request.url))
        }

        if (!['super_admin', 'admin', 'editor'].includes(profile.role)) {
            console.log('[Middleware] User unauthorized role')
            return NextResponse.redirect(new URL('/unauthorized', request.url))
        }
    }

    // Protect client routes
    if (request.nextUrl.pathname.startsWith('/client')) {
        if (!user) {
            return NextResponse.redirect(new URL('/client/login', request.url))
        }
    }

    return response
}

export const config = {
    matcher: ['/admin/:path*', '/client/:path*'],
}
