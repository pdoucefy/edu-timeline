import { Suspense } from 'react';

import { PlayClient } from './components/PlayClient.tsx';

type PlayPageProps = {
  params: Promise<{ locale: string }>;
};

const PlayPage = async ({ params }: PlayPageProps) => {
  const { locale } = await params;

  return (
    <Suspense fallback={null}>
      <PlayClient locale={locale} />
    </Suspense>
  );
};

// eslint-disable-next-line import/no-default-export
export default PlayPage;
