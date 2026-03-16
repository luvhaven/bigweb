'use client'

import React, { useRef, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger)
}

interface AnimatedImageProps extends ImageProps {
    containerClassName?: string
    parallaxSpeed?: number // 0 for no parallax, e.g., 0.2 for subtle
    revealDirection?: 'up' | 'down' | 'left' | 'right' | 'center'
}

export default function AnimatedImage({ containerClassName = '', parallaxSpeed = 0.15, revealDirection = 'up', className = '', ...props }: AnimatedImageProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const imageRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        if (!containerRef.current || !imageRef.current) return

        let clipStart = 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)'
        
        if (revealDirection === 'down') clipStart = 'polygon(0 0, 100% 0, 100% 0, 0 0)'
        else if (revealDirection === 'left') clipStart = 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)'
        else if (revealDirection === 'right') clipStart = 'polygon(0 0, 0 0, 0 100%, 0 100%)'
        else if (revealDirection === 'center') clipStart = 'polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)'

        const ctx = gsap.context(() => {
            // Reveal Animation
            gsap.fromTo(containerRef.current,
                { clipPath: clipStart },
                {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: 'top 85%',
                        end: 'top 60%',
                        scrub: 1,
                    },
                    clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                    ease: 'power3.inOut'
                }
            )

            // Image Parallax + Scale
            if (parallaxSpeed > 0) {
                gsap.fromTo(imageRef.current,
                    { scale: 1.25, y: '-10%' },
                    {
                        scrollTrigger: {
                            trigger: containerRef.current,
                            start: 'top bottom',
                            end: 'bottom top',
                            scrub: true,
                        },
                        scale: 1,
                        y: '10%',
                        ease: 'none'
                    }
                )
            }
        }, containerRef)

        return () => ctx.revert()
    }, [revealDirection, parallaxSpeed])

    return (
        <div ref={containerRef} className={`relative overflow-hidden ${containerClassName}`}>
            <Image
                ref={imageRef}
                className={`object-cover w-full h-full ${className}`}
                {...props}
            />
        </div>
    )
}
