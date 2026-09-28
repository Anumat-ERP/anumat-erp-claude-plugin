# Microsoft Fluent

## What it is for

Desktop productivity software and tools people live in all day. The only major
public system that treats desktop conventions as first-class rather than as an
afterthought to mobile.

## Core conventions

- **Density is the default, not a mode.** Controls are compact because the user
  is expert, uses a pointer, and needs to see a lot at once. Consumer spacing in
  a professional tool makes experts scroll for no benefit.
- **Command surfaces** — toolbars, command bars, ribbons — as a designed pattern
  with specified overflow behaviour. Fluent is the best public source on what
  happens to a toolbar when the window narrows, which almost every other system
  leaves undefined.
- **Persistent panels** rather than modals. Desktop users work with several
  things visible at once; an inspector docked to the side beats a dialog that
  blocks everything.
- **Keyboard-first.** Accelerators, access keys, and full keyboard operation are
  assumed, not added later.
- **Window chrome, title bars, and multi-window behaviour** are addressed —
  something web-born systems simply do not cover.
- **Layering and acrylic** to convey depth in a dense interface without adding
  spacing you cannot afford.
- **Overflow as a first-class state.** What happens when there is not enough
  room is specified rather than left to the implementer.

## Where it is opinionated

Command surface structure, density, keyboard behaviour, and window-level
interaction. Fluent assumes an expert user in a long session and designs
accordingly; its guidance will fight you if you try to make it feel airy.

## Where it is silent

Consumer and marketing surfaces, mobile-first patterns, and expressive brand
work. Fluent is built for tools, and it shows.

## Pick it when

Building desktop productivity software, an Electron or Tauri application,
Windows-targeted software, or any tool whose users sit in it for hours. Also
pick it for a web app that behaves like a desktop tool rather than like a
website.

Pair it with `patterns/desktop-app.md` for editor-shaped products — timeline,
canvas, and inspector layouts have their own rules that no general system
covers.

## Do not pick it when

Building consumer mobile or a marketing site. Fluent's density and command
surfaces will read as intimidating to occasional users. Use
`systems/material.md` or `systems/polaris.md`.

## Docs

<https://fluent2.microsoft.design> — fetchable.
Storybook: <https://react.fluentui.dev> — see `systems/STORYBOOKS.md`.

Look up: command bar overflow behaviour, density specifications, keyboard
accelerator conventions, and panel vs dialog guidance.
