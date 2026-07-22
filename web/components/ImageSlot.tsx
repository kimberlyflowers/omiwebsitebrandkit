import Image from "next/image";

/* ============================================================
   Image placeholder — drop an <Image> here to fill it.
   Keeps every empty photo spot visually obvious and catalogued
   via the data-image-slot attribute, so we can swap them in
   systematically later (Nano Banana / real shoot / stock).
   ============================================================ */

const slotImages: Record<string, string> = {
  "home-whatwedo-01": "/images/home/home-whatwedo-01.jpg",
  "home-whatwedo-02": "/images/home/home-whatwedo-02.jpg",
  "home-whatwedo-03": "/images/home/home-whatwedo-03.jpg",
  "home-ministry-yes": "/images/home/home-ministry-yes.jpg",
  "home-ministry-empowerment-center-network":
    "/images/home/home-ministry-empowerment-center-network.jpg",
  "home-ministry-entrepreneurial-development":
    "/images/home/home-ministry-entrepreneurial-development.jpg",
  "home-ministry-sabwb": "/images/home/home-ministry-sabwb.jpg",
  "home-ministry-sabwb-action": "/images/home/home-ministry-sabwb-action.jpg",
  "home-ministry-missions-outreach":
    "/images/home/home-ministry-missions-outreach.jpg",
  "home-upcoming-gold": "/images/home/home-upcoming-gold.jpg",
  "home-upcoming-teal": "/images/home/home-upcoming-teal.jpg",
  "splithero-partner-with-us": "/images/give/give-hero.png",
  "splithero-partner-with-us-feature-1": "/images/give/give-one-time.png",
  "splithero-partner-with-us-feature-2": "/images/give/give-monthly.png",
  "splithero-partner-with-us-feature-3": "/images/give/give-legacy.png",
  "longform-about-est-2008-1": "/images/site/longform-about-est-2008-1.jpg",
  "event-2026-annual-conference-speaker-1":
    "/images/site/event-2026-annual-conference-speaker-1.jpg",
  "event-2026-annual-conference-speaker-2":
    "/images/site/event-2026-annual-conference-speaker-2.jpg",
  "event-2026-annual-conference-speaker-3":
    "/images/site/event-2026-annual-conference-speaker-3.jpg",
  "event-2026-annual-conference-speaker-4":
    "/images/site/event-2026-annual-conference-speaker-4.jpg",
  "event-2026-annual-conference-location":
    "/images/site/event-2026-annual-conference-location.jpg",
  "calendar-winter-2026-intensive-thumb":
    "/images/site/calendar-winter-2026-intensive-thumb.jpg",
  "calendar-spring-2026-intensive-thumb":
    "/images/site/calendar-spring-2026-intensive-thumb.jpg",
  "calendar-pre-conference-primer-2026-thumb":
    "/images/site/calendar-pre-conference-primer-2026-thumb.jpg",
  "calendar-2026-annual-conference-thumb":
    "/images/site/calendar-2026-annual-conference-thumb.jpg",
  "calendar-summer-2026-teaching-intensive-thumb":
    "/images/site/calendar-summer-2026-teaching-intensive-thumb.jpg",
  "calendar-fall-2026-intensive-thumb":
    "/images/site/calendar-fall-2026-intensive-thumb.jpg",
  "calendar-late-year-2026-intensive-thumb":
    "/images/site/calendar-late-year-2026-intensive-thumb.jpg",
  "gallery-yes-youth-empowerment-school-hero":
    "/images/site/gallery-yes-youth-empowerment-school-hero.jpg",
  "gallery-yes-youth-empowerment-school-1":
    "/images/site/gallery-yes-youth-empowerment-school-1.jpg",
  "gallery-yes-youth-empowerment-school-2":
    "/images/site/gallery-yes-youth-empowerment-school-2.jpg",
  "gallery-yes-youth-empowerment-school-3":
    "/images/site/gallery-yes-youth-empowerment-school-3.jpg",
  "gallery-yes-youth-empowerment-school-4":
    "/images/site/gallery-yes-youth-empowerment-school-4.jpg",
  "gallery-yes-youth-empowerment-school-5":
    "/images/site/gallery-yes-youth-empowerment-school-5.jpg",
  "gallery-yes-youth-empowerment-school-6":
    "/images/site/gallery-yes-youth-empowerment-school-6.jpg",
  "gallery-yes-youth-empowerment-school-featured":
    "/images/site/gallery-yes-youth-empowerment-school-featured.jpg",
  "empowerment-center-network-card-1":
    "/images/site/empowerment-center-network-card-1.jpg",
  "empowerment-center-network-card-2":
    "/images/site/empowerment-center-network-card-2.jpg",
  "empowerment-center-network-card-3":
    "/images/site/empowerment-center-network-card-3.jpg",
  "empowerment-center-network-feature":
    "/images/site/empowerment-center-network-feature.jpg",
  "splithero-entrepreneurial-development-center":
    "/images/site/splithero-entrepreneurial-development-center.jpg",
  "splithero-entrepreneurial-development-center-feature-1":
    "/images/site/splithero-entrepreneurial-development-center-feature-1.jpg",
  "splithero-entrepreneurial-development-center-feature-2":
    "/images/site/splithero-entrepreneurial-development-center-feature-2.jpg",
  "splithero-entrepreneurial-development-center-feature-3":
    "/images/site/splithero-entrepreneurial-development-center-feature-3.jpg",
  "splithero-sabwb-san-antonio-black-white-and-brown":
    "/images/site/splithero-sabwb-san-antonio-black-white-and-brown.jpg",
  "splithero-sabwb-san-antonio-black-white-and-brown-feature-1":
    "/images/site/splithero-sabwb-san-antonio-black-white-and-brown-feature-1.jpg",
  "splithero-sabwb-san-antonio-black-white-and-brown-feature-2":
    "/images/site/splithero-sabwb-san-antonio-black-white-and-brown-feature-2.jpg",
  "sabwb-action-501-c-4--card-1":
    "/images/site/sabwb-action-501-c-4--card-1.jpg",
  "sabwb-action-501-c-4--card-2":
    "/images/site/sabwb-action-501-c-4--card-2.jpg",
  "sabwb-action-501-c-4--card-3":
    "/images/site/sabwb-action-501-c-4--card-3.jpg",
  "sabwb-action-501-c-4--feature":
    "/images/site/sabwb-action-501-c-4--feature.jpg",
  "gallery-local-global-missions-outreach-hero":
    "/images/site/gallery-local-global-missions-outreach-hero.jpg",
  "gallery-local-global-missions-outreach-1":
    "/images/site/gallery-local-global-missions-outreach-1.jpg",
  "gallery-local-global-missions-outreach-2":
    "/images/site/gallery-local-global-missions-outreach-2.jpg",
  "gallery-local-global-missions-outreach-3":
    "/images/site/gallery-local-global-missions-outreach-3.jpg",
  "gallery-local-global-missions-outreach-4":
    "/images/site/gallery-local-global-missions-outreach-4.jpg",
  "gallery-local-global-missions-outreach-5":
    "/images/site/gallery-local-global-missions-outreach-5.jpg",
  "gallery-local-global-missions-outreach-6":
    "/images/site/gallery-local-global-missions-outreach-6.jpg",
  "gallery-local-global-missions-outreach-featured":
    "/images/site/gallery-local-global-missions-outreach-featured.jpg",
};

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
  const imageSrc = id ? slotImages[id] : undefined;

  if (imageSrc) {
    return (
      <div
        className={`${ratio} relative w-full overflow-hidden rounded-lg ${className}`}
        data-image-slot={id}
      >
        <Image
          src={imageSrc}
          alt={caption}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
    );
  }

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
