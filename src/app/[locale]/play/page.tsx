import { getTranslations } from 'next-intl/server';

import { PlayClient } from '@/components/PlayClient.tsx';
import { getSchoolYears, initLoader } from '@/data/loader.ts';
import { schoolYears } from '@/data/years.ts';
import { parsePlayParams } from '@/game/parsePlayParams.ts';
import { shuffle } from '@/game/shuffle.ts';
import { redirect } from '@/i18n/navigation.ts';

initLoader(schoolYears);

// eslint-disable-next-line react-refresh/only-export-components
export const generateMetadata = async () => {
  const t = await getTranslations('game');
  return { title: t('placeEventPrompt') };
};

const PlayPage = async ({
  params,
  searchParams,
}: Readonly<{
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}>) => {
  const { locale } = await params;
  const query = await searchParams;

  const result = parsePlayParams(getSchoolYears(), {
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

  // Shuffle server-side so the same order is used for SSR and hydration
  // (avoiding a mismatch) and so refreshing always yields a fresh order.
  return <PlayClient pool={shuffle(result.pool)} />;
};

// eslint-disable-next-line import/no-default-export
export default PlayPage;
