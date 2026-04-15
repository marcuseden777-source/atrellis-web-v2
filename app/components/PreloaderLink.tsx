'use client';

import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';
import { usePreloader } from './PreloaderContext';

interface PreloaderLinkProps extends LinkProps {
  children: ReactNode;
  className?: string;
}

export default function PreloaderLink({
  children,
  className,
  ...props
}: PreloaderLinkProps) {
  const { showPreloader } = usePreloader();

  const handleClick = () => {
    showPreloader();
  };

  return (
    <Link className={className} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
}
