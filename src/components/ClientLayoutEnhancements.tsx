'use client'

import dynamic from 'next/dynamic'
import { usePathname } from 'next/navigation'

// Only lightweight scroll indicator - heavy effects removed for performance
const ScrollProgressIndicator = dynamic(() => import('@/components/ui/ScrollProgressIndicator'), { ssr: false })

export default function ClientLayoutEnhancements() {
    const pathname = usePathname()
    if (pathname?.startsWith('/admin')) return null

    return (
        <>
            <ScrollProgressIndicator />
        </>
    )
}

