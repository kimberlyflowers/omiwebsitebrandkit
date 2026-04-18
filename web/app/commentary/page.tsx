import LongformPage from "@/components/LongformPage";

export const metadata = { title: "Cultural Commentary — OMI" };

export default function Commentary() {
  return (
    <LongformPage
      eyebrow="Cultural Commentary"
      title="Thoughtful, Spirit-led reflection on the moment."
      kicker="A teaching ministry · Not a news feed"
      lede="The commentary stream exists to ground the faithful in clarity — to offer Scripture-anchored, posture-aware reflection on the questions shaping our culture. Not outrage. Not performance. Just teaching, plainly delivered."
      sections={[
        {
          kind: "prose",
          content:
            "The format is simple. When a moment calls for it, a teaching goes out — written, spoken, or both. Timely when it needs to be, timeless when it can be. Placeholder — describe editorial cadence, tone, and approach.",
        },
        {
          kind: "pullquote",
          content:
            "We are not trying to be first. We are trying to be true.",
        },
        {
          kind: "image",
          content: "studio-photo",
          caption: "Recording the commentary · placeholder",
        },
        {
          kind: "prose",
          content:
            "Topics range widely — family, formation, public life, identity, the Church — but the goal is always the same: equip the reader to think Christianly, speak carefully, and live faithfully in a noisy age. Placeholder.",
        },
        {
          kind: "prose",
          content:
            "Archive and subscription coming soon. For now, reach out if you'd like to be on the distribution list as pieces release.",
        },
      ]}
      outro={{
        heading: "Get the next piece in your inbox.",
        body: "Low-volume, timely when it matters, never a flood.",
        cta: { label: "Subscribe", href: "/contact" },
      }}
    />
  );
}
