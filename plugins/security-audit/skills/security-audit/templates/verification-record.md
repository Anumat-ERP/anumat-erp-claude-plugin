# Verification record: <audit ID>

Retest date: <YYYY-MM-DD> · Verified by: <name> · Environment: <local / staging URL>
Commit or release under test: <sha / tag>

A finding is **Verified** only when the original reproduction no longer
works **and** a regression test covering it passes in CI.

| Finding | Fix PR / commit | Original reproduction re-run | Result | Regression test | CI run | Side effects checked | Status |
|---|---|---|---|---|---|---|---|
| F-001 | #123 / abc1234 | Tenant A requests tenant B export | 404 returned | `export.cross-tenant.test.ts` passes | <link> | Tenant A export still works | Verified |
| F-002 | #124 | Unsigned webhook POST to staging | 401 returned | `webhook.signature.test.ts` | <link> | Valid signed webhook accepted | Verified |
| F-005 | — | gitleaks full-history scan | Clean; old key revoked at provider | CI secret scan | <link> | New key deployed to all envs | Verified |
| F-00x | | | Still reproducible | | | | Reopened |

Result wording: what was observed, not "fixed". If a reproduction still
works, the status goes back to Open with a note.

## Related checks

- [ ] Same pattern searched elsewhere in the codebase (variant analysis):
      <grep/Semgrep rule used, results>
- [ ] Automated scans re-run: <tools, date, new results>
- [ ] No test was weakened or skipped in the fix PRs.

## Still open

| Finding | Severity | Due | Blocker |
|---|---|---|---|
| | | | |
