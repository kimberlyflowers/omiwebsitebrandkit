import { defineType } from "sanity";

export default defineType({
  name: "speaker",
  title: "Speaker",
  type: "document",
  fields: [
    { name: "name", type: "string", title: "Name", validation: (r) => r.required() },
    { name: "role", type: "string", title: "Role or organization" },
    { name: "headshot", type: "image", title: "Headshot", options: { hotspot: true } },
    { name: "bio", type: "text", title: "Short bio" },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "headshot" },
  },
});
