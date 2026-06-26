import { Metadata } from 'next';
import { FuelStationDemo } from '@/components/organisms/fuel-station-demo';

export const metadata: Metadata = {
  title: 'Fuel Station',
  description: 'NUI fuel station screen',
};

export default function Home() {
  // Demo control only. Remove this panel for production FiveM build.
  return <FuelStationDemo />;
}
