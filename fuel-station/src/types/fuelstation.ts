export interface FuelStationConfig {
  /** Capacidade máxima do tanque, em litros. */
  capacidadeMaxima: number;
  /** Litros atualmente no tanque. */
  litrosAtuais: number;
  /** Preço cobrado por litro, em R$. */
  precoPorLitro: number;
}
