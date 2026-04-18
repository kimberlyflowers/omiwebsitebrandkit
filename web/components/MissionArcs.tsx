"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ============================================================
   Animated arcs sweeping between random points on the globe.
   Visual metaphor for global missions outreach.
   ============================================================ */

type Arc = {
  start: THREE.Vector3;
  end: THREE.Vector3;
  curve: THREE.QuadraticBezierCurve3;
  progress: number;
  duration: number;
  delay: number;
};

function randomPointOnSphere(radius = 1.005): THREE.Vector3 {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  const v3 = new THREE.Vector3();
  v3.setFromSphericalCoords(radius, phi, theta);
  return v3;
}

function buildArc(): Arc {
  const start = randomPointOnSphere(1.005);
  const end = randomPointOnSphere(1.005);
  const mid = start.clone().add(end).multiplyScalar(0.5);
  const midLen = mid.length() || 1;
  mid.multiplyScalar((1.35 + start.distanceTo(end) * 0.35) / midLen);
  const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
  return {
    start,
    end,
    curve,
    progress: 0,
    duration: 2.5 + Math.random() * 2,
    delay: Math.random() * 3,
  };
}

const ARC_COUNT = 6;
const SEGMENTS = 64;

type ArcResources = {
  line: THREE.Line;
  head: THREE.Mesh;
};

export default function MissionArcs() {
  const arcsRef = useRef<Arc[]>([]);

  const resources = useMemo<ArcResources[]>(() => {
    return Array.from({ length: ARC_COUNT }, () => {
      const geo = new THREE.BufferGeometry();
      geo.setAttribute(
        "position",
        new THREE.BufferAttribute(new Float32Array(SEGMENTS * 3), 3)
      );
      geo.setDrawRange(0, 0);

      const lineMat = new THREE.LineBasicMaterial({
        color: 0xf2c54a,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const line = new THREE.Line(geo, lineMat);

      const headMat = new THREE.MeshBasicMaterial({
        color: 0xf2c54a,
        transparent: true,
        opacity: 1,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const head = new THREE.Mesh(new THREE.SphereGeometry(1, 12, 12), headMat);
      head.scale.setScalar(0.018);

      return { line, head };
    });
  }, []);

  if (arcsRef.current.length === 0) {
    arcsRef.current = Array.from({ length: ARC_COUNT }, buildArc);
  }

  useFrame((_, delta) => {
    arcsRef.current.forEach((arc, i) => {
      if (arc.delay > 0) {
        arc.delay -= delta;
        return;
      }

      arc.progress += delta / arc.duration;

      const { line, head } = resources[i];
      const geo = line.geometry as THREE.BufferGeometry;

      if (arc.progress > 1.35) {
        arcsRef.current[i] = buildArc();
        geo.setDrawRange(0, 0);
        geo.attributes.position.needsUpdate = true;
        (head.material as THREE.MeshBasicMaterial).opacity = 0;
        return;
      }

      const drawProgress = Math.min(arc.progress, 1);
      const pos = geo.attributes.position as THREE.BufferAttribute;
      const drawCount = Math.max(2, Math.floor(SEGMENTS * drawProgress));

      for (let s = 0; s < drawCount; s++) {
        const t = (s / (SEGMENTS - 1)) * drawProgress;
        const p = arc.curve.getPoint(t);
        pos.setXYZ(s, p.x, p.y, p.z);
      }

      pos.needsUpdate = true;
      geo.setDrawRange(0, drawCount);
      geo.computeBoundingSphere();

      const tip = arc.curve.getPoint(Math.min(arc.progress, 1));
      head.position.copy(tip);
      const fade =
        arc.progress < 1 ? 1 : Math.max(0, 1 - (arc.progress - 1) / 0.35);
      (head.material as THREE.MeshBasicMaterial).opacity = fade;
      head.scale.setScalar(0.018 + fade * 0.01);

      const mat = line.material as THREE.LineBasicMaterial;
      mat.opacity =
        arc.progress < 1 ? 0.7 : Math.max(0, 0.7 - (arc.progress - 1) * 2);
    });
  });

  return (
    <group>
      {resources.map((r, i) => (
        <group key={i}>
          <primitive object={r.line} />
          <primitive object={r.head} />
        </group>
      ))}
    </group>
  );
}
