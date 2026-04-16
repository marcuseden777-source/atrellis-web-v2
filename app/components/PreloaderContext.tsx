'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface PreloaderContextType {
  isVisible: boolean;
  framesLoaded: number;
  showPreloader: () => void;
  hidePreloader: () => void;
  setFramesLoaded: (count: number) => void;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export function PreloaderProvider({ children }: { children: ReactNode }) {
  // Start visible ONLY if we're on the home page or a fresh entry
  // In a real app we might check if it's the first visit, but for now we'll default to visible
  // and handle the hide logic in the overlay.
  const [isVisible, setIsVisible] = useState(true); 
  const [framesLoaded, setFramesLoaded] = useState(0);

  const showPreloader = () => setIsVisible(true);
  const hidePreloader = () => setIsVisible(false);

  return (
    <PreloaderContext.Provider value={{ 
      isVisible, 
      framesLoaded, 
      showPreloader, 
      hidePreloader,
      setFramesLoaded
    }}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader() {
  const context = useContext(PreloaderContext);
  if (!context) {
    throw new Error('usePreloader must be used within a PreloaderProvider');
  }
  return context;
}
