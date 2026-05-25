'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import {
  Container,
  Content,
  TopContent,
  LeftContent,
  WelcomeText,
  MainTitle,
  StatsCard,
  StatsTitle,
  StatItem,
  StatHeader,
  StatBar,
  StatProgress,
  BottomContent,
  VehicleInfo,
  VehicleType,
  VehicleName,
  CategoriesWrapper,
  CategoryButton,
  CarouselHint,
  VehiclesContainer,
  VehicleCard,
  VehicleImage,
  VehicleFooter,
  RightActions,
  PriceLabel,
  PriceRow,
  PriceItem,
  Divider,
  Icon,
  ButtonsRow,
  ActionButton,
  TestDriveButton,
  ButtonIcon,
  VehiclesTrack,
} from './styles';

import { categories, vehicles } from './constants';
import { fadeLeft, fadeRight, fadeUp, cardAnimation } from './animations';

export default function DealershipTemplate() {
  const [activeVehicleIndex, setActiveVehicleIndex] = useState(3);

  const activeVehicle = vehicles[activeVehicleIndex];

  function handleNextVehicle() {
    setActiveVehicleIndex((currentIndex) =>
      currentIndex === vehicles.length - 1 ? 0 : currentIndex + 1
    );
  }

  function handlePreviousVehicle() {
    setActiveVehicleIndex((currentIndex) =>
      currentIndex === 0 ? vehicles.length - 1 : currentIndex - 1
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
        <TopContent as={motion.div} variants={fadeLeft} initial="hidden" animate="visible">
          <LeftContent>
            <WelcomeText>Bem vindo(a)</WelcomeText>
            <MainTitle>CONCESSIONARIA</MainTitle>

            <StatsCard>
              <StatsTitle>Estatísticas</StatsTitle>

              {activeVehicle.stats.map((item) => (
                <StatItem key={item.title}>
                  <StatHeader>
                    <span>{item.title}</span>
                    <span>{item.value}</span>
                  </StatHeader>

                  <StatBar>
                    <StatProgress $percentage={item.percentage} />
                  </StatBar>
                </StatItem>
              ))}
            </StatsCard>
          </LeftContent>
        </TopContent>

        <RightActions as={motion.div} variants={fadeRight} initial="hidden" animate="visible">
          <PriceLabel>Valor do veiculo</PriceLabel>

          <PriceRow>
            <PriceItem>
              <Icon src="/svgs/icons/money.svg" alt="" />
              <span>{activeVehicle.moneyPrice}</span>
            </PriceItem>

            <Divider>|</Divider>

            <PriceItem>
              <Icon src="/svgs/icons/diamond.svg" alt="" />
              <span>{activeVehicle.diamondPrice}</span>
            </PriceItem>
          </PriceRow>

          <ButtonsRow>
            <ActionButton>
              <ButtonIcon src="/svgs/icons/bag.svg" alt="" />
              ADQUIRIR
            </ActionButton>

            <TestDriveButton>
              <ButtonIcon src="/svgs/icons/steering.svg" alt="" />
              TEST DRIVE
            </TestDriveButton>
          </ButtonsRow>
        </RightActions>

        <BottomContent as={motion.div} variants={fadeUp} initial="hidden" animate="visible">
          <VehicleInfo>
            <VehicleType>{activeVehicle.category}</VehicleType>
            <VehicleName>{activeVehicle.title}</VehicleName>
          </VehicleInfo>

          <CategoriesWrapper>
            {categories.map((item) => (
              <CategoryButton key={item}>{item}</CategoryButton>
            ))}

            <CarouselHint>
              <button type="button" onClick={handlePreviousVehicle}>
                ‹
              </button>

              <button type="button" onClick={handleNextVehicle}>
                ›
              </button>

              <p>Use as setas para navegar pelos veiculos</p>
            </CarouselHint>
          </CategoriesWrapper>

          <VehiclesContainer>
            <VehiclesTrack $activeVehicleIndex={activeVehicleIndex}>
              {vehicles.map((vehicle, index) => (
                <VehicleCard
                  key={vehicle.id}
                  as={motion.div}
                  custom={index}
                  variants={cardAnimation}
                  initial="hidden"
                  animate="visible"
                  onClick={() => setActiveVehicleIndex(index)}
                  $exclusive={vehicle.exclusive}
                  $active={activeVehicleIndex === index}
                >
                  <span>{vehicle.type}</span>

                  <VehicleImage src={vehicle.image} alt={vehicle.name} />

                  <VehicleFooter>
                    <h3>{vehicle.name}</h3>

                    <p>
                      <Icon
                        src={vehicle.exclusive ? '/svgs/icons/diamond.svg' : '/svgs/icons/money.svg'}
                        alt=""
                      />
                      {vehicle.cardPrice}
                    </p>
                  </VehicleFooter>
                </VehicleCard>
              ))}
            </VehiclesTrack>
          </VehiclesContainer>
        </BottomContent>
      </Content>
    </Container>
  );
}
