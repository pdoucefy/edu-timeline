# Task 17: Event card component

## Goal

Build the presentational Event card: shows the event's image and name, and displays its date (year) either hidden (for the event being placed) or revealed (for events already on the timeline).

## Context

Product Spec ("Events"): an event has a name, date, and image. Technical Spec section 10 item 5: "Event card (image, name, hidden/visible date)". Only the **year** is displayed in the UI (full date is used only for validation, Task 9). The card is used both for the movable/unplaced event and for placed timeline events. This is a pure presentational component — no game logic.

## MVP Status

Required for MVP. It's the primary visual unit of gameplay.

## Dependencies

- Task 5 (Event type), Task 7 (image-path resolver + placeholder constant), Task 2 (theme), Task 12 (strings for alt/labels).

## Files / Areas Likely Affected

- New `EventCard` component under `src/components/`.
- Possibly a small `EventImage` subcomponent handling the placeholder fallback.

## Implementation Guidance

- Props: the `Event` plus a flag like `revealed: boolean` (or `dateHidden`) controlling whether the year is shown. Keep it a controlled, stateless presentational component.
- Display: image (via the Task 7 path resolver, `/events/<fileName>`), event name, and the **year only** when revealed. When hidden, show a placeholder for the date (e.g. "?" or a French label from the catalog).
- **Missing image handling** (spec section 6): if the image fails to load, render the placeholder image and `console.warn`. Implement the `onError` fallback here using the placeholder path from Task 7.
- Use a translated `alt` text (event name) and any date labels from the French catalog.
- Style with the theme; take cues from Wikitrivia's card look. The card should be usable as a draggable in Task 22, so avoid hardcoding drag behavior here — keep it purely visual and let the drag wrapper wrap it.
- Keep it accessible-friendly (meaningful `alt`, readable contrast); deeper a11y is Task 28.

## Acceptance Criteria

- [ ] Renders image, name, and year (or hidden state) based on props.
- [ ] Only the year is shown when revealed — never the full date.
- [ ] Broken image falls back to the placeholder and logs a console warning.
- [ ] Alt/labels come from the French catalog.
- [ ] Styled with theme tokens; no game logic inside.
- [ ] `yarn build`, `yarn lint`, `yarn test` pass.

## Testing Requirements

- RTL unit tests: renders name; hides year when not revealed and shows year when revealed; image `onError` swaps to placeholder.

## Out of Scope

- Drag behavior (Task 22).
- Timeline layout (Task 18).

## Recommended Agent Capability

Cheap coding model. Self-contained presentational component with a clear prop contract.
