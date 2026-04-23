import { Metadata } from 'next';
import PortfolioPageClient from './client';

export const metadata: Metadata = {
  title: 'Project Portfolio | Atrellis Design & Build Singapore',
  description:
    'Explore Atrellis case studies — from Sentosa Cove landed property A&A to Marina One smart loft transformations. Real projects, real results.',
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
