# Motion

*Read this when adding transitions, loading choreography, or animation.*

Motion is an information channel. Used well it answers three questions the user
would otherwise have to work out: what changed, where did it come from, and is
something happening. Used as decoration it costs time on every interaction
forever.

## Duration and easing

| Duration | For |
|---|---|
| 100–150ms | state changes on a control — hover, press, toggle |
| 200–300ms | elements entering or leaving, expanding, collapsing |
| 300–400ms | large surfaces — full-screen transitions, page changes |
| over 500ms | almost always wrong for anything the user triggered |

Scale duration with distance and size. A small element moving a short way at
400ms feels broken; a full-screen panel at 100ms feels like a jump cut with no
sense of where it came from.

**Easing conveys physics.** Things in the world accelerate from rest and
decelerate into place; they do not move at constant speed.

- **Ease-out** for entering — fast in, settling gently. The user sees the
  result sooner, which is why this is the most useful default.
- **Ease-in** for exiting — the element accelerates away.
- **Ease-in-out** for movement between two on-screen positions.
- **Linear** only for continuous indeterminate motion, like a spinner.

## What earns motion

Motion earns its cost when it answers a question:

- **What changed?** A row inserted into a list, a value updating, an item
  removed. Motion draws the eye to the change so the user does not have to
  re-scan.
- **Where did this come from?** A panel sliding from the edge it is anchored
  to, a detail view expanding from the row that spawned it. This builds a
  spatial model of the interface.
- **Is something happening?** Progress, loading, work in flight.
- **Did that work?** Confirmation of an action that has no other visible
  result.

Motion does **not** earn its cost for: decorating a page load, animating every
section as it scrolls into view, transitioning elements that have not changed,
or signalling that the team knows how to animate. Non-user-triggered motion in
particular should be rare and deliberate — one orchestrated moment lands, while
scattered entrance effects on every section read as noise and add latency to
every scroll.

**The test:** remove the animation. If nothing is harder to understand, it was
decoration.

## Transitions

**Enter and exit should be related but not symmetrical.** Exits are usually
faster — the user has already decided, and waiting to watch something leave is
pure cost. A 250ms enter with a 150ms exit feels right.

**Shared-element transitions** — a thumbnail growing into a detail view — are
the highest-value motion available, because they preserve object identity
across a navigation. The user sees that this detail is that item, rather than
inferring it.

**Anchor motion to a source.** A menu should grow from its trigger, a sheet
should rise from the edge it lives on, a popover should originate at its
anchor. Motion from nowhere teaches nothing.

**Never animate layout-affecting properties on large elements.** Animate
`transform` and `opacity`, which the compositor handles; animating `width`,
`height`, `top`, or `margin` forces layout on every frame and produces the
stutter that makes an interface feel cheap.

## Loading choreography

| Situation | Show |
|---|---|
| under ~100ms | nothing — a flashed spinner is worse than no spinner |
| 100ms–1s | a spinner or subtle indicator |
| over 1s | a skeleton matching the incoming layout, or progress |
| over 10s | progress with an estimate, and a way to cancel or leave |

**A skeleton that does not match the loaded layout is worse than no skeleton.**
The user builds an expectation from its shape; when content arrives in a
different arrangement, everything jumps and they lose their place. If you
cannot make the skeleton match, use a spinner.

Avoid the flash: content that arrives in 80ms behind a spinner produces a
flicker that reads as a glitch. Either delay showing the indicator by ~100ms,
or hold it for a minimum once shown.

Stagger list items entering by a small amount — 20–40ms apart — so the eye can
follow. Do not stagger more than about eight items; beyond that the last one
arrives late enough to feel broken.

## Reduced motion

**`prefers-reduced-motion` is a requirement, not a nicety.** For users with
vestibular disorders, large motion causes nausea and dizziness. This is a
health accommodation.

"Reduced" does not mean "none". Removing all motion removes the information
channel. Replace movement with a cross-fade: the state change is still
communicated, without the travel that causes the problem.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

*A blanket reset like this is the safe floor. Better is to handle it per
component — keep the cross-fade, drop the travel — but ship the floor if you
ship nothing else.*

Parallax, auto-playing video, and large-scale movement are the highest-risk
patterns; give them explicit reduced-motion alternatives rather than relying on
a global override.

## Common failures

- **Animating everything.** Latency added to every interaction, information
  conveyed by none of it.
- **Entrance animations on scroll.** Delays content the user asked for.
- **No `prefers-reduced-motion` handling.** A health accommodation, skipped.
- **Reduced motion implemented as no motion.** Throws away the information
  channel.
- **Animating `width`/`height`/`top`.** Layout thrash and visible stutter.
- **Skeleton mismatching the real layout.** Everything jumps on arrival.
- **Flashed spinners.** Reads as a glitch.
- **Symmetrical enter and exit.** Exits feel sluggish.
- **Motion from nowhere.** Teaches the user nothing about structure.
- **Durations over 500ms on user-triggered actions.** The interface feels slow
  even when it is fast.
