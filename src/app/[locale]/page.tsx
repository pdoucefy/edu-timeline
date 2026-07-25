import { useTranslations } from 'next-intl';

const Home = () => {
  const t = useTranslations('home');

  return (
    <div>
      <h1>{t('heroTitle')}</h1>
      <p>{t('heroSubtitle')}</p>
    </div>
  );
};

// eslint-disable-next-line import/no-default-export
export default Home;
