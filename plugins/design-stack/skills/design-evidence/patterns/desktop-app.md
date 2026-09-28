# Desktop Tool UIs

*Editors with a timeline, canvas, tool palette, or inspector. Video and audio
editors, design tools, IDEs, diagram tools, DAWs, 3D software.*

## What this screen is for

Making something. The user is not reading a page or working through records —
they are manipulating an artifact directly, for hours, with expertise.

**This is the playbook where general web conventions actively mislead.** A tool
built from web component defaults — generous padding, touch-sized targets,
hover cards, page scroll, modal dialogs — will feel wrong to its users in ways
they immediately notice and cannot always articulate. Read
`${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/systems/fluent.md` alongside this; it is the only major system that treats
desktop as first-class.

## Canonical structure

```
┌──────────────────────────────────────────────────────┐
│  Menu / command bar                                  │
├────────┬───────────────────────────────┬─────────────┤
│ Tools  │                               │ Inspector   │
│        │        Work surface           │ Properties  │
│        │        (canvas / timeline)    │             │
│        │                               │             │
├────────┴───────────────────────────────┴─────────────┤
│  Transport / status bar                              │
└──────────────────────────────────────────────────────┘
```

**Tools left, work centre, properties right.** This is near-universal across
Figma, Photoshop, Premiere, Blender, Ableton, and every IDE — and the
consistency is the reason to follow it. Users arrive with the layout already
learned; a tool that rearranges it spends their attention on relearning
furniture instead of on the work.

The logic underneath it: tools are what you pick *before* acting, properties
are what you adjust *after* selecting, and left-to-right matches that sequence
in left-to-right reading cultures.

**The work surface gets every pixel that is not doing something else.** Chrome
is overhead. This is the opposite of a web page, where whitespace around
content aids reading.

## The timeline specifically

| Element | Must do |
|---|---|
| **Tracks** | reorder, solo, mute, lock, resize height, collapse |
| **Playhead** | scrubbable, visible everywhere, keyboard-nudgeable frame by frame |
| **Zoom** | around the playhead or cursor, never around the left edge |
| **Snapping** | to clips, markers, grid, playhead — and a modifier to suspend it |
| **Selection** | single, range, multi, and select-all-following |
| **Ruler** | in the unit the user works in — timecode, bars, or seconds |

**Zoom that jumps to the left edge is the most-hated timeline bug.** Zoom in
toward the pointer or the playhead; the user is looking at something specific
and expects it to stay put.

Snapping must be suspendable with a held modifier. Without that, precise
placement becomes a fight; without snapping at all, alignment becomes tedious.

## Direct manipulation

The canvas must not feel like a web page. Concretely:

- **No text-selection cursor** on the work surface. `user-select: none` on
  everything but actual text fields — a stray blue selection highlight during a
  drag destroys the illusion of direct manipulation instantly.
- **No page scroll.** Scroll pans or zooms the canvas. The document does not
  move.
- **Cursor communicates mode.** Move, resize, rotate, draw, pan — the pointer
  is the primary mode indicator.
- **No hover cards or tooltips that obscure the work.** Tooltips on toolbar
  buttons are fine; anything appearing over the canvas is not.
- **Drag has live feedback.** Ghosts, guides, snap indicators, dimensions while
  resizing. Committing blind and discovering the result afterwards is the web
  form model, and it is wrong here.
- **Right-click means context menu**, always, with the actions relevant to what
  is under the pointer.

## Density

Web-scale touch targets are wrong here. A 44px minimum in a properties panel
wastes the space the tool needs, and these users are pointer users with
expertise — precision is available and expected.

Compact controls, tight spacing, small type in panels. Take density guidance
from `${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/systems/fluent.md`, and note the trade-off is deliberate: this violates
`${CLAUDE_PLUGIN_ROOT}/skills/design-stack/reference/07-mobile.md`, which is correct for touch and not for this.

Panels should be **scannable by position**. Experts learn where a control lives
and go straight to it; controls that move between contexts destroy that.

## Keyboard as the primary interface

For an expert, the keyboard *is* the tool. The mouse selects; keys act.

- **Single-key shortcuts for tools.** `V` move, `B` brush. No modifier — these
  are pressed constantly.
