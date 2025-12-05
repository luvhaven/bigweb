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
        if (!session) {
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }

        // Check if user has admin or editor role
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single()

        if (!profile || !['admin', 'editor'].includes(profile.role)) {
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
