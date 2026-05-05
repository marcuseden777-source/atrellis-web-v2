'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { logger } from '@/app/lib/logger';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to our structured logger
    logger.error('Unhandled application exception', error, { digest: error.digest });
  }, [error]);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/20 shadow-[0_0_30px_rgba(239,68,68,0.2)]">
        <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
        </svg>
      </div>
      <h2 className="text-3xl md:text-5xl font-black uppercase tracking-[4px] mb-6">System Anomaly</h2>
      <p className="text-white/50 text-sm md:text-base max-w-md mx-auto mb-12 leading-relaxed">
        We encountered an unexpected error while processing your request. Our engineering team has been notified and is investigating the issue.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md">
        <button
          onClick={() => reset()}
          className="w-full sm:w-auto px-10 py-4 bg-transparent border border-white/20 hover:bg-white/10 transition-all duration-300 rounded-full text-xs font-bold uppercase tracking-[3px] focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 focus:ring-offset-[#050505] active:scale-95"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="w-full sm:w-auto px-10 py-4 bg-blue-500 hover:bg-blue-600 transition-all duration-300 rounded-full text-xs font-bold uppercase tracking-[3px] shadow-[0_10px_30px_rgba(59,130,246,0.3)] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#050505] active:scale-95"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
