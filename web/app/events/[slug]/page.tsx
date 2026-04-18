import { notFound } from "next/navigation";
import EventPage from "@/components/EventPage";
import { events, getEvent } from "@/lib/events";

export async function generateStaticParams() {
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const ev = getEvent(params.slug);
  if (!ev) return { title: "Event not found — OMI" };
  return {
    title: `${ev.title} — OMI`,
    description: ev.tagline ?? ev.about[0],
  };
}

export default function Event({ params }: { params: { slug: string } }) {
  const event = getEvent(params.slug);
  if (!event) notFound();
  return <EventPage event={event} />;
}
