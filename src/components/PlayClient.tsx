'use client';

import { useTranslations } from 'next-intl';
import styled from 'styled-components';

import { DragDropTimeline } from '@/components/DragDropTimeline.tsx';
import { EndOfGameScreen } from '@/components/EndOfGameScreen.tsx';
import { GameProvider, useGame } from '@/game/GameProvider.tsx';
import type { Event } from '@/types';

const Page = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 1024px;
  margin: 0 auto;
`;

const Prompt = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
`;

const Counter = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.textMuted};
  margin: 0;
`;

/**
 * The interactive game surface. Reads live state from {@link useGame} and
 * renders the current event to place, the timeline, and — on win/loss — the
 * end-of-game screen.
 *
 * The game is seeded synchronously by the provider (via `initialPool`), so the
 * started state renders immediately (SSR-safe). Placement interaction is wired
 * to `placeCurrent` via the timeline slots. The full loop and richer feedback
 * come in Tasks 22/23.
 */
const GameSurface = () => {
  const t = useTranslations('game');
  const { state, placeCurrent } = useGame();

  if (state.status === 'won') {
    const total = state.timeline.length - 1;
    return <EndOfGameScreen outcome="success" score={total} total={total} />;
  }

  if (state.status === 'lost' && state.failure) {
    const { misplacedEvent, placedCount, remainingCount } = state.failure;
    return (
      <EndOfGameScreen
        outcome="failure"
        score={placedCount}
        total={placedCount + remainingCount}
        placedCount={placedCount}
        remainingCount={remainingCount}
        misplacedEventName={misplacedEvent.name}
        misplacedEventYear={misplacedEvent.date.getFullYear()}
      />
    );
  }

  if (state.status !== 'playing' || !state.current) return null;

  const placedSoFar = state.timeline.length - 1;
  const totalToPlace = placedSoFar + state.pool.length + 1;

  return (
    <Page>
      <div>
        <Prompt>{t('placeEventPrompt')}</Prompt>
        <Counter>{t('eventCounter', { current: placedSoFar + 1, total: totalToPlace })}</Counter>
      </div>
      <DragDropTimeline
        events={state.timeline}
        currentEvent={state.current}
        onPlace={placeCurrent}
      />
    </Page>
  );
};

export type PlayClientProps = {
  /** The resolved, already-shuffled event pool derived from the URL params. */
  pool: Event[];
};

/**
 * Client entry point for the play route. Mounts the {@link GameProvider},
 * seeding a fresh game from the pool resolved server-side from the URL. Because
 * the pool is shuffled on the server, SSR and hydration agree, and refreshing
 * the URL starts a new game with a new order.
 */
export const PlayClient = ({ pool }: PlayClientProps) => (
  <GameProvider initialPool={pool}>
    <GameSurface />
  </GameProvider>
);
