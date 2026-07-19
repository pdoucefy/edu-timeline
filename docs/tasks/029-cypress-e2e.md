# Task 29: Cypress E2E setup and core flow tests

## Goal

Install and configure Cypress, then write end-to-end tests covering the full game flow (success and failure paths), route redirects for invalid parameters and unknown URLs, and a desktop-vs-mobile layout check.

## Context

Technical Spec section 9 mandates E2E tests with Cypress: full game flow (start → success, start → failure), route redirects for invalid parameters and unknown URLs, and a responsive layout switch (desktop vs forced mobile). Cypress is not yet installed. Because the game uses drag-and-drop (hard to unit-test), E2E is the primary confidence signal for the gameplay loop.

## MVP Status

Required for MVP per the spec's testing strategy. Best done once the game loop (Task 23) and redirects (Tasks 14, 21) exist.

## Dependencies

- Task 23 (game loop), Task 21 (play redirect), Task 14 (unknown-route redirect), Task 16 (selection). Deterministic gameplay helps — see guidance on seeding.

## Files / Areas Likely Affected

- `package.json` (Cypress devDep + `e2e`/`cypress` scripts).
- `cypress.config.ts` and `cypress/` test folder.
- Possibly small `data-testid` / `data-cy` attributes added to key elements (timeline slots, current event, start button, end-screen) to make E2E selectors robust.
- Possibly a test-only hook to force a deterministic pool/shuffle (see below).

## Implementation Guidance

- Install Cypress via Yarn and configure `baseUrl` for the dev server; add scripts to run headless and interactive.
- **Determinism:** the game shuffles the pool, which makes success/failure paths flaky. Provide a deterministic mode for tests — e.g. honor a query param or env flag that fixes the RNG seed / disables shuffle, or expose the current event so the test can compute the correct/incorrect slot. Keep this test affordance minimal and clearly marked; do not change production behavior by default.
- Add stable selectors (`data-cy`/`data-testid`) to: start button (home), selection controls + start (select), current event, timeline slots, and end-screen elements. Coordinate lightweight additions to the relevant components.
- **Simulating drag-and-drop:** dnd-kit drags are notoriously tricky in Cypress. Prefer driving placement through the keyboard/dropdown fallback (Task 26) if available, or through dnd-kit's keyboard sensor, rather than synthesizing pointer drags. Document the chosen approach.
- Write tests:
  1. Success path: start a game (deterministic), place all events correctly, assert success end screen.
  2. Failure path: place an event incorrectly, assert failure end screen with expected stats.
  3. Invalid `/play` params redirect to `/select`; unknown URL redirects to home.
  4. Layout check: desktop viewport vs forced mobile viewport renders key screens without breakage.
- Keep the `@/*` alias and Next dev server working under Cypress.

## Acceptance Criteria

- [ ] Cypress installed and configured; scripts run headless.
- [ ] E2E: success path passes deterministically.
- [ ] E2E: failure path passes deterministically with expected stats.
- [ ] E2E: invalid `/play` params → `/select`; unknown URL → home.
- [ ] E2E: desktop vs forced-mobile layout check passes.
- [ ] Tests are stable (not flaky) across repeated runs.
- [ ] `yarn build`, `yarn lint` still pass.

## Testing Requirements

- The Cypress suite itself is the deliverable; it must pass reliably.

## Out of Scope

- Unit tests (covered in their feature tasks).
- CI pipeline wiring (can be noted for Task 30).

## Recommended Agent Capability

Reasoning model. Making drag-and-drop E2E deterministic and non-flaky, plus test-only seeding, requires careful design decisions.
