# Tooling by layer

Free or open-source tools, grouped by what they inspect. Run them before the
manual review. None of these tools is installed by this plugin; check each is
available and ask before installing anything.

Every result is triaged: true positive (goes to the register), false
positive (note the reason), or accepted (owner and expiry). Pasting raw output
into a report is not an audit.

## Dependencies

| Tool | Command | Notes |
|---|---|---|
| npm audit | `npm audit --omit=dev` | Uses the npm advisory database. `--omit=dev` for what ships; still review dev deps that run in CI |
| Bun | `bun audit` / `bun pm scan` | `bun audit` checks against the npm advisory database. `bun pm scan` runs the security scanner configured in `bunfig.toml`; it needs one configured. Check `bun --help` for your version |
| osv-scanner | `osv-scanner scan source -r .` | Google's scanner over OSV.dev; reads most lockfiles across ecosystems. Source: https://google.github.io/osv-scanner/ |
| Dependabot | `.github/dependabot.yml` | Alerts and update PRs on GitHub. Turn on security updates; group minor updates to keep PR volume sane |

A vulnerable package is a finding only if the vulnerable code is reachable or
the package ships. Say which.

## Secrets

| Tool | Command | Notes |
|---|---|---|
| gitleaks | `gitleaks git -v .` (history) / `gitleaks dir .` (working tree) | Older versions use `gitleaks detect`. Source: https://github.com/gitleaks/gitleaks |
| trufflehog | `trufflehog git file://. --only-verified` | `--only-verified` checks whether a found credential is live, using the provider's API. Only run verification against your own credentials. Source: https://github.com/trufflesecurity/trufflehog |

Scan **full git history**, not just the working tree. A secret deleted in a
later commit is still leaked. Never print a found secret in full; record the
file, commit, and type.

## SAST (static analysis)

| Tool | Command | Notes |
|---|---|---|
| Semgrep | `semgrep scan --config p/default` (also `p/owasp-top-ten`, `p/secrets`) | Fast, readable rules; good for custom rules on house patterns. Source: https://semgrep.dev/docs/ |
| CodeQL | `codeql database create db --language=javascript-typescript` then `codeql database analyze db codeql/javascript-queries --format=sarif-latest --output=codeql.sarif` | Deeper data-flow analysis; free for public repos and on GitHub Advanced Security. Source: https://codeql.github.com/ |

## Containers and infrastructure as code

| Tool | Command | Notes |
|---|---|---|
| Trivy | `trivy fs .` · `trivy image <image>` · `trivy config .` | Vulnerabilities, misconfig, secrets, licences. Source: https://trivy.dev/ |
| Checkov | `checkov -d .` | Terraform, CloudFormation, Kubernetes, Dockerfile, GitHub Actions policies. Source: https://www.checkov.io/ |

## DAST (dynamic): your own staging only

| Tool | Command | Notes |
|---|---|---|
| OWASP ZAP baseline | `docker run --rm -t ghcr.io/zaproxy/zaproxy:stable zap-baseline.py -t https://staging.example.com` | Passive scan: spiders and reports without attacking. Source: https://www.zaproxy.org/docs/docker/baseline-scan/ |

Only against a target the user owns, in an environment the rules of
engagement allow. Never against production without written sign-off, never
against a host you do not control. The baseline scan is passive; do not run
active scans unless the plan explicitly allows them for that environment.

## SBOM

| Tool | Command | Notes |
|---|---|---|
| Syft | `syft dir:. -o cyclonedx-json > sbom.cdx.json` (or `syft <image>`) | Software bill of materials in CycloneDX or SPDX. Source: https://github.com/anchore/syft |

Keep one SBOM per release. It answers "are we affected?" in minutes when the
next widely exploited dependency CVE lands.

## HTTP security headers

| Check | How |
|---|---|
| Header check | `curl -sI https://staging.example.com` and compare with the list below; or an online header checker such as securityheaders.com for your own public domain |
| Mozilla HTTP Observatory | https://developer.mozilla.org/en-US/observatory for your own public domain |

Look for: `Strict-Transport-Security`, `Content-Security-Policy`,
`X-Content-Type-Options: nosniff`, `Referrer-Policy`, `Permissions-Policy`,
framing control (`frame-ancestors` in CSP or `X-Frame-Options`), and cookies
with `Secure`, `HttpOnly`, and `SameSite`.

## In CI

A ready workflow running gitleaks, osv-scanner, Semgrep, and Trivy:
`${CLAUDE_PLUGIN_ROOT}/skills/security-audit/templates/ci-workflow.md`.
