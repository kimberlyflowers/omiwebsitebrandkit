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
          href: "/events/winter-2026-intensive",
        },
        {
          title: "Spring Intensive · March 2026",
          meta: "Teaching · 3 days",
          body: "Scripture, culture, and the question of authority.",
          caption: "Spring cohort photo",
          href: "/events/spring-2026-intensive",
        },
        {
          title: "Pre-Conference Primer · April 2026",
          meta: "Teaching · 1 day",
          body: "Day-long primer before the annual conference — open to all registrants.",
          caption: "Primer photo",
          href: "/events/pre-conference-primer-2026",
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
          body: "Curriculum forthcoming — full details release in summer.",
          caption: "Fall cohort photo",
          href: "/events/fall-2026-intensive",
        },
        {
          title: "Late-Year Intensive · November 2026",
          meta: "Teaching · 3 days",
          body: "Year-end gathering. Reflection, re-commissioning, looking forward.",
          caption: "November cohort photo",
          href: "/events/late-year-2026-intensive",
        },
      ]}
    />
  );
}
