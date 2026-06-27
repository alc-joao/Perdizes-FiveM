import { Metadata } from 'next';
import DealershipTemplate from '@/templates/DealershipTemplate';

export const metadata: Metadata = {
  title: 'Dealership',
  description: 'NUI dealership experience',
};

export default function Home() {
  return <DealershipTemplate />;
}
