'use client'

import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import gsap from 'gsap'

interface TransitionContextType {
    isTransitioning: boolean
    startTransition: () => void
    endTransition: () => void
    timeline: gsap.core.Timeline | null
    setTimeline: (timeline: gsap.core.Timeline | null) => void
}

const TransitionContext = createContext<TransitionContextType | undefined>(undefined)

export function TransitionProvider({ children }: { children: ReactNode }) {
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null)

    const startTransition = useCallback(() => {
        setIsTransitioning(true)
    }, [])

    const endTransition = useCallback(() => {
        setIsTransitioning(false)
        setTimeline(null)
    }, [])

    return (
        <TransitionContext.Provider
            value={{
                isTransitioning,
                startTransition,
                endTransition,
                timeline,
                setTimeline,
            }}
        >
            {children}
        </TransitionContext.Provider>
    )
}

export function useTransition() {
    const context = useContext(TransitionContext)
    if (!context) {
        throw new Error('useTransition must be used within TransitionProvider')
    }
    return context
}
