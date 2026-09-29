# SLSA (Supply-chain Levels for Software Artifacts)

Official source: https://slsa.dev/

SLSA (pronounced "salsa") answers: can a consumer verify that this artefact
was built from this source by this build process, without tampering? It
matters because attacks increasingly target the build, not the code: a
compromised CI action, a stolen publish token, a poisoned dependency.

The specification is organised in tracks. The Build track is the mature one;
check the site for the current version and any newer tracks (such as source).

## Build track levels

| Level | Requirement | What it takes on GitHub |
|---|---|---|
| L0 | Nothing | No provenance |
| L1 | Provenance exists: a record of how the artefact was built | Generate provenance in CI |
| L2 | Provenance is signed by a hosted build platform | Hosted runners plus a signed attestation (for example GitHub artifact attestations) |
| L3 | The build platform is hardened: builds are isolated and signing keys are out of reach of the build steps | Isolated reusable workflows for provenance; no secrets exposed to untrusted steps |

## Checks for a repo audit

- Third-party GitHub Actions are pinned to a full commit SHA, not a tag. Tags
  can be moved; the 2025 compromise of a widely used action showed this in
  practice.
- The workflow `permissions:` block defaults to `contents: read`; write scopes
  are granted per job.
- Release and publish jobs run only from protected branches or tags.
- Package publishing uses short-lived OIDC credentials (trusted publishing)
  rather than long-lived tokens where the registry supports it.
- Lockfiles are committed and CI installs with a frozen lockfile.
- An SBOM is generated per release (see
  `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/tooling.md`).

Related process practices: `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/nist-ssdf.md`.
CI hardening detail: `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-cloud-cicd.md`.
