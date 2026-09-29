# F-<NNN>: <title that states the consequence>

| Field | Value |
|---|---|
| Severity | <Critical / High / Medium / Low / Info> |
| CVSS v4.0 | `CVSS:4.0/AV:_/AC:_/AT:_/PR:_/UI:_/VC:_/VI:_/VA:_/SC:_/SI:_/SA:_` (score <n.n>, CVSS-B) |
| Likelihood × impact | <High × High> |
| CWE | CWE-<id> <name> |
| Framework reference | <ASVS v5.0.0-x.y.z / API1:2023 / A01:2021> |
| Location | `<path>:<line>` (commit <sha>) |
| Found by | <manual review / tool name + rule> |
| Owner | <name> |
| Status | Open |
| Due | <date from SLA> |

## Summary

<Two sentences. What is wrong, and what an attacker or a mistaken user can
do as a result.>

## Details

<Where the flaw is and why it happens. Quote the relevant lines of code
(minimal). Explain the missing or incorrect control.>

## Evidence

<Minimal, safe reproduction against local or staging with test accounts
created for the audit. Request and response with secrets and personal data
redacted. Or: a failing test, a tool result, a config excerpt. No weaponised
payloads.>

## Impact

<Who is affected, what data or action, how many tenants or users, and any
regulatory angle (personal data breach, payment data).>

## Recommendation

<The fix, specific to this codebase. Preferred approach first; mention a
short-term mitigation if the real fix takes time.>

## Test that proves the fix

<The test to add: name, what it asserts. For example: "signs in as tenant A,
requests tenant B's invoice export, expects 404".>

## References

- <framework requirement URL>
- <CWE URL>
- <cheat sheet URL>
