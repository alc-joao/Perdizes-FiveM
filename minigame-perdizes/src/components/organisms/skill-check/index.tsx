'use client';
import { FC, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import * as S from './styles';
import { CardIcon } from '@/components/atoms/card-icon';
import { useSkillCheck } from '@/hooks/useSkillCheck';
import type { SkillCheckConfig, SkillCheckResult } from '@/types/skillcheck';
import { SkillCheckC, skillCheckDefaults } from './constants';

export interface SkillCheckProps extends Partial<SkillCheckConfig> {
  onFinish?: (result: SkillCheckResult) => void;
}

export const SkillCheck: FC<SkillCheckProps> = ({
  totalTargets = skillCheckDefaults.totalTargets,
  slotCount = skillCheckDefaults.slotCount,
  durationSeconds = skillCheckDefaults.durationSeconds,
  cursorStepMs = skillCheckDefaults.cursorStepMs,
  title = skillCheckDefaults.title,
  onFinish,
}) => {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState<SkillCheckConfig>({
    totalTargets,
    slotCount,
    durationSeconds,
    cursorStepMs,
    title,
  });

  const cardRef = useRef<HTMLDivElement | null>(null);
  const targetSlotRef = useRef<HTMLDivElement | null>(null);
  const counterRef = useRef<HTMLDivElement | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  const game = useSkillCheck(config, {
    onFinish: (result) => {
      onFinish?.(result);
      sendResultToNui(result);
      // o card fica visível mostrando o banner de sucesso/falha — só some
      // quando o NUI mandar { action: "close" } (ver abaixo)
    },
    onHit: () => {
      // feedback de acerto: bounce + highlight na casa-alvo, e um pulso no contador
      if (targetSlotRef.current) {
        gsap.fromTo(
          targetSlotRef.current,
          { scale: 1 },
          { scale: 1.22, duration: 0.12, ease: 'power2.out', yoyo: true, repeat: 1 }
        );
      }
      if (counterRef.current) {
        gsap.fromTo(
          counterRef.current,
          { scale: 1 },
          { scale: 1.15, duration: 0.15, ease: 'power2.out', yoyo: true, repeat: 1 }
        );
      }
    },
    onMiss: () => {
      // feedback de erro: shake sutil no card
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { x: -6 },
          { x: 6, duration: 0.05, repeat: 5, yoyo: true, ease: 'power1.inOut', clearProps: 'x' }
        );
      }
    },
  });

  // =====================================================================
  // INTEGRAÇÃO NUI — ponto de conexão para quem implementa o lado Lua.
  // O card começa oculto e só aparece com { action: "open", config }.
  // { action: "close" } esconde o card e reseta o estado.
  // =====================================================================
  useEffect(() => {
    function handleNuiMessage(event: MessageEvent) {
      const { action, config: nuiConfig } = event.data ?? {};

      if (action === 'open') {
        setConfig((prev) => ({ ...prev, ...nuiConfig }));
        setVisible(true);
      }

      if (action === 'close') {
        setVisible(false);
      }
    }

    window.addEventListener('message', handleNuiMessage);
    return () => window.removeEventListener('message', handleNuiMessage);
  }, []);

  // conveniência só pra dev: sem o NUI rodando, o card já abre ao carregar a
  // página, pra testar sem precisar simular a mensagem do NUI. Em produção
  // só a mensagem NUI abre o card.
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') setVisible(true);
  }, []);

  // dispara/reseta a mecânica quando o card é mostrado/escondido pelo NUI,
  // com uma entrada suave (fade + slide) quando ele aparece
  useEffect(() => {
    if (visible) {
      game.start();
      if (cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
        );
      }
    } else {
      game.reset();
    }
  }, [visible]);

  // entrada suave do banner de sucesso/falha
  useEffect(() => {
    if ((game.state === 'success' || game.state === 'fail') && bannerRef.current) {
      gsap.fromTo(
        bannerRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.25, ease: 'back.out(2)' }
      );
    }
  }, [game.state]);

  // chamado ao fim da rodada (sucesso ou falha) — envia o resultado pro
  // recurso Lua através do callback NUI.
  function sendResultToNui(result: SkillCheckResult) {
    const resourceName = window.GetParentResourceName?.() ?? 'nui';
    fetch(`https://${resourceName}/skillResult`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    }).catch(() => {});
  }
  // =====================================================================
  // FIM DA INTEGRAÇÃO NUI
  // =====================================================================

  return (
    <>
      {process.env.NODE_ENV !== 'production' && <S.DevBackground />}
      <S.Scrim $visible={visible} />
      <S.Overlay $visible={visible} id={SkillCheckC.id}>
        <S.Card ref={cardRef}>
          <S.TitleRow>
            <CardIcon />
            <S.Title>{config.title}</S.Title>
          </S.TitleRow>

          <S.Subtitle>{SkillCheckC.subtitle}</S.Subtitle>

          <S.Board>
            <S.Counter ref={counterRef}>
              {game.hits}/{game.totalTargets}
            </S.Counter>

            <S.CursorBox>{game.cursorKey}</S.CursorBox>
            <S.Panel>
              {game.slots.map((slot, i) => (
                <S.Slot
                  key={i}
                  ref={slot.isTarget ? targetSlotRef : undefined}
                  $target={slot.isTarget}
                >
                  {slot.key}
                </S.Slot>
              ))}
              <S.Marker ref={game.markerRef}>{game.cursorKey}</S.Marker>
            </S.Panel>

            <S.TimerWrap>
              <S.Track>
                <S.Fill ref={game.fillRef} />
                <S.Knob ref={game.knobRef} />
              </S.Track>
              <S.TimerLabel>{game.timeLabel} restantes</S.TimerLabel>
            </S.TimerWrap>
          </S.Board>

          {game.state === 'success' && (
            <S.Banner ref={bannerRef} $ok>
              {SkillCheckC.successLabel}
            </S.Banner>
          )}
          {game.state === 'fail' && (
            <S.Banner ref={bannerRef} $ok={false}>
              {SkillCheckC.failLabel}
            </S.Banner>
          )}
        </S.Card>
      </S.Overlay>
    </>
  );
};
