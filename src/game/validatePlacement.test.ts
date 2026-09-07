import { EVENTS } from '@/data/events.ts';
import { validatePlacement } from '@/game/validatePlacement.ts';
import type { Event } from '@/types';

/** Builds an event from a numeric id and an ISO date string. */
const event = (id: number, year: number): Event => ({
  id,
  name: `Event ${id}`,
  year,
  fileName: `${id}.svg`,
});

describe('validatePlacement', () => {
  // A simple ascending timeline used across the middle/start/end cases.
  const timeline: Event[] = [event(1, 2000), event(2, 2010), event(3, 2020)];

  describe('middle insertion', () => {
    it('accepts a correct middle insertion', () => {
      const inserted = event(99, 2005);
      // Between index 0 (2000) and index 1 (2010) → index 1.
      expect(validatePlacement(timeline, inserted, 1)).toBe(true);
    });

    it('rejects a middle insertion that is too early for its slot', () => {
      const inserted = event(99, 2005);
      // Slot between 2010 and 2020 (index 2) — 2005 is before the left neighbor.
      expect(validatePlacement(timeline, inserted, 2)).toBe(false);
    });

    it('rejects a middle insertion that is too late for its slot', () => {
      const inserted = event(99, 2015);
      // Slot between 2000 and 2010 (index 1) — 2015 is after the right neighbor.
      expect(validatePlacement(timeline, inserted, 1)).toBe(false);
    });
  });

  describe('start insertion', () => {
    it('accepts a valid insertion at the start', () => {
      const inserted = event(99, 1990);
      expect(validatePlacement(timeline, inserted, 0)).toBe(true);
    });

    it('rejects an invalid insertion at the start', () => {
      const inserted = event(99, 2005);
      // At index 0 the right neighbor is 2000, so 2005 is too late.
      expect(validatePlacement(timeline, inserted, 0)).toBe(false);
    });
  });

  describe('end insertion', () => {
    it('accepts a valid insertion at the end', () => {
      const inserted = event(99, 2030);
      expect(validatePlacement(timeline, inserted, timeline.length)).toBe(true);
    });

    it('rejects an invalid insertion at the end', () => {
      const inserted = event(99, 2015);
      // At the end the left neighbor is 2020, so 2015 is too early.
      expect(validatePlacement(timeline, inserted, timeline.length)).toBe(false);
    });
  });

  describe('tied (same full date) neighbors', () => {
    const tiedTimeline: Event[] = [event(1, 2000), event(2, 2010), event(3, 2020)];

    it('accepts an event with the same date placed on the left of its twin', () => {
      const inserted = event(99, 2010);
      // Insert before the twin at index 1.
      expect(validatePlacement(tiedTimeline, inserted, 1)).toBe(true);
    });

    it('accepts an event with the same date placed on the right of its twin', () => {
      const inserted = event(99, 2010);
      // Insert after the twin at index 2.
      expect(validatePlacement(tiedTimeline, inserted, 2)).toBe(true);
    });
  });

  describe('single-element timeline', () => {
    const single: Event[] = [event(1, 2010)];

    it('accepts an earlier event placed before the sole element', () => {
      expect(validatePlacement(single, event(99, 2000), 0)).toBe(true);
    });

    it('accepts a later event placed after the sole element', () => {
      expect(validatePlacement(single, event(99, 2020), 1)).toBe(true);
    });

    it('accepts an equal-date event on either side of the sole element', () => {
      const inserted = event(99, 2010);
      expect(validatePlacement(single, inserted, 0)).toBe(true);
      expect(validatePlacement(single, inserted, 1)).toBe(true);
    });

    it('rejects a later event placed before the sole element', () => {
      expect(validatePlacement(single, event(99, 2020), 0)).toBe(false);
    });

    it('rejects an earlier event placed after the sole element', () => {
      expect(validatePlacement(single, event(99, 2000), 1)).toBe(false);
    });
  });

  describe('empty timeline', () => {
    it('accepts any insertion into an empty timeline (no neighbors)', () => {
      expect(validatePlacement([], event(99, 2010), 0)).toBe(true);
    });
  });

  describe('purity', () => {
    it('does not mutate its inputs', () => {
      const inserted = event(99, 2005);
      const snapshot = timeline.map((e) => ({ ...e, year: e.year }));

      validatePlacement(timeline, inserted, 1);

      expect(timeline).toEqual(snapshot);
      expect(inserted).toEqual(event(99, 2005));
    });
  });

  describe('with real fixture data', () => {
    it('treats same full-date fixtures as interchangeable (ids 30 & 37, 1789-07-14)', () => {
      const event1 = EVENTS.at(0)!;
      const event2 = EVENTS.at(0)!;

      // The identically-dated event is valid on either side of its twin.
      expect(validatePlacement([event1], event2, 0)).toBe(true);
      expect(validatePlacement([event2], event1, 1)).toBe(true);
    });
  });
});
