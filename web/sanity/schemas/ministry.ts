import { defineType } from "sanity";

export default defineType({
  name: "ministry",
  title: "Ministry",
  type: "document",
  fields: [
    { name: "name", type: "string", title: "Name", validation: (r) => r.required() },
    { name: "fullName", type: "string", title: "Full name (expanded)" },
    {
      name: "slug",
      type: "slug",
      title: "URL slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    },
    { name: "short", type: "string", title: "Short tagline", description: "e.g. 'Youth Empowerment School'" },
    { name: "tagline", type: "text", rows: 2, title: "Longer tagline" },
    {
      name: "accent",
      type: "string",
      title: "Color accent",
      options: { list: ["teal", "electric", "gold", "indigo", "action"], layout: "radio" },
      initialValue: "indigo",
    },
    { name: "externalUrl", type: "url", title: "External site (optional)" },
    {
      name: "legalBadge",
      type: "text",
      rows: 3,
      title: "Legal disclosure (optional)",
      description: "e.g. for 501(c)(4) orgs.",
    },
    {
      name: "heroImage",
      type: "image",
      title: "Hero image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    },
    { name: "body", type: "blockContent", title: "Body" },
    {
      name: "order",
      type: "number",
      title: "Display order",
      description: "Lower numbers appear first in the grid.",
    },
  ],
  preview: {
    select: { title: "name", subtitle: "short", media: "heroImage" },
  },
  orderings: [
    { title: "Display order", name: "order", by: [{ field: "order", direction: "asc" }] },
  ],
});
