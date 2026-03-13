'use client'

import dynamic from 'next/dynamic'

// These components use browser-only APIs (window/document) —
// they must be rendered entirely client-side, never on the server.
const SocialProofToast = dynamic(() => import('@/components/SocialProofToast'), { ssr: false })
const ExitIntentModal = dynamic(() => import('@/components/ExitIntentModal'), { ssr: false })

export default function ClientOverlays() {
    return (
        <>
            <SocialProofToast />
            <ExitIntentModal />
        </>
    )
}
