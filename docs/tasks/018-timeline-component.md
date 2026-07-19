# Task 18: Timeline component (static)

## Goal

Build the horizontal timeline component that renders the currently placed events in chronological order along an axis, with visible **drop zones** (insertion slots) between/around them — without wiring drag-and-drop yet.

## Context

Technical Spec section 10 item 4: "Timeline component (horizontal axis, drop zones)". Gameplay places events left-to-right in chronological order (Wikitrivia-style). This task delivers the static visual structure and the concept of insertion slots (index 0..N) that Task 22 (dnd-kit) and Task 23 (game loop) will hook into.

## MVP Status

Required for MVP. It's the central play surface.

## Dependencies

- Task 17 (EventCard), Task 2 (theme), Task 12 (strings).

## Files / Areas Likely Affected

- New `Timeline` component under `src/components/`.
- Possibly `DropZone`/`InsertionSlot` subcomponent.

## Implementation Guidance

- Props: an ordered array of placed events (already sorted chronologically by the caller) and callbacks/identifiers for the insertion slots. Keep it presentational + structural; the ordering and validation live elsewhere (Tasks 9, 23).
- Render a horizontal axis with each placed event as an `EventCard` (revealed, showing its year). Between each pair of adjacent cards, and at the far left and far right, render an insertion slot representing indices `0..N`.
- Each slot should expose a stable identifier/index so Task 22 can register it as a dnd-kit droppable and Task 23 can map a drop to an insertion index.
- Provide clear visual affordance for slots (e.g. a gap/marker) and a hook for a "highlight active slot" state that dnd-kit will drive later — but do not implement drag here.
- Handle horizontal overflow gracefully (scroll) since the timeline grows as events are placed. Keep desktop-first; responsiveness polish is Task 27.
- Use Framer Motion sparingly if helpful for slot appearance, but keep animation optional/non-blocking (full animation polish can come with Task 22/23).

## Acceptance Criteria

- [ ] Renders placed events left-to-right using `EventCard` (revealed).
- [ ] Renders insertion slots at indices 0..N (both ends + between cards) with stable identifiers.
- [ ] Overflow scrolls horizontally without breaking layout.
- [ ] Exposes props/identifiers sufficient for dnd-kit (Task 22) and the game loop (Task 23) to consume.
- [ ] No drag logic embedded.
- [ ] `yarn build`, `yarn lint`, `yarn test` pass.

## Testing Requirements

- RTL unit test: given N placed events, renders N cards and N+1 slots with expected identifiers.

## Out of Scope

- dnd-kit integration (Task 22).
- Placement validation / state (Tasks 9, 23).

## Recommended Agent Capability

Strong coding model. The slot-index model is the contract dnd-kit and the game loop depend on; getting the N+1 slot indexing and identifiers right prevents downstream churn.
