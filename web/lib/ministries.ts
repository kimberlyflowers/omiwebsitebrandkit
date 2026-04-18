export type Ministry = {
  slug: string;
  name: string;
  fullName?: string;
  short: string;
  tagline: string;
  accent: "teal" | "electric" | "gold" | "indigo" | "action";
  legalBadge?: string;
  externalUrl?: string;
};

export const ministries: Ministry[] = [
  {
    slug: "yes",
    name: "YES",
    short: "Youth Empowerment School",
    tagline: "Lead · Serve · Impact",
    accent: "teal",
  },
  {
    slug: "empowerment-center-network",
    name: "Empowerment Center Network",
    short: "For YES families",
    tagline: "Supporting the parents behind every student.",
    accent: "indigo",
  },
  {
    slug: "entrepreneurial-development",
    name: "Entrepreneurial Development Center",
    short: "Build. Launch. Scale.",
    tagline: "Faith-rooted business formation and mentorship.",
    accent: "gold",
  },
  {
    slug: "sabwb",
    name: "SABWB",
    fullName: "San Antonio Black White and Brown",
    short: "San Antonio Black White and Brown",
    tagline: "Community across color lines — one city, one calling.",
    accent: "indigo",
    externalUrl: "https://www.sabwb.org",
  },
  {
    slug: "sabwb-action",
    name: "SABWB Action",
    fullName: "San Antonio Black White and Brown Action",
    short: "Civic engagement · 501(c)(4)",
    tagline: "Faithful voices in the public square.",
    accent: "action",
    legalBadge:
      "SABWB Action is a 501(c)(4) organization, separate from Outpouring Missions International (a 501(c)(3)). Contributions to SABWB Action are not tax-deductible as charitable contributions.",
  },
  {
    slug: "missions-outreach",
    name: "Local & Global Missions Outreach",
    short: "Go where we're sent",
    tagline: "Hands, feet, and hearts across communities and continents.",
    accent: "electric",
  },
];

export const accentClasses: Record<Ministry["accent"], { bg: string; text: string; ring: string }> = {
  teal:     { bg: "bg-teal-mission",     text: "text-teal-mission",     ring: "ring-teal-mission/40" },
  electric: { bg: "bg-teal-electric",    text: "text-teal-electric",    ring: "ring-teal-electric/40" },
  gold:     { bg: "bg-gold-heritage",    text: "text-gold-heritage",    ring: "ring-gold-heritage/40" },
  indigo:   { bg: "bg-indigo-royal",     text: "text-indigo-500",       ring: "ring-indigo-500/40" },
  action:   { bg: "bg-[#B83636]",        text: "text-[#E96B6B]",        ring: "ring-[#B83636]/40" },
};
