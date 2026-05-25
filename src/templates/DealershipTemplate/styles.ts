'use client';

import styled from 'styled-components';

export const Container = styled.main`
  width: 100%;
  height: 100vh;
  overflow: hidden;

  background-image: url('/imgs/backgrounds/dealership-bg.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  padding: 2rem;
`;

export const Content = styled.section`
  position: relative;
  width: 100%;
  height: 100%;

  border: 0.1rem solid rgba(255, 255, 255, 0.05);
`;

export const TopContent = styled.div`
  position: absolute;
  top: 5.2rem;
  left: 3rem;
`;

export const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const WelcomeText = styled.p`
  font-size: 1.7rem;
  font-weight: 700;
  color: ${({ theme }) => theme.white};
`;

export const MainTitle = styled.h1`
  font-size: 2.35rem;
  line-height: 1;
  color: ${({ theme }) => theme.white};
  margin-bottom: 3rem;
`;

export const StatsCard = styled.div`
  width: 27rem;
  background: rgba(31, 32, 37, 0.82);
  backdrop-filter: blur(2rem);
  border-radius: 1.4rem;
  overflow: hidden;
`;

export const StatsTitle = styled.h2`
  height: 5rem;
  padding: 0 1.6rem;
  display: flex;
  align-items: center;
  border-bottom: 0.1rem solid rgba(255, 255, 255, 0.05);

  font-size: 1.55rem;
  font-weight: 700;
  color: ${({ theme }) => theme.white};

  &::before {
    content: 'ⓘ';
    margin-right: 0.8rem;
    font-size: 1.4rem;
  }
`;

export const StatItem = styled.div`
  padding: 1.25rem 1.6rem 0.75rem;
`;

export const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.9rem;

  span {
    font-size: 1.2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.white};

    &:last-child {
      color: rgba(255, 255, 255, 0.18);
    }
  }
`;

export const StatBar = styled.div`
  width: 100%;
  height: 0.45rem;
  border-radius: 99rem;
  background: rgba(255, 255, 255, 0.16);
  overflow: hidden;
`;

export const StatProgress = styled.div<{ $percentage: number }>`
  width: ${({ $percentage }) => $percentage}%;
  height: 100%;
  border-radius: 99rem;
  background: ${({ theme }) => theme.white};
`;

export const RightActions = styled.div`
  position: absolute;
  right: 0;
  bottom: 22.3rem;

  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const PriceLabel = styled.p`
  font-size: 1.25rem;
  font-weight: 800;
  color: ${({ theme }) => theme.white};
`;

export const PriceRow = styled.div`
  display: flex;
  gap: 0.9rem;
  align-items: center;
  margin: 0.55rem 0 2rem;

  span {
    font-size: 1.45rem;
    font-weight: 800;
    color: ${({ theme }) => theme.white};
  }
`;

export const PriceItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

export const Divider = styled.span`
  color: rgba(255, 255, 255, 0.2) !important;
`;

export const Icon = styled.img`
  width: 1.45rem;
  height: 1.45rem;
  object-fit: contain;
`;

export const ButtonsRow = styled.div`
  display: flex;
  gap: 1rem;
`;

export const ActionButton = styled.button`
  height: 3.4rem;
  padding: 0 2rem;
  border-radius: 99rem;

  display: flex;
  align-items: center;
  gap: 0.7rem;

  background: rgba(31, 32, 37, 0.92);
  color: ${({ theme }) => theme.gray};

  font-size: 1.2rem;
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-0.2rem);
    background: rgba(31, 32, 37, 1);
  }
`;

export const TestDriveButton = styled.button`
  height: 3.4rem;
  padding: 0 2.1rem;
  border-radius: 99rem;

  display: flex;
  align-items: center;
  gap: 0.7rem;

  background: ${({ theme }) => theme.white};
  color: ${({ theme }) => theme.black};

  font-size: 1.2rem;
  transition: 0.3s ease;

  &:hover {
    transform: translateY(-0.2rem);
  }
`;

export const ButtonIcon = styled.img`
  width: 1.3rem;
  height: 1.3rem;
  object-fit: contain;
`;

export const BottomContent = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const VehicleInfo = styled.div`
  margin-bottom: 3.3rem;
`;

