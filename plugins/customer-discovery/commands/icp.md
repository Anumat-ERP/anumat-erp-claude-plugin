---
description: Define the ideal customer profile, the early-adopter segment to start with, trigger events, and the anti-ICP.
argument-hint: [product or problem, and any segments already in mind]
---

Define the ideal customer profile for: **$ARGUMENTS**

Read `${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/reference/icp.md` first.

Ask only what you cannot infer: typically the market (country, language),
whether it is B2B or B2C, and what evidence already exists. One question at a
time.

## Produce, in order

**1. Candidate segments.** Two to four, each narrow enough to list 50 real
people. Score each on pain, spend, reach, trigger, and fit (1-5), and show the
table.

**2. Recommended first segment**, with one paragraph on why.

**3. ICP sheet.** Fill in
`${CLAUDE_PLUGIN_ROOT}/skills/customer-discovery/templates/icp-sheet.md`
for the chosen segment: firmographics or demographics, who feels the pain, who
pays, current workaround and spend, and where they gather. Mark each field as
evidence or assumption.

**4. Trigger events.** The moments the problem becomes urgent, and how to spot
people who are in one right now.

**5. Early-adopter profile.** Describe the earlyvangelist for this segment
(has the problem, knows it, is looking, has a workaround, has budget), and
what evidence would show each trait in an interview.

**6. Anti-ICP.** Who not to target yet, why, and when to revisit.

## Then stop

End by suggesting `/customer-discovery:find` for the chosen segment.
