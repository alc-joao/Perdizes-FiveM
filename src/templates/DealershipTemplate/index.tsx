'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { HeaderIntro } from '@/components/molecules/HeaderIntro';
import { StatsPanel } from '@/components/organisms/StatsPanel';
import { VehicleHeroInfo } from '@/components/organisms/VehicleHeroInfo';
import { VehicleCarousel } from '@/components/organisms/VehicleCarousel';

import { vehicles, userBalance } from '@/constants/dealership';

import { Container, Content, TopContent, BottomContent } from './styles';

export default function DealershipTemplate() {
  const [activeCategory, setActiveCategory] = useState('Competitivos');
  const [activeVehicleIndex, setActiveVehicleIndex] = useState(0);

  const filteredVehicles = useMemo(() => {
    if (activeCategory === 'Competitivos') {
      return vehicles;
    }

    return vehicles.filter((vehicle) => vehicle.category === activeCategory);
  }, [activeCategory]);

  const activeVehicle = filteredVehicles[activeVehicleIndex] ?? filteredVehicles[0];

  const handleNextVehicle = useCallback(() => {
    if (!filteredVehicles.length) return;

    setActiveVehicleIndex((currentIndex) =>
      currentIndex === filteredVehicles.length - 1 ? 0 : currentIndex + 1,
    );
  }, [filteredVehicles.length]);

  const handlePreviousVehicle = useCallback(() => {
    if (!filteredVehicles.length) return;

    setActiveVehicleIndex((currentIndex) =>
      currentIndex === 0 ? filteredVehicles.length - 1 : currentIndex - 1,
    );
  }, [filteredVehicles.length]);

  function handleChangeCategory(category: string) {
    setActiveCategory(category);
    setActiveVehicleIndex(0);
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
  }, [handleNextVehicle, handlePreviousVehicle]);

  if (!activeVehicle) {
    return null;
  }

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
            vehicles={filteredVehicles}
            activeCategory={activeCategory}
            activeVehicleIndex={activeVehicleIndex}
            onChangeCategory={handleChangeCategory}
            onSelectVehicle={setActiveVehicleIndex}
            onNextVehicle={handleNextVehicle}
            onPreviousVehicle={handlePreviousVehicle}
          />
        </BottomContent>
      </Content>
    </Container>
  );
}
