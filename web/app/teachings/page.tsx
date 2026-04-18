import GalleryPage from "@/components/GalleryPage";

export const metadata = { title: "Seasonal Teachings — OMI" };

export default function Teachings() {
  return (
    <GalleryPage
      eyebrow="Seasonal Teachings"
      title="Deep-dive intensives, every season."
      lede="Multi-day teaching intensives, roughly every two months, built to take leaders deeper into scripture, culture, and calling. Taught to be lived, not just learned."
      heroCaption="Classroom / stage photograph"
      featured={{
        title: "Summer Teaching Intensive — July 9–11",
        body: "The next intensive is a three-day hybrid cohort. Tight curriculum, rigorous discussion, practical application. In-person or live stream.",
        caption: "Summer cohort photo",
        cta: { label: "Event details", href: "/events/summer-2026-teaching-intensive" },
      }}
      items={[
        {
          title: "Winter Intensive · January 2026",
          meta: "Teaching · 3 days",
          body: "Foundations of Christian formation in the public square.",
          caption: "Winter cohort photo",
        },
        {
          title: "Spring Intensive · March 2026",
          meta: "Teaching · 3 days",
          body: "Scripture, culture, and the question of authority.",
          caption: "Spring cohort photo",
        },
        {
          title: "Summer Intensive · July 2026",
          meta: "Teaching · 3 days",
          body: "Leadership, service, and the posture of outpouring.",
          caption: "Summer cohort photo",
          href: "/events/summer-2026-teaching-intensive",
        },
        {
          title: "Fall Intensive · September 2026",
          meta: "Teaching · 3 days",
          body: "Curriculum forthcoming. Placeholder card.",
          caption: "Fall cohort photo",
        },
        {
          title: "Pre-Conference Primer · April 2026",
          meta: "Teaching · 1 day",
          body: "Day-long primer before the annual conference — open to all registrants.",
          caption: "Primer photo",
        },
        {
          title: "Late-Year Intensive · November 2026",
          meta: "Teaching · 3 days",
          body: "Year-end gathering. Reflection, re-commissioning, and looking forward.",
          caption: "November cohort photo",
        },
      ]}
    />
  );
}
