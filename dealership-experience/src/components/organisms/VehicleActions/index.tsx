'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import { playSound } from '@/utils/audio';

import {
  Container,
  PriceLabel,
  PriceRow,
  PriceItem,
  Divider,
  Icon,
  ButtonsRow,
  ActionButton,
  TestDriveButton,
  ButtonIcon,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalStatusIcon,
  ModalTitle,
  ModalBody,
  ModalVehicleImage,
  ModalVehicleName,
  ModalInfoRow,
  ModalPriceBox,
  ModalActions,
  ModalPrimaryButton,
  ModalSecondaryButton,
  ModalSuccessMessage,
} from './styles';

import { vehicleHeroContent } from './constants';
import { vehicleHeroAnimation } from './animations';

type Vehicle = {
  name: string;
  title: string;
  cardPrice: string;
  diamondPrice: string;
  image: string;
  exclusive: boolean;
};

type VehicleActionsProps = {
  userBalance: {
    money: string;
    diamonds: string;
  };
  vehicle: Vehicle;
};

type ModalType = 'purchase' | 'testDrive' | '';

const MotionContainer = motion(Container);

const MONEY_KEY = 'dealerchip_money_balance';
const DIAMONDS_KEY = 'dealerchip_diamond_balance';
const OWNED_KEY = 'dealerchip_owned_vehicles';

function parseValue(value: string) {
  const onlyNumbers = value.replace(/\D/g, '');
  return Number(onlyNumbers || 0);
}

function formatMoney(value: number) {
  return value.toLocaleString('pt-BR');
}

