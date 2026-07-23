import { schoolYears } from '@/data/years.ts';
import { validatePlacement } from '@/game/validatePlacement.ts';
import type { Event } from '@/types';

/** Builds an event from a numeric id and an ISO date string. */
const event = (id: number, iso: string): Event => ({
  id,
  name: `Event ${id}`,
  date: new Date(iso),
  fileName: `${id}.svg`,
});

describe('validatePlacement', () => {
  // A simple ascending timeline used across the middle/start/end cases.
  const timeline: Event[] = [
    event(1, '2000-01-01T00:00:00Z'),
    event(2, '2010-01-01T00:00:00Z'),
    event(3, '2020-01-01T00:00:00Z'),
  ];

  describe('middle insertion', () => {
    it('accepts a correct middle insertion', () => {
      const inserted = event(99, '2005-01-01T00:00:00Z');
      // Between index 0 (2000) and index 1 (2010) → index 1.
      expect(validatePlacement(timeline, inserted, 1)).toBe(true);
    });

    it('rejects a middle insertion that is too early for its slot', () => {
      const inserted = event(99, '2005-01-01T00:00:00Z');
      // Slot between 2010 and 2020 (index 2) — 2005 is before the left neighbor.
      expect(validatePlacement(timeline, inserted, 2)).toBe(false);
    });

    it('rejects a middle insertion that is too late for its slot', () => {
      const inserted = event(99, '2015-01-01T00:00:00Z');
      // Slot between 2000 and 2010 (index 1) — 2015 is after the right neighbor.
      expect(validatePlacement(timeline, inserted, 1)).toBe(false);
    });
  });

  describe('start insertion', () => {
    it('accepts a valid insertion at the start', () => {
      const inserted = event(99, '1990-01-01T00:00:00Z');
      expect(validatePlacement(timeline, inserted, 0)).toBe(true);
    });

    it('rejects an invalid insertion at the start', () => {
      const inserted = event(99, '2005-01-01T00:00:00Z');
      // At index 0 the right neighbor is 2000, so 2005 is too late.
      expect(validatePlacement(timeline, inserted, 0)).toBe(false);
    });
  });

  describe('end insertion', () => {
    it('accepts a valid insertion at the end', () => {
      const inserted = event(99, '2030-01-01T00:00:00Z');
      expect(validatePlacement(timeline, inserted, timeline.length)).toBe(true);
    });

    it('rejects an invalid insertion at the end', () => {
      const inserted = event(99, '2015-01-01T00:00:00Z');
      // At the end the left neighbor is 2020, so 2015 is too early.
      expect(validatePlacement(timeline, inserted, timeline.length)).toBe(false);
    });
  });

  describe('tied (same full date) neighbors', () => {
    const tiedTimeline: Event[] = [
      event(1, '2000-01-01T00:00:00Z'),
      event(2, '2010-06-15T00:00:00Z'),
      event(3, '2020-01-01T00:00:00Z'),
    ];

    it('accepts an event with the same date placed on the left of its twin', () => {
      const inserted = event(99, '2010-06-15T00:00:00Z');
      // Insert before the twin at index 1.
      expect(validatePlacement(tiedTimeline, inserted, 1)).toBe(true);
    });

    it('accepts an event with the same date placed on the right of its twin', () => {
      const inserted = event(99, '2010-06-15T00:00:00Z');
      // Insert after the twin at index 2.
      expect(validatePlacement(tiedTimeline, inserted, 2)).toBe(true);
    });
  });

  describe('same year, different full dates', () => {
    // Two events in the same year (2010) but different months/days.
    const early = event(1, '2010-03-01T00:00:00Z');
    const late = event(2, '2010-09-01T00:00:00Z');
    const yearTimeline: Event[] = [early, late];

    it('does not round to year: the earlier date must precede the later one', () => {
      const inserted = event(99, '2010-06-01T00:00:00Z');
      // Correct slot is between the two (index 1).
      expect(validatePlacement(yearTimeline, inserted, 1)).toBe(true);
    });

    it('rejects placing a mid-year event before the earlier same-year event', () => {
      const inserted = event(99, '2010-06-01T00:00:00Z');
      // Index 0 puts it before the March event → invalid (June > March).
      expect(validatePlacement(yearTimeline, inserted, 0)).toBe(false);
    });

    it('rejects placing a mid-year event after the later same-year event', () => {
      const inserted = event(99, '2010-06-01T00:00:00Z');
      // Index 2 puts it after the September event → invalid (June < September).
      expect(validatePlacement(yearTimeline, inserted, 2)).toBe(false);
    });
  });

  describe('single-element timeline', () => {
    const single: Event[] = [event(1, '2010-01-01T00:00:00Z')];

    it('accepts an earlier event placed before the sole element', () => {
      expect(validatePlacement(single, event(99, '2000-01-01T00:00:00Z'), 0)).toBe(true);
    });

    it('accepts a later event placed after the sole element', () => {
      expect(validatePlacement(single, event(99, '2020-01-01T00:00:00Z'), 1)).toBe(true);
    });

    it('accepts an equal-date event on either side of the sole element', () => {
      const inserted = event(99, '2010-01-01T00:00:00Z');
      expect(validatePlacement(single, inserted, 0)).toBe(true);
      expect(validatePlacement(single, inserted, 1)).toBe(true);
    });

    it('rejects a later event placed before the sole element', () => {
      expect(validatePlacement(single, event(99, '2020-01-01T00:00:00Z'), 0)).toBe(false);
    });

    it('rejects an earlier event placed after the sole element', () => {
      expect(validatePlacement(single, event(99, '2000-01-01T00:00:00Z'), 1)).toBe(false);
    });
  });

  describe('empty timeline', () => {
    it('accepts any insertion into an empty timeline (no neighbors)', () => {
      expect(validatePlacement([], event(99, '2010-01-01T00:00:00Z'), 0)).toBe(true);
    });
  });

  describe('purity', () => {
    it('does not mutate its inputs', () => {
      const inserted = event(99, '2005-01-01T00:00:00Z');
      const snapshot = timeline.map((e) => ({ ...e, date: new Date(e.date.getTime()) }));

      validatePlacement(timeline, inserted, 1);

      expect(timeline).toEqual(snapshot);
      expect(inserted).toEqual(event(99, '2005-01-01T00:00:00Z'));
    });
  });

  describe('with real fixture data', () => {
    const [year2024, year2025] = schoolYears;

    it('enforces same-year/different-date ordering (ids 45 & 46, both 1870)', () => {
      const [chapter1] = year2025.chapters;
      // id 45 = 1870-09-01, id 46 = 1870-09-04 (same year, different day).
      const [sedan, republique] = [
        chapter1.events.easy.find((e) => e.id === 45)!,
        chapter1.events.easy.find((e) => e.id === 46)!,
      ];
      const line: Event[] = [sedan, republique];
      const between = event(999, '1870-09-02T00:00:00Z');

      expect(validatePlacement(line, between, 1)).toBe(true);
      expect(validatePlacement(line, between, 0)).toBe(false);
      expect(validatePlacement(line, between, 2)).toBe(false);
    });

    it('treats same full-date fixtures as interchangeable (ids 30 & 37, 1789-07-14)', () => {
      const [, , chapter3] = year2024.chapters;
      const bastille = chapter3.events.easy.find((e) => e.id === 30)!; // 1789-07-14
      const jeuDePaume = chapter3.events.hard.find((e) => e.id === 37)!; // 1789-07-14

      const line: Event[] = [bastille];

      // The identically-dated event is valid on either side of its twin.
      expect(validatePlacement(line, jeuDePaume, 0)).toBe(true);
      expect(validatePlacement(line, jeuDePaume, 1)).toBe(true);
    });
  });
});
