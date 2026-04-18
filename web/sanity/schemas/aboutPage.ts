import { defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    { name: "eyebrow", type: "string", title: "Eyebrow", initialValue: "About · Est. 2008" },
    { name: "title", type: "string", title: "Title" },
    { name: "kicker", type: "string", title: "Kicker / byline" },
    { name: "lede", type: "text", rows: 4, title: "Lede (drop-cap paragraph)" },
    { name: "body", type: "blockContent", title: "Body" },
    {
      name: "outro",
      type: "object",
      title: "Outro",
      fields: [
        { name: "heading", type: "string", title: "Heading" },
        { name: "body", type: "text", rows: 3, title: "Body" },
        {
          name: "cta",
          type: "object",
          title: "CTA",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "href", type: "string", title: "Link" },
          ],
        },
      ],
    },
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});
