import { defineType } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "whatwedo", title: "What We Do" },
    { name: "editorial", title: "Editorial Moment" },
    { name: "stats", title: "Impact Stats" },
    { name: "cta", title: "Partner CTA" },
  ],
  fields: [
    /* Hero */
    { name: "heroEyebrow", type: "string", title: "Hero eyebrow", group: "hero", initialValue: "Est. 2008 · Faith · Education · Leadership · Impact" },
    { name: "heroHeadline", type: "string", title: "Hero headline", group: "hero", initialValue: "Transforming Lives." },
    { name: "heroScript", type: "string", title: "Hero script (gold)", group: "hero", initialValue: "Igniting Futures." },
    { name: "heroLede", type: "text", rows: 4, title: "Hero lede", group: "hero" },
    {
      name: "heroBanner",
      type: "image",
      title: "Hero banner image",
      description: "Full-bleed background image. Leave blank to show the animated globe.",
      group: "hero",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    },
    {
      name: "heroVideoUrl",
      type: "url",
      title: "Hero video URL (optional)",
      description: "Mp4 URL for the subtle screen-blend video layer behind the banner/globe.",
      group: "hero",
    },
    {
      name: "heroPrimaryCta",
      type: "object",
      title: "Primary CTA",
      group: "hero",
      fields: [
        { name: "label", type: "string", title: "Label" },
        { name: "href", type: "string", title: "Link (path or URL)" },
      ],
    },
    {
      name: "heroSecondaryCta",
      type: "object",
      title: "Secondary CTA",
      group: "hero",
      fields: [
        { name: "label", type: "string", title: "Label" },
        { name: "href", type: "string", title: "Link" },
      ],
    },

    /* What We Do */
    { name: "wwdEyebrow", type: "string", title: "Eyebrow", group: "whatwedo", initialValue: "What we do" },
    { name: "wwdHeadline", type: "string", title: "Headline", group: "whatwedo" },
    { name: "wwdLede", type: "text", rows: 3, title: "Intro text", group: "whatwedo" },
    {
      name: "wwdCards",
      type: "array",
      title: "Cards",
      group: "whatwedo",
      of: [
        {
          type: "object",
          fields: [
            { name: "num", type: "string", title: "Numeral (e.g. 01)" },
            { name: "meta", type: "string", title: "Meta line (e.g. 'Weekend after Mother's Day')" },
            { name: "title", type: "string", title: "Title" },
            { name: "body", type: "text", rows: 3, title: "Body" },
            { name: "href", type: "string", title: "Link" },
            { name: "cta", type: "string", title: "Card CTA label" },
            { name: "image", type: "image", title: "Card image", options: { hotspot: true } },
          ],
          preview: { select: { title: "title", subtitle: "meta", media: "image" } },
        },
      ],
    },

    /* Editorial moment */
    { name: "editorialHeadline", type: "string", title: "Headline", group: "editorial", initialValue: "Transforming Lives." },
    { name: "editorialScript", type: "string", title: "Script flourish", group: "editorial", initialValue: "Igniting Futures." },
    { name: "editorialBody", type: "text", rows: 4, title: "Body", group: "editorial" },

    /* Impact stats */
    {
      name: "impactStats",
      type: "array",
      title: "Stats (4)",
      group: "stats",
      validation: (r) => r.max(4),
      of: [
        {
          type: "object",
          fields: [
            { name: "num", type: "string", title: "Number (e.g. 2008)" },
            { name: "label", type: "string", title: "Label" },
          ],
          preview: { select: { title: "num", subtitle: "label" } },
        },
      ],
    },

    /* CTA block */
    { name: "ctaHeadline", type: "string", title: "CTA headline", group: "cta" },
    { name: "ctaBody", type: "text", rows: 3, title: "CTA body", group: "cta" },
    {
      name: "ctaPrimary",
      type: "object",
      title: "Primary CTA",
      group: "cta",
      fields: [
        { name: "label", type: "string", title: "Label" },
        { name: "href", type: "string", title: "Link" },
      ],
    },
    {
      name: "ctaSecondary",
      type: "object",
      title: "Secondary CTA",
      group: "cta",
      fields: [
        { name: "label", type: "string", title: "Label" },
        { name: "href", type: "string", title: "Link" },
      ],
    },
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