export const VehicleType = styled.p`
  font-size: 1.35rem;
  font-weight: 700;
  color: ${({ theme }) => theme.gray};
  margin-bottom: 0.6rem;
`;

export const VehicleName = styled.h2`
  font-size: 3.7rem;
  line-height: 1;
  letter-spacing: 0.48rem;
  color: ${({ theme }) => theme.white};
`;

export const CategoriesWrapper = styled.div`
  position: relative;

  height: 5rem;
  background: rgba(31, 32, 37, 0.92);
  border-radius: 1.4rem 1.4rem 0 0;
  padding: 1rem 1.2rem 0;

  display: flex;
  gap: 0.65rem;
`;

export const CategoryButton = styled.button`
  min-width: 10.7rem;
  height: 2.8rem;
  border-radius: 0.35rem;
  border: 0.1rem solid rgba(255, 255, 255, 0.08);

  font-size: 1.2rem;
  color: rgba(255, 255, 255, 0.35);

  transition: 0.3s;

  &:first-child {
    background: ${({ theme }) => theme.gray};
    color: ${({ theme }) => theme.black};
  }
`;

export const CarouselHint = styled.div`
  position: absolute;
  right: 2.3rem;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  align-items: center;
  gap: 0.95rem;

  button {
    font-size: 2.4rem;
    line-height: 1;
    color: ${({ theme }) => theme.gray};
    transition: 0.3s ease;

    &:hover {
      color: ${({ theme }) => theme.white};
      transform: scale(1.12);
    }
  }

  p {
    font-size: 1.25rem;
    font-weight: 800;
    color: ${({ theme }) => theme.white};
  }
`;

export const VehiclesContainer = styled.div`
  height: 14.6rem;
  background: rgba(31, 32, 37, 0.92);
  border-radius: 0 0 1.4rem 1.4rem;
  padding: 0 1.2rem 1.2rem;

  display: flex;
  gap: 1rem;
  overflow: hidden;
`;

export const VehiclesTrack = styled.div<{
  $activeVehicleIndex: number;
}>`
  display: flex;
  gap: 1rem;

  transform: translateX(
    ${({ $activeVehicleIndex }) =>
      `-${Math.max($activeVehicleIndex - 3, 0) * 33}rem`}
  );

  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
`;

export const VehicleCard = styled.div<{
  $exclusive: boolean;
  $active: boolean;
}>`
  position: relative;
  min-width: 32rem;
  height: 13.2rem;
  border-radius: 0.45rem;
  overflow: hidden;

  background: ${({ theme, $active }) =>
    $active ? theme.gray : 'rgba(39, 39, 46, 0.96)'};

  cursor: pointer;

  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease,
    background 0.4s ease;

  &:hover {
    transform: translateY(-0.35rem);
    box-shadow: 0 1rem 4rem rgba(0, 0, 0, 0.25);
  }

  span {
    position: relative;
    z-index: 2;
    display: block;
    padding: 1.2rem 1.4rem 0;

    font-size: 1.3rem;
    font-weight: 800;
    white-space: pre-line;

    color: ${({ theme, $exclusive, $active }) =>
      $exclusive || $active ? theme.radicalRed : theme.white};
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    bottom: 4.5rem;

    width: 0;
    height: 0;

    border-bottom: 1.3rem solid
      ${({ theme, $exclusive, $active }) =>
        $exclusive || $active ? theme.radicalRed : theme.greenYellow};

    border-right: 1.3rem solid transparent;
  }
`;

export const VehicleImage = styled.img`
  position: absolute;
  left: 50%;
  top: 3rem;
  transform: translateX(-50%);

  width: 19rem;
  height: 7rem;
  object-fit: contain;
`;

export const VehicleFooter = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  height: 4.5rem;
  background: rgba(18, 19, 23, 0.82);
  padding: 0 1.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 1.35rem;
    font-weight: 800;
    color: ${({ theme }) => theme.gray};
  }

  p {
    display: flex;
    align-items: center;
    gap: 0.6rem;

    font-size: 1.35rem;
    font-weight: 800;
    color: ${({ theme }) => theme.greenYellow};

    img {
      width: 1.35rem;
      height: 1.35rem;
    }
  }
`;
