import { defineType } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  groups: [
    { name: "core", title: "Core", default: true },
    { name: "details", title: "Details" },
    { name: "agenda", title: "Agenda & Speakers" },
    { name: "tickets", title: "Tickets" },
    { name: "faq", title: "FAQ" },
  ],
  fields: [
    { name: "title", type: "string", title: "Title", group: "core", validation: (r) => r.required() },
    {
      name: "site",
      type: "string",
      title: "Website",
      description: "Choose which website should publish this event.",
      group: "core",
      options: {
        list: [
          { title: "Outpouring Missions International", value: "omi" },
          { title: "Youth Empowerment School", value: "yes" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
      initialValue: "omi",
    },
    {
      name: "slug",
      type: "slug",
      title: "URL slug",
      group: "core",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    },
    {
      name: "kind",
      type: "string",
      title: "Kind",
      group: "core",
      options: { list: ["Conference", "Teaching", "Gathering"], layout: "radio" },
      validation: (r) => r.required(),
      initialValue: "Teaching",
    },
    { name: "tagline", type: "string", title: "Tagline", group: "core" },
    {
      name: "heroImage",
      type: "image",
      title: "Cover image",
      group: "core",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    },
    {
      name: "experienceImage",
      type: "image",
      title: "Landscape event image (16:9)",
      description: "Displayed above About this event. Upload a landscape photo or flyer that shows what attendees will experience.",
      group: "core",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    },
    {
      name: "experienceVideo",
      type: "file",
      title: "Event video (optional)",
      description: "Optional uploaded video for the same 16:9 area above About this event. When present, it displays instead of the landscape image.",
      group: "core",
      options: { accept: "video/*" },
    },

    /* Dates & location */
    { name: "startDate", type: "datetime", title: "Start date/time", group: "details", validation: (r) => r.required() },
    { name: "endDate", type: "datetime", title: "End date/time", group: "details" },
    { name: "timezone", type: "string", title: "Timezone", group: "details", initialValue: "CST" },
    {
      name: "location",
      type: "object",
      title: "Location",
      group: "details",
      fields: [
        { name: "name", type: "string", title: "Venue name" },
        { name: "address", type: "string", title: "Street address" },
        { name: "city", type: "string", title: "City / region" },
      ],
    },

    /* About */
    {
      name: "about",
      type: "array",
      title: "About (paragraphs)",
      group: "details",
      of: [{ type: "text", rows: 4 }],
      description: "One paragraph per entry.",
    },

    /* Agenda */
    {
      name: "agenda",
      type: "array",
      title: "Agenda",
      group: "agenda",
      of: [
        {
          type: "object",
          fields: [
            { name: "time", type: "string", title: "When (e.g. 'Fri · 7:30 PM')" },
            { name: "title", type: "string", title: "Session title" },
            { name: "detail", type: "string", title: "Detail (optional)" },
          ],
          preview: { select: { title: "title", subtitle: "time" } },
        },
      ],
    },

    /* Speakers */
    {
      name: "speakers",
      type: "array",
      title: "Speakers",
      group: "agenda",
      of: [{ type: "reference", to: [{ type: "speaker" }] }],
    },

    /* Price tiers */
    {
      name: "priceTiers",
      type: "array",
      title: "Price tiers",
      group: "tickets",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label", validation: (r) => r.required() },
            {
              name: "priceCents",
              type: "number",
              title: "Price (cents USD)",
              description: "e.g. 8900 for $89.00",
              validation: (r) => r.required().min(0),
            },
            { name: "description", type: "string", title: "Description" },
            { name: "soldOut", type: "boolean", title: "Sold out", initialValue: false },
          ],
          preview: {
            select: { title: "label", price: "priceCents" },
            prepare({ title, price }) {
              return { title, subtitle: price != null ? `$${(price / 100).toFixed(2)}` : "" };
            },
          },
        },
      ],
    },

    /* FAQ */
    {
      name: "faq",
      type: "array",
      title: "FAQ",
      group: "faq",
      of: [
        {
          type: "object",
          fields: [
            { name: "q", type: "string", title: "Question", validation: (r) => r.required() },
            { name: "a", type: "text", rows: 3, title: "Answer", validation: (r) => r.required() },
          ],
          preview: { select: { title: "q" } },
        },
      ],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "kind", media: "heroImage" },
  },
  orderings: [
    { title: "Upcoming first", name: "upcoming", by: [{ field: "startDate", direction: "asc" }] },
  ],
});
