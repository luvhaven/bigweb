'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GripVertical } from 'lucide-react'

interface BeforeAfterSliderProps {
    beforeImage: string
    afterImage: string
    beforeLabel?: string
    afterLabel?: string
}

export default function BeforeAfterSlider({
    beforeImage = "https://images.unsplash.com/photo-1620641788421-7f9a94129b6b?q=80&w=1000&auto=format&fit=crop", // Placeholder: basic wireframe/old layout
    afterImage = "https://images.unsplash.com/photo-1620641788421-7f9a94129b6b?q=80&w=1000&auto=format&fit=crop", // Placeholder: premium design (using same image with filter for demo if needed, or different) 
    // Ideally we use real distinct images. For demo, let's assume the user will supply URLs or we use placeholders.
    // Actually, let's use two different placeholder images that represent "Old" vs "New"

    // Highlighting a "boring" office vs "cool" office as a metaphor? 
    // Or just color vs grayscale.

    beforeLabel = "Before",
    afterLabel = "After",
}: Partial<BeforeAfterSliderProps>) {

    // Overriding check for demo purposes if no props provided
    const img1 = "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&q=80" // Coding screen / Basic
    const img2 = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=80" // Cyberpunk / High tech

    const [sliderPosition, setSliderPosition] = useState(50)
    const [isDragging, setIsDragging] = useState(false)
    const containerRef = useRef<HTMLDivElement>(null)

    const handleMove = (event: React.MouseEvent | React.TouchEvent) => {
        if (!containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        let clientX

        if ('touches' in event) {
            clientX = event.touches[0].clientX
        } else {
            clientX = (event as React.MouseEvent).clientX
        }

        const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
        const percentage = (x / rect.width) * 100

        setSliderPosition(percentage)
    }

    const handleMouseDown = () => setIsDragging(true)
    const handleMouseUp = () => setIsDragging(false)

    useEffect(() => {
        const handleGlobalMouseUp = () => setIsDragging(false)
        window.addEventListener('mouseup', handleGlobalMouseUp)
        window.addEventListener('touchend', handleGlobalMouseUp)
        return () => {
            window.removeEventListener('mouseup', handleGlobalMouseUp)
            window.removeEventListener('touchend', handleGlobalMouseUp)
        }
    }, [])

    return (
        <div className="w-full max-w-4xl mx-auto my-16 select-none">
            {/* <h3 className="text-3xl font-bold text-center mb-8">See the Transformation</h3> */}

            <div
                ref={containerRef}
                className="relative w-full aspect-video rounded-3xl overflow-hidden cursor-ew-resize border border-border/50 shadow-2xl"
                onMouseMove={handleMove}
                onTouchMove={handleMove}
                onClick={handleMove}
            >
                {/* After Image (Background) */}
                <div className="absolute inset-0">
                    <img
                        src={img2}
                        alt="After Transformation"
                        className="w-full h-full object-cover grayscale-0"
                        draggable={false}
                    />
                    <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10">
                        {afterLabel}
                    </div>
                </div>

                {/* Before Image (Clipped overlay) */}
                <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                    <img
                        src={img1}
                        alt="Before Transformation"
                        className="w-full h-full object-cover grayscale contrast-50 brightness-75" // Styling to make "Before" look worse
                        draggable={false}
                    />
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-white border border-white/10">
                        {beforeLabel}
                    </div>
                </div>

                {/* Slider Handle */}
                <div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                    style={{ left: `${sliderPosition}%` }}
                >
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg text-black">
                        <GripVertical className="w-4 h-4" />
                    </div>
                </div>
            </div>

            <p className="text-center text-muted-foreground mt-4 text-sm">
                Drag slider to compare classic vs. elite design
            </p>
        </div>
    )
}
