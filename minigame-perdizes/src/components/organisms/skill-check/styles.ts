'use client';
import styled, { css } from 'styled-components';

// só renderizado fora de produção (ver index.tsx) — simula a tela do jogo
// por trás do card pra dar pra testar fora do NUI
export const DevBackground = styled.div`
  position: fixed;
  inset: 0;
  z-index: -1;
  background: url('/assets/background/img-car-background.png') center / cover no-repeat;
`;

// véu escuro com blur por cima do jogo, igual ao export do Figma
// (image 5.svg: #171717 a 50% + blur 2.5px / Rectangle 1.svg: gradiente
// horizontal #2A2B2E → transparente em ~70% da largura)
export const Scrim = styled.div<{ $visible: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 1;
  display: ${({ $visible }) => ($visible ? 'block' : 'none')};
  background:
    linear-gradient(90deg, #2a2b2e 4.6875%, rgba(54, 57, 65, 0) 69.6875%, rgba(54, 57, 65, 0) 100%),
    rgba(23, 23, 23, 0.25);
  backdrop-filter: blur(2.5px);
`;

export const Overlay = styled.div<{ $visible: boolean }>`
  position: fixed;
  left: 50%;
  bottom: 6%;
  transform: translateX(-50%);
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  z-index: 9999;
  pointer-events: none;
`;

export const Card = styled.div`
  width: max-content;
  max-width: 92vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  user-select: none;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Title = styled.h1`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
`;

export const Subtitle = styled.p`
  margin-top: 6px;
  max-width: 300px;
  font-size: 13px;
  line-height: 1.35;
  color: rgba(230, 232, 235, 0.78);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
`;

// agrupa contador, fileira (cursor + teclas) e timer numa grade de 2
// colunas — a coluna 2 sempre herda a largura natural do Panel (maior
// conteúdo da coluna), então Counter e TimerWrap ficam automaticamente
// com a mesma largura e o mesmo eixo horizontal do Panel, sem margens
// manuais pra "empurrar" cada peça pro lugar certo.
export const Board = styled.div`
  display: grid;
  grid-template-columns: 56px 1fr;
  column-gap: 12px;
  row-gap: 14px;
  align-items: center;
  margin-top: 14px;
`;

export const Counter = styled.div`
  grid-column: 2;
  grid-row: 1;
  justify-self: center;
  font-size: 14px;
  color: rgba(230, 232, 235, 0.85);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
`;

export const CursorBox = styled.div`
  grid-column: 1;
  grid-row: 2;
  width: 56px;
  height: 56px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: rgba(120, 124, 132, 0.9);
  font-size: 22px;
  font-weight: 600;
  color: #f2f3f5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
`;

// usados pra calcular a posição do Marker em cima das casas (ver index.tsx)
export const SLOT_WIDTH = 42;
export const SLOT_GAP = 10;
export const PANEL_PADDING_X = 18;

export const Panel = styled.div`
  grid-column: 2;
  grid-row: 2;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${SLOT_GAP}px;
  padding: 16px ${PANEL_PADDING_X}px;
  border-radius: 10px;
  background: linear-gradient(180deg, rgba(42, 43, 46, 1) 5%, rgba(54, 57, 65, 0) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  /* esconde o trecho fora-de-tela do Marker (ver useSkillCheck), pra que o
     "wrap" da animação aconteça fora da área visível, sem salto perceptível */
  overflow: hidden;
`;

interface SlotProps {
  $target: boolean;
}

export const Slot = styled.div<SlotProps>`
  width: ${SLOT_WIDTH}px;
  height: ${SLOT_WIDTH}px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: 6px;
  font-size: 18px;
  font-weight: 600;
  background: rgba(70, 74, 82, 0.45);
  color: rgba(242, 243, 245, 0.35);

  ${({ $target }) =>
    $target &&
    css`
      background: #007fe8;
      color: #fff;
    `}
`;

// a própria "tecla" que desliza da esquerda pra direita por cima da
// fileira, mostrando a letra da casa atual — a validação do acerto
// acontece quando ela está sobre a casa-alvo. A posição (transform) é
// escrita direto no DOM pelo GSAP (ver useSkillCheck), não por aqui.
export const Marker = styled.div`
  position: absolute;
  top: 16px;
  left: 0;
  width: ${SLOT_WIDTH}px;
  height: ${SLOT_WIDTH}px;
  display: grid;
  place-items: center;
  border-radius: 8px;
  background: rgba(120, 124, 132, 0.95);
  font-size: 18px;
  font-weight: 700;
  color: #f2f3f5;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.45);
  pointer-events: none;
  will-change: transform;
`;

export const TimerWrap = styled.div`
  grid-column: 2;
  grid-row: 3;
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border-radius: 10px;
  background: linear-gradient(180deg, rgba(42, 43, 46, 1) 5%, rgba(54, 57, 65, 0) 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
`;

export const Track = styled.div`
  position: relative;
  flex: 1;
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.16);
`;

// width e left são escritos direto no DOM pelo GSAP (ver useSkillCheck)
export const Fill = styled.div`
  position: absolute;
  inset: 0 auto 0 0;
  width: 100%;
  border-radius: 999px;
  background: #007fe8;
  will-change: width;
`;

export const Knob = styled.div`
  position: absolute;
  top: 50%;
  left: 100%;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #fff;
  transform: translate(-50%, -50%);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  will-change: left;
`;

export const TimerLabel = styled.span`
  font-size: 13px;
  white-space: nowrap;
  color: rgba(230, 232, 235, 0.9);
`;

export const Banner = styled.div<{ $ok: boolean }>`
  margin-top: 10px;
  align-self: center;
  font-size: 14px;
  font-weight: 600;
  color: ${({ $ok }) => ($ok ? '#2ecc71' : '#e74c3c')};
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
`;
