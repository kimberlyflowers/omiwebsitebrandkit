import dynamic from "next/dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Builder — OMI Admin",
  robots: { index: false, follow: false },
};

const BuilderCanvas = dynamic(() => import("@/components/BuilderCanvas"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-indigo-deep text-mist/60 font-display">
      Loading builder…
    </div>
  ),
});

export default function BuilderPage() {
  return <BuilderCanvas />;
}
