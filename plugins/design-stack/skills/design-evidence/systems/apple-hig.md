# Apple Human Interface Guidelines

## What it is for

Native applications on iOS, iPadOS, macOS, watchOS, tvOS, and visionOS. Written
for software that should feel like it came with the device.

## Core conventions

- **Platform controls over custom ones.** The system picker, switch, date
  selector, and share sheet carry accessibility, localisation, and Dynamic Type
  support you would otherwise rebuild badly.
- **Navigation is hierarchical and reversible.** Push forward, back to return.
  There is no system back button on iOS, so a visible in-app back affordance is
  mandatory, conventionally top-left.
- **Tab bars for peer destinations**, 3–5 of them, always visible. Not for
  steps, not for filters.
- **Clarity, deference, depth** — content is primary; chrome recedes; layering
  and motion convey hierarchy rather than decoration.
- **Dynamic Type is not optional.** Users set a system text size and expect
  every app to honour it. Layouts must survive the largest setting.
- **Safe areas and system gestures** are reserved. The home indicator and edge
  swipes belong to the OS.
- **SF Symbols** for iconography — thousands of icons that match the system
  font's weight and optical size automatically.

## Where it is opinionated

Navigation structure, the share sheet, modality (sheets vs full screen vs
popovers), and control appearance. Deviating here reads as a non-native app,
and reviewers notice. Apple also has firm opinions about when a modal is
appropriate and about not reinventing system affordances.

## Where it is silent

Your product's own content, information architecture, brand expression, data
visualisation, and anything specific to your domain. HIG tells you how a picker
behaves, not how your product should be organised.

## Pick it when

You are building a native Apple app and want it to feel native — which is
almost always the right goal, because the familiarity is free and the
accessibility support is substantial.

## Do not pick it when

You are building for the web or for Android. Web apps that imitate iOS controls
land in an uncanny middle: not native, and unfamiliar to web users. For
cross-platform mobile see `systems/material.md`, and for the genuine divergences
see `reference/07-mobile.md`.

## Docs

<https://developer.apple.com/design/human-interface-guidelines> — fetchable.

Look up: platform-specific navigation patterns, modality guidance, Dynamic Type
requirements, and the components section for any control you are tempted to
build yourself.
