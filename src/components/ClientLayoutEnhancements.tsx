'use client'

import dynamic from 'next/dynamic'

// Client-only UI Enhancements (Lazy Loaded)
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false })
const ScrollProgressIndicator = dynamic(() => import('@/components/ui/ScrollProgressIndicator'), { ssr: false })
const RippleEffect = dynamic(() => import('@/components/effects/RippleEffect'), { ssr: false })

// Interaction Components (Lazy Loaded)
const ExitIntentModal = dynamic(() => import('@/components/conversion/ExitIntentModal'), { ssr: false })
const StickyCTA = dynamic(() => import('@/components/conversion/StickyCTA'), { ssr: false })
const LiveVisitorCounter = dynamic(() => import('@/components/trust/LiveVisitorCounter'), { ssr: false })
const LiveChatWidget = dynamic(() => import('@/components/LiveChatWidget'), { ssr: false })

import { usePathname } from 'next/navigation'

export default function ClientLayoutEnhancements() {
    const pathname = usePathname()
    // Don't render engagement widgets on Admin pages
    if (pathname?.startsWith('/admin')) {
        return null
    }

    return (
        <>
            <CustomCursor />
            <ScrollProgressIndicator />
            <RippleEffect />
            <LiveChatWidget />
            <ExitIntentModal />
            <StickyCTA />
            <LiveVisitorCounter />
        </>
    )
}
