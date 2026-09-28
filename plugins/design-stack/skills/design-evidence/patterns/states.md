# Interface States

*Read this for every screen, not only when states are the topic. This file
defines the six states the rest of the plugin refers to.*

## Why this list exists

The happy path is roughly 20% of the work and 100% of what looks finished in a
screenshot. It is also the state a user spends the least time in. Every
interface eventually shows a user an empty list, a failed request, a permission
they do not have, a name too long for its column, or a dead connection — and
those are the moments that decide whether the product feels trustworthy.

Generated UI almost always ships the happy path alone. Not because the other
states are hard, but because nothing in the request mentions them, and a design
that omits them still looks complete. This list exists to make the omission
visible.

**The six, always in this order:**

```
empty · loading · error · permission · overflow · offline
```

---

## empty

Three distinct situations, routinely collapsed into one message. That collapse
is the single most common state failure in shipped software.

| Sub-case | Means | Needs |
|---|---|---|
| **First-run** | never had data | explain what this is for, and one clear action to create the first item |
| **Filtered** | data exists, the query matched nothing | say what was filtered, offer to clear or broaden it — never "get started" |
| **Cleared** | the user removed everything | acknowledge it, offer undo if recent, offer to add more |

Showing "Create your first invoice" to someone whose search returned nothing is
actively confusing: it implies their data is gone.

A first-run empty state is the most valuable screen in a product and the most
neglected — it is the only moment you have the user's full attention with no
competing content. Say what the feature is for, show what a filled version
looks like if you can, and give exactly one action.

**Bad version:** a centred grey "No data" with no explanation and no action.

## loading

| Sub-case | Needs |
|---|---|
| **Initial** | skeleton matching the incoming layout, or a spinner under ~1s |
| **Refresh** | keep existing content visible, indicate refreshing — never blank it |
| **Pagination** | indicator at the point of insertion, existing rows stay put |
| **Optimistic** | show the result immediately, reconcile or roll back visibly |

Timing thresholds and the skeleton-mismatch problem are in
`${CLAUDE_PLUGIN_ROOT}/skills/design-stack/reference/08-motion.md`.

The most damaging version is blanking loaded content to show a spinner during a
refresh. The user loses their place, their scroll position, and any text they
had selected, and the interface feels slower than one that simply left the old
data up.

**Bad version:** a full-page spinner replacing content the user was reading.

## error

| Axis | Cases |
|---|---|
| Scope | **partial** (one widget, one row) vs **total** (the whole screen) |
| Recovery | **retryable** (network, timeout) vs **terminal** (deleted, forbidden) |
| Cause | **user** (bad input) vs **system** (server, network) |

**Every error says what happened and what to do next.** "Something went wrong"
does neither and is the default for a reason — it is what you write when you
have not thought about the case.

Partial failure must degrade locally. One failed widget should show its own
error and retry, not blank the page — and must never render as zero. A zero
that means "no data" and a zero that means "the request failed" looking
identical is the most dangerous bug a dashboard can have; see
`${CLAUDE_PLUGIN_ROOT}/skills/design-stack/reference/06-dashboard.md`.

Never blame the user for a system failure, and never expose a stack trace as
the user-facing message. Keep the technical detail available — behind a
disclosure, or in a copyable error ID — because support will need it.

**Bad version:** a red toast reading "Error" that auto-dismisses in four
seconds.

## permission

| Sub-case | Means | Usually |
|---|---|---|
| **Unauthenticated** | not signed in | prompt to sign in, and return here afterwards |
| **Unauthorised** | signed in, lacks the right | explain, and say who can grant it |
| **Plan-gated** | the plan does not include it | explain the value, offer the upgrade |
| **State-gated** | a prerequisite is unmet | say which, and link to it |

The design decision is **hide, disable, or explain**:

- **Hide** when the user could never have access and its existence would only
  confuse. An admin-only section for a read-only user.
- **Disable** when they might gain access and should know it exists — but a
  disabled control always needs a reason attached.
- **Explain** when there is an action they can take: request access, upgrade,
  complete a prerequisite.

Hiding by default is a common reflex and it produces users who cannot tell
whether a feature is missing, broken, or restricted — and who then file
support tickets asking.

**Bad version:** a button that silently does nothing when clicked.

## overflow

Everything you size for typical content will meet atypical content.

| Case | Answer |
|---|---|
| **Long strings** | truncate with tooltip, clamp, or wrap — see `${CLAUDE_PLUGIN_ROOT}/skills/design-stack/reference/03-typography.md` |
| **Many items** | paginate, virtualise, or infinite-scroll; say how many there are |
| **Deep nesting** | cap the depth, or collapse and provide breadcrumbs |
| **Narrow viewport** | a deliberate reflow, not horizontal scroll by accident |
| **Long numbers** | abbreviate with the exact value available on demand |

Also plan the **opposite** extreme: the one-character name, the empty string,
the single-row table. Layouts tuned to 20-character content break at both ends.

**Bad version:** a name that pushes a delete button off the edge of the screen.

## offline

| Sub-case | Needs |
|---|---|
| **Detected offline** | a persistent indicator, not a toast that disappears |
| **Silent failure** | requests failing without the browser reporting offline — treat as error |
| **Read-only degradation** | cached content stays readable; write actions are disabled with a reason |
| **Queued writes** | show that work is pending, and what happens if the user leaves |

The rule: **never accept input you cannot save without saying so.** A form that
appears to submit while offline, and silently loses the work, is the worst
outcome in this document.

If your product is not offline-capable, that is fine — but detect the state and
say so, rather than letting every action fail with a generic error.

**Bad version:** a spinner that never resolves.

---

## Using this as a gate

Fill this in for every screen. "Not applicable" is a valid answer **only with a
stated reason**; an unstated omission is a missing state.

| State | This screen |
|---|---|
| empty | *which of the three sub-cases can occur, and what does each show?* |
| loading | *initial, refresh, pagination — which occur, and what does each show?* |
| error | *partial or total, retryable or terminal — what does each say?* |
| permission | *who cannot see or act here, and do we hide, disable, or explain?* |
| overflow | *what field is longest, what list is biggest, what happens at 320px?* |
| offline | *what still works, what is disabled, what happens to in-flight work?* |

This is section 1 of `${CLAUDE_PLUGIN_ROOT}/skills/design-stack/reference/10-design-review.md`, and it is blocking there.
