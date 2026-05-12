'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { useTouchDevice } from '@/hooks/useTouchDevice'

export default function MagneticEffect() {
    const isTouch = useTouchDevice()

    useEffect(() => {
        if (isTouch) return

        const magneticElements = document.querySelectorAll('.magnetic-wrap')

        magneticElements.forEach((element) => {
            const area = element.querySelector('.magnetic-area') as HTMLElement
            const target = element.children[1] as HTMLElement // The actual button/link is usually the second child after magnetic-area

            if (!area || !target) return

            const handleMouseMove = (e: MouseEvent) => {
                const { clientX, clientY } = e
                const { left, top, width, height } = element.getBoundingClientRect()

                const x = clientX - (left + width / 2)
                const y = clientY - (top + height / 2)

                gsap.to(target, {
                    x: x * 0.5,
                    y: y * 0.5,
                    duration: 0.6,
                    ease: 'power3.out'
                })
            }

            const handleMouseLeave = () => {
                gsap.to(target, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: 'elastic.out(1, 0.3)'
                })
            }

            element.addEventListener('mousemove', handleMouseMove as any)
            element.addEventListener('mouseleave', handleMouseLeave as any)

            // Cleanup
            return () => {
                element.removeEventListener('mousemove', handleMouseMove as any)
                element.removeEventListener('mouseleave', handleMouseLeave as any)
            }
        })
    }, [isTouch])

    return null
}
