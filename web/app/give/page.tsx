import SplitHeroPage from "@/components/SplitHeroPage";

export const metadata = { title: "Give — OMI" };

export default function Give() {
  return (
    <SplitHeroPage
      eyebrow="Partner with us"
      title="Fuel the Outpouring."
      lede="Every teaching, every trip, every student — made possible by partners who believe transformation is worth the investment. Choose a partnership level, or give one-time. OMI is a 501(c)(3); gifts are tax-deductible."
      primaryCta={{ label: "Give now", href: "#" }}
      externalLink={{ label: "Monthly partnership", href: "#" }}
      heroCaption="Community gathering photograph"
      stats={[
        { num: "2008", label: "Giving since" },
        { num: "6", label: "Ministries supported" },
        { num: "100%", label: "Mission spent on mission" },
      ]}
      features={[
        {
          title: "One-time gifts",
          body: "A single gift, any amount — goes directly to the greatest current need across the six ministries. Designate it to a specific ministry from the giving form.",
          caption: "Gift form screenshot or photo",
        },
        {
          title: "Monthly partnership",
          body: "Recurring partnership is the backbone of what we do. Monthly partners get early access to teachings, quarterly impact reports, and priority seating at the annual conference.",
          caption: "Partner community photo",
        },
        {
          title: "Major gifts & legacy",
          body: "For gifts above $10K and planned / legacy giving, our development team will walk with you personally. Reach out directly to discuss vehicles, tax strategy, and impact targeting.",
          caption: "Leadership photograph",
        },
      ]}
      closing={{
        title: "Every partner changes the math.",
        body: "Faithful consistency, not viral moments, is what funds deep work.",
      }}
    />
  );
}
