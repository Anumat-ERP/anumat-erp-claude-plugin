# Foundations

*Read this when setting up spacing, radius, elevation, density, or tokens — or
when an interface feels subtly untidy and you cannot say why.*

Foundations are the decisions you make once and then stop making. Their value
is not that any individual value is correct; it is that the same value recurs,
and recurrence is perceptible even when the number is not.

## Spacing

Use one scale, geometric rather than linear. A common base of `4px` with steps
at `4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96` gives fine control at small sizes
and coarse control at large ones, which matches how spacing is actually used:
you tune the gap between a label and its input to the pixel, and you do not
tune the gap between page sections at all.

Why a scale beats picking values: an interface built from arbitrary spacing has
no rhythm, and the eye reads the absence of rhythm as carelessness even when it
cannot name the cause. A scale also makes review possible — "that should be one
step tighter" is actionable, "that should be 3px less" is bikeshedding.

**Choosing the base step.** Dense professional tools often use `4px`; consumer
and marketing surfaces often use `8px`. Smaller base = more freedom and more
chances to be inconsistent.

**Breaking the scale** is legitimate for optical correction — a glyph that sits
visually low, an icon that needs one pixel of nudge. Mark those as corrections
in the code, so the next reader does not treat them as precedent.

## Radius hierarchy

Nested radii must decrease inward. The rule:

```
inner radius = outer radius − padding between them
```

A card with `radius 16` and `padding 12` holds a container with `radius 4`, not
another `16`. Concentric shapes with equal radii produce visibly non-parallel
curves — the gap between them widens at the corner. This is the single most
common reason a nested layout looks slightly wrong to everyone and obviously
wrong to nobody.

Keep the number of distinct radii small: three or four. A radius scale that
mirrors the surface hierarchy — page, card, control, chip — means the radius
itself tells the reader which level they are looking at.

## Elevation and surface

Treat depth as a hierarchy of **layers**, not a library of shadows. Three
levels carry almost every interface:

| Layer | Holds | Typical treatment |
|---|---|---|
| Base | the page | background colour, no shadow |
| Raised | cards, panels, sticky bars | a border, or a soft shadow, rarely both |
| Overlay | modals, menus, popovers, toasts | a stronger shadow, and a scrim if it blocks interaction |

More than three levels stops communicating. If every element is elevated, the
reader gets no signal about which things are actually above the page — the
hierarchy flattens back out, having cost you a shadow on every element.

Elevation must also survive dark mode. Shadows do very little against a dark
background; there, raised surfaces usually get *lighter*, not shadowed. Define
elevation as a token pair (surface colour + shadow) so the theme can swap both.

## Density

Density is a mode, not a default. The same component library serves a
comfortable mode and a compact one by changing only the spacing and control
height tokens.

| Mode | Suits | Because |
|---|---|---|
| Comfortable | consumer apps, occasional use, touch | errors cost more than scrolling |
| Compact | professional tools, all-day use, pointer | scanning cost dominates; the user is expert |

Pick by how long the user sits in the product. Someone in a tool for six hours
resents scrolling past whitespace; someone using it twice a month resents
mis-tapping. Offering both as a user preference is the right answer in any tool
whose audience spans the two.

## Token vocabulary

Name tokens by **role**, never by value.

```css
:root {
  /* surfaces */
  --surface-base:     #ffffff;
  --surface-raised:   #ffffff;  /* same hue, lifted by border or shadow */
  --surface-overlay:  #ffffff;  /* same hue, lifted by a stronger shadow */
  --surface-sunken:   #f6f7f9;

  /* content */
  --text-primary:     #16181d;
  --text-secondary:   #5c6370;
  --text-disabled:    #9aa1ad;

  /* lines — note the three roles have different contrast obligations */
  --border-subtle:      #e6e8ec;  /* decorative dividers only */
  --border-strong:      #c9cdd6;  /* structural separation */
  --border-interactive: #868d99;  /* control boundaries — must clear 3:1 */

  /* intent */
  --intent-accent:    #2f6feb;
  --intent-danger:    #c8372d;
  --intent-warning:   #9a6700;
  --intent-success:   #1a7f4b;

  /* geometry */
  --space-1: 4px;  --space-2: 8px;  --space-3: 12px; --space-4: 16px;
  --space-5: 24px; --space-6: 32px; --space-7: 48px; --space-8: 64px;
  --radius-sm: 4px; --radius-md: 8px; --radius-lg: 12px; --radius-xl: 16px;
}
```

*Expressed here as CSS custom properties. The same set maps to Tailwind theme
keys, SwiftUI constants, Compose tokens, or Style Dictionary output — the
vocabulary is the point, not the syntax.*

Why role-naming matters: `--gray-50` cannot be themed. When dark mode arrives,
`--gray-50` must become dark, at which point its name is a lie and every reader
of the codebase pays for it forever. `--surface-sunken` just takes a new value.

The minimum set any project needs: **surface** (3–4 levels), **text** (3
weights of emphasis), **border** (3 roles — see below), **intent** (accent,
danger, warning, success), **space** (one scale), **radius** (3–4 steps).

**Borders need three roles, not two strengths, because they carry different
obligations.** A divider between two paragraphs is decoration and may be as
faint as you like. The edge of a text input is the only thing telling a user
where the control is, so it is a UI component boundary and must clear 3:1 —
see `${CLAUDE_PLUGIN_ROOT}/skills/design-stack/reference/09-accessibility.md`.
Collapsing both into one "border" token is how products end up with inputs
nobody can locate: the value that looks right on a divider is far too faint on
a control.

## Common failures

- **Shadow on everything.** Elevation applied uniformly conveys no hierarchy
  and just adds noise. Most cards need a border, not a shadow.
- **Equal nested radii.** The concentric-corner error above. Always visible,
  rarely diagnosed.
- **Value-named tokens.** `--blue-500`, `--gray-100`. Blocks theming, and the
  names go stale the moment the palette moves.
- **Spacing improvised per component.** Ten components, ten paddings, no
  rhythm.
- **One density for every audience.** Consumer spacing in a professional tool
  makes experts scroll; compact spacing in a consumer app makes novices
  mis-tap.
- **Dark mode as an inverted palette.** Elevation, borders, and shadows all
  behave differently against dark. Define the pair, do not invert.
