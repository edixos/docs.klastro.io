# Contributing to docs.klastro.io

This repository is the end-user documentation for [app.klastro.io](https://app.klastro.io).
It is written for the people who *use* Klastro — candidates, learners, recruiters,
instructors, scenario authors and organization admins — not for the people who
build it.

## Local workflow

```sh
npm ci
npm run dev       # http://localhost:4321 — French at /, English at /en/
npm run verify    # what CI runs: type-check, locale parity, build + link check
```

`npm run verify` must pass before you open a pull request. It fails on:

- a page that exists in one locale but not the other (`scripts/check-locales.mjs`);
- French typography in French pages (`scripts/check-copy.mjs`, same rules as klastro.io):
  narrow no-break space U+202F before `: ? ! ; » €` and after `«`, typographic
  apostrophe `’`. Run `node scripts/check-copy.mjs --fix` to correct a page;
- any broken internal link or anchor (`starlight-links-validator`, run during build).

Visual design follows [DESIGN.md](DESIGN.md) (Klastro fonts, palette, motion); product
context lives in [PRODUCT.md](PRODUCT.md).

## Where pages live

French is the default locale and owns the root; English mirrors it under `en/`.
Every page exists in **both** locales under the **same English slug**:

```
src/content/docs/lab/terminal.mdx       → https://docs.klastro.io/lab/terminal/
src/content/docs/en/lab/terminal.mdx    → https://docs.klastro.io/en/lab/terminal/
```

Sidebar groups are generated from directories (`astro.config.mjs`). Order inside a
group comes from `sidebar.order` in each page's frontmatter.

## Frontmatter

```yaml
---
title: Use the lab terminal
description: One sentence, shown in search results and link previews.
sidebar:
  order: 2
---
```

## Page types (Diátaxis)

Each page is exactly one of these. Don't mix them on one page — link instead.

| Type | Purpose | Shape |
|---|---|---|
| **Tutorial** | A first, guided success for a newcomer | Numbered `<Steps>`, one happy path, no options |
| **How-to** | Solve one specific problem | Prerequisites → `<Steps>` → result |
| **Reference** | Look something up | Tables, field lists, exhaustive and dry |
| **Explanation** | Understand why / how it works | Prose, no steps |

## Writing rules

1. **Document what exists.** Every screen, button and behaviour described must exist
   in the current `app.klastro.io`. If you are not sure it ships, leave it out.
2. **Use the exact UI labels.** Quote buttons and menu items as they appear in the
   app, in the page's language, in **bold**: **Start lab**, **Démarrer le lab**. The
   French and English strings live in the frontend's i18n dictionaries
   (`klastro-frontend/src/lib/i18n/dictionaries/`).
3. **No internals.** Readers never see Kubernetes operators, CRDs, controllers,
   gRPC, databases or identity-stack component names. Say "your lab is being
   prepared", not "the Session CR is reconciling". (Kubernetes *as lab subject
   matter* is fine.)
4. **Second person, present tense, active voice.** French uses *vous*.
5. **Admonitions** use Starlight asides — `:::tip`, `:::note`, `:::caution`,
   `:::danger`. Use caution/danger only when the reader can lose work, time, money
   or a graded attempt.
6. **Keyboard keys** use `<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd>`, with the
   macOS variant when it differs.
7. **Internal links** are root-relative and locale-prefixed, with a trailing slash:
   `/lab/terminal/` from French pages, `/en/lab/terminal/` from English pages.
8. **No placeholders.** No "TODO", "coming soon" or "[screenshot]" left in a page.
   If something is not ready, it is not documented yet.

### French vocabulary

- A Community-plan seat holder is an **apprenant** — never *stagiaire*.
- A participant in an instructor-led training is a *participant* (or *stagiaire*
  only in the training context, matching the app's own copy).
- Keep product nouns as the app shows them: *Scenario Studio*, *lab*, *crédits*.

## Starlight components

```mdx
import { Steps, Tabs, TabItem, Card, CardGrid, LinkCard, Badge } from '@astrojs/starlight/components';
```

`.mdx` files can use components; plain `.md` cannot.

## Deployment

Merging to `main` publishes to Cloudflare Pages. See
[docs/cloudflare-deployment.md](docs/cloudflare-deployment.md).
