import type { DifficultyLevel } from './difficultyLevel';
import type { Event } from './event';
import type { ID } from './id';

export type Chapter = {
  id: ID;
  chapterNumber: number;
  events: Record<DifficultyLevel, Event[]>;
};
