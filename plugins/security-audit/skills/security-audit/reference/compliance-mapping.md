# SOC 2 and ISO/IEC 27001:2022: what auditors will ask for

Sources:
- SOC 2 (AICPA Trust Services Criteria): https://www.aicpa-cima.com/resources/landing/system-and-organization-controls-soc-suite-of-services
- ISO/IEC 27001:2022: https://www.iso.org/standard/27001

Neither is a technical standard. Both ask you to show that controls exist
**and operate over time**. A clean code audit helps, but auditors mostly want
evidence: tickets, logs, screenshots, policies, and dates. This file maps the
work this plugin produces to what they will ask for. Control names are
paraphrased; use the official text in any formal submission.

## SOC 2 in one paragraph

An independent CPA firm reports on your controls against the Trust Services
Criteria. **Security** (the Common Criteria, CC1–CC9) is always in scope;
Availability, Processing Integrity, Confidentiality, and Privacy are optional.
A **Type I** report covers design at a point in time. A **Type II** report
covers operating effectiveness over a period (commonly 3–12 months), so
evidence must be collected continuously, not the week before.

## ISO/IEC 27001:2022 in one paragraph

A certifiable standard for an information security management system (ISMS):
clauses 4–10 define the management system (scope, risk assessment, internal
audit, management review). Annex A lists 93 controls in four themes:
organisational (5.x), people (6.x), physical (7.x), technological (8.x). You
select controls in a Statement of Applicability and justify exclusions.

## Mapping

| Audit area | Auditor will ask for | SOC 2 (CC) | ISO 27001 Annex A | Produced by |
|---|---|---|---|---|
| Risk assessment | Risk register, threat model, dated review | CC3 | 5.7 threat intelligence, clause 6.1 | `/security-audit:threat-model` |
| Asset inventory | List of systems, data stores, owners | CC6.1 | 5.9 inventory of assets | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/asset-inventory.md` |
| Access control | SSO/MFA config, access reviews, joiner/leaver tickets | CC6.1–CC6.3 | 5.15–5.18, 8.2, 8.3, 8.5 | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-identity.md` |
| Secure development | SDLC policy, code review evidence, security testing | CC8.1 | 8.25, 8.26, 8.27, 8.28, 8.29 | `/security-audit:run`, `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/pr-checklist.md` |
| Change management | PRs with approvals, branch protection, deploy records | CC8.1 | 8.32 | CI config, branch rules |
| Separation of environments | Dev/staging/prod separation, no prod data in test | CC8.1 | 8.31, 8.33 | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-cloud-cicd.md` |
| Vulnerability management | Scan results, triage, fix within SLA | CC7.1 | 8.8 | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/findings-register.md`, `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/verification-record.md` |
| Configuration | Hardened baselines, IaC scans | CC7.1 | 8.9 | Trivy/Checkov output |
| Cryptography | Encryption at rest/in transit, key management | CC6.1, CC6.7 | 8.24 | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-platform.md` |
| Logging and monitoring | Log retention, alerting, reviewed alerts | CC7.2, CC7.3 | 8.15, 8.16 | same |
| Incident response | IR plan, tabletop exercise record, post-incident reviews | CC7.3–CC7.5 | 5.24–5.28 | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/incident-response.md` |
| Vendor management | Vendor list, security reviews, contracts | CC9.2 | 5.19–5.23 (5.23 cloud services) | asset inventory, third-party section |
| Backup and recovery | Backup config, restore test record | A1.2, A1.3 (Availability) | 8.13, 5.30 | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/nist-csf.md` (Recover) |
| Data retention and deletion | Retention policy, deletion evidence | C1.2, P4 | 8.10, 8.11, 8.12 | data protection review |

## Readiness advice to give the user

- Start collecting evidence now; a Type II period cannot be backdated.
- One evidence folder per control, named by control ID, with dated artefacts.
- An audit report from this plugin is useful evidence for CC7.1 / 8.8 and
  CC8.1 / 8.29, provided the findings show dates, owners, and closure.
- A compliance platform can automate evidence collection; it does not replace
  the controls themselves.
