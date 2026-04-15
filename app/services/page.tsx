import { Metadata } from 'next';
import ServicesPageClient from './client';

export const metadata: Metadata = {
  title: 'Professional Services | Atrellis Web',
  description: 'Discover our comprehensive range of engineering and design services for residential, commercial, and outdoor spaces. From luxury renovations to smart home integration.',
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
