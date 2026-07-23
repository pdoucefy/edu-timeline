import type { Event } from '../types';

/**
 * Determines whether an event was placed in a chronologically valid position
 * on the timeline.
 *
 * Validation always compares the **full `Date`** objects (via
 * `Date.getTime()`), even though the UI displays only years. Two events that
 * share the same full date are interchangeable and may be placed in either
 * order relative to one another.
 *
 * @param timeline - The current timeline, an array of placed events already
 *                   sorted in ascending chronological order.
 * @param inserted - The event being inserted.
 * @param index    - The insertion index, `0..N` where `N === timeline.length`.
 *                   The inserted event lands between `timeline[index - 1]`
 *                   (its left neighbor, if any) and `timeline[index]` (its
 *                   right neighbor, if any). Index `0` inserts at the start,
 *                   index `N` inserts at the end.
 * @returns `true` when the placement is chronologically correct.
 *
 * The placement is valid when the inserted event's date is `>=` the left
 * neighbor (if one exists) **and** `<=` the right neighbor (if one exists).
 * Open ends (start/end of the timeline, or an empty/single-element timeline)
 * are always valid on the side that has no neighbor. Because the comparison
 * uses `<=`/`>=`, an event whose date equals a neighbor is accepted on either
 * side, satisfying the "same full date is interchangeable" requirement.
 *
 * @pure
 * This function is pure: it does not mutate its inputs and returns the same
 * output for the same inputs.
 */
export const validatePlacement = (timeline: Event[], inserted: Event, index: number): boolean => {
  const insertedTime = inserted.date.getTime();

  const left = index > 0 ? timeline[index - 1] : undefined;
  const right = index < timeline.length ? timeline[index] : undefined;

  const afterLeft = !left || left.date.getTime() <= insertedTime;
  const beforeRight = !right || insertedTime <= right.date.getTime();

  return afterLeft && beforeRight;
};
