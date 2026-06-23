import { SkillCheckConfig } from '@/types/skillcheck';

export const SkillCheckC = {
  id: 'skill-check',
  subtitle: 'Aperte a tecla quando estiver em cima do quadrado com sua devida letra.',
  successLabel: 'Sucesso!',
  failLabel: 'Falhou!',
};

export const skillCheckDefaults: SkillCheckConfig = {
  totalTargets: 5,
  slotCount: 9,
  durationSeconds: 81, // 01:21 como na referência
  cursorStepMs: 850,
  title: 'Caixa Eletrônico',
};
