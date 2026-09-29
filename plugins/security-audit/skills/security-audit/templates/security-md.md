# SECURITY.md template

Copy the block below to `SECURITY.md` at the repo root (or `.github/`).
Replace the placeholders. On GitHub, also turn on private vulnerability
reporting so reporters have a private channel.

```markdown
# Security policy

## Supported versions

| Version | Supported |
|---|---|
| <latest major> | Yes |
| < <latest major> | No |

## Reporting a vulnerability

Please do not open a public issue for security problems.

Report privately by one of:
- GitHub private vulnerability reporting: the "Report a vulnerability"
  button on this repository's Security tab
- Email: <security@example.com> (PGP key: <link or fingerprint, optional>)

Include what you found, where, the steps to reproduce, and the impact you
expect. A minimal proof of concept helps; please do not include exploit code
beyond what is needed to show the issue.

## What to expect

- Acknowledgement within <2 business days>.
- An initial assessment within <5 business days>.
- Updates at least every <14 days> until resolved.
- Credit in the release notes if you want it.

We aim to fix critical issues within <7 days> and others according to
severity. We will agree a disclosure date with you; our default is
<90 days> from the report, or sooner once a fix is released.

## Safe harbour

We will not pursue legal action for good-faith research that:
- stays within the scope below,
- avoids privacy violations, data destruction, and service disruption,
- uses only accounts you own or have permission to use,
- stops and reports as soon as you find a vulnerability or reach data that
  is not yours, and
- gives us reasonable time to fix before disclosure.

## Scope

In scope: <domains, apps, repos>.
Out of scope: <third-party services, denial of service, social engineering,
physical attacks, automated scanner output without a demonstrated issue>.
```
