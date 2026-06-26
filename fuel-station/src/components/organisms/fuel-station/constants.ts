import { FuelStationConfig } from '@/types/fuelstation';

export const FuelStationC = {
  id: 'fuel-station',
  title: 'Posto de',
  badge: 'Gasolina',
  tankLabel: 'Tanque',
  priceLabel: 'Preço',
  totalLabel: 'Valor Total',
};

export const fuelStationDefaults: FuelStationConfig = {
  capacidadeMaxima: 60,
  litrosAtuais: 45,
  precoPorLitro: 20.6,
};
