import { notFound } from "next/navigation";
import EventPage from "@/components/EventPage";
import { getEvent } from "@/lib/events";

export const metadata = {
  title: "Annual Conference — Outpouring Missions International",
  description: "OMI Annual Conference 2026 · Mother's Day weekend · San Antonio",
};

export default function Conference() {
  const event = getEvent("2026-annual-conference");
  if (!event) notFound();
  return <EventPage event={event} />;
}
