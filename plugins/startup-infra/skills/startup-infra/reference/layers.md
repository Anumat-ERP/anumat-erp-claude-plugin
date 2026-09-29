# Layer catalogue

Eleven layers. For each: what it is for, the options with a free tier or a
free self-hosted path, and the stage at which to reconsider.

**Read this before quoting any number.** Free tiers change several times a
year. This file deliberately gives no quotas. The "Free tier" column says
what *kind* of allowance exists; the "As of" column says `check` because you
must. **Verify the current limits on the provider's pricing page** (URL in
each row) and record what you found, with the date, in
`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/stack-decision-record.md`.
Compare shortlisted vendors with
`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/vendor-evaluation.md`.

"Leave via" names the standard or path that makes the exit cheap
(see `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/principles.md`).

---

## 1. Compute / hosting

| Provider | Model | Free tier (qualitative) | Watch for | Leave via | Pricing page | As of |
|---|---|---|---|---|---|---|
| Cloudflare Workers / Pages | Edge functions, static | Generous request allowance; low per-request CPU time | Node API compatibility; CPU time limits | Node adapter + container | https://developers.cloudflare.com/workers/platform/pricing/ | check |
| Vercel | Serverless + static, Next.js native | Hobby plan for personal, non-commercial use | Hobby terms forbid commercial use; Pro billed per member | Container or another adapter | https://vercel.com/pricing | check |
| Netlify | Static + functions | Free starter plan with usage allowances | Bandwidth and build-minute usage | Static export or container | https://www.netlify.com/pricing/ | check |
| Fly.io | Containers on VMs, many regions | Small allowance or trial; card usually required | Usage billed once over allowance | OCI container | https://fly.io/docs/about/pricing/ | check |
| Render | Containers, workers, cron | Free web services that sleep when idle | Cold starts; free instances not for production | OCI container | https://render.com/pricing | check |
| Railway | Containers, databases | Trial credit, then usage-based | Usage billing; set a hard limit | OCI container | https://railway.com/pricing | check |
| Google Cloud Run / AWS Lambda / Azure Container Apps | Serverless containers / functions | Monthly free allowances | Egress, logging and NAT costs outside the free allowance | OCI container | https://cloud.google.com/run/pricing | check |

Default: a serverless or container platform you can deploy with `git push`.
**Reconsider at Stage 3** when steady load makes reserved capacity cheaper.

## 2. Database

| Provider | Engine | Free tier (qualitative) | Watch for | Leave via | Pricing page | As of |
|---|---|---|---|---|---|---|
| Neon | Serverless Postgres, branching | Free plan with storage and compute limits; scales to zero | Short restore window on free; compute limits | `pg_dump`, logical replication | https://neon.com/pricing | check |
| Supabase | Postgres + auth + storage + realtime | Free projects, paused after inactivity | Pausing of idle free projects; project count | `pg_dump` | https://supabase.com/pricing | check |
| Turso | libSQL (SQLite) at the edge | Free plan with database and row-read allowances | Not Postgres; migration to Postgres is a rewrite of SQL dialect bits | SQLite file export | https://turso.tech/pricing | check |
| PlanetScale | MySQL (Vitess) and Postgres | Check whether a free plan exists today | Plan changes in recent years; verify before choosing | `mysqldump` / `pg_dump` | https://planetscale.com/pricing | check |
| AWS RDS / Aurora, Google Cloud SQL | Managed Postgres/MySQL | Time-limited free tier for new accounts | Free tier expires; instance billed hourly | `pg_dump`, replication | https://aws.amazon.com/rds/pricing/ | check |
| Self-hosted Postgres | Postgres in a container | Only the host's cost | You own backups, upgrades, failover | Already standard | https://www.postgresql.org/ | n/a |

Default: **managed Postgres** in the region nearest users. **Reconsider at
Stage 3** for replicas, connection pooling and a larger plan.

## 3. Auth

| Provider | Model | Free tier (qualitative) | Watch for | Leave via | Pricing page | As of |
|---|---|---|---|---|---|---|
| Clerk | Hosted auth, organisations, UI | Free up to a monthly active user allowance | Organisation and SSO features on paid plans | Export users; OIDC | https://clerk.com/pricing | check |
| Auth.js | Open-source library | Free; you run it | You own session and account tables | Your own DB | https://authjs.dev | n/a |
| Better Auth | Open-source library | Free; you run it | Newer; check maintenance activity | Your own DB | https://www.better-auth.com | n/a |
| Supabase Auth | Hosted, tied to Supabase | Included with Supabase plans | Tied to Supabase project | Export `auth.users` | https://supabase.com/pricing | check |
| Auth0, WorkOS, Stytch | Hosted, enterprise SSO focus | Free tiers with MAU or feature caps | Enterprise SSO priced per connection | OIDC / SAML | https://auth0.com/pricing | check |

Never store passwords yourself. **Reconsider at Stage 3** when enterprise
customers ask for SAML SSO and SCIM.

## 4. Object storage

| Provider | Free tier (qualitative) | Watch for | Leave via | Pricing page | As of |
|---|---|---|---|---|---|
| Cloudflare R2 | Free storage and operations allowance; no egress fees | Operation counts (class A/B) | S3 API | https://developers.cloudflare.com/r2/pricing/ | check |
| AWS S3 | Time-limited free tier | Egress fees | S3 API | https://aws.amazon.com/s3/pricing/ | check |
| Backblaze B2 | Small free storage allowance | Egress depends on partner CDN | S3 API | https://www.backblaze.com/cloud-storage/pricing | check |
| Supabase Storage | Included with Supabase plans | Tied to the project | S3-compatible API | https://supabase.com/pricing | check |

Default: anything that speaks the S3 API. Keep files private; hand out signed
URLs.

