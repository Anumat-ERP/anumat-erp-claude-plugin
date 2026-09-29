# Q&A handling

Q&A is often where the decision is made. The demo showed it works; Q&A shows
whether the team understands it. Prepare it like the script: in writing, with
the questions ranked, using
`${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/templates/qa-prep.md`.

## Anticipate the top 10

Brainstorm 20 to 30 questions as a team, then rank by likelihood and by
damage if answered badly. Prepare the top 10 in writing. The common ones:

1. Who exactly is the user, and how do you know they have this problem?
2. What's different from [the obvious competitor or doing it by hand]?
3. Is this real? What's live, what's mocked?
4. How does [the hard technical part] work?
5. How does it make money, or who pays?
6. What happens at scale: 10x users, 100x data?
7. What about privacy, security, or compliance?
8. What was the hardest part to build?
9. What would you build next?
10. Why this team?

Add the questions only your product invites: the AI accuracy question, the
"what if the supplier doesn't respond" edge case, the regulatory one.

## The 20-second answer: answer → evidence → bridge back

| Part | Time | Example |
|---|---|---|
| **Answer** | first sentence, directly | "Yes, the counting runs live on the photo." |
| **Evidence** | one fact, number, or example | "It's a vision model we fine-tuned on 3,000 shelf photos; 94% item accuracy in the pilot." |
| **Bridge back** | one sentence tying it to the story or the ask | "That's what lets Mia skip the counting entirely." |

- Answer the question asked, in the first sentence. No preamble.
- Twenty seconds, then stop. If they want more, they'll ask.
- Repeat or rephrase the question briefly if the room couldn't hear it. It
  also buys two seconds to think.
- Keep one bridge-back line ready that works for almost any question: the
  one-sentence pitch or the persona's outcome.

## Saying "I don't know" well

Guessing is worse than not knowing; a judge who knows the answer will notice.

- "I don't know yet. What we do know is [adjacent fact]. We'd find out by
  [concrete step]."
- "We haven't measured that. Our best estimate is X, based on Y."
- "Good question; we made the trade-off on purpose: we chose A over B because
  C."

Offer to follow up only if there is a real way to do so.

## Hostile or hard questions

- **Stay warm.** Treat it as a good-faith question even if it isn't. The room
  is watching your reaction, not the asker's.
- **Find the fair point** and agree with that part first: "You're right that
  cafés already have POS systems."
- **Then answer:** "What they don't do is count what's on the shelf. That's
  the gap."
- **Don't argue, don't defend at length.** One answer, then bridge.
- **Multi-part questions:** answer the part that matters most, then "And on
  your second point…" if time allows.
- **Out-of-scope or rambling questions:** "Happy to go deeper on that after;
  the short answer is…"
- **"Isn't this just X?"**: "It looks like X from the outside. The difference
  is Y, which matters because Z."

## Team logistics

- Assign an owner per topic in advance; see the Q&A split in
  `${CLAUDE_PLUGIN_ROOT}/skills/demo-storytelling/reference/hackathon.md`.
- Keep a backup slide or tab for the two most likely deep-dive questions
  (architecture, numbers). Don't show it unless asked.
- Rehearse Q&A: one teammate plays the sceptical judge for five minutes, with
  a timer on each answer.
