import { getTranslations } from 'next-intl/server';

import { PlayClient } from './components/PlayClient.tsx';

// eslint-disable-next-line react-refresh/only-export-components
export const generateMetadata = async () => {
  const t = await getTranslations('game');

  return {
    title: t('title'),
    description: t('description'),
  };
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
  const seed = new Date().getTime();

  return <PlayClient locale={locale} query={query} seed={seed} />;
};

// eslint-disable-next-line import/no-default-export
export default PlayPage;
