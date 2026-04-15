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
      <body>
        <PreloaderProvider>
          <PreloaderOverlay />
          {children}
        </PreloaderProvider>
      </body>
    </html>
  );
}
