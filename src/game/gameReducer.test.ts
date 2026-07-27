import { gameReducer, initialGameState } from '@/game/gameReducer.ts';
import type { GameState } from '@/game/gameReducer.ts';
import type { Event } from '@/types';

/** Builds an event from a numeric id and an ISO date string. */
const event = (id: number, iso: string): Event => ({
  id,
  name: `Event ${id}`,
  date: new Date(iso),
  fileName: `${id}.svg`,
});

// An already-sorted, deterministic pool. The reducer receives the pool exactly
// as passed (shuffling happens in the provider, never in the reducer), so tests
// can rely on this ordering: seed = 2000, then 2010, 2020, 2030 are drawn.
const orderedPool: Event[] = [
  event(1, '2000-01-01T00:00:00Z'),
  event(2, '2010-01-01T00:00:00Z'),
  event(3, '2020-01-01T00:00:00Z'),
  event(4, '2030-01-01T00:00:00Z'),
];

const startedState = (): GameState =>
  gameReducer(initialGameState, { type: 'START_GAME', pool: orderedPool });

describe('gameReducer', () => {
  describe('START_GAME', () => {
    it('seeds the first event onto the timeline and draws the next as current', () => {
      const state = startedState();

      expect(state.status).toBe('playing');
      expect(state.timeline).toEqual([orderedPool[0]]);
      expect(state.current).toEqual(orderedPool[1]);
      expect(state.pool).toEqual([orderedPool[2], orderedPool[3]]);
      expect(state.failure).toBeNull();
    });

    it('wins immediately when the pool has only a seed (nothing to place)', () => {
      const state = gameReducer(initialGameState, {
        type: 'START_GAME',
        pool: [event(1, '2000-01-01T00:00:00Z')],
      });

      expect(state.status).toBe('won');
      expect(state.timeline).toHaveLength(1);
      expect(state.current).toBeNull();
    });

    it('stays idle when given an empty pool', () => {
      const state = gameReducer(initialGameState, { type: 'START_GAME', pool: [] });

      expect(state.status).toBe('idle');
      expect(state.timeline).toEqual([]);
      expect(state.current).toBeNull();
    });
  });

  describe('PLACE_CURRENT — correct placement', () => {
    it('inserts the current event, reveals it on the timeline, and draws the next', () => {
      const state = gameReducer(startedState(), { type: 'PLACE_CURRENT', index: 1 });

      // 2010 placed after 2000 → [2000, 2010].
      expect(state.status).toBe('playing');
      expect(state.timeline).toEqual([orderedPool[0], orderedPool[1]]);
      expect(state.current).toEqual(orderedPool[2]);
      expect(state.pool).toEqual([orderedPool[3]]);
      expect(state.failure).toBeNull();
    });

    it('keeps the timeline chronologically ordered when inserting at the start', () => {
      // Seed 2010, current 2000; place 2000 before the seed.
      const pool: Event[] = [
        event(2, '2010-01-01T00:00:00Z'),
        event(1, '2000-01-01T00:00:00Z'),
        event(3, '2020-01-01T00:00:00Z'),
      ];
      const started = gameReducer(initialGameState, { type: 'START_GAME', pool });
      const state = gameReducer(started, { type: 'PLACE_CURRENT', index: 0 });

      expect(state.status).toBe('playing');
      expect(state.timeline.map((e) => e.id)).toEqual([1, 2]);
      expect(state.current).toEqual(pool[2]);
    });

    it('transitions to won on the last correct placement (pool exhausted)', () => {
      let state = startedState();
      // Place 2010, 2020, 2030 — each at the end (index === timeline.length).
      state = gameReducer(state, { type: 'PLACE_CURRENT', index: state.timeline.length });
      state = gameReducer(state, { type: 'PLACE_CURRENT', index: state.timeline.length });
      expect(state.status).toBe('playing');

      state = gameReducer(state, { type: 'PLACE_CURRENT', index: state.timeline.length });

      expect(state.status).toBe('won');
      expect(state.current).toBeNull();
      expect(state.pool).toEqual([]);
      expect(state.timeline.map((e) => e.id)).toEqual([1, 2, 3, 4]);
    });
  });

  describe('PLACE_CURRENT — incorrect placement', () => {
    it('transitions to lost with the misplaced event and correct counts', () => {
      // Started: timeline [2000], current 2010, pool [2020, 2030].
      // Place 2010 at index 0 (before 2000) → incorrect.
      const state = gameReducer(startedState(), { type: 'PLACE_CURRENT', index: 0 });

      expect(state.status).toBe('lost');
      expect(state.failure).not.toBeNull();
      expect(state.failure?.misplacedEvent).toEqual(orderedPool[1]);
      // Only the seed is on the timeline → placedCount 0 (seed excluded).
      expect(state.failure?.placedCount).toBe(0);
      // Undrawn pool (2020, 2030) + the misplaced event = 3.
      expect(state.failure?.remainingCount).toBe(3);
    });

    it('reports placedCount excluding the seed after some successful placements', () => {
      // Place 2010 correctly, then misplace 2020 before 2000.
      let state = gameReducer(startedState(), { type: 'PLACE_CURRENT', index: 1 });
      state = gameReducer(state, { type: 'PLACE_CURRENT', index: 0 });

      expect(state.status).toBe('lost');
      expect(state.failure?.misplacedEvent).toEqual(orderedPool[2]);
      // Timeline is [2000, 2010]: seed + 1 successful placement → placedCount 1.
      expect(state.failure?.placedCount).toBe(1);
      // Undrawn pool (2030) + the misplaced event = 2.
      expect(state.failure?.remainingCount).toBe(2);
    });

    it('does not change state once the game is already over', () => {
      const lost = gameReducer(startedState(), { type: 'PLACE_CURRENT', index: 0 });
      const again = gameReducer(lost, { type: 'PLACE_CURRENT', index: 1 });

      expect(again).toBe(lost);
    });
  });

  describe('RESET', () => {
    it('returns to the initial state', () => {
      const state = gameReducer(startedState(), { type: 'RESET' });
      expect(state).toEqual(initialGameState);
    });
  });

  describe('purity', () => {
    it('does not mutate the input state or the provided pool', () => {
      const before = startedState();
      const stateSnapshot = JSON.stringify(before);
      const poolSnapshot = JSON.stringify(orderedPool);

      gameReducer(before, { type: 'PLACE_CURRENT', index: 1 });

      expect(JSON.stringify(before)).toBe(stateSnapshot);
      expect(JSON.stringify(orderedPool)).toBe(poolSnapshot);
    });

    it('is deterministic: same inputs yield equal outputs', () => {
      const a = gameReducer(startedState(), { type: 'PLACE_CURRENT', index: 1 });
      const b = gameReducer(startedState(), { type: 'PLACE_CURRENT', index: 1 });
      expect(a).toEqual(b);
    });
  });
});
