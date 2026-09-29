# Interview craft: honest conversations

Rob Fitzpatrick's *The Mom Test* starts from a simple observation: if you ask
people whether your idea is good, they will lie to be nice, even your mother.
The fix is not to ask better opinion questions. It is to stop asking for
opinions and ask about facts from their life instead. This file summarises the
principles in our own words, and adds practical interview technique.

## The three rules

1. **Talk about their life, not your idea.** The moment you describe your
   idea, the conversation turns into polite feedback.
2. **Ask about specifics in the past, not generics or the future.** "What
   happened last Tuesday?" beats "How do you usually…?" and both beat "Would
   you…?"
3. **Talk less, listen more.** If you talk more than a third of the time, you
   are pitching.

## Good and bad questions

| Bad (opinions, future, generic) | Better (facts, past, specific) |
|---|---|
| Do you think this is a good idea? | Tell me about the last time this came up. |
| Would you use an app that does X? | How are you dealing with it right now? |
| Would you pay 20 dollars a month for this? | What are you spending on it today, in money or time? |
| How often do you usually do this? | When did you last do it? And the time before? |
| Is this a big problem for you? | What have you tried to fix it? Why did that not work? |
| What features would you want? | Walk me through what you did, step by step. |
| Would your team use this? | Who else was involved the last time? What did they do? |

## Dig into the workaround

The strongest evidence of pain is effort already spent. Ask:

- What do you do today when this happens?
- What does that cost you, in hours, money, or mistakes?
- How often does it happen? When was the last time?
- Have you looked for a fix? What did you find? Why did you not buy it?
- Who else is affected when it goes wrong?

No workaround usually means the problem is not painful enough to act on.

## Ask about the last time it happened

"Tell me about the last time…" is the most useful question in discovery. It
forces a real story with a date, people, tools, and a cost. Follow it with
"then what happened?" until the story ends.

## Deflect compliments, fluff, and hypotheticals

- **Compliments** ("That sounds great!") carry no information. Say thanks and
  steer back: "Thanks. Can I ask how you handle this today?"
- **Fluff** is generic or future talk: "I usually…", "I always…", "I would…",
  "I might…". Anchor it: "When was the last time you did that?"
- **Hypotheticals** ("If you built X, I'd definitely buy it") are guesses about
  their future self. Ask what they did last time they had the chance to buy
  something similar.
- **Feature requests** are ideas about a solution. Ask why they want it, and
  what the feature would let them do that they cannot do now. The answer
  reveals the real problem, or reveals that there is none.

## Structure of a problem interview

1. **Set context (2 min).** Who you are, that you are learning, that there are
   no wrong answers, and consent to take notes or record.
2. **Their world (5 min).** Role, a normal week, where the problem sits.
3. **The last time (10-15 min).** The story, the workaround, the cost.
4. **Priorities (3 min).** Where does this rank among their other problems?
5. **Close (3 min).** Ask for a commitment or two intros.

Template: `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/problem-interview-guide.md`.
For how someone switched from one solution to another, use the JTBD switch
interview in `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/jtbd.md`.

## Taking notes

- **The rule of two people.** One person leads the conversation; the other
  takes notes. A single interviewer cannot listen well and write well at once.
  If you are alone, record (with consent) and write notes right after.
- **Write verbatim quotes** for anything important, in quotation marks. Your
  paraphrase will drift toward what you hoped to hear.
- **Mark facts, opinions, and your own interpretation separately.**
- **Write up the same day,** using
  `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/interview-notes.md`,
  and score it with
  `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/interview-scorecard.md`.

## Recording consent

Ask before recording, every time: "Is it OK if I record this so I can focus on
listening? It stays with our team and I can delete it on request." Respect a
no without argument. Details in
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/ethics.md`.

## End with an ask

An interview that ends with "thanks, I'll keep you posted" produced no signal.
End with a next step that costs them something:

- "Could you introduce me to two others who deal with this?"
- "Could we meet again with your operations lead next week?"
- "We're running a pilot with five shops in March. Would you want a place?"
- "If we deliver X by date Y, would you sign a letter of intent today?"

A yes is signal. A vague "maybe later" is also signal. See
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/signals.md`.

## Other habits

- Keep interviews casual and short; a coffee is better than a formal meeting.
- Do not show slides or demos in a problem interview.
- If you realise you pitched, note it in the scorecard; treat that interview's
  positive answers as weaker.
- Silence is a tool. Wait three seconds after an answer; people fill it with
  the real detail.
