import type { Chapter, DifficultyLevel, Event, ID, SchoolYear } from '../types';

export type LoadWarning = {
  type: 'invalid_date';
  eventId: ID;
  eventName: string;
  reason: string;
};

export type LoadResult = {
  years: SchoolYear[];
  warnings: LoadWarning[];
};

export const PLACEHOLDER_IMAGE_PATH = '/events/placeholder.svg';

type RawEvent = {
  id: ID;
  name: string;
  date: unknown;
  fileName: string;
};

type RawChapter = {
  id: ID;
  chapterNumber: number;
  events: Record<DifficultyLevel, RawEvent[]>;
};

type RawSchoolYear = {
  id: ID;
  year: number;
  chapters: RawChapter[];
};

const hydrateDate = (raw: unknown): Date | null => {
  let date: Date;

  if (raw instanceof Date) {
    date = raw;
  } else if (typeof raw === 'string') {
    date = new Date(raw);
  } else if (typeof raw === 'number') {
    date = new Date(raw);
  } else {
    return null;
  }

  return Number.isNaN(date.getTime()) ? null : date;
};

const validateAndHydrateEvent = (
  rawEvent: RawEvent,
): { event: Event | null; warning: LoadWarning | null } => {
  const date = hydrateDate(rawEvent.date);

  if (date === null) {
    return {
      event: null,
      warning: {
        type: 'invalid_date',
        eventId: rawEvent.id,
        eventName: rawEvent.name,
        reason: 'Date is invalid or unparseable',
      },
    };
  }

  return {
    event: {
      id: rawEvent.id,
      name: rawEvent.name,
      date,
      fileName: rawEvent.fileName,
    },
    warning: null,
  };
};

export const load = (rawYears: RawSchoolYear[]): LoadResult => {
  const warnings: LoadWarning[] = [];
  const years: SchoolYear[] = [];

  for (const rawYear of rawYears) {
    const chapters: Chapter[] = [];

    for (const rawChapter of rawYear.chapters) {
      const events: Record<DifficultyLevel, Event[]> = {
        easy: [],
        hard: [],
      };

      for (const difficulty of ['easy', 'hard'] as DifficultyLevel[]) {
        for (const rawEvent of rawChapter.events[difficulty] ?? []) {
          const { event, warning } = validateAndHydrateEvent(rawEvent);

          if (warning) {
            warnings.push(warning);
          }

          if (event) {
            events[difficulty].push(event);
          }
        }
      }

      chapters.push({
        id: rawChapter.id,
        chapterNumber: rawChapter.chapterNumber,
        events,
      });
    }

    years.push({
      id: rawYear.id,
      year: rawYear.year,
      chapters,
    });
  }

  return { years, warnings };
};

export const resolveImagePath = (fileName: string): string => {
  if (!fileName) {
    return PLACEHOLDER_IMAGE_PATH;
  }

  if (fileName.startsWith('/')) {
    return fileName;
  }

  return `/events/${fileName}`;
};

let _loaded: LoadResult | null = null;

export const initLoader = (rawYears: RawSchoolYear[]): LoadResult => {
  _loaded = load(rawYears);
  return _loaded;
};

const ensureLoaded = (): LoadResult => {
  if (!_loaded) {
    throw new Error('Loader not initialized. Call initLoader() first.');
  }

  return _loaded;
};

export const getSchoolYears = (): SchoolYear[] => ensureLoaded().years;

export const getLoadWarnings = (): LoadWarning[] => ensureLoaded().warnings;

export const getSchoolYearById = (id: ID): SchoolYear | undefined =>
  getSchoolYears().find((y) => y.id === id);

export const getChapterById = (id: ID): Chapter | undefined => {
  for (const year of getSchoolYears()) {
    const chapter = year.chapters.find((c) => c.id === id);

    if (chapter) {
      return chapter;
    }
  }

  return undefined;
};

export const listYears = (): Array<{ id: ID; year: number }> =>
  getSchoolYears().map((y) => ({ id: y.id, year: y.year }));

export const listChaptersByYearId = (yearId: ID): Array<{ id: ID; chapterNumber: number }> => {
  const year = getSchoolYearById(yearId);

  if (!year) {
    return [];
  }

  return year.chapters.map((c) => ({ id: c.id, chapterNumber: c.chapterNumber }));
};

export const getEventsByChapterAndDifficulty = (
  chapterId: ID,
  difficulty: DifficultyLevel,
): Event[] => {
  const chapter = getChapterById(chapterId);

  if (!chapter) {
    return [];
  }

  return chapter.events[difficulty] ?? [];
};
