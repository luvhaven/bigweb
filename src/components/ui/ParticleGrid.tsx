'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ParticleGridProps {
    color?: string; // Hex color string, e.g. '#D4AF6A'
    gridSize?: number;
    spacing?: number;
}

export default function ParticleGrid({ color = '#D4AF6A', gridSize = 40, spacing = 2.5 }: ParticleGridProps) {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // SCENE SETUP
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x0A0A0B, 0.05);

        // CAMERA
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 25;
        camera.position.y = -10;
        camera.lookAt(0, 0, 0);

        // RENDERER
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(window.innerWidth, window.innerHeight);
        mountRef.current.appendChild(renderer.domElement);

        // PARTICLES / GRID GEOMETRY
        const geometry = new THREE.BufferGeometry();
        const count = gridSize * gridSize;
        const positions = new Float32Array(count * 3);
        const originalPositions = new Float32Array(count * 3);
        const sizes = new Float32Array(count);

        let i = 0;
        const offset = (gridSize * spacing) / 2;
        for (let x = 0; x < gridSize; x++) {
            for (let z = 0; z < gridSize; z++) {
                const px = x * spacing - offset;
                const py = (Math.random() - 0.5) * 1.5; // Slight height variation
                const pz = z * spacing - offset;

                positions[i * 3] = px;
                positions[i * 3 + 1] = py;
                positions[i * 3 + 2] = pz;

                originalPositions[i * 3] = px;
                originalPositions[i * 3 + 1] = py;
                originalPositions[i * 3 + 2] = pz;

                sizes[i] = Math.random() * 2;
                i++;
            }
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('originalPosition', new THREE.BufferAttribute(originalPositions, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        // CUSTOM SHADER MATERIAL
        const material = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new THREE.Color(color) },
                uMouse: { value: new THREE.Vector2(0, 0) }
            },
            vertexShader: `
        uniform float uTime;
        uniform vec2 uMouse;
        attribute float size;
        attribute vec3 originalPosition;
        
        varying vec3 vPos;
        
        void main() {
          vPos = position;
          vec3 pos = position;
          
          // Wave logic
          float wave = sin(pos.x * 0.5 + uTime) * cos(pos.z * 0.5 + uTime) * 1.5;
          pos.y += wave;

          // Mouse displacement
          float dist = distance(pos.xz, uMouse * 30.0);
          if (dist < 10.0) {
            float influence = (10.0 - dist) / 10.0;
            pos.y += influence * 5.0; // Lift nodes near mouse
          }

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_PointSize = size * (300.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
            fragmentShader: `
        uniform vec3 uColor;
        varying vec3 vPos;

        void main() {
          // Circular particle shape with soft edge
          float dist = distance(gl_PointCoord, vec2(0.5));
          if (dist > 0.5) discard;
          
          float alpha = (0.5 - dist) * 2.0;

          // Make nodes fade deeper on the Z axis
          float depthAlpha = smoothstep(20.0, -20.0, vPos.z);
          
          gl_FragColor = vec4(uColor, alpha * depthAlpha * 0.8);
        }
      `,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const particles = new THREE.Points(geometry, material);

        // Rotate to lie flat and push back
        particles.rotation.x = Math.PI / 4;
        scene.add(particles);

        // MOUSE INTERACTION
        let mouse = new THREE.Vector2(0, 0);
        let targetMouse = new THREE.Vector2(0, 0);
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;

        const onMouseMove = (e: MouseEvent) => {
            targetMouse.x = (e.clientX - windowHalfX) / windowHalfX;
            targetMouse.y = -(e.clientY - windowHalfY) / windowHalfY;
        };

        window.addEventListener('mousemove', onMouseMove);

        // RESIZE
        const onResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onResize);

        // ANIMATION LOOP
        const clock = new THREE.Clock();
        let animationId: number;

        const animate = () => {
            animationId = requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            // Lerp mouse for smooth wave displacement
            mouse.x += (targetMouse.x - mouse.x) * 0.05;
            mouse.y += (targetMouse.y - mouse.y) * 0.05;

            material.uniforms.uTime.value = elapsedTime;
            material.uniforms.uMouse.value.set(mouse.x, mouse.y);

            // Rotate the entire grid slowly
            particles.rotation.z = elapsedTime * 0.05;

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('mousemove', onMouseMove);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, [color, gridSize, spacing]);

    return <div ref={mountRef} style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }} />;
}
