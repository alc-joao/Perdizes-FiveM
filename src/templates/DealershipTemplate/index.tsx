'use client';

import { useEffect, useState } from 'react';

import { HeaderIntro } from '@/components/molecules/HeaderIntro';
import { StatsPanel } from '@/components/organisms/StatsPanel';
import { VehicleHeroInfo } from '@/components/organisms/VehicleHeroInfo';
import { VehicleCarousel } from '@/components/organisms/VehicleCarousel';

import { Container, Content, TopContent, BottomContent } from './styles';
import { vehicles, userBalance } from './constants';

export default function DealershipTemplate() {
  const [activeVehicleIndex, setActiveVehicleIndex] = useState(3);

  const activeVehicle = vehicles[activeVehicleIndex];

  function handleNextVehicle() {
    setActiveVehicleIndex((currentIndex) =>
      currentIndex === vehicles.length - 1 ? 0 : currentIndex + 1,
    );
  }

  function handlePreviousVehicle() {
    setActiveVehicleIndex((currentIndex) =>
      currentIndex === 0 ? vehicles.length - 1 : currentIndex - 1,
    );
  }

  useEffect(() => {
    function handleKeyboard(event: KeyboardEvent) {
      if (event.key === 'ArrowRight') handleNextVehicle();
      if (event.key === 'ArrowLeft') handlePreviousVehicle();
    }

    window.addEventListener('keydown', handleKeyboard);

    return () => {
      window.removeEventListener('keydown', handleKeyboard);
    };
  }, []);

  return (
    <Container>
      <Content>
        <TopContent>
          <HeaderIntro />
          <StatsPanel stats={activeVehicle.stats} />
        </TopContent>

        <VehicleHeroInfo userBalance={userBalance} />

        <BottomContent>
          <VehicleCarousel
            vehicles={vehicles}
            activeVehicleIndex={activeVehicleIndex}
            onSelectVehicle={setActiveVehicleIndex}
            onNextVehicle={handleNextVehicle}
            onPreviousVehicle={handlePreviousVehicle}
          />
        </BottomContent>
      </Content>
    </Container>
  );
}
