---
version: "alpha"
name: AM25 Website
description: "Public AM25 marketing, work, notes, contact, and Content Hub landing pages"
colors:
  primary: "oklch(0.985 0 0)"
  primary-foreground: "oklch(0.205 0 0)"
  background: "#000000"
  foreground: "oklch(0.985 0 0)"
  accent: "#ffff00"
  muted: "oklch(0.269 0 0)"
  muted-foreground: "oklch(0.708 0 0)"
  border: "oklch(0.269 0 0)"
  destructive: "oklch(0.396 0.141 25.723)"
typography:
  ui:
    fontFamily: "Martian Mono, monospace"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.5"
  navigation:
    fontFamily: "Martian Mono, monospace"
    fontSize: "1.25rem"
    fontWeight: 400
  hero:
    fontFamily: "Martian Mono, monospace"
    fontSize: "6rem"
    fontWeight: 700
    lineHeight: "1.07"
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 32px
  xl: 48px
rounded:
  none: 0px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.none}"
    height: 36px
  header:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.none}"
  content-card:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.none}"
---

## Overview

The public AM25 website is an editorial and portfolio surface: typographic, high-contrast, sparse, and unapologetically direct. It uses a black default canvas with oversized uppercase Martian Mono, generous empty space, and vivid AM25 yellow as a deliberate mode rather than a decorative accent. The work, images, and words carry the visual texture; the interface stays flat and exact.

## Colors

The default theme is black with near-white text. It also has intentional yellow and light variants, applied at the page-layout level: yellow becomes the canvas with black content; light becomes a white canvas with near-black content. Preserve those semantic variants rather than introducing page-local colors. AM25 yellow (`#ffff00`) is the shared brand signal and the default icon accent on black. Supporting UI uses the neutral gray scale; destructive states stay muted dark red.

| Role | Token | Use |
| --- | --- | --- |
| Default canvas | `background` | Black marketing and editorial pages |
| Default ink | `foreground` | Primary text and imagery framing |
| AM25 yellow | `accent` | Yellow page variant, external-link/icon emphasis |
| Quiet surface | `muted` | Secondary control state and restrained contrast |
| Supporting text | `muted-foreground` | Descriptions and metadata |
| Structure | `border` | Minimal form, card, and control separation |
| Danger | `destructive` | Form errors and destructive feedback only |

## Typography

Martian Mono is the sole visual voice. Navigation is 20 px and uppercase. Hero headings use bold uppercase type at 60 px on small screens, 128 px from the medium breakpoint, and 160 px at very large sizes, with a tight 1.07 line height. Section copy is much calmer: 20 px body text, rising to 30 px for centered hero descriptions. Keep the contrast between monumental headlines and straightforward reading copy.

## Layout

Use the 4 px rhythm and allow generous sectional space. The fixed header has 16 px padding and a maximum content width of `104rem`; reuse `PageContainer` and the existing grid helpers. The desktop hero can occupy the viewport and centers its title from the medium breakpoint. Keep the header fixed and reserve its existing top spacing. On small screens, stack grids and retain large type at an appropriate 60 px scale instead of shrinking the site into a desktop layout. Do not exceed the `max-w-8xl` content system unless the existing `9xl` pattern is appropriate.

## Elevation & Depth

The public site is intentionally flat: custom CSS disables box, drop, and text shadows. Use spacing, typography, and contrast for hierarchy. Scroll-reveal motion may use its existing filter exception, but no new floating-card or glass treatment should be introduced.

## Shapes

Keep interface geometry square (`0px`) whenever feature code controls it. Existing shadcn primitives may retain their established radius only where already provided by the system. Circular forms belong only to semantic elements such as avatars, badges, spinners, and tooltip markers.

## Components

Use the existing radix-vega shadcn components, header, mobile menu, grid helpers, hero, work cards, content blocks, and contact components. The header is fixed, black by default, and flips to yellow or white with its page variant. Navigation items are uppercase and underlined on hover; external links include the existing arrow treatment. Buttons and controls should be compact, flat, and subordinate to page content. Content cards, galleries, and CMS-rendered blocks need clear structure without shadow or decorative chrome.

## Do's and Don'ts

Do make the typography, work, and editorial content the dominant experience. Do use black, yellow, and light variants deliberately and consistently through the established layout wrappers. Do keep copy concise, high-contrast, and plainspoken.

Do not add gradients, shadows, glass, rounded feature UI, generic SaaS hero cards, or secondary brand colors. Do not make yellow a random CTA fill on a black page when it is not part of the existing component or page variant. Do not dilute the headline scale with several competing display styles.
