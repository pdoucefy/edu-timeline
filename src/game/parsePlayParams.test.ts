import type { Event, SchoolYear } from '../types';
import {
  MIN_PLAYABLE_EVENTS,
  isDifficultyLevel,
  parseChapterIds,
  parsePlayParams,
} from './parsePlayParams.ts';

const evt = (id: number, year: number): Event => ({
  id,
  name: `Event ${id}`,
  date: new Date(year, 0, 1),
  fileName: '',
});

/**
 * Chapter 10 has 2 easy + 1 hard event; chapter 11 has 1 easy event only.
 * This lets us exercise the difficulty tiers and the too-few-events threshold.
 */
const buildMockYears = (): SchoolYear[] => [
  {
    id: 1,
    year: 2024,
    chapters: [
      {
        id: 10,
        chapterNumber: 1,
        events: { easy: [evt(100, 1900), evt(101, 1950)], hard: [evt(102, 1975)] },
      },
      {
        id: 11,
        chapterNumber: 2,
        events: { easy: [evt(110, 1800)], hard: [] },
      },
    ],
  },
];

describe('parseChapterIds', () => {
  test('parses a comma-separated list of numeric IDs', () => {
    expect(parseChapterIds('10,11,12')).toEqual([10, 11, 12]);
  });

  test('trims whitespace and drops empty segments', () => {
    expect(parseChapterIds(' 10 , , 11 ')).toEqual([10, 11]);
  });

  test('drops non-numeric segments', () => {
    expect(parseChapterIds('10,abc,11')).toEqual([10, 11]);
  });

  test('returns an empty array for undefined or empty input', () => {
    expect(parseChapterIds(undefined)).toEqual([]);
    expect(parseChapterIds('')).toEqual([]);
  });
});

describe('isDifficultyLevel', () => {
  test('accepts easy and hard', () => {
    expect(isDifficultyLevel('easy')).toBe(true);
    expect(isDifficultyLevel('hard')).toBe(true);
  });

  test('rejects anything else', () => {
    expect(isDifficultyLevel('medium')).toBe(false);
    expect(isDifficultyLevel('')).toBe(false);
    expect(isDifficultyLevel(undefined)).toBe(false);
  });
});

describe('parsePlayParams', () => {
  test('valid chapters + difficulty resolves a playable pool', () => {
    const result = parsePlayParams(buildMockYears(), { chapters: '10', difficulty: 'easy' });
    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.difficulty).toBe('easy');
      expect(result.chapters.map((c) => c.id)).toEqual([10]);
      // easy tier of chapter 10 → 2 events
      expect(result.pool).toHaveLength(2);
    }
  });

  test('hard difficulty includes both easy and hard tiers', () => {
    const result = parsePlayParams(buildMockYears(), { chapters: '10', difficulty: 'hard' });
    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.pool).toHaveLength(3);
    }
  });

  test('invalid when difficulty is missing', () => {
    expect(parsePlayParams(buildMockYears(), { chapters: '10' }).valid).toBe(false);
  });

  test('invalid when difficulty is not a DifficultyLevel', () => {
    expect(parsePlayParams(buildMockYears(), { chapters: '10', difficulty: 'medium' }).valid).toBe(
      false,
    );
  });

  test('invalid when chapters are missing', () => {
    expect(parsePlayParams(buildMockYears(), { difficulty: 'easy' }).valid).toBe(false);
  });

  test('invalid when no chapter IDs match the dataset', () => {
    expect(parsePlayParams(buildMockYears(), { chapters: '999', difficulty: 'easy' }).valid).toBe(
      false,
    );
  });

  test('invalid when the resolved pool has too few events', () => {
    // Chapter 11 easy has only 1 event, below MIN_PLAYABLE_EVENTS.
    const result = parsePlayParams(buildMockYears(), { chapters: '11', difficulty: 'easy' });
    expect(result.valid).toBe(false);
    expect(MIN_PLAYABLE_EVENTS).toBe(2);
  });

  test('handles repeated query keys by taking the first value', () => {
    const result = parsePlayParams(buildMockYears(), {
      chapters: ['10', '11'],
      difficulty: ['easy', 'hard'],
    });
    expect(result.valid).toBe(true);
    if (result.valid) {
      expect(result.chapters.map((c) => c.id)).toEqual([10]);
      expect(result.difficulty).toBe('easy');
    }
  });
});
