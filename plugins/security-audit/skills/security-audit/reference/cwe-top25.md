# CWE Top 25 Most Dangerous Software Weaknesses

Official source: https://cwe.mitre.org/top25/
CWE catalogue: https://cwe.mitre.org/

CWE (Common Weakness Enumeration) names **classes** of weakness. The Top 25 is
republished each year from CVE data. Use CWE IDs to label findings precisely:
"CWE-639" is more useful to a developer and a scanner than "access problem".

The ranking moves each year; check the current edition before quoting a rank.
The weaknesses below have appeared on recent lists and matter most for web
and API code. Memory-safety entries (out-of-bounds write/read, use after free,
NULL dereference, integer overflow) matter for C, C++, and unsafe Rust.

| CWE | Weakness | Checklist |
|---|---|---|
| CWE-79 | Cross-site scripting | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-input.md` |
| CWE-89 | SQL injection | same |
| CWE-78 / CWE-77 | OS command / command injection | same |
| CWE-94 | Code injection | same |
| CWE-22 | Path traversal | same |
| CWE-434 | Unrestricted file upload | same |
| CWE-352 | Cross-site request forgery | same |
| CWE-918 | Server-side request forgery | same |
| CWE-20 | Improper input validation | same |
| CWE-502 | Deserialisation of untrusted data | same |
| CWE-862 | Missing authorisation | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-identity.md` |
| CWE-863 | Incorrect authorisation | same |
| CWE-639 | Authorisation bypass through user-controlled key (IDOR; not always on the list, but the right label) | same |
| CWE-287 | Improper authentication | same |
| CWE-306 | Missing authentication for critical function | same |
| CWE-269 | Improper privilege management | same |
| CWE-200 | Exposure of sensitive information | `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-platform.md` |
| CWE-798 | Hard-coded credentials | same |
| CWE-400 | Uncontrolled resource consumption | same |

## How to use it

- Every finding in the register gets one primary CWE. Pick the most specific
  one that fits; avoid pillar-level IDs like CWE-20 when a child fits better.
- SAST tools (Semgrep, CodeQL) already tag results with CWE IDs. Keep them,
  but check the tag matches what the code actually does.
