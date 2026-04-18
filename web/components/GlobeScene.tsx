"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";
import MissionArcs from "./MissionArcs";

/* ============================================================
   Dotted Globe — procedural continents via 3D simplex noise
   ============================================================ */

function DottedGlobe() {
  const group = useRef<THREE.Group>(null);

  const { landPositions, seaPositions } = useMemo(() => {
    const noise3D = createNoise3D(() => 0.42);
    const DOT_COUNT = 6000;
    const RADIUS = 1;
    const phi = Math.PI * (Math.sqrt(5) - 1); // golden angle

    const land: number[] = [];
    const sea: number[] = [];

    for (let i = 0; i < DOT_COUNT; i++) {
      const y = 1 - (i / (DOT_COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      const freq = 1.8;
      const n1 = noise3D(x * freq, y * freq, z * freq);
      const n2 = noise3D(x * freq * 2.1, y * freq * 2.1, z * freq * 2.1) * 0.5;
      const n3 = noise3D(x * freq * 4.3, y * freq * 4.3, z * freq * 4.3) * 0.25;
      const n = n1 + n2 + n3;

      if (n > 0.18) {
        land.push(x * RADIUS, y * RADIUS, z * RADIUS);
      } else {
        sea.push(x * RADIUS, y * RADIUS, z * RADIUS);
      }
    }

    return {
      landPositions: new Float32Array(land),
      seaPositions: new Float32Array(sea),
    };
  }, []);

  const meridians = useMemo(() => buildMeridians(), []);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={group} rotation={[0.41, 0, 0]}>
      {/* Core planet */}
      <mesh>
        <sphereGeometry args={[0.985, 64, 64]} />
        <meshStandardMaterial
          color="#0B1F3D"
          roughness={1}
          metalness={0}
          emissive="#0B1F3D"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Sea dots */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[seaPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.006}
          color="#17A4C2"
          transparent
          opacity={0.18}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Land dots */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[landPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.012}
          color="#F2C54A"
          transparent
          opacity={0.95}
          sizeAttenuation
          depthWrite={false}
        />
      </points>

      {/* Meridian rings */}
      {meridians.map((obj, i) => (
        <primitive key={i} object={obj} />
      ))}

      {/* Mission arcs */}
      <MissionArcs />
    </group>
  );
}

/* ============================================================
   Meridian / parallel rings (built as THREE.Line instances)
   ============================================================ */

function buildMeridians(): THREE.Line[] {
  const segments = 128;
  const material = new THREE.LineBasicMaterial({
    color: 0xd4a24c,
    transparent: true,
    opacity: 0.12,
    depthWrite: false,
  });

  const items: THREE.Line[] = [];

  // Meridians
  for (let i = 0; i < 6; i++) {
    const pts: number[] = [];
    for (let s = 0; s <= segments; s++) {
      const t = (s / segments) * Math.PI * 2;
      pts.push(Math.cos(t) * 1.001, Math.sin(t) * 1.001, 0);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    const line = new THREE.Line(geo, material);
    line.rotation.y = (i / 6) * Math.PI;
    items.push(line);
  }

  // Parallels
  for (const lat of [0, Math.PI / 4, -Math.PI / 4]) {
    const r = Math.cos(lat);
    const y = Math.sin(lat);
    const pts: number[] = [];
    for (let s = 0; s <= segments; s++) {
      const t = (s / segments) * Math.PI * 2;
      pts.push(Math.cos(t) * r * 1.001, y * 1.001, Math.sin(t) * r * 1.001);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    items.push(new THREE.Line(geo, material));
  }

  return items;
}

/* ============================================================
   Atmosphere — fresnel glow shell
   ============================================================ */

function Atmosphere() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          glowColor: { value: new THREE.Color("#17A4C2") },
          intensity: { value: 1.1 },
        },
        vertexShader: `
          varying vec3 vNormal;
          varying vec3 vPositionNormal;
          void main() {
            vNormal = normalize(normalMatrix * normal);
            vPositionNormal = normalize((modelViewMatrix * vec4(position, 1.0)).xyz);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 glowColor;
          uniform float intensity;
          varying vec3 vNormal;
          varying vec3 vPositionNormal;
          void main() {
            float fresnel = pow(1.0 - abs(dot(vNormal, vPositionNormal)), 2.5);
            gl_FragColor = vec4(glowColor, fresnel * intensity);
          }
        `,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        depthWrite: false,
      }),
    []
  );

  return (
    <mesh scale={1.18}>
      <sphereGeometry args={[1, 64, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}

/* ============================================================
   Scene
   ============================================================ */

export default function GlobeScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 2.8], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 2]}
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} color="#F2C54A" />
      <directionalLight position={[-3, -2, -5]} intensity={0.4} color="#17A4C2" />

      <Stars
        radius={60}
        depth={50}
        count={2000}
        factor={3}
        saturation={0}
        fade
        speed={0.6}
      />
      <Atmosphere />
      <DottedGlobe />
    </Canvas>
  );
}
