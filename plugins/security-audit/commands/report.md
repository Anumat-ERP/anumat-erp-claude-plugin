---
description: Write the security audit report and executive summary from the plan, findings, and verification record.
argument-hint: [audience: exec | full | both — defaults to both]
---

Write the audit report for: **$ARGUMENTS** (default: both the executive
summary and the full report).

Inputs: the audit plan, asset inventory, threat model, findings register,
remediation plan, and verification record. If any is missing, say which and
state the gap in the report's limitations rather than inventing content.

Templates:
- `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/executive-summary.md`
- `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/audit-report.md`

If the user needs compliance framing, add the mapping section using
`${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/compliance-mapping.md`.
Set the retest cadence using
`${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/audit-phases.md`.

## Rules

- **Executive summary first, in business terms.** "A signed-in customer
  could read another customer's invoices" rather than "IDOR in export
  handler". One page.
- **Claims match evidence.** Say "meets ASVS 5.0 Level 2" only if every
  in-scope L2 requirement was checked and passed or has an accepted
  exception. Otherwise say what was verified.
- **Counts add up.** Found = fixed and verified + open + accepted + false
  positive.
- **Coverage is explicit**, including areas not reviewed and why.
- **Include positives.** Controls done well, with locations.
- **No secrets, no personal data, no exploit detail** beyond what a
  developer needs to understand the fix. Mark the report confidential.
- **State the limits**: point-in-time, structured review, not a penetration
  test or certification.

## Output

The report files, saved where the user chooses (suggest alongside the plan),
and a short chat summary: overall state, open Critical/High count, next
retest date. Offer `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/security-md.md`,
`${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/incident-response.md`,
`${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/pr-checklist.md`, or
`${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/ci-workflow.md` if the
audit found those missing.
