"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

/* ============================================================
   OMI Globe — cobe-powered dotted world map
   - Ships with an equirectangular world map baked in
   - Brand-colored: Heritage Gold dots on Deep Indigo sphere,
     Mission Teal atmosphere, Bright Gold markers
   - San Antonio pulses as the SABWB home base
   ============================================================ */

type Marker = { location: [number, number]; size: number };

const MISSION_MARKERS: Marker[] = [
  { location: [29.4241, -98.4936], size: 0.12 }, // San Antonio — SABWB
  { location: [6.5244, 3.3792],    size: 0.06 }, // Lagos
  { location: [-1.2921, 36.8219],  size: 0.06 }, // Nairobi
  { location: [19.4326, -99.1332], size: 0.06 }, // Mexico City
  { location: [28.6139, 77.2090],  size: 0.06 }, // Delhi
  { location: [-23.5505, -46.6333], size: 0.06 }, // São Paulo
  { location: [13.7563, 100.5018], size: 0.06 }, // Bangkok
];

export default function GlobeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  useEffect(() => {
    if (!canvasRef.current) return;

    let phi = 0;
    let width = 0;
    const onResize = () => {
      if (canvasRef.current) width = canvasRef.current.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globeOptions: Parameters<typeof createGlobe>[1] = {
      devicePixelRatio: Math.min(window.devicePixelRatio, 2),
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.28,
      dark: 1,
      diffuse: 1.4,
      mapSamples: 18000,
      mapBrightness: 7,
      mapBaseBrightness: 0.15,
      baseColor:   [0.09, 0.14, 0.27],
      markerColor: [0.95, 0.78, 0.29],
      glowColor:   [0.09, 0.64, 0.76],
      markers: MISSION_MARKERS,
      onRender: (state: Record<string, number>) => {
        if (!pointerInteracting.current) {
          phi += 0.003;
        }
        state.phi = phi + pointerInteractionMovement.current;
        state.width = width * 2;
        state.height = width * 2;
      },
    } as Parameters<typeof createGlobe>[1];

    const globe = createGlobe(canvasRef.current, globeOptions);

    // Small mouse-parallax: drag to spin
    const onPointerDown = (e: PointerEvent) => {
      pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
      if (canvasRef.current) canvasRef.current.style.cursor = "grabbing";
    };
    const onPointerUp = () => {
      pointerInteracting.current = null;
      if (canvasRef.current) canvasRef.current.style.cursor = "grab";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        const delta = e.clientX - pointerInteracting.current;
        pointerInteractionMovement.current = delta * 0.006;
      }
    };

    const canvas = canvasRef.current;
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerout", onPointerUp);
    canvas.addEventListener("mousemove", onPointerMove as EventListener);
    canvas.style.cursor = "grab";

    // Fade-in once cobe is ready
    setTimeout(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = "1";
    }, 50);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerout", onPointerUp);
      canvas.removeEventListener("mousemove", onPointerMove as EventListener);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-full max-w-[900px] aspect-square">
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            contain: "layout paint size",
            opacity: 0,
            transition: "opacity 1s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
      </div>
    </div>
  );
}
