import type { Chapter } from './chapter';
import type { ID } from './id';

export type SchoolYear = {
  id: ID;
  year: number;
  chapters: Chapter[];
};
