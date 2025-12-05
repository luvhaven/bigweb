'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

interface ParallaxImageProps {
    src: string
    alt: string
    className?: string
    aspectRatio?: string
    priority?: boolean
}

export default function ParallaxImage({
    src,
    alt,
    className = '',
    aspectRatio = 'aspect-[4/3]',
    priority = false
}: ParallaxImageProps) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    })

    const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"])
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15])

    return (
        <div ref={ref} className={`relative overflow-hidden ${aspectRatio} ${className}`}>
            <motion.div style={{ y, scale }} className="absolute inset-0 w-full h-[130%] -top-[15%]">
                <Image
                    src={src}
                    alt={alt}
                    fill
                    priority={priority}
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                />
            </motion.div>
        </div>
    )
}
