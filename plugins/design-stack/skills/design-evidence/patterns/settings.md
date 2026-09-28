# Settings

## What this screen is for

Changing something and getting back to work. Nobody visits settings for its own
sake — they arrive with one specific thing to change, and the measure of the
screen is how fast they find it and how confident they are that it saved.

## Canonical structure

Shipped products converge on this order:

```
1. Account / profile        name, email, avatar, password
2. Preferences              language, timezone, theme, defaults
3. Notifications            channels × events
4. Security & sessions      MFA, active sessions, API keys, audit log
5. Integrations             connected apps, webhooks
6. Billing                  plan, payment, invoices  → patterns/billing.md
7. Danger zone              transfer, export, delete — separated, last
```

**Why this order.** Descending frequency of use, with destructiveness last.
Identity is what people change most; deletion is what they change once, and
putting it at the bottom behind visual separation means nobody reaches it by
accident while scrolling.

**The danger zone must be visually separated**, not merely last. A bordered
region with its own heading, distinct from the cards above it. This convention
is near-universal because it works: it converts "I scrolled too far" into "I
deliberately entered a different area".

## Variants

| Variant | Choose when |
|---|---|
| **Single page, scrolled** | under ~10 settings; everything visible, searchable with the browser |
| **Sidebar sections** | 10–50 settings; the default for most products |
| **Tabbed** | 3–6 groups, shallow; costs less space than a sidebar |
| **Nested pages** | 50+ settings; needs search and breadcrumbs or it becomes a maze |

**Personal vs team vs organisation scope must never share one page.** The user
cannot tell whose settings they are changing, and "who does this affect" is the
question settings must answer unambiguously. Separate them into distinct
sections with explicit labels — "Your notifications" and "Workspace
notifications" are different screens, not two cards.

`systems/polaris.md` has the best public guidance on settings at scale.

## The six states

| State | This screen |
|---|---|
| **empty** | rare for settings themselves, common for their contents — no integrations connected, no API keys, no active sessions. Each needs a first-run empty state explaining the feature, not a blank list. |
| **loading** | show the skeleton of the form, not a spinner. Never render inputs with default values before the real ones load — users start editing and their change is overwritten on arrival. |
| **error** | per-field for validation; per-section for save failure, so one failed section does not suggest the others failed too. Never lose the entered value. |
| **permission** | members see fewer sections than admins. **Explain, do not silently hide**, for anything a user might expect — "Only workspace owners can change billing" prevents a support ticket. |
| **overflow** | long workspace names, 200 connected integrations, 50 active sessions. Paginate lists inside settings; they grow. |
| **offline** | disable the save controls with a reason. Settings forms are the classic case of accepting input that cannot be saved. |

## Common failures

- **Autosave and explicit save mixed on one page.** The user cannot tell which
  changes are safe. Pick one per screen; see `reference/05-forms.md`.
- **No search, past about thirty settings.** Users know the word for what they
  want and cannot find its section.
- **Danger zone merely last, not separated.** Reachable by scrolling.
- **Destructive confirmation not naming the item.** "Delete workspace?" instead
  of "Delete workspace *Northwind*?"
- **Personal and team settings interleaved.** Ambiguous blast radius.
- **No save confirmation.** The user changes a toggle, nothing visibly happens,
  and they change it back to test. Autosave needs a visible saved indicator.
- **Settings that need a reload to take effect, without saying so.**
- **Empty sub-lists with no explanation.** "No integrations" teaches nothing;
  say what integrations do and link to adding one.
- **No unsaved-changes warning** on navigation away from an explicit-save form.

## Reference products

Study targets for a human to browse — these are real products, not fetchable
references.

| Product | Look at |
|---|---|
| **Linear** | keyboard-navigable settings, tight sidebar grouping, instant save with a subtle indicator |
| **Stripe** | personal vs account scope separation, permission explanations, API key management |
| **Notion** | workspace vs personal split, member management at scale |
| **GitHub** | the most complete danger zone convention, security and session UI |
| **Slack** | notification settings as a matrix of channels × events, which is genuinely hard to lay out |

For current screenshots, ask the user to browse Mobbin or Refero — Claude
cannot open them. See `reference/sources.md`.
