# Material Design

## What it is for

Cross-platform products, and Android in particular. The most complete public
system for building one product across several platforms with a single
vocabulary.

## Core conventions

- **Elevation as a coherent model.** Surfaces sit at defined heights, and
  height determines shadow, tint, and stacking. Material 3 shifts much of this
  from shadow to surface tinting, which works far better in dark mode — see
  `${CLAUDE_PLUGIN_ROOT}/skills/design-stack/reference/01-foundations.md`.
- **Dynamic colour and tonal palettes.** A generated palette from a seed
  colour, with roles (`primary`, `on-primary`, `surface`, `on-surface`) rather
  than raw values. This is a strong model to borrow even outside Material.
- **Bottom navigation** for 3–5 destinations; navigation rail at medium widths;
  navigation drawer beyond that. The responsive progression is specified.
- **FAB for the single most important action** on a screen — at most one, and
  only when there genuinely is one dominant action.
- **The system back gesture is sacred.** Android users expect back to work
  everywhere, and an app that swallows it is the most-complained-about
  cross-platform failure there is.
- **Touch targets at 48dp** with 8dp between them.
- **Motion with specified duration and easing tokens**, tied to the size of the
  transition — see `${CLAUDE_PLUGIN_ROOT}/skills/design-stack/reference/08-motion.md`.

## Where it is opinionated

Elevation, colour roles, navigation progression across breakpoints, and motion
specifications. Material's component set is large and detailed, and its
guidance frequently tells you exactly which component to use for a situation.

## Where it is silent

Domain-specific patterns, dense data work (Material is not built for
spreadsheet-like density), complex tables, and desktop conventions like
ribbons, panels, or window chrome.

## Pick it when

Building for Android, or building one product across several platforms and
needing a single vocabulary. Also a reasonable default for a consumer web app
whose team has no other system, because the guidance is complete and the
component implementations are mature.

## Do not pick it when

Building a data-dense professional tool — Material's spacing and component
sizes assume touch and occasional use, and experts will find it wasteful. Use
`${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/systems/carbon.md` or `${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/systems/fluent.md`. Also avoid it on iOS, where the
controls will read as foreign; see `${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/systems/apple-hig.md`.

## Docs

<https://m3.material.io> — fetchable.

Look up: the colour role system (worth borrowing wholesale), elevation in dark
mode, the adaptive navigation progression, and motion duration tokens.
