# Testing

*Read this when deciding what to test and at which layer.*

## The four layers

| Layer | Tool | Tests | Should be |
|---|---|---|---|
| Unit | Vitest | domain rules, pure functions | hundreds, milliseconds |
| Component | Vitest + Testing Library | a component's behaviour | dozens per package |
| Network | MSW | what happens at the HTTP boundary | wherever a component fetches |
| End-to-end | Playwright | flows crossing app boundaries | a handful, and they matter |

The shape is a consequence of cost. A domain test costs nothing to run and
pinpoints the failure; an e2e test costs seconds and tells you "checkout
broke" without saying why. Push coverage down the stack wherever the layer
below can answer the question.

## Domain tests are the payoff of the module layout

Because `domain/` imports no React and no fetch, its tests need no DOM, no
server and no mocking framework. A transition table's tests run in
milliseconds and fail with the actual rule that was violated.

This is the concrete return on the layering in
`${CLAUDE_PLUGIN_ROOT}/skills/monorepo-stack/reference/12-modules.md`. If
domain tests need a DOM, business logic has leaked into the UI.

## Use-case tests use doubles, not mocks

The module owns its ports, so a test implements them directly:

```ts
function inMemory(seed = []) { /* a Map behind the RecordRepository interface */ }
```

No mocking framework. The double is type-checked against the real interface,
so changing the port breaks the test — which is exactly when it should break.
A mocked method name, by contrast, keeps passing after the real method is
renamed.

## MSW at the network boundary, not the client

Intercept HTTP rather than stubbing your fetch wrapper. Stubbing the client
tests that you called your own function; intercepting the request tests that
the URL, method, headers and parsing are right, which is where the bugs are.

Set `onUnhandledRequest: 'error'`. A request nobody stubbed is a test quietly
talking to the outside world — slow, flaky, and occasionally destructive.

## The shared `@repo/testing` package

Three exports, deliberately few:

```
./render       Testing Library render wrapped in the app's providers
./msw/server   the MSW node server
./setup/msw    lifecycle: listen, resetHandlers, close
```

Always render through the wrapper. A component mounted without its providers
passes for reasons the real app does not share.

## Component tests assert behaviour

Query by role and accessible name, not by test id:

```ts
screen.getByRole('button', { name: 'Save changes' });   // yes
screen.getByTestId('save-btn');                          // last resort
```

A role query fails when the button stops being reachable by assistive
technology — so the test covers accessibility for free. A test id passes
happily on a `div` nobody can focus.

Assert what a user observes, not internal state. "The button is disabled and
announces busy" survives a refactor; "the `loading` state is `true`" does not.

## Coverage

A smoke alarm, not a goal. Useful signal: a file that was covered and is not
any more. Useless signal: 80% as a gate, which is met by testing getters while
the branch that matters goes untested.

Coverage on `domain/` should be high and is cheap. Coverage on `infrastructure/`
is usually better served by one integration test than by mocking the client.

## Why not `bun test`

It is faster, and it was rejected deliberately. Testing Library, jsdom, MSW and
Next all assume Vitest or Jest; their documentation, their setup files and
their community answers are written for that. Test-infrastructure failures are
expensive precisely because they block everything else while you debug the
tooling instead of the code.

The speed difference is seconds on a suite of this size. Revisit if the suite
grows to where it is minutes.

## Common failures

- **E2E tests standing in for unit tests.** Slow, and they say what broke
  without saying why.
- **Mocking frameworks where an in-memory double works.** Survives renames it
  should not survive.
- **Stubbing the fetch client instead of the network.** Tests your own wrapper.
- **No `onUnhandledRequest: 'error'`.** Real requests leak out of tests.
- **Rendering without the provider wrapper.** Passes for the wrong reasons.
- **Test ids where a role query works.** Loses the accessibility check.
- **Asserting internal state.** Breaks on every refactor.
- **Coverage as a gate.** Met by testing what does not matter.
- **Domain tests that need a DOM.** Business logic has leaked into the UI.
