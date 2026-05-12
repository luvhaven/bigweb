'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// ── GLSL Shaders for Liquid Gold Smoke ──
const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  varying vec2 vUv;

  // Simplex 2D noise
  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    st.x *= uResolution.x / uResolution.y;

    vec2 pos = vec2(st * 3.0);
    
    // Slow drift over time
    float t = uTime * 0.15;
    
    // Generate layered noise
    float n = snoise(pos + t);
    n += 0.5 * snoise(pos * 2.0 - t);
    n += 0.25 * snoise(pos * 4.0 + t);
    
    // Normalize noise to 0.0 - 1.0
    n = n * 0.5 + 0.5;

    // Fluid Gold Color Mapping
    vec3 baseDark = vec3(0.031, 0.027, 0.024); // #080706 equivalent
    vec3 goldCore = vec3(0.831, 0.686, 0.416); // #d4af6a
    
    // Mix based on noise
    // Keep it extremely subtle, mostly dark with faint gold wisps
    float intensity = smoothstep(0.4, 1.0, n) * 0.15;
    vec3 color = mix(baseDark, goldCore, intensity);

    gl_FragColor = vec4(color, 1.0);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const SmokeMaterial = shaderMaterial(
  { uTime: 0, uResolution: new THREE.Vector2() },
  vertexShader,
  fragmentShader
);

// Register the custom material so R3F can use it as a JSX element
extend({ SmokeMaterial });

function ShaderPlane() {
  const ref = useRef<any>(null);
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.uTime = state.clock.elapsedTime;
      ref.current.uResolution.set(window.innerWidth, window.innerHeight);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      {/* @ts-ignore */}
      <smokeMaterial ref={ref} />
    </mesh>
  );
}

export default function FluidBackground() {
  return (
    <div 
      className="fluid-bg-container"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -999, // Stay behind EVERYTHING
        pointerEvents: 'none'
      }}
    >
      <Canvas orthographic camera={{ position: [0, 0, 1], zoom: 1 }} dpr={[1, 2]}>
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
