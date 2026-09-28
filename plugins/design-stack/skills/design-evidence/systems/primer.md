# GitHub Primer

## What it is for

Developer tools. Products whose users are engineers and who expect keyboard
operation, dense information, and a high tolerance for complexity.

## Core conventions

- **Keyboard-first throughout.** A command palette, single-key shortcuts, and
  full keyboard operation are assumed rather than added. Developer users
  genuinely use these, which justifies the cost of building them.
- **Code surfaces done properly** — monospace handling, syntax highlighting,
  diffs, line numbers, selection, and copy behaviour. Nobody else specifies
  these, and getting them wrong is immediately obvious to the audience.
- **Density without crowding.** Primer is tight but readable, aimed at long
  sessions of reading and scanning rather than at first impressions.
- **Progressive disclosure through overlays** — popovers, dialogs, and inline
  expansion — rather than navigation, keeping the user in place.
- **Octicons**, a restrained icon set whose meanings are consistent
  system-wide.
- **Functional colour.** Status, diff, and state colours carry specific
  meanings, always paired with text or icon rather than standing alone.
- **Excellent empty and loading states** across the component set — worth
  studying against `patterns/states.md`.

## Where it is opinionated

Keyboard behaviour, code presentation, density, and overlay-driven disclosure.
Primer assumes a technical user and will feel spare to anyone else.

## Where it is silent

Consumer patterns, marketing surfaces, and heavy data visualisation. It also
assumes a web context and says little about desktop or mobile-native
conventions.

## Pick it when

Building a developer tool, a CLI companion, an API console, a CI or deployment
product, or anything whose primary users are engineers. Also a good fit for
technical internal tooling where the audience is your own engineers.

## Do not pick it when

Your users are not technical. Primer's density, terminology, and
keyboard-centred design assume familiarity that a general audience does not
have; use `systems/polaris.md` for business users or `systems/material.md` for
consumers.

## Docs

<https://primer.style> — fetchable.
Storybook: <https://primer.style/components> — see `systems/STORYBOOKS.md`.

Look up: the command palette pattern, code and diff components, keyboard
shortcut conventions, and the empty-state guidance.
