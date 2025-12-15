import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req: request, res })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    // Protect admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Allow access to login page AND debug page
        if (request.nextUrl.pathname === '/admin/login' || request.nextUrl.pathname === '/admin/debug') {
            return res
        }

        if (!session) {
            console.log('[Middleware] No session for admin, redirecting')
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }

        // Check if user has admin or editor role
        const { data: profile, error } = await supabase
            .from('admin_users')
            .select('role')
            .eq('id', session.user.id)
            .single()

        if (error || !profile) {
            console.log('[Middleware] Profile check failed:', error)
            // Temporarily allow access if profile is missing to debug, OR redirect to debug
            // For now, let's redirect to debug if profile is missing, so user can see why
            return NextResponse.redirect(new URL('/admin/debug', request.url))
        }

        if (!['admin', 'editor'].includes(profile.role)) {
            console.log('[Middleware] User unauthorized role')
            return NextResponse.redirect(new URL('/unauthorized', request.url))
        }
    }

    // Protect client routes
    if (request.nextUrl.pathname.startsWith('/client')) {
        if (!session) {
            return NextResponse.redirect(new URL('/client/login', request.url))
        }
    }

    return res
}

export const config = {
    matcher: ['/admin/:path*', '/client/:path*'],
}
