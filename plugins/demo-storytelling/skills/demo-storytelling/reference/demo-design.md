# Demo design

The live product is the most convincing thing you can show and the most
likely thing to fail. Demo design is about keeping the first while removing
the second.

## Content rules

**One idea per minute.** A 3-minute demo carries three ideas. List the ideas
before the features. Each idea gets roughly one minute of screen time and one
line of Say that states it.

**Cut features ruthlessly.** For each feature on the list ask: does the story
break without it? If not, cut it. Put cuts on a "for Q&A" list so the team
feels they are saved, not lost. The feature you are proudest of is often the
one to cut, because it only matters to you.

**The golden path.** One route through the product, the same every time. It
is designed, rehearsed and protected. Nobody explores off it during the demo,
and nobody pushes code that touches it in the last 24 hours.

## Setup rules

| Rule | Why | How |
|---|---|---|
| Pre-seeded data | An empty screen tells no story; real-looking data does | Seed a named persona, realistic names, amounts and dates. No "test123", no lorem ipsum |
| A reset button | You will rehearse ten times, and the eleventh run must start clean | One command, script or hidden route that restores the seed. Time it; under 10 seconds |
| Scripted clicks | Improvised navigation looks lost and costs seconds | The Do column names every control in order. The driver never searches for a button |
| Pre-filled forms | Typing live is slow and invites typos | Seed the values, or use browser autofill, or a paste buffer. Type only if typing *is* the point, and then type a few characters |
| Pre-opened tabs, in order | Loading a URL live wastes time and exposes the address bar | Open every tab the script needs, left to right in script order. Close everything else |
| Large font and zoom | The back row must read the screen | Browser zoom 125 to 150%; terminal and editor 20pt or more. Check from the back of the room |
| Hide notifications | A chat pop-up mid-demo derails the room and can leak private messages | Do Not Disturb on the OS and phone; quit chat, mail and calendar apps |
| Offline fallback | Venue Wi-Fi fails under load | Run locally if you can; otherwise a phone hotspot; know which parts need the network |
| Recorded backup video | The last line of defence | Screen-record the golden path, with no audio or with the final Say track. Keep it on the desktop, on a USB stick, and in the cloud |
| Golden-path rehearsal | Only a full run finds the gaps | Rehearse on the demo machine, on the demo network, with the demo account |
| Two-device rule for phones | Mirroring a phone is fragile and hard to see | Show the phone on a second device (camera, mirroring app tested earlier) or a pre-recorded clip; never hold the phone up to the room |

## Screen hygiene

- Browser: a clean profile with no bookmarks bar, no extensions icons, no
  autocomplete suggestions from personal history.
- Desktop: plain background, no files on it except the backup video.
- Accounts: signed in beforehand, with sessions that won't expire during the
  slot. Check token lifetimes.
- Hide the cursor when not clicking; make it larger when you are, so the room
  can follow it.
- If you show code, show three lines, not three hundred, at a font the back
  row can read.

## The two-device rule, in detail

When the story includes a phone (a notification, a mobile approval, a scan):

1. Main laptop drives the web app on the big screen.
2. The phone is shown through a second path you tested in the room: a mirroring
   app on the laptop, a document camera, or a pre-recorded 10-second clip.
3. The script says which screen the audience looks at, every time it changes:
   "Now on Mia's phone…"
4. Have a second phone, logged in, as a spare.

## Backup video, in detail

- Record at the resolution of the venue projector, typically 1920x1080.
- Record the golden path at demo pace, not faster.
- Name it so it is findable in two seconds: `BACKUP-demo.mp4` on the desktop.
- Rehearse the switch once: "Let me show you the recording while the network
  catches up." Then narrate the video exactly as the live script.

When something does go wrong on stage, follow
`${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/recovery.md`.
