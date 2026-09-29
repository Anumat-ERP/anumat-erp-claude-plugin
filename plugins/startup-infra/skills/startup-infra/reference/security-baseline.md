# Security baseline per stage

This is the **minimum that must be true before moving up a stage**. It is a
baseline, not an audit. For threat modelling, code review for vulnerabilities,
and audit preparation, use the security-audit plugin.

| Area | Stage 0 | Stage 1 | Stage 2 | Stage 3 | Stage 4 |
|---|---|---|---|---|---|
| Secrets | `.env.local` ignored by git; `.env.example` with names only | Host and CI secret stores; secret scanning on the repo | One secrets store per environment; rotation list | Rotation on a schedule; short-lived credentials for CI (OIDC) | Central secrets service; automated rotation |
| Accounts | Team members' own logins | 2FA on every provider; two admins per account; shared team email as owner | Access list reviewed quarterly; offboarding checklist | SSO for internal tools; access reviews with evidence | Just-in-time elevated access |
| Auth for users | Demo only | Managed auth; no self-built password storage | MFA available; session limits | SSO (SAML/OIDC) for enterprise customers | SCIM provisioning |
| Data | Seeded data only; no real personal data | TLS everywhere; DB not publicly reachable except via provider's auth; private buckets with signed URLs | Encryption at rest confirmed; backups encrypted; PII inventory | Data classification; retention and deletion policy enforced | Residency per region |
| App | n/a | Input validation; rate limits on sign-in, upload and webhooks; webhook signatures checked | Security headers; dependency updates weekly | Regular external pen test | Bug bounty |
| Infra | n/a | Least-privilege deploy token | Separate accounts or projects per environment | IaC with policy checks; audit logs retained | Organisation-wide guardrails and policies |
| Compliance | n/a | Privacy notice and terms | DPA template ready; subprocessor list | SOC 2 readiness (Type I, then II) or ISO 27001 as customers ask | Continuous compliance tooling |

## Rules that apply at every stage

- **Least privilege** for people, tokens and services (see
  `${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/principles.md`).
- A leaked secret is **rotated**, not just deleted from the repo.
- Production data is never copied to laptops, previews or staging.
- The registrar, DNS and email-sending accounts are as sensitive as the
  database: whoever controls them controls password resets.

## Feeding the checklist

The per-stage rows above are folded into
`${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/go-live-checklist.md`.
