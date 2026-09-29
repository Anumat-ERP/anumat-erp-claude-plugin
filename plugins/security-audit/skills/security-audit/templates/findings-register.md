# Findings register: <audit ID>

Severity per `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/severity.md`.
Status: Open · In progress · Fixed (awaiting verify) · Verified · Accepted ·
False positive.

One row per finding. Full write-ups use
`${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/finding.md`.

| ID | Title | Severity | CVSS vector | Location | Evidence | Recommendation | Owner | Status | Due |
|---|---|---|---|---|---|---|---|---|---|
| F-001 | Cross-tenant invoice read via export endpoint | Critical | CVSS:4.0/AV:N/AC:L/AT:N/PR:L/UI:N/VC:H/VI:N/VA:N/SC:N/SI:N/SA:N | `apps/api/src/invoices/export.ts:42` | Staging: tenant A test user fetched tenant B invoice by ID (request/response in F-001 write-up) | Scope query by session tenant; add cross-tenant test | <name> | Open | <date> |
| F-002 | Webhook signature not verified | High | CVSS:4.0/AV:N/AC:L/AT:N/PR:N/UI:N/VC:N/VI:H/VA:N/SC:N/SI:N/SA:N | `apps/api/src/webhooks/billing.ts:15` | Handler parses body with no signature check | Verify HMAC and timestamp with constant-time compare | | Open | |
| F-003 | | | | | | | | | |

## Coverage

| Checklist area | Result |
|---|---|
| Authentication | Reviewed, findings F-… |
| Sessions | Reviewed, no findings |
| Access control / tenancy | |
| Input / injection | |
| XSS / CSP | |
| CSRF | |
| SSRF | |
| File upload | |
| Secrets / config | |
| Crypto | |
| Logging / monitoring | |
| Rate limiting | |
| Dependencies | |
| Cloud / edge | |
| CI/CD | |
| LLM features | Not applicable: no LLM features |

## Triaged tool results (not findings)

| Tool | Result ID | Decision | Reason |
|---|---|---|---|
| Semgrep | <rule id @ file:line> | False positive | <input is a server constant> |
