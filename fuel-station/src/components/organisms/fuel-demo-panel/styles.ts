'use client';
import styled from 'styled-components';

// Demo control only. Remove this panel for production FiveM build.
// Posicionado no canto oposto ao HUD (inferior direito) pra nunca se
// confundir com o card de combustível em si.
export const Panel = styled.div`
  position: fixed;
  bottom: 39rem;
  left: 40rem;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 13rem;
  padding: 1rem 1.2rem;
  border-radius: 1rem;
  background: rgba(15, 15, 16, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 0.8rem 2rem rgba(0, 0, 0, 0.5);
  user-select: none;
`;

export const Label = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: #0a8ff0;
`;

export const Range = styled.input`
  width: 100%;
  accent-color: #0a8ff0;
  cursor: pointer;
`;

export const Percentage = styled.span`
  align-self: center;
  padding: 0.2rem 0.6rem;
  border-radius: 0.4rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: #ffffff;
  background: linear-gradient(135deg, #148bea, #0a8ff0);
`;
