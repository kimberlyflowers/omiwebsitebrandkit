import { defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  groups: [
    { name: "org", title: "Organization", default: true },
    { name: "contact", title: "Contact" },
    { name: "social", title: "Social" },
    { name: "footer", title: "Footer & Legal" },
  ],
  fields: [
    { name: "organizationName", type: "string", title: "Legal name", group: "org", initialValue: "Outpouring Missions International" },
    { name: "shortName", type: "string", title: "Short name", group: "org", initialValue: "OMI" },
    { name: "tagline", type: "string", title: "Tagline", group: "org", initialValue: "Transforming Lives. Igniting Futures." },
    {
      name: "pillars",
      type: "array",
      title: "Pillars",
      group: "org",
      of: [{ type: "string" }],
      description: "Appears in the hero eyebrow and footer.",
    },
    { name: "foundedYear", type: "number", title: "Founded year", group: "org", initialValue: 2008 },

    { name: "contactEmail", type: "string", title: "Primary contact email", group: "contact" },
    { name: "city", type: "string", title: "Based in", group: "contact", initialValue: "San Antonio, Texas" },

    {
      name: "socialLinks",
      type: "array",
      title: "Social links",
      group: "social",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "platform",
              type: "string",
              title: "Platform",
              options: { list: ["Instagram", "Facebook", "YouTube", "X", "LinkedIn", "TikTok"] },
            },
            { name: "url", type: "url", title: "URL" },
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        },
      ],
    },

    {
      name: "legalName",
      type: "string",
      title: "501(c)(3) legal name",
      group: "footer",
    },
    { name: "ein", type: "string", title: "EIN", group: "footer" },
    {
      name: "sabwbActionDisclosure",
      type: "text",
      rows: 4,
      title: "SABWB Action disclosure",
      group: "footer",
      initialValue:
        "SABWB Action is a 501(c)(4) social-welfare organization, legally and financially separate from Outpouring Missions International (a 501(c)(3)). Contributions to SABWB Action are not tax-deductible as charitable contributions. Any political endorsements are made by SABWB Action, not OMI.",
    },
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
