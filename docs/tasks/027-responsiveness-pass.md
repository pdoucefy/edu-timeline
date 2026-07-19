# Task 27: Responsiveness pass (nice-to-have)

## Goal

Review and improve the app's layout so it degrades gracefully on small viewports, applying responsive styling across the home, selection, play, and end-of-game screens.

## Context

Product Spec ("Responsiveness") and Technical Spec section 7: mobile support is a **nice-to-have**; primary target is desktop, and the app may be limited on mobile. Section 10 asks each UI task to keep responsiveness in mind, and this task is the consolidated pass to catch what individual component tasks left rough — especially the horizontally-growing timeline.

## MVP Status

Nice-to-have. Explicitly optional per the client; desktop is the priority.

## Dependencies

- The UI tasks it touches: Tasks 13, 15, 16, 17, 18, 19 (and ideally 23 for the play surface).

## Files / Areas Likely Affected

- Styled components across header, home, selection, timeline, event card, end screen.
- The theme (Task 2) if shared breakpoints/tokens should be centralized.

## Implementation Guidance

- Add responsive breakpoints to the theme (Task 2) if not already present, and use them consistently rather than ad-hoc media queries.
- Prioritize: header/logo scaling, selection screen usability on narrow screens, the **timeline** (horizontal scroll + touch-friendly targets), event card sizing, and the end screen.
- Accept graceful degradation on mobile — the drag-and-drop game need not be perfect on touch. Ensure nothing is broken/overlapping or off-screen; content should remain readable and reachable.
- Don't over-engineer a mobile-first redesign; the goal is "usable and not broken" on smaller screens per the client's expectation.

## Acceptance Criteria

- [ ] Home, selection, play, and end screens have no broken/overlapping layout at common small widths (e.g. ~375px) and desktop.
- [ ] Timeline scrolls horizontally and remains usable on narrow viewports.
- [ ] Shared breakpoints are used (centralized in the theme) rather than scattered magic numbers.
- [ ] `yarn build`, `yarn lint` pass.

## Testing Requirements

- Manual: resize the browser / use device emulation across screens.
- Cypress (Task 29) includes a desktop-vs-forced-mobile layout check.

## Out of Scope

- Perfect touch drag-and-drop UX.
- Accessibility hardening (Task 28).

## Recommended Agent Capability

Cheap coding model. CSS/layout refinement with visual verification; no complex logic.
