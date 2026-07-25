import type { Chapter, SchoolYear } from '../types';
import {
  expandChaptersFromIds,
  resolveSelectedChapters,
  serializeChapters,
} from './resolveSelectedChapters.ts';

const buildMockYears = (): SchoolYear[] => [
  {
    id: 1,
    year: 2024,
    chapters: [
      {
        id: 10,
        chapterNumber: 1,
        events: { easy: [], hard: [] },
      },
      {
        id: 11,
        chapterNumber: 2,
        events: { easy: [], hard: [] },
      },
      {
        id: 12,
        chapterNumber: 3,
        events: { easy: [], hard: [] },
      },
    ],
  },
  {
    id: 2,
    year: 2025,
    chapters: [
      {
        id: 20,
        chapterNumber: 1,
        events: { easy: [], hard: [] },
      },
      {
        id: 21,
        chapterNumber: 2,
        events: { easy: [], hard: [] },
      },
    ],
  },
];

describe('resolveSelectedChapters', () => {
  test('single mode returns exactly the chosen chapter', () => {
    const years = buildMockYears();
    const result = resolveSelectedChapters(years, {
      mode: 'single',
      yearId: 1,
      chapterNumber: 2,
    });
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(11);
  });

  test('single mode returns empty array when year not found', () => {
    const years = buildMockYears();
    const result = resolveSelectedChapters(years, {
      mode: 'single',
      yearId: 999,
      chapterNumber: 1,
    });
    expect(result).toEqual([]);
  });

  test('single mode returns empty array when chapter not found', () => {
    const years = buildMockYears();
    const result = resolveSelectedChapters(years, {
      mode: 'single',
      yearId: 1,
      chapterNumber: 99,
    });
    expect(result).toEqual([]);
  });

  test('summary mode at chapter 3 returns chapters 1, 2, 3 of that year and nothing from other years', () => {
    const years = buildMockYears();
    const result = resolveSelectedChapters(years, {
      mode: 'summary',
      yearId: 1,
      chapterNumber: 3,
    });
    expect(result.map((c) => c.id)).toEqual([10, 11, 12]);
  });

  test('summary mode at chapter 1 returns just chapter 1', () => {
    const years = buildMockYears();
    const result = resolveSelectedChapters(years, {
      mode: 'summary',
      yearId: 1,
      chapterNumber: 1,
    });
    expect(result.map((c) => c.id)).toEqual([10]);
  });

  test('summary mode respects year boundary and does not include chapters from other years', () => {
    const years = buildMockYears();
    const result = resolveSelectedChapters(years, {
      mode: 'summary',
      yearId: 2,
      chapterNumber: 2,
    });
    expect(result.map((c) => c.id)).toEqual([20, 21]);
  });

  test('summary mode returns empty array when year not found', () => {
    const years = buildMockYears();
    const result = resolveSelectedChapters(years, {
      mode: 'summary',
      yearId: 999,
      chapterNumber: 2,
    });
    expect(result).toEqual([]);
  });

  test('for-fun mode returns all chapters across all years', () => {
    const years = buildMockYears();
    const result = resolveSelectedChapters(years, { mode: 'forFun' });
    expect(result).toHaveLength(5);
    expect(result.map((c) => c.id)).toEqual([10, 11, 12, 20, 21]);
  });

  test('for-fun mode on empty years returns empty array', () => {
    const result = resolveSelectedChapters([], { mode: 'forFun' });
    expect(result).toEqual([]);
  });
});

describe('serializeChapters', () => {
  test('maps chapters to their IDs', () => {
    const chapters: Chapter[] = [
      { id: 1, chapterNumber: 1, events: { easy: [], hard: [] } },
      { id: 2, chapterNumber: 2, events: { easy: [], hard: [] } },
    ];
    expect(serializeChapters(chapters)).toEqual([1, 2]);
  });

  test('returns empty array for empty input', () => {
    expect(serializeChapters([])).toEqual([]);
  });
});

describe('expandChaptersFromIds', () => {
  test('round-trips with resolveSelectedChapters for single mode', () => {
    const years = buildMockYears();
    const selected = resolveSelectedChapters(years, {
      mode: 'single',
      yearId: 2,
      chapterNumber: 1,
    });
    const ids = serializeChapters(selected);
    const expanded = expandChaptersFromIds(years, ids);
    expect(expanded.map((c) => c.id)).toEqual([20]);
  });

  test('round-trips with resolveSelectedChapters for summary mode', () => {
    const years = buildMockYears();
    const selected = resolveSelectedChapters(years, {
      mode: 'summary',
      yearId: 1,
      chapterNumber: 2,
    });
    const ids = serializeChapters(selected);
    const expanded = expandChaptersFromIds(years, ids);
    expect(expanded.map((c) => c.id)).toEqual([10, 11]);
  });

  test('round-trips with resolveSelectedChapters for for-fun mode', () => {
    const years = buildMockYears();
    const selected = resolveSelectedChapters(years, { mode: 'forFun' });
    const ids = serializeChapters(selected);
    const expanded = expandChaptersFromIds(years, ids);
    expect(expanded.map((c) => c.id)).toEqual([10, 11, 12, 20, 21]);
  });

  test('ignores invalid IDs silently', () => {
    const years = buildMockYears();
    const result = expandChaptersFromIds(years, [10, 999, 21]);
    expect(result.map((c) => c.id)).toEqual([10, 21]);
  });

  test('does not return duplicate chapters', () => {
    const years = buildMockYears();
    const result = expandChaptersFromIds(years, [10, 10, 11]);
    expect(result.map((c) => c.id)).toEqual([10, 11]);
  });

  test('returns empty array when no IDs match', () => {
    const years = buildMockYears();
    expect(expandChaptersFromIds(years, [99, 999])).toEqual([]);
  });
});
