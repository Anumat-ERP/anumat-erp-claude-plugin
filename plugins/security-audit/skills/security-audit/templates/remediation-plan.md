# Remediation plan: <audit ID>

Date: <YYYY-MM-DD> · Owner: <name>
Source: findings register (`${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/findings-register.md`)

## Order of work

Critical first, then High, then by cost: a cheap Medium fix can go before an
expensive High one if it does not delay the High past its SLA.

| Order | Finding | Severity | Fix summary | Type | Needs approval | Test that proves it | Owner | Target date | PR |
|---|---|---|---|---|---|---|---|---|---|
| 1 | F-001 | Critical | Scope export query by session tenant | Code | No | `export.cross-tenant.test.ts` | | | |
| 2 | F-005 | Critical | Rotate leaked API key, then purge from history | Secret | **Yes**: rotation touches prod | gitleaks clean on full history | | | |
| 3 | F-002 | High | Verify webhook HMAC + timestamp | Code | No | `webhook.signature.test.ts` | | | |
| 4 | F-007 | High | Force re-auth on email change | Auth flow | **Yes**: auth flow | `email-change.reauth.test.ts` | | | |

Type: Code · Config · Dependency · Secret · Infrastructure · Process.

"Needs approval" is **Yes** for anything touching production data,
authentication or session flows, secret rotation, or infrastructure shared
with production.

## Safe to apply now

<Findings whose fix is local, covered by tests, and does not touch production
data or auth flows. These can be done in this session.>

## Needs approval before changing

<Each with: what changes, who is affected (users logged out? data
migrated?), rollback plan, and the approver.>

## Mitigations while waiting

| Finding | Temporary mitigation | Removed when |
|---|---|---|
| | <feature flag off / WAF rule / revoke token> | <fix verified> |

## Accepted risks

| Finding | Reason | Accepted by | Expires |
|---|---|---|---|
| | | | |

## Rules

- One finding per commit where practical; each commit includes the test.
- No test weakened, skipped, or deleted to make a fix pass.
- No secret committed. Leaked secrets: rotate first, then clean history.
