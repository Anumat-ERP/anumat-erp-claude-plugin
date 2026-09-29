# NIST Cybersecurity Framework (CSF) 2.0

Official source: https://www.nist.gov/cyberframework

CSF 2.0 (February 2024) describes security outcomes for a whole organisation,
not a codebase. Use it when the audit question is "how mature is our security
programme?" rather than "is this app secure?". It is voluntary and
sector-neutral, and it is a common way to present results to a board.

## The six functions

| Function | Question | What a small software team shows as evidence |
|---|---|---|
| Govern (GV) | Who owns security risk, and what is the policy? New in 2.0 | Named owner, written policy, risk register, supplier list |
| Identify (ID) | What do we have and what could go wrong? | Asset inventory, data classification, threat model, dependency list |
| Protect (PR) | What stops it going wrong? | SSO and MFA, least privilege, encryption, secure SDLC, backups, hardening |
| Detect (DE) | How would we notice? | Centralised logs, alerts on auth anomalies, dependency and secret scanning |
| Respond (RS) | What do we do when it happens? | Incident response plan, on-call, disclosure policy, communication templates |
| Recover (RC) | How do we get back? | Tested restores, post-incident review, recovery time targets |

Govern sits across the other five. A team with good tooling and no owner has a
Govern gap, and auditors will find it.

## Tiers and profiles

- **Tiers** (1 Partial, 2 Risk Informed, 3 Repeatable, 4 Adaptive) describe how
  rigorous the organisation's practices are. Most startups are honestly Tier 1
  or 2. Say so; it is a starting point, not a failure.
- A **Current Profile** records where you are; a **Target Profile** records
  where you intend to be. The gap between them is the roadmap.

## Mapping from this plugin

| Plugin artefact | CSF function |
|---|---|
| `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/asset-inventory.md` | Identify |
| `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/threat-model.md` | Identify |
| Scanning and CI workflow (`${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/ci-workflow.md`) | Protect, Detect |
| `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/incident-response.md` | Respond, Recover |
| `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/security-md.md` | Respond |
