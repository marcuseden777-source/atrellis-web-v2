'use client';

import { usePreloader } from './PreloaderContext';
import ResponsiveScrollPlayer from './ResponsiveScrollPlayer';

export default function PreloaderOverlay() {
  const { isVisible, hidePreloader } = usePreloader();

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <ResponsiveScrollPlayer
        className="h-screen"
        onComplete={hidePreloader}
      />
    </div>
  );
}
