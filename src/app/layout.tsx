import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { VT323, Silkscreen, Geist } from 'next/font/google';
import Script from 'next/script';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/components/translate/LanguageProvider';
import { getInitialLanguage, LANGUAGE_COOKIE_NAME } from '@/components/translate/translations';
import '@/styles/globals.css';
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const vt323 = VT323({
  variable: '--font-vt323',
  subsets: ['latin'],
  weight: '400',
});

const silkscreen = Silkscreen({
  variable: '--font-silkscreen',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Ferval | Portfolio',
  description: 'Portfolio de Marco Fernandez, desarrollador web.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const cookieStore = await cookies();
  const initialLanguage = getInitialLanguage(cookieStore.get(LANGUAGE_COOKIE_NAME)?.value);

  return (
    <html lang={initialLanguage} data-language={initialLanguage} suppressHydrationWarning className={cn("h-full", "antialiased", vt323.variable, silkscreen.variable, "font-sans", geist.variable)}>
      <body className="min-h-full flex flex-col">
        <Script id="theme-init" strategy="beforeInteractive">{`
          (function () {
            var storageKey = 'portfolio-theme';
            var storedTheme = localStorage.getItem(storageKey);
            var systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            var theme = storedTheme === 'dark' || storedTheme === 'light' ? storedTheme : systemTheme;
            document.documentElement.dataset.theme = theme;
            document.documentElement.style.colorScheme = theme;
          })();
        `}</Script>

        <LanguageProvider initialLanguage={initialLanguage}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
