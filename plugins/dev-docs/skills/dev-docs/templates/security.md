<!--
Template: SECURITY.md (security policy)
Basis: coordinated vulnerability disclosure practice, as described in
ISO/IEC 29147 (vulnerability disclosure) and the CERT/CC guide to
coordinated vulnerability disclosure; GitHub's security policy file
convention. Not a reproduction of either standard.
Use when: any repository that others use, deploy, or depend on.
Lives at: SECURITY.md in the root, or .github/SECURITY.md
Before publishing: confirm the reporting channel actually reaches someone.
Consider enabling GitHub private vulnerability reporting, and publishing a
security.txt (RFC 9116) on your website.
Remove this comment in the finished document.
-->

# Security policy

## Supported versions

Security fixes are released for these versions:

| Version | Supported |
|---|---|
| <2.x> | Yes |
| <1.x> | <Until YYYY-MM-DD> |
| <below 1.0> | No |

## Reporting a vulnerability

**Do not report security vulnerabilities through public issues, pull
requests, or discussions.**

Report privately by one of these:

- <GitHub private vulnerability reporting: the "Report a vulnerability"
  button on the Security tab of this repository.>
- <Email: security@example.com. PGP key: link, fingerprint.>

Please include:

- The affected component and version or commit.
- A description of the issue and its impact.
- Steps to reproduce, or a proof of concept.
- Any known mitigations.
- How you would like to be credited, if at all.

## What to expect

| Step | Target time |
|---|---|
| Acknowledgement of your report | <within 3 working days> |
| Initial assessment and severity | <within 10 working days> |
| Status updates | <at least every 14 days> |
| Fix released for critical issues | <within 30 days, where possible> |

We will:

1. Confirm the issue and assess its severity (we use <CVSS v4.0>).
2. Work on a fix and agree a disclosure date with you. Our default
   embargo is <90 days> from the report, shorter if a fix ships sooner.
3. Release the fix and publish an advisory, requesting a CVE where
   appropriate.
4. Credit you in the advisory, unless you prefer not to be named.

If we cannot reproduce the issue or decide it is not a vulnerability, we
will explain why.

## Safe harbour

We will not pursue legal action against people who, in good faith:

- Report to us privately and give us reasonable time to fix before any
  disclosure.
- Avoid privacy violations, data destruction, and service disruption.
- Only interact with accounts they own or have permission to test.
- Do not exploit the issue beyond what is needed to demonstrate it.

<Have your legal team review this section before publishing.>

## Scope

In scope: <this repository and its released packages; the hosted service at
example.com>.

Out of scope: <third-party dependencies (report upstream); social
engineering; denial of service by volume; findings from automated scanners
without a demonstrated impact>.

## Security updates

Advisories are published at <GitHub Security Advisories for this repo /
URL>. Subscribe by <watching the repository for security alerts / mailing
list>.
