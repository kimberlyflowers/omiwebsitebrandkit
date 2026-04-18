/* ============================================================
   Image placeholder — drop an <Image> here to fill it.
   Keeps every empty photo spot visually obvious and catalogued
   via the data-image-slot attribute, so we can swap them in
   systematically later (Nano Banana / real shoot / stock).
   ============================================================ */

type Props = {
  ratio?: string;
  tone?: "light" | "dark";
  caption?: string;
  id?: string;
  className?: string;
};

export default function ImageSlot({
  ratio = "aspect-[4/3]",
  tone = "light",
  caption = "Image placeholder",
  id,
  className = "",
}: Props) {
  const border =
    tone === "dark"
      ? "border-white/15 bg-white/[0.03] text-white/55"
      : "border-indigo-deep/15 bg-indigo-deep/[0.04] text-indigo-deep/60";

  return (
    <div
      className={`${ratio} w-full rounded-lg border-2 border-dashed ${border} flex flex-col items-center justify-center gap-2 overflow-hidden ${className}`}
      data-image-slot={id || caption}
    >
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <div className="font-display font-semibold text-[10px] uppercase tracking-[0.2em]">
        {caption}
      </div>
      {id && <div className="text-[9px] font-mono opacity-60">{id}</div>}
    </div>
  );
}
