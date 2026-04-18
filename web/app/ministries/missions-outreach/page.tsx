import GalleryPage from "@/components/GalleryPage";

export const metadata = { title: "Local & Global Missions Outreach — OMI" };

export default function Missions() {
  return (
    <GalleryPage
      eyebrow="Local & Global Missions Outreach"
      title="Go where we're sent."
      lede="Hands, feet, and hearts across communities and continents — short-term trips, long-term partnerships, everyday presence. The gospel at work in real places, with real people."
      heroCaption="Mission field photograph"
      featured={{
        title: "Upcoming international trip · 2026",
        body: "Details in development. Our next international outreach is shaping up for the latter half of 2026. Join the interest list to be notified first.",
        caption: "International team photo",
        cta: { label: "Join the interest list", href: "/contact" },
      }}
      items={[
        { title: "Local outreach · San Antonio", meta: "Local · Monthly", body: "Neighborhood presence, food distribution, and prayer teams.", caption: "Local outreach photo" },
        { title: "Southern border trips", meta: "Local · Quarterly", body: "Partnering with border ministries to serve families in transition.", caption: "Border trip photo" },
        { title: "Central America", meta: "International", body: "Long-standing partnerships in Mexico and Guatemala.", caption: "Central America photo" },
        { title: "East Africa", meta: "International", body: "Education and mentorship partnerships in Kenya.", caption: "East Africa photo" },
        { title: "South Asia", meta: "International", body: "Relationships built over years, deepening annually.", caption: "South Asia photo" },
        { title: "Short-term teams", meta: "Multiple / year", body: "5–10 day trips open to partners and YES alumni.", caption: "Team photo" },
      ]}
    />
  );
}
