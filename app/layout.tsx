import type { Metadata } from 'next';
import './globals.css';
import { PreloaderProvider } from './components/PreloaderContext';
import PreloaderOverlay from './components/PreloaderOverlay';

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
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700;900&family=Cormorant+Garamond:ital,wght@1,700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <PreloaderProvider>
          <PreloaderOverlay />
          {children}
        </PreloaderProvider>
      </body>
    </html>
  );
}
