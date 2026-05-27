'use client';

import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 3rem;
`;

export const WelcomeText = styled.p`
  font-size: 1.7rem;
  font-weight: 700;
  opacity: 70%;

  color: ${({ theme }) => theme.white};
`;

export const MainTitle = styled.h1`
  font-size: 2.4rem;
  line-height: 1;

  color: ${({ theme }) => theme.white};
`;
