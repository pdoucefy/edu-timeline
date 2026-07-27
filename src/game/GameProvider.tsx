'use client';

import { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import type { ReactNode } from 'react';

import type { Event } from '../types';
import { gameReducer, initialGameState } from './gameReducer.ts';
import type { GameState } from './gameReducer.ts';
import { shuffle } from './shuffle.ts';

/**
 * The value exposed by {@link useGame}: the live game state plus the actions
 * needed to drive gameplay.
 */
export type GameContextValue = {
  /** The live game state (single source of truth for the play route). */
  state: GameState;
  /**
   * Starts a game from the given resolved event pool. The pool is shuffled
   * here (outside the reducer) so the reducer stays pure and deterministic.
   */
  startGame: (pool: Event[]) => void;
  /** Attempts to place the current event at the given insertion index. */
  placeCurrent: (index: number) => void;
  /** Resets the game back to its initial, pre-game state. */
  reset: () => void;
};

const GameContext = createContext<GameContextValue | null>(null);

/**
 * Client-side provider holding the global game state via `useReducer`. Wrap the
 * play route in this and read the state/actions through {@link useGame}.
 *
 * An optional `initialPool` seeds a game synchronously on first render (so the
 * started state renders during SSR with no flash). The pool must already be
 * shuffled by the caller — otherwise the server and client would shuffle
 * differently and cause a hydration mismatch.
 */
export const GameProvider = ({
  children,
  initialPool,
}: {
  children: ReactNode;
  initialPool?: Event[];
}) => {
  const [state, dispatch] = useReducer(gameReducer, initialPool, (pool) =>
    pool ? gameReducer(initialGameState, { type: 'START_GAME', pool }) : initialGameState,
  );

  const startGame = useCallback((pool: Event[]) => {
    dispatch({ type: 'START_GAME', pool: shuffle(pool) });
  }, []);

  const placeCurrent = useCallback((index: number) => {
    dispatch({ type: 'PLACE_CURRENT', index });
  }, []);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const value = useMemo<GameContextValue>(
    () => ({ state, startGame, placeCurrent, reset }),
    [state, startGame, placeCurrent, reset],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

/**
 * Reads the game state and actions. Must be used within a {@link GameProvider}.
 */
// eslint-disable-next-line react-refresh/only-export-components
export const useGame = (): GameContextValue => {
  const value = useContext(GameContext);

  if (!value) throw new Error('useGame must be used within a GameProvider');
  return value;
};
