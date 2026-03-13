'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

// Lazy loaded — no SSR
const ScrollProgressIndicator = dynamic(() => import('@/components/ui/ScrollProgressIndicator'), { ssr: false })
const RippleEffect = dynamic(() => import('@/components/effects/RippleEffect'), { ssr: false })
const LiveVisitorCounter = dynamic(() => import('@/components/trust/LiveVisitorCounter'), { ssr: false })
const SiteLoader = dynamic(() => import('@/components/effects/SiteLoader'), { ssr: false })
const GlobalCursor = dynamic(() => import('@/components/effects/GlobalCursor'), { ssr: false })

export default function ClientLayoutEnhancements() {
    const pathname = usePathname()
    if (pathname?.startsWith('/admin')) return null

    return (
        <>
            <GlobalCursor />
            <SiteLoader />
            <ScrollProgressIndicator />
            <RippleEffect />
            <LiveVisitorCounter />
        </>
    )
}