export function VehicleActions({ userBalance, vehicle }: VehicleActionsProps) {
  const [modalType, setModalType] = useState<ModalType>('');
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const [moneyBalance, setMoneyBalance] = useState(() => parseValue(userBalance.money));
  const [diamondBalance, setDiamondBalance] = useState(() => parseValue(userBalance.diamonds));
  const [ownedVehicles, setOwnedVehicles] = useState<string[]>([]);

  const vehicleId = useMemo(() => vehicle.name || vehicle.title, [vehicle.name, vehicle.title]);

  const isOwned = ownedVehicles.includes(vehicleId);
  const isPurchase = modalType === 'purchase';

  const vehiclePrice = vehicle.exclusive ? vehicle.diamondPrice : vehicle.cardPrice;
  const vehiclePriceNumber = parseValue(vehiclePrice);

  const modalTitle = isPurchase ? 'Confirmação' : 'Test Drive';

  const modalText = isPurchase
    ? isOwned
      ? 'Este veículo já foi adquirido e está disponível na sua garagem.'
      : 'Deseja confirmar a aquisição deste veículo?'
    : 'Deseja iniciar uma experiência de test drive com este veículo?';

  const modalButtonLabel = isPurchase
    ? isOwned
      ? 'Veículo possuído'
      : 'Confirmar compra'
    : 'Iniciar test drive';

  const successMessage = isPurchase
    ? 'Veículo adquirido com sucesso.'
    : 'Test drive iniciado com sucesso.';

  const formattedVehiclePrice = vehicle.exclusive
    ? `${vehiclePrice} diamantes`
    : `R$ ${vehiclePrice}`;

  const priceIcon = vehicle.exclusive
    ? vehicleHeroContent.icons.diamond
    : vehicleHeroContent.icons.money;

  useEffect(() => {
    const savedMoney = localStorage.getItem(MONEY_KEY);
    const savedDiamonds = localStorage.getItem(DIAMONDS_KEY);
    const savedOwnedVehicles = localStorage.getItem(OWNED_KEY);

    if (savedMoney) setMoneyBalance(Number(savedMoney));
    if (savedDiamonds) setDiamondBalance(Number(savedDiamonds));

    if (savedOwnedVehicles) {
      setOwnedVehicles(JSON.parse(savedOwnedVehicles));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(MONEY_KEY, String(moneyBalance));
  }, [moneyBalance]);

  useEffect(() => {
    localStorage.setItem(DIAMONDS_KEY, String(diamondBalance));
  }, [diamondBalance]);

  useEffect(() => {
    localStorage.setItem(OWNED_KEY, JSON.stringify(ownedVehicles));
  }, [ownedVehicles]);

  function handleOpenModal(type: ModalType) {
    playSound('/audio/click.mp3', 0.25);
    setErrorMessage('');
    setModalType(type);
  }

  function handleCloseModal() {
    playSound('/audio/click.mp3', 0.18);
    setModalType('');
    setSuccess(false);
    setErrorMessage('');
  }

  function handleConfirm() {
    if (!isPurchase) {
      playSound('/audio/success.mp3', 0.4);
      setSuccess(true);

      setTimeout(() => {
        setModalType('');
        setSuccess(false);
      }, 1600);

      return;
    }

    if (isOwned) {
      setErrorMessage('Você já possui este veículo.');
      return;
    }

    if (vehicle.exclusive) {
      if (diamondBalance < vehiclePriceNumber) {
        setErrorMessage('Diamantes insuficientes para comprar este veículo.');
        return;
      }

      setDiamondBalance((currentBalance) => currentBalance - vehiclePriceNumber);
    } else {
      if (moneyBalance < vehiclePriceNumber) {
        setErrorMessage('Saldo insuficiente para comprar este veículo.');
        return;
      }

      setMoneyBalance((currentBalance) => currentBalance - vehiclePriceNumber);
    }

    setOwnedVehicles((currentVehicles) => [...currentVehicles, vehicleId]);

    playSound('/audio/success.mp3', 0.4);
    setSuccess(true);
    setErrorMessage('');

    setTimeout(() => {
      setModalType('');
      setSuccess(false);
    }, 1600);
  }

  useEffect(() => {
    if (!modalType) return;

    function handleKeyboard(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        handleCloseModal();
      }

      if (event.key === 'Enter') {
        handleConfirm();
      }
    }

    window.addEventListener('keydown', handleKeyboard);

    return () => {
      window.removeEventListener('keydown', handleKeyboard);
    };
  }, [modalType, isOwned, moneyBalance, diamondBalance, vehicleId]);

  return (
    <>
      <MotionContainer variants={vehicleHeroAnimation} initial="hidden" animate="visible">
        <PriceLabel>{vehicleHeroContent.priceLabel}</PriceLabel>

        <PriceRow>
          <PriceItem>
            <Icon src={vehicleHeroContent.icons.money} alt="" />
            <span>{formatMoney(moneyBalance)}</span>
          </PriceItem>

          <Divider>|</Divider>

          <PriceItem>
            <Icon src={vehicleHeroContent.icons.diamond} alt="" />
            <span>{formatMoney(diamondBalance)}</span>
          </PriceItem>
        </PriceRow>

        <ButtonsRow>
          <ActionButton type="button" onClick={() => handleOpenModal('purchase')} disabled={isOwned}>
            <ButtonIcon src={vehicleHeroContent.icons.bag} alt="" />
            {isOwned ? 'Possuído' : vehicleHeroContent.acquireButtonLabel}
          </ActionButton>

          <TestDriveButton type="button" onClick={() => handleOpenModal('testDrive')}>
            <ButtonIcon src={vehicleHeroContent.icons.steering} alt="" />
            {vehicleHeroContent.testDriveButtonLabel}
          </TestDriveButton>
        </ButtonsRow>
      </MotionContainer>

      <AnimatePresence>
        {modalType && (
          <ModalOverlay
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseModal}
          >
            <ModalContent
              as={motion.div}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <ModalHeader>
                <ModalStatusIcon>{isPurchase ? '✓' : '◈'}</ModalStatusIcon>
                <ModalTitle>{modalTitle}</ModalTitle>
              </ModalHeader>

              <ModalBody>
                <ModalVehicleImage src={vehicle.image} alt={vehicle.name} />
                <ModalVehicleName>{vehicle.title}</ModalVehicleName>

                {isOwned && (
                  <ModalSuccessMessage>✓ Possuído</ModalSuccessMessage>
                )}

                <ModalInfoRow>
                  <span>ⓘ</span>
                  <p>{modalText}</p>
                </ModalInfoRow>

                <ModalPriceBox>
                  <img src={priceIcon} alt="" />
                  <strong>{formattedVehiclePrice}</strong>
                </ModalPriceBox>

                {errorMessage && <ModalSuccessMessage>{errorMessage}</ModalSuccessMessage>}

                {success && <ModalSuccessMessage>✓ {successMessage}</ModalSuccessMessage>}

                <ModalActions>
                  <ModalPrimaryButton type="button" onClick={handleConfirm} disabled={isOwned}>
                    <span>✓</span>
                    {modalButtonLabel}
                  </ModalPrimaryButton>

                  <ModalSecondaryButton type="button" onClick={handleCloseModal}>
                    <span>×</span>
                    Cancelar
                  </ModalSecondaryButton>
                </ModalActions>
              </ModalBody>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
}