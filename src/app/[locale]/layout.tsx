import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { Header } from '@/components/Header.tsx';
import { LoadWarningsToast } from '@/components/LoadWarningsToast.tsx';
import { routing } from '@/i18n/routing.ts';
import { StyledComponentsRegistry } from '@/styles/StyledComponentsRegistry.tsx';

// eslint-disable-next-line import/order
import { LayoutContent } from './LayoutContent.tsx';

import '../globals.css';

// eslint-disable-next-line react-refresh/only-export-components
export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('common');

  return {
    title: {
      default: t('appName'),
      template: `%s | ${t('appName')}`,
    },
    description: "Frise chronologique interactive pour apprendre l'histoire",
    icons: {
      icon: '/favicon.svg',
    },
  };
};

// eslint-disable-next-line react-refresh/only-export-components
export const generateStaticParams = () => routing.locales.map((locale) => ({ locale }));

const RootLayout = async ({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) => {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) notFound();

  // Enable static rendering by making the resolved locale available to
  // server-side i18n APIs (`getTranslations`, etc.).
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <StyledComponentsRegistry>
          <NextIntlClientProvider messages={messages}>
            <Header />
            <LayoutContent>{children}</LayoutContent>
            <LoadWarningsToast />
          </NextIntlClientProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
};

// eslint-disable-next-line import/no-default-export
export default RootLayout;
