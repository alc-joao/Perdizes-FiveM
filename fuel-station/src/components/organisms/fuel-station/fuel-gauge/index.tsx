'use client';
import { FC } from 'react';
import * as S from './styles';
import { FuelGaugeC } from './constants';
import { useFuelGauge } from '@/hooks/useFuelGauge';

export interface FuelGaugeProps {
  /** 0–100. A altura do líquido e o nível das ondas seguem este valor. */
  percentage: number;
}

// tanque com líquido de verdade: SVG com uma única onda senoidal,
// redesenhada a cada frame pelo GSAP via useFuelGauge — nada de div azul
// com height%, nem keyframes de CSS
export const FuelGauge: FC<FuelGaugeProps> = ({ percentage }) => {
  const { waveRef } = useFuelGauge(percentage);
  const { viewBoxWidth, viewBoxHeight } = FuelGaugeC;

  return (
    <S.Track>
      <S.Svg viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`} preserveAspectRatio="none">
        <defs>
          <linearGradient id="fuel-liquid-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#148BEA" />
            <stop offset="55%" stopColor="#0A8FF0" />
            <stop offset="100%" stopColor="#007fe8" />
          </linearGradient>
          <clipPath id="fuel-tank-clip">
            <rect x="0" y="0" width={viewBoxWidth} height={viewBoxHeight} />
          </clipPath>
        </defs>

        <g clipPath="url(#fuel-tank-clip)">
          <path ref={waveRef} fill="url(#fuel-liquid-gradient)" />
        </g>
      </S.Svg>
    </S.Track>
  );
};
