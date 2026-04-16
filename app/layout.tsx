import type { Metadata } from 'next';
import { Outfit, Cormorant_Garamond } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { PreloaderProvider } from './components/PreloaderContext';
import PreloaderOverlay from './components/PreloaderOverlay';

const outfit = Outfit({
  variable: '--font-main',
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  display: 'swap',
});

const cormorantGaramond = Cormorant_Garamond({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['700'],
  style: ['italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Atrellis',
  description: 'Quote management and service selection',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorantGaramond.variable}`}>
      <body>
        <PreloaderProvider>
          <PreloaderOverlay />
          {children}
        </PreloaderProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
