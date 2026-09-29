# Security audit plan: <system name>

| Field | Value |
|---|---|
| Audit ID | SA-<YYYY>-<NN> |
| Date | <YYYY-MM-DD> |
| Prepared by | <name> |
| Authorised by | <name, role, date of written approval> |
| System owner | <name> |

## 1. Objective

<One paragraph. Why this audit, why now: launch, customer request, SOC 2
readiness, incident follow-up.>

## 2. Framework and level

| Asset or component | Framework | Level | Reason |
|---|---|---|---|
| <web app> | OWASP ASVS 5.0 | L2 | <stores customer PII> |
| <auth service> | OWASP ASVS 5.0 | L3 | <compromise affects all tenants> |
| <public API> | OWASP API Top 10 (2023) | — | <partner-facing> |

Chosen with `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/choosing-framework.md`.

## 3. Scope

**In scope**
- Repositories: <org/repo @ commit or branch>
- Environments: <local, staging URL>
- Services and integrations the team controls: <list>

**Out of scope** (explicit)
- <third-party SaaS internals; production; physical security; social engineering>

## 4. Rules of engagement

- Static code and configuration review: allowed on all in-scope repos.
- Automated scans: dependency, secret, SAST, IaC on in-scope repos.
- Dynamic testing: **only** against <staging URL>, passive baseline unless
  approved here: <yes/no, by whom>.
- Production: no active testing. Read-only configuration review only, with
  <name>'s approval.
- Accounts: test accounts created for the audit only. No real customer
  accounts or data used as test subjects.
- Data handling: no production data exported; secrets found are reported by
  location and type, never copied.
- Rate: scanners throttled to <N req/s>; window <days, hours, timezone>.
- Stop condition: if testing causes errors or finds a live critical issue,
  stop and call <name, contact>.
- Excluded techniques: exploit development, denial of service, attacks on
  third parties, evasion.

## 5. Approach

| Phase | Planned | Owner | Date |
|---|---|---|---|
| Asset inventory | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/asset-inventory.md` | | |
| Threat model | `/security-audit:threat-model` | | |
| Automated scanning | Tools: <list> | | |
| Manual review | Checklists: <list areas> | | |
| Findings and triage | Register | | |
| Fix and verify | | | |
| Report | | | |

## 6. Deliverables

- Findings register
- Remediation plan
- Verification record
- Executive summary and full report

## 7. Sign-off

| Role | Name | Date |
|---|---|---|
| System owner | | |
| Auditor | | |
