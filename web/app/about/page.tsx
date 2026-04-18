import LongformPage from "@/components/LongformPage";

export const metadata = { title: "About — Outpouring Missions International" };

export default function About() {
  return (
    <LongformPage
      eyebrow="About · Est. 2008"
      title="The movement behind the Outpouring."
      kicker="A short history · Our founding, our now, our next"
      lede="OMI began in 2008 with a conviction: that faith, education, and leadership are the levers that change lives. What started as a teaching ministry has grown into a network of six ministries reaching communities, families, and nations."
      sections={[
        {
          kind: "prose",
          content:
            "The earliest gatherings were small — a handful of leaders, a shared burden, and a willingness to pour out whatever was placed in their hands. Placeholder copy. Replace with the actual founding story.",
        },
        {
          kind: "image",
          content: "founding-photo",
          caption: "Early gatherings · placeholder for founding photograph",
        },
        {
          kind: "prose",
          content:
            "Over the years the vision widened — from classrooms to parent networks, from teaching weekends to civic engagement, from one city to many. Placeholder. Describe evolution.",
        },
        {
          kind: "pullquote",
          content:
            "The Outpouring was never ours to build. We were only ever called to keep pouring.",
        },
        {
          kind: "prose",
          content:
            "Today, six ministries share the same foundation and the same posture: faith-rooted, education-grounded, leadership-formed, impact-measured. Placeholder — expand with current scope, numbers, and vision for the next decade.",
        },
      ]}
      outro={{
        heading: "Walk with us.",
        body:
          "The story is still being written. Reach out, attend a gathering, or support the work.",
        cta: { label: "Get in touch", href: "/contact" },
      }}
    />
  );
}
