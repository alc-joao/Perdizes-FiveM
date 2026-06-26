'use client';
import { useState } from 'react';
import { FuelStation } from '../fuel-station';
import { fuelStationDefaults } from '../fuel-station/constants';
import { FuelDemoPanel } from '../fuel-demo-panel';

// Demo control only. Remove this panel for production FiveM build.
// Mantém o estado do combustível fora do HUD — o card recebe o valor
// atual via prop, e quem manda nele é o painel de demonstração.

export const FuelStationDemo = () => {
  const [currentFuel, setCurrentFuel] = useState(fuelStationDefaults.litrosAtuais);

  return (
    <>
      <FuelStation
        capacidadeMaxima={fuelStationDefaults.capacidadeMaxima}
        litrosAtuais={currentFuel}
        precoPorLitro={fuelStationDefaults.precoPorLitro}
      />

      <FuelDemoPanel
        currentFuel={currentFuel}
        maxCapacity={fuelStationDefaults.capacidadeMaxima}
        onChange={setCurrentFuel}
      />
    </>
  );
};
