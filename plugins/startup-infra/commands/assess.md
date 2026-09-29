---
description: Read the repo, place the product at an infrastructure stage (0–4), and list what is missing and what is overbuilt.
argument-hint: [optional context — users, revenue, customers, monthly spend]
---

Assess the infrastructure of the current project. Extra context from the
user: **$ARGUMENTS**

Read these now; do not work from memory of them:
- ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/stages.md
- ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/principles.md
- ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/stage-scorecard.md

## Gather evidence from the repo

Read the actual files. Look for, at least:

| Evidence | Where to look |
|---|---|
| Hosting and runtime | `wrangler.toml`/`wrangler.jsonc`, `vercel.json`, `netlify.toml`, `fly.toml`, `render.yaml`, `railway.json`, `Dockerfile`, `Procfile` |
| Services in use | `.env.example`, env schema files, SDK imports in `package.json` or lockfiles |
| Database and migrations | ORM config, `migrations/` or `drizzle/` folders, seed scripts |
| CI/CD | `.github/workflows/`, `.gitlab-ci.yml`, other CI config; what runs on PR vs merge; where migrations run |
| Environments | preview, staging and prod config; per-environment secrets |
| IaC | `*.tf`, `Pulumi.*`, `cdk.json` |
| Observability | error-tracker SDK init, logging setup, OpenTelemetry, health endpoints |
| Backups | scheduled jobs that dump the database; restore scripts or runbooks |
| Docs | architecture docs, decision records, runbooks, incident notes |
| Secrets hygiene | committed `.env` files, keys in code, `.gitignore` |

Anything you cannot see in the repo (spend, user counts, provider plans,
2FA), **ask or mark unknown**. Do not guess it.

## Output

1. **Stage: N**, with the evidence that placed it (scorecard Part A rules).
   If the parts sit at different stages, say which.
2. **Gaps for this stage**, ordered by risk: data loss first, then outages
   nobody notices, then security baseline, then cost surprises. Each gap
   names the file or setting you checked and the reference file the
   requirement comes from.
3. **Overbuilt**: anything ahead of the stage, with its ongoing cost.
4. **Cliffs**: per external service, what happens at the free-tier edge, with
   "verify on <pricing page URL>". Use ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/layers.md for the URLs.
5. **Next exit trigger**, as a number or event.
6. The filled scorecard, from the template.

Security findings stay at baseline level
(${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/security-baseline.md). For a full audit, point the user to the
security-audit plugin.
