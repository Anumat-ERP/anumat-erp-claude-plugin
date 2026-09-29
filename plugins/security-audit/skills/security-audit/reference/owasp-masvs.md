# OWASP MASVS (mobile)

Official source: https://mas.owasp.org/MASVS/
Testing guide (MASTG): https://mas.owasp.org/MASTG/

The Mobile Application Security Verification Standard is ASVS's counterpart
for iOS and Android apps. MASVS v2 is organised into control groups. Detailed
test cases live in the Mobile Application Security Testing Guide (MASTG) and
the weakness list (MASWE). Testing profiles (L1, L2, and R for resilience)
now sit with the tests rather than in MASVS itself.

## Control groups, in plain words

| Group | Question it answers |
|---|---|
| STORAGE | Is sensitive data kept out of logs, backups, shared storage, and the clipboard, and stored in the platform keystore where needed? |
| CRYPTO | Are strong, current algorithms used correctly, with keys in hardware-backed storage? |
| AUTH | Is authentication enforced by the backend, not only the app? Is biometric use bound to a key, not a boolean? |
| NETWORK | Is all traffic TLS, with platform defaults not weakened; is pinning used where the risk justifies it? |
| PLATFORM | Are IPC, deep links, WebViews, and permissions used safely? |
| CODE | Are dependencies current, inputs validated, and debug features stripped from release builds? |
| RESILIENCE | For high-risk apps: does the app resist tampering and reverse engineering? Only applies when the threat model says it does |
| PRIVACY | Is data collection minimised, disclosed, and under the user's control? |

## Profiles

| Profile | Use for |
|---|---|
| L1 | Any app. Baseline |
| L2 | Apps handling sensitive data: finance, health, enterprise |
| R | Apps where client-side tampering causes real loss: anti-fraud, DRM, games with economies. Add to L1 or L2, never alone |

## Scope note

The server side of a mobile app is an API. Review it with
`${CLAUDE_PLUGIN_ROOT}/skills/security-audit/reference/owasp-api-top10.md`.
Most serious mobile findings are backend authorisation failures, not
on-device issues. Resilience testing on this plugin's terms means reviewing
your own build configuration, not attacking app stores or other people's apps.
