# Reference stack (one worked example)

This is **one** team's stack, shown so the framework has a concrete case. It
is not the recommendation. Every layer has alternatives in
`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/layers.md`, and the
right pick depends on the team, the region and the product.

The product: a B2B workflow app (approvals, surveys, notifications) for
companies in Southeast Asia. Pilot target: close to $0 a month.

## Layers

| Layer | Pick | Why | What it replaces locally |
|---|---|---|---|
| Domain, DNS, TLS | Cloudflare Registrar + DNS | At-cost domain; free DNS and TLS; same account as hosting | n/a |
| Framework | Next.js (App Router) + TypeScript | One codebase for pages and server code | n/a |
| Hosting | Cloudflare Workers via the OpenNext adapter | Same provider as DNS and files; free tier, then a small paid plan | `next dev` |
| Database | Neon Postgres in Singapore, Drizzle ORM, serverless driver | Scales to zero; a database branch per pull request | PGlite (Postgres in WebAssembly) |
| Auth and workspaces | Clerk with Organizations | Invites, roles and org switching ready-made | Signed cookie with a demo-user picker |
| Files | Cloudflare R2, signed upload URLs | S3 API; no egress fees | Local disk with signed links |
| Email | Brevo transactional API | Free daily allowance fits the pilot | An outbox visible in an admin console |
| Background work | Cloudflare Cron Triggers + Queues in a separate jobs Worker | No extra vendor | In-process runner |
| Chat notifications | Telegram Bot API | Where the users already are | In-app preview |
| AI | Claude API, smallest model, server-side only | Pay per use; small volume | Rules-based sample output |
| Errors | Sentry | Free developer plan | Console |
| Analytics | Cloudflare Web Analytics, PostHog later | Free, privacy-friendly | n/a |
| CI/CD | GitHub Actions | Type check, test, preview, deploy | n/a |

## What the example gets right

- **Local mode for every service.** Each external service sits behind a small
  interface with a local implementation chosen when its env vars are empty.
  `install && dev` runs the whole product with demo data and no accounts. This
  is the Stage 0 "local-first, backup demo" rule turned into architecture, and
  it makes CI run end-to-end tests without secrets.
- **One region.** App database in Singapore, near the users.
- **Portability written down.** Postgres, the S3 API, and the Next.js Node
  adapter mean an on-premise build is Docker + Postgres + MinIO + SMTP. The
  team recorded that moving hosting to Vercel "is a deployment change, not a
  code rewrite".
- **Own backups from day one.** The database's free-plan restore window is
  short, so a nightly `pg_dump` goes to object storage, with 30 days kept, and
  a restore is tested before the pilot.
- **The first bills are known in order**: the hosting paid plan first, then
  auth, database and email as usage grows.

## Placing it on the stages

| Stage | What changes in this stack |
|---|---|
| 0 | Local mode only, or one free Workers deploy with seeded demo data |
| 1 | Real domain; production Clerk instance; Neon main branch; nightly dump to R2; Sentry to team chat; budget alerts |
| 2 | Paid Workers plan; staging on its own Neon branch and R2 bucket; uptime checks; status page; SLO on approval submit; secrets in one store |
| 3 | Terraform/OpenTofu or Pulumi for Cloudflare, Neon and DNS; read replica; queue dead-letters; feature flags; SOC 2 readiness |
| 4 | Second region for EU or other customers; residency per workspace; committed spend |

## Known trade-offs to carry forward

- Next.js on Workers needs compatibility flags for some Node APIs; test in
  the Workers runtime before merging.
- Free tiers cap email sends, database compute and error events; alerts go on
  before a public launch.
- Two sources of truth for membership (auth provider and app DB), kept in step
  by webhooks.

Diagrams for this stack at each stage follow the shapes in
`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/architecture-diagrams.md`.
