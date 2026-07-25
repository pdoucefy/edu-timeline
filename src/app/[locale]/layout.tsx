import type { Metadata } from 'next';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Geist, Geist_Mono as geistMono } from 'next/font/google';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { routing } from '@/i18n/routing.ts';

import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMonoFont = geistMono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// eslint-disable-next-line react-refresh/only-export-components
export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations('common');

  return {
    title: t('appName'),
    description: "Frise chronologique interactive pour apprendre l'histoire",
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

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering by making the resolved locale available to
  // server-side i18n APIs (`getTranslations`, etc.).
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${geistSans.variable} ${geistMonoFont.variable}`}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
};

// eslint-disable-next-line import/no-default-export
export default RootLayout;
