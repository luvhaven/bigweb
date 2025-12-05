'use client'

import { useCallback } from 'react'

export function useHaptic() {
    const trigger = useCallback((pattern: 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning' = 'light') => {
        if (typeof window !== 'undefined' && window.navigator && window.navigator.vibrate) {
            switch (pattern) {
                case 'light':
                    window.navigator.vibrate(10)
                    break
                case 'medium':
                    window.navigator.vibrate(20)
                    break
                case 'heavy':
                    window.navigator.vibrate(40)
                    break
                case 'success':
                    window.navigator.vibrate([10, 30, 10])
                    break
                case 'error':
                    window.navigator.vibrate([50, 30, 50])
                    break
                case 'warning':
                    window.navigator.vibrate([30, 30])
                    break
            }
        }
    }, [])

    return trigger
}
