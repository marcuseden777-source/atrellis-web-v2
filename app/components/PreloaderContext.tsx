'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface PreloaderContextType {
  isVisible: boolean;
  showPreloader: () => void;
  hidePreloader: () => void;
}

const PreloaderContext = createContext<PreloaderContextType | undefined>(undefined);

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [isVisible, setIsVisible] = useState(false);

  const showPreloader = () => setIsVisible(true);
  const hidePreloader = () => setIsVisible(false);

  return (
    <PreloaderContext.Provider value={{ isVisible, showPreloader, hidePreloader }}>
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
