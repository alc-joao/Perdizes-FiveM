'use client';
import styled from 'styled-components';

// medida exata do Figma: 18×129px = 1.8×12.9rem. O border-radius +
// overflow hidden é quem garante as pontas perfeitamente circulares,
// sempre, independente da altura — por isso o SVG interno não precisa
// (e não deve) replicar esse contorno
export const Track = styled.div`
  box-sizing: border-box;
  position: relative;
  flex-shrink: 0;
  width: 2rem;
  height: 13.4rem;
  border-radius: 5px;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.08);
`;

export const Svg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
`;
