import { defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Title", validation: (r) => r.required() },
    { name: "slug", type: "slug", title: "Slug", options: { source: "title" }, validation: (r) => r.required() },
    { name: "description", type: "text", title: "Description" },
  ],
});
