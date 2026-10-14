# Cloudflare Pages Deployment — Setup Guide

This repo deploys to Cloudflare Pages through
[.github/workflows/deploy.yml](../.github/workflows/deploy.yml) on every push to
`main` (plus manual `workflow_dispatch`). The pipeline mirrors the `klastro.io`
marketing site: `build` runs on every PR with no secrets; `deploy` runs only on
`main` and publishes the artifact `build` verified.

The site is plain static output (`dist/`) — no Cloudflare adapter, no Worker.

## Target

| Thing | Value |
|---|---|
| Account | `cb6786bf7e8d9894c580813c8a0a2e60` (same as `klastro.io`) |
| Zone | `klastro.io` (already active) |
| Pages project | `docs-klastro-io` — **create in step 1** |
| Custom domain | `docs.klastro.io` — **attach in step 4** |

## 1. Create the Pages project

Direct-upload project (the GitHub Action uploads; Cloudflare does not build):

```sh
npx wrangler@4 pages project create docs-klastro-io --production-branch=main
```

Or in the dashboard: **Workers & Pages → Create → Pages → Upload assets**, name it
`docs-klastro-io`, upload any placeholder, then let CI take over.

## 2. Cloudflare API token

Reuse the `klastro.io` token if it is scoped to **Account → Cloudflare Pages →
Edit** on this account (Pages tokens are account-scoped, not per-project).
Otherwise create one the same way: **My Profile → API Tokens → Create Custom
Token**, permission `Account / Cloudflare Pages / Edit`, limited to this account,
no zone resources.

## 3. GitHub secrets

In `edixos/docs.klastro.io`: **Settings → Environments → New environment**
`production`, then add environment secrets:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID` = `cb6786bf7e8d9894c580813c8a0a2e60`

Then run the workflow once (**Actions → Build & Deploy → Run workflow**) and
confirm `https://docs-klastro-io.pages.dev` serves the site.

## 4. Custom domain

**Workers & Pages → docs-klastro-io → Custom domains → Set up a custom domain →**
`docs.klastro.io`. Because the `klastro.io` zone is on the same account,
Cloudflare creates the proxied `CNAME docs → docs-klastro-io.pages.dev` record
itself and issues the certificate. No manual DNS edit is needed unless a
`docs` record already exists — delete it first if so.

## 5. Verify

```sh
curl -sI https://docs.klastro.io/ | grep -i -E 'HTTP/|content-security-policy'
curl -sI https://docs.klastro.io/en/ | head -1
```

Both should return `200`; the first should carry the CSP from `public/_headers`.

## Rollback

Dashboard → **docs-klastro-io → Deployments** → pick a previous deployment →
**Rollback to this deployment**. Or re-run the workflow on an older commit via
`workflow_dispatch`.