- **Modifiers for variants.** Shift-constrain, Alt-duplicate, Ctrl-snap-off.
- **Discoverability**: shortcuts in tooltips and menus, and a searchable
  shortcut reference. A command palette solves discovery for the long tail; see
  `${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/systems/primer.md`.
- **Remappable**, ideally. Experts arrive with muscle memory from a competitor.
- **Space to pan** while held — near-universal, and users will try it.

## Panels, docking, and persistence

Panels resize, collapse, and where the tool is ambitious, dock and float.
**Persist the layout across sessions** — a user who arranges their workspace
and finds it reset on next launch experiences it as the tool losing their work,
because it did.

Persist per project where layouts differ by task, and offer named workspace
presets if the tool serves several distinct workflows.

## Undo and redo

**First-class, always available, effectively unlimited.** A tool where undo is
shallow, or where some actions are not undoable, forces defensive behaviour —
constant manual saving, duplicating before experimenting — and defensive users
do not explore.

Every action goes on the stack, including panel-driven property changes and
selection where it matters. A named history panel is a significant upgrade for
complex tools.

## Performance is a design constraint

**A dropped frame during a drag is a design failure, not just a technical one.**
Direct manipulation depends on the illusion that the user is moving the object
itself; at 30fps that illusion breaks and the tool feels cheap regardless of how
it looks.

Budget for it in the design: virtualise long timelines and layer lists, render
the canvas on its own surface, debounce panel updates during drags, and degrade
preview quality while moving rather than dropping frames. Designing something
that cannot hit frame rate is designing something that will feel bad.

## The six states

| State | This screen |
|---|---|
| **empty** | no project open. This is a major screen in a tool — recent files, templates, new-project, import. Do not show an empty canvas with no guidance; it reads as broken. Empty *within* a project — no layers, no clips — needs a hint at the surface, not a modal. |
| **loading** | project open, media import, render. Show progress with an estimate and let the user work where possible. A modal spinner blocking a large import is the wrong answer. |
| **error** | missing linked media, unsupported format, failed render, corrupt file. Never lose the user's work. Offer relink, recover, and always an export path — a tool that fails and strands the artifact is unforgivable. |
| **permission** | read-only files, locked layers, checked-out assets, view-only collaborators. Show the lock and say why; a control that silently does nothing is the worst version. |
| **overflow** | 500 layers, a four-hour timeline, a 12,000px canvas, deep group nesting. Virtualise, collapse, and provide search over the layer or track list. |
| **offline** | for collaborative tools the important one. Keep working locally, show sync state clearly, and handle the conflict on reconnect rather than silently discarding one side. |

Definitions: `${CLAUDE_PLUGIN_ROOT}/skills/design-evidence/patterns/states.md`.

## Common failures

- **Text-selection highlight on the canvas.** Kills direct manipulation.
- **Zoom anchored to the left edge or canvas origin.** The most-hated timeline
  bug.
- **No modifier to suspend snapping.** Precise placement becomes a fight.
- **Web-scale padding in panels.** Wastes the space the tool needs.
- **Panel layout not persisted.** Experienced as the tool losing your work.
- **Shallow or partial undo.** Produces defensive, non-exploratory users.
- **Modal dialogs for property editing.** Blocks the canvas; use the inspector.
- **Page scroll instead of canvas pan.**
- **No keyboard shortcuts, or undiscoverable ones.**
- **Frame drops during drag.** A design failure.
- **Empty project state with no guidance.** Reads as broken.
- **Controls that move between contexts.** Destroys positional memory.

## Reference products

Study targets for a human — these are applications, not fetchable references.

| Product | Look at |
|---|---|
| **Figma** | the modern reference: panels, canvas performance, multiplayer, keyboard |
| **DaVinci Resolve** | multiple workspace modes in one app, dense professional panels |
| **Premiere / CapCut** | timeline interaction at two very different expertise levels — the same problem solved for pros and for beginners |
| **Ableton Live** | two-view model, timeline vs session, and transport design |
| **Blender** | extreme density, full remappability, and its own cautionary lessons about discoverability |
| **VS Code** | panel docking and persistence, command palette, extension surfaces |

CapCut against Premiere is the most instructive pair here if the product needs
to serve non-experts: same domain, same canonical layout, very different
decisions about what to expose.
