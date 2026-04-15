import type { Metadata } from 'next';
import { Outfit, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { PreloaderProvider } from './components/PreloaderContext';
import PreloaderOverlay from './components/PreloaderOverlay';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  weight: ['300', '400', '600', '700', '900'],
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['700'],
  style: ['normal', 'italic'],
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
      </body>
    </html>
  );
}
