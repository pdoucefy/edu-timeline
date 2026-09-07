'use client';

import { useTranslations } from 'next-intl';

import { DragDropTimeline } from '@/app/[locale]/play/components/DragDropTimeline.tsx';
import { Page } from '@/components/common/Page.tsx';
import { Typography } from '@/components/common/Typography.tsx';
import { useData } from '@/data/DataProvider.tsx';
import { GameProvider, useGame } from '@/game/GameProvider.tsx';
import { parsePlayParams } from '@/game/parsePlayParams.ts';
import { shuffle } from '@/game/shuffle.ts';
import { redirect } from '@/i18n/navigation.ts';
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

  const handlePlayAgain = () => startGame(originalPool);

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
          <Typography $variant="light" $color="textMuted">
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

export type PlayClientProps = Readonly<{
  locale: string;
  query: { [key: string]: string | string[] | undefined };
  seed: number;
}>;

/**
 * Client entry point for the play route. Mounts the {@link GameProvider},
 * seeding a fresh game from the pool resolved server-side from the URL. Because
 * the pool is shuffled on the server, SSR and hydration agree, and refreshing
 * the URL starts a new game with a new order.
 */
export const PlayClient = ({ locale, query, seed }: PlayClientProps) => {
  const { years } = useData();

  const result = parsePlayParams(years, {
    chapters: query.chapters,
    difficulty: query.difficulty,
  });
  // Missing/invalid params → seamless server-side redirect to the selection
  // screen (locale-aware via next-intl navigation). This throws and terminates
  // rendering, so there is no flash of an error state.
  if (!result.valid) {
    redirect({ href: '/select', locale });
    return null;
  }

  // Shuffle deterministically with a server-generated seed so the same order
  // is used for SSR and hydration, avoiding a mismatch. Refreshing yields a
  // fresh order because `page.tsx` generates a new seed on every request.
  return (
    <GameProvider initialPool={shuffle(result.pool, seed)}>
      <GameSurface originalPool={result.pool} />
    </GameProvider>
  );
};
