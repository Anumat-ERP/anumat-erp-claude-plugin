---
description: Produce the go-live / production-readiness checklist for the current or target stage, checked against the repo with evidence per item.
argument-hint: [target stage 0-4 — defaults to the stage the repo is at]
---

Run the production-readiness checklist. Target stage: **$ARGUMENTS**
(if none given, place the product first with
${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/stage-scorecard.md).

Read now:
- ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/go-live-checklist.md
- ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/security-baseline.md
- ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/environments-cicd.md
- ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/reference/reliability.md

## Steps

1. Use every section of the checklist **up to and including** the target
   stage.
2. For each item, check the repo and mark it:
   - ✅ with the evidence (file and line, workflow name, config key)
   - ❌ with what is missing and the smallest fix
   - ❓ when it cannot be checked from the repo (2FA, provider settings,
     restore drills). List these as questions for the team.
3. **Blocking items first**: anything that risks data loss (no own backup, no
   restore tested), silent outages (no error tracking or alerts), or a
   leaked secret.
4. For backup items, point to ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/restore-drill-record.md; for SLO and
   incident items, to ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/slo.md and ${CLAUDE_PLUGIN_ROOT}/skills/startup-infra/templates/incident-one-pager.md.

## Output

```
BLOCKING  <item> — <evidence or what is missing>  (<reference file>)
          <consequence for users or the business>

MISSING   <item> — <smallest fix>
UNKNOWN   <item> — <question for the team>
DONE      <item> — <evidence>
```

End with the count per status and a go / no-go recommendation. Security items
stay at baseline; for a full review, point to the security-audit plugin.
