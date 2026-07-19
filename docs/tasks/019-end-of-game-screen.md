# Task 19: End-of-Game screen (success & failure variants)

## Goal

Build the End-of-Game screen with two variants — success (all events placed) and failure (an event was misplaced) — showing the required stats and a button to return home.

## Context

Product Spec ("End of Game") and Technical Spec section 6 (End-of-Game) & section 10 item 8. This screen lives on the play route (Product Spec "Routes": "The game over screen also lives on the route"). Requirements:

- **Success:** congratulatory message + "Back to home" button.
- **Failure:** number of correctly placed events (timeline count minus the first seeded event), number of events left to place, and the year (or placement) of the misplaced event that ended the game. Plus a "Back to home" button.

## MVP Status

Required for MVP. It closes the user flow.

## Dependencies

- Task 13 (layout), Task 12 (strings), Task 17 (EventCard optional for showing the misplaced event), Task 2 (theme).

## Files / Areas Likely Affected

- New `EndOfGameScreen` component under `src/components/`.
- It will be conditionally rendered on the play route by Task 23.

## Implementation Guidance

- Props-driven and presentational. Accept something like: `{ outcome: 'success' } | { outcome: 'failure', placedCount, remainingCount, misplacedEventYear }` (and optionally the misplaced `Event` to show its card/year).
- **Success variant:** congratulatory French message + "Back to home" button.
- **Failure variant:** render the three stats using French copy with interpolated counts (from Task 12 catalog). Show the misplaced event's **year** (only the year, consistent with the rest of the UI) — optionally reuse `EventCard` revealed to display it.
- "Back to home" navigates to the localized `/fr` home route using locale-aware navigation.
- Compute nothing game-related here; the caller (Task 23) supplies the numbers. Define the prop contract clearly so Task 23 knows what to pass (e.g. placedCount = events on timeline minus the initial seeded one).
- Style with theme; a light Framer Motion entrance is fine but optional.

## Acceptance Criteria

- [ ] Success variant shows a congratulatory message + back-to-home button.
- [ ] Failure variant shows placed count, remaining count, and the misplaced event's year.
- [ ] Back-to-home navigates to `/fr`.
- [ ] All copy from the French catalog with correct interpolation.
- [ ] Pure/presentational — no game logic.
- [ ] `yarn build`, `yarn lint`, `yarn test` pass.

## Testing Requirements

- RTL unit tests: success variant renders the message + home button; failure variant renders the three stats with given props.

## Out of Scope

- Deciding when/why the game ended (Task 23).
- Persisting scores (not in scope for the product).

## Recommended Agent Capability

Cheap coding model. Presentational component with a clear two-variant prop contract.
