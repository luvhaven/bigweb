'use client';

import { Suspense, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 150;
const MAX_DISTANCE = 3.5; // connection threshold

function Particles() {
    const { size, pointer, camera } = useThree();
    const particlesRef = useRef<THREE.InstancedMesh>(null);
    const linesRef = useRef<THREE.LineSegments>(null);
    const pointerVec3 = useRef(new THREE.Vector3());

    // Generate particles
    const { positions, velocities } = useMemo(() => {
        const pos = new Float32Array(PARTICLE_COUNT * 3);
        const vel = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            // Spread them across the viewport
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2; // slight depth
            vel.push(new THREE.Vector3((Math.random() - 0.5) * 0.02, (Math.random() - 0.5) * 0.02, 0));
        }
        return { positions: pos, velocities: vel };
    }, []);

    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Use state for line geometry to avoid memory leaks
    const [lineGeometry] = useState(() => new THREE.BufferGeometry());

    useFrame(() => {
        if (!particlesRef.current || !linesRef.current) return;

        // Convert normalized device pointer (-1 to 1) to world pos
        // Depth roughly matches our particles
        pointerVec3.current.set(pointer.x * 12, pointer.y * 12, 0);

        const positionsArray = new Float32Array(PARTICLE_COUNT * 3);
        const linePositions = [];
        const lineColors = [];

        // Update positions & physics
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            let x = positions[i * 3];
            let y = positions[i * 3 + 1];
            let z = positions[i * 3 + 2];

            // Add velocity
            const v = velocities[i];
            x += v.x;
            y += v.y;

            // Mouse interaction (repel slightly)
            const p = new THREE.Vector3(x, y, z);
            const dist = p.distanceTo(pointerVec3.current);
            if (dist < 4) {
                const force = (4 - dist) * 0.03;
                const dir = p.clone().sub(pointerVec3.current).normalize();
                x += dir.x * force;
                y += dir.y * force;
            }

            // Bounce off invisible walls
            if (x > 15 || x < -15) v.x *= -1;
            if (y > 15 || y < -15) v.y *= -1;

            // Update source arrays
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;
            positionsArray[i * 3] = x;
            positionsArray[i * 3 + 1] = y;
            positionsArray[i * 3 + 2] = z;

            // Update instance matrix
            dummy.position.set(x, y, z);
            dummy.scale.setScalar(dist < 4 ? 1 + (4 - dist) * 0.5 : 1); // Expand near mouse
            dummy.updateMatrix();
            particlesRef.current.setMatrixAt(i, dummy.matrix);

            // Check connections
            for (let j = i + 1; j < PARTICLE_COUNT; j++) {
                const dx = x - positions[j * 3];
                const dy = y - positions[j * 3 + 1];
                const dz = z - positions[j * 3 + 2];
                const distSq = dx * dx + dy * dy + dz * dz;

                if (distSq < MAX_DISTANCE * MAX_DISTANCE) {
                    const alpha = 1.0 - Math.sqrt(distSq) / MAX_DISTANCE;

                    linePositions.push(
                        x, y, z,
                        positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                    );

                    // Deep gold color for lines with lowered opacity (low-opacity constellation)
                    const color = new THREE.Color('#D4AF6A');
                    lineColors.push(
                        color.r, color.g, color.b, alpha * 0.12,
                        color.r, color.g, color.b, alpha * 0.12
                    );
                }
            }
        }

        particlesRef.current.instanceMatrix.needsUpdate = true;

        // Update lines
        lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        lineGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 4));
    });

    return (
        <>
            <instancedMesh ref={particlesRef} args={[undefined, undefined, PARTICLE_COUNT]}>
                <circleGeometry args={[0.02, 8]} />
                <meshBasicMaterial color="#F2F0EB" transparent opacity={0.25} />
            </instancedMesh>
            <lineSegments ref={linesRef} geometry={lineGeometry}>
                <lineBasicMaterial vertexColors transparent depthWrite={false} blending={THREE.AdditiveBlending} />
            </lineSegments>
        </>
    );
}

export default function ThreeWebBg() {
    return (
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(circle at center, var(--color-bg-secondary) 0%, var(--color-bg-primary) 100%)' }}>
            <Suspense fallback={null}>
                <Canvas
                    camera={{ position: [0, 0, 10], fov: 75 }}
                    style={{ width: '100%', height: '100%' }}
                    dpr={[1, 2]} // limit to 2x for performance
                    gl={{ antialias: true, alpha: true }}
                >
                    {/* Very faint ambient light */}
                    <ambientLight intensity={0.5} />
                    <Particles />
                </Canvas>
            </Suspense>
        </div>
    );
}
