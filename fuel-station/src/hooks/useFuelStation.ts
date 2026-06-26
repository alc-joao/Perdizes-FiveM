import { useMemo } from 'react';
import type { FuelStationConfig } from '@/types/fuelstation';

export interface UseFuelStation {
  /** (litrosAtuais / capacidadeMaxima) * 100, já limitada entre 0 e 100. */
  percentage: number;
  /** litrosAtuais * precoPorLitro. */
  valorTotal: number;
}

export function useFuelStation(config: FuelStationConfig): UseFuelStation {
  const { capacidadeMaxima, litrosAtuais, precoPorLitro } = config;

  const percentage = useMemo(
    () => Math.min(100, Math.max(0, (litrosAtuais / capacidadeMaxima) * 100)),
    [litrosAtuais, capacidadeMaxima]
  );

  const valorTotal = useMemo(() => litrosAtuais * precoPorLitro, [litrosAtuais, precoPorLitro]);

  return { percentage, valorTotal };
}
