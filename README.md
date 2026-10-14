# docs.klastro.io

End-user documentation for [Klastro](https://klastro.io) — the in-browser
cloud-native lab platform at [app.klastro.io](https://app.klastro.io).

Built with [Astro Starlight](https://starlight.astro.build), published to
Cloudflare Pages on every merge to `main`.

- French (default): https://docs.klastro.io/
- English: https://docs.klastro.io/en/

## Quick start

```sh
npm ci
npm run dev      # http://localhost:4321
npm run verify   # type-check + locale parity + build + link validation (= CI)
```

Requires Node ≥ 22.12.

## Layout

```
src/content/docs/            French pages (root locale)
src/content/docs/en/         English pages, same slugs
astro.config.mjs             Locales + sidebar groups
scripts/check-locales.mjs    Fails if a page is missing in either locale
public/_headers              Security headers for Cloudflare Pages
docs/                        Repo-maintenance docs (not published)
```

| Section | Audience |
|---|---|
| `getting-started/` | Everyone |
| `learners/` | Candidates and learners |
| `lab/` | Anyone inside a lab |
| `recruiters/` | Recruiters and hiring managers |
| `instructors/` | Instructors and scenario authors |
| `admins/` | Organization admins |
| `billing/` | Billing owners |
| `support/` | Everyone |
| `mcp/` | Users connecting an AI assistant |
| `troubleshooting/` | Everyone |

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) — page types, style rules, and the
"document only what ships" rule.

## Deployment

[docs/cloudflare-deployment.md](docs/cloudflare-deployment.md).
