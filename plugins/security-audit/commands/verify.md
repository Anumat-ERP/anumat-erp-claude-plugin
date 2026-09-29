---
description: Retest fixed security findings, confirm each regression test, and record the evidence.
argument-hint: [finding IDs, or blank for every finding marked Fixed]
---

Verify: **$ARGUMENTS** (or every finding with status "Fixed (awaiting
verify)").

Fill `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/verification-record.md`.

## For each finding

1. **Re-run the original reproduction** with the same method that found it:
   the same request against local or staging with test accounts, the same
   tool and rule, or the same code trace. Record what you observed, not
   "fixed".
2. **Confirm the regression test** exists, fails on the pre-fix commit (check
   out the parent commit or reason from the diff), and passes now.
3. **Check side effects**: the legitimate path still works (the owner can
   still read their own record; valid webhooks are still accepted).
4. **Variant check**: search for the same pattern elsewhere in the codebase.
5. **Check the fix commits** did not weaken, skip, or delete any test. If
   one did, the finding is not verified.
6. Set status to **Verified**, or back to **Open** with a note on what still
   reproduces.

For leaked secrets: confirm the old credential is revoked at the provider
(the user confirms this), the new one is deployed everywhere it is needed,
and a full-history secret scan is clean.

Re-run the automated scans from `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/tooling.md`
and note anything new.

## Output

The verification record, the updated register statuses, and the list of
findings still open with due dates. Suggest `/security-audit:report` when
the Critical and High findings are verified or have an approved plan.
