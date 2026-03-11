'use client'

import { usePathname } from 'next/navigation'
import { TransitionProvider } from '@/context/TransitionContext'
import PageTransition from '@/components/transitions/PageTransition'
import '@/lib/gsap/config' // Ensure GSAP plugins are registered

export default function Template({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        <TransitionProvider>
            <PageTransition pathname={pathname}>
                {children}
            </PageTransition>
        </TransitionProvider>
    )
}
