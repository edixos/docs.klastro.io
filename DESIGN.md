# Design System: docs.klastro.io

The docs inherit the Klastro design system. **`klastro-frontend/DESIGN.md` (`ui/DESIGN.md` in
klastro-platform) is the source of truth**; the token values in `src/styles/custom.css` are
ported from `klastro.io/src/styles/globals.css`, which is itself a verbatim port of the app's.
When a token changes there, change it here.

## Typography

| Role | Family | Where |
|---|---|---|
| Display | Bricolage Grotesque (variable) | `h1`, `h2`, splash hero title |
| Body / UI | Space Grotesk 400–700 | Everything else |
| Mono | Source Code Pro 400–600 | Code, `<kbd>`, inline code |

All self-hosted through `@fontsource` (no third-party font host, keeps the CSP `font-src 'self'`).
Display headings use `-0.02em` tracking; body line-height 1.7; content measure ≤ 45rem.

## Colour

Restrained: tinted navy/ice neutrals, one accent (Edixos Navy `oklch(0.443 0.059 254)` light,
Ice `oklch(0.925 0.024 228)` dark), semantic signals green / amber / red for asides only.
Starlight's gray ramp is remapped onto the Klastro neutrals in both themes.

## Shape & elevation

Radius from the app scale: 6px (sm), 8px (md), 10px (lg). Flat by default: borders and tint
before shadow. Asides use a full 1px border + tinted fill, never a thick side stripe.

## Motion

Feedback only, under 200ms, `cubic-bezier(0.23, 1, 0.32, 1)` ease-out. Colour/border
transitions on hover (gated to hover-capable pointers), `scale(0.97)` on press for buttons and
cards. No entrance or scroll animation. All movement removed under `prefers-reduced-motion`.
