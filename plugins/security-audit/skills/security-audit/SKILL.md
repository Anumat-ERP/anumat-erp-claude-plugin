---
name: security-audit
description: Use when the user asks for a security audit, security review, vulnerability assessment, threat model, pentest preparation, hardening pass, or compliance readiness (SOC 2, ISO 27001, OWASP ASVS) on code or systems they own. Also use when asked to fix or retest security findings, write a SECURITY.md or incident response plan, or add security scanning to CI. Defensive only; not for exploit development or testing systems the user does not own.
---

# Security Audit

A defensive audit workflow for software the user's team owns. It turns "is
this secure?" into a scoped, evidenced, repeatable process: plan, model,
scan, review, record, fix, verify, report.

## Scope and ethics (read first)

This skill is for **authorised** review only: code and systems the user owns,
or has written permission to test.

- No exploit development. Demonstrate a finding with the smallest safe proof
  (a failing test, a request against local or staging, a code trace), never a
  weaponised payload.
- No testing of third-party systems. Dynamic scans point at the user's own
  local or staging environment. Production needs explicit written sign-off.
- No evasion, persistence, or detection-bypass techniques.
- If ownership or permission is unclear, stop and ask before any active test.
  Static review of the code in front of you is always in scope.

## The workflow

```
PLAN      → scope, rules of engagement, assets, framework + level
MODEL     → STRIDE threat model, data-flow diagram
SCAN      → dependencies, secrets, SAST, containers/IaC, SBOM, headers
REVIEW    → manual review against the checklists, area by area
FINDINGS  → findings register with severity, CVSS vector, evidence
FIX       → prioritised plan; small commits, each with a proving test
VERIFY    → retest each fixed finding; record the evidence
REPORT    → executive summary, full report, retest cadence
```

Phase detail: `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/audit-phases.md`.

| Phase | Command | Main files |
|---|---|---|
| PLAN | `/security-audit:plan` | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/audit-plan.md`, `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/asset-inventory.md` |
| MODEL | `/security-audit:threat-model` | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/stride.md`, `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/threat-model.md` |
| SCAN + REVIEW | `/security-audit:run` | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/tooling.md` and the checklists below |
| FINDINGS | `/security-audit:run` | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/findings-register.md`, `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/finding.md` |
| FIX | `/security-audit:fix` | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/remediation-plan.md` |
| VERIFY | `/security-audit:verify` | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/verification-record.md` |
| REPORT | `/security-audit:report` | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/audit-report.md`, `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/executive-summary.md` |

For a small request ("review this endpoint"), skip the ceremony: pick the
matching checklist, review, and report findings in the register format.

## Choose the framework

Never audit against "best practice" in general. Name the framework and level,
and say why. Start at
`${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/choosing-framework.md`.

| Framework | Use it for | Reference |
|---|---|---|
| OWASP ASVS 5.0 | Web app verification requirements, L1/L2/L3 | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/owasp-asvs.md` |
| OWASP Top 10 | Awareness baseline, web risk categories | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/owasp-top10.md` |
| OWASP API Top 10 (2023) | REST/GraphQL/RPC APIs | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/owasp-api-top10.md` |
| OWASP MASVS | iOS and Android apps | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/owasp-masvs.md` |
| CWE Top 25 | Naming weakness classes in findings | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/cwe-top25.md` |
| NIST CSF 2.0 | Organisation-level programme view | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/nist-csf.md` |
| NIST SSDF (SP 800-218) | Secure development process | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/nist-ssdf.md` |
| CIS Controls v8 | Prioritised operational controls, IG1–IG3 | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/cis-controls.md` |
| SLSA | Build and supply-chain integrity | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/slsa.md` |
| STRIDE | Threat modelling | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/stride.md` |
| SOC 2 / ISO 27001 | What auditors will ask for | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/compliance-mapping.md` |

## Review checklists

Read the checklist for each area in scope before reviewing it. Do not work
from memory.

| Area | Checklist |
|---|---|
| Authentication, sessions, access control, multi-tenant isolation (IDOR) | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-identity.md` |
| Input validation, injection, XSS/CSP, CSRF, SSRF, file upload | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-input.md` |
| Secrets, config, crypto, logging, rate limiting, dependencies | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-platform.md` |
| Cloud and edge config, CI/CD hardening | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-cloud-cicd.md` |
| LLM and AI features | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-llm.md` |

## Severity

Every finding gets a severity from
`${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/severity.md`: a CVSS
v4.0 vector where one applies, the likelihood × impact matrix for the final
call, and the SLA that follows from it. Severity describes the risk in this
system, not the worst case of the weakness class.

## Rules for findings

1. **Evidence or it is not a finding.** Every finding names a file and line, a
   config key, a request/response from local or staging, or a tool result. A
   hunch goes under "Areas not fully reviewed", not in the register.
2. **State the consequence.** "Missing ownership check" invites a shrug.
   "Any signed-in user can read another tenant's invoices by changing the ID"
   does not.
3. **Name the rule.** Each finding cites the framework requirement or CWE it
   breaks.
4. **Coverage is explicit.** For every checklist area, say "reviewed, no
   findings", "findings recorded", or "not reviewed, because…". Silence reads
   as "checked".
5. **Never paste a live secret** into a finding, report, or chat. Record where
   it is and its type, then redact.

## Rules for fixes

Full procedure in `/security-audit:fix`. The short version:

- Small, reviewed commits, each with a test that proves the fix.
- Never weaken, skip, or delete a test to make a fix pass.
- Never commit secrets. A leaked secret is rotated first, then history is
  cleaned.
- Any change that touches production data or authentication flows waits for
  the user's explicit approval.

## Supporting templates

| Need | Template |
|---|---|
| Disclosure policy for the repo | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/security-md.md` |
| Incident response plan outline | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/incident-response.md` |
| Security checklist for pull requests | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/pr-checklist.md` |
| CI scanning workflow (GitHub Actions) | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/ci-workflow.md` |

## Limits to state to the user

A review by Claude is not a penetration test and not a certification. It
raises coverage and consistency. Where a contract or regulation requires an
accredited auditor or a licensed tester, say so. Framework editions change:
check the official source linked in each reference before quoting a
requirement ID externally.
