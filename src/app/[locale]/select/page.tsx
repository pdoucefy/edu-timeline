import { getTranslations } from 'next-intl/server';

import { LevelSelectionClient } from './components/LevelSelectionClient.tsx';

// eslint-disable-next-line react-refresh/only-export-components
export const generateMetadata = async () => {
  const t = await getTranslations('select');

  return {
    title: t('title'),
    description: t('description'),
  };
};

const SelectPage = async ({ params }: Readonly<{ params: Promise<{ locale: string }> }>) => {
  const { locale } = await params;

  return <LevelSelectionClient locale={locale} />;
};

// eslint-disable-next-line import/no-default-export
export default SelectPage;
