import { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { PANEL_PADDING_X, SLOT_GAP, SLOT_WIDTH } from '@/components/organisms/skill-check/styles';
import type { KeySlot, SkillCheckConfig, SkillCheckResult, SkillState } from '@/types/skillcheck';

const POOL = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');

// teclas que não contam como tentativa (evita falso-positivo ao trocar de
// janela/aba, por exemplo)
const IGNORED_KEYS = new Set(['Shift', 'Control', 'Alt', 'Meta', 'Tab', 'CapsLock']);

// tolerância de alinhamento, em "casas" — controla o quão preciso o timing
// precisa ser pra contar como acerto
const ALIGN_TOLERANCE = 0.4;

// quanto a tecla móvel viaja além da primeira/última casa (em "casas"),
// pra entrar/saír da fileira fora da área visível do Panel (que tem
// overflow:hidden) — assim o "wrap" do loop nunca pula na tela
const TRAVEL_MARGIN = 1.5;

function randKey(): string {
  return POOL[Math.floor(Math.random() * POOL.length)];
}

/** Monta a fila de uma etapa: 1 casa-alvo sorteada entre `slotCount`. */
function buildRoundSlots(slotCount: number): KeySlot[] {
  const targetIdx = Math.floor(Math.random() * slotCount);
  return Array.from({ length: slotCount }, (_, i) => ({
    key: randKey(),
    isTarget: i === targetIdx,
  }));
}

function formatTime(ms: number): string {
  const totalSec = Math.max(0, Math.ceil(ms / 1000));
  const mm = String(Math.floor(totalSec / 60)).padStart(2, '0');
  const ss = String(totalSec % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

export interface SkillCheckCallbacks {
  onFinish?: (result: SkillCheckResult) => void;
  /** disparado no instante exato do acerto, antes de trocar de etapa */
  onHit?: () => void;
  /** disparado no instante exato do erro de timing */
  onMiss?: () => void;
}

export interface UseSkillCheck {
  state: SkillState;
  slots: KeySlot[];
  /** Quantas das `totalTargets` etapas já foram completadas. */
  hits: number;
  totalTargets: number;
  /** Tecla mostrada sob o marcador agora (pro quadrado isolado + marcador). */
  cursorKey: string;
  /** Texto "MM:SS" do tempo restante. */
  timeLabel: string;
  /** Anexar ao elemento da "tecla" que desliza — a posição é escrita
   *  direto no DOM via GSAP, sem passar pelo re-render do React. */
  markerRef: React.RefObject<HTMLDivElement | null>;
  /** Anexar ao preenchimento da barra de tempo. */
  fillRef: React.RefObject<HTMLDivElement | null>;
  /** Anexar ao "knob" da barra de tempo. */
  knobRef: React.RefObject<HTMLDivElement | null>;
  start: () => void;
  reset: () => void;
}

/**
 * São `totalTargets` etapas seguidas (cada uma com sua própria fila de
 * `slotCount` casas e só 1 alvo), todas dentro de um único cronômetro
 * compartilhado de `durationSeconds`. O marcador desliza continuamente
 * (GSAP, sem setInterval) e, se passar pelo alvo sem acerto, volta pro
 * início e continua — só o cronômetro decide a falha por tempo.
 */
export function useSkillCheck(
  config: SkillCheckConfig,
  callbacks?: SkillCheckCallbacks
): UseSkillCheck {
  const { totalTargets, slotCount, durationSeconds, cursorStepMs } = config;
  const { onFinish, onHit, onMiss } = callbacks ?? {};

  const [state, setState] = useState<SkillState>('idle');
  const [slots, setSlots] = useState<KeySlot[]>(() => buildRoundSlots(slotCount));
  const [hits, setHits] = useState(0);
  const [cursorKey, setCursorKey] = useState('');
  const [timeLabel, setTimeLabel] = useState(() => formatTime(durationSeconds * 1000));

  // refs para acesso síncrono dentro do handler de teclado e dos onUpdate
  const stateRef = useRef<SkillState>('idle');
  const slotsRef = useRef(slots);
  const hitsRef = useRef(0);
  const lastIdxRef = useRef(-1);
  const lastLabelRef = useRef('');

  const markerRef = useRef<HTMLDivElement | null>(null);
  const fillRef = useRef<HTMLDivElement | null>(null);
  const knobRef = useRef<HTMLDivElement | null>(null);

  const progress = useRef({ p: 0 });
  const markerTween = useRef<gsap.core.Tween | null>(null);
  const timeTween = useRef<gsap.core.Tween | null>(null);

  stateRef.current = state;
  slotsRef.current = slots;
  hitsRef.current = hits;

  const killTweens = useCallback(() => {
    markerTween.current?.kill();
    timeTween.current?.kill();
    markerTween.current = null;
    timeTween.current = null;
  }, []);

  const finish = useCallback(
    (status: 'success' | 'fail') => {
      killTweens();
      setState(status);
      onFinish?.({ status, hits: hitsRef.current, total: totalTargets });
    },
    [killTweens, onFinish, totalTargets]
  );

  // escreve a posição do marcador direto no DOM (60fps sem re-render) e só
  // atualiza o React state quando a casa sob ele realmente muda
  const applyMarkerProgress = useCallback(
    (p: number) => {
      const px = PANEL_PADDING_X + p * (SLOT_WIDTH + SLOT_GAP);
      if (markerRef.current) {
        markerRef.current.style.transform = `translate3d(${px}px, -3px, 0)`;
      }
      const idx = Math.max(0, Math.min(Math.floor(p + 0.5), slotCount - 1));
      if (idx !== lastIdxRef.current) {
        lastIdxRef.current = idx;
        setCursorKey(slotsRef.current[idx]?.key ?? '');
      }
    },
    [slotCount]
  );

  const startMarkerTween = useCallback(() => {
    // entra fora da 1ª casa e sai fora da última — o trecho "fora da
    // tela" fica escondido pelo overflow:hidden do Panel, então o reset
    // do loop (repeat: -1) acontece sem nenhum salto visível
    const pStart = -TRAVEL_MARGIN;
    const pEnd = slotCount - 1 + TRAVEL_MARGIN;

    progress.current.p = pStart;
    lastIdxRef.current = -1;
    applyMarkerProgress(pStart);

    markerTween.current?.kill();
    markerTween.current = gsap.to(progress.current, {
      p: pEnd,
      duration: ((pEnd - pStart) * cursorStepMs) / 1000,
      ease: 'none',
      repeat: -1,
      onUpdate: () => applyMarkerProgress(progress.current.p),
    });
  }, [applyMarkerProgress, cursorStepMs, slotCount]);

  // avança pra próxima etapa sem tocar no cronômetro compartilhado
  const nextRound = useCallback(() => {
    setSlots(buildRoundSlots(slotCount));
    startMarkerTween();
  }, [slotCount, startMarkerTween]);

  const reset = useCallback(() => {
    killTweens();
    setSlots(buildRoundSlots(slotCount));
    setHits(0);
    setCursorKey('');
    lastIdxRef.current = -1;
    lastLabelRef.current = formatTime(durationSeconds * 1000);
    setTimeLabel(lastLabelRef.current);
    setState('idle');
  }, [durationSeconds, killTweens, slotCount]);

  const start = useCallback(() => {
    setSlots(buildRoundSlots(slotCount));
    setHits(0);
    setState('running');

    startMarkerTween();

    const totalMs = durationSeconds * 1000;
    const timeState = { left: totalMs };
    lastLabelRef.current = formatTime(totalMs);

    timeTween.current?.kill();
    timeTween.current = gsap.to(timeState, {
      left: 0,
      duration: durationSeconds,
      ease: 'none',
      onUpdate: () => {
        const frac = Math.max(0, timeState.left / totalMs);
        if (fillRef.current) fillRef.current.style.width = `${frac * 100}%`;
        if (knobRef.current) knobRef.current.style.left = `${frac * 100}%`;

        const label = formatTime(timeState.left);
        if (label !== lastLabelRef.current) {
          lastLabelRef.current = label;
          setTimeLabel(label);
        }
      },
      onComplete: () => finish('fail'),
    });
  }, [durationSeconds, finish, slotCount, startMarkerTween]);

  // captura de teclado — lê a posição do marcador direto do ref, sem
  // esperar nenhum re-render, pra responder no mesmo frame do aperto
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const st = stateRef.current;

      if (st !== 'running') {
        if (e.key === 'Enter' || e.code === 'Space') {
          if (st === 'idle') start();
          else reset();
        }
        return;
      }

      if (IGNORED_KEYS.has(e.key)) return;

      const targetIdx = slotsRef.current.findIndex((s) => s.isTarget);
      if (targetIdx === -1) return;

      const aligned = Math.abs(progress.current.p - targetIdx) <= ALIGN_TOLERANCE;

      if (aligned) {
        onHit?.();
        const newHits = hitsRef.current + 1;
        setHits(newHits);
        if (newHits >= totalTargets) finish('success');
        else nextRound();
      } else {
        onMiss?.();
        finish('fail');
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [finish, reset, start, nextRound, onHit, onMiss, totalTargets]);

  // garante que nenhuma tween fique rodando em segundo plano (evita
  // consumo de CPU/memory leak no NUI quando o componente desmonta)
  useEffect(() => () => killTweens(), [killTweens]);

  return {
    state,
    slots,
    hits,
    totalTargets,
    cursorKey,
    timeLabel,
    markerRef,
    fillRef,
    knobRef,
    start,
    reset,
  };
}
