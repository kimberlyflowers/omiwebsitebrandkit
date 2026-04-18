import StubPage from "@/components/StubPage";

export const metadata = { title: "Annual Conference — OMI" };

export default function Conference() {
  return (
    <StubPage
      eyebrow="Annual Conference"
      title="Where the whole movement gathers."
      script="Igniting Futures."
      lede="Our flagship weekend — worship, teaching, and commissioning. Held every year on the weekend after Mother's Day."
      notice="Next gathering: Weekend after Mother's Day"
      accent="gold"
      heroImage={{
        // Drop a file into /public/conference-hero.jpg to replace the placeholder.
        src: "/conference-hero.jpg",
        alt: "Outpouring Missions International annual conference",
        caption: "Conference crowd photo",
        id: "conference-hero",
        opacity: 65,
      }}
      overviewCards={[
        {
          title: "A weekend of worship",
          body: "Multi-session worship gatherings, stage teaching, and prophetic ministry over three days.",
          caption: "Worship night photo",
        },
        {
          title: "Teaching that transforms",
          body: "Keynotes and breakouts from OMI leadership and invited voices — built to form, not just inform.",
          caption: "Speaker on stage",
        },
        {
          title: "Sent with purpose",
          body: "A commissioning moment to close the weekend — leaving with clarity, calling, and community.",
          caption: "Commissioning moment",
        },
      ]}
      pullQuote="One weekend. One movement. A whole year of fire to take home."
      engage={{
        title: "Register when the gates open.",
        body: "Registration launches each January. Drop your email and we'll let you know the moment early-bird seats go live.",
        cta: { label: "Get notified", href: "/contact" },
        caption: "Conference venue photo",
      }}
    />
  );
}
