# Task 7: Data loader and validation

## Goal

Provide a small module that exposes the static data to the rest of the app through a clean API, hydrating dates if needed and validating events (skipping invalid ones, flagging missing images).

## Context

The Technical Specification (section 6 "Edge Cases & Fallbacks") requires: invalid event data (bad date) is skipped with a non-intrusive toast; missing image files render a placeholder and log a warning. Rather than scatter this logic, centralize a loader/accessor that the selection and gameplay layers use. This also isolates the "raw data → typed, validated domain objects" seam.

## MVP Status

Required for MVP. Selection and gameplay both read data through this layer, and the invalid-data/missing-image handling is specified behavior.

## Dependencies

- Task 5 (types), Task 6 (data).

## Files / Areas Likely Affected

- New loader module (e.g. `src/data/loader.ts` or `src/data/index.ts`).
- Possibly a constants module for the placeholder image path.

## Implementation Guidance

- Expose functions such as: `getSchoolYears()`, `getChapterById(id)`, and a way to list years/chapters for the selection screen. Keep the API minimal and driven by what Tasks 10, 16, and 21 will need.
- **Date hydration:** if Task 6 stored dates as ISO strings, convert them to `Date` here; if they are already `Date`, pass through. Either way, downstream consumers should always receive `Date` objects (per the type).
- **Validation:** detect events with an invalid/unparseable date (`isNaN(date.getTime())`). Skip such events and collect a signal (e.g. return a `{ events, warnings }` shape or expose a `getLoadWarnings()`) so the UI can show the specified toast "Some events could not be loaded." Do NOT throw for a single bad event.
- **Missing image handling:** provide a helper that resolves an event's image path (`/events/<fileName>`) and a known placeholder path to fall back to. Actual DOM `onError` fallback + console warning happens in the Event card (Task 17) and error handling (Task 24); this task just centralizes the placeholder path constant and the resolution helper.
- Keep this pure and framework-agnostic (no React) so it is easy to unit test and usable from server components.

## Acceptance Criteria

- [ ] A loader module exposes typed accessors for years/chapters/events.
- [ ] Dates are guaranteed to be `Date` objects at the boundary.
- [ ] Events with invalid dates are skipped and surfaced as warnings (not thrown).
- [ ] An image-path resolver and a placeholder-path constant are exported.
- [ ] `yarn build`, `yarn lint`, and `yarn test` pass.

## Testing Requirements

- Unit tests (Jest): invalid-date event is skipped and reported; valid events pass through with `Date` values; image path resolution returns the expected `/events/...` string.

## Out of Scope

- Pool merging (Task 8) and placement validation (Task 9).
- UI rendering of placeholder image / toast (Tasks 17, 24).

## Recommended Agent Capability

Strong coding model. Establishes a clean seam and error-handling contract that many tasks depend on; worth getting the API shape right.
