# /web/public — drop files here

These paths are referenced by the site. Anything in this folder is served at the URL root.

## Required (to remove placeholders)

| Path | Where it renders | Recommended |
|---|---|---|
| `/omi-logo.png` | Nav, Footer, Event page organizer strip | Full color logo, transparent background, ≥600px tall |
| `/conference-hero.jpg` | Conference page hero (at 65% opacity, indigo tinted) | 2400×1200, JPG, <500 KB |

## Optional

| Path | Where it renders | Notes |
|---|---|---|
| `/conference-reel.mp4` | Home hero backdrop (25% opacity, screen blend) | 8–15s loop, 1080p, no audio, <4 MB |
| `/conference-poster.jpg` | Video poster while loading | 1920×1080, JPG |
| `/omi-logo-reverse.png` | Future: optional white/reversed logo for dark surfaces | Same size as main logo |

## Image slot placeholders

Every empty photo spot across the site is a `<ImageSlot>` component with a unique `id` attribute (e.g. `home-ministry-yes`, `conference-hero`, `event-2026-annual-conference-speaker-1`). When you drop real imagery in, I can wire each slot to the file path. ~65 slots total.
