---
description: Scope a security audit, write the rules of engagement, inventory assets, and choose the framework and level.
argument-hint: [system, repo, or feature to audit — defaults to the current repo]
---

Plan a security audit of: **$ARGUMENTS** (or, if no argument was given, the
current repository).

This command does **not** test anything and does not change code. Its output
is a written plan the user approves before `/security-audit:run`.

Read these now; do not work from memory of them:
- `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/SKILL.md` (scope and ethics)
- `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/audit-phases.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/choosing-framework.md`

## Steps

1. **Confirm authorisation.** Ask who owns the system and who approved the
   audit. If the user does not own it or cannot show permission, stop: this
   plugin reviews only the user's own systems. Static review of the code in
   the current repo is always allowed.
2. **Explore the repo** before asking questions. Find apps, APIs, data
   stores, auth provider, deploy targets, CI, third-party services. Read
   `package.json`, lockfiles, IaC, `.github/workflows`, env examples, and
   routing.
3. **Inventory.** Fill
   `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/asset-inventory.md`
   from what you found. Mark each guess as a guess.
4. **Choose framework and level** per asset, with one sentence of reason
   each. Name any customer or compliance requirement the user mentions
   first; it overrides the default table.
5. **Rules of engagement.** Default: static review and scans on in-scope
   repos; dynamic testing only against the user's own local or staging
   environment, passive unless they approve more; no production testing;
   test accounts created for the audit; no real customer data used; stop
   and report if a live critical issue appears.
6. **Write the plan** with
   `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/audit-plan.md`.

Ask the user only what you cannot determine from the repo, one question at a
time: usually the data classes held, the customers' requirements, and which
environments may be scanned.

## Output

The completed plan and inventory, saved where the user chooses (suggest
`docs/security/<audit-id>/`). End by listing what needs their sign-off and
suggest `/security-audit:threat-model` next.
