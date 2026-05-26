import {
  Wrapper,
  PriceLabel,
  PriceRow,
  PriceItem,
  Divider,
  Icon,
  ButtonsRow,
  ActionButton,
  TestDriveButton,
  ButtonIcon,
} from './styles';

type VehicleActionsProps = {
  moneyPrice: string;
  diamondPrice: string;
};

export default function VehicleActions({ moneyPrice, diamondPrice }: VehicleActionsProps) {
  return (
    <Wrapper>
      <PriceLabel>Valor do veiculo</PriceLabel>

      <PriceRow>
        <PriceItem>
          <Icon src="/svgs/icons/money.svg" alt="" />
          <span>{moneyPrice}</span>
        </PriceItem>

        <Divider>|</Divider>

        <PriceItem>
          <Icon src="/svgs/icons/diamond.svg" alt="" />
          <span>{diamondPrice}</span>
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
    </Wrapper>
  );
}