## 5. Email (transactional)

| Provider | Free tier (qualitative) | Watch for | Leave via | Pricing page | As of |
|---|---|---|---|---|---|
| Resend | Free plan with daily and monthly caps | Caps; one domain on free | SMTP or a thin send interface | https://resend.com/pricing | check |
| Brevo | Free plan with a daily send cap | Brevo branding and daily cap | SMTP | https://www.brevo.com/pricing/ | check |
| Postmark | Developer allowance | Strict on transactional-only use | SMTP | https://postmarkapp.com/pricing | check |
| Amazon SES | Low per-email price; free allowance in some cases | Sandbox mode until approved | SMTP | https://aws.amazon.com/ses/pricing/ | check |

Verify the sending domain with SPF, DKIM and DMARC before the first real send.

## 6. Queues, cron and background jobs

| Provider | Free tier (qualitative) | Watch for | Leave via | Pricing page | As of |
|---|---|---|---|---|---|
| Cloudflare Queues + Cron Triggers | Check which Workers plan includes Queues | Plan requirement | Job interface in code | https://developers.cloudflare.com/queues/platform/pricing/ | check |
| Upstash (QStash, Redis) | Free request allowance | Per-request billing above it | HTTP / Redis protocol | https://upstash.com/pricing | check |
| Inngest / Trigger.dev | Free plans with run allowances | Another service in the path | Job interface in code | https://www.inngest.com/pricing | check |
| Postgres-backed queue (pg-boss, Graphile Worker) | Free; uses your DB | DB load at high volume | Already in Postgres | https://github.com/timgit/pg-boss | n/a |
| GitHub Actions scheduled workflow | Free minutes on public or allowance on private | Not precise; can be delayed | Any cron | https://github.com/pricing | check |

Stage 0–1: platform cron or a Postgres-backed queue. Stage 3: a managed queue
with dead-letter handling.

## 7. Observability (logs, metrics, traces, uptime)

| Provider | Free tier (qualitative) | Watch for | Leave via | Pricing page | As of |
|---|---|---|---|---|---|
| Grafana Cloud | Free tier with metrics, logs, traces allowances | Series cardinality; retention | OpenTelemetry | https://grafana.com/pricing/ | check |
| Better Stack | Free uptime monitors, logs and status page | Retention length | OpenTelemetry / syslog | https://betterstack.com/pricing | check |
| Axiom | Free ingest allowance | Retention | OpenTelemetry | https://axiom.co/pricing | check |
| UptimeRobot | Free monitors at a coarse interval | Check interval | n/a | https://uptimerobot.com/pricing/ | check |
| Platform logs (host built-in) | Included | Short retention | Log drain | host's docs | check |

Detail and alert rules: `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/observability.md`.

## 8. Error tracking

| Provider | Free tier (qualitative) | Watch for | Leave via | Pricing page | As of |
|---|---|---|---|---|---|
| Sentry | Free developer plan with an event allowance, one seat | Event spikes use the allowance; set rate limits | SDK swap | https://sentry.io/pricing/ | check |
| Highlight / Bugsnag / Rollbar | Free tiers of varying size | Check terms | SDK swap | https://www.bugsnag.com/pricing/ | check |
| Better Stack / Grafana (errors via logs) | See observability | Less grouping | OpenTelemetry | see above | check |

## 9. Product analytics

| Provider | Free tier (qualitative) | Watch for | Leave via | Pricing page | As of |
|---|---|---|---|---|---|
| PostHog | Generous free monthly event allowance; self-host option | Session replay and events priced separately | Event export | https://posthog.com/pricing | check |
| Cloudflare Web Analytics | Free, privacy-friendly page views | Page views only | n/a | https://www.cloudflare.com/web-analytics/ | check |
| Plausible / Umami | Paid hosted or free self-hosted | Self-hosting effort | CSV export | https://plausible.io/ | check |

## 10. DNS, CDN, TLS

| Provider | Free tier (qualitative) | Watch for | Leave via | Pricing page | As of |
|---|---|---|---|---|---|
| Cloudflare | Free DNS, TLS, CDN, basic WAF | Advanced rules on paid plans | Zone file export | https://www.cloudflare.com/plans/ | check |
| AWS Route 53 + CloudFront | Pay per zone/query; CDN free allowance | Small but non-zero | Zone file export | https://aws.amazon.com/route53/pricing/ | check |
| Bunny.net | Low-cost CDN, no free tier | Pay as you go | Standard CDN | https://bunny.net/pricing/ | check |

Buy the domain at a registrar that sells at cost and supports registrar lock
and 2FA. Put the registrar account under the team, not a person.

## 11. Secrets

| Option | Free tier (qualitative) | Watch for | Leave via | Pricing page | As of |
|---|---|---|---|---|---|
| Host's built-in secrets (Workers, Vercel, Fly, etc.) + CI secrets | Included | Scattered across tools by Stage 2 | Re-enter values | host's docs | check |
| Doppler | Free developer plan | Seats | CLI export | https://www.doppler.com/pricing | check |
| Infisical | Free cloud tier; open-source self-host | Self-hosting effort | CLI export | https://infisical.com/pricing | check |
| AWS Secrets Manager / GCP Secret Manager | Per-secret monthly price | Cost per secret and API call | Cloud CLI | https://aws.amazon.com/secrets-manager/pricing/ | check |
| SOPS + age (encrypted in git) | Free | Key handling discipline | Plain files | https://github.com/getsops/sops | n/a |

Stage 0–1: host and CI secrets, with `.env.example` listing names. Stage 2:
one source of truth that syncs to hosts and CI.

---

## Worked example

One real team's picks across these layers, with reasons and the "why not"
list: `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/reference-stack.md`.
