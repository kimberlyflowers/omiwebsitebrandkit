import { groq } from "next-sanity";
import { client } from "./client";
import { isSanityConfigured } from "../env";

/* ------------------------------------------------------------
   Posts (commentary)
   ------------------------------------------------------------ */

export const postsListQuery = groq`*[_type == "post" && defined(publishedAt)] | order(featured desc, publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  publishedAt,
  featured,
  "author": author->{ name, image, role },
  "categories": categories[]->{ title, "slug": slug.current }
}`;

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  mainImage,
  publishedAt,
  body,
  "author": author->{ name, image, role, bio },
  "categories": categories[]->{ title, "slug": slug.current }
}`;

/* ------------------------------------------------------------
   Events
   ------------------------------------------------------------ */

export const eventsListQuery = groq`*[_type == "event"] | order(startDate asc) {
  _id,
  title,
  "slug": slug.current,
  kind,
  tagline,
  startDate,
  endDate,
  timezone,
  location,
  heroImage,
  priceTiers[] { label, priceCents, description, soldOut }
}`;

export const eventBySlugQuery = groq`*[_type == "event" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  kind,
  tagline,
  startDate,
  endDate,
  timezone,
  location,
  heroImage,
  about,
  agenda[] { time, title, detail },
  "speakers": speakers[]->{ _id, name, role, headshot, bio },
  priceTiers[] { label, priceCents, description, soldOut },
  faq[] { q, a }
}`;

/* ------------------------------------------------------------
   Ministries
   ------------------------------------------------------------ */

export const ministriesListQuery = groq`*[_type == "ministry"] | order(order asc) {
  _id,
  name,
  fullName,
  "slug": slug.current,
  short,
  tagline,
  accent,
  externalUrl,
  legalBadge,
  heroImage
}`;

/* ------------------------------------------------------------
   Safe fetch helpers — return null if Sanity isn't configured.
   ------------------------------------------------------------ */

export async function fetchPosts() {
  if (!isSanityConfigured || !client) return [];
  try {
    return await client.fetch(postsListQuery);
  } catch {
    return [];
  }
}

export async function fetchPostBySlug(slug: string) {
  if (!isSanityConfigured || !client) return null;
  try {
    return await client.fetch(postBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export async function fetchEventsFromSanity() {
  if (!isSanityConfigured || !client) return [];
  try {
    return await client.fetch(eventsListQuery);
  } catch {
    return [];
  }
}

export async function fetchEventFromSanity(slug: string) {
  if (!isSanityConfigured || !client) return null;
  try {
    return await client.fetch(eventBySlugQuery, { slug });
  } catch {
    return null;
  }
}

export async function fetchMinistries() {
  if (!isSanityConfigured || !client) return [];
  try {
    return await client.fetch(ministriesListQuery);
  } catch {
    return [];
  }
}

/* ------------------------------------------------------------
   Singletons: siteSettings, homePage, aboutPage
   ------------------------------------------------------------ */

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  organizationName, shortName, tagline, pillars, foundedYear,
  contactEmail, city,
  socialLinks[] { platform, url },
  legalName, ein, sabwbActionDisclosure
}`;

export const homePageQuery = groq`*[_type == "homePage"][0] {
  heroEyebrow, heroHeadline, heroScript, heroLede,
  heroBanner, heroVideoUrl,
  heroPrimaryCta, heroSecondaryCta,
  wwdEyebrow, wwdHeadline, wwdLede,
  wwdCards[] { num, meta, title, body, href, cta, image },
  editorialHeadline, editorialScript, editorialBody,
  impactStats[] { num, label },
  ctaHeadline, ctaBody, ctaPrimary, ctaSecondary
}`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0] {
  eyebrow, title, kicker, lede, body,
  outro { heading, body, cta }
}`;

export async function fetchSiteSettings() {
  if (!isSanityConfigured || !client) return null;
  try { return await client.fetch(siteSettingsQuery); } catch { return null; }
}

export async function fetchHomePage() {
  if (!isSanityConfigured || !client) return null;
  try { return await client.fetch(homePageQuery); } catch { return null; }
}

export async function fetchAboutPage() {
  if (!isSanityConfigured || !client) return null;
  try { return await client.fetch(aboutPageQuery); } catch { return null; }
}
