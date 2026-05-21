import type { Metadata } from 'next';
import { VT323, Silkscreen } from 'next/font/google';
import Script from 'next/script';
import '@/styles/globals.css';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className={`${vt323.variable} ${silkscreen.variable} h-full antialiased`}>
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
        {children}
      </body>
    </html>
  );
}
