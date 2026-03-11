'use client'

import { ReactLenis } from '@studio-freight/react-lenis'
import { ReactNode } from 'react'

export function LenisProvider({ children }: { children: ReactNode }) {
    return (
        <ReactLenis
            root
            options={{
                lerp: 0.15,
                duration: 1,
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 1,
            }}
        >
            {children}
        </ReactLenis>
    )
}
