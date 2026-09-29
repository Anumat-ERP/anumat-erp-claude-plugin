<!--
Template: Work instruction
Basis: common quality-management practice.
Use when: one trained role carries out one task, step by step, usually
inside a larger SOP. A work instruction is more detailed than an SOP step:
screens, fields, exact values.
Rules: one task; numbered imperative steps; one action per step; expected
result after key steps; warnings before the step.
Remove this comment in the finished document.
-->

# WI-<NNN>: <Task, verb + object, e.g. "Issue a refund in the billing system">

| Field | Value |
|---|---|
| WI ID | WI-<NNN> |
| Version | <0.1> |
| Status | <Draft / Approved / Retired> |
| Owner | <role> |
| Performed by | <role> |
| Parent SOP | <SOP-<NNN>, step <n>> |
| Last reviewed | <YYYY-MM-DD> |
| Next review | <YYYY-MM-DD> |

## Before you start

- **You need:** <access, tools, the input record>
- **Time:** <about N minutes>
- **Safety or risk note:** <if any>

## Steps

1. <Open **Billing → Refunds**.>
2. <Search for the invoice number from the ticket.>

   Expected: <the invoice opens with status "Paid".>

3. <Select **New refund**.>

   > **Warning:** <Check the currency before the next step. A refund in the
   > wrong currency cannot be reversed.>

4. <Enter the amount from the approved ticket.>
5. <Select **Submit**.>

   Expected: <status "Refund pending"; a refund ID appears.>

6. <Copy the refund ID into the ticket.>

## If something goes wrong

| Symptom | Do this |
|---|---|
| <Invoice not found> | <Check the number; if still missing, return the ticket to the support agent> |
| <Submit button disabled> | <You lack the Refund role; ask the finance manager> |

## Revision history

| Version | Date | Change | Approved by |
|---|---|---|---|
| 0.1 | <YYYY-MM-DD> | First draft | — |
