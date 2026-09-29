# security-audit

A defensive security audit workflow for software your team owns. It plans the
audit, picks the framework, runs the review against the repository, records
findings, plans and applies fixes, verifies them, and writes the report.

Most "security reviews" fail in one of two ways. They run a scanner, paste the
output, and call it an audit. Or they read the code with no checklist, so
coverage depends on what the reviewer happened to remember. This plugin fixes
both: every audit has a written scope, a named framework, a findings register
with evidence, and a retest record that proves each fix.

## Scope: defensive only

This plugin is for authorised review of code and systems you own or have
written permission to test. It does not write exploits, attack third-party
systems, or teach evasion. Dynamic scanning runs against your own staging
environment only, never production without sign-off and never someone else's
host.

## The workflow

```
PLAN      → scope, rules of engagement, asset inventory, framework and level
MODEL     → STRIDE threat model with a data-flow diagram
SCAN      → dependencies, secrets, SAST, containers and IaC, SBOM
REVIEW    → manual review against the chosen checklist, area by area
FINDINGS  → register: ID, severity, CVSS vector, evidence, owner, due date
FIX       → prioritised plan; small reviewed commits, each with a test
VERIFY    → retest every fixed finding and record the result
REPORT    → executive summary and full report; set the retest cadence
```

## Commands

| Command | Does |
|---|---|
| `/security-audit:plan` | Scope the audit, write rules of engagement, inventory assets, choose framework and level |
| `/security-audit:threat-model` | Build a STRIDE threat model with a Mermaid data-flow diagram |
| `/security-audit:run` | Run the scanners and the manual review on the current repo; fill the findings register |
| `/security-audit:fix` | Turn findings into a prioritised fix plan and apply the safe fixes, with tests |
| `/security-audit:verify` | Retest fixed findings and record the evidence |
| `/security-audit:report` | Write the executive summary and full audit report |

## Frameworks covered

OWASP ASVS 5.0, OWASP Top 10 (2021, with a note on 2025), OWASP API Security
Top 10 (2023), OWASP MASVS, OWASP Top 10 for LLM Applications, CWE Top 25,
NIST CSF 2.0, NIST SSDF (SP 800-218), CIS Controls v8, SLSA, STRIDE, and a
mapping to SOC 2 and ISO/IEC 27001:2022 Annex A. Each reference summarises the
framework in plain words and links the official source. Read the source for
the exact requirement text.

## Tooling

Free and open-source where possible: `npm audit`, `bun audit` / `bun pm scan`,
osv-scanner, Dependabot, gitleaks, trufflehog, Semgrep, CodeQL, Trivy,
Checkov, OWASP ZAP (baseline, own staging only), and Syft. The plugin does not
install anything. It tells you what to run and how to read the output.

## Rules the fix step follows

- Small, reviewed commits, each with a test that proves the fix.
- Tests are never weakened to make a fix pass.
- Secrets are never committed. A leaked secret is rotated first, then history
  is cleaned.
- Any change to production data or authentication flows waits for your
  explicit approval.

## Layout

```
.claude-plugin/plugin.json
commands/                        plan, threat-model, run, fix, verify, report
skills/security-audit/SKILL.md   the router
skills/security-audit/reference/ frameworks, process, severity, tooling, checklists
skills/security-audit/templates/ plan, inventory, threat model, register, report, CI
```

## Limits

A structured review by Claude is not a penetration test and not a certification.
It raises coverage and consistency; it does not replace an accredited auditor
where a contract or regulation requires one. Framework editions change, so
check the linked source before quoting a requirement ID in a contract.
