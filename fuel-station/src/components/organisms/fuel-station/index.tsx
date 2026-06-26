'use client';
import { FC } from 'react';
import * as S from './styles';
import { useFuelStation } from '@/hooks/useFuelStation';
import type { FuelStationConfig } from '@/types/fuelstation';
import { FuelStationC, fuelStationDefaults } from './constants';
import { FuelGauge } from './fuel-gauge';

export type FuelStationProps = Partial<FuelStationConfig>;

export const FuelStation: FC<FuelStationProps> = ({
  capacidadeMaxima = fuelStationDefaults.capacidadeMaxima,
  litrosAtuais = fuelStationDefaults.litrosAtuais,
  precoPorLitro = fuelStationDefaults.precoPorLitro,
}) => {
  const { percentage, valorTotal } = useFuelStation({
    capacidadeMaxima,
    litrosAtuais,
    precoPorLitro,
  });

  return (
    <S.Background>
      <S.Stage id={FuelStationC.id}>
        <S.Card>
          <S.Content>
            <S.TitleRow>
              <S.Title>{FuelStationC.title}</S.Title>
              <S.Badge>{FuelStationC.badge}</S.Badge>
            </S.TitleRow>

            <S.InfoGrid>
              <S.FuelInfoBox>
                <S.InfoLabel>{FuelStationC.tankLabel}:</S.InfoLabel>
                <S.InfoValue>{Math.round(percentage)}%</S.InfoValue>
              </S.FuelInfoBox>

              <S.PriceInfoBox>
                <S.InfoLabel>{FuelStationC.priceLabel}:</S.InfoLabel>
                <S.InfoValue>{precoPorLitro.toFixed(2)}$</S.InfoValue>
              </S.PriceInfoBox>
            </S.InfoGrid>

            <S.TotalRow>
              <S.TotalLabel>{FuelStationC.totalLabel}:</S.TotalLabel>
              <S.TotalValue>R$ {valorTotal.toFixed(2)}</S.TotalValue>
            </S.TotalRow>
          </S.Content>

          <S.Gauge>
            <FuelGauge percentage={percentage} />
          </S.Gauge>
        </S.Card>
      </S.Stage>
    </S.Background>
  );
};
