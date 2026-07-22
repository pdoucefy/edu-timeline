import type { Chapter, DifficultyLevel, Event } from '../types';

/**
 * Merges the event pools of the selected chapters at the requested difficulty
 * tier and deduplicates by `event.id`.
 *
 * @param chapters   - The chapters whose events should be combined.
 * @param difficulty - The difficulty level to include.
 *                     `easy` selects base events only.
 *                     `hard` selects base events **plus** extra events.
 * @returns A merged, deduplicated, deterministic array of events.
 *
 * @pure
 * This function is pure: it has no side effects and returns the same output
 * for the same inputs.
 */
export const combineEventPools = (chapters: Chapter[], difficulty: DifficultyLevel): Event[] => {
  const seen = new Set<unknown>();
  const result: Event[] = [];

  const tiers: DifficultyLevel[] = difficulty === 'hard' ? ['easy', 'hard'] : ['easy'];

  for (const chapter of chapters) {
    for (const tier of tiers) {
      for (const event of chapter.events[tier] ?? []) {
        if (!seen.has(event.id)) {
          seen.add(event.id);
          result.push(event);
        }
      }
    }
  }

  return result;
};
