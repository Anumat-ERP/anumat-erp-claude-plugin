# Environments and CI/CD

The path every change takes: **local → preview → staging → prod**. Each stage
adds one environment only when the previous one stops catching problems.

## Environments per stage

| Stage | Local | Preview (per PR) | Staging | Prod |
|---|---|---|---|---|
| 0 | Yes, with local fallbacks for every service and seeded data | Optional | No | One free deploy for the demo |
| 1 | Yes | Yes if the host offers it, ideally with a database branch | No | Yes, on a real domain |
| 2 | Yes | Yes, with a database branch or seeded DB | **Yes**, mirrors prod config, seeded or anonymised data | Yes |
| 3 | Yes | Yes, auto-cleaned on merge | Yes, deployed by IaC | Yes, deployed by IaC; protected |
| 4 | Yes | Yes | Yes, per region where relevant | Per region |

**Rules for each environment:**
- Separate credentials, buckets and databases per environment. A preview must
  never be able to write to production.
- Production data does not leave production. Staging uses seeded or
  anonymised data.
- Each environment's config comes from the same code, with values injected.
  Differences between staging and prod are listed, and short.

## CI basics checklist (Stage 1)

- [ ] Every pull request runs type check, lint and unit tests
- [ ] Main is protected: no direct pushes; CI must pass to merge
- [ ] Merge to main deploys to production automatically, or with one click
- [ ] **Migrations run in the deploy step**, before the new code serves
      traffic, and never from a laptop
- [ ] Migrations are committed files, reviewed in the PR
- [ ] The deploy uses a scoped token stored in CI secrets, not a personal key
- [ ] A failed deploy leaves the previous version serving
- [ ] Rollback is one command or one click, and someone has tried it
- [ ] Dependency and secret scanning are on (most code hosts offer this free)
- [ ] Error tracker receives a release marker on each deploy

## Stage 2 additions

- [ ] Preview URL posted on each PR; end-to-end tests run against it
- [ ] Staging deploys on merge; prod deploys on a tag or approval
- [ ] Database migrations are **backwards compatible for one release**
      (expand, migrate, contract), so a rollback does not break
- [ ] Smoke test after each production deploy; automatic rollback on failure
- [ ] Secrets come from one store, synced to host and CI

## Stage 3 additions

- [ ] Infrastructure changes go through PRs with an IaC plan shown in review
- [ ] Feature flags gate risky changes; flags have owners and removal dates
- [ ] Progressive delivery (canary or percentage rollout) on the core service
- [ ] Deploy frequency, lead time, change-failure rate and time to restore
      are measured

## Migrations in the deploy step

```
build → test → migrate (expand only) → deploy new code → smoke test
      → later release: migrate (contract: drop old columns)
```

- **Expand**: add columns and tables; make new columns nullable or defaulted.
- **Migrate data** in a job, in batches, if large.
- **Contract** only after no running code reads the old shape.
- Long-running migrations (index builds on large tables) run with the
  database's online options and outside peak hours.

## Feature flags

- Stage 1–2: environment variables or a table in your own database are enough.
- Stage 3: a flag service (hosted or open-source) with per-user and
  percentage targeting, audit log, and kill switches.
- Every flag has an owner and a removal date. Old flags are a source of
  incidents.

Release and rollback also appear in the go-live checklist:
`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/go-live-checklist.md`.
