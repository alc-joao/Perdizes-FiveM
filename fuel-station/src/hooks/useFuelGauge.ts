import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  buildWavePath,
  getEdgeFade,
} from '@/components/organisms/fuel-station/fuel-gauge/wave-path';
import { FuelGaugeC } from '@/components/organisms/fuel-station/fuel-gauge/constants';

export interface UseFuelGauge {
  /** Anexar ao path da onda — superfície do líquido. */
  waveRef: React.RefObject<SVGPathElement | null>;
}

const {
  viewBoxWidth,
  viewBoxHeight,
  wave,
  edgeFadeRange,
  fillDuration,
  settleDuration,
  overshoot,
} = FuelGaugeC;

export function useFuelGauge(percentage: number): UseFuelGauge {
  const waveRef = useRef<SVGPathElement | null>(null);

  // estado "puro" da simulação — o GSAP só tween-eia estes números, sem
  // tocar no DOM diretamente. Quem desenha é o ticker abaixo, lendo este
  // objeto a cada frame. Isso mantém a animação 100% fora do ciclo de
  // render do React.
  const state = useRef({
    level: 0,
    phase: 0,
    amp: wave.idleAmplitude,
  });

  // um loop de fase infinito, nunca pausa — uma volta completa de fase
  // (0 → 2π) é exatamente um ciclo do seno, então o repeat:-1 fecha sem
  // nenhum salto visual no início/fim do loop. O nível em si não é
  // tocado aqui: parado, fica parado — só a forma da onda se move.
  useEffect(() => {
    const loop = gsap.to(state.current, {
      phase: Math.PI * 2,
      duration: wave.speed,
      ease: 'none',
      repeat: -1,
    });

    const draw = () => {
      const { level, phase, amp } = state.current;
      const clampedLevel = Math.min(100, Math.max(0, level));
      const levelY = viewBoxHeight - (clampedLevel / 100) * viewBoxHeight;
      const amplitude = amp * getEdgeFade(clampedLevel, edgeFadeRange);

      waveRef.current?.setAttribute(
        'd',
        buildWavePath({
          width: viewBoxWidth,
          height: viewBoxHeight,
          levelY,
          amplitude,
          wavelength: wave.wavelength,
          phase,
        })
      );
    };

    gsap.ticker.add(draw);

    return () => {
      loop.kill();
      gsap.ticker.remove(draw);
    };
  }, []);

  // sobe (ou desce) até a porcentagem alvo passando por um leve overshoot
  // e assentando com ease elástico — a amplitude da onda acompanha a
  // transição (mais forte enquanto o nível se move) e volta ao idle
  // quando assenta, simulando o "baque" de líquido de verdade
  useEffect(() => {
    const target = Math.min(100, Math.max(0, percentage));
    const tl = gsap.timeline();

    tl.to(state.current, {
      level: Math.min(100, target + overshoot),
      amp: wave.idleAmplitude * wave.overshootMultiplier,
      duration: fillDuration,
      ease: 'power2.out',
    }).to(state.current, {
      level: target,
      amp: wave.idleAmplitude,
      duration: settleDuration,
      ease: 'elastic.out(1, 0.55)',
    });

    return () => {
      tl.kill();
    };
  }, [percentage]);

  return { waveRef };
}
