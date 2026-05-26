'use client';

import styled from 'styled-components';

export const Container = styled.div`
  width: 27.9rem;
  height: 30.6rem;

  background: rgba(31, 32, 37, 0.86);
  backdrop-filter: blur(2rem);

  border-radius: 2rem;

  overflow: hidden;
`;

export const StatsTitle = styled.h2`
  height: 5.2rem;

  padding: 0 1.8rem;

  display: flex;
  align-items: center;
  gap: 1rem;

  border-bottom: 0.1rem solid rgba(255, 255, 255, 0.06);

  font-size: 1.55rem;
  font-weight: 800;

  color: ${({ theme }) => theme.white};

  img {
    width: 1.6rem;
    height: 1.6rem;

    object-fit: contain;
  }
`;

export const StatItem = styled.div`
  padding: 1.25rem 1.8rem 0.35rem;
`;

export const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 0.9rem;

  span {
    font-size: 1.35rem;
    font-weight: 800;

    color: ${({ theme }) => theme.white};

    &:last-child {
      color: rgba(255, 255, 255, 0.18);
    }
  }
`;

export const StatBar = styled.div`
  width: 100%;
  height: 0.5rem;

  border-radius: 99rem;

  background: rgba(255, 255, 255, 0.16);

  overflow: hidden;
`;

export const StatProgress = styled.div<{ $percentage: number }>`
  width: ${({ $percentage }) => $percentage}%;

  height: 100%;

  border-radius: 99rem;

  background: ${({ theme }) => theme.white};

  transition: width 0.5s ease;
`;
