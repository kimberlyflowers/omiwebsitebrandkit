import { defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    { name: "name", type: "string", title: "Name", validation: (r) => r.required() },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    },
    { name: "role", type: "string", title: "Role or title" },
    { name: "image", type: "image", title: "Headshot", options: { hotspot: true } },
    { name: "bio", type: "text", title: "Short bio" },
  ],
});
