'use client';

import { useTranslations } from 'next-intl';

import { DragDropTimeline } from '@/app/[locale]/play/components/DragDropTimeline.tsx';
import { Page } from '@/components/common/Page.tsx';
import { Typography } from '@/components/common/Typography.tsx';
import { GameProvider, useGame } from '@/game/GameProvider.tsx';
import type { Event } from '@/types';

/**
 * The interactive game surface. Reads live state from {@link useGame} and
 * renders the current event to place, the timeline, and — on win/loss — the
 * end-of-game screen.
 *
 * The game is seeded synchronously by the provider (via `initialPool`), so the
 * started state renders immediately (SSR-safe). Placement interaction is wired
 * to `placeCurrent` via the timeline slots, closing the full loop:
 * drag → drop → validate → reveal/advance, then the end-of-game screen.
 */
const GameSurface = ({ originalPool }: { originalPool: Event[] }) => {
  const t = useTranslations('game');
  const { state, placeCurrent, startGame } = useGame();

  const handlePlayAgain = () => {
    startGame(originalPool);
  };

  if (state.status === 'idle') return null;

  const placedSoFar = state.timeline.length - 1;
  const totalToPlace = placedSoFar + (state.pool?.length ?? 0) + (state.current ? 1 : 0);

  return (
    <Page>
      {state.status === 'playing' && (
        <div>
          <Typography $variant="h1" $centered>
            {t('placeEventPrompt')}
          </Typography>
          <Typography $variant="light">
            {t('eventCounter', { current: placedSoFar + 1, total: totalToPlace })}
          </Typography>
        </div>
      )}
      <DragDropTimeline
        events={state.timeline}
        currentEvent={state.current}
        onPlace={placeCurrent}
        gameStatus={state.status}
        failure={state.failure}
        // eslint-disable-next-line react/jsx-no-bind
        onPlayAgain={handlePlayAgain}
      />
    </Page>
  );
};

export type PlayClientProps = {
  /** The resolved, already-shuffled event pool derived from the URL params. */
  pool: Event[];
  /** The unshuffled original pool so the player can restart with the same chapters, mode, and difficulty. */
  originalPool: Event[];
};

/**
 * Client entry point for the play route. Mounts the {@link GameProvider},
 * seeding a fresh game from the pool resolved server-side from the URL. Because
 * the pool is shuffled on the server, SSR and hydration agree, and refreshing
 * the URL starts a new game with a new order.
 */
export const PlayClient = ({ pool, originalPool }: PlayClientProps) => (
  <GameProvider initialPool={pool}>
    <GameSurface originalPool={originalPool} />
  </GameProvider>
);
