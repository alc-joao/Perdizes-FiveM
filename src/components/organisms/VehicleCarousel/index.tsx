'use client';

import { motion } from 'framer-motion';

import {
  Container,
  VehicleInfo,
  VehicleType,
  VehicleName,
  CategoriesWrapper,
  CategoryButton,
  CarouselHint,
  VehiclesContainer,
  VehiclesTrack,
  VehicleCard,
  VehicleImage,
  VehicleFooter,
  Icon,
} from './styles';

import { categories, vehicleCarouselContent } from './constants';

import { vehicleCarouselAnimation, vehicleCardAnimation } from './animations';

type Vehicle = {
  id: number;
  type: string;
  name: string;
  title: string;
  category: string;
  moneyPrice: string;
  diamondPrice: string;
  cardPrice: string;
  image: string;
  exclusive: boolean;
};

type VehicleCarouselProps = {
  vehicles: Vehicle[];

  activeVehicleIndex: number;

  onSelectVehicle: (index: number) => void;

  onNextVehicle: () => void;

  onPreviousVehicle: () => void;
};

const MotionContainer = motion(Container);

const MotionVehicleCard = motion(VehicleCard);

export function VehicleCarousel({
  vehicles,
  activeVehicleIndex,
  onSelectVehicle,
  onNextVehicle,
  onPreviousVehicle,
}: VehicleCarouselProps) {
  const activeVehicle = vehicles[activeVehicleIndex];

  return (
    <MotionContainer variants={vehicleCarouselAnimation} initial="hidden" animate="visible">
      <VehicleInfo>
        <VehicleType>{activeVehicle.category}</VehicleType>

        <VehicleName>{activeVehicle.title}</VehicleName>
      </VehicleInfo>

      <CategoriesWrapper>
        {categories.map((item, index) => (
          <CategoryButton key={item} $active={index === 0}>
            {item}
          </CategoryButton>
        ))}

        <CarouselHint>
          <button type="button" onClick={onPreviousVehicle}>
            ‹
          </button>

          <button type="button" onClick={onNextVehicle}>
            ›
          </button>

          <p>{vehicleCarouselContent.hint}</p>
        </CarouselHint>
      </CategoriesWrapper>

      <VehiclesContainer>
        <VehiclesTrack $activeVehicleIndex={activeVehicleIndex}>
          {vehicles.map((vehicle, index) => (
            <MotionVehicleCard
              key={vehicle.id}
              custom={index}
              variants={vehicleCardAnimation}
              initial="hidden"
              animate="visible"
              onClick={() => onSelectVehicle(index)}
              $exclusive={vehicle.exclusive}
              $active={activeVehicleIndex === index}
            >
              <span>{vehicle.type}</span>

              <VehicleImage src={vehicle.image} alt={vehicle.name} />

              <VehicleFooter>
                <h3>{vehicle.name}</h3>

                <p>
                  <Icon
                    src={
                      vehicle.exclusive
                        ? vehicleCarouselContent.icons.diamond
                        : vehicleCarouselContent.icons.money
                    }
                    alt=""
                  />

                  {vehicle.cardPrice}
                </p>
              </VehicleFooter>
            </MotionVehicleCard>
          ))}
        </VehiclesTrack>
      </VehiclesContainer>
    </MotionContainer>
  );
}
