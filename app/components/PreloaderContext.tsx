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
  const [isVisible, setIsVisible] = useState(true); // Default to visible for home-page start
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
