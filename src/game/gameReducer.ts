import type { Event } from '../types';
import { validatePlacement } from './validatePlacement.ts';

/** The lifecycle status of a game. */
export type GameStatus = 'idle' | 'playing' | 'won' | 'lost';

/**
 * Details recorded when a game is lost. Consumed by the end-of-game screen
 * (Task 19) to explain what went wrong.
 */
export type GameFailure = {
  /** The event that was placed incorrectly, ending the game. */
  misplacedEvent: Event;
  /**
   * Number of events the player successfully placed, excluding the initial
   * seeded event (which is revealed for free at the start).
   */
  placedCount: number;
  /**
   * Number of events that were never successfully placed — the undrawn pool
   * plus the misplaced event itself.
   */
  remainingCount: number;
};

/**
 * The live game state. This is the single source of truth the play route and
 * game loop operate on.
 */
export type GameState = {
  /** Remaining events still to be drawn, in (already shuffled) draw order. */
  pool: Event[];
  /** The event currently being placed (date hidden in the UI), or null. */
  current: Event | null;
  /** Ordered array of successfully placed events (chronologically sorted). */
  timeline: Event[];
  /** The lifecycle status of the game. */
  status: GameStatus;
  /** On loss, the failure details; otherwise null. */
  failure: GameFailure | null;
};

/**
 * Actions that drive the game.
 *
 * `START_GAME` receives an **already-shuffled** pool so the reducer stays pure
 * and deterministic (shuffling is the caller's responsibility — see the action
 * creator in the provider).
 */
export type GameAction =
  | { type: 'START_GAME'; pool: Event[] }
  | { type: 'PLACE_CURRENT'; index: number }
  | { type: 'RESET' };

/** The initial, pre-game state. */
export const initialGameState: GameState = {
  pool: [],
  current: null,
  timeline: [],
  status: 'idle',
  failure: null,
};

/**
 * The game reducer.
 *
 * @pure
 * Given the same state and action it always returns the same next state and it
 * never mutates its inputs. Shuffling is done by the caller (passed into
 * `START_GAME`), never here.
 */
export const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'START_GAME': {
      const [seed, current, ...pool] = action.pool;

      // Not enough events to play (need a seed and at least one to place).
      if (!seed || !current) {
        return {
          pool: [],
          current: null,
          timeline: seed ? [seed] : [],
          status: seed ? 'won' : 'idle',
          failure: null,
        };
      }

      return {
        pool,
        current,
        timeline: [seed],
        status: 'playing',
        failure: null,
      };
    }

    case 'PLACE_CURRENT': {
      if (state.status !== 'playing' || !state.current) {
        return state;
      }

      const { current, timeline, pool } = state;
      const correct = validatePlacement(timeline, current, action.index);

      if (!correct) {
        return {
          ...state,
          status: 'lost',
          failure: {
            misplacedEvent: current,
            // Timeline includes the initial seeded event; exclude it.
            placedCount: timeline.length - 1,
            // The undrawn pool plus the event that was just misplaced.
            remainingCount: pool.length + 1,
          },
        };
      }

      const nextTimeline = [
        ...timeline.slice(0, action.index),
        current,
        ...timeline.slice(action.index),
      ];

      const [nextCurrent, ...restPool] = pool;

      // Pool exhausted and nothing left to draw → the player has won.
      if (!nextCurrent) {
        return {
          ...state,
          timeline: nextTimeline,
          current: null,
          pool: [],
          status: 'won',
        };
      }

      return {
        ...state,
        timeline: nextTimeline,
        current: nextCurrent,
        pool: restPool,
      };
    }

    case 'RESET':
      return initialGameState;

    default:
      return state;
  }
};
