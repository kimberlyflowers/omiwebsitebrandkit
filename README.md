# Outpouring Missions International — Brand Kit

The source of truth for OMI's identity: colors, typography, logo rules, voice, and reusable design tokens ready to drop into the upcoming website.

**Parent brand:** Outpouring Missions International (OMI)
**Sub-brands:** YES (Youth Empowerment School) · YES Rise Up
**Established:** 2008
**Tagline:** *Transforming Lives. Igniting Futures. With AI.*

---

## Quick Start

| I want to… | Open |
|---|---|
| Read the full brand system | [`BRAND_GUIDELINES.md`](./BRAND_GUIDELINES.md) |
| Grab hex codes fast | [Color snapshot](#color-snapshot) below |
| Use tokens in CSS | [`brand/tokens/index.css`](./brand/tokens/index.css) |
| Use tokens in JS / design tools | [`brand/tokens/colors.json`](./brand/tokens/colors.json) |
| Use tokens in Tailwind | [`brand/tokens/tailwind-preset.js`](./brand/tokens/tailwind-preset.js) |

---

## Color Snapshot

### Primary
| Swatch | Name | HEX |
|---|---|---|
| ![#0B1F3D](https://placehold.co/24x24/0B1F3D/0B1F3D.png) | Deep Indigo | `#0B1F3D` |
| ![#152C5B](https://placehold.co/24x24/152C5B/152C5B.png) | Royal Indigo | `#152C5B` |
| ![#D4A24C](https://placehold.co/24x24/D4A24C/D4A24C.png) | Heritage Gold | `#D4A24C` |
| ![#F2C54A](https://placehold.co/24x24/F2C54A/F2C54A.png) | Bright Gold | `#F2C54A` |
| ![#17A4C2](https://placehold.co/24x24/17A4C2/17A4C2.png) | Mission Teal | `#17A4C2` |
| ![#00C2E0](https://placehold.co/24x24/00C2E0/00C2E0.png) | Electric Teal | `#00C2E0` |

### Neutrals
| Swatch | Name | HEX |
|---|---|---|
| ![#FFFFFF](https://placehold.co/24x24/FFFFFF/FFFFFF.png) | Pure White | `#FFFFFF` |
| ![#F4F6FA](https://placehold.co/24x24/F4F6FA/F4F6FA.png) | Off White | `#F4F6FA` |
| ![#D9DEE8](https://placehold.co/24x24/D9DEE8/D9DEE8.png) | Mist | `#D9DEE8` |
| ![#2A2D34](https://placehold.co/24x24/2A2D34/2A2D34.png) | Graphite | `#2A2D34` |
| ![#141518](https://placehold.co/24x24/141518/141518.png) | Charcoal | `#141518` |

---

## Typography

> The reference board was an AI-generated composite, so its letterforms aren\'t a licensed typeface. These are the closest free, production-ready matches.

| Role | Font | Matches in reference |
|---|---|---|
| Display / wordmark / headlines | **Montserrat** (900 Black) | "OUTPOURING" geometric bold |
| Subtitle (tracked caps) | **Montserrat** (400 Regular, `+0.2em` tracking) | "MISSIONS INTERNATIONAL" |
| Body / UI | **Inter** | — |
| Athletic (YES sub-brand) | **Archivo Black** *italic* / alt: **Saira Condensed 900** | chunky "YES" block italic |
| Tagline script | **Kaushan Script** | "Igniting Futures." brush |
| Monospace | **JetBrains Mono** | — |

All free via Google Fonts. Premium upgrade paths (Druk Wide, Gotham Ultra, Proxima Nova) documented in [`BRAND_GUIDELINES.md § 4.1`](./BRAND_GUIDELINES.md#41-primary-typefaces). Ready-to-paste `<link>` tag in [`brand/tokens/typography.css`](./brand/tokens/typography.css).

---

## Repository Layout

```
.
├── BRAND_GUIDELINES.md          # Full brand system doc
├── README.md                    # This file
└── brand/
    └── tokens/
        ├── index.css            # Single-import entrypoint
        ├── colors.css           # CSS custom properties
        ├── colors.json          # W3C design-tokens format
        ├── typography.css       # Fonts + type scale
        ├── spacing.css          # Grid, radii, motion
        └── tailwind-preset.js   # Tailwind config preset
```

---

## Next Up

Website build lands in a separate branch once the brand kit is approved.
