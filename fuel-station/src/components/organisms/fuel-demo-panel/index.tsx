'use client';
import { FC } from 'react';
import * as S from './styles';
import { FuelDemoPanelC } from './constants';

// Demo control only. Remove this panel for production FiveM build.

export interface FuelDemoPanelProps {
  currentFuel: number;
  maxCapacity: number;
  onChange: (value: number) => void;
}

export const FuelDemoPanel: FC<FuelDemoPanelProps> = ({ currentFuel, maxCapacity, onChange }) => {
  const percentage = Math.round((currentFuel / maxCapacity) * 100);

  return (
    <S.Panel>
      <S.Label>{FuelDemoPanelC.label}</S.Label>

      <S.Range
        type="range"
        min={0}
        max={maxCapacity}
        step={1}
        value={currentFuel}
        onChange={(e) => onChange(Number(e.target.value))}
      />

      <S.Percentage>{percentage}%</S.Percentage>
    </S.Panel>
  );
};
