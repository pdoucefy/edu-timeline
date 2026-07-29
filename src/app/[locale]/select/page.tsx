import { getTranslations } from 'next-intl/server';

import { getSchoolYears, initLoader } from '@/data/loader.ts';
import { schoolYears } from '@/data/years.ts';

// eslint-disable-next-line import/order
import { LevelSelectionClient } from './components/LevelSelectionClient.tsx';

initLoader(schoolYears);

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
  const years = getSchoolYears();

  return <LevelSelectionClient years={years} locale={locale} />;
};

// eslint-disable-next-line import/no-default-export
export default SelectPage;
