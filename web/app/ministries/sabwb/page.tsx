import SplitHeroPage from "@/components/SplitHeroPage";

export const metadata = { title: "SABWB — San Antonio Black White and Brown" };

export default function SABWB() {
  return (
    <SplitHeroPage
      eyebrow="SABWB · San Antonio Black White and Brown"
      title="One city. One calling."
      lede="SABWB gathers San Antonio's Black, White, and Brown communities around the shared conviction that unity is a witness. Teaching, worship, presence — together, across color lines."
      externalLink={{ label: "Visit sabwb.org", href: "https://www.sabwb.org" }}
      primaryCta={{ label: "Get involved", href: "/contact" }}
      heroCaption="SABWB community photograph"
      stats={[
        { num: "3", label: "Communities · one city" },
        { num: "—", label: "Families served" },
        { num: "—", label: "Events per year" },
      ]}
      features={[
        {
          title: "Teaching · together",
          body: "Regular gatherings where our three communities learn side by side. Not observers of each other — participants together.",
          caption: "Teaching gathering photo",
        },
        {
          title: "Presence · where we are needed",
          body: "Local outreach to neighborhoods, schools, and houses where healing is needed. Showing up consistently, not just for the cameras.",
          caption: "Outreach photo",
        },
      ]}
      closing={{
        title: "Find the whole story on sabwb.org.",
        body: "Current events, program details, and how to plug in — live on the SABWB site.",
      }}
    />
  );
}
