'use client'

import { useEffect, useRef } from 'react'
import createGlobe from 'cobe'

export default function Globe() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        let phi = 0

        if (!canvasRef.current) return

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 600 * 2,
            height: 600 * 2,
            phi: 0,
            theta: 0,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.3, 0.3, 0.3],
            markerColor: [1, 0.42, 0.21], // Accent orange color
            glowColor: [1, 1, 1],
            markers: [
                // Add some location markers
                { location: [37.7595, -122.4367], size: 0.03 }, // San Francisco
                { location: [40.7128, -74.006], size: 0.1 }, // New York
                { location: [51.5074, -0.1278], size: 0.05 }, // London
                { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo
                { location: [-33.8688, 151.2093], size: 0.05 }, // Sydney
            ],
            onRender: (state) => {
                // Called on every animation frame
                state.phi = phi
                phi += 0.01
            },
        })

        return () => {
            globe.destroy()
        }
    }, [])

    return (
        <div className="relative w-full h-full flex items-center justify-center">
            <canvas
                ref={canvasRef}
                style={{
                    width: 600,
                    height: 600,
                    maxWidth: '100%',
                    aspectRatio: 1,
                }}
            />
        </div>
    )
}
