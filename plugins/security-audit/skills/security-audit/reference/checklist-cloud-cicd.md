# Checklist: cloud and edge configuration, CI/CD hardening

Review **your configuration** of each provider. Do not test the provider's
own infrastructure; that is out of scope and usually against their terms.

## Cloud and edge: general

- [ ] Every cloud account has MFA on all human users; root/owner accounts
      locked away and alerting on use.
- [ ] Access by SSO where the provider supports it; leavers removed the same
      day.
- [ ] Service credentials scoped to one purpose and one environment.
- [ ] Object storage buckets private by default; public ones listed and
      justified. (IaC scans: Trivy, Checkov.)
- [ ] Preview and staging deployments do not hold production secrets or data,
      and are protected if they expose unreleased features.
- [ ] DNS: no dangling records pointing at deprovisioned services (subdomain
      takeover); registrar account has MFA and lock.

## Cloudflare (example)

- [ ] Origin accepts traffic only from Cloudflare (authenticated origin pulls,
      Tunnel, or IP allow-list), so the WAF cannot be bypassed via the origin
      IP.
- [ ] SSL/TLS mode is Full (strict), not Flexible.
- [ ] WAF managed rules and rate-limiting rules on auth endpoints.
- [ ] API tokens scoped to the zones and permissions needed; no Global API
      Key in CI.
- [ ] Workers: secrets in bindings, not in code; routes do not expose
      internal endpoints.

## Vercel (example)

- [ ] Environment variables scoped per environment (Production, Preview,
      Development); production secrets not exposed to Preview.
- [ ] Deployment protection on previews where they show unreleased work or
      real data.
- [ ] Only public values in `NEXT_PUBLIC_*`.
- [ ] Middleware-based auth is backed by checks in the route or server action
      itself, since middleware can be skipped by misconfigured matchers.
- [ ] Team access reviewed; tokens scoped and expiring.

## Neon / managed Postgres (example)

- [ ] Application connects with a least-privilege role, not the owner role.
- [ ] Branches used for preview hold masked or synthetic data, not a copy of
      production PII.
- [ ] IP allow-list or private networking where available; TLS required
      (`sslmode=require` or stricter).
- [ ] Connection strings rotated when staff leave or a leak is suspected.
- [ ] Row-level security policies, if used, are tested.
- [ ] Point-in-time restore configured and a restore has been tested.

## CI/CD hardening (GitHub Actions)

- [ ] Workflow `permissions:` set at top level to `contents: read`; jobs
      request only the write scopes they need.
- [ ] Third-party actions pinned to a full commit SHA with the version in a
      comment. First-party actions pinned too for high-assurance repos.
- [ ] `pull_request_target` and `workflow_run` never check out and run PR
      code with secrets available.
- [ ] Untrusted input (`github.event.*.title`, `body`, branch names) never
      interpolated directly into `run:` scripts; pass through `env:` instead
      (script injection).
- [ ] Cloud deploys use OIDC federation with short-lived credentials, scoped
      by repo, branch, and environment, instead of long-lived keys.
- [ ] Environments with required reviewers for production deploys.
- [ ] Branch protection or rulesets on the default branch: PR review
      required, status checks required, force-push disabled.
- [ ] Self-hosted runners not used for public repos; ephemeral if used.
- [ ] Secrets not echoed; `set -x` not used in steps that touch secrets.
- [ ] Dependabot (or Renovate) also updates GitHub Actions.
- [ ] Package publishing uses trusted publishing / provenance where the
      registry supports it.

Supply-chain background: `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/slsa.md`.
Example workflow: `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/ci-workflow.md`.
