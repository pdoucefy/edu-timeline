import { schoolYears } from '@/data/years.ts';
import { combineEventPools } from '@/lib/combineEventPools.ts';
import type { Chapter, Event } from '@/types';

const event = (id: number): Event => ({
  id,
  name: `Event ${id}`,
  date: new Date(`2024-01-${String(id).padStart(2, '0')}T00:00:00Z`),
  fileName: `${id}.svg`,
});

const chapter = (id: number, easyIds: number[], hardIds: number[] = []): Chapter => ({
  id,
  chapterNumber: id,
  events: {
    easy: easyIds.map(event),
    hard: hardIds.map(event),
  },
});

describe('combineEventPools', () => {
  it('returns base events only for easy difficulty', () => {
    const chapters = [chapter(1, [10, 11], [12, 13])];

    const pool = combineEventPools(chapters, 'easy');

    expect(pool.map((e) => e.id)).toEqual([10, 11]);
  });

  it('returns base + extra events for hard difficulty', () => {
    const chapters = [chapter(1, [10, 11], [12, 13])];

    const pool = combineEventPools(chapters, 'hard');

    expect(pool.map((e) => e.id)).toEqual([10, 11, 12, 13]);
  });

  it('merges events from multiple chapters', () => {
    const chapters = [chapter(1, [10, 11]), chapter(2, [20, 21])];

    const pool = combineEventPools(chapters, 'easy');

    expect(pool.map((e) => e.id)).toEqual([10, 11, 20, 21]);
  });

  it('merges hard tiers across multiple chapters', () => {
    const chapters = [chapter(1, [10], [11]), chapter(2, [20], [21])];

    const pool = combineEventPools(chapters, 'hard');

    expect(pool.map((e) => e.id)).toEqual([10, 11, 20, 21]);
  });

  it('removes cross-chapter duplicates by id', () => {
    const chapters = [
      chapter(1, [10, 11]),
      chapter(2, [11, 20]), // 11 is duplicated
    ];

    const pool = combineEventPools(chapters, 'easy');

    expect(pool.map((e) => e.id)).toEqual([10, 11, 20]);
  });

  it('removes duplicates across easy and hard tiers', () => {
    const chapters = [
      chapter(1, [10, 11], [11, 12]), // 11 appears in both tiers
    ];

    const pool = combineEventPools(chapters, 'hard');

    expect(pool.map((e) => e.id)).toEqual([10, 11, 12]);
  });

  it('returns an empty pool when no chapters are selected', () => {
    expect(combineEventPools([], 'easy')).toEqual([]);
    expect(combineEventPools([], 'hard')).toEqual([]);
  });

  it('returns an empty pool when all event arrays are empty', () => {
    const chapters = [chapter(1, []), chapter(2, [])];

    expect(combineEventPools(chapters, 'easy')).toEqual([]);
    expect(combineEventPools(chapters, 'hard')).toEqual([]);
  });

  it('produces deterministic output and does not shuffle', () => {
    const chapters = [chapter(1, [10, 11], [12]), chapter(2, [20, 21], [22])];

    const first = combineEventPools(chapters, 'hard');
    const second = combineEventPools(chapters, 'hard');

    expect(first.map((e) => e.id)).toEqual([10, 11, 12, 20, 21, 22]);
    expect(second.map((e) => e.id)).toEqual([10, 11, 12, 20, 21, 22]);
    expect(first).toEqual(second);
  });

  it('uses first-occurrence-wins for duplicates', () => {
    const e1 = event(99);
    const e2 = { ...e1, name: 'Different Name' }; // same id, different name

    const chapters: Chapter[] = [
      {
        id: 1,
        chapterNumber: 1,
        events: { easy: [e1], hard: [] },
      },
      {
        id: 2,
        chapterNumber: 2,
        events: { easy: [e2], hard: [] },
      },
    ];

    const pool = combineEventPools(chapters, 'easy');

    expect(pool).toHaveLength(1);
    expect(pool[0].name).toBe('Event 99'); // first occurrence wins
  });

  describe('with real fixture data (cross-chapter duplicate)', () => {
    it('deduplicates the real duplicate event id 50 across chapters', () => {
      const [, year2025] = schoolYears;
      const [, chapter7, chapter8] = year2025.chapters;

      const pool = combineEventPools([chapter7, chapter8], 'easy');

      const ids = pool.map((e: Event) => e.id);
      expect(ids.filter((id: number) => id === 50)).toHaveLength(1);
    });
  });
});
