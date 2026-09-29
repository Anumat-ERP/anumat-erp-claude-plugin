# OWASP Top 10

Official source: https://owasp.org/Top10/

The Top 10 is an **awareness** document: ten broad categories of web risk,
ranked from incident and testing data. It is good for framing a report and
for training. It is not a testable standard. For requirement-level checks,
use ASVS: `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/owasp-asvs.md`.

## 2021 edition

| ID | Category | What it means in code | Where to check |
|---|---|---|---|
| A01 | Broken Access Control | A user can act on data or functions they should not reach: IDOR, missing role checks, forced browsing | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-identity.md` |
| A02 | Cryptographic Failures | Sensitive data unencrypted, weak algorithms, poor key handling | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-platform.md` |
| A03 | Injection | Untrusted input reaches an interpreter: SQL, OS command, LDAP, template; XSS sits here in 2021 | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-input.md` |
| A04 | Insecure Design | The flaw is in the design, not the code: missing rate limits on a business flow, no tenant model | threat model (`/security-audit:threat-model`) |
| A05 | Security Misconfiguration | Default settings, verbose errors, open storage, missing headers | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-cloud-cicd.md` |
| A06 | Vulnerable and Outdated Components | Dependencies with known CVEs, unmaintained packages | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/tooling.md` |
| A07 | Identification and Authentication Failures | Weak login, recovery, session fixation, credential stuffing | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-identity.md` |
| A08 | Software and Data Integrity Failures | Unsigned updates, untrusted deserialisation, unpinned CI dependencies | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/slsa.md` |
| A09 | Security Logging and Monitoring Failures | Attacks are not recorded or not noticed | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-platform.md` |
| A10 | Server-Side Request Forgery | The server fetches a URL the user controls | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-input.md` |

## The 2025 edition

A 2025 edition of the Top 10 exists. Headline changes reported by OWASP
include software supply chain failures getting its own category, SSRF folding
into broken access control, and a new category for mishandling exceptional
conditions (error paths that fail open). Check the official page for the final
list and ordering before citing a 2025 ID.

Which one to cite: use the edition your customer or auditor asks for. If none
is specified, cite the newest edition and include the 2021 ID in brackets so
older questionnaires still map.

## Using it in an audit

- Tag each finding with its Top 10 category. It helps a non-specialist
  reader of the executive summary.
- Never report "the app passes the OWASP Top 10". The Top 10 is not a
  pass/fail standard. Say which ASVS level was verified instead.
