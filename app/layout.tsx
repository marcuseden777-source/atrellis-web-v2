import type { Metadata } from 'next';
import { Outfit, Cormorant_Garamond, Poppins } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { PreloaderProvider } from './components/PreloaderContext';
import PreloaderOverlay from './components/PreloaderOverlay';
import StickyWhatsApp from './components/StickyWhatsApp';
import JsonLd from './components/JsonLd';

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

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://atrellis.business'),
  title: 'Atrellis Design & Build | Singapore Landed Property Renovation Specialists',
  description:
    'Atrellis is Singapore\'s premium design-and-build studio specialising in landed property A&A, BCA-compliant structural works, smart home ecosystems, and bespoke interior design. Get an instant indicative quote online.',
  openGraph: {
    title: 'Atrellis Design & Build Singapore',
    description: 'Landed property A&A, BCA-compliant structures, smart home ecosystems and bespoke interiors — engineered to a higher standard.',
    url: 'https://atrellis.business',
    siteName: 'Atrellis',
    locale: 'en_SG',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Atrellis Design & Build — Singapore Premium Renovation Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atrellis Design & Build Singapore',
    description: 'Landed property A&A, BCA-compliant structures, and smart home ecosystems — engineered to a higher standard.',
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${cormorantGaramond.variable} ${poppins.variable}`}>
      <head>
        <JsonLd />
      </head>
      <body>
        <PreloaderProvider>
          <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:p-4 focus:bg-blue-600 focus:text-white top-0 left-0">Skip to content</a>
          <PreloaderOverlay />
          {children}
          <StickyWhatsApp />
        </PreloaderProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
