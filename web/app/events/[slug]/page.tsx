import { notFound } from "next/navigation";
import EventPage from "@/components/EventPage";
import { listAllEvents, getEventBySlug } from "@/lib/eventSource";

export const revalidate = 60;

export async function generateStaticParams() {
  const events = await listAllEvents();
  return events.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const ev = await getEventBySlug(params.slug);
  if (!ev) return { title: "Event not found — OMI" };
  return {
    title: `${ev.title} — OMI`,
    description: ev.tagline ?? ev.about[0],
  };
}

export default async function Event({ params }: { params: { slug: string } }) {
  const event = await getEventBySlug(params.slug);
  if (!event) notFound();
  return <EventPage event={event} />;
}
