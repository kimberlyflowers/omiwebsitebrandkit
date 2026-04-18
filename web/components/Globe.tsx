"use client";

import dynamic from "next/dynamic";

const GlobeScene = dynamic(() => import("./GlobeScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-[70%] aspect-square rounded-full bg-[radial-gradient(circle_at_30%_30%,#17A4C2_0%,#152C5B_45%,#0B1F3D_100%)] opacity-40 animate-glow" />
    </div>
  ),
});

export default function Globe() {
  return (
    <div className="absolute inset-0" aria-hidden="true">
      <GlobeScene />
    </div>
  );
}
