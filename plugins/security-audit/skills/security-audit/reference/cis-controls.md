# CIS Critical Security Controls v8

Official source: https://www.cisecurity.org/controls/v8
(v8.1, released 2024, refined v8 without changing its structure.)

Eighteen prioritised controls for running an organisation's IT securely. Use
them when the audit covers infrastructure and operations, not just an app. The
Implementation Groups tell a small team what to do first.

## Implementation Groups

| Group | Who | Scope |
|---|---|---|
| IG1 | Small teams, limited security expertise | "Essential cyber hygiene": the safeguards every organisation should have |
| IG2 | Teams with dedicated IT and sensitive data | IG1 plus more depth |
| IG3 | Mature organisations facing capable attackers | All safeguards |

A startup should aim to meet IG1 fully before any IG2 work.

## The 18 controls, in plain words

| # | Control | For a cloud software team this means |
|---|---|---|
| 1 | Enterprise asset inventory | Know every laptop, server, and cloud account |
| 2 | Software asset inventory | Know what runs, including SaaS and dependencies (SBOM) |
| 3 | Data protection | Classify data, encrypt it, delete it when due |
| 4 | Secure configuration | Hardened baselines for hosts, containers, cloud services |
| 5 | Account management | Joiner/mover/leaver process; no shared accounts |
| 6 | Access control management | SSO, MFA everywhere, least privilege |
| 7 | Continuous vulnerability management | Scanning with an SLA to fix |
| 8 | Audit log management | Logs collected, retained, reviewed |
| 9 | Email and browser protections | Phishing defences, managed browsers |
| 10 | Malware defences | Endpoint protection on staff devices |
| 11 | Data recovery | Backups that have been restored in a test |
| 12 | Network infrastructure management | Managed, current network gear and cloud networking |
| 13 | Network monitoring and defence | Alerting on suspicious traffic |
| 14 | Security awareness training | Staff know phishing and how to report |
| 15 | Service provider management | Vendor list with security review |
| 16 | Application software security | Secure SDLC: this plugin's main territory |
| 17 | Incident response management | A plan, roles, and practice |
| 18 | Penetration testing | Periodic authorised testing by qualified testers |

Control 16 maps to the app review in `/security-audit:run`. Controls 7 and 8
map to `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/tooling.md` and
`${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-platform.md`.
Control 17 maps to `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/incident-response.md`.
