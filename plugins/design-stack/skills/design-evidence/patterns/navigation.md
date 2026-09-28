# Navigation

## What this screen is for

Answering three questions continuously and without being asked: *where am I*,
*where can I go*, and *how do I get back*. Navigation is not a component; it is
the user's model of what the product contains.

## Canonical structure

The shell determines the layout. The four archetypes are in
`${CLAUDE_PLUGIN_ROOT}/skills/design-stack/reference/02-layout.md`; this is what goes in them.

```
Primary      the product's top-level destinations — persistent, always visible
Secondary    within a section — tabs, sub-nav, or a second sidebar level
Utility      search, notifications, help, account — visually separate from primary
Contextual   actions on the current object — belongs with the content, not the nav
```

**The most common structural error is mixing these.** Putting "New invoice" in
the primary sidebar next to "Invoices" conflates a place with an action; the
user's map of the product now contains a verb. Actions live with the content
they act on.

Utility navigation is conventionally top-right (account, notifications, help)
and must be visually distinct from primary. Users look for it there because
every other product puts it there, and that convention is worth more than any
improvement you might make on it.

## Depth

**Three levels is the practical ceiling.** Beyond that, users cannot hold the
structure and navigate by search instead — at which point the hierarchy is
costing you maintenance without earning its keep.

If you need more depth, the product probably needs search as a primary
navigation mechanism rather than more nesting. See `${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/patterns/search-filter.md`.
`${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/systems/atlassian.md` is the best source on genuinely deep hierarchies, where
they are unavoidable.

## Showing location

Active states and breadcrumbs solve **different** problems and a product with
depth needs both:

- **Active state** answers *which section am I in* — one glance, no reading.
  Must be unmistakable: colour plus one other signal, never colour alone.
- **Breadcrumbs** answer *what is the path to here, and how do I go up one
  level*. They only earn their space at three or more levels; on a two-level
  product they are noise.

The page title is the third piece. A user who lands from a link with no context
should be able to tell where they are from the page alone.

## Search as navigation

Past roughly 50 destinations, or where items are user-created — documents,
issues, customers — search becomes the primary way people navigate and the menu
becomes a fallback for discovery.

When that happens, make search prominent rather than tucked in a corner, give
it a keyboard shortcut, and support it from anywhere. A command palette is the
mature form of this and is expected in developer and professional tools; see
`${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/systems/primer.md`.

## Responsive collapse

Collapse has an **order**, and deciding it is the design work:

```
1. Labels on secondary nav      → icons with tooltips
2. Secondary nav                → into a menu
3. Utility items                → into the account menu
4. Primary nav                  → drawer or bottom bar
```

**Never collapse:** the current location indicator, search if search is
primary, and the primary action.

Collapsing everything at once, at one breakpoint, is the common failure — the
interface goes from complete to a hamburger with nothing in between, wasting
the medium widths where a rail or icon nav would work well.

On touch, primary navigation belongs at the bottom, in the thumb arc. See
`${CLAUDE_PLUGIN_ROOT}/skills/design-stack/reference/07-mobile.md`.

## The account menu

Conventional contents, in roughly this order: the current account and which one
it is (critical in any product supporting multiple), profile, settings, theme,
help and documentation, keyboard shortcuts, then sign out — last and separated.

Multi-account and multi-workspace products must show the current context
**outside** the menu, not only inside it. Acting in the wrong workspace is a
real and costly error, and it happens when the only indicator is one click away.

## The six states

| State | This screen |
|---|---|
| **empty** | a new workspace with no projects still needs navigation. Show the destinations with empty counts rather than hiding them — hiding makes the product look broken. |
| **loading** | navigation renders immediately from known structure; only counts and user-generated items load. Never block the shell on data. |
| **error** | if the nav's data fails, keep the static structure and degrade the dynamic parts. A failed sidebar should not strand the user on a page with no way out. |
| **permission** | users see different destinations. **Hide what they could never access; explain what they could gain access to.** Silently hiding an upgradeable feature loses the upgrade. |
| **overflow** | 200 projects in a sidebar, a 60-character workspace name, 5 levels of nesting. Scroll within the nav region, truncate names with tooltips, cap the depth. |
| **offline** | navigation still works for cached destinations; mark what is unavailable rather than letting it fail on click. |

Definitions: `${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/patterns/states.md`.

## Common failures

- **Actions in the primary nav.** Puts verbs in the user's map of places.
- **Colour-only active state.** Invisible to a substantial minority.
- **Collapsing everything at one breakpoint.** Wastes the medium widths.
- **Breadcrumbs on a two-level product.** Ceremony.
- **No breadcrumbs on a five-level product.** No way up except back.
- **Drawer chosen for tidiness.** Hides the product's shape; users do not
  explore what they cannot see.
- **Current workspace only visible inside the account menu.** Users act in the
  wrong place.
- **Nested tab bars.** Ambiguous back.
- **Nav that shifts as counts load.** Mis-clicks.
- **More than three levels without search.**

## Reference products

| Product | Look at |
|---|---|
| **Linear** | sidebar density, keyboard navigation, command palette as primary |
| **Notion** | deep user-created hierarchy with search as the real navigation |
| **Stripe** | clean primary/secondary/utility separation, account context always visible |
| **GitHub** | repository-scoped navigation, breadcrumbs done well |
| **Slack** | workspace switching made unmistakable |
