# Security audit: executive summary

**System:** <name> · **Audit ID:** <id> · **Period:** <start – end>
**Standard:** <OWASP ASVS 5.0 Level 2> · **Prepared by:** <name>

## Bottom line

<Three sentences for a non-technical reader. The overall state, the most
serious risk in business terms, and whether it is fixed.>

Example: "The application meets most Level 2 requirements. One critical
issue let a signed-in customer read another customer's invoices; it was
fixed and verified on <date>. Two high-severity issues remain, both due
before <date>."

## Findings at a glance

| Severity | Found | Fixed and verified | Open | Accepted |
|---|---|---|---|---|
| Critical | | | | |
| High | | | | |
| Medium | | | | |
| Low | | | | |

## Top risks

1. <Risk in business terms, status, date>
2. <…>
3. <…>

## What is working well

- <Specific strengths found: MFA enforced for staff, parameterised queries
  throughout, secrets scanning in CI.>

## Decisions needed

| Decision | Options | Recommended | By when |
|---|---|---|---|
| <accept risk on F-009?> | | | |

## Scope and limits

<What was covered, what was not, and that this is a structured review, not a
penetration test or certification.>

## Next steps

- Remaining fixes by <date>
- Retest on <date>
- Next full audit: <date>
