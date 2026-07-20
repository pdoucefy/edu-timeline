# Task 21: Play route — parse/validate URL params and bootstrap the game

## Goal

Implement the `/fr/play` route so it reads the `chapters` and `difficulty` query parameters, validates them, resolves the event pool, and starts a game — or, if the parameters are missing/invalid, seamlessly redirects the user to `/fr/select`.

## Context

Product Spec ("Routes") and Technical Spec section 4: `/fr/play` stores the selection in the URL query (`?chapters=1,2&difficulty=easy`). "If they are missing or invalid, the user is redirected to `/fr/select`." Also: "Refreshing or accessing from an external site this page will start a new game if the game state is valid. Otherwise, it will redirect seamlessly the user to the level selection screen." This task connects the URL contract (Task 16) to the state provider (Task 20) via the resolvers (Tasks 8, 10).

## MVP Status

Required for MVP. It's the gateway into gameplay and enforces the valid-state redirect requirement.

## Dependencies

- Task 20 (state provider), Task 16 (URL contract), Task 10 (chapter/ID resolver), Task 8 (pool resolver), Task 7 (loader), Task 11 (routing), Task 12 (strings).

## Files / Areas Likely Affected

- `src/app/[locale]/play/page.tsx`
- A client wrapper that mounts `GameProvider` and kicks off `START_GAME`.

## Implementation Guidance

- **Read `node_modules/next/dist/docs/` for Next 16 access to search params** (page `searchParams` is async / promise-based in this version) and async `params` for the locale.
- Parse `chapters` (comma-separated numeric IDs) and `difficulty` (`easy`|`hard`). Validate:
  - `chapters` maps to at least one real chapter via the Task 10 ID→chapter helper.
  - `difficulty` is a valid `DifficultyLevel`.
  - Resolved pool has enough events to play (at least 2 — one to seed, one to place). Define the minimum and treat below-minimum as invalid.
- If invalid/missing → seamless redirect to the localized `/select` route (server-side `redirect()` preferred; verify Next 16 API in docs).
- If valid → resolve the pool with `combineEventPools` (Task 8), shuffle, mount `GameProvider` (Task 20), and dispatch `START_GAME` with the shuffled pool. Because refresh/external access should start a _new_ game, deriving state purely from the URL each load is correct (no persistence needed).
- Render the game surface: the timeline (Task 18) + the current event to place (Task 17) — the actual drag wiring and loop come in Tasks 22/23, but this task should render the initial game state (seeded first event + current event) so the route is demonstrably "started". If Tasks 22/23 aren't done yet, it's acceptable to render the static initial state and leave placement interaction as a TODO for those tasks.
- Keep the redirect seamless (no flash of an error).

## Acceptance Criteria

- [ ] `/fr/play?chapters=<ids>&difficulty=<level>` with valid params starts a game (first event seeded + current event shown).
- [ ] Missing/invalid params (bad ids, bad difficulty, too-few events, no query) → seamless redirect to `/fr/select`.
- [ ] Refreshing a valid `/play` URL starts a fresh game (state derived from URL).
- [ ] Uses Task 8 + Task 10 resolvers and Task 20 provider — no reimplementation.
- [ ] `yarn build`, `yarn lint` pass; `yarn dev` demonstrates both paths.

## Testing Requirements

- Manual: valid URL starts a game; invalid/empty URL redirects to select.
- Covered again by Cypress (Task 29).
- Optional unit test on the param-parsing/validation helper (keep it a pure function so it's testable).

## Out of Scope

- Drag-and-drop interaction (Task 22).
- Full game loop + end screen switching (Task 23) — though this task renders the initial started state.

## Recommended Agent Capability

Reasoning model. Async searchParams under Next 16, the valid/invalid redirect contract, and correct composition of resolvers + provider make this integration-heavy and easy to get subtly wrong.
