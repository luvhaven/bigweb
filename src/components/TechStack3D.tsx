'use client'

import { useRef, useState, useMemo } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Float, Stars as DreiStars } from '@react-three/drei'
import * as THREE from 'three'

interface WordProps {
    children: string
    position: [number, number, number]
    index: number
}

function Word({ children, position, index }: WordProps) {
    const fontRef = useRef<THREE.Mesh>(null)
    const [hovered, setHovered] = useState(false)

    useFrame(({ clock }) => {
        if (fontRef.current) {
            fontRef.current.lookAt(0, 0, 0)
            // Subtle float animation independent of Float wrapper
            fontRef.current.position.y += Math.sin(clock.getElapsedTime() + index) * 0.002
        }
    })

    return (
        <Float floatIntensity={2} rotationIntensity={1}>
            <group position={position}>
                <Text
                    ref={fontRef}
                    color={hovered ? '#ff6b35' : '#ffffff'}
                    fontSize={0.5}
                    maxWidth={200}
                    lineHeight={1}
                    letterSpacing={0.05}
                    textAlign="center"
                    font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff"
                    anchorX="center"
                    anchorY="middle"
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                    {children}
                </Text>
            </group>
        </Float>
    )
}

function Cloud({ count = 4, radius = 20 }) {
    // Create a spherical distribution of words
    const words = useMemo(() => {
        const temp: [THREE.Vector3, string][] = []
        const spherical = new THREE.Spherical()
        const phiSpan = Math.PI / (count + 1)
        const thetaSpan = (Math.PI * 2) / count

        const tags = [
            "Cognitive Bias Mapping", "Frictionless Checkout", "Heatmap Forensics", "Sub-2s Loading", "A/B Mastery",
            "Psychological Triggers", "Retention Engines", "LTV Maximization", "Edge Performance", "SEO Authority",
            "Neuro-Marketing", "Funnel Scalability", "Real-time Analytics", "Authority Loops", "Intent Modeling",
            "Conversion Labs", "Growth Frameworks", "UX Forensics", "Behavioral Logic", "Revenue Architecture"
        ]

        for (let i = 1; i < count + 1; i++)
            for (let j = 0; j < count; j++)
                temp.push([new THREE.Vector3().setFromSpherical(spherical.set(radius, phiSpan * i, thetaSpan * j)), tags[(i * count + j) % tags.length]])
        return temp
    }, [count, radius])

    return words.map(([pos, word], index) => <Word key={index} position={[pos.x, pos.y, pos.z]} index={index}>{word as string}</Word>)
}

const TechStack3D = () => {
    return (
        <section className="h-[80vh] w-full relative bg-black overflow-hidden flex flex-col items-center justify-center">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 via-black to-black opacity-40" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute top-10 text-center z-10"
            >
                <h2 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 mb-4">
                    Built on the Bleeding Edge
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                    We leverage the most advanced technology stack to deliver unparalleled performance and scale.
                </p>
            </motion.div>

            <div className="w-full h-full cursor-move">
                <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 35], fov: 90 }}>
                    <fog attach="fog" args={['#000', 0, 80]} />
                    <Cloud count={8} radius={20} />
                    <DreiStars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                </Canvas>
            </div>
        </section>
    )
}

export default TechStack3D
