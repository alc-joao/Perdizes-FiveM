export type SkillState = 'idle' | 'running' | 'success' | 'fail';

/** Uma "casa" da fila de teclas. */
export interface KeySlot {
  /** Tecla exibida (ex.: "Q", "2", "M"). */
  key: string;
  /** true se for a casa-alvo que o jogador precisa acertar. */
  isTarget: boolean;
}

export interface SkillCheckConfig {
  /** Quantos targets é preciso acertar para vencer (ex.: 5 → "1/5"). */
  totalTargets: number;
  /** Quantidade de casas na fila. */
  slotCount: number;
  /** Tempo total da rodada em segundos. */
  durationSeconds: number;
  /** Quanto tempo (ms) o cursor leva para andar de uma casa para a outra. */
  cursorStepMs: number;
  /** Título exibido no card. */
  title: string;
}

export interface SkillCheckResult {
  status: 'success' | 'fail';
  hits: number;
  total: number;
}
