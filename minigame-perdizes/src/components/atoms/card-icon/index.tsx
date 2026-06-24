import { FC } from 'react';

interface CardIconProps {
  size?: number;
}

export const CardIcon: FC<CardIconProps> = ({ size = 23 }) => (
  <img src="/assets/icons/card-icon.svg" width={size} height={size} alt="" aria-hidden="true" />
);
