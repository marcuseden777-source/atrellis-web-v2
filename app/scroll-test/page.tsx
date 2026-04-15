'use client';

import ResponsiveScrollPlayer from '../components/ResponsiveScrollPlayer';

export default function ScrollTestPage() {
  return (
    <main className="bg-white">
      {/* Hero section with scroll animation */}
      <div className="relative">
        <h1 className="text-4xl font-bold text-center pt-12 pb-8">
          Scroll Animation Test
        </h1>
        <ResponsiveScrollPlayer className="min-h-screen" />
      </div>

      {/* Content after animation */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-8">
        <h2 className="text-3xl font-bold mb-4">Animation Complete!</h2>
        <p className="text-lg text-gray-600 text-center max-w-2xl">
          The scroll animation has finished. You can see this content after scrolling through
          the video animation above. Try scrolling back up to see the animation again.
        </p>
      </div>

      {/* Additional content for scrolling */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8">
        <h2 className="text-2xl font-bold mb-4">Test Content</h2>
        <p className="text-gray-600 text-center max-w-2xl">
          This page demonstrates the ResponsiveScrollPlayer component which uses GSAP
          ScrollTrigger to create a scroll-driven video animation. The animation adapts
          to mobile and desktop viewport sizes.
        </p>
      </div>
    </main>
  );
}
