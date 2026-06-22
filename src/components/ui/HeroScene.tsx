'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// === Custom GLSL Shaders === //

const vertexShader = `
uniform float uTime;
uniform vec2 uMouse;
uniform float uScrollVelocity;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

// Simple 3D noise function for liquid distortion
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(
             i.z + vec4(0.0, i1.z, i2.z, 1.0))
           + i.y + vec4(0.0, i1.y, i2.y, 1.0))
           + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy,h.x);
  vec3 p1 = vec3(a0.zw,h.y);
  vec3 p2 = vec3(a1.xy,h.z);
  vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

void main() {
  vUv = uv;
  vNormal = normal;
  
  // Base distortion
  float noiseArg = position.x * 2.0 + position.y * 3.0 + uTime * 0.5;
  float noise = snoise(vec3(position.x * 1.5, position.y * 1.5, uTime * 0.4));
  
  // React to mouse
  float dist = distance(position.xy, vec2(uMouse.x * 5.0, uMouse.y * 5.0));
  float mouseForce = max(0.0, 1.0 - dist * 0.3);
  
  vec3 newPosition = position + normal * (noise * 0.3 * (1.0 + uScrollVelocity * 0.5)) + normal * (mouseForce * 0.5);
  
  vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
  vViewPosition = -mvPosition.xyz;
  gl_Position = projectionMatrix * mvPosition;
}
`;

const fragmentShader = `
uniform float uTime;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;

void main() {
  vec3 normal = normalize(vNormal);
  vec3 viewDir = normalize(vViewPosition);
  
  // Fresnel effect (Rim Lighting)
  float fresnel = dot(viewDir, normal);
  fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
  fresnel = pow(fresnel, 3.0);
  
  // Liquid Gold Color Base
  vec3 goldBase = vec3(0.83, 0.68, 0.41); // #D4AF6A
  vec3 highlight = vec3(1.0, 0.9, 0.6);
  vec3 deepColor = vec3(0.05, 0.05, 0.06); // Shadow matches bg
  
  // Iridescence based on noise and normals
  float iridescence = sin(uTime * 0.5 + normal.x * 10.0) * 0.5 + 0.5;
  
  // Mix colors
  vec3 color = mix(deepColor, goldBase, fresnel + iridescence * 0.2);
  color = mix(color, highlight, pow(fresnel, 5.0));
  
  // Alpha falloff for soft edges
  float alpha = smoothstep(0.0, 0.8, fresnel) * 0.8;
  
  gl_FragColor = vec4(color, alpha);
}
`;

function LiquidAnomaly() {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uScrollVelocity: { value: 0 },
  }), []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      
      // Interpolate mouse
      const targetX = (state.pointer.x || 0);
      const targetY = (state.pointer.y || 0);
      const currentMouse = materialRef.current.uniforms.uMouse.value;
      
      currentMouse.x += (targetX - currentMouse.x) * 0.05;
      currentMouse.y += (targetY - currentMouse.y) * 0.05;
    }

    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} scale={2}>
      {/* High poly-count sphere for detailed vertex displacement */}
      <icosahedronGeometry args={[1, 32]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        side={THREE.DoubleSide}
        wireframe={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

// Subtle orbital dust to complement the anomaly
function OrbitalDust() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const count = 400;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 3 + Math.random() * 5;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      pointsRef.current.rotation.x = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#D4AF6A"
        size={0.015}
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function HeroSceneContent() {
  return (
    <>
      <LiquidAnomaly />
      <OrbitalDust />
      {/* Deep blue/purple ambient to create rich contrast with gold */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} color="#D4AF6A" />
      <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#4a2fb3" />
    </>
  );
}

export default function HeroScene() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]} // Cap DPR at 2 for performance on high-end retina
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <HeroSceneContent />
      </Canvas>
    </div>
  );
}
