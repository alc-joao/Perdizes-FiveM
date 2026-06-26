export interface WavePathParams {
  width: number;
  height: number;
  levelY: number;
  amplitude: number;
  wavelength: number;
  phase: number;
}

// onda senoidal fechada (até a base do SVG), desenhada com curvas
// quadráticas passando por pontos de oitavo-de-período — denso o
// suficiente pra a curva sair redonda (sem "cotovelos"), e ainda barato
// de recalcular a cada frame do GSAP. Sai e entra meio comprimento de
// onda além da largura visível pra não expor uma "quina" do ciclo nas
// bordas enquanto a fase anda.
export function buildWavePath({
  width,
  height,
  levelY,
  amplitude,
  wavelength,
  phase,
}: WavePathParams): string {
  const step = wavelength / 8;
  const points: [number, number][] = [];

  for (let x = -wavelength; x <= width + wavelength; x += step) {
    const y = levelY + amplitude * Math.sin((x / wavelength) * Math.PI * 2 + phase);
    points.push([x, y]);
  }

  const [startX, startY] = points[0];
  let d = `M ${startX} ${height} L ${startX} ${startY}`;

  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    d += ` Q ${x0} ${y0} ${(x0 + x1) / 2} ${(y0 + y1) / 2}`;
  }

  const [endX] = points[points.length - 1];
  d += ` L ${endX} ${height} Z`;

  return d;
}

function smoothstep(x: number): number {
  return x * x * (3 - 2 * x);
}

// reduz a amplitude da onda suavemente a zero perto das bordas do tanque
// — sem isso, a senoide sempre desvia pra cima/baixo do nível, então 0%
// mostraria uma pontinha de líquido acima do fundo e 100% mostraria um
// "corte" abaixo do topo. Fora da faixa de borda (fadeRange%) o fator é
// 1 e a onda anima normalmente.
export function getEdgeFade(level: number, fadeRange: number): number {
  if (level <= 0 || level >= 100) return 0;

  const fromBottom = smoothstep(Math.min(1, level / fadeRange));
  const fromTop = smoothstep(Math.min(1, (100 - level) / fadeRange));

  return Math.min(fromBottom, fromTop);
}
