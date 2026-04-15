'use client';

import { ButtonHTMLAttributes } from 'react';
import { usePreloader } from './PreloaderContext';

interface PreloaderButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function PreloaderButton({
  children,
  onClick,
  ...props
}: PreloaderButtonProps) {
  const { showPreloader } = usePreloader();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    showPreloader();
    onClick?.(e);
  };

  return (
    <button onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
