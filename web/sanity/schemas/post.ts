import { defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Commentary Post",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Title", validation: (r) => r.required() },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    },
    {
      name: "excerpt",
      type: "text",
      rows: 3,
      title: "Excerpt",
      description: "Shown on the feed. ~1–2 sentences.",
    },
    {
      name: "mainImage",
      type: "image",
      title: "Cover image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    },
    {
      name: "author",
      type: "reference",
      title: "Author",
      to: [{ type: "author" }],
    },
    {
      name: "categories",
      type: "array",
      title: "Categories",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    },
    {
      name: "publishedAt",
      type: "datetime",
      title: "Published at",
      validation: (r) => r.required(),
    },
    {
      name: "featured",
      type: "boolean",
      title: "Featured",
      description: "Pin to the top of the feed.",
      initialValue: false,
    },
    { name: "body", type: "blockContent", title: "Body" },
  ],
  preview: {
    select: { title: "title", author: "author.name", media: "mainImage" },
    prepare({ title, author, media }) {
      return { title, subtitle: author ? `by ${author}` : "", media };
    },
  },
  orderings: [
    { title: "Newest first", name: "newest", by: [{ field: "publishedAt", direction: "desc" }] },
    { title: "Oldest first", name: "oldest", by: [{ field: "publishedAt", direction: "asc" }] },
  ],
});
