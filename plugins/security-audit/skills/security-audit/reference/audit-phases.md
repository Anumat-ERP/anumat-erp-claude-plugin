# Audit phases

Ten phases. Small audits compress them; none is skipped silently. If a phase
is left out, the report says so and why.

## 1. Scope and rules of engagement

Decide what is being audited and what is allowed.

- **In scope:** repositories, services, environments, APIs, third-party
  integrations the team controls.
- **Out of scope:** named explicitly. Third-party SaaS you do not own is out
  of scope for active testing; review only your configuration of it.
- **Permission:** who authorised the audit, in writing. For anything beyond
  static code review, the system owner signs off.
- **Rules of engagement:** which environments may be scanned (local and
  staging by default), time windows, rate limits for scanners, who to call if
  something breaks, and that production data is not exported.
- **Framework and level:** from
  `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/choosing-framework.md`.

Template: `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/audit-plan.md`.

## 2. Asset inventory

List what exists before judging it: apps, APIs, data stores, queues, storage
buckets, secrets stores, CI/CD, domains, third-party services, and the data
classes each holds. You cannot secure what you have not listed.

Template: `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/asset-inventory.md`.

## 3. Threat model

Data-flow diagram, trust boundaries, STRIDE per element. This finds design
flaws that tools never will and tells the manual review where to look hardest.

Method: `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/stride.md`.

## 4. Automated scanning

Dependencies, secrets, SAST, containers and IaC, SBOM, headers. Tools are
cheap and fast; run them first so the manual review is not spent on what a
tool finds. Triage every result: true positive, false positive (with reason),
or accepted risk. Raw tool output is not a finding.

Tools: `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/tooling.md`.

## 5. Manual review

Walk the checklists for each area in scope, guided by the threat model.
Authorisation and business logic get the most time: tools are weakest there
and the impact is highest.

## 6. Findings

Record each confirmed issue in the register with severity, CVSS vector,
location, evidence, recommendation, owner, status, and due date.

Templates: `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/findings-register.md`
and `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/finding.md`.
Severity: `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/severity.md`.

## 7. Fix

Prioritised plan, then small reviewed commits with a test per fix. Rules in
`/security-audit:fix`.

Template: `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/remediation-plan.md`.

## 8. Verify

Retest each fixed finding with the same method that found it, plus the
regression test. Record the result, date, and commit.

Template: `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/verification-record.md`.

## 9. Report

Executive summary for leadership, full report for engineers and auditors.
Coverage, including what was not reviewed, is part of the report.

## 10. Retest cadence

Security decays. Set the next dates before closing the audit.

| Activity | Cadence |
|---|---|
| Dependency, secret, SAST scans | Every PR and nightly on the default branch |
| Container and IaC scans | Every build that changes them |
| Review of open findings | Weekly until closed; SLA breaches escalated |
| Threat model refresh | On every significant architecture change, and at least yearly |
| Full audit against the chosen level | Yearly, or before a major launch or certification |
| External penetration test | Yearly for L2+ or when customers require it |
| Incident response tabletop | At least yearly |
