// espaço de coordenadas interno do SVG — não precisa bater com o
// tamanho real em tela, o viewBox escala pra dentro da cápsula (ver
// fuel-gauge/styles.ts). Uma única onda: larga (maior que a largura do
// tanque) pra parecer uma crista suave varrendo a superfície, não vários
// picos.
export const FuelGaugeC = {
  viewBoxWidth: 40,
  viewBoxHeight: 240,
  wave: {
    wavelength: 64,
    // ~25% mais lenta que antes (era 2.8s)
    speed: 3.5,
    idleAmplitude: 8,
    overshootMultiplier: 1.5,
  },
  // faixa (em % do tanque) perto de 0 e de 100 em que a onda vai
  // suavemente até a amplitude zero, garantindo vazio/cheio "limpos"
  edgeFadeRange: 6,
  fillDuration: 1.3,
  settleDuration: 0.7,
  overshoot: 4,
};
