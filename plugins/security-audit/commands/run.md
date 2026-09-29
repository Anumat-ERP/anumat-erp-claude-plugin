---
description: Run the security review on the current repo — scanners plus manual review against the chosen checklist — and fill the findings register.
argument-hint: [area or path to focus on, or --framework <asvs-l1|asvs-l2|api-top10|...>]
---

Run the security review for: **$ARGUMENTS** (or the whole current repository
against the plan's framework and level).

Read before starting:
- `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/SKILL.md` (scope, ethics, rules for findings)
- the audit plan if one exists; if not, pick a framework with
  `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/choosing-framework.md`
  and state the choice before you begin
- `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/tooling.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/severity.md`

## 1. Automated scans

Check which tools are installed. Run what is available; for anything missing,
say so and ask before installing. Typical set:

- dependencies: `npm audit` / `bun audit` / `osv-scanner scan source -r .`
- secrets over full history: `gitleaks git -v .`
- SAST: `semgrep scan --config p/default`
- IaC and filesystem: `trivy fs .`, `trivy config .`, or `checkov -d .`

Dynamic scanning (ZAP baseline) only if the plan allows it, and only against
the user's own local or staging URL. Never against production or a host the
user does not control.

Triage every result: true positive, false positive (reason), or accepted.
Never print a found secret; record location and type only.

## 2. Manual review

Walk each area in scope with its checklist. Read the checklist first:

- `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-identity.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-input.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-platform.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-cloud-cicd.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-llm.md` (if the app uses LLMs)

Spend the most time on authorisation and tenant isolation: list every route
that takes an ID and trace the ownership check. Use the threat model's gaps
as leads. Search for the same pattern across the codebase when you find one
instance.

Reproduce only with the smallest safe proof: a failing test, a local
request with test accounts you created, or a code trace. No exploit code.

## 3. Record

- Register: `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/findings-register.md`
- Write-up for each Critical and High: `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/finding.md`

Every finding has a location, evidence, consequence, CWE, framework
reference, CVSS v4.0 vector, severity, and a due date from the SLA table.

## Output

The register (ordered Critical first), the coverage table showing every area
as reviewed or not reviewed with a reason, and the triaged tool results. Do
not change code in this command; suggest `/security-audit:fix` next. If a
live Critical appears (for example a leaked production secret), tell the user
immediately rather than waiting for the end.
