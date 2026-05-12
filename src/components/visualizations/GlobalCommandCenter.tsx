"use client";
import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function GlobalCommandCenter({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [activeNode, setActiveNode] = useState<string | null>(null);

    useEffect(() => {
        let phi = 0;

        // Default size logic for different screens
        let width = 0;
        const onResize = () => canvasRef.current && (width = canvasRef.current.offsetWidth)
        window.addEventListener('resize', onResize)
        onResize()

        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: width * 2,
            height: width * 2,
            phi: 0,
            theta: 0.3,
            dark: 1,
            diffuse: 1.2,
            mapSamples: 16000,
            mapBrightness: 6,
            baseColor: [0.1, 0.1, 0.2], // Deep space blue/grey
            markerColor: [0.5, 0.3, 1], // Purple/Violet glow
            glowColor: [0.2, 0.2, 0.4],
            opacity: 0.8, // Transparency
            // Markers: lat, long, intensity
            markers: [
                // North America
                { location: [40.7128, -74.0060], size: 0.1 }, // New York
                { location: [34.0522, -118.2437], size: 0.08 }, // LA
                { location: [37.7749, -122.4194], size: 0.08 }, // SF
                // Europe
                { location: [51.5074, -0.1278], size: 0.1 }, // London
                { location: [48.8566, 2.3522], size: 0.08 }, // Paris
                { location: [52.5200, 13.4050], size: 0.08 }, // Berlin
                // Asia
                { location: [35.6762, 139.6503], size: 0.1 }, // Tokyo
                { location: [1.3521, 103.8198], size: 0.09 }, // Singapore
                { location: [19.0760, 72.8777], size: 0.08 }, // Mumbai
                { location: [25.2048, 55.2708], size: 0.09 }, // Dubai
                // Africa
                { location: [6.5244, 3.3792], size: 0.15 }, // Lagos (HQ)
                { location: [-33.9249, 18.4241], size: 0.08 }, // Cape Town
            ],
            onRender: (state) => {
                // Called on every animation frame.
                // `state` will be an empty object, return updated params.
                state.phi = phi
                phi += 0.003
                state.width = width * 2
                state.height = width * 2
            },
        });

        return () => {
            globe.destroy();
        };
    }, []);

    return (
        <div className={cn("relative w-full aspect-square flex items-center justify-center overflow-hidden", className)}>
            {/* Ambient Glow */}
            <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full" />

            <div className="relative z-10 w-full h-full max-w-[800px] max-h-[800px] flex items-center justify-center">
                <canvas
                    ref={canvasRef}
                    style={{ width: '100%', height: '100%', maxWidth: '100%', aspectRatio: 1 }}
                    className="opacity-90 hover:opacity-100 transition-opacity duration-500"
                />
            </div>

            {/* Overlay Data UI */}
            <div className="absolute bottom-10 left-10 hidden md:block">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    className="bg-black/40 backdrop-blur-md border border-white/10 p-4 rounded-xl"
                >
                    <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Active Nodes</div>
                    <div className="text-2xl font-bold font-mono text-white">12 Locations</div>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-xs text-green-400">System Online</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
