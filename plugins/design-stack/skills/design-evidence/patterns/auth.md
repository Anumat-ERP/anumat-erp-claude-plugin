# Authentication

## What this screen is for

Getting a known user back in with minimum friction, and a new one in without
losing them. Auth is pure overhead to the user — nobody's goal is to sign in.
Every second here is a tax on the actual product.

## Canonical structure, per flow

**Sign in**
```
1. Identity field (email or username)
2. Password  — with a show/hide toggle
3. Primary action
4. Forgot password  — visible, not buried
5. SSO / social options  — separated by a divider
6. Link to sign up
```

**Sign up**
```
1. Email
2. Password, with requirements shown before typing
3. Terms acceptance  — explicit, never pre-ticked
4. Primary action
5. SSO / social options
6. Link to sign in
```

Also needed: forgot-password, reset-password, verify-email, MFA challenge, and
session-expired. Products routinely design the first two and improvise the
rest — and the improvised ones are where users get stranded.

**Password requirements go before typing, not after failing.** Showing "must
contain a number" only once the user has submitted is a deliberate waste of
their time.

## Password managers

Getting this right is worth more than any other detail on the screen.

```html
<input type="email"    autocomplete="username">
<input type="password" autocomplete="current-password">   <!-- sign in -->
<input type="password" autocomplete="new-password">       <!-- sign up / reset -->
```

Use one form, real `<form>` semantics, and a submit button. Splitting email and
password across two screens without correct autocomplete breaks password
managers, and a user whose manager fails will reset their password instead of
remembering it.

Never block paste. It is security theatre that forces weaker passwords by
making generated ones unusable.

## Error messaging

The balance is helping the user without helping an attacker enumerate accounts.

| Situation | Say |
|---|---|
| Wrong password | "Email or password is incorrect" — deliberately ambiguous |
| Unknown email, on sign-in | the same message; do not confirm non-existence |
| Existing email, on sign-up | "An account with this email exists" + a sign-in link — here the information is already implied, and withholding it strands the user |
| Rate limited | say so, and say for how long |
| Locked | say so, and say how to unlock |

The sign-up case is the one products get wrong in the cautious direction: a
generic error there leaves the user unable to proceed in either direction.

Never say "invalid credentials" and nothing else. Never reveal which field was
wrong on sign-in.

## SSO and social

Place these **below** the password form with a clear divider, not above —
most returning users came to type a password. Label them accurately ("Continue
with Google"), show the provider's real mark, and remember which one they used
last: "You signed in with Google last time" prevents the duplicate-account
problem, which is the single most common SSO failure.

Handle the collision: someone who signed up with a password then tries Google
with the same address. Link the accounts, explain it, and do not create a
second one.

## Redirect contract

**Return the user where they came from.** A user who clicked a deep link, was
sent to sign in, and lands on a generic dashboard has to find their way back —
and often will not.

Preserve the intended destination through the whole flow, including through
email verification and MFA. Validate the redirect target against an allowlist;
an open redirect is a real vulnerability.

## Session expiry

Expiry mid-task is the most damaging auth failure, because the user loses work
they had no warning about.

- **Warn before expiring**, with an option to extend.
- **Preserve in-progress work.** Re-authenticate in a modal over the page and
  return to exactly where they were, rather than navigating away.
- **Never discard a form** because the session lapsed while it was being
  filled.

## The six states

| State | This screen |
|---|---|
| **empty** | the default state; the job is clarity about which flow the user is in. A sign-up page that looks like a sign-in page causes real confusion. |
| **loading** | disable the submit and show progress in place. Double-submission on slow connections creates duplicate accounts. |
| **error** | covered above. Always preserve the email field; making someone retype it after a wrong password is gratuitous. |
| **permission** | account suspended, email unverified, invitation expired, SSO required by policy. Each needs its own message and a path — "access denied" strands the user. |
| **overflow** | long emails, long provider names, 200-character passwords from a manager. Do not cap length below 64 characters. |
| **offline** | detect before submit and say so. A hanging sign-in reads as a wrong password, and the user will start resetting. |

Definitions: `patterns/states.md`.

## Common failures

- **Broken password-manager support.** The highest-cost detail on the page.
- **Blocking paste.** Forces weaker passwords.
- **Requirements shown only after failure.**
- **Redirect lost.** User lands on a generic page after a deep link.
- **Session expiry discarding work.**
- **SSO above the password form.** Wrong default for returning users.
- **Not remembering the last provider.** Duplicate accounts.
- **Generic error on sign-up for an existing email.** No path forward.
- **Email field cleared after a failed attempt.**
- **No rate-limit explanation.** Looks like the product is broken.
- **Pre-ticked terms.** Not consent, and unlawful in several jurisdictions.

## Reference products

| Product | Look at |
|---|---|
| **Stripe** | clean flows, MFA, session handling, clear expiry |
| **GitHub** | device verification, recovery codes, SSO policy enforcement |
| **Slack** | magic-link auth, workspace-scoped sign-in |
| **Linear** | minimal, fast, SSO-first for teams |
| **1Password** | the strictest test of autocomplete correctness |
