# Splitting stories

A story is the right size when it fits in one sprint with room to spare,
usually a few days of work, and still delivers something a user or operator
can observe. Split vertically: every slice cuts through every layer it
needs (UI, logic, data) so it can be demoed and released on its own.

## INVEST

Based on Bill Wake's INVEST criteria (2003). A good story is:

| Letter | Means | Test |
|---|---|---|
| **I**ndependent | Can be built and released without another story in progress | Could we ship it first? |
| **N**egotiable | States the need, not a fixed design | Is there room for the team to find a better way? |
| **V**aluable | Someone gets value from it alone | Who would notice if it shipped? |
| **E**stimable | The team knows enough to size it | If not, write a spike first |
| **S**mall | Fits in a sprint, ideally a few days | Could two people finish it this week? |
| **T**estable | Acceptance criteria can pass or fail | Could a tester write the test now? |

"Independent" is the hardest. Some order is unavoidable; aim to remove
*technical* coupling and keep only genuine business order.

## SPIDR

Adapted from Mike Cohn's SPIDR splitting patterns. Try them in any order.

| Pattern | Split by | Example |
|---|---|---|
| **S**pike | Take the unknown out into a time-boxed research item, then split the rest | "Spike: can the payment provider do partial refunds?" before "Partial refund" |
| **P**aths | Alternative paths through the flow; each path a story | Pay by card / pay by bank transfer / pay by wallet |
| **I**nterfaces | Different interfaces, devices or channels; or a simple UI first, then a richer one | Web first, then mobile; a plain form, then drag-and-drop |
| **D**ata | Subsets of data types or values | Import CSV first, then Excel; domestic addresses, then international |
| **R**ules | Relax a business rule for the first slice, then add it back as its own story | Ship checkout, then add the "max 10 per customer" rule |

## Further splitting patterns

Adapted from Richard Lawrence's story-splitting patterns and common practice.

| Pattern | How | Example |
|---|---|---|
| **Workflow steps** | Each step in the user's journey is a story; or do the first and last step first, middle steps manually | Submit expense → approve → reimburse |
| **Business rule variations** | One story per rule | Discount by coupon; discount by loyalty tier |
| **Data variations** | One story per data type, source or format | Search by name; then by SKU; then by barcode |
| **Happy path vs edge cases** | Main success path first; each class of error or edge case after | Upload valid file; then reject oversized; then resume interrupted |
| **Simple / complex** | The simplest version that works, then enhancements | Fixed report; then filters; then saved filters |
| **Operations (CRUD)** | Create, read, update, delete as separate stories, if each is valuable alone | View invoices before editing them |
| **Defer performance** | Make it work, then make it fast (a separate story with a measurable target) | Search works; then search under 300 ms at p95 |
| **Roles** | One story per user role | Customer view; then admin view |

## Walking skeleton

For a new epic, the first story should be the thinnest end-to-end slice that
runs in production: one path, one data type, no optional rules. It proves the
architecture and gives every later story something to attach to.

## When not to split further

- The pieces would have no value on their own ("add the button" / "wire the
  button").
- The split creates a story per layer.
- The story already fits comfortably in a sprint and is testable.

## Checklist for a split

- [ ] Each new story passes INVEST.
- [ ] Each new story has its own acceptance criteria.
- [ ] The original requirement ID is carried onto each piece.
- [ ] Nothing from the original is lost; list what moved where.
- [ ] Anything deferred is written down as its own story, not forgotten.
