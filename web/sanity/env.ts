/* ============================================================
   Sanity environment.
   Project ID is public-safe (it ships in the client bundle).
   Override via NEXT_PUBLIC_SANITY_PROJECT_ID if you ever migrate
   to a different Sanity project.
   ============================================================ */

export const apiVersion = "2024-09-30";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "tnmhhac3";

export const isSanityConfigured = projectId.length > 0;

export const useCdn = true;
