# Mobile

*Read this when designing for touch, small screens, or native mobile.*

Mobile is not desktop with narrower columns. The input device has no hover, no
precision, and no keyboard; the screen shows one thing at a time; and the user
is frequently distracted, one-handed, and on a bad connection.

## Touch targets

**Minimum 44×44pt (iOS) or 48×48dp (Android).** This is about the contact area
of a fingertip, not about pixel precision — the finger occludes the target it
is aiming at, so the user is aiming from memory in the final moment.

The *visual* element may be smaller than the target. A 24px icon with a 48px
tap area is correct and common. What is not acceptable is a 24px icon with a
24px tap area.

**Spacing between targets matters as much as their size.** Two adjacent 48px
targets with no gap produce mis-taps at the boundary, and the cost of a mis-tap
is highest exactly where actions are adjacent — a delete next to an edit.
Leave at least 8px, more when one of the actions is destructive.

## Thumb zones

A phone held one-handed has a comfortable arc reachable by the thumb — roughly
the lower two-thirds, biased toward the holding side. The top corners are the
hardest to reach, and the top-opposite corner is the worst point on the screen.

| Zone | Put here |
|---|---|
| Bottom centre and sides | primary actions, main navigation |
| Middle | content, scrollable material |
| Top | titles, status, rarely-used actions, back |

This is why mobile navigation migrated from the top to the bottom, and why a
primary action stranded in a top-right corner gets used less. Destructive
actions are the deliberate exception: harder to reach is a feature.

## Navigation patterns

| Pattern | Choose when |
|---|---|
| **Tab bar** | 3–5 top-level destinations, frequent switching, all equally important |
| **Drawer** | many destinations, or infrequent switching; costs a tap and visibility |
| **Stack** | hierarchical drill-down; back is the universal reverse |
| **Modal sheet** | a self-contained task interrupting the current flow |

A tab bar makes destinations visible and switching cheap, which is why it is
the default for consumer apps. A drawer hides the product's shape — users do
not explore what they cannot see. Choose a drawer because you genuinely have
too many destinations, never because the tab bar felt cluttered.

Never nest a tab bar inside a tab. The user loses track of which level "back"
applies to.

## Gestures

**Every gesture needs a visible equivalent.** Gestures are invisible, and an
invisible affordance is undiscoverable by definition. Swipe-to-delete is fine
as an accelerator; it is not acceptable as the only way to delete.

Respect the platform's reserved gestures — edge swipes for back and for system
panels. Overriding them breaks something the user relies on across every app on
their device, and they will blame yours.

Keep custom gestures few. Users will not remember a vocabulary; they will
remember one or two accelerators on the things they do most.

Provide feedback during the gesture, not only at its end. A swipe that reveals
nothing until it completes gives the user no way to judge whether it is working
or to abort halfway.

## Safe areas and chrome

Respect the notch, the home indicator, the status bar, and the keyboard.
Content under a rounded corner is clipped; a button under the home indicator
competes with a system gesture.

**The keyboard is the most-forgotten constraint.** When it opens it takes half
the screen. Check that the focused field is still visible, that the submit
button is reachable, and that the layout does not jump. This breaks constantly
and is almost never caught in a desktop browser at a narrow width.

Test in landscape even if you think nobody uses it — someone will, often
someone using the device mounted or with accessibility settings on.

## iOS and Android

Where they genuinely diverge:

| | iOS | Android |
|---|---|---|
| Back | no system back; in-app back, top-left | system back gesture and button |
| Navigation | tab bar at bottom | bottom nav bar, or drawer |
| Sharing | share sheet | share intent |
| Dates, pickers, switches | platform controls | platform controls |
| Typography | SF | Roboto |

Where treating them the same is fine: layout, spacing, content structure,
information architecture, and your product's own components.

The rule: **use platform conventions for platform-level interactions, and your
own design for your own content.** A user's expectations about back, share, and
system controls come from the other hundred apps on their phone. Their
expectations about your content come from you.

The single most common cross-platform failure is shipping an iOS app on Android
that ignores the system back gesture. See `systems/apple-hig.md` and
`systems/material.md`.

## Common failures

- **Desktop targets on touch.** A 24px icon with a 24px tap area.
- **Adjacent targets with no gap.** Mis-taps exactly where they cost most.
- **Primary action in a top corner.** Out of the thumb arc.
- **Gesture as the only path.** Undiscoverable, and unusable with assistive
  tech.
- **Overriding system edge gestures.** Breaks a cross-app expectation.
- **Keyboard untested.** Focused field hidden, submit unreachable.
- **Safe areas ignored.** Clipped content, buttons under the home indicator.
- **Drawer chosen for tidiness.** Hides the product's shape.
- **Nested tab bars.** Ambiguous back.
- **Hover-dependent affordances.** There is no hover; the information is
  simply unavailable.
