import { sportsVehicles } from './sports';
import { sedanVehicles } from './sedans';
import { suvVehicles } from './suvs';
import { motorcycleVehicles } from './motorcycles';
import { truckVehicles } from './trucks';

export const vehicles = [
  ...sportsVehicles,
  ...sedanVehicles,
  ...suvVehicles,
  ...motorcycleVehicles,
  ...truckVehicles,
];
