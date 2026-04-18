import SplitHeroPage from "@/components/SplitHeroPage";

export const metadata = { title: "Entrepreneurial Development Center — OMI" };

export default function EDC() {
  return (
    <SplitHeroPage
      eyebrow="Entrepreneurial Development Center"
      title="Build. Launch. Scale — with conviction."
      lede="Faith-rooted business formation, mentorship, and capital connections for founders called to build. We believe the marketplace is a ministry field, and we equip leaders to steward it well."
      primaryCta={{ label: "Apply to the cohort", href: "/contact" }}
      heroCaption="Founders workshop photograph"
      stats={[
        { num: "—", label: "Founders in network" },
        { num: "—", label: "Ventures launched" },
        { num: "—", label: "Capital deployed" },
      ]}
      features={[
        {
          title: "The cohort",
          body: "Twice-yearly cohorts of 10–15 founders. Twelve weeks of curriculum, mentorship, and peer accountability — rigorous, practical, and built for real venture stages.",
          caption: "Cohort workshop photo",
        },
        {
          title: "Mentor network",
          body: "Active operators, exited founders, and seasoned investors who believe in mentoring the next generation. Matched by stage and domain, not by spreadsheet.",
          caption: "Mentor 1:1 photo",
        },
        {
          title: "Capital + community",
          body: "Warm intros to aligned investors, fractional finance help, and a community that survives beyond the cohort. The goal isn't graduation — it's longevity.",
          caption: "Demo day / pitch photo",
        },
      ]}
      closing={{
        title: "Called to build?",
        body: "Applications for the next cohort open quarterly. Reach out to start the conversation.",
      }}
    />
  );
}
