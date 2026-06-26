'use client';
import styled from 'styled-components';

export const Background = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  background: url('/assets/background/img-car-background.png') center / cover no-repeat;
`;

export const Stage = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  left: 3.6rem;
  bottom: 34.6rem;
  pointer-events: none;
`;

export const Card = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: stretch;
  flex-shrink: 0;
  gap: 1rem;
  width: 29rem;
  height: 15.3rem;
  padding: 1.2rem 1.6rem;
  border-radius: 0.6rem;
  background: #1d1d20;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 0.8rem 2rem #171718;
  user-select: none;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 0 0 auto;
  width: 22.9rem;
  height: 12.4rem;
`;

export const TitleRow = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22.9rem;
  height: 4.2rem;
  gap: 0.8rem;
  border-radius: 0.5rem;
  background: rgba(18, 18, 19, 0.5);
`;

export const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  color: #ffffff;
`;

// badge "Gasolina": 75×26px
export const Badge = styled.span`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 7.3rem;
  height: 2.6rem;
  border-radius: 0.3rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: #ffffff;
  background-color: #007fe8;
`;

export const InfoGrid = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const InfoBox = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
  gap: 0.4rem;
  width: 11.2rem;
  height: 3.2rem;
  padding: 0.45rem 0.7rem;
  border-radius: 0.5rem;
  white-space: nowrap;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.06);
`;

export const FuelInfoBox = styled(InfoBox)``;

export const PriceInfoBox = styled(InfoBox)``;

export const InfoLabel = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
  color: #ffffff;
`;

export const InfoValue = styled.span`
  font-size: 1.25rem;
  font-weight: 500;
  color: #8d8d92;
`;

export const TotalRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const TotalLabel = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
  color: #ffffff;
`;

export const TotalValue = styled.span`
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 8rem;
  height: 2.6rem;
  border-radius: 0.3rem;
  font-size: 1.2rem;
  font-weight: 500;
  color: #ffffff;
  background-color: #007fe8;
`;

export const Gauge = styled.div`
  display: flex;
  align-items: stretch;
`;
