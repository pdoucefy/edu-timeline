import { combineEventPools } from '../lib/combineEventPools.ts';
import type { Chapter, DifficultyLevel, Event, ID, SchoolYear } from '../types';
import { expandChaptersFromIds } from './resolveSelectedChapters.ts';

/**
 * Minimum number of events a resolved pool must contain to be playable: one to
 * seed the timeline and at least one to place. Below this, the play params are
 * treated as invalid and the user is redirected to the selection screen.
 */
export const MIN_PLAYABLE_EVENTS = 2;

/**
 * The raw, request-time values read from the `/play` query string. Both are
 * optional and may be arrays (Next.js allows repeated query keys), so the parser
 * defensively narrows them.
 */
export type RawPlayParams = {
  chapters?: string | string[];
  difficulty?: string | string[];
};

/** A successfully-validated set of play parameters, ready to start a game. */
export type ValidPlayParams = {
  chapters: Chapter[];
  difficulty: DifficultyLevel;
  /** The resolved, deduplicated (unshuffled) event pool. */
  pool: Event[];
};

/** The result of parsing/validating the `/play` query parameters: either a valid playable configuration, or an invalid marker signalling a redirect. */
export type ParsePlayParamsResult = ({ valid: true } & ValidPlayParams) | { valid: false };

const VALID_DIFFICULTIES: readonly DifficultyLevel[] = ['easy', 'hard'];

/** Narrows a possibly-repeated query value to its single string form. */
const firstValue = (value?: string | string[]): string | undefined =>
  Array.isArray(value) ? value[0] : value;

/**
 * Parses the comma-separated `chapters` query value into a list of numeric IDs.
 * Empty, whitespace-only, or non-numeric segments are dropped.
 */
export const parseChapterIds = (raw?: string): ID[] =>
  raw
    ?.split(',')
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0)
    .map((segment) => Number(segment))
    .filter((id) => Number.isInteger(id)) ?? [];

/** Type guard for the {@link DifficultyLevel} union. */
export const isDifficultyLevel = (value?: string): value is DifficultyLevel =>
  value !== undefined && (VALID_DIFFICULTIES as readonly string[]).includes(value);

/**
 * Parses and validates the `/play` query parameters against the loaded dataset.
 *
 * @pure Given the same `years` and `raw` params it always returns the same
 * result and never mutates its inputs.
 *
 * The params are considered **valid** only when all of the following hold:
 * - `difficulty` is a valid {@link DifficultyLevel} (`easy` | `hard`);
 * - `chapters` resolves to at least one real {@link Chapter} in the dataset;
 * - the combined event pool has at least {@link MIN_PLAYABLE_EVENTS} events.
 *
 * Otherwise the result is `{ valid: false }`, signalling a redirect to the
 * selection screen.
 */
export const parsePlayParams = (years: SchoolYear[], raw: RawPlayParams): ParsePlayParamsResult => {
  const difficulty = firstValue(raw.difficulty);
  if (!isDifficultyLevel(difficulty)) return { valid: false };

  const ids = parseChapterIds(firstValue(raw.chapters));
  const chapters = expandChaptersFromIds(years, ids);
  if (chapters.length === 0) return { valid: false };

  const pool = combineEventPools(chapters, difficulty);
  if (pool.length < MIN_PLAYABLE_EVENTS) return { valid: false };

  return { valid: true, chapters, difficulty, pool };
};
