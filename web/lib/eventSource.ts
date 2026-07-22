/* ============================================================
   Unified events source — Sanity first, static fallback.
   Keeps pages decoupled from whether Sanity is configured yet.
   ============================================================ */

import { fetchEventsFromSanity, fetchEventFromSanity } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { events as staticEvents, type EventDetail } from "@/lib/events";

type SanityEvent = {
  _id: string;
  title: string;
  slug: string;
  kind: string;
  tagline?: string;
  startDate: string;
  endDate?: string;
  timezone?: string;
  location?: { name?: string; address?: string; city?: string };
  heroImage?: unknown;
  about?: string[];
  agenda?: { time: string; title: string; detail?: string }[];
  speakers?: { _id: string; name: string; role?: string; headshot?: unknown; bio?: string }[];
  priceTiers?: { label: string; priceCents: number; description?: string; soldOut?: boolean }[];
  faq?: { q: string; a: string }[];
};

function formatDateUS(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch { return iso; }
}
function formatTime(iso: string): string {
  try {
    return new Date(iso).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
  } catch { return ""; }
}

function normalize(ev: SanityEvent): EventDetail {
  const fallback = staticEvents.find((event) => event.slug === ev.slug);
  const heroUrl = ev.heroImage
    ? urlFor(ev.heroImage as object)?.width(2400).height(1200).fit("crop").auto("format").url()
    : fallback?.heroImage;

  return {
    slug: ev.slug,
    kind: (["Conference", "Teaching", "Gathering"].includes(ev.kind) ? ev.kind : "Teaching") as EventDetail["kind"],
    title: ev.title,
    tagline: ev.tagline,
    startDate: formatDateUS(ev.startDate),
    endDate: ev.endDate ? formatDateUS(ev.endDate) : undefined,
    startTime: formatTime(ev.startDate),
    endTime: ev.endDate ? formatTime(ev.endDate) : undefined,
    timezone: ev.timezone,
    location: {
      name: ev.location?.name ?? fallback?.location.name ?? "TBA",
      address: ev.location?.address ?? fallback?.location.address,
      city: ev.location?.city ?? fallback?.location.city,
    },
    priceTiers: (ev.priceTiers?.length ? ev.priceTiers : fallback?.priceTiers ?? []).map((t) => ({
      label: t.label,
      price: t.priceCents === 0 ? "Free" : `$${(t.priceCents / 100).toFixed(0)}`,
      priceCents: t.priceCents,
      description: t.description,
      soldOut: t.soldOut,
    })),
    about: ev.about?.length ? ev.about : fallback?.about ?? [],
    agenda: ev.agenda?.length ? ev.agenda : fallback?.agenda,
    speakers: ev.speakers?.length ? ev.speakers.map((s) => ({
      name: s.name,
      role: s.role,
      caption: s.role ?? "Speaker headshot",
    })) : fallback?.speakers,
    faq: ev.faq?.length ? ev.faq : fallback?.faq,
    heroImage: heroUrl,
    coverCaption: fallback?.coverCaption ?? "Event cover photograph",
  };
}

export async function listAllEvents(): Promise<EventDetail[]> {
  const sanityEvents = await fetchEventsFromSanity();
  if (sanityEvents && sanityEvents.length > 0) {
    return sanityEvents.map(normalize);
  }
  return staticEvents;
}

export async function getEventBySlug(slug: string): Promise<EventDetail | null> {
  const sanityEv = await fetchEventFromSanity(slug);
  if (sanityEv) return normalize(sanityEv);
  return staticEvents.find((e) => e.slug === slug) ?? null;
}
