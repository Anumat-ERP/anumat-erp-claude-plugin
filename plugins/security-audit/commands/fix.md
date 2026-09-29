---
description: Turn security findings into a prioritised fix plan and apply the safe fixes, each with a test that proves it.
argument-hint: [finding IDs, severity threshold (e.g. high), or blank for all open findings]
---

Fix: **$ARGUMENTS** (or all open findings in the register, highest severity
first).

Read the findings register, then fill
`${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/remediation-plan.md`
before changing any code. Show the plan to the user.

## Rules (not negotiable)

1. **Fix in small, reviewed commits, with a test that proves each fix.** One
   finding per commit where practical. Write the test first and watch it fail
   against the vulnerable code, then fix and watch it pass. The commit
   message names the finding ID. Leave commits for the user to review; do
   not push or merge unless asked.
2. **Never weaken tests.** Do not delete, skip, loosen assertions in, or
   mock around an existing test to make a fix pass. If a fix breaks a test,
   the test is telling you something: stop and explain.
3. **Never commit secrets.** Not in code, tests, fixtures, config, or commit
   messages. **If a secret leaked, rotate it first, then clean history.**
   Rotation at the provider is what stops the harm; rewriting history
   (`git filter-repo`, BFG) only removes the copy and needs every clone and
   fork dealt with. Rotation and history rewrites both need the user's
   approval and the user usually performs the rotation.
4. **Get the user's approval before any change that affects production data
   or auth flows.** That includes migrations on production data, login,
   sign-up, MFA, password reset, session and token handling, permission
   models, secret rotation, and infrastructure shared with production.
   Describe the change, who is affected, and the rollback plan; wait for an
   explicit yes.

## What counts as a safe fix to apply now

- Local code change, covered by a new test, no production data or auth flow
  change: for example adding a tenant scope to a query, output encoding,
  schema validation, a missing authorisation check on a non-auth route,
  constant-time comparison, a security header.
- Dependency bump within the same major that the test suite passes on.
- CI hardening: pinning actions to SHAs, narrowing `permissions:`.

Everything else goes under "Needs approval" in the plan.

## Procedure per finding

1. Re-read the finding and the relevant checklist section.
2. Write the proving test (for access control, the denied case: tenant A
   cannot read tenant B's record).
3. Apply the smallest fix that makes it pass. Prefer the project's existing
   helper or middleware over a new mechanism.
4. Search for the same pattern elsewhere; fix or record each instance.
5. Run the full test suite, lint, and type check.
6. Commit. Update the register status to "Fixed (awaiting verify)".

## Output

The remediation plan, the list of commits made (finding ID, files, test
added), the findings waiting for approval with what you need from the user,
and a prompt to run `/security-audit:verify`.
