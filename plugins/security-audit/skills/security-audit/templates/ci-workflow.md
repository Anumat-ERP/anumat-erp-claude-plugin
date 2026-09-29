# CI security scanning workflow (GitHub Actions)

Save the YAML below as `.github/workflows/security.yml`. It runs four scans on
every pull request, on pushes to the default branch, and nightly:

| Job | Tool | Catches |
|---|---|---|
| secrets | gitleaks | Credentials in the full git history |
| dependencies | osv-scanner | Known-vulnerable packages from lockfiles |
| sast | Semgrep | Injection, XSS, unsafe APIs, common bugs |
| trivy | Trivy | Vulnerabilities, IaC and Dockerfile misconfiguration |

Tools run from their official container images rather than third-party
actions. That keeps the only third-party action `actions/checkout`, and avoids
licence requirements some wrapper actions add for organisations.

## Before you commit it

1. **Pin everything.** Replace each `<sha>` with the full 40-character commit
   SHA of the release named in the comment, and each image tag with a
   specific version, ideally with its `@sha256:` digest. A tool such as
   `pinact` or `ratchet` can do this. Tags can be moved; SHAs and digests
   cannot.
2. Let Dependabot keep the pins current: add the `github-actions` and
   `docker` ecosystems to `.github/dependabot.yml`.
3. Start with the gates as written (fail on findings), then tune rules for
   false positives in config files, never by removing the job.

```yaml
name: security

on:
  pull_request:
  push:
    branches: [main]
  schedule:
    - cron: "17 3 * * *"   # nightly, catches new advisories on unchanged code
  workflow_dispatch:

# Least privilege by default. No job here needs to write.
permissions:
  contents: read

concurrency:
  group: security-${{ github.ref }}
  cancel-in-progress: true

jobs:
  secrets:
    name: Secret scan (gitleaks)
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@<sha> # vX.Y.Z
        with:
          fetch-depth: 0            # full history: a deleted secret is still leaked
          persist-credentials: false
      - name: gitleaks
        run: |
          docker run --rm -v "$PWD:/repo" \
            ghcr.io/gitleaks/gitleaks:<version> \
            git /repo --redact --verbose --exit-code 1

  dependencies:
    name: Dependency scan (osv-scanner)
    runs-on: ubuntu-latest
    timeout-minutes: 10
    steps:
      - uses: actions/checkout@<sha> # vX.Y.Z
        with:
          persist-credentials: false
      - name: osv-scanner
        run: |
          docker run --rm -v "$PWD:/src" \
            ghcr.io/google/osv-scanner:<version> \
            scan source --recursive /src

  sast:
    name: Static analysis (Semgrep)
    runs-on: ubuntu-latest
    timeout-minutes: 20
    steps:
      - uses: actions/checkout@<sha> # vX.Y.Z
        with:
          persist-credentials: false
      - name: semgrep
        run: |
          docker run --rm -v "$PWD:/src" -w /src \
            semgrep/semgrep:<version> \
            semgrep scan --config p/default --config p/owasp-top-ten \
              --error --metrics=off

  trivy:
    name: Vulnerability and IaC scan (Trivy)
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@<sha> # vX.Y.Z
        with:
          persist-credentials: false
      - name: trivy filesystem and config
        run: |
          docker run --rm -v "$PWD:/src" \
            ghcr.io/aquasecurity/trivy:<version> \
            fs --scanners vuln,misconfig \
              --severity HIGH,CRITICAL --ignore-unfixed \
              --exit-code 1 /src
```

## Notes

- **Untrusted PRs.** This workflow uses `pull_request`, not
  `pull_request_target`, so forked PRs run without secrets. Keep it that way.
- **Container images.** Add a job that builds your image and runs
  `trivy image` on it, after the build step.
- **Results in the Security tab.** To upload SARIF, output SARIF from the
  tool, add `security-events: write` to **that job only**, and upload with
  `github/codeql-action/upload-sarif` pinned to a SHA.
- **Ignoring a result.** Use the tool's ignore file (`.gitleaksignore`,
  `osv-scanner.toml`, `.semgrepignore` or `nosemgrep` with a reason,
  `.trivyignore`) with a comment naming the finding ID and expiry. An
  unexplained ignore is a finding.
- **Bun projects.** Add a step running `bun audit` (or `bun pm scan` with a
  configured scanner) after `bun install --frozen-lockfile`.

Tool background: `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/tooling.md`.
CI hardening checklist: `${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/checklist-cloud-cicd.md`.
