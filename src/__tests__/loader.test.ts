import {
  PLACEHOLDER_IMAGE_PATH,
  getChapterById,
  getEventsByChapterAndDifficulty,
  getLoadWarnings,
  getSchoolYearById,
  getSchoolYears,
  initLoader,
  listChaptersByYearId,
  listYears,
  load,
  resolveImagePath,
} from '@/data/loader.ts';
import { schoolYears } from '@/data/years.ts';
import type { DifficultyLevel, SchoolYear } from '@/types';

describe('load', () => {
  it('skips events with invalid dates and reports warnings', () => {
    const raw = [
      {
        id: 1,
        year: 2024,
        chapters: [
          {
            id: 2,
            chapterNumber: 1,
            events: {
              easy: [
                {
                  id: 10,
                  name: 'Valid Event',
                  date: new Date('2024-06-15'),
                  fileName: 'valid.svg',
                },
                {
                  id: 11,
                  name: 'Invalid Event',
                  date: new Date('not-a-date'),
                  fileName: 'invalid.svg',
                },
              ],
              hard: [],
            },
          },
        ],
      },
    ];

    const { years, warnings } = load(raw);

    expect(years).toHaveLength(1);
    expect(years[0].chapters[0].events.easy).toHaveLength(1);
    expect(years[0].chapters[0].events.easy[0].id).toBe(10);

    expect(warnings).toHaveLength(1);
    expect(warnings[0].type).toBe('invalid_date');
    expect(warnings[0].eventId).toBe(11);
    expect(warnings[0].eventName).toBe('Invalid Event');
  });

  it('hydrates ISO-string dates into Date objects', () => {
    const raw = [
      {
        id: 1,
        year: 2024,
        chapters: [
          {
            id: 2,
            chapterNumber: 1,
            events: {
              easy: [
                {
                  id: 10,
                  name: 'String Date Event',
                  date: '1989-11-09',
                  fileName: 'string.svg',
                },
              ],
              hard: [],
            },
          },
        ],
      },
    ];

    const { years, warnings } = load(raw);

    expect(warnings).toHaveLength(0);
    expect(years[0].chapters[0].events.easy).toHaveLength(1);

    const [event] = years[0].chapters[0].events.easy;
    expect(event.date).toBeInstanceOf(Date);
    expect(event.date.toISOString().startsWith('1989-11-09')).toBe(true);
  });

  it('passes through valid Date objects unchanged', () => {
    const validDate = new Date('1066-10-14');

    const raw = [
      {
        id: 1,
        year: 1066,
        chapters: [
          {
            id: 2,
            chapterNumber: 1,
            events: {
              easy: [
                {
                  id: 10,
                  name: 'Valid Date Event',
                  date: validDate,
                  fileName: 'valid.svg',
                },
              ],
              hard: [],
            },
          },
        ],
      },
    ];

    const { years } = load(raw);

    expect(years[0].chapters[0].events.easy[0].date).toEqual(validDate);
  });

  it('does not throw for a single bad event', () => {
    const raw = [
      {
        id: 1,
        year: 2024,
        chapters: [
          {
            id: 2,
            chapterNumber: 1,
            events: {
              easy: [
                {
                  id: 99,
                  name: 'Bad Event',
                  date: new Date('invalid'),
                  fileName: 'bad.svg',
                },
              ],
              hard: [],
            },
          },
        ],
      },
    ];

    expect(() => load(raw)).not.toThrow();
  });
});

describe('resolveImagePath', () => {
  it('resolves a plain fileName to /events/<fileName>', () => {
    expect(resolveImagePath('placeholder.svg')).toBe('/events/placeholder.svg');
    expect(resolveImagePath('battle.jpg')).toBe('/events/battle.jpg');
  });

  it('returns the path unchanged if already absolute', () => {
    expect(resolveImagePath('/events/placeholder.svg')).toBe('/events/placeholder.svg');
  });

  it('falls back to the placeholder for an empty fileName', () => {
    expect(resolveImagePath('')).toBe(PLACEHOLDER_IMAGE_PATH);
  });
});

describe('singleton accessors with real data', () => {
  beforeAll(() => {
    initLoader(schoolYears);
  });

  it('getSchoolYears returns an array of SchoolYear objects', () => {
    const years = getSchoolYears();
    expect(Array.isArray(years)).toBe(true);
    expect(years.length).toBeGreaterThan(0);
    expect(years[0]).toHaveProperty('year');
    expect(years[0]).toHaveProperty('chapters');
  });

  it('getLoadWarnings returns an array (empty for valid data)', () => {
    const warnings = getLoadWarnings();
    expect(Array.isArray(warnings)).toBe(true);
  });

  it('dates downstream are always Date objects', () => {
    getSchoolYears().forEach((year: SchoolYear) => {
      year.chapters.forEach((chapter) => {
        (['easy', 'hard'] as DifficultyLevel[]).forEach((difficulty) => {
          chapter.events[difficulty].forEach((event) => {
            expect(event.date).toBeInstanceOf(Date);
            expect(Number.isNaN(event.date.getTime())).toBe(false);
          });
        });
      });
    });
  });

  it('getChapterById finds a chapter', () => {
    const years = getSchoolYears();
    const chapterId = years[0].chapters[0].id;
    const chapter = getChapterById(chapterId);
    expect(chapter).toBeDefined();
    expect(chapter!.id).toBe(chapterId);
  });

  it('getChapterById returns undefined for unknown id', () => {
    expect(getChapterById(999_999)).toBeUndefined();
  });

  it('getSchoolYearById finds a year', () => {
    const year = getSchoolYearById(1);
    expect(year).toBeDefined();
    expect(year!.id).toBe(1);
  });

  it('listYears returns year summaries', () => {
    const years = listYears();
    expect(years.length).toBeGreaterThan(0);
    expect(years[0]).toHaveProperty('id');
    expect(years[0]).toHaveProperty('year');
  });

  it('listChaptersByYearId returns chapters for a given year', () => {
    const chapters = listChaptersByYearId(1);
    expect(chapters.length).toBeGreaterThan(0);
    expect(chapters[0]).toHaveProperty('id');
    expect(chapters[0]).toHaveProperty('chapterNumber');
  });

  it('getEventsByChapterAndDifficulty returns events', () => {
    const years = getSchoolYears();
    const chapterId = years[0].chapters[0].id;
    const events = getEventsByChapterAndDifficulty(chapterId, 'easy');
    expect(Array.isArray(events)).toBe(true);

    if (events.length > 0) {
      expect(events[0]).toHaveProperty('date');
      expect(events[0].date).toBeInstanceOf(Date);
    }
  });
});
