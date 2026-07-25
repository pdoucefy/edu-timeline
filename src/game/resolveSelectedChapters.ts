import type { Chapter, ID, SchoolYear } from '../types';

export type SelectionDescriptor =
  | { mode: 'single'; yearId: ID; chapterNumber: number }
  | { mode: 'summary'; yearId: ID; chapterNumber: number }
  | { mode: 'forFun' };

/**
 * Resolves a selection intent into the concrete set of chapters.
 *
 * - Single mode: returns exactly the chosen chapter.
 * - Summary mode: returns the chosen chapter plus all lower-numbered
 *   chapters in the same school year.
 * - For-fun mode: returns every chapter from every year.
 *
 */
export const resolveSelectedChapters = (
  years: SchoolYear[],
  selection: SelectionDescriptor,
): Chapter[] => {
  switch (selection.mode) {
    case 'single': {
      const year = years.find((y) => y.id === selection.yearId);
      if (!year) return [];
      const chapter = year.chapters.find((c) => c.chapterNumber === selection.chapterNumber);
      return chapter ? [chapter] : [];
    }
    case 'summary': {
      const year = years.find((y) => y.id === selection.yearId);
      if (!year) return [];
      return year.chapters.filter((c) => c.chapterNumber <= selection.chapterNumber);
    }
    case 'forFun':
      return years.flatMap((y) => y.chapters);
    default:
      return selection as never;
  }
};

/**
 * Serializes a list of chapters into an array of IDs suitable for URL encoding.
 *
 */
export const serializeChapters = (chapters: Chapter[]): ID[] => chapters.map((c) => c.id);

/**
 * Expands an array of chapter IDs back into the corresponding Chapter objects.
 * Invalid IDs are silently ignored, and chapters are returned in the order they
 * appear in the dataset (not the input order) with no duplicates.
 *
 */
export const expandChaptersFromIds = (years: SchoolYear[], ids: ID[]): Chapter[] => {
  const idSet = new Set(ids);
  const seen = new Set<ID>();
  const result: Chapter[] = [];

  for (const year of years) {
    for (const chapter of year.chapters) {
      if (idSet.has(chapter.id) && !seen.has(chapter.id)) {
        seen.add(chapter.id);
        result.push(chapter);
      }
    }
  }

  return result;
};
