# CLAUDE.md

End-user docs for app.klastro.io. Astro Starlight, static, Cloudflare Pages
(`docs-klastro-io`), deployed on merge to `main`. npm-only (CI runs `npm ci`).

## Commands

```sh
npm run dev       # local preview
npm run verify    # MUST pass before any PR: astro check + locale parity + build + link check
```

## Rules

- Read `CONTRIBUTING.md` before writing a page. It is the style guide.
- Every page exists in French (`src/content/docs/<slug>.mdx`) **and** English
  (`src/content/docs/en/<slug>.mdx`). `scripts/check-locales.mjs` enforces it.
- Document only behaviour that exists in the frontend (`klastro-frontend`,
  `ui/` in klastro-platform). UI labels are quoted verbatim from
  `ui/src/lib/i18n/dictionaries/*.ts` in the page's language.
- No internals: no CRDs, controllers, gRPC, Keto/Kratos/Oathkeeper, database.
- FR: a Community seat holder is an *apprenant*, never *stagiaire*.
- When a frontend feature changes, update both locales in the same PR.
