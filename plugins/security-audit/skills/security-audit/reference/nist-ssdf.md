# NIST Secure Software Development Framework (SSDF), SP 800-218

Official source: https://csrc.nist.gov/pubs/sp/800/218/final

The SSDF lists practices for building software securely. It is about the
**process**, not a single release. US federal buyers ask software suppliers to
attest to it, and it is a clean way to structure findings about how a team
works (no code review rule, no dependency scanning, no disclosure policy).
Version 1.1 is final; NIST has worked on a revision, so check the source for
the current version.

## The four practice groups

| Group | Intent | Typical evidence in a repo |
|---|---|---|
| PO: Prepare the Organization | Roles, requirements, toolchains and secure environments are defined | SECURITY.md, CODEOWNERS, documented security requirements, hardened CI |
| PS: Protect the Software | Code and releases cannot be tampered with, and releases can be verified | Branch protection, signed commits or tags, provenance, SBOM, restricted write access |
| PW: Produce Well-Secured Software | Design, code, review, and test with security in mind | Threat models, secure defaults, code review, SAST, dependency scanning, security tests |
| RV: Respond to Vulnerabilities | Find, fix, and learn from vulnerabilities after release | Disclosure policy, triage SLA, root-cause notes, regression tests for each fix |

## Using it

- In a process audit, walk the four groups and record each practice as
  in place, partial, or missing, with the evidence.
- SSDF pairs with SLSA for PS: `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/slsa.md`.
- The RV group is what `/security-audit:fix` and `/security-audit:verify`
  put into practice: every fix has a test, and every retest is recorded.
